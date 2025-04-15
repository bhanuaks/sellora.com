'use client';
import React, { lazy, Suspense, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
//import HomeBannerSlider from './(front)/frontComponents/HomeBannerSlider';
import HomeAllCategory from './(front)/frontComponents/HomeAllCategory';
import { baseUrl } from '@/Http/helper';
const HomeBannerSlider = lazy(() =>
  import("./(front)/frontComponents/HomeBannerSlider")
);
const BestSellers = lazy(() =>
  import("./(front)/frontComponents/component/bestSellers")
);


export default function Home() {
  const [bannerLeft, setBannerLeft] = useState({})
  const [bannerRight, setBannerRight] = useState({})
  const [dealBannerLeft, setDealBannerLeft] = useState({})
  const [dealBannerRight, setDealBannerRight] = useState({})
  const [categoryListAll, setCategoryListAll] = useState([])
  const [bestSeller, setBestSeller] = useState([])
  
  
  const fetchBestSeller = async () => {
    try {
      const response = await fetch('./api/front/get-best-sellers');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
         setBestSeller(result.data.products)
      } else {
  
      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };
  const fetchCategoryAll = async () => {
    try {
      const response = await fetch('./api/front/get-all-category');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
         setCategoryListAll(result.data.category)
      } else {
  
      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };
  const fetchBannersLeft = async () => {
    try {
      const response = await fetch('./api/admin/bannerleft');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
         setBannerLeft(result.data[0])
      } else {
  
      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };
  const fetchBannersRight = async () => {
    try {
      const response = await fetch('./api/admin/bannerright');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
         setBannerRight(result.data[0])
      } else {
  
      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };

  const fetchDealBannersLeft = async () => {
    try {
      const response = await fetch('./api/admin/dealBannerLeft');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
         setDealBannerLeft(result.data[0])
      } else {
  
      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };
  const fetchDealBannersRight = async () => {
    try {
      const response = await fetch('./api/admin/dealBannerRight');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
         setDealBannerRight(result.data[0])
      } else {
  
      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };

  useEffect(() => {
      fetchBannersLeft()
      fetchBannersRight()
      fetchDealBannersLeft()
      fetchDealBannersRight()
      fetchCategoryAll()
      fetchBestSeller()
  },[])

  return (
    <>
  
  
  <div className="background-light-gray-color rts-section-gap bg_light-1 pt_sm--20">
    <div className="rts-banner-area-one">
      <div className="container">
        <div className="row">
          
          <div className="col-lg-3">
            <div className="banner-five-right-content bg_image" style={{backgroundImage:`url(${baseUrl}${bannerLeft.photo})`}}>
              <div className="content-area">
                {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
                <h3 className="title">
                {bannerLeft.title}
                  
                </h3>
                <Link href={`${bannerLeft.url}`} className="shop-now-goshop-btn">
                  
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
            <div className="banner-five-right-content bg_image" style={{backgroundImage:`url(${baseUrl}${bannerRight.photo})`}}>
              <div className="content-area">
                {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
                <h3 className="title">
                  {bannerRight.title}
                  
                </h3>
                <Link href={`${bannerRight.url}`} className="shop-now-goshop-btn">
                  
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

           <Suspense fallback={<div className='row'>Loading...</div>}>
              {categoryListAll && 
                <HomeAllCategory categoryListAll={categoryListAll} />
              }
           </Suspense>

  {/* rts categorya area end */}
  {/* rts feature product 2 area start */}
  <div className="rts-feature-large-product-area">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="feature-product-area-large-2 bg_image" style={{backgroundImage:`url(${baseUrl}${dealBannerLeft.photo})`}}>
            <div className="inner-feature-product-content">
              {/*     <span>Weekend Discount</span> */}
              {dealBannerLeft?.title &&
              <h2 className="title">
                {dealBannerLeft.title}
              </h2>
              }
              {dealBannerLeft?.subtitle && 
              <p>{dealBannerLeft.subtitle}</p>
              }
              {dealBannerLeft?.url && 
              <Link href={`${dealBannerLeft.url}`} className="rts-btn btn-primary">
                Shop Now
              </Link>
              }
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="feature-product-area-large-2 bg_2 bg_image" style={{backgroundImage:`url(${baseUrl}${dealBannerRight.photo})`}}>
            <div className="inner-feature-product-content">
              {/*  <span>Weekend Discount</span> */}
              {dealBannerRight?.title && 
              <h2 className="title">
                
                {dealBannerRight.title}
              </h2>
              }
              {dealBannerRight?.subtitle && 
              <p>{dealBannerRight.subtitle}</p>
              }
              {dealBannerRight?.url && 
              <Link href={`${dealBannerRight.url}`} className="rts-btn btn-primary">
                Shop Now
              </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rts feature product 2 area end */}
  {/* popular -product wrapper 7 */}
  
            <Suspense fallback={<div className='row'>Loading...</div>}>
               {bestSeller && 
                <BestSellers bestSeller={bestSeller} />
               }
            </Suspense>

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
