import { baseUrl } from "@/Http/helper";
import Link from "next/link";
import React from "react";

function MobileHomeBannerSection({ bannerRight, bannerLeft }) {
  return (
    <>
      {/* ========================mobile============== */}
      <div className="col-lg-3 col-6 d-lg-none d-block">
        <a href="#">
          <div
            className="banner-five-right-content bg_image"
            style={{ backgroundImage: `url(${baseUrl}${bannerLeft.photo})` }}
          >
            <div className="content-area">
              {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
              <h3 className="title">{bannerLeft.title}</h3>
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
        </a>
      </div>

      <div className="col-lg-3 col-6 d-lg-none d-block">
        <a href="#">
          <div
            className="banner-five-right-content bg_image"
            style={{ backgroundImage: `url(${baseUrl}${bannerRight.photo})` }}
          >
            <div className="content-area">
              {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
              <h3 className="title">{bannerRight.title}</h3>
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
        </a>
      </div>
    </>
  );
}

export default MobileHomeBannerSection;
