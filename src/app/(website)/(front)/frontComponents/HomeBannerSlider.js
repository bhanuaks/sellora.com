'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

import Link from 'next/link';
import { baseUrl } from '@/Http/helper';

const HomeBannerSlider = () => {
  const [banner, setBanner] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('./api/admin/banner');
        const result = await response.json();
        if (response.ok) {
          setBanner(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="category-area-main-wrapper-one home-banner-slider">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Autoplay, Thumbs]}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={1}
        slidesPerView={1}
        speed={2000}
        className="mySwiper-category-1"
      >
        {banner.map((bannerList, index) => (
          <SwiperSlide key={index}>

            <a href={`${bannerList.url?bannerList.url:"#"}`}>
                          {/* <!-- <div class="banner-bg-image bg_image" style="background: url(assets/images/banner/08.jpg) center center; background-repeat: no-repeat; background-size: 100% 100%;"> </div> --> */}

                          <div className="slier_img">
                            <img src={`${baseUrl}${bannerList.photo}`} /></div>
                        </a> 
           
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button className="swiper-button-next">
          <i className="fa-regular fa-arrow-right" />
        </button>
        <button className="swiper-button-prev">
          <i className="fa-regular fa-arrow-left" />
        </button>
      </Swiper>

      {/* Thumbnail Swiper (Optional) */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        className="slider-thumbnail"
        breakpoints={{
          991: {
            spaceBetween: 30,
          },
          320: {
            spaceBetween: 15,
          },
        }}
      > 

      </Swiper>
    </div>
  );
};

export default HomeBannerSlider;
