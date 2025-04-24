"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Sidebar from '../userComponents/Sidebar'
import { baseUrl, fetcher } from '@/Http/helper'
import SingleOrderSection from './singleOrderSection'
import { userAppContaxt } from '@/app/(website)/contaxtData/userContaxtData'
import { useCart } from '@/app/(website)/contaxtData/cartContaxt'
import { useRouter } from 'next/navigation'
import UserSideBarSecction from '../userSideBarSecction'
import useSWR, {mutate} from 'swr'


function page() {

  const {data:orderData, error, isLoading } = useSWR(`${baseUrl}api/user/my-order`, fetcher)

  const orders = orderData?.data?.orders || [];
   const {globalUser} = useContext(userAppContaxt);
    const [user, setUser] = useState(null); 
    const {addToCartProduct} = useCart()
    const router = useRouter();

  // const [orders, setOrders] = useState([])


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

  // useEffect(()=>{

  // async  function fetchOrder(){
  //     $('.loaderouter').css('display', 'flex')
  //     const response  =  await fetch(`${baseUrl}api/user/my-order`) 
  //       if(!response.ok){
  //         $('.loaderouter').css('display', 'none') 
  //         throw new Error("Network Error")
  //       }
  //       const res = await response.json(); 
  //       $('.loaderouter').css('display', 'none')  
  //       if(res.status){
  //         setOrders(res.data.orders)
  //       }
  //   }
  //   fetchOrder();
     
  // },[])



  return (
    <>
      <link
        rel="stylesheet preload"
        href={`${baseUrl}front/assets/css/my_order.css`}
        as="style"
      />

      <div className="details_page_outer">
        {/* rts navigation bar area start */}
        <div className="rts-navigation-area-breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <Link href="/">Dashboard</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current" href="#">
                    My Orders
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
                <div className="dashboard-account-area">
                  {/* ==========================new============================== */}
                  <div className="customer_details orderList">
                    <div className="orderTop">
                      <h2 className="hidden-xs">My Orders</h2>
                      <div className="search-container2">
                        <form action="#">
                          <input
                            type="text"
                            placeholder="Search all orders"
                            name="search"
                          />
                          <button type="submit">
                            <i className="fa fa-search" />
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="order_tab">
                      <ul className="tabs">
                        <li className="tab-link current" data-tab="order_tab">
                          Orders
                        </li>
                        <li className="tab-link" data-tab="buy_again">
                          Buy Again
                        </li>
                        <li className="tab-link" data-tab="open_orders">
                          Not Yet Shipped
                        </li>
                        <li className="tab-link" data-tab="cancelled_orders">
                          Cancelled Orders
                        </li>
                        <li className="tab-link" data-tab="returns">
                          Returns
                        </li>
                      </ul>
                    </div>
                    <div
                      id="order_tab"
                      className="orderCardWrap tab-content1 current"
                    >
                      {/* first-id======open======================= */}
                      <div className="a-row a-spacing-base">
                        <div className="row align-items-center">
                          <div className="col-lg-4">
                            <div className="aok-inline-block">
                              <span className="num-orders">{orders.length} orders</span> placed in
                            </div>
                            <span className="a-dropdown-container">
                              <select defaultValue={"last30"}>
                                <option data-ref="d30" value="last30">

                                  last 30 days
                                </option>
                                <option data-ref="m3" value="months-3">

                                  past 3 months
                                </option>
                                <option data-ref="y2024" value="year-2024">

                                  2024
                                </option>
                                <option data-ref="y2023" value="year-2023">

                                  2023
                                </option>
                                <option data-ref="y2022" value="year-2022">

                                  2022
                                </option>
                                <option data-ref="y2021" value="year-2021">

                                  2021
                                </option>
                                <option data-ref="y2020" value="year-2020">

                                  2020
                                </option>
                                <option data-ref="y2019" value="year-2019">

                                  2019
                                </option>
                                <option data-ref="y2018" value="year-2018">

                                  2018
                                </option>
                                <option data-ref="y2017" value="year-2017">

                                  2017
                                </option>
                                <option
                                  data-ref="y2016"
                                  value="year-2016"
                                >

                                  2016
                                </option>
                                <option data-ref="archived" value="archived">

                                  Archived Orders
                                </option>
                              </select>
                            </span>
                          </div>
                        </div>
                      </div>
                      {orders.length > 0 ? orders.map((singleOrder, index)=>( 
                      <SingleOrderSection key={index} order={singleOrder} mutate={mutate} />
                      )):null}
                      {/* first-id========end================= */}
                      {/* second-id======open======================= */}
                      {/* second-id========end================= */}
                    </div>
                    <div  id="buy_again" className="orderCardWrap tab-content1">
                      <div className="again">
                        <h2>Electronics/Accessories</h2>
                        <div className="row g-4">
                          <div className="col-lg-20 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="single-shopping-card-one deals-of-day">
                              <div className="image-and-action-area-wrapper">

                                <Link href="product-details.html">

                                  <img src={`${baseUrl}front/assets/images/grocery/17.jpg`} />
                                </Link>
                                <div className="action-share-option">
                                  <div className="single-action openuptip message-show-action">

                                    <i className="fa-light fa-heart" />
                                  </div>
                                  <div className="single-action openuptip cta-quickview product-details-popup-btn">

                                    <i className="fa-regular fa-eye" />
                                  </div>
                                </div>
                              </div>
                              <div className="body-content">
                                <div className="start-area-rating">

                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                </div>
                                <Link href="product-details.html">
                                  <h4 className="title">
                                    Electric 1.8 liter Multi Cooker
                                  </h4>
                                </Link>
                                {/*  */}
                                <div className="price-area">

                                  <span className="current">$499</span>
                                  <div className="previous">$516.00</div>
                                </div>
                                <div className="cart-counter-action">

                                  <Link
                                    href="#"
                                    className="rts-btn btn-primary radious-sm with-icon"
                                  >
                                    <div className="btn-text"> Add To Cart </div>
                                    <div className="arrow-icon">

                                      <i className="fa-regular fa-cart-shopping" />
                                    </div>
                                    <div className="arrow-icon">

                                      <i className="fa-regular fa-cart-shopping" />
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-20 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="single-shopping-card-one deals-of-day">
                              <div className="image-and-action-area-wrapper">

                                <Link href="product-details.html">

                                  <img src={`${baseUrl}front/assets/images/grocery/25.jpg`} />
                                </Link>
                                <div className="action-share-option">
                                  <div className="single-action openuptip message-show-action">

                                    <i className="fa-light fa-heart" />
                                  </div>
                                  <div className="single-action openuptip cta-quickview product-details-popup-btn">

                                    <i className="fa-regular fa-eye" />
                                  </div>
                                </div>
                              </div>
                              <div className="body-content">
                                <div className="start-area-rating">

                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                </div>
                                <Link href="product-details.html">
                                  <h4 className="title">
                                    Natural Wood Ceiling Pendant Light Shade
                                  </h4>
                                </Link>
                                {/*  */}
                                <div className="price-area">

                                  <span className="current">$499</span>
                                  <div className="previous">$516.00</div>
                                </div>
                                <div className="cart-counter-action">

                                  <Link
                                    href="#"
                                    className="rts-btn btn-primary radious-sm with-icon"
                                  >
                                    <div className="btn-text"> Add To Cart </div>
                                    <div className="arrow-icon">

                                      <i className="fa-regular fa-cart-shopping" />
                                    </div>
                                    <div className="arrow-icon">

                                      <i className="fa-regular fa-cart-shopping" />
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-20 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="single-shopping-card-one deals-of-day">
                              <div className="image-and-action-area-wrapper">

                                <Link href="product-details.html">

                                  <img src={`${baseUrl}front/assets/images/grocery/26.jpg`} />
                                </Link>
                                <div className="action-share-option">
                                  <div className="single-action openuptip message-show-action">

                                    <i className="fa-light fa-heart" />
                                  </div>
                                  <div className="single-action openuptip cta-quickview product-details-popup-btn">

                                    <i className="fa-regular fa-eye" />
                                  </div>
                                </div>
                              </div>
                              <div className="body-content">
                                <div className="start-area-rating">

                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                  <i className="fa-solid fa-star" />
                                </div>
                                <Link href="product-details.html">
                                  <h4 className="title">
                                    Sony Standard Portable Wireless Camera
                                  </h4>
                                </Link>
                                {/*  */}
                                <div className="price-area">

                                  <span className="current">$499</span>
                                  <div className="previous">$516.00</div>
                                </div>
                                <div className="cart-counter-action">

                                  <Link
                                    href="#"
                                    className="rts-btn btn-primary radious-sm with-icon"
                                  >
                                    <div className="btn-text"> Add To Cart </div>
                                    <div className="arrow-icon">

                                      <i className="fa-regular fa-cart-shopping" />
                                    </div>
                                    <div className="arrow-icon">

                                      <i className="fa-regular fa-cart-shopping" />
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ================not-ye-shiped=open============= */}
                    <div id="open_orders" className="orderCardWrap tab-content1">
                      <div className="a-row a-spacing-base">
                        <div className="row align-items-center">
                          <div className="col-lg-4">
                            <div className="aok-inline-block">
                              <span className="num-orders">1 unshipped</span> orders
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="orderCard">
                        <div className="orderHead">
                          <ul className="orderLeft">
                            <li>
                              <p>
                                ORDER PLACED <span>13 September 2024</span>
                              </p>
                            </li>
                            <li>
                              <p>
                                TOTAL <span>$413.00</span>
                              </p>
                            </li>
                            {/*   <li>
  <p>SHIP TO <span className="customerName">Mary Smith</span> <span className="cstmrInfo"> <strong>Mary Smith</strong>WA-117 First Floor, Shakarpur
    NEW DELHI, DELHI 110092
    India</span> </p>
</li> */}
                          </ul>
                          <div className="invoiceDetails">
                            <p>ORDER # 171-8448362-6456308 </p>
                            <div>
                              <span>
                                <Link href="/user/order-details">Order Details</Link>
                              </span>
                              <span className="showInvoice">
                                <Link href="javascript:void(0)">
                                  Invoice
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </span>
                            </div>
                            <div className="invioceModel">
                              <ul>
                                <li>
                                  <Link href="#">Payment receipt</Link>
                                </li>
                              </ul>
                              <span className="modelClose">
                                <i className="fa fa-times" aria-hidden="true" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="itemDetails">
                          <h3>Successful</h3>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <div className="itemInfo">
                            <div className="itemImg">

                              {/* <div className="order_img"><img src={`${baseUrl}front/assets/images/518faREyvPL._AC_AA180_.jpg`}></div> */}
                              <img src={`${baseUrl}front/assets/images/518faREyvPL._AC_AA180_.jpg`} />
                            </div>
                            <div className="itemDesc">
                              <h4>
                                Apple AirPods Max Over-Ear Wireless Headphone Lorem
                              </h4>
                              <p>
                                Colour: <span>Black</span>
                              </p>
                              <div className="d-flex">
                                <button className="buy_again mr_10">
                                  Buy it again
                                </button>
                                {/*  <button className="view_your_item">View your item</button> */}
                              </div>
                            </div>
                          </div>
                          <div className="btn_group">
                            {/*  <button className="buy_again">Return or replace items</button>
    <button className="gift_btn">Share gift receipt</button> */}
                            {/*   <button className="gift_btn">Write a Product Review</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ================not-ye-shiped===end=========== */}
                    <div id="cancelled_orders" className="orderCardWrap tab-content1">
                      <div className="a-row a-spacing-base">
                        <div className="row align-items-center">
                          <div className="col-lg-4">
                            <div className="aok-inline-block">
                              <span className="num-orders">1 cancelled order </span>
                              placed in the last 6 months
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="orderCard">
                        <div className="orderHead">
                          <ul className="orderLeft">
                            <li>
                              <p>
                                ORDER PLACED <span>12 March 2024</span>
                              </p>
                            </li>
                            <li>
                              <p>
                                TOTAL <span>$0.00</span>
                              </p>
                            </li>
                            {/*   <li>
      <p>SHIP TO <span className="customerName">Customer Name</span> <span className="cstmrInfo"> <strong>Customer Name</strong> Lorem Ipsum is simply dummy text </span> </p>
    </li> */}
                          </ul>
                          <div className="invoiceDetails">
                            <p>ORDER # 171-8448362-6456308</p>
                          </div>
                        </div>
                        <div className="itemDetails">
                          <h3>Refund initiated</h3>
                          <p>
                            Recharge failed. Money deducted from your card/bank
                            account would be refunded within 3-5 business days.
                          </p>
                          <div className="itemInfo">
                            <div className="itemImg">

                              <img
                                src={`${baseUrl}front/assets/images/518faREyvPL._AC_AA180_.jpg`}
                                alt=""
                              />
                            </div>
                            <div className="itemDesc">
                              <h4>
                                Apple AirPods Max Over-Ear Wireless Headphone Lorem
                              </h4>
                              <p>
                                Colour: <span>Black</span>
                              </p>
                              <span className="itemPrice">$0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ================Return===open=========== */}
                    <div id="returns" className="orderCardWrap tab-content1">
                      <div className="a-row a-spacing-base">
                        <div className="row align-items-center">
                          <div className="col-lg-4">
                            <div className="aok-inline-block">
                              <span className="num-orders">Returns </span> received
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="orderCard">
                        <div className="orderHead">
                          <ul className="orderLeft">
                            <li>
                              <p>
                                Returns <span>12 March 2019</span>
                              </p>
                            </li>
                            <li>
                              <p>
                                TOTAL <span>$360.00</span>
                              </p>
                            </li>
                            <li>
                              <p>
                                SHIP TO
                                <span className="customerName">Mary Smith</span>
                                <span className="cstmrInfo">

                                  <strong>Mary Smith</strong>WA-117 First Floor,
                                  Shakarpur NEW DELHI, DELHI 110092 India
                                </span>
                              </p>
                            </li>
                          </ul>
                          <div className="invoiceDetails">
                            <p>ORDER # 4534-58945-568590 </p>
                            <div>
                              <span>
                                <Link href="#">Order Details</Link>
                              </span>
                              <span className="showInvoice">
                                <Link href="javascript:void(0)">
                                  Invoice
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </span>
                            </div>
                            <div className="invioceModel">
                              <ul>
                                <li>
                                  <Link href="#">P-slip/Warranty 1</Link>
                                </li>
                                <li>
                                  <Link href="#">Request invoice</Link>
                                </li>
                                <li>
                                  <Link href="#">Printable Order Summary</Link>
                                </li>
                              </ul>
                              <span className="modelClose">
                                <i className="fa fa-times" aria-hidden="true" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="itemDetails">
                          <h3>Return received</h3>
                          <p className="mb--10">
                            We’ve received your return. Your replacement is complete.
                          </p>
                          <div className="itemInfo">
                            <div className="itemImg">

                              {/* <div className="order_img"><img src={`${baseUrl}front/assets/images/518faREyvPL._AC_AA180_.jpg`}></div> */}
                              <img src={`${baseUrl}front/assets/images/41RwYpmIwxL._SY90_.jpg`} />
                            </div>
                            <div className="itemDesc">
                              <h4>Moto G 3rd Generation</h4>
                              <p>
                                Colour: <span>(Black, 16GB)</span>
                              </p>
                              <span className="itemPrice2">$360.00</span>
                              <div className="d-flex">
                                <button className="buy_again mr_10">
                                  Buy it again
                                </button>
                                <button className="view_your_item">
                                  View your item
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="btn_group">
                            <button className="buy_again">
                              View Return/Refund Status
                            </button>
                            {/*    <button className="gift_btn">Share gift receipt</button> */}
                            <button className="gift_btn">
                              Write a Product Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page