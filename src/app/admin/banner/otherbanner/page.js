"use client"
import React from 'react'
import dynamic from 'next/dynamic'

// const CategoryPage = dynamic(()=>import('./categoryPage'), {ssr:false})
// import CategoryPage from './categoryPage' 
const OtherBannerPage = dynamic(() => import("./otherBannerPage"), { ssr: false });
 
const page = () => {
  return (
   <OtherBannerPage />
  )
}

export default page