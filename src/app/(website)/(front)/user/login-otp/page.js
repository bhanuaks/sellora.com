

"use client"
import { baseUrl } from '@/Http/helper';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
 

function page() {

  const [errors, setErrors] = useState({})
  const route = useRouter();
  const [loginData, setLoginData] = useState({})
  const [otpTime, setOtpTime] = useState(0)
  const [otpMinTime, setOtpMinTime] = useState(5)

  useLayoutEffect(() => {

    const data = localStorage.getItem('loginData')
    if (!data) {
      // Redirect to login if no data is found
      route.push('/user/login');
      return;
    }
    const expirationTime = parseInt(localStorage.getItem('userOtpDataExpiration'), 10);
    const timeLeft = expirationTime - Date.now();

    setLoginData(JSON.parse(data))
    const minutes = Math.floor(timeLeft / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  }, [])

  const decreeseOtpTime = () => {
    if (otpTime > 0 || otpMinTime > 0) {
      // Call setTimeout to decrement OTP time every 1000ms (1 second)
      setTimeout(() => {


        const expirationTime = parseInt(localStorage.getItem('userOtpDataExpiration'), 10);
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

  
  function changeOtp(e){ 
    const {name, value} = e.target; 
    
      setErrors((preError)=>({
          ...preError,
          [name]:!value?`${name} is required`:''
      })) 
  
    const numericValue = value.replace(/[^0-9]/g, '')
    setLoginData((preLoginData)=>({
      ...preLoginData,
      otp:numericValue
    })) 
}



  function submitOtp(e){
    setErrors({});
    const cartData = JSON.parse(localStorage.getItem('cart', '[]'));

    e.preventDefault();
    $('.loaderouter').css('display','flex')
      fetch(`${baseUrl}api/front/user-login/verify-user-login-otp`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({...loginData, cartData})
      }).then((response)=>{ 
        if(!response.ok){
        $('.loaderouter').css('display','none') 
          throw new Error("Network Error")
        }
        return response.json()
      }).then((res)=>{
        // $('.loaderouter').css('display','none')  
        if(res.status){
          toast.success('Success! Login successfully.'); 
          localStorage.removeItem('loginData') 
          localStorage.removeItem('userOtpDataExpiration');
          // update cart item after login
          localStorage.setItem('cart',JSON.stringify(res.cartItem))
          window.dispatchEvent(new Event('cartUpdated'));
          setTimeout(() => {  
            window.location.href=`${baseUrl}user/my-profile`; 
          }, 300);
        }else if(res.data.status_code==403){
          setErrors(res.data.errors)
          $('.loaderouter').css('display','none')
        }
      })
  }


  
    const reSendOtp=(e)=>{ 
      e.preventDefault() 
         
      $('.loaderouter').css('display','flex')  
      fetch(`${baseUrl}api/front/user-login/resend-user-login-otp`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(loginData)
      }).then((response)=>{ 
        if(!response.ok){
        $('.loaderouter').css('display','none')  
          throw new Error("Network Error")
        }
        return response.json()
      }).then((res)=>{
        $('.loaderouter').css('display','none')  
        if(res.status){
          localStorage.setItem('userOtpDataExpiration', res.expirationTime); 
          setOtpTime(0)
          setOtpMinTime(5)
        }
      })
   
    }
  


  return (
    <div className="rts-register-area rts-section-gap login_outer">

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
          <div className="col-lg-4 offset-lg-4">
            <div className="login_logo">
              <img src={`${baseUrl}front/assets/images/logo_login.png`} />
            </div>
            <div className="margin_rl">
              <div className="registration-wrapper-1 mb--20">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="custom-form mt--20 mb--40">
                      <h3 className="log_in_account">2-step verification</h3>
                      <div className="log_in_account_cont">
                        <p>
                          Enter the OTP we sent to “{loginData.email}” {otpMinTime > 0 || otpTime>0 ?`This (OTP)
                      will expire in ${otpMinTime.toString().padStart(2,0)}:${otpTime.toString().padStart(2,'0')}`:(
                        <><br /><Link href="#" onClick={(e)=>reSendOtp(e)}>Resend OTP</Link></>
                      )}
                        </p>
                      </div>
                      {/* checkout.html */}
                      <form action="/user/my-profile" className="registration-form"  onSubmit={(e)=>submitOtp(e)}>
                        <div className="input-wrapper job-input-wrapper">
                          <div className="row align-items-center">
                            <div className="col-lg-12">
                              <div className="lable">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    name="otp"
                                    value={loginData.otp || ""}
                                    maxLength={6}
                                    onChange={(e)=>changeOtp(e)}
                                  />
                              </div>
                              {errors.otp && errors.otp != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.otp}</span>
                              ):''}
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-primary">
                          Continue{/* Request OTP */}
                        </button>
                        <div className="ter_ms">
                          
                          Didn't receive the OTP? <Link href="#" onClick={(e)=>reSendOtp(e)}>Resend</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ter_ms2">
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Contact support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page