'use client'
import { baseUrl, getOffPrecentage, main_thumb_img_path } from "@/Http/helper";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const FeatureBanner = ({featureBannerList}) => {


    return (
        <div className="tranding-items-tab-area-start rts-section-gap bg_gradient-tranding-items mt--20">
        <div className="container">
          <div className="row g-4 mt--20 mb--40">
            <div className="col-lg-3">
              
              <Link href={featureBannerList.url !=''?`${featureBannerList.url}`:`#`}>
                <div
                  className="gw-card-layout p0 box-card-item"
                  style={{ background: `url(${baseUrl}${featureBannerList.photo})` }}
                >
                  {/* <h2>Toys under $499</h2> */}
                  {/*  <div className="img_big2"> <img src={`${baseUrl}front/assets/images/banner01.jpg`}> </div> */}
                  <div className="top_header_button">
                    {featureBannerList.title}
                  </div>
                  {featureBannerList.url !='' &&
                  <div className="bottom_footer_button">See more</div>
                    }
                </div>
              </Link>
            </div>
            <div className="col-lg-3">
              
              <Link href={featureBannerList.url_m1 !=''?`${featureBannerList.url_m1}`:`#`}>
                <div
                  className="gw-card-layout2 box-card-item"
                  style={{ background: `url(${baseUrl}${featureBannerList.photo_m1})` }}
                >
                  <div className="main-title white-text">
                    {featureBannerList.title_m1}
                  </div>
                  {featureBannerList.url_m1 !='' &&
                  <div className="bottom_footer_button">See more</div>
                    }
                </div>
              </Link>
              <Link href={featureBannerList.url_m3 !=''?`${featureBannerList.url_m3}`:`#`}>
                <div
                  className="gw-card-layout2 box-card-item"
                  style={{ background: `url(${baseUrl}${featureBannerList.photo_m3})` }}
                >
                  <div className="main-title">
                  {featureBannerList.title_m3}
                  </div>
                  {featureBannerList.url_m3 !='' &&
                  <div className="bottom_footer_button">See more</div>
                    }
                </div>
              </Link>
            </div>
            <div className="col-lg-3">
              
              <Link href={featureBannerList.url_m2 !=''?`${featureBannerList.url_m2}`:`#`}>
                <div
                  className="gw-card-layout2 box-card-item"
                  style={{ background: `url(${baseUrl}${featureBannerList.photo_m2})` }}
                >
                  <div className="main-title">
                  {featureBannerList.title_m2}
                  </div>
                  {featureBannerList.url_m2 !='' &&
                  <div className="bottom_footer_button">See more</div>
                    }
                </div>
              </Link>
              <Link href={featureBannerList.url_m4 !=''?`${featureBannerList.url_m4}`:`#`}>
                <div
                  className="gw-card-layout2 box-card-item"
                  style={{ background: `url(${baseUrl}${featureBannerList.photo_m4})` }}
                >
                  <div className="main-title white-text">
                  {featureBannerList.title_m4}
                  </div>
                  {featureBannerList.url_m4 !='' &&
                  <div className="bottom_footer_button">See more</div>
                    }
                </div>
              </Link>
            </div>
            <div className="col-lg-3">
              
              <Link href={featureBannerList.url_r !=''?`${featureBannerList.url_r}`:`#`}>
                <div
                  className="gw-card-layout p0 box-card-item"
                  style={{ background: `url(${baseUrl}${featureBannerList.photo_r})` }}
                >
                  {/* <h2>Toys under $499</h2> */}
                  {/*  <div className="img_big2"> <img src={`${baseUrl}front/assets/images/banner01.jpg`}> </div> */}
                  <div className="top_header_button">
                  {featureBannerList.title_r}
                  </div>
                  {featureBannerList.url_r !='' &&
                  <div className="bottom_footer_button">See more</div>
                    }
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>


    )
}

export default FeatureBanner