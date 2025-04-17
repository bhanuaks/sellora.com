

"use client"
import { useCart } from '@/app/contaxtData/cartContaxt'
import { userAppContaxt } from '@/app/contaxtData/userContaxtData'
import { apiRequest } from '@/Http/apiHelper'
import { baseUrl, currencyCode, dateFormat, dateValidateConverter, main_thumb_img_path, variant_thumb_img_path1 } from '@/Http/helper'
import { fileBasePath } from '@/Http/urlHelper'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { memo, useContext, useLayoutEffect, useState } from 'react'

const SingleOrderSection = ({ order, mutate }) => {
     
    const {addToCartProduct} = useCart() 

    async function addToCart(e, product_id, variant_id) {
          e.preventDefault()
          console.log( product_id, variant_id);
         
          const resData = await addToCartProduct(product_id, variant_id, 1)
          if (resData) {
            router.push(`${baseUrl}cart`)
          }
         
        }

      
    async function createReturnRequest(e, orderId){
        
        e.preventDefault();
        if(!confirm("Are youe sure to cancel this order?")){
            return false;
        }
        $('.loaderouter').css('display', 'flex')
        const response = await apiRequest(`${baseUrl}/api/user/order/cancel`,"POST", { order_item_id : orderId })
        $('.loaderouter').css('display', 'none')
        if(response.status){
            mutate(`${baseUrl}api/user/my-order`)
        }
    }


    return (
        <div className="orderCard">
            <div className="orderHead">
                <ul className="orderLeft">
                    <li>
                        <p>
                            ORDER PLACED <span>{dateValidateConverter(order.createdAt)}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            TOTAL <span>{order.currency ? currencyCode(order.currency) : '$'}{order.grand_total}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            SHIP TO
                            <span className="customerName">{order.address.first_name} {order.address.last_name}</span>
                            <span className="cstmrInfo">

                                <strong>{order.address.first_name} {order.address.last_name}</strong>
                                {order.address.company_name && (<> {order.address.company_name}<br /></>)}
                                {order.address.address},
                                {order.address.city} {order.address.state}, {order.address.zipcode} {order.address.country}

                            </span>
                        </p>
                    </li>
                </ul>
                <div className="invoiceDetails">
                    <p>ORDER # {order.order_id} </p>
                    <div>
                        <span>
                            <Link href={`${baseUrl}user/order-details/${order._id}`}>Order Details</Link>
                        </span>
                        <span className="showInvoice">
                            <Link href="#">
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
            {order.products.length > 0 ? order.products.map((prodData, index) => (

                <div className="itemDetails" key={index}>
                    {/* <h3>Delivered 16-Mar-2019</h3>
                        <p>Package was handed to a receptionist</p>
                        <p>Signed by: Priti.</p> */}
                    <div className="itemInfo">
                        {/* <div className="itemImg">
                            {prodData.variant_id?.withImage == "Yes" ? (
                                <img src={`${fileBasePath}${variant_thumb_img_path1}${prodData.variant_id?.image_1}`} />
                            ) : (
                                <img src={`${fileBasePath}${main_thumb_img_path}${prodData.product_id?.main_image}`} />
                            )}
                        </div> */}

                            <div className="itemImg">
                            {prodData.variant_id?.withImage === "Yes" ? (
                                <Image
                                src={`${fileBasePath}${variant_thumb_img_path1}${prodData.variant_id?.image_1}`}
                                alt="Variant Image"
                                width={100}
                                height={100}
                                loading="lazy"
                                />
                            ) : (
                                <Image
                                src={`${fileBasePath}${main_thumb_img_path}${prodData.product_id?.main_image}`}
                                alt="Product Image"
                                width={100}
                                height={100}
                                loading="lazy"
                                />
                            )}
                            </div>


                        <div className="itemDesc">
                            <h4>
                                {prodData.product_name}
                            </h4>

                            {prodData.variants && (
                                Object.entries(prodData.variants).map((item, index) => (
                                    <p key={index}>{item[0]}: <span>{item[1]}</span></p>
                                ))
                            )}


                            <span className="itemPrice2">{currencyCode(prodData.currency)}{prodData.price.toLocaleString()}</span>
                            <div className="d-flex">
                            {prodData.variant_id.stock >0 && prodData.variant_id.stock_status == "In Stock" ?(
                                <>
                                <button className="buy_again mr_10">
                                    Buy it again
                                </button>  
                                <button className="buy_again mr_10" onClick={(e)=>addToCart(e, prodData.product_id?._id, prodData.variant_id?._id)}>Add To Cart</button> 
                                </>
                                ):""}
                                 
                            </div>
                        </div>
                    </div>


                    <div className="btn_group"> 
                        <Link href="#">
                        <button className="gift_btn return"><img src={`${baseUrl}front/assets/images/location.png`} />Track Order</button>
                    </Link>
                    {prodData.order_status == "7" ? (
                        <Link href="#" >
                        <button className="gift_btn return"> <img src={`${baseUrl}front/assets/images/return.png`} />Cancelled</button>
                    </Link>
                    ):(
                        <Link href={`${baseUrl}/user/return-refund/${prodData._id}`}>
                            <button className="gift_btn return"> <img src={`${baseUrl}front/assets/images/return.png`} /> Return/Refund</button>
                        </Link>
                    )}
                        
                        {JSON.stringify(order.review)}
                        <Link href={`${baseUrl}/user/product-review/${prodData.product_id?.slug}`}>
                       
                            <button className="gift_btn">{order.review?"Edit Product Review":"Write a Product Review "}</button>
                        </Link>
                        <button className="buy_again">Seller Feedback</button>
                        <button className="get_support">Get Support</button>
                        <div className="clearfix"></div>
                    </div>
                </div>

            )) : ""}

        </div>
    )
}

export default memo(SingleOrderSection)