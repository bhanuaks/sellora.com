"use client"
import React from 'react'
import dynamic from 'next/dynamic'

// const CategoryPage = dynamic(()=>import('./categoryPage'), {ssr:false})
// import CategoryPage from './categoryPage' 
const BannerPage = dynamic(() => import("./bannerPage"), { ssr: false });
 
const page = () => {
  return (
   <BannerPage />
  )
}

export default page