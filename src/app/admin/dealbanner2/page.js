"use client"
import React from 'react'
import dynamic from 'next/dynamic'

// const CategoryPage = dynamic(()=>import('./categoryPage'), {ssr:false})
// import CategoryPage from './categoryPage' 
const DealBannerPage = dynamic(() => import("./dealBannerPage"), { ssr: false });
 
const page = () => {
  return (
   <DealBannerPage />
  )
}

export default page