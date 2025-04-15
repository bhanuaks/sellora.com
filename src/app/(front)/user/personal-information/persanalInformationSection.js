import React, { useEffect, useRef, useState } from 'react'

import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import { baseUrl } from '@/Http/helper';
import '../../../../../public/front/error.css'
import { set } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';



const PersanalInformationSection = ({user, setUser}) => {

    const [userData, setUserData] = useState({}) 
    const [errors, setErrors] = useState({}) 
    const phoneInputRef = useRef(null); 
    const [edit, setEdit] = useState(false)
    useEffect(()=>{
        setUserData(user)
    },[user])


    function hendleInputData(e){

        const {name, value} = e.target 
        setUserData((preData)=>({
            ...preData,
            [name]:value
        })) 

        if(name != "tax_id" && name != "website"){
          setErrors((preError)=>({
            ...preError,
            [name]:!value.toString().trim()?`${name.replace('_', ' ')} is required`:''
          }))
        }
    }

     useEffect(() => {
                  const input = document.querySelector('#mobile_code');
              
                  if (input) {
                    const iti = intlTelInput(phoneInputRef.current, {
                      initialCountry: userData && userData.country_s_name?userData.country_s_name:'in',
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
                }, [setUserData]);

    function submitPersnalData(e){
        e.preventDefault()
        setErrors({})
        $('.loaderouter').css('display','flex')
        fetch(`${baseUrl}api/user/edit/edit-persnal-details`,{
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
                toast.success(`Success! ${res.data.message}`)
                setEdit(false)
                setUser(userData)
            }else if(res.data.status_code && res.data.status_code == 400){
                setErrors(res.data.errors)
                const firstErrorKey= Object.keys(res.data.errors)[0]
                $(`input[name="${firstErrorKey}"]`).focus();
            }
        })
    }
    
  return (
    <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
        
        
        <ToastContainer 
                      position="top-center"
                      autoClose={3000} // Toast disappears after 3 seconds
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                  />
  <div className="dashboard-account-area">
    <h2 className="title text-center">My Profile</h2>
    <h3 className="title animated fadeIn">Personal Information</h3>
    <span className="edit2">
      <a href="#" onClick={(e)=>{e.preventDefault(); setEdit(!edit);  setErrors({})}} >
        {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
        {!edit?"Edit":'Cancel'}
      </a>
    </span>
    <div className="profile-info">
        <form action={'#'} onSubmit={(e)=>submitPersnalData(e)} >

         
      <div className="row registration-form">
        <div className="col-lg-5">
          <div className=" ">
            <div className="row">
              <div className="col-lg-10 col-5">
                <div className="input-wrapper">
                  <label>Full Name{/* <span className="star">*</span> */}</label>
                  <input
                    type="text"
                    placeholder="Mary"
                    name='full_name'
                    value={userData?.full_name || ''}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                  />
                  {errors.full_name && errors.full_name != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.full_name}</span>
                              ):''}
                                   
                </div>
              </div>
              {/* <div className="col-lg-5 col-5">
                <div className="input-wrapper">
                  <label>Last Name </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    defaultValue="Smith"
                    readOnly=""
                  />
                </div>
              </div> */}
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="">Edit</a></div> */}
              </div>
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-12">
                <div className="input-wrapper">
                  <label htmlFor="email" className="name_field">
                    Your Gender
                  </label>
                  <div className="radio_button">
                    <label>
                      <input
                        type="radio"
                        className="input-radio" 
                        name="gender" 
                        value={"Male"}
                        checked={userData && userData.gender == "Male"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        name="gender" 
                        value={"Female"}
                        checked={userData && userData.gender == "Female"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Female
                    </label>
                  </div>
                  {errors.gender && errors.gender != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.gender}</span>
                              ):''}
                                  
                </div>
              </div>
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label className="name_field">Email Address</label>
                  <input
                    type="text"
                    placeholder="example123@gmail.com"
                    name='email'
                    value={userData?.email || ''}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                  />
                  {errors.email && errors.email != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.email}</span>
                              ):''}
                </div>
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label className="name_field">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="8083579935"
                    id='mobile_code'
                    ref={phoneInputRef}
                    name='mobile'
                    value={userData?.mobile || ''}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                  />
                   {errors.mobile && errors.mobile != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.mobile}</span>
                              ):''}
                </div>
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                <div className="input-wrapper">
                  <label htmlFor="email" className="name_field">
                    Trade Role
                  </label>
                  <div className="radio_button">
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        value={"Buyer"}
                        name="role_buyer_seller" 
                        checked={userData && userData.role_buyer_seller == "Buyer"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Buyer
                    </label>
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        value={"Seller"}
                        name="role_buyer_seller" 
                        checked={userData && userData.role_buyer_seller == "Seller"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Seller
                    </label>
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        value={"Both"}
                        name="role_buyer_seller" 
                        checked={userData && userData.role_buyer_seller == "Both"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Both
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mt--20">
                <div className="input-wrapper">
                  <label htmlFor="email" className="name_field">
                    Buyer Type
                  </label>
                  <div className="radio_button">
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        value={"Business"}
                        name="role_consumer_business" 
                        checked={userData && userData.role_consumer_business == "Business"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Business
                    </label>
                    <label>
                      <input
                        type="radio"
                        value={"Consumer"}
                        name="role_consumer_business" 
                        checked={userData && userData.role_consumer_business == "Consumer"?true:false}
                        onClick={(e)=>hendleInputData(e)}
                        disabled={!edit}
                      />
                      Consumer
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt--20">
              <div className="row">
                <div className="col-lg-10 col-10">
                  <div className="input-wrapper">
                    <label htmlFor="email" className="name_field">
                      Country/Region
                    </label>
                    <select className="nice-select"  
                    name='country'
                    value={userData?.country || ''}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}>
                      <option>Uganda</option>
                    </select>
                    {errors.country && errors.country != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.country}</span>
                              ):''}
                     
                  </div>
                </div>
                <div className="col-lg-2 col-2">
                  <label className="d-block">&nbsp;</label>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {edit && (
                <div className='button_container'>  
                    <button className='rts-btn btn-primary' type='submit'>Save</button>
                </div>
            )} 
        </form>
      
    </div>
   
  </div>
</div>

  )
}

export default PersanalInformationSection