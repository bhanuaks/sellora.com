'use client';
import React, { lazy, Suspense, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
//import HomeBannerSlider from './(front)/frontComponents/HomeBannerSlider';
import HomeAllCategory from './(front)/frontComponents/HomeAllCategory';
import { baseUrl } from '@/Http/helper';
import { useCart } from './contaxtData/cartContaxt';
const HomeBannerSlider = lazy(() =>
  import("./(front)/frontComponents/HomeBannerSlider")
);
const BestSellers = lazy(() =>
  import("./(front)/frontComponents/component/bestSellers")
);
const FeatureBanner = lazy(() =>
  import("./(front)/frontComponents/component/featureBanner")
);
const HomeUserWishlist = lazy(() =>
  import("./(front)/frontComponents/component/homeUserWishlist")
);
const HomeTrendingItems = lazy(() =>
  import("./(front)/frontComponents/component/homeTrendingItems")
);

export default function Home() {
  const [bannerLeft, setBannerLeft] = useState({})
  const [bannerRight, setBannerRight] = useState({})
  const [dealBannerLeft, setDealBannerLeft] = useState({})
  const [dealBannerRight, setDealBannerRight] = useState({})
  const [categoryListAll, setCategoryListAll] = useState([])
  const [bestSeller, setBestSeller] = useState([])
  const [featureBannerList, setFeatureBannerList] = useState([])
  const [recommendationList, setRecommendationList] = useState("")
  const [homeTrendingList, setHomeTrendingList] = useState("")

  const { user } = useCart()

  const fetchFeatureBanner = async () => {
    try {
      const response = await fetch('./api/front/get-feature-banner');
      const result = await response.json();
      //console.log(result.data)
      if (response.ok) {
        setFeatureBannerList(result.data[0])
      } else {

      }
    } catch (error) {
      //console.error('Error fetching banners:', error);
      //alert('Failed to fetch banners.');
      //`${baseUrl}${bannerLeft.photo}`
    }
  };
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

  const fetchTrendingData = async () => {
    try {
      //$('.loader-container').css('display', 'flex') 
      const url = new URL(`${baseUrl}/api/front/get-trending-item`);
      const queryParams = {
        

      };

      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          url.searchParams.append(key, queryParams[key]);
        }
      });

      const response = await fetch(url);
      const result = await response.json();
      //console.log(result)
      if (result.status) {
        //$('.loader-container').css('display', 'none') 
        setHomeTrendingList(result.data.finalResults);


      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);

    }
  }

  useEffect(() => {
    fetchBannersLeft()
    fetchBannersRight()
    fetchDealBannersLeft()
    fetchDealBannersRight()
    fetchCategoryAll()
    fetchBestSeller()
    fetchFeatureBanner()
    fetchTrendingData()
  }, [])


  const fetchRecommData = async (userid) => {
    try {
      //$('.loader-container').css('display', 'flex') 
      const url = new URL(`${baseUrl}/api/product/add-to-wishlist`);
      const queryParams = {
        user_id: userid,

      };

      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          url.searchParams.append(key, queryParams[key]);
        }
      });

      const response = await fetch(url);
      const result = await response.json();
      //console.log(result)
      if (result.status) {
        //$('.loader-container').css('display', 'none') 
        setRecommendationList(result.data.finalResults);


      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);

    }
  }
  useEffect(() => {
    //console.log('useriddddd',user)
    if (user?._id) {

      fetchRecommData(user?._id)
    }
  }, [user])




  return (
    <>


      <div className="background-light-gray-color rts-section-gap bg_light-1 pt_sm--20">
        <div className="rts-banner-area-one">
          <div className="container">
            <div className="row">

              <div className="col-lg-3 d-lg-block d-none">
                <div className="banner-five-right-content bg_image" style={{ backgroundImage: `url(${baseUrl}${bannerLeft.photo})` }}>
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

                <HomeBannerSlider />

              </div>
              <div className="col-lg-3 d-lg-block d-none">
                <div className="banner-five-right-content bg_image" style={{ backgroundImage: `url(${baseUrl}${bannerRight.photo})` }}>
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
              <div className="feature-product-area-large-2 bg_image" style={{ backgroundImage: `url(${baseUrl}${dealBannerLeft.photo})` }}>
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
              <div className="feature-product-area-large-2 bg_2 bg_image" style={{ backgroundImage: `url(${baseUrl}${dealBannerRight.photo})` }}>
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

      <Suspense fallback={<div className='row'>Loading...</div>}>
        {homeTrendingList &&
          <HomeTrendingItems recommendationList={homeTrendingList} />
        }
      </Suspense>



      <Suspense fallback={<div className='row'>Loading...</div>}>
        {featureBannerList &&
          <FeatureBanner featureBannerList={featureBannerList} />
        }
      </Suspense>

      <Suspense fallback={<div className='row'>Loading...</div>}>
        {user && recommendationList &&
          <HomeUserWishlist recommendationList={recommendationList} />
        }
      </Suspense>



    </>


  );
}
