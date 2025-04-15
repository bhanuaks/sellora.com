"use client"
import React from 'react'
import dynamic from "next/dynamic";   
const PackageBreadthTemplete = dynamic(() => import("./packageBreadthTemplete"), { ssr: false });

const page = () => {
  return (
    <PackageBreadthTemplete />
  )
}

export default page