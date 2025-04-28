import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
    <div className="rts-map-contact-area rts-section-gap2 help-center_light_bg">
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
                <input
                  type="text"
                  placeholder="Ex: Cancellations, How to return my order, etc."
                />
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
    <div className="rts-map-contact-area rts-section-gap2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="contact-left-area-main-wrapper text-center">
              <h2>How Can We Help You ?</h2>
              <div className="help-options">
                  <Link href="/help-center/track-your-order" >
                <div className="option">
                  {" "}
                   
                      <img
                        src={`${baseUrl}front/assets/images/track-my-order.jpg`}
                        alt="Track my order"
                      />{" "}
                      <span>Track my order</span>{" "}
                   
                </div>
                  </Link>
                {/* <div class="option"> <img src="assets/images/phone.jpg" alt="Contact Us"> <span>Contact Us</span> </div> */}
                <Link href="/help-center/pick-up-and-delivery" >
                <div className="option">
                  {" "}
                  <img
                    src={`${baseUrl}front/assets/images/pick-up-delivery.jpg`}
                    alt="Pick Up & Delivery"
                  />{" "}
                  <span>Pick Up &amp; Delivery</span>{" "}
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <Link href="/help-center/create-or-edit-account">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/payments.png`} />
                      </div>
                      <div className="title">Account</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4">
                <Link href="/help-center/track-your-order">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/order.png`}/>
                      </div>
                      <div className="title">Your Order</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4">
                <Link href="/help-center/payment">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/payment_1.png`} />
                      </div>
                      <div className="title">Payment Method</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4">
                <Link href="/help-center/cancellation-policy">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/cancellation.png`} />
                      </div>
                      <div className="title">Cancellation and Return Policy</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4">
                <Link href="/help-center/terms-of-use">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/terms1.png`} />
                      </div>
                      <div className="title">Terms of Use</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4">
                <Link href="/help-center/privacy-policy">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/policies.png`} />
                      </div>
                      <div className="title">Privacy Policies</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4">
                <Link href="/help-center/faq">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="icon">
                        <img src={`${baseUrl}front/assets/images/faq_ere.png`} />
                      </div>
                      <div className="title">FAQ’s</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="rts-map-contact-area rts-section-gap2 help-center_light_bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="contact-left-area-main-wrapper text-center">
              <h2>Need More Help ?</h2>
              <div className="contact_sellora_support">
                <Link href="#">
                  <span>Contact Sellora Support</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  </>
  
  

  )
}

export default page