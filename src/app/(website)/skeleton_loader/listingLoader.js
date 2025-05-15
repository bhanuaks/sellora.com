import React from 'react'
import '../../../../public/front/loadercss/listingLoader.css'


const ListingLoaderSkeleton = () => {
  return (
    <div className="skeleton-card col-lg-2 col-6 col-sm-6">
        <div className="skeleton image"></div>
        <div className="skeleton stars"></div>
        <div className="skeleton title"></div>
        <div className="skeleton price-spinner"></div>
        <div className="skeleton discount"></div>
    </div>
  )
}

export default ListingLoaderSkeleton