'use client';
import React, { lazy, Suspense, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
//import HomeBannerSlider from './(front)/frontComponents/HomeBannerSlider';
import HomeAllCategory from './(front)/frontComponents/HomeAllCategory';
import { baseUrl } from '@/Http/helper';
import { useCart } from './contaxtData/cartContaxt';
import MobileHomeBannerSection from './(front)/frontComponents/component/MobileHomeBannerSection';
import BetterSelection from './(front)/frontComponents/component/BetterSelection';
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
                   
                    {bannerLeft.title && (
                      <h3 className="title">
                          {bannerLeft.title} 
                      </h3>
                    )}  
                    {bannerLeft.url && (
                      <Link href={`${bannerLeft.url}`} className="shop-now-goshop-btn">

                      <span className="text">Shop Now</span>
                      {/* <div className="plus-icon">

                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                      <div className="plus-icon">

                        <i className="fa-sharp fa-regular fa-plus" />
                      </div> */}
                    </Link>
                    )}
                    
                  </div>
                </div>
              </div>
              <div className="col-lg-6"> 
                <HomeBannerSlider /> 
              </div>
              <div className="col-lg-3 d-lg-block d-none">
                <div className="banner-five-right-content bg_image" style={{ backgroundImage: `url(${baseUrl}${bannerRight.photo})` }}>
                  <div className="content-area">
                    {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
                    {bannerRight.title && ( 
                        <h3 className="title">
                           {bannerRight.title} 
                        </h3>
                    )}
                   
                   {bannerRight.url && (

                      <Link href={`${bannerRight.url}`} className="shop-now-goshop-btn">

                      <span className="text">Shop Now</span>
                      {/* <div className="plus-icon">

                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                      <div className="plus-icon">

                        <i className="fa-sharp fa-regular fa-plus" />
                      </div> */}
                      </Link>
                   )}
                   
                  </div>
                </div>
              </div>

              <MobileHomeBannerSection bannerRight={bannerRight} bannerLeft={bannerLeft} />

              
            </div>
          </div>
        </div>
      </div>


       <BetterSelection />

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
              <div className="feature-product-area-large-2 bg_image" style={{ backgroundImage: `url(${baseUrl}${dealBannerLeft.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                     }}>
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
              <div className="feature-product-area-large-2 bg_2 bg_image" style={{ backgroundImage: `url(${baseUrl}${dealBannerRight.photo})` 
                ,
                backgroundSize: 'cover',
                backgroundPosition: 'top'
              }}>
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
