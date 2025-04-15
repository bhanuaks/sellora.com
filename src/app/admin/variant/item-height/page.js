"use client"
import React from 'react'
import dynamic from "next/dynamic"; 
const HeightTemplete = dynamic(() => import("./heightTemplete"), { ssr: false });

const page = () => {
  return (
    <HeightTemplete /> 
  )
}
export default page;