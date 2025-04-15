import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

function LeftBanner({bannerLeft}) {
  return (
    <div className="col-lg-3">
            <div className="banner-five-right-content bg_image" style={{backgroundImage:`url(${baseUrl}${bannerLeft.photo})`}}>
              <div className="content-area"> 
                <h3 className="title">
                {bannerLeft.title} 
                </h3>
                {bannerLeft.url && (
                    <Link href={`${bannerLeft.url}`} className="shop-now-goshop-btn">
                  
                  <span className="text">Shop Now</span>
                  <div className="plus-icon">
                    
                    <i className="fa-sharp fa-regular fa-plus" />
                  </div>
                  <div className="plus-icon">
                    
                    <i className="fa-sharp fa-regular fa-plus" />
                  </div>
                </Link>
                )}
                
              </div>
            </div>
          </div>
  )
}

export default LeftBanner