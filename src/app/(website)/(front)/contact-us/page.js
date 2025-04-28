'use client'
import { apiRequest } from '@/Http/apiHelper'
import { baseUrl } from '@/Http/helper'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import $ from 'jquery'
import '../../../../../public/front/loader.css'
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import { useRouter } from 'next/navigation'


const page = () => {
  
  const router = useRouter();
  const phoneInputRef = useRef(null);
  const [captcha, setCaptcha] = useState("");
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    mobile:'',
    subject:'',
    feedback:'',
    message:'',
    captcha:'',
    mobile_code:'1',
    country_s_name:'us',

  });  
        const [errors, setErrors] = useState({});
        const [message, setMessage] = useState(null);
  
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };
  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    //onChange(""); // reset input
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const validate = () => {
    const errors = {};

    // Validation checks
    
    return errors;
  }
  
  const handleSubmit = async (e) => {
      e.preventDefault(); 
      setErrors({})
      
      
  
              $('.loaderouter').css('display', 'flex')
              const response = await apiRequest(`${baseUrl}/api/front/contact-us`,"POST", { name:formData.name, email:formData.email, mobile:formData.mobile, subject:formData.subject, feedback:formData.feedback, message:formData.message, captcha:captcha, userCaptcha:formData.captcha, mobile_code:formData.mobile_code, country_s_name:formData.country_s_name })
              $('.loaderouter').css('display', 'none')
              
              //console.log(response)
              
              if(response.status){
                  //mutate(`${baseUrl}api/user/my-order`)
                  //router.push('/user/myorders');
                  toast.success("Contact us form submitted successfully.")
                  setFormData({
                    name:'',
                    email:'',
                    mobile:'',
                    subject:'',
                    feedback:'',
                    message:'',
                    captcha:'',
                    mobile_code:'1',
                    country_s_name:'us'

                  })
                  refreshCaptcha()
  
              } else {
                setErrors(response.data.errors);
                $('.loaderouter').css('display', 'none');
              }
              
              
  
  
    }
  
  useEffect(() => {
          const input = document.querySelector('#mobile_code');
      
          if (input) {
            const iti = intlTelInput(phoneInputRef.current, {
              initialCountry: formData && formData.country_s_name?formData.country_s_name:'us',
              separateDialCode: true,
              // utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js', 
            });
      
           
            const onCountryChange = () => {
              const selectedCountryData = iti.getSelectedCountryData();  
              setFormData((preData)=>({
                  ...preData,
                  mobile_code:selectedCountryData.dialCode,
                  country_s_name:selectedCountryData.iso2,
              }))
            }; 
            phoneInputRef.current.addEventListener('countrychange', onCountryChange);
            
            return () => {
              iti.destroy();  
            };
          }
        }, [setFormData, formData?.country_s_name]);
  
    useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  
  
  
  
  return (
    <>
  <div className="rts-navigation-area-breadcrumb">
    <ToastContainer 
                                  position="top-center"
                                  autoClose={3000} 
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="colored"
                              />

<div className="loaderouter"><div className="loader"></div></div>
    
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
            <form onSubmit={handleSubmit}  className="contact-form-1">
              <div className="contact-form-wrapper--half-area">
                <div className="single">
                  <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && (
                            <>
                            <span className="text-danger">{errors.name}</span>
                            <br></br>
                            </>
                          )}
                </div>
                <div className="single">
                  <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && (
                            <>
                            <span className="text-danger">{errors.email}</span>
                            <br></br>
                            </>
                          )}
                </div>
              </div>
              <div className="contact-form-wrapper--half-area">
                <div className="single">
                  <input type="number" id="mobile_code" ref={phoneInputRef} placeholder="Phone Number" name="mobile" value={formData.mobile} onChange={handleChange} />
                  {errors.mobile && (
                            <>
                            <span className="text-danger">{errors.mobile}</span>
                            <br></br>
                            </>
                          )}
                </div>
                <div className="single">
                  <input type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} />
                  {errors.subject && (
                            <>
                            <span className="text-danger">{errors.subject}</span>
                            <br></br>
                            </>
                          )}
                </div>
              </div>
              <div className="single-select">
                <select className="form-select" name="feedback" value={formData.feedback} onChange={handleChange}>
                  <option value="">Feedback</option>
                  <option value="Good Service">Good Service</option>
                  <option value="Vendor Support">Vendor Support</option>
                  <option value="Timely Delivery">Timely Delivery</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
                {errors.feedback && (
                            <>
                            <br></br><span className="text-danger">{errors.feedback}</span>
                            <br></br>
                            </>
                          )}
              </div>
              <textarea
                name="message"
                placeholder="Write Message Here"
                 
                 value={formData.message} onChange={handleChange} />
                {errors.message && (
                          <>
                          <span className="text-danger">{errors.message}</span>
                          <br></br>
                          </>
                        )}
              <div className="contact-form-wrapper--half-area">
                <div className="single">
                  <input type="text" placeholder="Captcha Code Here" name="captcha" value={formData.captcha} onChange={handleChange} />
                  {errors.captcha && (
                            <>
                            <span className="text-danger">{errors.captcha}</span>
                            <br></br>
                            </>
                          )}
                </div>
                <div className="single">
                  <div className="captcha">{captcha}</div>
                </div>
                <div className="single">
                  <div className="refresh">
                    <Link href="#" onClick={refreshCaptcha}> 
                      <i className="fa fa-refresh" />
                    </Link>
                  </div>
                </div>
              </div>
              <button type="submit" className="rts-btn btn-primary mt--20">
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