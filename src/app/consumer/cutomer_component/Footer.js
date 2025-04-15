import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
  <div className="rts-footer-area pt--30 bg_blue-footer">
    <div className="container-fluid">
      <div className="footer-main-content-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="single-footer-wized">
              <div className="carreer_footer-nav">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/consumer/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/consumer/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link href="/consumer/candidate-login">Candidate Login</Link>
                  </li>
                  <li>
                    <Link href="/consumer/terms-of-use">Terms of Use</Link>
                  </li>
                  <li>
                    <Link href="/consumer/privacy-policy">Privacy Policy</Link>
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
          <img src={`${baseUrl}front/assets/images/payment/06.png`} alt="" />{" "}
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