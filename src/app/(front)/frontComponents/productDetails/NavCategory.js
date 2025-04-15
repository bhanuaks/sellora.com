import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

const NavCategory = ({ productDetails }) => {
  

    return (
        <>
          <div className="rts-navigation-area-breadcrumb">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="navigator-breadcrumb-wrapper">
                  {productDetails && Object.keys(productDetails) && Object.keys(productDetails.category_id) && Object.keys(productDetails.category_id).length > 0 && (
                    <>
                      <Link href={`${baseUrl}product/${productDetails.category_id.slug}`}>
                        {productDetails.category_id.name}
                      </Link>
                    </>
                  )}

                    {productDetails && Object.keys(productDetails) && Object.keys(productDetails).length > 0 &&  productDetails.subcategory_id?.length > 0 && Object.keys(productDetails.subcategory_id).length > 0 && (
                    <>
                      <i className="fa-regular fa-chevron-right" /> 
                        <Link className="current" href={`${baseUrl}product/${productDetails.category_id.slug}/${productDetails.subcategory_id.slug}`}>
                          {productDetails.subcategory_id.subCategoryName}
                        </Link>
                      </>
                    )}
                    {productDetails && Object.keys(productDetails) &&  productDetails.childcategory_id?.length > 0 && Object.keys(productDetails.childcategory_id).length > 0 && (
                    <> 
                      <i className="fa-regular fa-chevron-right" /> 
                        <Link className="current" href={`${baseUrl}product/${productDetails.category_id.slug}/${productDetails.subcategory_id.slug}/${productDetails.childcategory_id.slug}`}>
                          {productDetails.childcategory_id.childCategoryName}
                        </Link>
                      </>
                    )}

              {/* {productDetails  && (
                    <> 
                      <i className="fa-regular fa-chevron-right" /> 
                        <Link href={"#"} className="current" >
                          { productDetails.product_name}
                        </Link>
                      </>
                    )} */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
export default NavCategory;