import { baseUrl } from '@/Http/helper'
import React from 'react'
import Sidebar from './userComponents/Sidebar'

const UserSideBarSecction = ({user}) => {

    // if(!user){
    //     return(
    //         <></>
    //     )
    // }
  return (
    <div className="col-lg-2">
    <div className="side">
       
            <div className="user-profile-box active-user d-flex">
                    <img
                        src={`${baseUrl}front/assets/images/${user?.gender=="Female"?"female.webp":"male.png"}`}
                        alt="avatar"
                        className="img-fluid profile-img"
                    />
                <h2>
                    <span>Hello</span>{user?user.full_name:''}
                </h2>
            </div>
        
      
      <div className="nav accout-dashborard-nav flex-column nav-pills">
        <Sidebar user = {user}/>
      </div>
    </div>
  </div>
  )
}

export default UserSideBarSecction