import React from 'react'
import Sidebar from '../userComponents/Sidebar'
import Link from 'next/link'
import { baseUrl } from '@/Http/helper'


function page() {
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
              My Coupons
            </Link>{" "}
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
            <h2 className="title">My Coupons</h2>
            <div className="tabs-container">
              <nav className="tabs">
                <ul className="expanded">
                  <li className="active" data-tab="tab-1">
                    Active(0)
                  </li>
                  <li data-tab="tab-2">Used(0)</li>
                  <li data-tab="tab-3">Expired(0)</li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-12">
              <div id="tab-1" className="tab-content_store current">
                <div className="row">
                  <div className="col-lg-12 pt--20">
                    <p>coming soon</p>
                  </div>
                </div>
              </div>
              <div id="tab-2" className="tab-content_store">
                <div className="row">
                  <div className="col-lg-12 pt--20">
                    <p>No Used Coupons</p>
                  </div>
                </div>
              </div>
              <div id="tab-3" className="tab-content_store">
                <div className="row">
                  <div className="col-lg-12 pt--20">
                    <p>0</p>
                  </div>
                </div>
              </div>
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