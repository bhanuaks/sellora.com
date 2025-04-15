"use client"
import React from 'react'
import dynamic from "next/dynamic";
const ColorTemplete = dynamic(() => import("./ColorTemplete"), { ssr: false });
 

 const page = () => {
  return (
    <ColorTemplete />
  )
}

export default page;
