"use client"
import { baseUrl, getOffPrecentage } from '@/Http/helper'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, use  } from 'react'
import { Suspense } from "react";
import {main_thumb_img_path} from '@/Http/helper'

import '../../../../../Styles/image.css'
import '../../../../../Styles/product_loder.css'
import { fileBasePath } from '@/Http/urlHelper'

const page = ({ params }) => {


    const ProductPage =({params})=>{

        const unwrappedParams = use(params);
        const sellor_id = unwrappedParams.seller_id
        const searchParams = useSearchParams()
        const category_slug = searchParams.get('category')
        const [categories, setCategories] = useState([])
        const [products, setProducts] = useState([])
        const [loader, setLoader] = useState(false)
        useEffect(() => {
            setLoader(true)
            fetch(`${baseUrl}api/seller-products?seller_id=${sellor_id}&category_slug=${category_slug}`, {
                method: "GET",
            }).then((response) => {
                if (!response.ok) {
                    setLoader(false)
                    throw new Error("Network Error")
                }
                return response.json()
            }).then((res) => {
                if (res.status) {
                    setCategories(res.data.category)
                    setProducts(res.data.products)
                }
                setLoader(false)
            })
    
        }, [sellor_id, category_slug])
    
    
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="banner-content-store">
                                {/* <img src={`${baseUrl}front/assets/images/store_banneer.jpg`} /> */}
                                <Image
                                        src={`${baseUrl}front/assets/images/store_banneer.jpg`}
                                        alt="Product Image"
                                        loading="lazy"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                                        />
                            </div>
                        </div>
                    </div>
                </div>
                {/* ===============store-category=open===================== */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="store_logo" style={{display:'flex', justifyContent:'center'}}>
                                {/* <img src={`${baseUrl}front/assets/images/store_logo.jpg`} /> */}
                                <Image
                                        src={`${baseUrl}front/assets/images/store_logo.jpg`}
                                        alt="Product Image"
                                        loading="lazy"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '30px' }}
                                        />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* <div className="col-lg-2">
      <div className="store_logo"><img src={`${baseUrl}front/assets/images/store_logo.jpg`}></div>
    </div> */}
                            <div className="col-lg-10 offset-lg-1">
                                <div className="tabs-container">
                                    <nav className="tabs">
                                        <ul>
                                            <li>
                                                <Link href={`${baseUrl}seller-details/${sellor_id}`}>Profile</Link>
                                            </li>
                                            <li className="active">
                                                <Link href={`${baseUrl}seller-details/${sellor_id}/products`}>Product</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
    
                
    
                    {/* =============================1st-tab-open==================== */}
                    <div className="row">
                        {/* <div className="col-lg-12 pt--20">
    <h2 className="title-left">Shop All</h2>
    </div> */}
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-2 col-md-2 col-sm-3 col-12">
                            <div className="category_heading">Category</div>
                            <ul className="left_category">
    
    
                                <li className={!category_slug ? "active2" : ''}>
                                    <Link href={`${baseUrl}seller-details/${sellor_id}/products`}>Shop All</Link>
                                </li>
                                {categories && categories.length > 0 ? categories.map((cate, index) => (
                                    <li key={index} className={category_slug == cate.slug ? "active2" : ''}>
                                        <Link href={`${baseUrl}seller-details/${sellor_id}/products?category=${cate.slug}`}>{cate.name}</Link>
                                    </li>
                                )) : null}
    
                                
                            </ul>
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-9 col-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h2 className="title-left line-height">Shop All</h2>
                                </div>
                            </div>
                            <div className="row">
                                {loader && (
                                    <div className='product_loader'>  
                                        <div id="loader"></div>
                                    </div>
                                )}
                            
                                {!loader && products && products.length > 0 ?
                                    products.map((prod, index) => (
                                        <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                                            <div className="store_poroduct_outer deals-of-day">
                                                <div className="store_product_outer_image_area">
                                                    <a href={`${baseUrl}product-details/${prod.slug}`}>
                                                         <div className='reletive w-full h-full'> 
                                                        
                                                          <Image
                                                                src={`${fileBasePath}${main_thumb_img_path}${prod.main_image}`}
                                                                alt="Product Image"
                                                                loading="lazy"
                                                                width={0}
                                                                height={0}
                                                                sizes="100vw"
                                                                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                                                                />
                                                         </div>
                                                        
                                                           
                                                    </a>
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
                                                    <Link href={`${baseUrl}product-details/${prod.slug}`}>
                                                        <h4 className="title">
                                                            {prod.product_name}
                                                        </h4>
                                                    </Link>
                                                    {prod.variant && (
                                                        <>
                                                        <div className="price-area">
                                                            <span className="current">${prod.variant && prod.variant.consumerSalePrice}</span>
                                                            <div className="previous">${prod.variant && prod.variant.msrp} </div>
                                                        </div>
                                                        <div className="min-off">
                                                            Min. {prod.variant? getOffPrecentage(prod.variant.msrp, prod.variant.consumerSalePrice).toFixed(2):0}% <span>Off</span>
                                                        </div> 
                                                        </>
                                                    )}
                                                    
                                                    <div className="cart-counter-action">
                                                        <a
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
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
    
                                    )) : (
                                        <div> Product not found! </div>
                                    )}
                                {/* <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
                                            <a href="product-details.html">
                                                <img src={`${baseUrl}front/assets/images/p1.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Women Printed Viscose Rayon Straight Kurta
                                                </h4>
                                            </a>
    
                                            <div className="price-area">
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
                                            <a href="product-details.html">
                                                <img src={`${baseUrl}front/assets/images/p2.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Women Printed Georgette Anarkali Kurta With Attached Dupatta
                                                    (Pink)
                                                </h4>
                                            </a>
                                            <div className="price-area">
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p3.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">Women Relaxed Fit Fit Solid Pa</h4>
                                            </a>
                                           
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p4.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Casual Regular Sleeves Solid Women Black Top
                                                </h4>
                                            </a>
                                            
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p5.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Women Regular Fit Printed Casual Shirt
                                                </h4>
                                            </a>
                                            
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p6.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">Men Colorblock Polo Neck Co</h4>
                                            </a>
                                           
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p7.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Men Printed Round Neck Polyester Multicolor T-Shirt
                                                </h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p8.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Men Printed Round Neck Cotton Blend Orange T-Shirt
                                                </h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p9.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Men Printed Round Neck Cotton Blend Orange T-Shirt
                                                </h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/p10.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Men Printed Round Neck Cotton Blend Blue T-Shirt
                                                </h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/b1.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">Boys Regular Fit Self Design </h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/b2.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">Boys Regular Fit Embroidered </h4>
                                            </a>
                                           
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/b3.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Boys Regular Fit Printed Spread Collar Casual Shirt
                                                </h4>
                                            </a>
                                            
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/b4.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">Boys Regular Fit Printed Casua</h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-20 col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className="store_poroduct_outer deals-of-day">
                                        <div className="store_product_outer_image_area">
    
                                            <a href="product-details.html">
    
                                                <img src={`${baseUrl}front/assets/images/b5.jpg`} />
                                            </a>
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
                                            <a href="product-details.html">
                                                <h4 className="title">
                                                    Boys Relaxed Fit Fit Printed Lapel Collar Casual Shirt
                                                </h4>
                                            </a>
                                             
                                            <div className="price-area">
    
                                                <span className="current">$559</span>
                                                <div className="previous">$2,044 </div>
                                            </div>
                                            <div className="min-off">
                                                Min. 20% <span>Off</span>
                                            </div>
                                            <div className="cart-counter-action">
    
                                                <a
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* =============================1st-tab-end==================== */}
                </div>
            </>
    
        )
    }

     return (
        <Suspense fallback={<div>Loading...</div>}> 
          <ProductPage params={params}/>
      </Suspense>
      )
    
}

export default page