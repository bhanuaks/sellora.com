import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
    <div className="rts-navigation-area-breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="navigator-breadcrumb-wrapper">
              {" "}
              Help <i className="fa-regular fa-chevron-right" />{" "}
              <a className="current" href="help-center.html">
                Help Center
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section-seperator">
      <div className="container">
        <hr className="section-seperator" />
      </div>
    </div>
    <div className="rts-map-contact-area rts-section-gap2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="contact-left-area-main-wrapper text-center">
              <h2>Help &amp; Support</h2>
              <div className="search-bar">
                <a href="#">
                  {" "}
                  <span className="search-icon">🔍</span>
                </a>
                {/* Unicode for search icon */}
                <input
                  type="text"
                  placeholder="Ex: Cancellations, How to return my order, etc."
                />
              </div>
              <h2>How Can We Help You ?</h2>
              <div className="help-options">
                <div className="option">
                  {" "}
                  <img
                    src={`${baseUrl}front/assets/images/track-my-order.jpg`}
                    alt="Track my order"
                  />{" "}
                  <span>Track my order</span>{" "}
                </div>
                <div className="option">
                  {" "}
                  <img src={`${baseUrl}front/assets/images/phone.jpg`} alt="Contact Us" />{" "}
                  <span>Contact Us</span>{" "}
                </div>
                <div className="option">
                  {" "}
                  <img
                    src={`${baseUrl}front/assets/images/pick-up-delivery.jpg`}
                    alt="Pick Up & Delivery"
                  />{" "}
                  <span>Pick Up &amp; Delivery</span>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="order-card">
                  <div className="order-header">
                    <div className="icon">
                      <img src={`${baseUrl}front/assets/images/order.png`} />
                    </div>
                    <div className="title">Your Order</div>
                  </div>
                  <ul className="order-list">
                    <li>
                      <a href="#">Track Your Order</a>
                    </li>
                    <li>
                      <a href="#">Canceled Orders</a>
                    </li>
                    <li>
                      <a href="#">Delayed Orders</a>
                    </li>
                    <li>
                      <a href="#">Missing Items</a>
                    </li>
                    <li>
                      <a href="#">Order Not Received</a>
                    </li>
                    <li>
                      <a href="#">Delivery Feedback and Tips</a>
                    </li>
                    <li>
                      <a href="#">Pickup and Delivery</a>
                    </li>
                    <li>
                      <a href="#">Pickup and Delivery Changes and Exceptions</a>
                    </li>
                    <li>
                      <a href="#">Guided Delivery Instructions</a>
                    </li>
                    <li>
                      <a href="#">How to Update Your Address</a>
                    </li>
                    <li>
                      <a href="#">Chat With Your Shopper</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-card">
                  <div className="order-header">
                    <div className="icon">
                      <img src={`${baseUrl}front/assets/images/payments.png`} />
                    </div>
                    <div className="title">Account &amp; Payments</div>
                  </div>
                  <ul className="order-list">
                    <li>
                      <a href="#">Create or Edit an Account</a>
                    </li>
                    <li>
                      <a href="#">Tax Exempt</a>
                    </li>
                    <li>
                      <a href="#">Payment Methods</a>
                    </li>
                    <li>
                      <a href="#">
                        Account Security and Unrecognized Charges or Orders
                      </a>
                    </li>
                    <li>
                      <a href="#">View Store Purchases and Find Receipts</a>
                    </li>
                    <li>
                      <a href="#">Manage Passw</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-card">
                  <div className="order-header">
                    <div className="icon">
                      <img src={`${baseUrl}front/assets/images/returns.png`} />
                    </div>
                    <div className="title">Returns &amp; Refunds</div>
                  </div>
                  <ul className="order-list">
                    <li>
                      <a href="#">Refunds</a>
                    </li>
                    <li>
                      <a href="#">Start an Online Return</a>
                    </li>
                    <li>
                      <a href="#">Sellora Marketplace Return Policy</a>
                    </li>
                    <li>
                      <a href="#">
                        Sellora Marketplace Return Policy Return Restrictions
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Marketplace Major Appliances Purchase and Returns
                      </a>
                    </li>
                    <li>
                      <a href="#">Guide</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-card">
                  <div className="order-header">
                    <div className="icon">
                      <img src={`${baseUrl}front/assets/images/terms.png`} />
                    </div>
                    <div className="title">Terms of Use</div>
                  </div>
                  <ul className="order-list">
                    <li>
                      <a href="#">Sellora Terms of Use</a>
                    </li>
                    <li>
                      <a href="#">Sellora Subscribe Terms of Use</a>
                    </li>
                    <li>
                      <a href="#">Gift Card Terms and Conditions</a>
                    </li>
                    <li>
                      <a href="#">Sellora Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">Mobile Alerts Terms of Use</a>
                    </li>
                    <li>
                      <a href="#">Sellora User Generated Content Terms of Use</a>
                    </li>
                    <li>
                      <a href="#">
                        Ratings, Reviews, Question, &amp; Answer Terms of Use
                      </a>
                    </li>
                    <li>
                      <a href="#">Pay by Bank Program Terms and Conditions</a>
                    </li>
                    <li>
                      <a href="#">Warranty Terms and Conditions</a>
                    </li>
                    <li>
                      <a href="#">
                        30 Day Satisfaction Guarantee Terms and Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#">Vision</a>
                    </li>
                    <li>
                      <a href="#">Delivery Terms of Use</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-card">
                  <div className="order-header">
                    <div className="icon">
                      <img src={`${baseUrl}front/assets/images/policies.png`} />
                    </div>
                    <div className="title">Policies</div>
                  </div>
                  <ul className="order-list">
                    <li>
                      <a href="#">Sellora Privacy Policies and Guidelines</a>
                    </li>
                    <li>
                      <a href="#">Single Use Bag Policy</a>
                    </li>
                    <li>
                      <a href="#">
                        Responsible Disclosure and Accessibility Policies
                      </a>
                    </li>
                    <li>
                      <a href="#">Claims of Intellectual Property Infringement</a>
                    </li>
                    <li>
                      <a href="#">Third party Software and Licensing Notices</a>
                    </li>
                    <li>
                      <a href="#">Sellora FAQs</a>
                    </li>
                    <li>
                      <a href="#">Sellora+ Promotions Disclosure</a>
                    </li>
                    <li>
                      <a href="#">Unclaimed Property</a>
                    </li>
                    <li>
                      <a href="#">Electronic Waste Recycling</a>
                    </li>
                  </ul>
                </div>
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