"use client"
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../userComponents/Sidebar'
import Link from 'next/link'
import { baseUrl } from '@/Http/helper'
import '../../../../../public/front/error.css'
import { userAppContaxt } from '@/app/contaxtData/userContaxtData'
import UserSideBarSecction from '../userSideBarSecction'


function page() {

    const { globalUser, setsetGlobalUser } = useContext(userAppContaxt);
    const [user, setUser] = useState(null);
    useEffect(()=>{
      setUser(globalUser.user)
    },[globalUser.user])

  const [errors, setErrors] = useState({})
  const [passwordData, setPasswordData] = useState({
    old_password:"",
    new_password:"",
    confirm_password:"",
  })


  function changeInputData(e){
    const {name, value} = e.target;
      setPasswordData((preData)=>({
        ...preData,
        [name]:value
      }))

      setErrors((preError)=>({
        ...preError,
        [name]:!value.toString().trim()?`${name.replace("_", " ")} is required`:''
      }))
  }

  function changePassword(e){
    e.preventDefault();
    $('.loaderouter').css('display','flex')

    fetch(`${baseUrl}api/user/change-password`, {
      method:"POST",
      body:JSON.stringify({
        ...passwordData,
        user_id:user?user._id:''
      })
    }).then((response)=>{
      if(!response.ok){ 
        $('.loaderouter').css('display','none')
        throw new Error(`Network Error! ${response.statusText}`)
      }
      return response.json()
    }).then((res)=>{
      $('.loaderouter').css('display','none')
      if(res.status){
        window.location.reload();
      }else if(res.data.status_code && res.data.status_code == "400"){
        setErrors(res.data.errors)
      }
    })
  }
  return (
    <div className="details_page_outer">
  {/* rts navigation bar area start */}
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href="/">Dashboard</Link>
            <i className="fa-regular fa-chevron-right" />
            <Link className="current" href="#">
              Change Password
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
         <UserSideBarSecction user={user} /> 
        <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
          <div className="dashboard-account-area">
            <div className="col-lg-6 offset-lg-3">
              <form action="#" className="account-details-area" onSubmit={(e)=>changePassword(e)}>
                <h2 className="title">Change Password</h2>
                <div className="input-half-area">
                  <div className="single-input">
                    <input type="password" placeholder="Old Password" 
                    name='old_password'
                    value={passwordData.old_password}
                    onChange={(e)=>changeInputData(e)}
                    />
                    {errors.old_password && ( 

                    <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.old_password}</span>
                      // <span className='error_message'>{errors.old_password}</span>
                    )}
                  </div>
                </div>
                <input type="password" placeholder="Password" 
                name='new_password'
                value={passwordData.new_password}
                onChange={(e)=>changeInputData(e)}
                />
                {errors.new_password && ( 
                      <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.new_password}</span>
                    )}
                <input type="password" placeholder="Confirm Password" 
                name='confirm_password'
                value={passwordData.confirm_password}
                onChange={(e)=>changeInputData(e)}/>
                {errors.confirm_password && ( 
                     <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.confirm_password}</span>
                    )}
                <button className="rts-btn btn-primary">Save Change</button>
              </form>
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