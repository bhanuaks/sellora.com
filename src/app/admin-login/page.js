
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import '../../../public/sellorloader.css'
import { baseUrl } from '@/Http/helper';
function page() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        $(document).ready(()=>{
            $('.loader-container').css('display','none')
        })
    },[])
    const validateInputs = () => {
        if (!username.trim()) {
            setError('Username is required.');
            return false;
        }
       
        if (!password.trim()) {
            setError('Password is required.');
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
            const response = await axios.post('/admin-login/api/login', {
              username,
              password,
            });
            if (response.data.success) {
                // document.cookie = `token=${response.data.token}; path=/`;
              router.push('/admin/dashboard');
            } else {
                $('.loader-container').css('display','none')
              setError(response.data.message || 'Invalid username or password');
            }
          } catch (err) {
            setError('Something went wrong. Please try again.');
          }
        };


    return (
        <>
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Sellora | Admin Panel</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    {/* App favicon */}
                    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />

                    <link
                        href="/assets-admin/assets/css/bootstrap.min.css"
                        id="bootstrap-style"
                        rel="stylesheet"
                        type="text/css"
                    />
                    {/* Icons Css */}
                    <link href="/assets-admin/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
                    {/* App Css*/}
                    <link
                        href="/assets-admin/assets/css/app.min.css"
                        id="app-style"
                        rel="stylesheet"
                        type="text/css"
                    />
                </head>
                <body>
                    <div className="loader-container">
                                    <div className="loader-wrapper">
                                        <div className="circle"></div> 
                                        <img src={`${baseUrl}loader_logo.png`} alt="Loading..." className="logo-loader" /> 
                                    </div>
                                </div>
                    <div className="auth-page-wrapper pt-5">
                        {/* auth page bg */}
                        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                            <div className="bg-overlay" />
                            <div className="shape">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 1440 120"
                                >
                                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
                                </svg>
                            </div>
                        </div>
                        {/* auth page content */}
                        <div className="auth-page-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="text-center mt-sm-5 mb-4 text-white-50">
                                            <div>
                                                <a href="/admin/dashboard" className="d-inline-block auth-logo">
                                                    <img src="/assets-admin/assets/images/logo.png" alt="" height={60} />
                                                </a>
                                            </div>
                                            <p className="mt-3 fs-15 fw-medium">
                                                Enter your username and password to access admin panel.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* end row */}
                                <div className="row justify-content-center">
                                    <div className="col-md-8 col-lg-6 col-xl-5">
                                        <div className="card mt-4 shadow">
                                            <div className="card-body p-4">
                                                <div className="text-center mt-2">
                                                    <h5 className="welcome">Welcome Back !</h5>
                                                    <p>Sign in to continue to Sellora.</p>
                                                </div>
                                                <div className="p-2 mt-4">
                                                    <form onSubmit={handleLogin}>
                                                        <div className="mb-3">
                                                            <label htmlFor="username" className="form-label">
                                                                Username
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={username}
                                                                onChange={(e) => setUsername(e.target.value)}
                                                                className="form-control"
                                                                placeholder="Enter username"
                                                                
                                                            />
                                                        </div>
                                                        <div className="mb-3">

                                                            <label className="form-label" htmlFor="password-input">
                                                                Password
                                                            </label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <input
                                                                    type="password"
                                                                    id="password"
                                                                    value={password}
                                                                    className="form-control pe-5 password-input"
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    placeholder="Enter password"
                                                                />
                                                            </div>
                                                        </div>
                                                        {error && <div style={{ color: 'red' }}>{error}</div>}
                                                        <div className="mt-4">
                                                            <button className="btn btn-success2 w-100" type="submit">
                                                                Sign In
                                                            </button>
                                                        </div>

                                                        <div className="mt-4 text-center">

                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary btn-icon waves-effect waves-light"
                                                                >
                                                                    {" "}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-icon waves-effect waves-light"
                                                                >
                                                                    {" "}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark btn-icon waves-effect waves-light"
                                                                >
                                                                    {" "}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-info btn-icon waves-effect waves-light"
                                                                >
                                                                    {" "}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            {/* end card body */}
                                        </div>

                                    </div>
                                </div>
                                {/* end row */}
                            </div>
                            {/* end container */}
                        </div>
                        {/* end auth page content */}
                        {/* footer */}
                        <footer className="footer">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="text-center">
                                            <p className="mb-0">© 2024 Sellora | All rights reserved</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        {/* end Footer */}
                    </div>
                </body>
            </html>
        </>

    )
}

export default page;
