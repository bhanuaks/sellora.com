"use client" 
import { baseUrl, decodeJwt } from "@/Http/helper";

const { createContext, useContext, useState, useLayoutEffect } = require("react");



export const CategoryContaxt = createContext();


export const CategoryProvider= ({ children })=>{
    const [allCategory, setAllCategory] = useState([]);

            useLayoutEffect(() => {
                fetch(`${baseUrl}api/front/get-active-category`)
                .then((response)=>{
                    if(!response.ok){
                        throw new Error("Network Error");
                    }
                    return response.json();
                }).then((res)=>{
                    if(res.status){
                        console.log(res.data);
                        setAllCategory(res.data || [])
                    }
                })
            }, []);

 

    return(
        <CategoryContaxt.Provider  value={{allCategory}} >
             {children}
        </CategoryContaxt.Provider>
    )
}

export const  useCategory=()=> useContext(CategoryContaxt)