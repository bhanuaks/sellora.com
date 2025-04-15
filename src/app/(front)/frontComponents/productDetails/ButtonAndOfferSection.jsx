import { baseUrl } from '@/Http/helper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ButtonAndOfferSection({addToCart, proccess, changeVariant, selectedQuantity, setSelectedQuantity }) {
  return (
    <div className="col-xl-2 col-lg-2 col-md-12 rts-sticky-column-item">
                      <div className="theiaStickySidebar right_1212_side">
                        <div className="product-bottom-action">
                          <div className="stock-status w-100 trending_sec">
                            {changeVariant.stock <= 0 ||
                            changeVariant.stock_status == "out Of stock" ? (
                              <p className="text-danger d-flex align-items-center">
                                <i className="fa-solid fa-circle-xmark" /> 
                                Out Of Stock
                              </p>
                            ) : (
                              <p className="text-success d-flex align-items-center">
                                <i className="fas fa-check-circle me-2" />
                                
                                {/* Green check icon */}
                                In Stock
                              </p>
                            )}
                          </div>
                          <div className="clearfix" />
                          {/* <h6 className="title m-0">Quantity</h6> */}
                          <div className="cart-edits w-100">
                            <div className="quantity_select">
                              <label htmlFor="quantity">Quantity:</label>
                              <select
                                id="quantity"
                                name="quantity"
                                className="form-select"
                                value={selectedQuantity || 1}
                                onChange={(e) =>
                                  setSelectedQuantity(e.target.value)
                                }
                                disabled = {changeVariant.stock <= 0? true: false}
                              >
                              {Array.from({ length: changeVariant.stock }, (_, i) => (
                                  <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                                 
                              </select>
                            </div>
                          </div>
                          <Link
                            href="#"
                            onClick={(e) => addToCart(e)}
                            className="add_to_cart radious-sm w-100 text-center"
                            style={{
                              pointerEvents: `${proccess || changeVariant.stock <= 0 || changeVariant.stock_status == "out Of stock" ? "none" : ""}`,
                            }}
                          >
                            <div className="btn-text">
                              <div>
                                {proccess ? (
                                  <button className="loading"> continue</button>
                                ) : (
                                  <>
                                    <i className="fa-regular fa-cart-shopping" />{" "}
                                    Add To Cart
                                  </>
                                )}
                              </div>
                            </div>
                          </Link>
                          <Link href="#" className="buy_now w-100 text-center"
                           style={{
                            pointerEvents: `none`,
                          }}>
                            <div className="btn-text">
                              <i className="fa-regular fa-bolt" /> Buy Now
                            </div>
                          </Link>
                        </div>
                        <div className="shop-sight-sticky-sidevbar mb--20">
                        <h6 className="title">Shipping</h6>
                        <div className="single-offer-area">
                            <div className="icon">
                              <i className="far fa-truck" aria-hidden="true" />
                            </div>
                            <div className="details">
                              <p>contact seller for shipping options. See details for shipping</p>
                            </div>
                          </div>

                          <h6 className="title">Available offers</h6>
                          <div className="single-offer-area">
                            <div className="icon">
                              <i className="far fa-handshake" />
                            </div>
                            <div className="details">
                              <p>
                                Get %5 instant discount for the 1st Sellora Order
                                using Ekomart UPI T&amp;C
                              </p>
                            </div>
                          </div>
                          <div className="single-offer-area">
                            <div className="icon">
                              <i className="far fa-certificate" />
                            </div>
                            <div className="details">
                              <p>
                                Flat $250 off on Citi-branded Credit Card EMI
                                Transactions on orders of $30 and above T&amp;C
                              </p>
                            </div>
                          </div>
                          {/* <div className="single-offer-area">
                            <div className="icon">
                              <i className="far fa-truck" aria-hidden="true" />
                            </div>
                            <div className="details">
                              <p>Free Worldwide Shipping on all orders over $100</p>
                            </div>
                          </div> */}
                        </div>
                        <div className="our-payment-method">
                          <h5 className="title">Guaranteed Safe Checkout</h5>
                          <Image
                            src={`${baseUrl}front/assets/images/shop/03.png`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
  )
}

export default ButtonAndOfferSection