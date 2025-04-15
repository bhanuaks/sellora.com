'use client';
import { baseUrl } from '@/Http/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Function to load script dynamically
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve(); // If script is already loaded, resolve immediately
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(new Error(`Failed to load script: ${src}`));
    
    document.body.appendChild(script);
  });
};

const HomeBannerSlider = () => {
  const [banner, setBanner] = useState([])
    
    
    const fetchBanners = async () => {
      try {
        const response = await fetch('./api/admin/banner');
        const result = await response.json();
        //console.log(result.data)
        if (response.ok) {
           setBanner(result.data)
        } else {
    
        }
      } catch (error) {
        //console.error('Error fetching banners:', error);
        //alert('Failed to fetch banners.');
        //`${baseUrl}${bannerLeft.photo}`
      }
    };
  
  
  
  useEffect(() => {
    fetchBanners()
    
    // Load Swiper.js dynamically and initialize sliders
    const initializeSwiper = async () => {
      try {
        // Dynamically load the Swiper JS script
        await loadScript('/front/assets/js/plugins.js');
        
        // Initialize Swiper sliders after script is loaded
        initializeSwipers();
      } catch (error) {
        console.error('Error loading Swiper script:', error);
      }
    };

    // Function to initialize Swiper sliders
    const initializeSwipers = () => {
      const defaults = {
        spaceBetween: 30,
        slidesPerView: 2,
      };

      // Initialize Swiper for main sliders
      const initSwipers = (defaults = {}, selector = '.swiper-data') => {
        const swipers = document.querySelectorAll(selector);
        swipers.forEach((swiper) => {
          const optionsData = swiper.dataset.swiper ? JSON.parse(swiper.dataset.swiper) : {};
          const options = { ...defaults, ...optionsData };
          new Swiper(swiper, options);
        });
      };
      
      initSwipers(defaults);

      // Initialize Swiper for thumbnail sliders
      const sliderThumbnail = new Swiper('.slider-thumbnail', {
        spaceBetween: 20,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          991: {
            spaceBetween: 30,
          },
          320: {
            spaceBetween: 15,
          },
        },
      });

      new Swiper('.swiper-container-h12', {
        thumbs: {
          swiper: sliderThumbnail,
        },
      });
    };

    // Initialize Swiper when component is mounted
    initializeSwiper();
  }, []);

  return (
    
    <div className="category-area-main-wrapper-one">
      <div
        className="swiper mySwiper-category-1 swiper-data"
        data-swiper='{
          "spaceBetween": 1,
          "slidesPerView": 1,
          "loop": true,
          "speed": 2000,
          "autoplay": {
            "delay": 4000
          },
          "navigation": {
            "nextEl": ".swiper-button-next",
            "prevEl": ".swiper-button-prev"
          },
          "breakpoints": {
            "0": { "slidesPerView": 1, "spaceBetween": 0 },
            "320": { "slidesPerView": 1, "spaceBetween": 0 },
            "480": { "slidesPerView": 1, "spaceBetween": 0 },
            "640": { "slidesPerView": 1, "spaceBetween": 0 },
            "840": { "slidesPerView": 1, "spaceBetween": 0 },
            "1140": { "slidesPerView": 1, "spaceBetween": 0 }
          }
        }'
      >
         
        <div className="swiper-wrapper">
          {/* Slide 1 */}
         {banner && banner.map((bannerList, index) =>  {

          return (
         
          <div className="swiper-slide" key={index}>
            <div className={`banner-bg-image bg_image bg_one-banner ${index==0 ?"two":""} ptb--120 ptb_md--80 ptb_sm--60`} style={{backgroundImage:`url(${baseUrl}${bannerList.photo})`}}>
              <div className="banner-one-inner-content">
                <span className="pre">{bannerList.subtitle}</span>
                <h1 className="title">
                {bannerList.title}
                </h1>
                <div className="offer-text">
                  Starting At Only <span>${bannerList.price}</span>
                </div>
                <Link href={`${bannerList.url}`} className="rts-btn btn-primary radious-sm with-icon">
                  <div className="btn-text">Shop Now</div>
                  <div className="arrow-icon">
                    <i className="fa-light fa-arrow-right" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          )
        })}
          
          {/* Slide 2 */}
          
        </div>


        {/* Navigation Buttons */}
        <button className="swiper-button-next">
          <i className="fa-regular fa-arrow-right" />
        </button>
        <button className="swiper-button-prev">
          <i className="fa-regular fa-arrow-left" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="swiper slider-thumbnail">
        <div className="swiper-wrapper">
          {/* Add thumbnail slides here */}
        </div>
      </div>
      <div className="swiper swiper-container-h12">
        <div className="swiper-wrapper">
          {/* Add main synchronized slides here */}
        </div>
      </div>
    </div>
      
  );
};

export default HomeBannerSlider;
