"use client"
import { useCart } from '@/app/(website)/contaxtData/cartContaxt'
import { baseUrl, main_thumb_img_path, showNotification, variant_thumb_img_path1 } from '@/Http/helper'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react' 

import '../../../../../public/front/assets/css/popup.css' 
import CartPageLoader from '@/app/(website)/skeleton_loader/cartPageLoader'
import Image from 'next/image'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { fileBasePath } from '@/Http/urlHelper'

function page() {
  const router = useRouter();
 const [isVisible, setIsVisible] = useState(false);
  const { user, removeToCartfromSession, updateInventoryIncDec } = useCart()
  const [cartProducts, setCartProduct] = useState([])
  const [inventoryProccess, setInventoryProccess] = useState(false)
  const [proccess, setProccess] = useState(false)
  const [hasOutOfStockItem, setHasOutOfStockItem] = useState(false)
  const [itemNotInStock, setItemNotInStock] = useState([])
  const [totalData, setTotalData] = useState({
    total_mrp_price: 0,
    total_price: 0,
    shipping_charge: 0,
    grand_total: 0,
    discount_price: 0,
    coupon: ''
  })

 

  useEffect(() => {
    let totalMrp = 0;
    let price = 0;
    let discountPrice = 0;
    let shippingCharge = 0;
    let threshold_discount = 0;
    if (cartProducts.length > 0) { 
      setItemNotInStock([])
      let itemNotInStockData = [];

      if (user && user.role_consumer_business == "Business") { 
          cartProducts.map((item) =>{
            if(item.variant.stock > 0 && item.variant.stock_status =="In Stock") { 
              price += (item.variant.businessSalePrice* item.quantity); 
              threshold_discount += item.variant.threshold_discount;
              totalMrp += (item.variant?.msrp || 0)* item.quantity;
            }else{
             
              itemNotInStockData.push(item) 
            }
          }); 
      } else { 
        cartProducts.map((item) =>{ 
          if(item.variant.stock > 0 && item.variant.stock_status =="In Stock") { 
              price += (item.variant.consumerSalePrice* item.quantity);
              totalMrp += (item.variant?.msrp || 0)* item.quantity;
          }else{
            itemNotInStockData.push(item) 
          }
 
          }); 
      }
     
      discountPrice = totalMrp - price
      
      setTotalData((preData) => ({
        ...preData,
        total_mrp_price: totalMrp,
        total_price: price,
        shipping_charge: shippingCharge,
        grand_total: price + shippingCharge -threshold_discount,
        discount_price: discountPrice+threshold_discount,
        threshold_discount:threshold_discount
      }))

      setItemNotInStock(itemNotInStockData) 
      
    }
  }, [cartProducts])

  useLayoutEffect(()=>{
    setProccess(true)
  },[])
  useEffect(() => {
    function getcarttData() {
      
      let cartSessionData = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cartSessionData.length == 0) {
        setCartProduct([])  
      }
      fetch(`${baseUrl}api/product/get-cart-data`, {
        method: "POST",
        body: JSON.stringify({ cartItems: cartSessionData })
      }).then((response) => {
        if (!response.ok) {
          setProccess(false)
          throw new Error("Network Error")
        }
        return response.json()
      }).then((res) => {
        setProccess(false)
        if (res.status) {
          setCartProduct(res.data.cartItems)
        }
      }).catch((error) => {
        console.log(error);
      })
    }


    getcarttData()

    window.addEventListener('cartUpdated', getcarttData)
    return () => {
      window.removeEventListener('cartUpdated', getcarttData)
    }
  }, [])


  async function removeItem(product,product_id, variant_id) {
   await removeToCartfromSession(product_id, variant_id)
    showNotification(`You have removed '${product.product_name}' successfully.`)

  }

  async function updateInventoryCartItem(product, variant, opration) {
    let quantity = null

    if (opration == "inc" && variant.stock < product.quantity + 1) {
      ChangeInventoryInputUpdate(variant.stock, product._id, variant._id)
      showNotification(`We're sorry! Only ${product.variant.stock} unit(s) allowed in this order`)
      return
    } else if (opration == "dec" && product.quantity - 1 <= 0) {
      ChangeInventoryInputUpdate(1, product._id, variant._id)
      
      showNotification(`You've changed '${product.product_name}' QUANTITY to '1'`)

      return
    }
    setInventoryProccess(true)
    await updateInventoryIncDec(product._id, variant._id, opration)
    showNotification(`You have updated the quantity of '${product.product_name}' to '${opration=="inc"?product.quantity + 1:product.quantity - 1}'`) 
    setInventoryProccess(false)
  }

  function ChangeInventoryInput(e, product, variant) {
    let quantity = e.target.value
    const product_id = product._id
    const variant_id = variant._id
    if (variant.stock < quantity) {
      quantity = variant.stock
      alert(`You can max inventory ${variant.stock}`)
    }
  }

  async function ChangeInventoryInputUpdate(quantity, product_id, variant_id) {
    setInventoryProccess(true)
    let cartSessionData = JSON.parse(localStorage.getItem('cart') || '[]');
    // find product
    const existItem = cartSessionData.find((item) =>
      item.product_id === product_id && item.variant_id === variant_id
    );
    if (existItem) {
      existItem.quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cartSessionData))
    if (!user) {
      window.dispatchEvent(new Event("cartUpdated"));
      setInventoryProccess(false)
      return
    }

    const response = await fetch(`${baseUrl}api/product/update-cart-quantity`, {
      method: "POST",
      body: JSON.stringify({
        product_id: product_id,
        variant_id: variant_id,
        user_id: user._id,
        quantity: quantity
      })
    })
    if (!response.ok) {
      throw new Error("Network Error")
    }
    const res = await response.json();
    if (res.status) {
      setInventoryProccess(false)
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }

  function poceedtoCheckOut(e){
    e.preventDefault();
    if(itemNotInStock.length > 0){
      Swal.fire({
        icon:"error",
        title:"Error",
        text:`${itemNotInStock[0].product_name} is not available`
      })
      return
    }
    localStorage.setItem('checkoutProducts',JSON.stringify({product:cartProducts, amountData:totalData}))
    router.push(`${baseUrl}user/checkout`)
  }
 
  return (
    <> 
      {/* rts navigation bar area start */}
      <div className="rts-navigation-area-breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href="/">Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <Link className="current" href="#">
                  Cart
                </Link>
                {/*  <i className="fa-regular fa-chevron-right" />
            <Link className="current" href="#">
              Headphones
            </Link>
            <i className="fa-regular fa-chevron-right" />
            <Link className="current" href="#">
              Over-ear
            </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* rts navigation bar area end */}
      <div className="section-seperator">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>
      {proccess ? ( 
        <CartPageLoader />
      ):(
<div className="rts-chop-details-area rts-section-gap">
        <div className="container">
          <div className="shopdetails-style-1-wrapper">
            <div className="row g-5">
              <div className="col-xl-9 col-lg-12 col-md-12 col-12 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2">
                <div className="rts-cart-list-area">
                  {/*    <div className="single-cart-area-list head">
                      <div className="product-main">
                          <p>Products</p>
                      </div>
                      <div className="price">
                          <p>Price</p>
                      </div>
                      <div className="quantity">
                          <p>Quantity</p>
                      </div>
                      <div className="subtotal">
                          <p>Price</p>
                      </div>
                  </div> */}
                  {cartProducts.length != 0 && (
                    <div className="cart-top-area-note">
                      <p>Shopping Cart </p>
                      <span className="price_dof">Price</span>
                    </div>
                  )}
                  
                  {cartProducts.length ? cartProducts.map((product, index) => (
                    <div className="single-cart-area-list main item-parent" key={index} style={{opacity:`${product.variant.stock <= 0 || product.variant.stock_status != "In Stock" ?"0.7":'1' }`}}>
                      <div className="product-main-cart">
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="thumbnail">
                              {product.variant.withImage == "Yes" ? (
                                <img
                                  src={`${fileBasePath}${variant_thumb_img_path1}${product.variant.image_1}`}
                                  alt="shop"
                                />
                              ) : (
                                <img
                                  src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                                  alt="shop"
                                />
                              )}

                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="information">
                              <div className="row">
                                <div className="col-lg-9">
                                  <p>
                                    {product.product_name.slice(0, 100)}
                                  </p>
                                    {product.variant.last_month_buy && product.variant.last_month_buy > 0 ?(
                                  <div className="a-size-small">
                                        {product.variant.last_month_buy>10?"10+":product.variant.last_month_buy} bought in past month 
                                  </div>
                                    ):null}
                                   
                                  <div className="in_stock">{product.variant.stock <= 0?"Out of Stock":product.variant.stock_status}</div>
                                  <div className="color_cart">
                                    {product.variant.customAttributes ? Object.entries(product.variant.customAttributes).map((variant, variantIndex) => (
                                      <div key={variantIndex}><span>{variant[0]}: </span>{variant[1]} </div>
                                    )) : ""}
                                    {/* <span>Colour:</span> Black */}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="price_outer">
                                    {user && user.role_consumer_business == "Business" ?(
                                      <div className="subtotal"> 
                                      ${((product.variant.businessSalePrice * product.quantity)-product.variant.threshold_discount).toLocaleString()} <span className="dis-amm">${(product.variant.msrp * product.quantity).toLocaleString()}</span>
                                      
                                    </div>
                                    ):(
                                      <div className="subtotal"> 
                                      ${(product.variant.consumerSalePrice * product.quantity).toLocaleString()} <span className="dis-amm">${(product.variant.msrp * product.quantity).toLocaleString()}</span> 
                                    </div>
                                    )}
                                    
                                  </div>
                                </div>
                              </div>
                              <div className="list_cart">
                                <ul>
                                {product.variant.stock > 0 && product.variant.stock_status == "In Stock" ?(
                                  <>
                                  <li>
                                    <div className="color_cart">
                                      <span>Qty:</span>
                                    </div>
                                  </li>
                                  <li>
                                   

                                   
                                    <div className="quantity">
                                      <div className="quantity-edit" style={{ pointerEvents: `${inventoryProccess ? "none" : ''}` }}>
                                        <input
                                          type="text"
                                          className="input"
                                          value={product.quantity}
                                          onChange={(e) => ChangeInventoryInput(e, product, product.variant)}
                                        />
                                        <div className="button-wrapper-action">
                                          <button className="button" onClick={() => updateInventoryCartItem(product, product.variant, "dec")}
                                            style={{ pointerEvents: `${product.quantity == 1 ? "none" : ''}`, opacity: `${product.quantity == 1 ? "0.5" : '1'}` }}
                                            >
                                            <i className="fa-regular fa-chevron-down" />
                                          </button>
                                          <button className="button plus" onClick={() => updateInventoryCartItem(product, product.variant, "inc")} 
                                            >
                                            +
                                            <i className="fa-regular fa-chevron-up" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  </li>
                                   </>):""}
                                  <li>  
                                    {/* {product.variant.threshold_discount?(<>Qunatity Discount : ${product.variant.threshold_discount}</>):""}  */}
                                    </li>
                                </ul>
                                <div className="close section-activation"> 
                                  <i className="fa-regular fa-trash" onClick={() => removeItem(product, product._id, product.variant._id)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )):(

                    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:"center"}}>
                      <Image src={`${baseUrl}front/assets/images/empty_cart.png`} 
                      width={200}
                      height={200}
                      alt=""/>
                      <h3>Empty</h3>
                      <p style={{textAlign:"center"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      <Link href={"/"} className='rts-btn btn-primary'>Go To Home</Link>
                    </div>
                  )}

                 
                </div>
              </div>
              {cartProducts.length > 0?(
                <div className="col-xl-3 col-lg-12 col-md-12 col-12 order-1 order-xl-2 order-lg-1 order-md-1 order-sm-1">
                <div className="cart-total-area-start-right side">
                  <h5 className="title">Order Summary</h5>
                  {/* =============coupon============= */}
                  <div id="show-btn" className="abailable_coupons" style={{cursor:'pointer'}} onClick={() => setIsVisible(!isVisible)} >
                    <span>Available Coupons</span>
                  </div>
                  <motion.div  id="show-box"
                    initial={{ height: 0, opacity: 0 }}
                    animate={isVisible ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }} 
                    >
                    <div className="col-lg-12 col-12">
                      <div className="coupon2">
                        <div className="left2">
                          <div>Your Gift</div>
                        </div>
                        <div className="center2">
                          <div className="center_mar">
                            {/* <h2>50% OFF</h2> */}
                            <h3>WHYWAIT</h3>
                            <p>
                              Save <strong>$5.0</strong> on this Purchase Upto 75%
                              Off On Sellora Product
                            </p>
                            <small>Valid until December, 2024</small>
                          </div>
                        </div>
                        <div className="right2">
                          <div className="apply2">
                            <Link href="#">Apply</Link>
                          </div>
                        </div>
                      </div>
                      <div className="coupon2">
                        <div className="left2">
                          <div>Your Gift</div>
                        </div>
                        <div className="center2">
                          <div className="center_mar">
                            {/* <h2>50% OFF</h2> */}
                            <h3>BOBPFJAS10</h3>
                            <p>
                              Save <strong>$5.0</strong> on this Purchase Upto 75%
                              Off On Sellora Product
                            </p>
                            <small>Valid until December, 2024</small>
                          </div>
                        </div>
                        <div className="right2">
                          <div className="apply2">
                            <Link href="#">Apply</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  {/* =============coupon============= */}
                  <div className="coupon-wrap mt-10 mb-10">
                    <h4>Discount Coupon</h4>
                    <div className="coupon-content common-form-style">
                      <div className="input-box2">
                        <i className="uil uil-search" />
                        <input type="text" placeholder="Discount code" />
                        <button className="button">Apply</button>
                      </div>
                      {/*   <div className="input-style coupon-content-mrg">
                <input type="text" placeholder="Discount code" style=" float: left; width: 80%;">
                <Link className="apply" href="#">Apply</Link>
              </div> */}
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="subtotal">

                    Item Total(MRP) <span className="price">${totalData.total_mrp_price.toLocaleString()}</span>
                  </div>
                  <div className="subtotal">

                    Price Discount
                    <span className="price discounts">${totalData.discount_price.toLocaleString()}</span>
                  </div>
                  <div className="subtotal">

                    Shipping charge
                    <span className="price">${totalData.shipping_charge.toLocaleString()}</span>
                  </div>
                  <div className="bottom">
                    <div className="wrapper">
                      Total Amount <span className="price">${totalData.grand_total.toLocaleString()}</span>
                    </div>
                    <div className="total_saving">
                      <h4>
                        Total Savings <span>${totalData.discount_price.toLocaleString()}  </span>
                      </h4>
                    </div>
                    <div className="button-area">
                      <Link href="/user/login" onClick={(e)=>poceedtoCheckOut(e)}>
                        <button className="rts-btn btn-primary">
                          Proceed To Checkout
                        </button>
                      </Link>
                    </div>
                    <div className="button-area">
                      <Link href="/">
                        <button className="rts-btn continue_shoping">
                          Continue Shopping
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              ):""}
              
            </div>
          </div>
        </div>
      </div>
      )}
      
    </>

  )
}

export default page