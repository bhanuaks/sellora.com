import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            Sell on Sellora
            <i className="fa-regular fa-chevron-right" />
            <Link className="current" href="/partner-and-program">
              Partner and Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="section-seperator">
    <div className="container">
      <hr className="section-seperator" />
    </div>
  </div>
  <div className="rts-map-contact-area rts-section-gap2">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="contact-left-area-main-wrapper shipping">
            <h2>Partner and Program</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default page