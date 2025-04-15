import Link from "next/link";
import React from "react";
import { baseUrl } from "@/Http/helper";

const ProductDescription = ({ productDetails }) => {
    
    return (
        <>
         <div className="col-lg-12">
              <div className="product-discription-tab-shop">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Key Product Details
                    </button>
                  </li>
                 
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade   show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabIndex={0}
                  >
                    <div className="single-tab-content-shop-details">
                      <p className="disc">
                      {productDetails && Object.keys(productDetails).length > 0 && (
                        <span>{productDetails.product_description}</span>
                      )}
                      </p>
                     
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    tabIndex={0}
                  >
                    <div className="single-tab-content-shop-details">
                    
                    <h6>Key Product Details</h6>
                      {productDetails && productDetails.key_feature && productDetails.key_feature.length > 0 && (
                       
                       <ul>
                          {productDetails.key_feature.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
export default ProductDescription;