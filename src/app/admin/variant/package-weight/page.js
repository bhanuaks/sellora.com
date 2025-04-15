"use client"
import React from 'react' 
import dynamic from "next/dynamic";     
const PackageWeigthTemplete = dynamic(() => import("./packageWeigthTemplete"), { ssr: false });

function page() {
  return (
    <PackageWeigthTemplete />
  )
}

export default page