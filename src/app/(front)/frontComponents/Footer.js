import { baseUrl } from '@/Http/helper'
import { fileBasePath, sellerUrl } from '@/Http/urlHelper'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
  {/* rts footer one area start */}
  <div className="rts-footer-area pt--30 bg_blue-footer">
    <div className="container-fluid">
      <div className="footer-main-content-wrapper">
        <div className="row">
          <div className="col-lg-3">
            <div className="single-footer-wized">
              <h3 className="footer-title">About</h3>
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/consumer/career">Careers</Link>
                  </li>
                  {/* <li>
                    <Link href="#">Sellora Category</Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-footer-wized">
              <h3 className="footer-title">Sell on Sellora</h3>
              <div className="footer-nav">
                <ul>
                  {/* <li>
                    <Link href={sellerUrl} target="_blank">
                      Become a Seller
                    </Link>
                  </li> */}
                  <li>
                    <a target='_blank' href={process.env.SELLER_URL}>Seller Central</a>
                  </li>
                  <li>
                    <Link href="/become-a-verified-supplier">
                      Become a Verified Supplier
                    </Link>
                  </li>
                  <li>
                    <Link href="/partner-and-program">Partner and Program</Link>
                  </li>
                  <li>
                    <Link href="#">Get Sellora App</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="single-footer-wized">
              <h3 className="footer-title">Help</h3>
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link href="/payment">Payment</Link>
                  </li>
                  <li>
                    <Link href="/shipping">Shipping</Link>
                  </li>
                  {/* <li>
                    <Link href="/cancellation-and-return">
                      Cancellation and Return
                    </Link>
                  </li> */}

                  
                  <li>
                    <Link href="/report-infringement">Report Infringement</Link>
                  </li>
                  <li>
                    <Link href="/help-center">Help Center</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-2" style={{ float: "right" }}>
            <div className="single-footer-wized">
              <h3 className="footer-title">Consumer Policy</h3>
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link href="/terms-of-use">Terms of Use</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  
                  <li>
                    <Link href="/cancellation-return-policy">
                      Cancellation &amp; Return Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/delivery-information">
                      Delivery Information
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="social-and-payment-area-wrapper d-lg-flex justify-content-lg-between">
        <div className="social-one-wrapper">
          {" "}
          <span>Follow Us:</span>
          <ul>
            <li>
              <Link href="#">
                <i className="fa-brands fa-facebook-f" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-brands fa-twitter" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-brands fa-youtube" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-brands fa-whatsapp" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-brands fa-instagram" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="payment-access">
          {" "}
          <span>Payment Accepts:</span>{" "}
          <img src={`${baseUrl}front/assets/images/payment/06.png`} alt="" />
        </div>
        <div>
          {" "}
          <Link href="#" className="playstore-app-area">
            {" "}
            <span>Download App</span>{" "}
            <img src={`${baseUrl}front/assets/images/payment/02.png`} alt="" />{" "}
            <img src={`${baseUrl}front/assets/images/payment/03.png`} alt="" />{" "}
          </Link>{" "}
        </div>
      </div>
    </div>
  </div>
  {/* rts footer one area end */}
  {/* rts copyright-area start */}
  <div className="rts-copyright-area five-h">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="copyright-between-1">
            <p className="disc"> © 2024-2025 Sellora, LLC </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default Footer