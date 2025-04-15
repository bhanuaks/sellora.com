"use client"
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../userComponents/Sidebar'
import Link from 'next/link'
import { baseUrl } from '@/Http/helper'
import AddressSection from './addressSection'
import ViewAddressSection from './viewAddressSection'
import { userAppContaxt } from '@/app/contaxtData/userContaxtData'
import BillingAddressection from './billingAddressection'
import { ToastContainer, toast } from 'react-toastify';
import UserSideBarSecction from '../userSideBarSecction'

function page() {

   const [address, setAddress] = useState(null) 
   const [updateAddress, setUpdateAddress] = useState({}) 
      const [editAddress, setEditAddress] = useState(null)
      function clickAddressEdit(e, addressType, addressData){
        // e.preventDefult()
          setEditAddress(addressType)
          setUpdateAddress(addressData || {})
      }


      
        const { globalUser, setGlobalUser } = useContext(userAppContaxt);
        const [user, setUser] = useState(null);
       

        
          useEffect(() => { 
            if (globalUser.user) {
              setUser(globalUser.user)
              $('.loaderouter').css('display', 'flex')
              fetch(`${baseUrl}api/user/user-details?user_id=${globalUser.user._id}&withData=address`, {
                method: "GET"
              }).then((response) => { 
                if (!response.ok) {
                  $('.loaderouter').css('display', 'none')
                  throw new Error("Network Error")
                }
                return response.json();
              }).then((res) => {
                if (res.status) {
                  setUser(res.data.user)
                  setAddress(res.data.address)

                }
                $('.loaderouter').css('display', 'none')
              })
            } 
          }, [globalUser.user])

  return (
    
    <div className="details_page_outer">
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
  {/* rts navigation bar area start */}
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href="/">Dashboard</Link>
            <i className="fa-regular fa-chevron-right" />
            <Link className="current" href="#">
              My Address 
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
            {/*    <h2 className="title">My Address</h2> */}
           
           {!editAddress && (  
              <ViewAddressSection clickAddressEdit= {clickAddressEdit} address={address}/>
           )}

           {editAddress == "Shipping" && (  
              <AddressSection user={user} address={updateAddress} editAddress={editAddress} setEditAddress={setEditAddress} setUpdateAddress={setUpdateAddress} setAddress={setAddress} />
           )}
            {editAddress == "Billing" && (  
              <BillingAddressection user={user} address={updateAddress} editAddress={editAddress} setEditAddress={setEditAddress} setUpdateAddress={setUpdateAddress} setAddress={setAddress} />
           )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default page