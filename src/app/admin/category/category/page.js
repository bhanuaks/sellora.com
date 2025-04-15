"use client"
import React from 'react'
import dynamic from 'next/dynamic'
// const CategoryPage = dynamic(()=>import('./categoryPage'), {ssr:false})
// import CategoryPage from './categoryPage' 
const CategoryPage = dynamic(() => import("./categoryPage"), { ssr: false });
 
const page = () => {
  return (
   <CategoryPage />
  )
}

export default page