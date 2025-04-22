"use client"
import { baseUrl, getOffPrecentage, main_thumb_img_path } from "@/Http/helper";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { fileBasePath } from "@/Http/urlHelper";
import Image from "next/image";

const Recommendations = ({ recommendationList, recommendationWishlist }) => {

  const [similarProduct, setSimilarProduct] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [enableNavigation, setEnableNavigation] = useState(false);
  
  useEffect(() => {
    //console.log(recommendationList)
    setSimilarProduct(recommendationList)
  }, [recommendationList])


  // slide responsive data
  
  useEffect(() => {
    const updateSlidesPerView = () => {
      let newSlidesPerView = 1;

      if (window.innerWidth >= 1024) {
        newSlidesPerView = 5;
      } else if (window.innerWidth >= 768) {
        newSlidesPerView = 3;
      } else {
        newSlidesPerView = 1;
      }

      setSlidesPerView(newSlidesPerView);
      setEnableNavigation(similarProduct.length > newSlidesPerView);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);


  if(similarProduct.length == 0){
    return(<></>)
  }

  const handleWishlist = (pid, vid) => {
        recommendationWishlist(pid, vid)
  }


  return (
    <>
      <div
        className="tranding-items-tab-area-start rts-section-gap"
        bis_skin_checked={1}
      >
        <div className="container" bis_skin_checked={1}>
          <div className="row" bis_skin_checked={1}>
            <div className="col-lg-12" bis_skin_checked={1}>
              <div className="title-area-between" bis_skin_checked={1}>
                <h2 className="title-left"> Top Picks for You</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Swiper
            spaceBetween={16}  
            //pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}  
            className="swiper-container"
            slidesPerView={slidesPerView}
            navigation={true}
            autoplay={{ delay: 4000 }}
            
          >
            {similarProduct.length > 0 ? similarProduct.map((product, index)=>(
              <SwiperSlide key={index}>
              <div className="slide-content"><div className="swiper-slide">
                <div className="single-shopping-card-one deals-of-day">
                  <div className="image-and-action-area-wrapper">
                    <a href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
                      
                       <Image
                        src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                        alt="Product Image"
                        loading="lazy"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </a>
                    <div className="action-share-option">
                      <div className="single-action openuptip message-show-action" onClick={()=>handleWishlist(product._id, product.variant?._id)}>
                        <i className="fa-light fa-heart" />
                      </div>
                      {/* <div className="single-action openuptip cta-quickview product-details-popup-btn">
                        <i className="fa-regular fa-eye" />
                      </div> */}
                    </div>
                  </div>
                  <div className="body-content">
                    <div className="start-area-rating">

                    <i className={`fa-star${product.avgRating >0 && product.avgRating < 1?"-half-alt fa-solid selected":""}  ${product.avgRating >=1?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >1 && product.avgRating < 2?"-half-alt fa-solid selected":""} ${product.avgRating >=2?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >2 && product.avgRating < 3?"-half-alt fa-solid selected":""} ${product.avgRating >=3?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >3 && product.avgRating < 4?"-half-alt fa-solid selected":""} ${product.avgRating >=4?"fa-solid selected":"fa-light"}`} /> 
                              <i className={`fa-star${product.avgRating >4 && product.avgRating < 5?"-half-alt fa-solid selected":""} ${product.avgRating >=5?"fa-solid selected":"fa-light"}`} />  
              
                      
                    </div>
                    <a href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
                      <h4 className="title">{product.product_name}</h4>
                    </a>
                    <div className="price-area">
                      <span className="current">${product.variant && product.variant.consumerSalePrice.toFixed(2)}</span>
                      <div className="previous">${product.variant && product.variant.msrp.toFixed(2)}</div>
                    </div>
                    
                  </div>
                </div>
              </div>
              </div>
            </SwiperSlide>
            )):null}
            

          </Swiper>

        </div>

      </div>

    </>
  )
}
export default Recommendations;