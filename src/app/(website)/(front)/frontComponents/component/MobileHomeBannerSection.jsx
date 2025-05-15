import { baseUrl } from "@/Http/helper";
import Link from "next/link";
import React from "react";

function MobileHomeBannerSection({ bannerRight, bannerLeft }) {
  return (
    <>
      {/* ========================mobile============== */}

                      {bannerLeft.photo && (
                        <div className="col-lg-3 col-6 d-lg-none d-block"> 
                        <a href={`${bannerLeft.url?bannerLeft.url:"#"}`}>
                                  <div className="small_banner_1"> <img src={`${baseUrl}${bannerLeft.photo}`} /> 
                                  </div>
                              </a> 
                          </div>
                      )}
       


                        {bannerRight.photo && (
                        <div className="col-lg-3 col-6 d-lg-none d-block"> 
                        <a href={`${bannerRight.url?bannerRight.url:"#"}`}>
                                <div className="small_banner_1"> 
                                  <img src={`${baseUrl}${bannerRight.photo}`} /> 
                                </div>
                              </a> 
                          </div>
                        )}
      
 
    </>
  );
}

export default MobileHomeBannerSection;
