"use client"
import { baseUrl } from '@/Http/helper';
import Link from 'next/link';
import React, { useEffect } from 'react';
import $ from 'jquery'
import { usePathname } from 'next/navigation';

function Sidebar() {
  
      const currentUrl = usePathname();
      
      function logoutUser(e){
          e.preventDefault()
           $('.loaderouter').css('display','flex')
                  fetch(`${baseUrl}api/user/user-logout`,{
                      method:"POST", 
                      body:JSON.stringify({user_id:""})
                  }).then((response)=>{ 
                      if(!response.ok){
                          $('.loaderouter').css('display','none')
                          throw new Error("Network Error")
                      }
                      return response.json()
                  }).then((res)=>{
                      if(res.status){ 
                          window.location.reload()
                      }else{ 
                          $('.loaderouter').css('display','none')
                      }
                  })
      }
  return (
    <ul>
      <li className={`nav-link sub-menu ${["/user/my-profile", "/user/personal-information", "/user/company-information"].includes(currentUrl)?"active":''}`}>
        <Link href="/user/my-profile">
          <i className="fa-light fa-user" />
          My Profile <div className="fa right fa-caret-down" />
        </Link>
        <ul className="d-block">
          <li>
            <Link href="/user/personal-information" className={`${currentUrl=="/user/personal-information"?"active_d":''}`}>
              Personal Information
            </Link>
          </li>
          <li>
            <Link href="/user/company-information" className={`${currentUrl=="/user/company-information"?"active_d":''}`}>
            Company Information</Link>
          </li>
        </ul>
      </li>
      <li className={`nav-link ${currentUrl=="/user/myorders"?"active":''}`}>
        <Link href="/user/myorders">
          <i className="fa-regular fa-bag-shopping" />
          My Orders
        </Link>
      </li>
      <li className={`nav-link ${currentUrl=="/user/wishList"?"active":''}`}>
        <Link href="/user/wishList">
          <i className="fa-sharp fa-regular fa-heart" /> WishList
        </Link>
      </li>
      <li className={`nav-link ${currentUrl=="/user/rewards"?"active":''}`}>
        <Link href="/user/rewards">
          <i className="fa-sharp fa-regular fa-gift" /> Rewards
        </Link>
      </li>
      <li className={`nav-link ${currentUrl=="/user/my-coupons"?"active":''}`}>
        <Link href="/user/my-coupons">
          <i className="fa-regular fa-credit-card-alt" />
          My Coupons
        </Link>
      </li>
      <li className={`nav-link ${currentUrl=="/user/my-address"?"active":''}`}>
        <Link href="/user/my-address">
          <i className="fa-light fa-location-dot" />
          My Address
        </Link>
      </li>
      <li className={`nav-link ${currentUrl == "/user/change-password"?"active":''}`}>
        <Link href="/user/change-password">
          <i className="fa-light fa-lock" />
          Change Password
        </Link>
      </li>
      <li className="nav-link">
        <Link href="/" onClick={(e)=>logoutUser(e)}>
          <i className="fa-light fa-right-from-bracket" />
          Log Out
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
