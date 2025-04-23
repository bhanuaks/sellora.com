"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { baseUrl, main_large_img_path, main_medium_img_path, main_thumb_img_path, product_large_img_path1, product_large_img_path2, product_large_img_path3, product_large_img_path4, product_large_img_path5, product_large_img_path6, product_large_img_path7 } from '@/Http/helper'
import { product_medium_img_path1, product_medium_img_path2, product_medium_img_path3, product_medium_img_path4, product_medium_img_path5, product_medium_img_path6, product_medium_img_path7 } from '@/Http/helper'
import { product_thumb_img_path1, product_thumb_img_path2, product_thumb_img_path3, product_thumb_img_path4, product_thumb_img_path5, product_thumb_img_path6, product_thumb_img_path7 } from '@/Http/helper'

import { variant_large_img_path1, variant_large_img_path2, variant_large_img_path3, variant_large_img_path4, variant_large_img_path5, variant_large_img_path6, variant_large_img_path7 } from '@/Http/helper'
import { variant_medium_img_path1, variant_medium_img_path2, variant_medium_img_path3, variant_medium_img_path4, variant_medium_img_path5, variant_medium_img_path6, variant_medium_img_path7 } from '@/Http/helper'
import { variant_thumb_img_path1, variant_thumb_img_path2, variant_thumb_img_path3, variant_thumb_img_path4, variant_thumb_img_path5, variant_thumb_img_path6, variant_thumb_img_path7 } from '@/Http/helper'

import Image from "next/image";
import { fileBasePath } from "@/Http/urlHelper";

