"use client"
import React from 'react'
import dynamic from "next/dynamic";     
const PackageLengthTemplete = dynamic(() => import("./packageLengthTemplete"), { ssr: false });


function page() {
  return (
    <PackageLengthTemplete />
  )
}

export default page