import React from 'react'
import '../../../../public/front/loadercss/productTitleLoder.css'


const ProductDetailsSkeletonLoader = () => {
  return (
    <>
    
     
    <div className="container1">
      {/* Brand */}
      <div className="skeleton brand" />
      {/* Product Title */}
      <div className="skeleton skelton-title" />
      {/* Rating & Reviews */}
      <div className="skeleton rating" />
      {/* Price */}
      <div className="skeleton price-spinner" />
      {/* Color Variants */}
      <div className="color-variants">
        <div className="skeleton variant" />
        <div className="skeleton variant" />
        <div className="skeleton variant" />
      </div>
      {/* Size Options */}
      <div className="sizes">
        <div className="skeleton size" />
        <div className="skeleton size" />
        <div className="skeleton size" />
        <div className="skeleton size" />
      </div>
      {/* Buttons */}
      <div className="buttons-spinner">
        <div className="skeleton button-spinner" />
        <div className="skeleton button-spinner" />
      </div>
    </div>
  </>
  
  )
}

export default ProductDetailsSkeletonLoader