"use client"
import { useCart } from '@/app/(website)/contaxtData/cartContaxt';
import { userAppContaxt } from '@/app/(website)/contaxtData/userContaxtData';
import { baseUrl, main_thumb_img_path, variant_thumb_img_path1 } from '@/Http/helper'
import { fileBasePath } from '@/Http/urlHelper';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

function page() {

  const { globalUser } = useContext(userAppContaxt);
  const router = useRouter();
  const { user } = useCart()
  const [amountData, setAmountData] = useState(null)
  const [cartProducts, setCartProduct] = useState([])
  const [address, setAddress] = useState({})
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const sessionData = localStorage.getItem('checkoutProducts', null)
    const data = sessionData ? JSON.parse(sessionData) : null; 
    if (!data ) {
      router.push(`${baseUrl}cart`);
    }
    const invalidItem =  data.product.some((item)=>
       (item.variant?.stock ?? 0) <= 0 || item.variant?.stock_status !== "In Stock" 
    );
     
    if(invalidItem){
      router.push(`${baseUrl}cart`);
    }
    setCartProduct(data.product);
    setAmountData(data.amountData);

  }, [])

  useEffect(() => {
    if(!globalUser.user) return
    $('.loaderouter').css('display', 'flex')
    fetch(`${baseUrl}/api/user/get-user-address?user_id=${globalUser.user?._id}`, {
      method: "GET"
    }).then((response) => {
      if (!response.ok) {
        $('.loaderouter').css('display', 'none')
        throw new Error("Network Error")
      }
      return response.json();
    }).then((res) => {
      if (res.status) {
        setAddress({...res.data.address, payment_mode:"Razorpay", same_address:"Yes"})
      }
      $('.loaderouter').css('display', 'none')

    }).catch((error) => {
      $('.loaderouter').css('display', 'none')
      console.log(error);
    })

  }, [globalUser.user])

  function hendleInputData(e) {
    const { name, value, checked } = e.target

    // phone number
    if (name == "phone_number" || name == "b_phone_number") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setAddress((prevData) => ({
        ...prevData,
        [name]: numericValue
      }))
      setErrors((preError) => ({
        ...preError,
        [name]: !numericValue.toString().trim() ? `${name.replace('b_', '').replace('_', ' ')} is required` : ''
      }))
      return
    }


    // checkbox
    if (name == "same_address") {
      setAddress((prevData) => ({
        ...prevData,
        [name]: checked ? "Yes" : "No"
      }))
      return
    }


    // other field
    setAddress((prevData) => ({
      ...prevData,
      [name]: value
    }))
    setErrors((preError) => ({
      ...preError,
      [name]: !value.toString().trim() ? `${name.replace('b_', '').replace('_', ' ')} is required` : ''
    }))
  }


  // place order
  function submitOrderPlaceForm(e){
    e.preventDefault(); 
    $('.loaderouter').css('display', 'flex'); 
    fetch(`${baseUrl}/api/user/order/place-order`,{
      method:"POST",
      body:JSON.stringify({
        addressData:address, 
        product:cartProducts, 
        amount:amountData,
        user_id:globalUser.user?._id
      })
    }).then((response)=>{
      if(!response.ok){
      $('.loaderouter').css('display', 'none');  
        throw new Error("Network Error")
      }
      return response.json();
    }).then((res)=>{
      $('.loaderouter').css('display', 'none'); 
      if(res.status){
        // alert("done");
        paymentSuccess(res.data.tempOrder.temp_order_id)
      }else if(res.data.status_code && res.data.status_code == "400"){
        setErrors(res.data.errors)
      }if(res.data.status_code && res.data.status_code == 204){
         Swal.fire({
          text:res.data.message,
          title:"Error",
          icon:"error",
          confirmButtonText:"OKAY"
         }).then((response)=>{ 

            if(response.isConfirmed){
              router.push(`${baseUrl}cart`)
            } 
            
         })
      }
    }).catch((error)=>{
      $('.loaderouter').css('display', 'none'); 
      console.log(error);
    }) 
  }

