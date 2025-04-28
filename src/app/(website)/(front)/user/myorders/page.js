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
import '../../../../../../public/front/loader.css'


function page() {

  
  const [searchVal, setSearchVal] = useState("")
  const [yearSearch, setYearSearch] = useState("")
  const [activeTab, setActiveTab] = useState('order'); 
  const [searchUrl, setSearchUrl] = useState(`${baseUrl}api/user/my-order`);
  const [yearAll, setYearAll] = useState([])
  const [searchTabVal, setSearchTabVal] = useState("")
  const {data:orderData, error, isLoading } = useSWR(searchUrl, fetcher)

  const orders = orderData?.data?.orders || [];
   const {globalUser} = useContext(userAppContaxt);
    const [user, setUser] = useState(null); 
    const {addToCartProduct} = useCart()
    const router = useRouter();
    
  // const [orders, setOrders] = useState([])


  const handleSearch = (e) => {
    setSearchVal(e.target.value)
  }

  const fetchSearchAll = (search, yearSearch, searchTab) => {
    $('.loaderouter').css('display', 'flex')
    const trimmedQuery = search.trim();
    const url = `${baseUrl}api/user/my-order?search=${trimmedQuery}&year=${yearSearch}&searchTab=${searchTab}` 
    setSearchUrl(url);
    $('.loaderouter').css('display', 'none')

  }

  const handleSearchButton = (e) => {
    e.preventDefault()
    fetchSearchAll(searchVal, yearSearch, searchTabVal)
  }
  
  const handleSearchOrder = (e) => {
    let value = e.target.value
    setYearSearch(value)
    fetchSearchAll(searchVal, value, searchTabVal)

  }

  const searchTab = (e, value) => {
    e.preventDefault();
    setSearchTabVal(value)
    setActiveTab(value)
    fetchSearchAll(searchVal, yearSearch, value)

  }
  
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

useEffect(() => {
  const currentYear = new Date().getFullYear();  
  const targetStartYear = 2025;
  const yearList = [];
  for (let year = targetStartYear; year <= currentYear; year++) {
    yearList.push(year)
  }

  setYearAll(yearList)

},[])

  return (
    <>
      <link
        rel="stylesheet preload"
        href={`${baseUrl}front/assets/css/my_order.css`}
        as="style"
      />
      <div className="loaderouter"><div className="loader"></div></div>
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
                        <form name="search" onSubmit={handleSearchButton}>
                          <input
                            type="text"
                            placeholder="Search all orders"
                            name="search"
                            onChange={handleSearch}
                          />
                          <button type="submit" onClick={handleSearchButton}>
                            <i className="fa fa-search" />
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="order_tab">
                      <ul className="tabs">
                        <li className={`tab-link ${activeTab == 'order' ? 'current' : ''}`} data-tab="order_tab" onClick={(e)=>searchTab(e, 'order')}>
                          Orders
                        </li>
                        <li className={`tab-link ${activeTab == 'buy_again' ? 'current' : ''}`} data-tab="buy_again">
                          Buy Again
                        </li>
                        <li className={`tab-link ${activeTab == 'notshipped' ? 'current' : ''}`} data-tab="open_orders" onClick={(e)=>searchTab(e, 'notshipped')}>
                          Not Yet Shipped
                        </li>
                        <li className={`tab-link ${activeTab == 'cancel' ? 'current' : ''}`} data-tab="cancelled_orders" onClick={(e)=>searchTab(e, 'cancel')}>
                          Cancelled Orders
                        </li>
                        <li className={`tab-link ${activeTab == 'return' ? 'current' : ''}`} data-tab="returns" onClick={(e)=>searchTab(e, 'return')}>
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
                              <select defaultValue={""} name="orderYear" onChange={handleSearchOrder}>
                              <option data-ref="d" value="">

                                Select...
                                </option>
                                <option data-ref="d30" value="last30">

                                  last 30 days
                                </option>
                                <option data-ref="m3" value="months-3">

                                  past 3 months
                                </option>
                                {yearAll && yearAll.map((yearList, index) => {

                                return(
                                <option key={index} data-ref={`y${yearList}`} value={`${yearList}`}>

                                  {yearList}
                                </option>
                                )})}
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