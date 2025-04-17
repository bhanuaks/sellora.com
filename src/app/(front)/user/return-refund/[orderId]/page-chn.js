'use client'
import Link from 'next/link'
import React, { use, useContext, useEffect, useLayoutEffect, useState } from 'react'
import Sidebar from '../../userComponents/Sidebar'
import { baseUrl, currencyCode, dateValidateConverter, main_thumb_img_path, variant_thumb_img_path1 } from '@/Http/helper'
import { CartContaxt, useCart } from '@/app/contaxtData/cartContaxt'
import { userAppContaxt } from '@/app/contaxtData/userContaxtData'
import UserSideBarSecction from '../../userSideBarSecction'
import Image from 'next/image'
import { fileBasePath } from '@/Http/urlHelper'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { apiRequest } from '@/Http/apiHelper'



function page({params}) {
  
  const productOrderId = use(params).orderId
  //console.log(productOrderId)
  const router = useRouter();
  const {globalUser} = useContext(userAppContaxt);
  const [user, setUser] = useState(null);
  const [productList, setProductList] = useState([])
  const { addToCartProduct } = useContext(CartContaxt);
  const [proccess, setProccess] = useState(false)
  const [orderHistory, setOrderHistory] = useState({})
  const [formData, setFormData] = useState({
      reason: "",
      comment: "",
      });  
      const [errors, setErrors] = useState({});
      const [message, setMessage] = useState(null);

  useLayoutEffect(()=>{
        
              if(globalUser.user){ 
              
                $('.loaderouter').css('display', 'flex') 
                fetch(`${baseUrl}api/user/user-details?user_id=${globalUser.user._id}`,{
                  method:"GET"
                }).then((response)=>{
        
                  if(!response.ok){
                    $('.loaderouter').css('display', 'none') 
                    throw new Error("Network Error")
                  }
                  return response.json();
                }).then((res)=>{
                  if(res.status){
                    setUser(res.data.user)
                  }
                  $('.loaderouter').css('display', 'none') 
                })
            }
               
            },[globalUser.user])
  
  const fetchData = async () => {
    try {
        //$('.loader-container').css('display', 'flex') 
        $('.loaderouter').css('display', 'flex')
        const url = new URL(`${baseUrl}/api/user/get-order-product`);
        const queryParams = {
          order_product_id:productOrderId,
          
        };
  
        Object.keys(queryParams).forEach((key) => {
          if (queryParams[key]) {
            url.searchParams.append(key, queryParams[key]);
          }
        });    
        
        const response = await fetch(url);
          const result = await response.json();
          //console.log(result)
          if (result.status) {
            //$('.loader-container').css('display', 'none') 
            $('.loaderouter').css('display', 'none')
            setProductList(result.data.orderProduct.products[0]);
            
            setOrderHistory(result.data.orderProduct.orderHistory[0])
             
    
          } 
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          
        }
  }
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
    if (!formData.reason) {
      errors.reason = "Reason field is required.";
    }
    if (!formData.comment) {
      errors.comment = "Comment field is required.";
    }
    return errors;
  }
  
  useEffect(() => {
    //console.log('useriddddd',user)
    if(user?._id){
    fetchData()
    
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrors({})
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if(!confirm("Are youe sure to cancel this order?")){
                return false;
            }
            $('.loaderouter').css('display', 'flex')
            const response = await apiRequest(`${baseUrl}/api/user/order/cancel`,"POST", { order_item_id : productOrderId, reason:formData.reason, comment:formData.comment })
            $('.loaderouter').css('display', 'none')
            if(response.status){
                //mutate(`${baseUrl}api/user/my-order`)
                router.push('/user/myorders');

            }
            
            


  }
  
  
  
  return (
    <div className="details_page_outer">
  {/* rts navigation bar area start */}
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            {" "}
            <a href="index.html">Dashboard</a>{" "}
            <i className="fa-regular fa-chevron-right" />{" "}
            <a className="current" href="#">
              My Orders
            </a>{" "}
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
  <div className="account-tab-area-start rts-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-2">
          <div className="side">
            <div className="user-profile-box active-user d-flex">
              {" "}
              <img
                src="assets/images/ts-1.jpg"
                alt="avatar"
                className="img-fluid profile-img"
              />
              <h2>
                <span>Hello</span>Mary Smith
              </h2>
            </div>
            <div className="nav accout-dashborard-nav flex-column nav-pills">
              <ul>
                {/*  <li class="nav-link"><a href="dashboard.html"><i class="fa-regular fa-chart-line"></i>Dashboard</a></li>
                 */}
                <li className="nav-link sub-menu">
                  {" "}
                  <a href="my-profile.html">
                    <i className="fa-light fa-user" />
                    My Profile
                    <div className="fa right fa-caret-down" />
                  </a>
                  <ul style={{ display: "none" }}>
                    <li>
                      <a href="personal-information.html">
                        Personal Information
                      </a>
                    </li>
                    <li>
                      <a href="company-information.html">Company Information</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-link">
                  <a href="myorders.html">
                    <i className="fa-regular fa-bag-shopping" />
                    My Orders
                  </a>
                </li>
                <li className="nav-link">
                  <a href="wishList.html">
                    <i className="fa-sharp fa-regular fa-heart" /> WishList
                  </a>
                </li>
                <li className="nav-link">
                  <a href="rewards.html">
                    <i className="fa-sharp fa-regular fa-gift" /> Rewards
                  </a>
                </li>
                <li className="nav-link">
                  <a href="my-coupons.html">
                    <i className="fa-regular fa-credit-card-alt" />
                    My Coupons
                  </a>
                </li>
                <li className="nav-link">
                  <a href="my-address.html">
                    <i className="fa-light fa-location-dot" />
                    My Address
                  </a>
                </li>
                <li className="nav-link">
                  {" "}
                  <a href="change-password.html">
                    <i className="fa-light fa-lock" />
                    Change Password
                  </a>{" "}
                </li>
                <li className="nav-link">
                  {" "}
                  <a href="index.html">
                    <i className="fa-light fa-right-from-bracket" />
                    log Out
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
          <div className="dashboard-account-area">
            {/* ==========================new============================== */}
            <div className="customer_details orderList">
              <div className="orderTop">
                <h2 className="hidden-xs">Return/Refund</h2>
              </div>
              <div className="current">
                {/* first-id======open======================= */}
                <div className="">
                  <div className="itemDetails">
                    <div className="itemInfo">
                      <div className="itemImg">
                        {" "}
                        <img src="assets/images/518faREyvPL._AC_AA180_.jpg" />{" "}
                      </div>
                      <div className="itemDesc">
                        <h3 className="animated fadeIn">
                          Delivered <b>08-Nov-2024</b>
                        </h3>
                        <h4>
                          Apple AirPods Max Over-Ear Wireless Headphone Lorem{" "}
                        </h4>
                        <p>
                          Colour: <span>Black</span>
                        </p>
                        <span className="itemPrice2">$360.00</span>
                        {/*  <div class="d-flex">
                    <button class="buy_again mr_10">Buy it again</button>
                    <button class="buy_again mr_10">Add To Cart</button>
                     
                  </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="returns_box">
                  <label>Why are you returning this?</label>
                  <select className="form-select mb-50">
                    <option>Wrong item was sent </option>
                    <option>No longer needed </option>
                    <option>Better price available </option>
                    <option>Color/Pattern not as expected </option>
                    <option>Too large/long </option>
                    <option>Fabric/material not as expected </option>
                    <option>Product and shipping box both damaged </option>
                    <option>Item arrived too late</option>
                    <option>Defective item </option>
                    <option>Poor Condition/Presentation</option>
                    <option>Inaccurate website description</option>
                    <option>Too small/short </option>
                    <option>Style not as expected </option>
                  </select>
                  <label> Comments</label>
                  <textarea defaultValue={""} />
                  <span className="small-size">200 characters remaining</span>
                  <button className="buy_again mr_10">Submit</button>
                </div>
              </div>
              {/* ================delivered============= */}
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default page