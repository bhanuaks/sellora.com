"use client"
import React from 'react'
import dynamic from 'next/dynamic'

// const CategoryPage = dynamic(()=>import('./categoryPage'), {ssr:false})
// import CategoryPage from './categoryPage' 
const FeatureBannerPage = dynamic(() => import("./featureBannerPage"), { ssr: false });
 
const page = () => {
  return (
   <FeatureBannerPage />
  )
}

export default page