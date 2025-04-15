import Link from 'next/link'
import React from 'react'
import Sidebar from '../userComponents/Sidebar'
import { baseUrl } from '@/Http/helper'


const page = () => {
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
              Rewards
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
        <div className="col-lg-2">
          <div className="side">
            <div className="user-profile-box active-user d-flex">
              <img
                src={`${baseUrl}front/assets/images/ts-1.jpg`}
                alt="avatar"
                className="img-fluid profile-img"
              />
              <h2>
                <span>Hello</span>Mary Smith
              </h2>
            </div>
            <div className="nav accout-dashborard-nav flex-column nav-pills">
            <Sidebar/>
            </div>
          </div>
        </div>
        <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
          <div className="dashboard-account-area">
            <h2 className="title">Rewards</h2>
            coming soon
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default page