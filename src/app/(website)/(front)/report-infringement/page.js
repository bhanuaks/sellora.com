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


function page() {


  const router = useRouter();
  const phoneInputRef = useRef(null);
  const [captcha, setCaptcha] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    ipDescription:'',
    infringementLocation:'',
    goodFaith:'',
    accuracy:'',
    signature:'',
    mobile_code: '1',
    country_s_name: 'us',

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
    const response = await apiRequest(`${baseUrl}/api/front/report-infringment`, "POST", {
      name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        ipDescription: formData.ipDescription,
        infringementLocation: formData.infringementLocation,
        goodFaith: formData.goodFaith,
        accuracy: formData.accuracy,
        signature: formData.signature,
        mobile_code: formData.mobile_code,
        country_s_name: formData.country_s_name
     })
    $('.loaderouter').css('display', 'none')

    //console.log(response)

    if (response.status) {
      //mutate(`${baseUrl}api/user/my-order`)
      //router.push('/user/myorders');
      toast.success("Report infringement form submitted successfully.")
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: '',
        ipDescription: '',
        infringementLocation: '',
        goodFaith: '',
        accuracy: '',
        signature: '',
        mobile_code: '1',
        country_s_name: 'us'

      })
      

    } else {
      setErrors(response.data.errors);
      $('.loaderouter').css('display', 'none');
    }




  }

  useEffect(() => {
    const input = document.querySelector('#mobile_code');

    if (input) {
      const iti = intlTelInput(phoneInputRef.current, {
        initialCountry: formData && formData.country_s_name ? formData.country_s_name : 'us',
        separateDialCode: true,
        // utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js', 
      });


      const onCountryChange = () => {
        const selectedCountryData = iti.getSelectedCountryData();
        setFormData((preData) => ({
          ...preData,
          mobile_code: selectedCountryData.dialCode,
          country_s_name: selectedCountryData.iso2,
        }))
      };
      phoneInputRef.current.addEventListener('countrychange', onCountryChange);

      return () => {
        iti.destroy();
      };
    }
  }, [setFormData, formData?.country_s_name]);





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
                Help
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">
                  Report Infringement
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
            <div className="col-lg-10 offset-lg-1">
              <div className="contact-left-area-main-wrapper shipping infringemnt">
                <h1>Report Intellectual Property Infringement on sellora.com</h1>
                <p>
                  Sellora, LLC is dedicated to protecting the intellectual property
                  rights of individuals and entities. If you believe that content on
                  sellora.com infringes your copyright, trademark, or other
                  intellectual property rights, you can report it using the process
                  outlined below. This guide explains how to submit an infringement
                  notice and provides a form for online submissions.
                </p>
                <h2>Steps to Report Infringement</h2>
                <p>
                  To report infringement, you must submit a formal notice that
                  complies with Sellora’s Intellectual Property Infringement Policy
                  and applicable laws, such as the Digital Millennium Copyright Act
                  (DMCA) for copyright claims. Follow these steps:
                </p>
                <ul>
                  <li>
                    <strong>Gather Required Information</strong>: Your notice must
                    include specific details about the alleged infringement.
                  </li>
                  <li>
                    <strong>Submit the Notice</strong>: Use the online form below,
                    or send your notice via email or mail to Sellora’s designated
                    agent.
                  </li>
                  <li>
                    <strong>Await Response</strong>: Sellora will review your notice
                    and may remove or disable access to the allegedly infringing
                    content while investigating.
                  </li>
                </ul>
                <h2>Required Information for Infringement Notices</h2>
                <p>Your infringement notice must include the following:</p>
                <ul>
                  <li>
                    <strong>Identification of the Intellectual Property</strong>:
                    Describe the copyrighted work, trademark, or other intellectual
                    property you claim is infringed, including registration numbers
                    (if applicable) or evidence of ownership.
                  </li>
                  <li>
                    <strong>Location of the Infringing Material</strong>: Provide
                    specific details, such as URLs, product listing IDs, or
                    screenshots, showing where the content appears on sellora.com.
                  </li>
                  <li>
                    <strong>Your Contact Information</strong>: Include your full
                    name, mailing address, telephone number, and email address.
                  </li>
                  <li>
                    <strong>Statement of Good Faith</strong>: State that you have a
                    good faith belief that the use of the material is not authorized
                    by the intellectual property owner, its agent, or the law.
                  </li>
                  <li>
                    <strong>Statement of Accuracy</strong>: Confirm, under penalty
                    of perjury, that the information in your notice is accurate and
                    that you are the owner or authorized to act on their behalf.
                  </li>
                  <li>
                    <strong>Signature</strong>: Provide a physical or electronic
                    signature.
                  </li>
                </ul>
                <h2>Submission Methods</h2>
                <p>
                  You can submit your infringement notice in one of the following
                  ways:
                </p>
                <ul>
                  <li>
                    <strong>Online Form</strong>: Use the form below for a
                    convenient way to submit your claim directly to Sellora.
                  </li>
                  <li>
                    <strong>Email</strong>: Send your notice to{" "}
                    <a href="mailto:ip@sellora.com">ip@sellora.com</a> with the
                    subject line “Intellectual Property Infringement Notice.” Do not
                    include sensitive personal or financial information in emails,
                    as they are not necessarily secure.
                  </li>
                  <li>
                    <strong>Mail</strong>: Send your notice to:
                    <br />
                    Sellora, LLC
                    <br />
                    Attn: Intellectual Property Department
                    <br />
                    1703 Evans Rd., Apt# 14211
                    <br />
                    San Antonio, Texas 78258{" "}
                  </li>
                </ul>
                <h2>What Happens Next?</h2>
                <p>Upon receiving a valid notice, Sellora will:</p>
                <ul>
                  <li>
                    Review the notice for compliance with our policy and applicable
                    laws.
                  </li>
                  <li>
                    Potentially remove or disable access to the allegedly infringing
                    content.
                  </li>
                  <li>
                    Notify the seller or user responsible for the content, allowing
                    them to respond or submit a counter-notice.
                  </li>
                  <li>
                    Conduct an investigation, which may involve requesting
                    additional documentation.
                  </li>
                </ul>
                <p>
                  If your notice is incomplete or lacks merit, Sellora may request
                  clarification or take no action. For more details, see our{" "}
                  <a href="https://sellora.com/ip-policy">
                    Intellectual Property Infringement Policy
                  </a>
                  .
                </p>
                <h2>Infringement Reporting Form</h2>
                <div className="form-section">
                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    encType="text/plain"
                  >
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      required=""
                      placeholder="Enter your full name"
                      name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && (
                      <>
                        <span className="text-danger">{errors.name}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required=""
                      placeholder="Enter your email address"
                      value={formData.email} onChange={handleChange} />
                    {errors.email && (
                      <>
                        <span className="text-danger">{errors.email}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="mobile_code">Telephone Number *</label>
                    <input
                      type="tel"
                      id="mobile_code"
                      ref={phoneInputRef}
                      name="mobile"
                      required=""
                      placeholder="Enter your phone number"
                      value={formData.mobile} onChange={handleChange} />
                    {errors.mobile && (
                      <>
                        <span className="text-danger">{errors.mobile}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="address">Mailing Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      required=""
                      placeholder="Enter your full mailing address"
                      defaultValue={""}
                      value={formData.address} onChange={handleChange} />
                    {errors.address && (
                      <>
                        <span className="text-danger">{errors.address}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="ipDescription">
                      Description of Intellectual Property *
                    </label>
                    <textarea
                      id="ipDescription"
                      name="ipDescription"
                      required=""
                      placeholder="Describe the copyrighted work, trademark, or other intellectual property (include registration numbers if applicable)"
                      defaultValue={""}
                      value={formData.ipDescription} onChange={handleChange} />
                    {errors.ipDescription && (
                      <>
                        <span className="text-danger">{errors.ipDescription}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="infringementLocation">
                      Location of Infringing Material *
                    </label>
                    <textarea
                      id="infringementLocation"
                      name="infringementLocation"
                      required=""
                      placeholder="Provide URLs, product listing IDs, or screenshots showing where the content appears on sellora.com"
                      defaultValue={""}
                      value={formData.infringementLocation} onChange={handleChange} />
                    {errors.infringementLocation && (
                      <>
                        <span className="text-danger">{errors.infringementLocation}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="goodFaith">Good Faith Statement *</label>
                    <textarea
                      id="goodFaith"
                      name="goodFaith"
                      required=""
                      placeholder="I have a good faith belief that the use of the material is not authorized by the intellectual property owner, its agent, or the law."
                      defaultValue={""}
                      value={formData.goodFaith} onChange={handleChange} />
                    {errors.goodFaith && (
                      <>
                        <span className="text-danger">{errors.goodFaith}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="accuracy">Accuracy Statement *</label>
                    <textarea
                      id="accuracy"
                      name="accuracy"
                      required=""
                      placeholder="Under penalty of perjury, I confirm that the information in this notice is accurate and that I am the intellectual property owner or authorized to act on their behalf."
                      defaultValue={""}
                      value={formData.accuracy} onChange={handleChange} />
                    {errors.accuracy && (
                      <>
                        <span className="text-danger">{errors.accuracy}</span>
                        <br></br>
                      </>
                    )}
                    <label htmlFor="signature">Electronic Signature *</label>
                    <input
                      type="text"
                      id="signature"
                      name="signature"
                      required=""
                      placeholder="Type your full name as an electronic signature"
                      value={formData.signature} onChange={handleChange} />
                    {errors.signature && (
                      <>
                        <span className="text-danger">{errors.signature}</span>
                        <br></br>
                      </>
                    )}
                    <button type="submit">Submit Infringement Notice</button>
                  </form>
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