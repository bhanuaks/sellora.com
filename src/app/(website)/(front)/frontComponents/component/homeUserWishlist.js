"use client"
import { baseUrl, getOffPrecentage, main_thumb_img_path } from "@/Http/helper";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { fileBasePath } from "@/Http/urlHelper";
import Image from "next/image";
import { useCart } from "@/app/(website)/contaxtData/cartContaxt";
import { toast, ToastContainer } from "react-toastify";

const HomeUserWishlist = ({ recommendationList }) => {

  const [similarProduct, setSimilarProduct] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [enableNavigation, setEnableNavigation] = useState(false);
  const [wishlistUser, setWishlistUser] = useState([])
    const { user } = useCart()

  useEffect(() => {
    //console.log(recommendationList)
    setSimilarProduct(recommendationList)
  }, [recommendationList])


  // slide responsive data
  
  useEffect(() => {
    const updateSlidesPerView = () => {
      let newSlidesPerView = 2;

      if (window.innerWidth >= 1024) {
        newSlidesPerView = 6;
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


  

   const fetchData = async (userid) => {
      try {
        //$('.loader-container').css('display', 'flex') 
  
        const response = await fetch(`/api/product/remove-wishlist?user_id=${userid}`);
        const result = await response.json();
        //console.log(result)
        if (result.status) {
          //$('.loader-container').css('display', 'none') 
          //setProductList(result.data.finalResults);
          const newArray = result.data.wishlist.map((list) => {
            return list.product_id
          })
  
          //console.log(newArray)
          setWishlistUser(newArray)
  
  
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
  
      }
    }
  
    
const showWishlist = async (pid, vid) => {
    //toast.success("pls login")
    //console.log(pid,vid, user._id)
    try {
      if (user) {
        const response = await fetch(`/api/product/add-to-wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user._id, product_id: pid, variant_id: vid })
        });

        const result = await response.json();
        
        if (result.status) {
          //console.log('okkkkkkkkkkkkk')
          toast.success('Wishlist added successfully.')
          setWishlistUser([...wishlistUser, pid])
          
        } else {
          toast.success(result.data.message)
        }
      } else {
        toast.success("You have not logged in. Please login")
      }

    } catch (error) {
      console.error('Network error:', error);
    }

  }

  const removeWishlist = async (pid, vid) => {
    //toast.success("pls login")
    //console.log(pid,vid, user._id)
    try {
      if (user) {
        const response = await fetch(`/api/product/remove-wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user._id, product_id: pid, variant_id: vid })
        });

        const result = await response.json();
        if (result.status) {
          //console.log('okkkkkkkkkkkkk')
          
          const newArray = wishlistUser.filter((list) => list != pid)
          
          setWishlistUser(newArray)
          toast.success('Wishlist remove successfully.')
        } else {
          toast.success(result.data.message)
        }
      }

    } catch (error) {
      console.error('Network error:', error);
    }

  }

  useEffect(() => {
    //console.log('useriddddd',user)
    //$(".successfully-addedin-wishlist").show()
    
    if (user?._id) {
      //console.log('kkkkkkkkkkk')
      //toast.success("checkkkkkkkkkkkkkkkkkkkk")
      
      fetchData(user?._id)

      
    }
  }, [user])

  
  if(similarProduct.length == 0){
    return(<></>)
  }
  
  return (
    
      
    <>
      <div className="successfully-addedin-wishlist">  <div className="d-flex" > <i className="fa-regular fa-check"></i>    <p>Your item has already added in wishlist successfully</p>  </div></div>

        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      
      
      
      <div
        className="rts-blog-area rts-section-gap bg_gradient-tranding-items"
        bis_skin_checked={1}
      >
        <div className="container" bis_skin_checked={1}>
          <div className="row" bis_skin_checked={1}>
            <div className="col-lg-12" bis_skin_checked={1}>
              <div className="title-area-between" bis_skin_checked={1}>
                <h2 className="title-left mb--0"> On the top of their wish list</h2>
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
           // autoplay={{ delay: 4000 }}
            
          >
            {similarProduct.length > 0 ? similarProduct.map((product, index)=>(
              <SwiperSlide key={`homeuserwish${index}`}>
              <div className="slide-content"><div className="swiper-slide">
                <div className="single-shopping-card-one deals-of-day">
                  <div className="image-and-action-area-wrapper">
                    <a href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
                      
                       <img
                        src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                        alt="Product Image"
                        loading="lazy" 
                      />
                    </a>
                    <div className="action-share-option">
                      
                      
                      
                    {wishlistUser.includes(product._id) ?
                    <div className="single-action openuptip message-show-action wishlist_active" onClick={() => removeWishlist(product._id, product.variant?._id)}>

                      <i className="fa fa-heart" />
                    </div>
                    :
                    <div className="single-action openuptip message-show-action" onClick={() => showWishlist(product._id, product.variant?._id)}>

                      <i className="fa-light fa-heart" />
                    </div>
                  }
                      
                      
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
                    {user && user?.role_consumer_business == "Business" ? (
                                      <>
                                        <div className="price-area">
                                          <span className="current">${product.variant && product.variant.businessSalePrice}</span>
                                          <div className="previous">${product.variant && product.variant.msrp}</div>
                                        </div>
                                        <div className="min-off">
                                          Min. {product.variant ? getOffPrecentage(product.variant.msrp, product.variant.businessSalePrice).toFixed(2) : 0}% <span>Off</span>
                                        </div>
                    
                                      </>) : (
                                      // else consumer type user
                                      <>
                                        <div className="price-area">
                                          <span className="current">${product.variant && product.variant.consumerSalePrice}</span>
                                          <div className="previous">${product.variant && product.variant.msrp}</div>
                                        </div>
                                        <div className="min-off">
                                          Min. {product.variant ? getOffPrecentage(product.variant.msrp, product.variant.consumerSalePrice).toFixed(2) : 0}% <span>Off</span>
                                        </div>
                                      </>
                                    )}
                    
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
export default HomeUserWishlist;