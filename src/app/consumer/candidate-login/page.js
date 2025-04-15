'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import { baseUrl } from '@/Http/helper';

const page = () => {

  const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        $(document).ready(()=>{
            $('.loader-container').css('display','none')
        })

        const token = localStorage.getItem('careerToken');
        if (token) {
          setIsAuthenticated(true);
          router.push('/consumer/jobs');
        }
       
    },[]);

    const validateInputs = () => {
        if (!email.trim()) {
            setError({email : 'Email is required.'});
            return false;
        }else {
          // Email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                setError({email : "Invalid email format."});
            }
        }

        if (!password.trim()) {
            setError({password : 'Password is required.'});
            return false;
        }

        if(password.length < 6){
          setError({password : 'Password must be at least 6 characters long.'});
          return false;
        }
        
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!validateInputs()) {
            return; // Stop execution if validation fails
        }

        try {
            $('.loader-container').css('display','flex')
            const response = await axios.post('/api/career/career-login', {
              email,
              password,
            });
            if (response.data.success) {
                // document.cookie = `token=${response.data.token}; path=/`;
                localStorage.setItem("careerToken", response.data.token); 
                setIsAuthenticated(true);
              // router.push('/consumer/jobs');
              window.location.href= `${baseUrl}/consumer/jobs`
            } else {
              console.log(response.data);
                $('.loader-container').css('display','none')
                setError({password : response.data.message});

            }
          } catch (err) {
            setError({password : "Invalid Credentials"});
          }
        };

       
  return (
    <div className="rts-register-area rts-section-gap candidate-login-section">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="discription-content job-apply-heading">
          <h1 className="text-white">Candidate Login</h1>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <div className="registration-wrapper-1 mb--20 mt--10 candidate-login-form">
          <div className="main-register fl-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="mrl_20 mb--20 mt--20 candidate-ml">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="custom-form">
                          <form
                           onSubmit={handleLogin}
                            className="registration-form job-apply-form candidate-login-inner"
                          >
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>Email ID :</label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input type="email" placeholder=""
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  />
                                   {error && error.email != '' && <div style={{ color: 'red' }}>{error.email}</div>}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>Password :</label>
                                </div>
                                <div className="col-lg-9">
                                  <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    defaultValue="password"
                                  />
                                  <i className={`toggle-password fa fa-fw ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} 
                                    onClick={() => setShowPassword(!showPassword)}
                                  />
                                  {/* <input type="password" placeholder=""> */}

                                  {error && error.password != '' && <div style={{ color: 'red' }}>{error.password}</div>}
                                </div>
                                
                              </div>
                              
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label className="mob-none">&nbsp;</label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <button
                                    href="#"
                                    className="rts-btn btn-primary"
                                  >
                                    {" "}
                                    Login
                                  </button>
                                </div>
                              </div>
                              {/* <button className="rts-btn btn-primary jon-apply-btn mt-5">Submit</button> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default page