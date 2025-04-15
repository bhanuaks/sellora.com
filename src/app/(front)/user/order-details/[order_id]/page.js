"use client"
import Link from 'next/link'
import React, { use, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { baseUrl, currencyCode, dateFormat, dateValidateConverter } from '@/Http/helper'
import '../../../../../../public/front/assets/css/my_order.css'
import UserSideBarSecction from '../../userSideBarSecction'
import { userAppContaxt } from '@/app/contaxtData/userContaxtData'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/contaxtData/cartContaxt'
import OrderDetailsProducts from './orderDetailsProducts'

function page({ params }) {

  const order_id = use(params).order_id
  const { globalUser } = useContext(userAppContaxt);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [order, setOrder] = useState(null)
  const { addToCartProduct } = useCart()


  useEffect(() => {

    if (globalUser.user) {

      $('.loaderouter').css('display', 'flex')
      fetch(`${baseUrl}api/user/user-details?user_id=${globalUser.user._id}`, {
        method: "GET"
      }).then((response) => {

        if (!response.ok) {
          $('.loaderouter').css('display', 'none')
          throw new Error("Network Error")
        }
        return response.json();
      }).then((res) => {
        if (res.status) {
          setUser(res.data.user)
        }
        $('.loaderouter').css('display', 'none')
      })
    }

  }, [globalUser.user])

  useLayoutEffect(() => {
    async function fetchOrder() {
      $('.loaderouter').css('display', 'flex')
      const response = await fetch(`${baseUrl}api/user/fetch-single-order?order_id=${order_id}`)
      if (!response.ok) {
        $('.loaderouter').css('display', 'none')
        throw new Error("Network Error")
      }
      const res = await response.json();
      $('.loaderouter').css('display', 'none')
      if (res.status) {
        setOrder(res.data.order)
      }
      console.log(res.data.order);
    }
    fetchOrder();

  }, [])





  async function addToCart(e, product_id, variant_id) {
    e.preventDefault()
    console.log(product_id, variant_id);

    const resData = await addToCartProduct(product_id, variant_id, 1)
    if (resData) {
      router.push(`${baseUrl}cart`)
    }

  }

  return (
    <>
      {/* rts navigation bar area start */}
      <div className="rts-navigation-area-breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">

                <a href="index.html">Dashboard</a>
                <i className="fa-regular fa-chevron-right" />
                <a href="#">My Order</a>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">
                  Order Details
                </a>
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
            <UserSideBarSecction user={user} />
            {order && (
              <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
              <div className="dashboard-account-area">
                <h2 className="title">Order Details</h2>
                <div className="row">
                  <div className="col-lg-10">
                    <div className="order_dfsd">
                      <ul>
                        <li>Ordered on {order && order?.createdAt?dateValidateConverter(order?.createdAt):''} </li>
                        <li>Order Id # {order?.order_id}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="invoice">
                      <a href="invoice.html">Invoice</a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="address_shipping">
                      <h3> Shipping Address</h3>
                      <p>
                        <span>{order?.address?.first_name} {order?.address?.last_name}</span>
                        {order?.address?.company_name && (<> {order?.address?.company_name}<br /></>)}
                        {order?.address?.address},
                        {order?.address?.city} {order?.address?.state}, {order?.address?.zipcode} <br />{order?.address?.country}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="address_shipping">
                      <h3>Payment Methods</h3>
                      <p> {order?.payment_type}</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="address_shipping">
                      <h3>Order Summary</h3>
                    </div>
                    <div className="item_df">

                      Item(s) Subtotal: <span>{order && order.currency ? currencyCode(order.currency) : "$"}{order?.total_price.toLocaleString()}</span>
                    </div>
                    <div className="item_df">

                      Shipping: <span>{order && order.currency ? currencyCode(order.currency) : "$"}{order?.shipping_charge.toLocaleString()}</span>
                    </div>
                    {order && (order.threshold_discount > 0 || order.coupon_discount > 0) ? (
                      <div className="item_df">
                        Discount : <span>{order && order.currency ? currencyCode(order.currency) : "$"}{order ? (order.coupon_discount + order.threshold_discount).toLocaleString() : 0}</span>
                      </div>
                    ) : ""}

                    <div className="item_df">

                      Total: <span>{order && order.currency ? currencyCode(order.currency) : "$"}{order?.grand_total.toLocaleString()}</span>
                    </div>
                    <div className="item_df grand_total">

                      Grand Total: <span>{order && order.currency ? currencyCode(order.currency) : "$"}{order?.grand_total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="col-lg-12 pt--20">
                    <hr />
                  </div>
                  <div className="col-lg-12">
                    <div className="transactions">

                      <a href="#">Transactions</a>
                    </div>
                  </div>
                </div>
                {order?.products.length > 0 ? order.products.map((prodData, index) => (

                   <OrderDetailsProducts key={index} prodData={prodData}/>

                )) : ""}


              </div>
               
            </div>
            )}
            
          </div>
        </div>
      </div>
    </>


  )
}

export default page
