"use client" 
import { baseUrl, decodeJwt } from "@/Http/helper";

const { createContext, useContext, useState, useLayoutEffect } = require("react");



export const CartContaxt = createContext();


export const CartProvider= ({ children })=>{
    const [cart, setCart] = useState([]);


    const [user, setUser] = useState(null)
    
         useLayoutEffect(() => {
                const userToken = document.cookie.split("; ").find((row)=>row.startsWith('userAuthToken'))?.split("=")[1]; 
                
                
                if (userToken) {
                    try { 
                        const userData = decodeJwt(userToken);
                        setUser(userData.user);
                    } catch (error) {
                        console.error("Error decoding JWT:", error);
                    }
                }
            }, []);




    const addToCartInSession = (product_id, variant_id, quantity=1) => {

        let cartSessionData = JSON.parse(localStorage.getItem('cart') || '[]');
        const addToCartData = {
            product_id:product_id,
            variant_id:variant_id, 
            quantity:quantity
        }
        const existItem = cartSessionData.find((item) => 
            item.product_id === product_id && item.variant_id === variant_id
        );
    
        if (existItem) {
            existItem.quantity = quantity;
        } else { 
            cartSessionData.push(addToCartData);
        }
         localStorage.setItem('cart', JSON.stringify(cartSessionData))
      };


      async function addToCartProduct(product_id, variant_id, quantity=1){
        
        if(!user){
            addToCartInSession(product_id, variant_id, quantity)
            window.dispatchEvent(new Event("cartUpdated"));
            return true
        }else{
            
           const response = await  fetch(`${baseUrl}api/product/add-to-cart`,{
                    method:"POST",
                    body:JSON.stringify({ 
                        product_id:product_id,
                        variant_id:variant_id,
                        user_id:user._id,
                        quantity
                    })
                  })  
                    if(!response.ok){
                      throw new Error("Network Error")
                    }
                    
                    const res = await response.json();
                    if(res.status){
                        addToCartInSession(product_id, variant_id, quantity)
                        window.dispatchEvent(new Event("cartUpdated"));
                        return true
                    }else {
                        return false
                    }
                
        }
      }

    

      const removeToCartfromSession = async (product_id, variant_id) => { 
        let cartSessionData = JSON.parse(localStorage.getItem('cart') || '[]'); 
        const filterData = cartSessionData.filter((item) => 
            !(item.product_id === product_id && item.variant_id === variant_id)
        );  
         localStorage.setItem('cart', JSON.stringify(filterData))
        

        if(user){
            const response = await  fetch(`${baseUrl}api/product/remove-from-cart`,{
                method:"POST",
                body:JSON.stringify({ 
                    product_id:product_id,
                    variant_id:variant_id,
                    user_id:user._id, 
                })
              })  
                if(!response.ok){
                  throw new Error("Network Error")
                }
                
                const res = await response.json();
                if(res.status){ 
                    window.dispatchEvent(new Event("cartUpdated"));
                    return true
                }else {
                    return false
                }
        }
        
        window.dispatchEvent(new Event("cartUpdated"));
        return true 

      };


     async function updateInventoryIncDec(product_id, variant_id, opration){
        let cartSessionData = JSON.parse(localStorage.getItem('cart') || '[]');
        
        
        // find product
        const existItem = cartSessionData.find((item) => 
            item.product_id === product_id && item.variant_id === variant_id
        ); 
     
        // update quantity
        if (existItem) {
            if(opration == "inc"){ 
                existItem.quantity += 1;
            }else if(opration == "dec"){
                existItem.quantity -= 1;
            }
        } 
        let quantity = existItem.quantity; 
        localStorage.setItem('cart', JSON.stringify(cartSessionData))
        window.dispatchEvent(new Event("cartUpdated"));

        if(user){
            const response = await  fetch(`${baseUrl}api/product/update-cart-quantity`,{
                method:"POST",
                body:JSON.stringify({ 
                    product_id:product_id,
                    variant_id:variant_id,
                    user_id:user._id, 
                    quantity:quantity
                })
              })  
                if(!response.ok){
                  throw new Error("Network Error")
                }
                
                const res = await response.json();
                if(res.status){ 
                    window.dispatchEvent(new Event("cartUpdated"));
                    return true
                }else {
                    return false
                }
        }

         localStorage.setItem('cart', JSON.stringify(cartSessionData))
         window.dispatchEvent(new Event("cartUpdated"));
      }

    return(
        <CartContaxt.Provider  value={{user, addToCartProduct, removeToCartfromSession, updateInventoryIncDec }} >
             {children}
        </CartContaxt.Provider>
    )
}

export const  useCart=()=> useContext(CartContaxt)