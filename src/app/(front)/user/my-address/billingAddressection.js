import { baseUrl } from '@/Http/helper';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const BillingAddressection = ({ user, address, editAddress, setEditAddress, setUpdateAddress, setAddress }) => {
    
        const [errors, setErrors] = useState({});
        function saveAddressData(e) {
            setErrors({})
          e.preventDefault(); 
          $('.loaderouter').css('display','flex')
          fetch(`${baseUrl}api/user/edit/update-address?address_type=${editAddress}`, {
            method:"POST",
            body:JSON.stringify({
              ...address,
              user_id:user?user._id:""
            })
          }).then((response)=>{
            if(!response.ok){
                $('.loaderouter').css('display','none')
              throw new Error("Network Error")
            }
            return response.json();
          }).then((res)=>{ 
            $('.loaderouter').css('display','none')
              if(res.status){
                toast.success(`Success! ${res.data.message}`)
                setAddress(address)
                setEditAddress(null)
              }else if(res.data.status_code && res.data.status_code == 400){
                setErrors(res.data.errors)
              }
          }).catch((error)=>{
            console.log(error);
          })
      
         
        }
      
        function hendleInputData(e){
          const {name, value} = e.target
          setUpdateAddress((prevData)=>({
            ...prevData,
            [name]:value
          }))
         setErrors((preError)=>({
            ...preError,
            [name]:!value.toString().trim()?`${name.replace('_', ' ')} is required`:''
         }))
          
          
        }
      
      
        return (
          <div className="rts-billing-details-area ">
            

            <h3 className="title animated fadeIn">{editAddress} Address</h3>
            <form action="#" style={{ width: '80%' }} onSubmit={(e) => saveAddressData(e)}>
              <div className="half-input-wrapper">
                <div className="single-input">
                  <label htmlFor="f-name">
                    First Name <span className="star">*</span>
                  </label>
                  <input type="text" required="" 
                  name="b_first_name"
                  value={address && address.b_first_name}
                  onChange={(e)=>hendleInputData(e)}
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
                   value={address && address.b_last_name}
                   onChange={(e)=>hendleInputData(e)}
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
                   value={address && address.b_email}
                   onChange={(e)=>hendleInputData(e)}
                   />
                   {errors.b_email && (
                    <div className='error_message'>{errors.b_email}</div>
                  )}
                </div>
                <div className="single-input">
                  <label htmlFor="l-name">Company Name (Optional)</label>
                  <input type="text" 
                   name="b_company_name"
                   value={address && address.b_company_name}
                   onChange={(e)=>hendleInputData(e)}
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
                   value={address && address.b_country}
                   onChange={(e)=>hendleInputData(e)}
                   />
                   {errors.b_country && (
                    <div className='error_message'>{errors.b_country}</div>
                  )}
                </div>
                <div className="single-input">
                  <label htmlFor="l-name">
                    Street Address <span className="star">*</span>
                  </label>
                  <input type="text" 
                   name="b_address"
                   value={address && address.b_address}
                   onChange={(e)=>hendleInputData(e)}
                   />
                    {errors.b_address && (
                    <div className='error_message'>{errors.b_address}</div>
                  )}
                </div>
              </div>
              <div className="half-input-wrapper">
                <div className="single-input">
                  <label htmlFor="f-name">
                    Town / City <span className="star">*</span>
                  </label>
                  <input type="text" required="" 
                   name="b_city"
                   value={address && address.b_city}
                   onChange={(e)=>hendleInputData(e)}
                   />
                   {errors.b_city && (
                    <div className='error_message'>{errors.b_city}</div>
                  )}
                </div>
                <div className="single-input">
                  <label htmlFor="l-name">
                    State<span className="star">*</span>
                  </label>
                  <input type="text" 
                   name="b_state"
                   value={address && address.b_state}
                   onChange={(e)=>hendleInputData(e)}
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
                   value={address && address.b_zipcode}
                   onChange={(e)=>hendleInputData(e)}
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
                   value={address && address.b_phone_number}
                   onChange={(e)=>hendleInputData(e)}
                   />
                   {errors.b_phone_number && (
                    <div className='error_message'>{errors.b_phone_number}</div>
                  )}
                </div>
              </div>
      
      
            <div className='button_container'  > 
                    <button className="rts-btn btn-primary ml-5" type="submit">Update</button>
                    <button className="rts-btn btn-danger ml-5" type="button" onClick={()=>setEditAddress(null)}>Cancel</button>
            </div>
            </form>
          </div>
      
        )
}

export default BillingAddressection