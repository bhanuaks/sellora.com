"use client"
import React from 'react'
import dynamic from "next/dynamic";    
const PackageHeigthTemplete = dynamic(() => import("./packageHeigthTemplete"), { ssr: false });

const page = () => {
  return (
    <PackageHeigthTemplete />
  )
}

export default page