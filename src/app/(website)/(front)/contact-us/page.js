import { baseUrl } from '@/Http/helper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            Contact Us
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    className="rts-map-contact-area rts-section-gap2"
    style={{
      background:
        `url(${baseUrl}front/assets/images/contact-form-background.jpg) fixed no-repeat`
    }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="contact-left-area-main-wrapper">
            <h2 className="title text-white"> You can ask us questions !</h2>
            <p className="disc text-white">
              Contact us for all your questions and opinions, or you can solve
              your problems in a shorter time with our contact offices.
            </p>
            <div className="location-single-card">
              <div className="icon">
                <i className="fa-light fa-location-dot" />
              </div>
              <div className="information">
                <div className="mb--50">
                  <h3 className="title  text-white">Sellora, LLC</h3>
                  <p>
                    <strong>1703</strong> Evans Rd.
                    <br />
                    Apt# 14211
                    <br />
                    San Antonio, Texas <strong>78258</strong>
                  </p>
                </div>
                <div className="contac_number">
                  <h5>Give us a call.</h5>
                  <Image src={`${baseUrl}front/assets/images/telephone.png`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  /> 
                  
                  <a href="tel:+1 808 446 1136" className="cont">
                    
                    +1 (808) 446 1136
                  </a>
                </div>
                <div className="contac_number">
                  <h5>Email us at:</h5>
                  <Image src={`${baseUrl}front/assets/images/communication.png`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  />
                  <a href="mailto:customercare@sellora.com" className="mail">
                    customercare@sellora.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 pl--50 pl_sm--5 pl_md--5">
          <div className="contact-form-wrapper-1">
            <h3 className="title">Fill Up The Form If You Have Any Question</h3>
            <form action="#" className="contact-form-1">
              <div className="contact-form-wrapper--half-area">
                <div className="single">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="single">
                  <input type="text" placeholder="Email" />
                </div>
              </div>
              <div className="contact-form-wrapper--half-area">
                <div className="single">
                  <input type="text" placeholder="Phone Number" />
                </div>
                <div className="single">
                  <input type="text" placeholder="Subject" />
                </div>
              </div>
              <div className="single-select">
                <select className="form-select">
                  <option >Feedback</option>
                  <option value={1}>Good Service</option>
                  <option value={2}>Vendor Support</option>
                  <option value={3}>Timely Delivery</option>
                  <option>Quality Assurance</option>
                </select>
              </div>
              <textarea
                name="message"
                placeholder="Write Message Here"
                 
              />
              <div className="contact-form-wrapper--half-area">
                <div className="single">
                  <input type="text" placeholder="Captcha Code Here" />
                </div>
                <div className="single">
                  <div className="captcha">sdjrdk</div>
                </div>
                <div className="single">
                  <div className="refresh">
                    <a href=""> 
                      <i className="fa fa-refresh" />
                    </a>
                  </div>
                </div>
              </div>
              <button className="rts-btn btn-primary mt--20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rts-feature-area rts-section-gap">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-2">
          <div className="better_choices">
            <h1>
              Better Selections,
              <br />
              Brighter Prices
            </h1>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                  {/*  <i class="far fa-truck"></i> */}
                  <Image src={`${baseUrl}front/assets/images/Fast-Delivery.jpg`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  /> 
                  
                </div>
                <div className="content">
                  <h4 className="title">Fast Delivery</h4>
                  <span>
                    Get your items delivered faster with our enhanced service on
                    select products
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                <Image src={`${baseUrl}front/assets/images/Secured_Payment.jpg`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  /> 
                  {/* <i class="far fa-briefcase"></i>  */}
                </div>
                <div className="content">
                  <h4 className="title">Secured Payment</h4>
                  <span>
                    The payment methods loved and used by shoppers, offering
                    safety and high levels of trust.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                <Image src={`${baseUrl}front/assets/images/shoppers-worldwide.jpg`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  />  
                  {/* <i class="far fa-gift"></i> */}
                </div>
                <div className="content">
                  <h4 className="title">Shoppers worldwide</h4>
                  <span>
                    Join 300 million shoppers from over 200 countries and
                    regions.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                <Image src={`${baseUrl}front/assets/images/Buyer-protection.jpg`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  />   
                  {/* <i class="far fa-volume-control-phone"></i> */}
                </div>
                <div className="content">
                  <h4 className="title">Buyer protection</h4>
                  <span>
                    Receive a refund if your items arrive late or do not match
                    the description.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-20 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="single-feature-area">
                <div className="icon">
                <Image src={`${baseUrl}front/assets/images/Value-for-mo.jpg`} 
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width:"auto", height:"auto"}}
                  />  
                </div>
                <div className="content">
                  <h4 className="title">Value-for-money</h4>
                  <span>
                    Enjoy competitive prices on millions of items.
                  </span>
                </div>
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