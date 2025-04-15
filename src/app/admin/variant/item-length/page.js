"use client"
import React from 'react'
import dynamic from "next/dynamic";  
const ItemLengthTemplete = dynamic(() => import("./itemLengthTemplete"), { ssr: false });

const page = () => {
  return (
   <ItemLengthTemplete />
  )
}

export default page