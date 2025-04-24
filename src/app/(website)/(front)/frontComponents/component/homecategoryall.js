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

const HomeCategoryAll = ({ categoryListAll }) => {

  const [similarProduct, setSimilarProduct] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [enableNavigation, setEnableNavigation] = useState(false);
  
  useEffect(() => {
    //console.log(recommendationList)
    setSimilarProduct(categoryListAll)
  }, [categoryListAll])


  // slide responsive data
  
  useEffect(() => {
    const updateSlidesPerView = () => {
      let newSlidesPerView = 1;

      if (window.innerWidth >= 1024) {
        newSlidesPerView = 8;
      } else if (window.innerWidth >= 768) {
        newSlidesPerView = 4;
      } else {
        newSlidesPerView = 2;
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

  


  return (
    <>
      <div
        className="tranding-items-tab-area-start rts-section-gap"
        bis_skin_checked={1}
      >
        
        <div>
          <Swiper
            spaceBetween={0}  
            //pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}  
            className="swiper-container"
            slidesPerView={slidesPerView}
            navigation={true}
            autoplay={{ delay: 4000 }}
            loop={false}
            
          >
            {similarProduct.length > 0 ? similarProduct.map((product, index)=>(
              <SwiperSlide key={index}>
              <div className="swiper-slide" key={index}>
                            <div className="single-category-one height-230">
                              {" "}
                              <Link href={`${baseUrl}/product/${product.slug}`} className="thumbnail">
                                {" "}
                                <img
                                  src={`${baseUrl}${product.list_image}`}
                                  alt={`${product.name}`}
                                />{" "}
                              </Link>
                              <div className="inner-content-category">
                              <Link href={`${baseUrl}/product/${product.slug}`}><p>{product.name}</p></Link>
                                <span>{product.productCount} Items</span>
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
export default HomeCategoryAll;