"use client"
import dynamic from "next/dynamic";  
const ItemWeightTemplete = dynamic(() => import("./itemWeightTemplete"), { ssr: false });
import React from 'react' 

function page() {
  return (
    <ItemWeightTemplete />
  )
}

export default page