// this function for testing
  function paymentSuccess(temp_order_id){
    
    $('.loaderouter').css('display', 'flex'); 
    fetch(`${baseUrl}/api/user/order/payment-success`,{
      method:"POST",
      body:JSON.stringify({
        temp_order_id})
    }).then((response)=>{
      if(!response.ok){
      $('.loaderouter').css('display', 'none');  
        throw new Error("Network Error")
      }
      return response.json();
    }).then((res)=>{
      $('.loaderouter').css('display', 'none'); 
       if(res.status){
        Swal.fire({
          text:res.data.message,
          icon:"success",
          title:"Success",
          confirmButtonText:"Okay"
        }).then((response)=>{
          localStorage.removeItem('cart');
          window.dispatchEvent(new Event("cartUpdated"));
          if(response.isConfirmed){
              router.push(`${baseUrl}user/myorders`)
          }
        })
       }
    }).catch((error)=>{
      $('.loaderouter').css('display', 'none'); 
      console.log(error);
    }) 
  }

  return (
    <>
      {/* rts navigation bar area start */}
      <div className="rts-navigation-area-breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <a href="/">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts navigation bar area end */}
      <div className="section-seperator">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>
      <div className="rts-chop-details-area rts-section-gap">
        <div className="container">
          <div className="shopdetails-style-1-wrapper">
          <form action="#" onSubmit={(e)=>submitOrderPlaceForm(e)}>
            <div className="row g-5">
              <div className="col-xl-8 col-lg-12 col-md-12 col-12 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2">
                <div className="rts-billing-details-area rts-cart-list-area">
                  <h3 className="title animated fadeIn">Shipping Address</h3>
                 
                    <div className="half-input-wrapper">
                      <div className="single-input">
                        <label htmlFor="f-name">
                          First Name <span className="star">*</span>
                        </label>
                        <input type="text" required=""
                          name="first_name"
                          value={address?.first_name || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.first_name && (
                          <div className='error_message'>{errors.first_name}</div>
                        )}
                      </div>
                      <div className="single-input">
                        <label htmlFor="l-name">
                          Last Name <span className="star">*</span>
                        </label>
                        <input type="text"
                          name="last_name"
                          value={address?.last_name || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.last_name && (
                          <div className='error_message'>{errors.last_name}</div>
                        )}
                      </div>
                    </div>
                    <div className="half-input-wrapper">
                      <div className="single-input">
                        <label htmlFor="f-name">
                          Email Address <span className="star">*</span>
                        </label>
                        <input type="email"
                          name="email"
                          value={address?.email || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.email && (
                          <div className='error_message'>{errors.email}</div>
                        )}
                      </div>
                      <div className="single-input">
                        <label htmlFor="l-name">Company Name (Optional)</label>
                        <input type="text"
                          name="company_name"
                          value={address?.company_name || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                      </div>
                    </div>
                    <div className="half-input-wrapper">
                      <div className="single-input">
                        <label htmlFor="f-name">
                          Country <span className="star">*</span>
                        </label>
                        <input type="text"
                          name="country"
                          value={address?.country || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.country && (
                          <div className='error_message'>{errors.country}</div>
                        )}

                      </div>
                      <div className="single-input">
                        <label htmlFor="l-name">
                          Street Address <span className="star">*</span>
                        </label>
                        <input type="text"
                          name="address"
                          value={address?.address || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                      </div>
                    </div>
                    <div className="half-input-wrapper">
                      <div className="single-input">
                        <label htmlFor="f-name">
                          Town / City <span className="star">*</span>
                        </label>
                        <input type="text" required=""
                          name="city"
                          value={address?.city || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.city && (
                          <div className='error_message'>{errors.city}</div>
                        )}
                      </div>
                      <div className="single-input">
                        <label htmlFor="l-name">
                          State<span className="star">*</span>
                        </label>
                        <input type="text"
                          name="state"
                          value={address?.state || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.state && (
                          <div className='error_message'>{errors.state}</div>
                        )}
                      </div>
                    </div>
                    <div className="half-input-wrapper">
                      <div className="single-input">
                        <label htmlFor="f-name">
                          Zip Code <span className="star">*</span>
                        </label>
                        <input type="text" required=""
                          name="zipcode"
                          value={address?.zipcode || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.zipcode && (
                          <div className='error_message'>{errors.zipcode}</div>
                        )}
                      </div>
                      <div className="single-input">
                        <label htmlFor="l-name">
                          Phone <span className="star">*</span>
                        </label>
                        <input type="text"
                          name="phone_number"
                          value={address?.phone_number || ""}
                          onChange={(e) => hendleInputData(e)}
                        />
                        {errors.phone_number && (
                          <div className='error_message'>{errors.phone_number}</div>
                        )}
                      </div>
                    </div>
                    <div className="single-input">
                      <label htmlFor="ordernotes">
                        Order Notes <span className="star"></span>
                      </label>
                      <textarea name="order_note"
                        value={address?.order_note || ""}
                        onChange={(e) => hendleInputData(e)} />
                    </div>
                    <div className="mb-10 mt--20 text2">
                      <input type="checkbox" name='same_address' value="Yes" onChange={(e) => hendleInputData(e)}
                        checked={address && address.same_address == "Yes" ? true : false}
                      /> Same as shipping address
                    </div>
                    { address?.same_address != "Yes" ? (
                      <>
                        <h3 className="title animated fadeIn">Billing address</h3>
                        <div className="half-input-wrapper">
                          <div className="single-input">
                            <label htmlFor="f-name">
                              First Name <span className="star">*</span>
                            </label>
                            <input type="text" required=""
                              name="b_first_name"
                              value={address?.b_first_name || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_first_name && (
                              <div className='error_message'>{errors.b_first_name}</div>
                            )}

                          </div>
                          <div className="single-input">
                            <label htmlFor="l-name">
                              Last Name <span className="star">*</span>
                            </label>
                            <input type="text"
                              name="b_last_name"
                              value={address?.b_last_name || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_last_name && (
                              <div className='error_message'>{errors.b_last_name}</div>
                            )}

                          </div>
                        </div>
                        <div className="half-input-wrapper">
                          <div className="single-input">
                            <label htmlFor="f-name">
                              Email Address <span className="star">*</span>
                            </label>
                            <input type="email"
                              name="b_email"
                              value={address?.b_email || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_email && (
                              <div className='error_message'>{errors.b_email}</div>
                            )}


                          </div>
                          <div className="single-input">
                            <label htmlFor="l-name">Company Name (Optional) </label>
                            <input type="text"
                              name="b_company_name"
                              value={address?.b_company_name || ""}
                              onChange={(e) => hendleInputData(e)}
                            />

                          </div>
                        </div>
                        <div className="half-input-wrapper">
                          <div className="single-input">
                            <label htmlFor="f-name">
                              Country <span className="star">*</span>
                            </label>
                            <input type="text"
                              name="b_country"
                              value={address?.b_country || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_country && (
                              <div className='error_message'>{errors.b_country}</div>
                            )}

                          </div>
                          <div className="single-input">
                            <label htmlFor="l-name">Company Tax Id (Optional)</label>
                            <input type="text"
                              name="company_tax_id"
                              value={address?.company_tax_id || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {/* {errors.company_tax_id && (
                    <div className='error_message'>{errors.company_tax_id}</div>
                  )} */}

                          </div>
                        </div>
                        <div className="half-input-wrapper">
                          <div className="single-input">
                            <label htmlFor="f-name">
                              Town / City <span className="star">*</span>
                            </label>
                            <input type="text" required=""
                              name="b_city"
                              value={address?.b_city || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_city && (
                              <div className='error_message'>{errors.b_city}</div>
                            )}

                          </div>
                          <div className="single-input">
                            <label htmlFor="l-name">
                              State <span className="star">*</span>
                            </label>
                            <input type="text"
                              name="b_state"
                              value={address?.b_state || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_state && (
                              <div className='error_message'>{errors.b_state}</div>
                            )}

                          </div>
                        </div>
                        <div className="half-input-wrapper">
                          <div className="single-input">
                            <label htmlFor="f-name">
                              Zip Code <span className="star">*</span>
                            </label>
                            <input type="text" required=""
                              name="b_zipcode"
                              value={address?.b_zipcode || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_zipcode && (
                              <div className='error_message'>{errors.b_zipcode}</div>
                            )}

                          </div>
                          <div className="single-input">
                            <label htmlFor="l-name">
                              Phone <span className="star">*</span>
                            </label>
                            <input type="text"
                              name="b_phone_number"
                              value={address?.b_phone_number || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_phone_number && (
                              <div className='error_message'>{errors.b_phone_number}</div>
                            )}

                          </div>
                        </div>
                        <div className="half-input-wrapper">
                          <div className="single-input">
                            <label htmlFor="f-name">
                              Street Address <span className="star">*</span>
                            </label>
                            <input type="text"
                              name="b_address"
                              value={address?.b_address || ""}
                              onChange={(e) => hendleInputData(e)}
                            />
                            {errors.b_address && (
                              <div className='error_message'>{errors.b_address}</div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : ""}

                 
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-12 col-md-12
              col-12 order-1 order-xl-2 order-lg-1 order-md-1
              order-sm-1">
                <div className="right-card-sidebar-checkout side">
                  <div className="top-wrapper">
                    <div className="product">Products</div>
                    <div className="price">Price</div>
                  </div>
                  {cartProducts.length > 0 && cartProducts.map((product, index) => (
                    <div className="single-shop-list" key={index}>
                      <div className="left-area">
                        <a href="#" className="thumbnail">
                          {product.variant.withImage == "Yes" ? (
                            <img
                              src={`${fileBasePath}${variant_thumb_img_path1}${product.variant.image_1}`}
                              alt="shop"
                            />
                          ) : (
                            <img
                              src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                              alt="shop"
                            />
                          )}
                          {/* <img src={`${baseUrl}front/assets/images/518faREyvPL._AC_AA180_.jpg`} /> */}
                        </a>
                        <a href="#" className="title">
                          {product.product_name.slice(0, 50)}
                        </a>
                      </div>
                      {user && user.role_consumer_business == "Business" ? (
                        <span className="price"> ${(product.variant.businessSalePrice * product.quantity).toLocaleString()}</span>
                      ) : (
                        <span className="price"> ${(product.variant.consumerSalePrice * product.quantity).toLocaleString()}</span>

                      )}
                    </div>
                  ))}

                  {/*  <div className="single-shop-list">
                      <div className="left-area">
                          <span>Shipping</span>
                      </div>
                      <span className="price">Flat rate: $500.00</span>
                  </div> */}
                  <div className="single-shop-list">
                    <div className="left-area">
                      <span style={{ fontWeight: 600, color: "#212221" }}>
                        Total Price:
                      </span>
                    </div>
                    <span
                      className="price"
                      style={{ color: "#343434", fontWeight: 700 }}
                    >
                      ${amountData?.grand_total.toLocaleString()}
                    </span>
                  </div>
                  <div className="cottom-cart-right-area">
                    <h4>Payment</h4>
                    <p className="disc mb--25">
                      All transactions are secure and encrypted.
                    </p>
                    <ul>
                      <li className="current">
                        <input type="radio" id="a-option" name="payment_mode" 
                        value="Razorpay"
                        checked = {address?.payment_mode == "Razorpay"}
                        onChange={(e) => hendleInputData(e)}/>
                        <label htmlFor="a-option">
                          Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                        </label>
                        <div style={{ margin: "10px 0px 0px 0px", display: 'flex', gap: '2px' }}>
                          <img
                            src="https://j5decor.com/front/images/checkout/upi.svg"
                            alt="i"
                          />
                          <img
                            src="https://j5decor.com/front/images/checkout/visa.svg"
                            alt="i"
                          />
                          <img
                            src="https://j5decor.com/front/images/checkout/mastercard.svg"
                            alt="i"
                          />
                          <img
                            src="https://j5decor.com/front/images/checkout/rupay.svg"
                            alt="i"
                          />
                          <span className="payMoreOptions">16+</span>
                        </div>
                        <div className="check" />
                      </li>
                      <li>
                        <input type="radio" id="b-options" name="payment_mode" 
                        value="Direct Bank Transfer"
                        checked = {address?.payment_mode == "Direct Bank Transfer"}
                        onChange={(e) => hendleInputData(e)} 
                        />

                        <label htmlFor="b-options">Direct Bank Transfer</label>
                        <div className="check" />
                      </li>
                      {/* <li>
                        <input type="radio" id="c-option" name="payment_mode" 
                         value="Direct Bank Transfer"
                         checked = {address?.payment_mode == "Direct Bank Transfer"}
                        onChange={(e) => hendleInputData(e)}
                        
                        />

                        <label htmlFor="c-option">Check Payments</label>
                        <div className="check" />
                      </li> */}
                      <li>
                        <input type="radio" id="d-option" name="payment_mode" 
                        value="Cash On Delivery"
                        checked = {address?.payment_mode == "Cash On Delivery"}
                        onChange={(e) => hendleInputData(e)}
                        
                        />

                        <label htmlFor="d-option">Cash On Delivery</label>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </li>
                      <li>
                        <input type="radio" id="e-option" name="payment_mode"
                         value="Paypal"
                         checked = {address?.payment_mode == "Paypal"}
                        onChange={(e) => hendleInputData(e)} 
                        />

                        <label htmlFor="e-option">Paypal</label>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </li>
                    </ul>
                    {/* <div className="single-category mb--30">
                          <input id="cat14" type="checkbox">
                          <label for="cat14"> I have read and agree terms and conditions *
                          </label>
                      </div> */}
                    <button  type='submit' className="rts-btn btn-primary">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </form>
            <div className="col-lg-10">
              <ul className="apply_exemption">
                <h2>Apply for tax exemption</h2>
                <li>
                  According to the relevant Laws and Regulation in US, we will
                  calculate and collect Sales tax when you place an order
                </li>
                <li>
                  If you are purchasing products for resale or production, submit
                  tax information to be verified for tax exemption.
                </li>
                <div className="mt--20">
                  <a href="#" className="buy_now">
                    Submit now
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default page