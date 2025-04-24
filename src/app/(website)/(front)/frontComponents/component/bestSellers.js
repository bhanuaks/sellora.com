'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { baseUrl, main_thumb_img_path } from "@/Http/helper";
import { fileBasePath } from "@/Http/urlHelper";

const BestSellers = ({bestSeller}) => {

const [bestSellerValue, setBestSellerValue] = useState([])

useEffect(() => {

    setBestSellerValue(bestSeller)

},[bestSeller])

return (
<div className="popular-product-col-7-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-between mt--40 mb--15">
            <h2 className="title-left"> Best Sellers </h2>
            <ul
              className="nav nav-tabs best-selling-grocery"
              id="myTab"
              role="tablist"
            >
              {bestSellerValue && bestSellerValue.map((catList, index) => {

              
              return (
              <li className="nav-item" role="presentation" key={index}>
                <button
                  className={`nav-link ${index == 0 ? 'active' : ''}`}
                  id={`home-tab${catList.categoryId}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#home${catList.categoryId}`}
                  type="button"
                  role="tab"
                  aria-controls={`home${catList.categoryId}`}
                  aria-selected={index == 0 ? 'true' : 'false'}
                >
                  {catList.categoryName}
                </button>
              </li>
              )})
            }


            </ul>
          </div>
        </div>
      </div>
      <div className="row plr_sm--5">
        <div className="col-lg-12">
          <div className="tab-content" id="myTabContent">
            {/* first tabs Fashion area start*/}
            {bestSellerValue && bestSellerValue.map((catList, index) => {
            
            return (
            <div
              className={`tab-pane fade ${index == 0 ? 'show active' : ''}`}
              id={`home${catList.categoryId}`}
              role="tabpanel"
              aria-labelledby={`home-tab${catList.categoryId}`}
              key={index}
            >
              <div className="row g-4 mt--0">
                
              {catList.subcategories && catList.subcategories.map((subCatList, indexsub) => {
                
                return (
               
                <div className="col-lg-3" key={indexsub}>
                  <div className="gw-card-layout">
                    <h2>{subCatList.subcategoryName}</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                      {subCatList.products && subCatList.products.map((productList, indexprod) => {
                
                        return (
                        
                        <div className="col-lg-6 col-6" key={indexprod}>
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            {indexsub > 0 && indexsub % 2==1?
                            <Link href={`${baseUrl}/product-details/${productList.slug}?pId=${productList.productId}&vId=${productList.variants[0]?._id}`}>
                            <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                              
                              <img src={`${fileBasePath}${main_thumb_img_path}${productList.main_image}`} />
                            </div>
                            <div className="cloth_name">{productList.name.slice(0,7)}...</div>
                          </Link>
                            :
                            <>
                            <Link href={`${baseUrl}/product-details/${productList.slug}?pId=${productList.productId}&vId=${productList.variants[0]?._id}`}>
                              
                              <img src={`${fileBasePath}${main_thumb_img_path}${productList.main_image}`} />
                            </Link>
                            
                            </>
                      }
                          </div>
                        </div>
                        
                        
                        )})}

                        <div className="col-lg-12">
                            <div className="a-cardui-footer">
                                <Link href={`${baseUrl}/product/${catList.categorySlug}/${subCatList.slug}`}>See all offers</Link>
                            </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
                    
                     

                    
                )})}


                
              </div>
            </div>
            )})}


            
            
          </div>
        </div>

        

      </div>
    </div>
  </div>

)
}

export default BestSellers