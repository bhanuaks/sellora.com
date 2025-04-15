import { baseUrl } from '@/Http/helper'
import React from 'react'

const ProfileSection = ({user}) => {

    
    if(!user){
        return(<></>)
    }
  return (
    <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
    <div className="dashboard-account-area">
      <h2 className="title text-center">My Profile</h2>
      <div className="my_profile">
        <h3 className="title animated fadeIn">Personal Information</h3>
        <div className="img_my_profile-box dactive-user22 d-flex">
        
        {/* <div className="img-fluid profile-img"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px', border:'1px solid' }}
            >{user ? user.full_name.substring(0, 1).toUpperCase() : ''}</div> */}


 
            <img
            src={`${baseUrl}front/assets/images/${user?.gender=="Female"?"female.webp":"male.png"}`}
            alt="avatar"
            className="img-fluid profile-img"
          />
          {/* <img
            src={`${baseUrl}front/assets/images/ts-1.jpg`}
            alt="avatar"
            className="img-fluid profile-img"
          /> */}
          <h2>{user?.full_name || ''}</h2>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="profile-info">
              <div className="row">
                <div className="col-lg-5">
                  <div className="cont_1">Gender:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user?.gender || ''}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Email Address:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user?.email || ''}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Mobile Number:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">+{user?.mobile_code || ''} {user?.mobile || ''}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="profile-info">
              <div className="row">
                <div className="col-lg-5">
                  <div className="cont_1">Trade Role:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user?.role_buyer_seller || ''}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Buyer Type:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user?.role_consumer_business || ''}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Country / Region:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user?.country || ''}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user.company && (
        <div className="my_profile">
        <h3 className="title animated fadeIn">Company Information</h3>
        <div className="row">
          <div className="col-lg-6">
            <div className="profile-info">
              <div className="row">
                <div className="col-lg-5">
                  <div className="cont_1">Company Name:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user.company.company_name}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Year Established:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user.company.established_year}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Official Website:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">
                    {user.company.website}
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Buyer Type:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user.company.role_consumer_business}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="profile-info">
              <div className="row">
                <div className="col-lg-5">
                  <div className="cont_1">Registered Address:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">
                  {user.company.address}
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Country/region:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user.company.country}</div>
                </div>
                <div className="col-lg-5">
                  <div className="cont_1">Tax ID:</div>
                </div>
                <div className="col-lg-7">
                  <div className="cont_2">{user.company.tax_id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </div>
  </div>
  )
}

export default ProfileSection