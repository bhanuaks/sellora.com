"use client"
import React from 'react' 
import dynamic from "next/dynamic";     
const SizeTemplete = dynamic(() => import("./sizeTemplete"), { ssr: false });

const page = () => {
  return (
    <SizeTemplete /> 
  )
}

export default page