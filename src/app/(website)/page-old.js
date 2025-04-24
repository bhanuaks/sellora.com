'use client';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import HomeBannerSlider from './(front)/frontComponents/HomeBannerSlider';
import HomeAllCategory from './(front)/frontComponents/HomeAllCategory';
import { baseUrl } from '@/Http/helper';

export default function Home() {



  return (
    <>
  
  
  <div className="background-light-gray-color rts-section-gap bg_light-1 pt_sm--20">
    <div className="rts-banner-area-one">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="banner-six-left-content bg_image">
              <div className="content-area">
                <h3 className="title">
                  Beauty Perfume <br />
                  <span> Updated daily.</span>
                </h3>
                <Link href="#" className="shop-now-goshop-btn">
                  
                  <span className="text">Shop Now</span>
                  <div className="plus-icon">
                    
                    <i className="fa-sharp fa-regular fa-plus" />
                  </div>
                  <div className="plus-icon">
                    
                    <i className="fa-sharp fa-regular fa-plus" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">

            {/* <div className="category-area-main-wrapper-one">
              <div
                className="swiper mySwiper-category-1 swiper-data"
                data-swiper='{
                          "spaceBetween":1,
                          "slidesPerView":1,
                          "loop": true,
                          "speed": 2000,
                          "autoplay":{
                              "delay":"4000"
                          },
                          "navigation":{
                              "nextEl":".swiper-button-next",
                              "prevEl":".swiper-button-prev"
                          },
                          "breakpoints":{
                          "0":{
                              "slidesPerView":1,
                              "spaceBetween": 0},
                          "320":{
                              "slidesPerView":1,
                              "spaceBetween":0},
                          "480":{
                              "slidesPerView":1,
                              "spaceBetween":0},
                          "640":{
                              "slidesPerView":1,
                              "spaceBetween":0},
                          "840":{
                              "slidesPerView":1,
                              "spaceBetween":0},
                          "1140":{
                              "slidesPerView":1,
                              "spaceBetween":0}
                          }
                      }'
              >
                <div className="swiper-wrapper">
                  
                  <div className="swiper-slide">
                    <div className="banner-bg-image bg_image bg_one-banner  ptb--120 ptb_md--80 ptb_sm--60">
                      <div className="banner-one-inner-content">
                        
                        <span className="pre">Big Saving Days Sale</span>
                        <h1 className="title">
                          
                          Do not miss <br />
                          Fashion deals
                        </h1>
                        <div className="offer-text">
                          Starting At Only <span>$59.00</span>
                        </div>
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Shop Now </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-light fa-arrow-right" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-light fa-arrow-right" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="swiper-slide">
                    <div className="banner-bg-image bg_image bg_one-banner two  ptb--120 ptb_md--80 ptb_sm--60">
                      <div className="banner-one-inner-content">
                        
                        <span className="pre">Big Saving Days Sale</span>
                        <h1 className="title">
                          
                          Buy Modern Chair In <br />
                          Black Color
                        </h1>
                        <div className="offer-text">
                          Starting At Only <span>$59.00</span>
                        </div>
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Shop Now </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-light fa-arrow-right" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-light fa-arrow-right" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <button className="swiper-button-next">
                  <i className="fa-regular fa-arrow-right" />
                </button>
                <button className="swiper-button-prev">
                  <i className="fa-regular fa-arrow-left" />
                </button>
              </div>
            </div> */}

            <HomeBannerSlider/>

          </div>
          <div className="col-lg-3">
            <div className="banner-five-right-content bg_image">
              <div className="content-area">
                {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
                <h3 className="title">
                  
                  Smart Watches
                  <br />
                  <span> Updated daily.</span>
                </h3>
                <Link href="#" className="shop-now-goshop-btn">
                  
                  <span className="text">Shop Now</span>
                  <div className="plus-icon">
                    
                    <i className="fa-sharp fa-regular fa-plus" />
                  </div>
                  <div className="plus-icon">
                    
                    <i className="fa-sharp fa-regular fa-plus" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="rts-feature-area rts-section-gap">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-2">
          <div className="better_choices">
            <h1>
              Better Selections,
              <br />
              Brighter Prices
            </h1>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                  {/*  <i className="far fa-truck"></i> */}
                  <img src={`${baseUrl}front/assets/images/Fast-Delivery.jpg`} />
                </div>
                <div className="content">
                  <h4 className="title">Fast Delivery</h4>
                  <span>
                    Get your items delivered faster with our enhanced service on
                    select products
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                  <img src={`${baseUrl}front/assets/images/Secured_Payment.jpg`} />
                  {/* <i className="far fa-briefcase"></i>  */}
                </div>
                <div className="content">
                  <h4 className="title">Secured Payment</h4>
                  <span>
                    The payment methods loved and used by shoppers, offering
                    safety and high levels of trust.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                  
                  <img src={`${baseUrl}front/assets/images/shoppers-worldwide.jpg`} />
                  {/* <i className="far fa-gift"></i> */}
                </div>
                <div className="content">
                  <h4 className="title">Shoppers worldwide</h4>
                  <span>
                    Join 300 million shoppers from over 200 countries and
                    regions.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                  
                  <img src={`${baseUrl}front/assets/images/Buyer-protection.jpg`} />
                  {/* <i className="far fa-volume-control-phone"></i> */}
                </div>
                <div className="content">
                  <h4 className="title">Buyer protection</h4>
                  <span>
                    Receive a refund if your items arrive late or do not match
                    the description.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                  <img src={`${baseUrl}front/assets/images/Value-for-mo.jpg`} />
                  {/* <i className="far fa-inr"></i> */}
                </div>
                <div className="content">
                  <h4 className="title">Value-for-money</h4>
                  <span>Enjoy competitive prices on millions of items.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  {/* rts categorya area start */}

           <HomeAllCategory/>

  {/* rts categorya area end */}
  {/* rts feature product 2 area start */}
  <div className="rts-feature-large-product-area">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="feature-product-area-large-2 bg_image">
            <div className="inner-feature-product-content">
              {/*     <span>Weekend Discount</span> */}
              <h2 className="title">
                
                Headset <br />
                Best wireless Furniture
              </h2>
              <p>Lorem ipsum dolor sit amet</p>
              <Link href="#" className="rts-btn btn-primary">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="feature-product-area-large-2 bg_2 bg_image">
            <div className="inner-feature-product-content">
              {/*  <span>Weekend Discount</span> */}
              <h2 className="title">
                
                WOO! Flash Sale
                <br />
                2k+ best Products
              </h2>
              <p>Lorem ipsum dolor sit amet</p>
              <Link href="#" className="rts-btn btn-primary">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rts feature product 2 area end */}
  {/* popular -product wrapper 7 */}
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
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Fashion
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Home &amp; Kitchen
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Beauty &amp; Health
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="furniture-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#furniture"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Furniture
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row plr_sm--5">
        <div className="col-lg-12">
          <div className="tab-content" id="myTabContent">
            {/* first tabs Fashion area start*/}
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row g-4 mt--0">
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Bestsellers in Women's Indian Clothing</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/61D7nbhylBL._AC_SY170_.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/kldfj_03.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/djfkl04.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/sdfj_04.jpg`} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Under $499 | Pocket-friendly fashion</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/clothing.jpg`} />
                              </div>
                              <div className="cloth_name">Clothing</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/basket.jpg`} />
                              </div>
                              <div className="cloth_name">Backpacks</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/footeware.jpg`} />
                              </div>
                              <div className="cloth_name">Footwear</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/view_all.jpg`} />
                              </div>
                              <div className="cloth_name">View all</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See all offers</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Customers’ Most-Loved Fashion for you</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_01.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_02.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_03.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_04.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Appliances for your home | Up to 55% off</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/air_condition.jpg`} />
                              </div>
                              <div className="cloth_name">Air conditioners</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/Refrigerators.jpg`} />
                              </div>
                              <div className="cloth_name">Refrigerators</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/washing-machines.jpg`} />
                              </div>
                              <div className="cloth_name">Washing machines</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/microwaves.jpg`} />
                              </div>
                              <div className="cloth_name">Microwaves</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See more</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd tabs Home & Kitchen area start*/}
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="row g-4 mt--0">
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Best Sellers in Home &amp; Kitchen</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/k1.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/k2.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/k3.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/k4.jpg`} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Under $499 | Pocket-friendly fashion</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/clothing.jpg`} />
                              </div>
                              <div className="cloth_name">Clothing</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/basket.jpg`} />
                              </div>
                              <div className="cloth_name">Backpacks</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/footeware.jpg`} />
                              </div>
                              <div className="cloth_name">Footwear</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/view_all.jpg`} />
                              </div>
                              <div className="cloth_name">View all</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See all offers</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Customers’ Most-Loved Fashion for you</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_01.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_02.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_03.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_04.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Appliances for your home | Up to 55% off</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/air_condition.jpg`} />
                              </div>
                              <div className="cloth_name">Air conditioners</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/Refrigerators.jpg`} />
                              </div>
                              <div className="cloth_name">Refrigerators</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/washing-machines.jpg`} />
                              </div>
                              <div className="cloth_name">Washing machines</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/microwaves.jpg`} />
                              </div>
                              <div className="cloth_name">Microwaves</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See more</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 3rd tabs Beauty & Health area start*/}
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div className="row g-4 mt--0">
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Beauty &amp; Personal Care Facial Skin </h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/beauty01.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/beauty02.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/beauty03.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/beauty04.jpg`} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Under $499 | Pocket-friendly fashion</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/clothing.jpg`} />
                              </div>
                              <div className="cloth_name">Clothing</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/basket.jpg`} />
                              </div>
                              <div className="cloth_name">Backpacks</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/footeware.jpg`} />
                              </div>
                              <div className="cloth_name">Footwear</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/view_all.jpg`} />
                              </div>
                              <div className="cloth_name">View all</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See all offers</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Customers’ Most-Loved Fashion for you</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_01.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_02.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_03.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_04.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Appliances for your home | Up to 55% off</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/air_condition.jpg`} />
                              </div>
                              <div className="cloth_name">Air conditioners</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/Refrigerators.jpg`} />
                              </div>
                              <div className="cloth_name">Refrigerators</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/washing-machines.jpg`} />
                              </div>
                              <div className="cloth_name">Washing machines</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/microwaves.jpg`} />
                              </div>
                              <div className="cloth_name">Microwaves</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See more</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 5th tabs Electronic area start*/}
            <div
              className="tab-pane fade"
              id="furniture"
              role="tabpanel"
              aria-labelledby="furniture-tab"
            >
              <div className="row g-4 mt--0">
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Up to 60% off | all Furniture</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/fur_01.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/fur_02.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/fur_03.jpg`} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              
                              <img src={`${baseUrl}front/assets/images/fur_04.jpg`} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Under $499 | Pocket-friendly fashion</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/clothing.jpg`} />
                              </div>
                              <div className="cloth_name">Clothing</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/basket.jpg`} />
                              </div>
                              <div className="cloth_name">Backpacks</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/footeware.jpg`} />
                              </div>
                              <div className="cloth_name">Footwear</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/view_all.jpg`} />
                              </div>
                              <div className="cloth_name">View all</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See all offers</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Customers’ Most-Loved Fashion for you</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_01.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_02.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_03.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm">
                                
                                <img src={`${baseUrl}front/assets/images/fashion_04.jpg`} />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="gw-card-layout">
                    <h2>Appliances for your home | Up to 55% off</h2>
                    <div className="a-cardui-body">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/air_condition.jpg`} />
                              </div>
                              <div className="cloth_name">Air conditioners</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/Refrigerators.jpg`} />
                              </div>
                              <div className="cloth_name">Refrigerators</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/washing-machines.jpg`} />
                              </div>
                              <div className="cloth_name">Washing machines</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V">
                            
                            <Link href="#">
                              <div className="_quad-multi-asin-card-v2_style_quadrant__3xH-V2">
                                
                                <img src={`${baseUrl}front/assets/images/microwaves.jpg`} />
                              </div>
                              <div className="cloth_name">Microwaves</div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="a-cardui-footer">
                            <Link href="#">See more</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 5th tabs  Electronic area end*/}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* popular -product wrapper 7 end */}
  <div className="tranding-items-tab-area-start rts-section-gap bg_gradient-tranding-items mt--20">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-between">
            <h2 className="title-left"> Trending items</h2>
            {/*  <div className="next-prev-swiper-wrapper">
      <div className="swiper-button-prev"><i className="fa-regular fa-chevron-left"></i></div>
      <div className="swiper-button-next"><i className="fa-regular fa-chevron-right"></i></div>
    </div> */}
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="category-area-main-wrapper-one">
            <div
              className="swiper mySwiper-category-1 swiper-data"
              data-swiper='{
                      "spaceBetween":16,
                      "slidesPerView":6,
                      "loop": true,
                      "speed": 700,
                      "autoplay":{
                      "delay":"4000"},
                      "navigation":{
                          "nextEl":".swiper-button-next",

                          "prevEl":".swiper-button-prev"
                        },
                      "breakpoints":{
                      "0":{
                          "slidesPerView":1,
                          "spaceBetween": 12},
                      "320":{
                          "slidesPerView":1,
                          "spaceBetween":12},
                      "480":{
                          "slidesPerView":2,
                          "spaceBetween":12},
                      "640":{
                          "slidesPerView":2,
                          "spaceBetween":16},
                      "840":{
                          "slidesPerView":3,
                          "spaceBetween":16},
                      "1140":{
                          "slidesPerView":6,
                          "spaceBetween":16},
                      "1540":{
                          "slidesPerView":6,
                          "spaceBetween":16},
                      "1840":{
                          "slidesPerView":6,
                          "spaceBetween":16}
                      }
                  }'
            >
              <div className="swiper-wrapper">
                {/* single swiper start */}
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/17.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Premium monitors - Widescreen Monitors
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/18.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Philips Viva Collection HD4928/01
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/boat.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Air bot, air bot Suppliers and
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/20.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Apple AirPods Max Over-Ear Wireless Headphone
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="next-prev-swiper-wrapper">
                <div className="swiper-button-prev">
                  <i className="fa-regular fa-chevron-left" />
                </div>
                <div className="swiper-button-next">
                  <i className="fa-regular fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="tranding-items-tab-area-start rts-section-gap bg_gradient-tranding-items mt--20">
    <div className="container">
      <div className="row g-4 mt--20 mb--40">
        <div className="col-lg-3">
          
          <Link href="#">
            <div
              className="gw-card-layout p0 box-card-item"
              style={{ background: `url(${baseUrl}front/assets/images/banner01.jpg)` }}
            >
              {/* <h2>Toys under $499</h2> */}
              {/*  <div className="img_big2"> <img src={`${baseUrl}front/assets/images/banner01.jpg`}> </div> */}
              <div className="top_header_button">
                Large Check-in Suitcase (70 cm) 4 Wheels -
              </div>
              <div className="bottom_footer_button">See more</div>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          
          <Link href="#">
            <div
              className="gw-card-layout2 box-card-item"
              style={{ background: `url(${baseUrl}front/assets/images/banner_003.jpg)` }}
            >
              <div className="main-title white-text">
                A wash mode for every load <br />
                <span>TCL Washin Machine </span>
              </div>
              <div className="bottom_footer_button">See more</div>
            </div>
          </Link>
          <Link href="#">
            <div
              className="gw-card-layout2 box-card-item"
              style={{ background: `url(${baseUrl}front/assets/images/banner_004.jpg)` }}
            >
              <div className="main-title">
                Mobile Shope-Smart <br />
                <span>Watch T-55</span>
              </div>
              <div className="bottom_footer_button">See more</div>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          
          <Link href="#">
            <div
              className="gw-card-layout2 box-card-item"
              style={{ background: `url(${baseUrl}front/assets/images/banner_006.jpg)` }}
            >
              <div className="main-title">
                Minimum 50% off <br />
                <span> Kitchen Appliances</span>
              </div>
              <div className="bottom_footer_button">See more</div>
            </div>
          </Link>
          <Link href="#">
            <div
              className="gw-card-layout2 box-card-item"
              style={{ background: `url(${baseUrl}front/assets/images/banner_005.jpg)` }}
            >
              <div className="main-title white-text">
                Beauty &amp; Health <br />
                <span>Celebrate</span>
              </div>
              <div className="bottom_footer_button">See more</div>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          
          <Link href="#">
            <div
              className="gw-card-layout p0 box-card-item"
              style={{ background: `url(${baseUrl}front/assets/images/banner02.jpg)` }}
            >
              {/* <h2>Toys under $499</h2> */}
              {/*  <div className="img_big2"> <img src={`${baseUrl}front/assets/images/banner01.jpg`}> </div> */}
              <div className="top_header_button">
                Wooden TV showcase <br />
                design for hall
              </div>
              <div className="bottom_footer_button">See more</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="rts-blog-area rts-section-gap bg_gradient-tranding-items">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-between">
            <h2 className="title-left mb--0"> On the top of their wish list</h2>
            {/* <div className="next-prev-swiper-wrapper">
      <div className="swiper-button-prev"><i className="fa-regular fa-chevron-left"></i></div>
      <div className="swiper-button-next"><i className="fa-regular fa-chevron-right"></i></div>
    </div> */}
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="category-area-main-wrapper-one">
            <div
              className="swiper mySwiper-category-1 swiper-data"
              data-swiper='{
                      "spaceBetween":16,
                      "slidesPerView":6,
                      "loop": true,
                      "speed": 700,
                      "autoplay":{
                      "delay":"4000"},
                      "navigation":{
                          "nextEl":".swiper-button-next",

                          "prevEl":".swiper-button-prev"
                        },
                      "breakpoints":{
                      "0":{
                          "slidesPerView":1,
                          "spaceBetween": 12},
                      "320":{
                          "slidesPerView":1,
                          "spaceBetween":12},
                      "480":{
                          "slidesPerView":2,
                          "spaceBetween":12},
                      "640":{
                          "slidesPerView":2,
                          "spaceBetween":16},
                      "840":{
                          "slidesPerView":3,
                          "spaceBetween":16},
                      "1140":{
                          "slidesPerView":6,
                          "spaceBetween":16},
                      "1540":{
                          "slidesPerView":6,
                          "spaceBetween":16},
                      "1840":{
                          "slidesPerView":6,
                          "spaceBetween":16}
                      }
                  }'
            >
              <div className="swiper-wrapper">
                {/* single swiper start */}
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/20.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Electric 1.8 liter Multi Cooker
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/21.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Philips Viva Collection HD4928/01
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/boat.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Smart Speaker &amp; Google Assistant, Light Grey
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      
                      <Link href="/product-details">
                        
                        <img
                          src={`${baseUrl}front/assets/images/grocery/17.jpg`}
                          alt="grocery"
                        />
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> */}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          
                          <i className="fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <Link href="/product-details">
                        <h4 className="title">
                          Premium monitors - Widescreen Monitors
                        </h4>
                      </Link>
                      {/*  */}
                      <div className="price-area">
                        
                        <span className="current">$499</span>
                        <div className="previous">$516.00</div>
                      </div>
                      <div className="min-off">
                        Min. 20% <span>Off</span>
                      </div>
                      <div className="cart-counter-action">
                        
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                          <div className="arrow-icon">
                            
                            <i className="fa-regular fa-cart-shopping" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="next-prev-swiper-wrapper">
                <div className="swiper-button-prev">
                  <i className="fa-regular fa-chevron-left" />
                </div>
                <div className="swiper-button-next">
                  <i className="fa-regular fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    
  );
}
