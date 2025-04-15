"use client"
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../userComponents/Sidebar'
import Link from 'next/link'
import { baseUrl } from '@/Http/helper'
import { AppContext } from '@/app/contaxtData/contextData'
import { userAppContaxt } from '@/app/contaxtData/userContaxtData'
import UserSideBarSecction from '../userSideBarSecction'
import ProfileSection from './profileSection'

export default function page() {

    const {globalUser, setsetGlobalUser} = useContext(userAppContaxt);
  
    const [user, setUser] = useState(null);
  
    useEffect(()=>{

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
              My Profile{" "}
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
       <ProfileSection user={user} /> 
      </div>
    </div>
  </div>
</div>

  )
}
