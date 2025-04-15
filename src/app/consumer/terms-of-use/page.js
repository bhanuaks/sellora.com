import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            Consumer Policy
            <i className="fa-regular fa-chevron-right" />
            <Link className="current" href="terms-of-use.html">
              Terms of Use
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
  <section className="rts-map-contact-area rts-section-gap2">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="contact-left-area-main-wrapper shipping min-hight">
            <h2>Terms of Use</h2>
            <p>Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default page