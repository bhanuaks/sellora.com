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
    <>
  <div className="details_page_outer">
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

    {/* rts navigation bar area start */}
    <div className="rts-navigation-area-breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="navigator-breadcrumb-wrapper">
              <Link href="/">Dashboard</Link>
              <i className="fa-regular fa-chevron-right" />
              <Link className="current" href="#">
                My Order
              </Link>
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
          <UserSideBarSecction user={user}/>
          
          
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
                {productList.variant_id?.withImage === "Yes" ? (
                                                <Image
                                                src={`${fileBasePath}${variant_thumb_img_path1}${productList.variant_id?.image_1}`}
                                                alt="Variant Image"
                                                width={100}
                                                height={100}
                                                loading="lazy"
                                                />
                                            ) : (
                                                <Image
                                                src={`${fileBasePath}${main_thumb_img_path}${productList.product_id?.main_image}`}
                                                alt="Product Image"
                                                width={100}
                                                height={100}
                                                loading="lazy"
                                                />
                                            )}
              </div>
              <div className="itemDesc">
                {orderHistory?.createdAt &&
                <h3>
                  Delivered <b>{dateValidateConverter(orderHistory.createdAt)}</b>
                </h3>
                }
                <h4>{productList.product_name} </h4>
                
                {productList.variants && (
                                Object.entries(productList.variants).map((item, index) => (
                                    <p key={index}>{item[0]}: <span>{item[1]}</span></p>
                                ))
                            )}                           

                <span className="itemPrice2">{currencyCode(productList.currency)}{productList.price?.toLocaleString()}</span>
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
        <form onSubmit={handleSubmit} encType="multypart/form-data">
          <label>Why are you returning this?</label>
          <select className="form-select mb-50" name="reason" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Wrong item was sent">Wrong item was sent </option>
            <option value="No longer needed">No longer needed </option>
            <option value="Better price available">Better price available </option>
            <option value="Color/Pattern not as expected">Color/Pattern not as expected </option>
            <option value="Too large/long">Too large/long </option>
            <option value="Fabric/material not as expected">Fabric/material not as expected </option>
            <option value="Product and shipping box both damaged">Product and shipping box both damaged </option>
            <option value="Item arrived too late">Item arrived too late</option>
            <option value="Defective item">Defective item </option>
            <option value="Poor Condition/Presentation">Poor Condition/Presentation</option>
            <option value="Inaccurate website description">Inaccurate website description</option>
            <option value="Too small/short">Too small/short </option>
            <option value="Style not as expected">Style not as expected </option>
          </select>
          {errors.reason && (
                            <span className="text-danger">{errors.reason}</span>
                          )}
          <label> Comments</label>
          <textarea maxLength="200" name="comment" value={formData.comment} onChange={handleChange} />
          {errors.comment && (
                            <>
                            <span className="text-danger">{errors.comment}</span>
                            <br></br>
                            </>
                          )}
          
          <span className="small-size">Max 200 characters</span>
          <button type="submit" className="buy_again mr_10">Submit</button>

          </form>
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
  
  
 


</>

  )
}

export default page