"use client"
import { baseUrl, getOffPrecentage, main_thumb_img_path } from "@/Http/helper";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const FeatureBanner = () => {


    return (
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


    )
}