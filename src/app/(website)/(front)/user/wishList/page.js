'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Sidebar from '../userComponents/Sidebar'
import { baseUrl, dateValidateConverter, main_thumb_img_path } from '@/Http/helper'
import { CartContaxt, useCart } from '@/app/(website)/contaxtData/cartContaxt'
import { userAppContaxt } from '@/app/(website)/contaxtData/userContaxtData'
import UserSideBarSecction from '../userSideBarSecction'
import Image from 'next/image'
import { fileBasePath } from '@/Http/urlHelper'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import Recommendations from './recommendations'


function page() {
  
  const router = useRouter();
  const {globalUser} = useContext(userAppContaxt);
  const [user, setUser] = useState(null);
  const [productList, setProductList] = useState([])
  const { addToCartProduct } = useContext(CartContaxt);
  const [proccess, setProccess] = useState(false)
  const [sortVal, setSortVal] = useState("")
  const [searchVal, setSearchVal] = useState("")
  const [searchButton, setSearchButton] = useState("")
  const [recommendationList, setRecommendationList] = useState("")

  useLayoutEffect(()=>{
        
              if(globalUser.user){ 
              
                $('.loaderouter').css('display', 'flex') 
                fetch(`${baseUrl}api/user/user-details?user_id=${globalUser.user._id}`,{
                  method:"GET"
                }).then((response)=>{
        
                  if(!response.ok){
                    $('.loaderouter').css('display', 'none') 
                    throw new Error("Network Error")
                  }
                  return response.json();
                }).then((res)=>{
                  if(res.status){
                    setUser(res.data.user)
                  }
                  $('.loaderouter').css('display', 'none') 
                })
            }
               
            },[globalUser.user])
  
  const fetchData = async (userid, sortVal, searchVal) => {
    try {
        //$('.loader-container').css('display', 'flex') 
        $('.loaderouter').css('display', 'flex')
        const url = new URL(`${baseUrl}/api/product/add-to-wishlist`);
        const queryParams = {
          user_id:userid,
          sortVal:sortVal,
          searchVal:searchVal
        };
  
        Object.keys(queryParams).forEach((key) => {
          if (queryParams[key]) {
            url.searchParams.append(key, queryParams[key]);
          }
        });    
        
        const response = await fetch(url);
          const result = await response.json();
          //console.log(result)
          if (result.status) {
            //$('.loader-container').css('display', 'none') 
            $('.loaderouter').css('display', 'none')
            setProductList(result.data.finalResults);   
             
    
          } 
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          
        }
  }
  const fetchRecommData = async (userid) => {
    try {
        //$('.loader-container').css('display', 'flex') 
        const url = new URL(`${baseUrl}/api/product/recommendations`);
        const queryParams = {
          user_id:userid,
          
        };
  
        Object.keys(queryParams).forEach((key) => {
          if (queryParams[key]) {
            url.searchParams.append(key, queryParams[key]);
          }
        });    
        
        const response = await fetch(url);
          const result = await response.json();
          //console.log(result)
          if (result.status) {
            //$('.loader-container').css('display', 'none') 
            setRecommendationList(result.data.productWithVariant);   
             
    
          } 
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          
        }
  }
  useEffect(() => {
    //console.log('useriddddd',user)
    if(user?._id){
    fetchData(user?._id, sortVal)
    fetchRecommData(user?._id)
    }
  }, [user])
  
  const removeWishlist = async (e, pid, vid, uid) => {
      //toast.success("pls login")
      //console.log(pid,vid, user._id)
      e.preventDefault();
      try {
        if(!confirm("Are youe sure to remove this wishlist?")){
          return false;
      }
        
        if (user) {
          const response = await fetch(`/api/product/remove-wishlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: uid, product_id: pid, variant_id: vid })
          });
  
          const result = await response.json();
          if (result.status) {
            fetchData(uid, sortVal, searchVal)
            fetchRecommData(uid)
            //console.log('okkkkkkkkkkkkk')
            
            //const newArray = wishlistUser.filter((list) => list != pid)
            
            //setWishlistUser(newArray)
            toast.success('Wishlist remove successfully.')
          } else {
            toast.success(result.data.message)
          }
        }
  
      } catch (error) {
        console.error('Network error:', error);
      }
  
    }

    async function addToCart(e, pid, vid) {
          e.preventDefault();
          //setProccess(true);
          const resData = await addToCartProduct(
            pid,
            vid,
            1
          );
          if (resData) {
            //router.push(`${baseUrl}cart`);
            toast.success("Item added to cart successfully.")
          }
          //setProccess(false);
        }
  const getSortVal = (e) => {
      //console.log('sorttttt',e.target.value)
      setSortVal(e.target.value)
      fetchData(user?._id, e.target.value, searchVal)
  }

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
  }

  const handleSearchButton = (e) => {
    e.preventDefault()
    //setSearchButton(searchVal)
    //setSearchVal(searchVal)
    fetchData(user?._id, sortVal, searchVal)
  }

  const recommendationWishlist = async (pid,vid) => {
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
                //setWishlistUser([...wishlistUser, pid])
                fetchData(user._id, sortVal, searchVal)
                fetchRecommData(user._id)
                
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
  
  return (
    <>
  <div className="details_page_outer">
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

    {/* rts navigation bar area start */}
    <div className="rts-navigation-area-breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="navigator-breadcrumb-wrapper">
              <Link href="/">Dashboard</Link>
              <i className="fa-regular fa-chevron-right" />
              <Link className="current" href="#">
                WishList
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* rts navigation bar area end */}
    <div className="section-seperator">
      <div className="container">
        <hr className="section-seperator" />
      </div>
    </div>
    <div className="account-tab-area-start rts-section-gap">
      <div className="container">
        <div className="row">
          <UserSideBarSecction user={user}/>
          <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
            <div className="rts-cart-list-area">
              <div className="row">
                <div className="col-lg-8">
                  <div className="cart-top-area-note">
                    <h2 className="title">WishList</h2>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="relativ">
                    <form name="search" onSubmit={handleSearchButton}>
                    <div className="searchBar">
                      <input
                        type="text" 
                        defaultValue=""
                        className="searchBarInput"
                        placeholder="Search this list"
                        onChange={handleSearch}
                      />
                      <div className="iconSearchContainer" onClick={handleSearchButton}>
                        <i className="fa fa-search fa-lg" />
                      </div>
                    </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="right-end">
                    <div className="single-select">
                      <select onChange={getSortVal}>
                        <option data-display="Filter & Sort">
                          Filter &amp; Sort
                        </option>
                        { /* <option>Priority (high to low)</option> */ }
                        <option value={1}>Price (low to high)</option>
                        <option value={2}>Price (high to low)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {
              productList && productList.length > 0 ?
              productList.map((product, index) => {

              return (
              <div className="single-cart-area-list main item-parent" key={index}>
                <div className="product-main-cart">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="thumbnail">
                        {" "}
                        <Image
                                              src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                                              alt="Product Image"
                                              loading="lazy"
                                              width={0}
                                              height={0}
                                              sizes="100vw"
                                              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                                            />
                                            {" "}
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="information">
                        <div className="row">
                          <div className="col-lg-9">
                            <p>
                              <Link href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
                              {product?.product_name ? product.product_name :''}
                              </Link>
                            </p>
                            <div className="product-status">
                              <div className="rating-stars-group">
                              <i className={`fa-star${product.avgRating >0 && product.avgRating < 1?"-half-alt fa-solid selected":""}  ${product.avgRating >=1?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >1 && product.avgRating < 2?"-half-alt fa-solid selected":""} ${product.avgRating >=2?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >2 && product.avgRating < 3?"-half-alt fa-solid selected":""} ${product.avgRating >=3?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >3 && product.avgRating < 4?"-half-alt fa-solid selected":""} ${product.avgRating >=4?"fa-solid selected":"fa-light"}`} /> 
                              <i className={`fa-star${product.avgRating >4 && product.avgRating < 5?"-half-alt fa-solid selected":""} ${product.avgRating >=5?"fa-solid selected":"fa-light"}`} />
                                {/* 
                  <div className="rating-star"><i className="fas fa-star-half-alt"></i></div> */}
                                <span>({product.avgRating.toFixed(1)}) {product.totalReviews} Reviews</span>
                              </div>
                            </div>
                            {/*  <div className="a-size-small"> 10+ bought in past month </div> */}
                            {/*  <div className="in_stock">In stock</div> */}
                            <div className="color_cart">
                              {" "}
                              {product.variant.customAttributes && (
                                Object.entries(product.variant.customAttributes).map((item, index) => (
                                    <p key={index}>{item[0]}: <span>{item[1]}</span></p>
                                ))
                            )}
                               
                               {
                              
                             // JSON.parse(product.variant.customAttributes).Color  
                              
                              } {" "}
                            </div>
                            <div className="subtotal">
                            {user?.role_consumer_business == "Business" ?(
                              <>
                              ${product.variant && product.variant.businessSalePrice} <span className="dis-amm">${product.variant && product.variant.msrp}</span>
                              </>
                            ):(
                              <>
                              ${product.variant && product.variant.consumerSalePrice} <span className="dis-amm">${product.variant && product.variant.msrp}</span>
                              </>
                            )}
                              
                            
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="price_outer">
                              <div className="item_dfsd">
                                
                                Item added {dateValidateConverter(product.wishlistDetail.createdAt)}
                              </div>
                              <div className="move-to-cart" onClick={(e)=>addToCart(e, product._id, product.variantId)}> 
                              {proccess ? 
                                  <button className="loading"> continue</button>
                                 : 
                                <>Add to cart</> 
                                
                              }
                                
                                </div>
                              <div className="d-flex">
                                <Link href="#">
                                  <div className="move mt--10">
                                    Proceed to Checkout
                                  </div>
                                </Link>
                                <Link href="#" onClick={(e) => removeWishlist(e, product._id, product.variantId, product.userId)}>
                                  <div className="delete2 mt--10">
                                    {" "}
                                    <i className="fa-regular fa-trash" />{" "}
                                  </div>
                                </Link>
                              </div>
                              <div className="comment">
                                <Link href="#">
                                  Add comment, quantity &amp; priority
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*  <div className="list_cart"> 
      <div className="close section-activation"> <i className="fa-regular fa-trash"></i> </div>
    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

)})

:
<div className="col-12">No wishlist found</div>

}

          
              <div class="registradion-top-text"> <span>Recommendations</span> </div>
                {recommendationList && 
                  <Recommendations recommendationList={recommendationList} recommendationWishlist={recommendationWishlist} />    
                }


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
 { /* <div className="tranding-items-tab-area-start rts-section-gap mb--40">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-between">
            <h2 className="title-left">Inspired by your browsing history</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="category-area-main-wrapper-one">
            <div
              className="swiper mySwiper-category-1 swiper-data"
              data-swiper='{
                      "spaceBetween":16,
                      "slidesPerView":6,
                      "loop": true,
                      "speed": 700,
                      "autoplay":{
                      "delay":"4000"},
                      "navigation":{
                          "nextEl":".swiper-button-next",

                          "prevEl":".swiper-button-prev"
                        },
                      "breakpoints":{
                      "0":{
                          "slidesPerView":1,
                          "spaceBetween": 12},
                      "320":{
                          "slidesPerView":1,
                          "spaceBetween":12},
                      "480":{
                          "slidesPerView":2,
                          "spaceBetween":12},
                      "640":{
                          "slidesPerView":2,
                          "spaceBetween":16},
                      "840":{
                          "slidesPerView":3,
                          "spaceBetween":16},
                      "1140":{
                          "slidesPerView":6,
                          "spaceBetween":16},
                      "1540":{
                          "slidesPerView":6,
                          "spaceBetween":16},
                      "1840":{
                          "slidesPerView":6,
                          "spaceBetween":16}
                      }
                  }'
            >
              <div className="swiper-wrapper">
                
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      {" "}
                      <Link href="product-details.html">
                        {" "}
                        <img
                          src={`${baseUrl}front/assets/images/grocery/17.jpg`}
                          alt="grocery"
                        />{" "}
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          {" "}
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> *}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          {" "}
                          <i className="fa-regular fa-eye" />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        {" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                      </div>
                      <Link href="product-details.html">
                        <h4 className="title">
                          Electric 1.8 liter Multi Cooker{" "}
                        </h4>
                      </Link>{" "}
                      {/*  *}
                      <div className="price-area">
                        {" "}
                        <span className="current">$499</span>
                        <div className="previous">$36.00</div>
                      </div>
                      <div className="cart-counter-action">
                        {" "}
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      {" "}
                      <Link href="product-details.html">
                        {" "}
                        <img
                          src={`${baseUrl}front/assets/images/grocery/18.jpg`}
                          alt="grocery"
                        />{" "}
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          {" "}
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> }
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> *}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          {" "}
                          <i className="fa-regular fa-eye" />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        {" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                      </div>
                      <Link href="product-details.html">
                        <h4 className="title">
                          Philips Viva Collection HD4928/01
                        </h4>
                      </Link>{" "}
                    
                      <div className="price-area">
                        {" "}
                        <span className="current">$499</span>
                        <div className="previous">$36.00</div>
                      </div>
                      <div className="cart-counter-action">
                        {" "}
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      {" "}
                      <Link href="product-details.html">
                        {" "}
                        <img
                          src={`${baseUrl}front/assets/images/grocery/19.jpg`}
                          alt="grocery"
                        />{" "}
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          {" "}
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> *}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          {" "}
                          <i className="fa-regular fa-eye" />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        {" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                      </div>
                      <Link href="product-details.html">
                        <h4 className="title">
                          Smart Speaker &amp; Google Assistant, Light Grey
                        </h4>
                      </Link>{" "}
                      {/*  *}
                      <div className="price-area">
                        {" "}
                        <span className="current">$499</span>
                        <div className="previous">$36.00</div>
                      </div>
                      <div className="cart-counter-action">
                        {" "}
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-shopping-card-one deals-of-day">
                    <div className="image-and-action-area-wrapper">
                      {" "}
                      <Link href="product-details.html">
                        {" "}
                        <img
                          src={`${baseUrl}front/assets/images/grocery/20.jpg`}
                          alt="grocery"
                        />{" "}
                      </Link>
                      <div className="action-share-option">
                        <div className="single-action openuptip message-show-action">
                          {" "}
                          <i className="fa-light fa-heart" />
                        </div>
                        {/* <div className="single-action openuptip"> <i className="fa-solid fa-arrows-retweet"></i> </div> */}
                        {/* <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                              <i className="fa-solid fa-arrows-retweet"></i>
                                                          </div> *}
                        <div className="single-action openuptip cta-quickview product-details-popup-btn">
                          {" "}
                          <i className="fa-regular fa-eye" />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="body-content">
                      <div className="start-area-rating">
                        {" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                        <i className="fa-solid fa-star" />{" "}
                      </div>
                      <Link href="product-details.html">
                        <h4 className="title">
                          Apple AirPods Max Over-Ear Wireless Headphone
                        </h4>
                      </Link>{" "}
                      {}
                      <div className="price-area">
                        {" "}
                        <span className="current">$499</span>
                        <div className="previous">$36.00</div>
                      </div>
                      <div className="cart-counter-action">
                        {" "}
                        <Link
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text"> Add To Cart </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                          <div className="arrow-icon">
                            {" "}
                            <i className="fa-regular fa-cart-shopping" />{" "}
                          </div>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="next-prev-swiper-wrapper">
                <div className="swiper-button-prev">
                  <i className="fa-regular fa-chevron-left" />
                </div>
                <div className="swiper-button-next">
                  <i className="fa-regular fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
*/ }


</>

  )
}

export default page