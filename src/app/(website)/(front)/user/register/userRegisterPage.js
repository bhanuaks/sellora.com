"use client"
import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import $ from 'jquery'
 
import { ToastContainer, toast } from 'react-toastify';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import { useRouter } from 'next/navigation'



const UserRegisterPage = () => {

    const router = useRouter();
    const phoneInputRef = useRef(null);   
    const [sendOtp, setSendOtp] = useState(0)
    const [errors, setErrors] = useState({})
    const [otpTime, setOtpTime] = useState(0)
    const [otpMinTime, setOtpMinTime] = useState(5)

    const [userData, setUserData] = useState({
        full_name:'',
        country : '',
        role_buyer_seller : 'Buyer',
        role_consumer_business : 'Consumer',
        tax_id : '',
        email : '',
        password : '',
        confirm_password : '',
        company_name : '',
        address : '',
        mobile_code:'1',
        mobile_s_name:'us',
        otp:'',
        term_n_condition:'' , 
    })

    
       useEffect(() => {
              const input = document.querySelector('#mobile_code');
          
              if (input) {
                const iti = intlTelInput(phoneInputRef.current, {
                  initialCountry: userData && userData.country_s_name?userData.country_s_name:'us',
                  separateDialCode: true,
                  // utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js', 
                });
          
               
                const onCountryChange = () => {
                  const selectedCountryData = iti.getSelectedCountryData();  
                  setUserData((preData)=>({
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
            }, [setUserData, userData?.country_s_name]);

            
                      const decreeseOtpTime = () => {
                        if (otpTime > 0  || otpMinTime > 0) {
                         
                          setTimeout(() => { 
                            const expirationTime = parseInt(localStorage.getItem('userRegisterOtpDataExpiration'), 10);
                            const timeLeft = expirationTime - Date.now();  
                             const minutes = Math.floor(timeLeft / (1000 * 60)); 
                             const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); 
                             console.log(minutes, seconds);
                             setOtpMinTime(minutes)
                             setOtpTime(seconds)
                           
                          }, 1000);
                        }
                      };
                    
        useEffect(() => {
            if (otpTime > 0 || otpMinTime > 0) {
                decreeseOtpTime();  
            }
        }, [otpTime, otpMinTime]);

    function hendleInputs(e){
        const {name, value, checked } = e.target
        if(name == "term_n_condition"){
            
            setUserData((prevData)=>({
                ...prevData,
                [name]:checked?"accept":''
            }))
            return
        }

        if(name == "mobile" || name == "otp"){
             const numericValue = value.replace(/[^0-9]/g, '')
            setUserData((prevData)=>({
                ...prevData,
                [name]:numericValue
            }))
            setErrors((preError)=>({
                ...preError,
                [name]:!numericValue?`${name.replace('_', ' ')} is required`:''
            }))
            return
        }
        setUserData((prevData)=>({
            ...prevData,
            [name]:value
        }))

        if(name != "tax_id"){
            setErrors((preError)=>({
                ...preError,
                [name]:!value?`${name.replace('_', ' ')} is required`:''
            }))
        }
        
        
            

    }


    function saveUserDetails(e){

        setErrors({})
        const cartData = JSON.parse(localStorage.getItem('cart', '[]'));
        e.preventDefault();
        $('.loaderouter').css('display','flex')  
        fetch(`${baseUrl}api/front/${sendOtp!=0?"user-register":"send-register-otp"}`,{
            method:"POST",
            body:JSON.stringify({...userData, cartData})
        }).then((response)=>{
            if(!response.ok){
                $('.loaderouter').css('display','none') 

                throw new Error("Network Error")
            }
            return response.json()
        }).then((res)=>{
            if(res.status){
                if(sendOtp==0){
                    console.log(sendOtp);
                    localStorage.setItem('userRegisterOtpDataExpiration', res.expirationTime); 
                    setOtpTime(59)
                    setOtpMinTime(4)
                    setSendOtp(sendOtp+1)
                }else{ 
                  localStorage.setItem('cart',JSON.stringify(res.cartItem))
                  window.dispatchEvent(new Event('cartUpdated')); 
                  window.location.href=`${baseUrl}user/my-profile`; 
                    // router.push(`${baseUrl}user/my-profile`)
                }
            }else if(res.data.status_code && res.data.status_code == 400){
                setErrors(res.data.errors) 
                const inputElement = document.querySelector(`input[name="${Object.keys(res.data.errors)[0]}"]`);
                const selectElement = document.querySelector(`select[name="${Object.keys(res.data.errors)[0]}"]`);
                if (inputElement) {
                    inputElement.focus();
                }
                 if (selectElement) {
                    selectElement.focus();

                }
                
            }
            $('.loaderouter').css('display','none') 
            
        }).catch((err)=>{
            console.log(err);
        })


    }

    function reSendOtp(e){ 

        e.preventDefault();
        $('.loaderouter').css('display','flex')
        fetch(`${baseUrl}api/front/send-register-otp`,{
            method:"POST",
            body:JSON.stringify(userData)
        }).then((response)=>{
            if(!response.ok){
                $('.loaderouter').css('display','none') 
                throw new Error("Network Error")
            }
            return response.json()
        }).then((res)=>{
            $('.loaderouter').css('display','none') 

            if(res.status){ 
                    localStorage.setItem('userRegisterOtpDataExpiration', res.expirationTime); 
                    setOtpTime(59)
                    setOtpMinTime(4)
                    setSendOtp(sendOtp+1)
              
            }else if(res.data.status_code && res.data.status_code == 400){
                setErrors(res.data.errors)
                
                const inputElement = document.querySelector(`input[name="${Object.keys(res.data.errors)[0]}"]`);
                const selectElement = document.querySelector(`select[name="${Object.keys(res.data.errors)[0]}"]`);
                if (inputElement) {
                    inputElement.focus();
                }
                 if (selectElement) {
                    selectElement.focus();

                }
                
            } 
        }).catch((err)=>{
            console.log(err);
        })
    }



  return (
    <div className="rts-register-area rts-section-gap">

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
                {/* loader start */} 
                <div className="loaderouter"><div className="loader"></div></div> 
                {/* loader end */}




      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="registration-wrapper-1 mb--20 mt--10">
              <div className="main-register fl-wrap">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="">
                      <div className="row">
                        <div className="col-lg-12">
                          <h3>Register</h3>
                        </div>
                        <div className="col-lg-12">
                          <div className="custom-form">
                            <form action="#" className="registration-form" onSubmit={(e)=>saveUserDetails(e)}>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    <label>
                                      Full Name <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" placeholder="Enter Full Name" 
                                    name='full_name'
                                    value={userData.full_name}
                                    onChange={(e)=>hendleInputs(e)}
                                    />
                                    {errors.full_name && ( 
                                        <div className='error_message'>{errors.full_name}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    <label>
                                      Country / Region
                                      <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    <select name='country'
                                    value={userData.country}
                                    onChange={(e)=>hendleInputs(e)}>

                                      <option value="">select</option>
                                      <option>United States of America</option>
                                      <option>Tuvalu</option>
                                      <option>Uganda</option>
                                      <option>Ukraine</option>
                                    </select>
                                    {errors.country && ( 
                                        <div className='error_message'>{errors.country}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="input-wrapper"
                                style={{ marginBottom: 10 }}
                              >
                                <div className="row">
                                  <div className="col-lg-4">
                                    <label htmlFor="email">
                                      Please select trade role
                                      <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    <div className="row">
                                      <div className="col-lg-3">
                                        <div className="radio_button">
                                          <label>
                                            <input
                                              type="radio"
                                              className="input-radio"
                                              value="Buyer" 
                                              name='role_buyer_seller' 
                                              onChange={(e)=>hendleInputs(e)}
                                              checked= {userData.role_buyer_seller == "Buyer" ?true:false}
                                            />
                                            Buyer
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-lg-9">
                                        <div className="buyer_outer">
                                          ( Buyer Type:
                                          <label>
                                            <span className="buyer-type2">
                                              <input
                                                type="radio"
                                                className="input-radio"
                                                checked= {userData.role_consumer_business == "Consumer" ?true:false}
                                                value="Consumer" 
                                                name='role_consumer_business' 
                                                onChange={(e)=>hendleInputs(e)} 
                                              />
                                              Consumer
                                            </span>
                                          </label>
                                          <label>
                                            <span className="buyer-type2">
                                              
                                              <input
                                                type="radio"
                                                className="input-radio"
                                                checked= {userData.role_consumer_business == "Business" ?true:false}
                                                value="Business" 
                                                name='role_consumer_business' 
                                                onChange={(e)=>hendleInputs(e)} 
                                              />
                                              Business
                                            </span>
                                          </label>
                                          )
                                        </div>
                                      </div>
                                    </div>
                                    <div className="radio_button">
                                      <label className="d-block">
                                        <input
                                          type="radio"
                                          className="input-radio"
                                          value="Seller" 
                                              name='role_buyer_seller' 
                                              onChange={(e)=>hendleInputs(e)}
                                              checked= {userData.role_buyer_seller == "Seller" ?true:false}
                                        />
                                        Seller
                                      </label>
                                    </div>
                                    <div className="radio_button">
                                      <label className="d-block">
                                        <input
                                          type="radio"
                                          className="input-radio"
                                          value="Both" 
                                          name='role_buyer_seller' 
                                          onChange={(e)=>hendleInputs(e)}
                                          checked= {userData.role_buyer_seller == "Both" ?true:false}
                                        />
                                        Both
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    
                                    <label>Tax ID (Optional) </label>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" placeholder="Enter GSTIN" 
                                    name='tax_id'
                                    value={userData.tax_id}
                                    onChange={(e)=>hendleInputs(e)}
                                    />
                                    {errors.tax_id && ( 
                                        <div className='error_message'>{errors.tax_id}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4"> 
                                    <label>
                                      Email <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8"> 
                                    <input type="email" placeholder="Enter email" 
                                     name='email'
                                     value={userData.email}
                                     onChange={(e)=>hendleInputs(e)}
                                     />
                                     {errors.email && ( 
                                        <div className='error_message'>{errors.email}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    <label>
                                      Login Password <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8"> 
                                    <input
                                      type="password"
                                      placeholder="Set login password"
                                      name='password'
                                      value={userData.password}
                                      onChange={(e)=>hendleInputs(e)}
                                    />
                                    {errors.password && ( 
                                        <div className='error_message'>{errors.password}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    <label>
                                      Confirm Password
                                      <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    <input
                                      type="password"
                                      placeholder="Enter the login password again"
                                      name='confirm_password'
                                      value={userData.confirm_password}
                                      onChange={(e)=>hendleInputs(e)}
                                    />
                                    {errors.confirm_password && ( 
                                        <div className='error_message'>{errors.confirm_password}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    
                                    <label>
                                      Company Name <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    
                                    <input
                                      type="text"
                                      placeholder="Enter company Name"
                                      name='company_name'
                                      value={userData.company_name}
                                      onChange={(e)=>hendleInputs(e)}
                                    />
                                    {errors.company_name && ( 
                                        <div className='error_message'>{errors.company_name}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    
                                    <label>
                                      Address <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    
                                    <input
                                      type="text"
                                      placeholder="Enter company Address"
                                      name='address'
                                      value={userData.address}
                                      onChange={(e)=>hendleInputs(e)}
                                    />
                                    {errors.address && ( 
                                        <div className='error_message'>{errors.address}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    
                                    <label>
                                      Tel <span className="star">*</span>
                                    </label>
                                  </div>
                                  <div className="col-lg-8">
                                    
                                    <input
                                      type="text"
                                      id="mobile_code"
                                      placeholder="Tel"
                                      name='mobile'
                                      value={userData.mobile}
                                      onChange={(e)=>hendleInputs(e)}
                                      disabled={sendOtp != 0?true:false}
                                      ref={phoneInputRef}
                                    />
                                    {errors.mobile && ( 
                                        <div className='error_message'>{errors.mobile}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {sendOtp>0 && (
                              <div className="input-wrapper">
                                <div className="row">
                                  <div className="col-lg-4">
                                    
                                    <label>Verify </label>
                                  </div>
                                  <div className="col-lg-8">
                                    
                                    <input type="text" placeholder="Enter OTP"
                                        name='otp'
                                        value={userData.otp}
                                        onChange={(e)=>hendleInputs(e)}
                                     />
                                      
                                     {errors.otp && ( 
                                        <div className='error_message'>{errors.otp}</div>
                                    )}
                                    
                                    
                                    {sendOtp>0 && (
                                        <>
                                        {(otpMinTime > 0 || otpTime>0 )?`OTP Expire in ${otpMinTime.toString().padStart(2,0)}:${otpTime.toString().padStart(2,'0')}`:(
                                        <><br /><Link href="#" onClick={(e)=>reSendOtp(e)}>Resend OTP</Link></>
                                    )}
                                        </>
                                    )}
                                    

                                  </div>
                                </div>
                              </div>
                              )}
                              <div className="ter_ms pt--30">
                               
                                <input type="checkbox" 
                                    name="term_n_condition" 
                                    value="accept"
                                    onChange={(e)=>hendleInputs(e)}
                                    checked={userData.term_n_condition == "accept"?true:false}
                                />  I agree to (a)
                                &nbsp;<Link href="#">Free Membership Agreement</Link>, (b)
                                &nbsp;<Link href="#">Terms of Use</Link>, and (c)
                                &nbsp;<Link href="#">Privacy Policy</Link>. I agree to receive
                                more information from sellora.com about its products
                                and services.

                                {errors.term_n_condition && ( 
                                    <div className='error_message'>{errors.term_n_condition}</div>
                                )} 

                              </div>
                              <button className="rts-btn btn-primary" type='submit'>
                                Register
                              </button>
                              {/* <div className="ter_ms">
                                By continuing, you agree to Sellora <Link href="#">Conditions of Use</Link> and <Link href="#">Privacy Notice</Link>.
                              </div>
                              */}
                              <div className="another-way-to-registration">
                                <div className="registradion-top-text">
                                  
                                  <span>Or</span>
                                </div>
                                <div className="login-with-brand">
                                  <Link href="#" className="single">
                                    
                                    <img
                                      src={`${baseUrl}front/assets/images/form/google.svg`}
                                      alt="login"
                                    />
                                  </Link>
                                  <Link href="#" className="single faceboomk_button"> 
                                    <i className="fa-brands fa-facebook-f" />
                                    Facebook
                                  </Link>
                                </div>
                                <div className="new_customer">
                                  Already have an account?
                                  <Link href="/user/login">Sign in</Link>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*   <h3 className="title animated fadeIn">Login Into Your Account</h3>
                  <form action="#" className="registration-form">
                      <div className="input-wrapper">
                          <label for="email">Email*</label>
                          <input type="email" id="email">
                      </div>
                      <div className="input-wrapper">
                          <label for="password">Password*</label>
                          <input type="password" id="password">
                      </div>
                      <button className="rts-btn btn-primary">Login Account</button>
                      <div className="another-way-to-registration">
                          <div className="registradion-top-text">
                              <span>Or Register With</span>
                          </div>
                          <div className="login-with-brand">
                              <Link href="#" className="single">
                                  <img src={`${baseUrl}front/assets/images/form/google.svg`} alt="login">
                              </Link>
                              <Link href="#" className="single">
                                  <img src={`${baseUrl}front/assets/images/form/facebook.svg`} alt="login">
                              </Link>
                          </div>
                          <p>Already Have Account? <Link href="#">Login</Link></p>
                      </div>
                  </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegisterPage