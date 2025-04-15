import { baseUrl } from "@/Http/helper";
import Link from "next/link";
import React from "react";

function RightBanner({bannerRight}) {
  return (
    <div className="col-lg-3">
      <div
        className="banner-five-right-content bg_image"
        style={{ backgroundImage: `url(${baseUrl}${bannerRight.photo})` }}
      >
        <div className="content-area">
          {/*  <Link href="#" className="rts-btn btn-primary">Weekend Discount</Link> */}
          <h3 className="title">{bannerRight.title}</h3>
          {bannerRight.url && (
            <Link href={`${bannerRight.url}`} className="shop-now-goshop-btn">
              <span className="text">Shop Now</span>
              <div className="plus-icon">
                <i className="fa-sharp fa-regular fa-plus" />
              </div>
              <div className="plus-icon">
                <i className="fa-sharp fa-regular fa-plus" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightBanner;
