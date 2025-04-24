"use client"
import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React, { use, useEffect } from 'react'

const page = ({params}) => {
    const sellor_id = use(params).seller_id


    useEffect(()=>{ 
        fetch(`${baseUrl}api/seller-details?seller_id=${sellor_id}`,{
            method:"GET", 
        }).then((response)=>{
            if(!response.ok){
                throw new Error("Network Error")
            }
            return response.json()
        }).then((res)=>{
            console.log(res);
        })

    },[sellor_id])
  return (
    <>
  <div className="container">
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <div className="banner-content-store">
          <img src={`${baseUrl}front/assets/images/store_banneer.jpg`} />
        </div>
      </div>
    </div>
  </div>
  {/* ===============store-category=open===================== */}
  <div className="container">
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <div className="store_logo">
          <img src={`${baseUrl}front/assets/images/store_logo.jpg`} />
        </div>
      </div>
    </div>
  </div>
  <div id="sticky">
    <div className="container">
      <div className="row">
        
        <div className="col-lg-10 offset-lg-1">
          <div className="tabs-container">
            <nav className="tabs">
              <ul>
                <li className="active">
                    <Link href={`${baseUrl}seller-details/${sellor_id}`}>Profile</Link>
                </li>
                <li >
                    <Link href={`${baseUrl}seller-details/${sellor_id}/products`}>Product</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-wrap_asd">
              <ul>
                <li>
                  <a href="profile.html">Business Overview</a>
                </li>
                <li>
                  <a href="what_our_customers_say.html">
                    What Our Customers Say
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-12"></div>
          <div className="col-lg-9 col-12 profile">
            <div className="row">
              <div className="">
                <h3>Business Overview</h3>
              </div>
              <div className="col-lg-6">
                <p>
                  Cloths World Technology Co., Ltd. specializes in electronic
                  design, structural innovation, and the assembly of
                  high-quality consumer electronics. With over 10 years of
                  experience, we offer a diverse range of products, including
                  wireless mute earphones, smart wearable devices, and e-book
                  readers.
                </p>
                <p>
                  We have over 50 models available, including custom designs,
                  all certified with CE, RoHS, and FCC standards. Our products
                  are exported globally and have received excellent feedback
                  from renowned brands.
                </p>
                <p>
                  At Cloths World, we are dedicated to providing top quality
                  solutions with cutting-edge technology and outstanding
                  service. Let s create a better future together!
                </p>
              </div>
              <div className="col-lg-5">
                <div className="profile_img">
                  <img src={`${baseUrl}front/assets/images/profile_image.jpg`} />
                </div>
              </div>
              <div className="col-lg-11">
                <div className="business_pfofile pt--30">
                  <img src={`${baseUrl}front/assets/images/djfdl_review.jpg`} /> Business Profile
                </div>
              </div>
              <div className="col-lg-11">
                <div className="table-responsive table-wrap">
                  <div className="table-block">
                    <table>
                      <tbody>
                        <tr>
                          <td className="border-right"> 
                            <span>Type of Enterprise:</span> Cloth Manufacturing
                            Firm
                          </td>
                          <td> 
                            <span>Year Founded:</span> 202
                          </td>
                        </tr>
                        <tr>
                          <td className="border-right"> 
                            <span>Product Line:</span> Casual Wear, Activewear,
                            Outerwear, Accessories, Footwear Hea
                          </td>
                          <td> 
                            <span>Headquarters:</span> Shandong, China
                          </td>
                        </tr>
                        <tr>
                          <td className="border-right">
                            
                            <span> Employee Count:</span> 11 - 50 Staff Members
                          </td>
                          <td>
                            
                            <span>Brand Registration:</span> Registered
                            Trademarks
                          </td>
                        </tr>
                        <tr>
                          <td className="border-right">
                            
                            <span> Quality Certifications:</span> ISO 9001
                          </td>
                          <td>
                            
                            <span>Product Compliance Certifications:</span>
                            OEKO-TEX, GOTS
                          </td>
                        </tr>
                        <tr>
                          <td className="border-right">
                            
                            <span> Patent Status:</span> Pending on Unique
                            Designs
                          </td>
                          <td>
                            
                            <span>Revenue Range:</span> US$5 Million - US$10
                            Million
                          </td>
                        </tr>
                        <tr>
                          <td className="border-right">
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      paddingLeft: 0
                                    }}
                                  >
                                    <span> Target Markets:</span>
                                  </td>
                                  <td>
                                    Eastern Europe 25% North America 25% South
                                    America 20%
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      paddingLeft: 0,
                                      width: "auto"
                                    }}
                                  >
                                    
                                    <span>Sustainability Practices:</span>
                                  </td>
                                  <td>
                                    Committed to eco-friendly materials
                                    andethical manufacturing processes
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-11">
                <div className="customers-say">
                  <h2>What Our Customers Say</h2>
                </div>
                <div className="review_outer">
                  <div className="col-lg-9 offset-lg-1">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="rating-circle nine half">
                          <div className="rc-pie rc-spinner" />
                          <div className="rc-pie rc-filler" />
                          <div className="rc-mask" />
                          <div className="rc-count" />
                        </div>
                        
                      </div>
                      <div className="col-lg-8 offset-lg-1">
                        <div className="rating_review">
                          <ul>
                            <li>
                              <span>Vendor Support </span>
                              <span className="colon_3">:</span>
                              <div className="product-status2">
                                <div className="rating-stars-group">
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star-half-alt" />
                                  </div>
                                  <span className="value_df">4.6</span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <span>Timely Delivery </span>
                              <span className="colon_3">:</span>
                              <div className="product-status2">
                                <div className="rating-stars-group">
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star-half-alt" />
                                  </div>
                                  <span className="value_df">4.5</span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <span>Quality Assurance </span>
                              <span className="colon_3">:</span>
                              <div className="product-status2">
                                <div className="rating-stars-group">
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star" />
                                  </div>
                                  <div className="rating-star">
                                    <i className="fas fa-star-half-alt" />
                                  </div>
                                  <span className="value_df">4.7</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <a
                          href="what_our_customers_say.html"
                          className="view_all mt--20"
                        >
                          View All Feedback
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default page