const VariantImage = ({ variantList, productDetails, changeVariant }) => {
  const carouselRef = useRef(null);
  const scrollUp = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  if (!productDetails || Object.keys(productDetails).length === 0) {
    return <div>Loading...</div>;
  }

  const product_large_img_paths = [product_large_img_path1, product_large_img_path2, product_large_img_path3, product_large_img_path4, product_large_img_path5, product_large_img_path6, product_large_img_path7];
  const product_medium_img_paths = [product_medium_img_path1, product_medium_img_path2, product_medium_img_path3, product_medium_img_path4, product_medium_img_path5, product_medium_img_path6, product_medium_img_path7];
  const product_thumb_img_paths = [product_thumb_img_path1, product_thumb_img_path2, product_thumb_img_path3, product_thumb_img_path4, product_thumb_img_path5, product_thumb_img_path6, product_thumb_img_path7];

  const variant_large_img_paths = [variant_large_img_path1, variant_large_img_path2, variant_large_img_path3, variant_large_img_path4, variant_large_img_path5, variant_large_img_path6, variant_large_img_path7];
  const variant_medium_img_paths = [variant_medium_img_path1, variant_medium_img_path2, variant_medium_img_path3, variant_medium_img_path4, variant_medium_img_path5, variant_medium_img_path6, variant_medium_img_path7];
  const variant_thumb_img_paths = [variant_thumb_img_path1, variant_thumb_img_path2, variant_thumb_img_path3, variant_thumb_img_path4, variant_thumb_img_path5, variant_thumb_img_path6, variant_thumb_img_path7];


  

  const imageFields = [ "image_1", "image_2", "image_3", "image_4", "image_5", "image_6", "image_7"];
  const images = imageFields.map((field, index) => {
    return changeVariant && changeVariant[field] != 'null' && changeVariant[field] != undefined
      ? changeVariant[field]
      : productDetails[field];
  });

 


  const zoom = (e) => {
    const zoomer = e.currentTarget;
    if (!zoomer) return;

    const rect = zoomer.getBoundingClientRect();
    const offsetX = e.type === 'touchmove' ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const offsetY = e.type === 'touchmove' ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    const x = (offsetX / zoomer.offsetWidth) * 100;
    const y = (offsetY / zoomer.offsetHeight) * 100;
    // console.log(`${x}% ${y}%`);
    zoomer.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <>
      <div className="show-product-area-details">
        
        <div className="product-thumb-filter-group left">
        <div className="carousel-container">
        <button className="btn prev" onClick={scrollUp}>
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </button>
        <div
          className="carousel overflow-y-auto max-h-96"
          ref={carouselRef}
          style={{ scrollBehavior: "smooth" }}
        >
          <div   className={`thumb-filter filter-btn ${changeVariant.withImage == "Yes"?'':'active'} `} data-show={`.${10000 + 1}`}>
                  
                  <img
                     src={`${fileBasePath}${main_thumb_img_path}${productDetails.main_image}`}
                     alt="thum Image"
                     loading="lazy" 
                   />
                                     
               </div>

          {changeVariant.withImage == "Yes" ? variant_thumb_img_paths.map((image, index) => {
            if (images[index]) {
              return (
                <div key={index} className={`thumb-filter filter-btn ${index === 0 ? 'active' : ''}`} data-show={`.${index + 1}`}>
                  
                   <Image
                      src={`${fileBasePath}${image}${images[index]}`}
                      alt="thum Image"
                      loading="lazy" 
                    />
                                      
                </div>
              );
            }
            return null;
          }) : product_thumb_img_paths.map((image, index) => {
            if (images[index]) {
              return (
                <div key={index} className={`thumb-filter filter-btn  `} data-show={`.${index + 1}`}>
                   {/* <div className="relative w-full h-[454px]"> */}
                   
                   <img
                      src={`${fileBasePath}${image}${images[index]}`} 
                      alt="Product Image"
                      loading="lazy" 
                    />

                  
                </div>
                // </div>
              );
            }
            return null;
          })}
           </div> 
        <button className="btn next" onClick={scrollDown}>
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </button>
        </div>
        </div>

        <div className="product-thumb-area">
          <div className="cursor" />

          <div
                 
                  className={`thumb-wrapper ${10000 + 1} filterd-items ${changeVariant.withImage == "Yes"?'hide':''} `} 
                > 
                  <div 
                    className="product-thumb zoom"
                    onMouseMove={zoom}
                    onTouchMove={zoom}
                    style={{
                      backgroundImage: `url('${fileBasePath}${main_large_img_path}/${productDetails.main_image}')`,
                      backgroundRepeat: 'no-repeat',
                      width: "100%"
                    }} 
                  >
                   {/* <div className="relative w-full h-[454px]"> */} 
                     <img
                        src={`${fileBasePath}${main_medium_img_path}/${productDetails.main_image}`} 
                        alt="Product Image"
                        loading="lazy" 
                      />
                    </div> 
                  {/* </div> */}
                </div>


          {images.map((image, index) => {
            if (image) {
              return (
                <div
                  key={index}
                  className={`thumb-wrapper ${index + 1} filterd-items ${index === 0 && changeVariant.withImage === "Yes" ? '' : 'hide'}`} 
                >
                  <div 
                    className="product-thumb zoom"
                    onMouseMove={zoom}
                    onTouchMove={zoom}
                    style={{
                      backgroundImage: `url('${fileBasePath}${changeVariant.withImage === "Yes" ? variant_large_img_paths[index] : product_large_img_paths[index]}/${image}')`,
                      backgroundRepeat: 'no-repeat',
                      width: "100%"
                    }} 
                  >
                   {/* <div className="relative w-full h-[454px]"> */} 
                     <img
                       src={`${fileBasePath}${changeVariant.withImage == "Yes" ? variant_medium_img_paths[index]:product_medium_img_paths[index]}/${image}`} 
                      alt="Product Image"
                      loading="lazy" 
                    />
                    </div> 
                  {/* </div> */}
                </div>
              );
            }
            return null;
          })}
          <div className="thumb-wrapper five filterd-items hide">
            <div className="product-thumb zoom">
              <video
                poster="http://content.bitsontherun.com/thumbs/bkaovAYt-320.jpg"
                autoPlay
                loop
                muted
                controls
              >
                <source src="http://content.bitsontherun.com/videos/bkaovAYt-52qL9xLP.mp4" />
                <source src="http://content.bitsontherun.com/videos/bkaovAYt-27m5HpIu.webm" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariantImage;