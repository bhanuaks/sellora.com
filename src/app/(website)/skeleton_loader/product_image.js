import React from 'react'
import '../../../../public/front/loadercss/skeletonloader.css'
const ProductImageSkeletonLoader = () => {
  return (
    <> 
    <div className="container row">
      {/* Left Side: Image Gallery */}
      <div className="image-gallery row " style={{margin:'0px', paddingRight:'0px'}}>
        <div
          className="col-lg-2 thumb_img_container" 
        >
          <div className="skeleton thumbnail" />
          <div className="skeleton thumbnail" />
          <div className="skeleton thumbnail" />
          <div className="skeleton thumbnail" />
        </div>
        <div  className="col-lg-9"> 
          <div className="skeleton main-image" />
        </div>

      </div>
      
    </div>
  </>
  )
}

export default ProductImageSkeletonLoader
