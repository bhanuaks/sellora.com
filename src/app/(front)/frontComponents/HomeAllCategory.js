'use client';
import { baseUrl } from '@/Http/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import HomeCategoryAll from './component/homecategoryall';



const HomeAllCategory = ({categoryListAll}) => {  
  return (
    
  <div className="rts-category-area rts-section-gap" style={{ paddingTop: '0px' }}>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="cover-card-main-over-white" style={{ paddingTop: '0px' }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left"> All Categories </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/* rts category area satart */}
              <div className="rts-caregory-area-one ">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="category-area-main-wrapper-one">
                      {categoryListAll && 
                        <HomeCategoryAll categoryListAll={categoryListAll}  />
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* rts category area end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default HomeAllCategory