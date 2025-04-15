"use client"
import React from 'react'
import dynamic from "next/dynamic";
// import BreadthTemplete from './breadthTemplete';
const BreadthTemplete = dynamic(() => import("./breadthTemplete"), { ssr: false });
function page() {
  return (
   <BreadthTemplete />
  )
}

export default page