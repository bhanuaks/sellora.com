import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
  <div id="side-bar" className="side-bar header-two">
    <button className="close-icon-menu">
      <i className="far fa-times" />
    </button>
    <div className="mobile-menu-nav-area tab-nav-btn mt--20">
      {/* <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                  type="button" role="tab" aria-controls="nav-home" aria-selected="true">Menu</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                  type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Category</button>
          </div>
      </nav> */}
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex={0}
        >
          {/* mobile menu area start */}
          <div className="mobile-menu-main">
            <nav className="nav-main mainmenu-nav mt--30">
              <ul className="mainmenu metismenu" id="mobile-menu-active">
                <li className="parent">
                  
                  <Link href="career.html">Careers</Link>
                </li>
                <li className="parent">
                  
                  <Link href="about-us.html">About Sellora</Link>
                </li>
                <li className="parent">
                  <Link href="culture.html">Culture</Link>
                </li>
                <li className="parent">
                  <Link href="jobs.html">Jobs</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* mobile menu area end */}
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabIndex={0}
        >
          <div className="category-btn category-hover-header menu-category">
            <ul className="category-sub-menu" id="category-active-menu">
              <li className="parent">
                
                <Link href="career.html">Careers</Link>
              </li>
              <li className="parent">
                
                <Link href="about-us.html">About Sellora</Link>
              </li>
              <li className="parent">
                <Link href="culture.html">Culture</Link>
              </li>
              <li className="parent">
                <Link href="jobs.html">Jobs</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="page-title">
    <div className="container-fluid">
      <div className="page-title-wrap">
        <div className="row align-items-center">
          <div className="col col-md-12 col-12">
            <div className="breadcumb-wrap">
              <h2 className="about-heading">About Us</h2>
              {/* <ol>
                          <li><Link href="index.html"><i className="icon-36"></i> Home</Link></li>
                          <li><Link href="javascript:void(0);"><i className="icon-36"></i> Who We Are</Link></li>
                          <li>About Us</li>
                      </ol> */}
            </div>
          </div>
          {/* <div className="col col-lg-6">
                  <div className="breadcumb-img">
                      <img src={`${baseUrl}frontfront/assets/images/page-title_img_01.jpg`} alt="">
                  </div>
              </div> */}
        </div>
      </div>
    </div>
  </section>
  <section className="culture-sec">
    <div className="container">
      {/* <div className="row justify-content-center">
          
         <div className="culture-top-content">
          <h4 className="bighd text-center">Our Culture at Sellora</h4>
          <p className="culture-para">At Sellora, we believe that culture is the backbone of our success. Our core values
              of innovation, collaboration, integrity, and customer-centricity are not just
              principles we talk about—they are woven into everything we do.
              </p>
         </div>
         

        

      </div> */}
      <div className="row">
        <div
          className="col-lg-6 col-md-6 order-lg-1 order-md-1 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="about-us-img">
            <img
              src={`${baseUrl}front/assets/images/Career-img/about-us-img-01.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 order-lg-2 order-md-2  wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents career-content2 about-us-content">
            <h4 className="bighd-subtitle">Welcome to Sellora!</h4>
            <p>
              Founded in 2024, Sellora is a dynamic marketplace platform
              designed to connect businesses and consumers across both B2B and
              B2C sectors. Our mission is to empower companies of all sizes with
              innovative tools and a seamless platform that enhances their
              online presence and drives growth. Whether you're a business
              looking to expand your reach or a consumer seeking a diverse range
              of products, Sellora is committed to delivering a superior
              experience for all. Join us in shaping the future of e-commerce
              with a platform that truly understands and caters to your needs.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
      <div className="row about-row">
        <div
          className="col-lg-6 col-md-6 order-lg-2 order-md-2 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="about-us-img">
            <img
              src={`${baseUrl}front/assets/images/Career-img/about-us-img-02.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 order-lg-1 order-md-1  wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents career-content2 about-us-content">
            <h4 className="bighd-subtitle">Our Mission and Vision</h4>
            <p>
              At Sellora, our mission is to empower businesses of all sizes to
              excel in the digital marketplace. We offer tailored tools and a
              user-friendly platform to deliver a distinctive and efficient
              selling experience. Our vision is to drive your e-commerce success
              by providing the support and resources needed for your growth and
              achievement.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
      <div className="row mt-5 about-row">
        <div
          className="col-lg-6 col-md-6 order-lg-1 order-md-1 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="about-us-img">
            <img
              src={`${baseUrl}front/assets/images/Career-img/about-us-img-03.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 order-lg-2 order-md-2  wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents career-content2 about-us-content">
            <h4 className="bighd-subtitle">What Sets Us Apart </h4>
            <p>
              <strong>
                At Sellora, we distinguish ourselves from other marketplaces
                through
              </strong>
            </p>
            <p>
              Personalized Support: We offer dedicated assistance to help
              businesses navigate the platform and grow.
            </p>
            <p>
              Scalability: Our solutions are designed to evolve with your
              business, whether you're a small startup or a large enterprise.
            </p>
            <p>
              Tailored Solutions: Industry-specific tools and strategies cater
              to your unique business needs, setting us apart from competitors.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
      <div className="row mt-5 about-row">
        <div
          className="col-lg-6 col-md-6 order-lg-2 order-md-2 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="about-us-img">
            <img
              src={`${baseUrl}front/assets/images/Career-img/about-us-img-04.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 order-lg-1 order-md-1  wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents career-content2 about-us-content">
            <h4 className="bighd-subtitle">
              Customer/Business Focus at Sellora
            </h4>
            <p>
              At Sellora, we are committed to supporting both our sellers and
              customers. For sellers, we offer tailored tools, comprehensive
              support, and scalable solutions to help grow their business. For
              customers, we ensure an effortless shopping experience with a wide
              range of products and easy navigation. Our platform is designed to
              create value for both sides, fostering growth and satisfaction.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
      <div className="row mt-5 about-row">
        <div
          className="col-lg-6 col-md-6 order-lg-1 order-md-1 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="about-us-img">
            <img
              src={`${baseUrl}front/assets/images/Career-img/about-us-img-05.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 order-lg-2 order-md-2  wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents career-content2 about-us-content">
            <h4 className="bighd-subtitle">Join Us Today</h4>
            <p>
              Experience the difference with Sellora. Whether you're a seller
              looking to expand your reach or a customer seeking a diverse range
              of products, our platform is designed for you. Sign up now and be
              part of a marketplace that supports your success and delivers
              exceptional value.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
    </div>
  </section>
  <section className="careersection2 culture-sec2">
    <div className="container">
      {/* <h4 className="bighd text-center">Why Join Sellora?</h4> */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 col-sm-6">
          <div className="ethoscont about-content-box">
            {/* <img src={`${baseUrl}front/assets/images/Career-img/career-icon-01.jpg`} alt=""> */}
            <h3 className="">Your Satisfaction is Our Priority</h3>
            <p className="">
              We place our customers at the core of everything we do, ensuring a
              seamless and enjoyable experience. By focusing on their needs, we
              deliver exceptional service that exceeds expectations.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-sm-6">
          <div className="ethoscont about-content-box about-content-box-bg">
            {/* <img src={`${baseUrl}front/assets/images/Career-img/career-icon-02.jpg`} alt=""> */}
            <h3 className="">Driving E-Commerce Forward</h3>
            <p className="">
              We embrace innovation and continuously evolve with the latest
              technology and market trends. Our commitment to cutting-edge
              solutions keeps us ahead and provides our users with the best
              tools and features.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-sm-6">
          <div className="ethoscont about-content-box">
            {/* <img src={`${baseUrl}front/assets/images/Career-img/career-icon-03.jpg`} alt=""> */}
            <h3 className="">Trust and Transparency</h3>
            <p className="">
              We conduct our business with honesty and transparency. Our
              dedication to ethical practices builds trust and ensures a fair
              and reliable marketplace for everyone.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-sm-6">
          <div className="ethoscont about-content-box about-content-box-bg">
            {/* <img src={`${baseUrl}front/assets/images/Career-img/career-icon-03.jpg`} alt=""> */}
            <h3 className="">Supporting Your Growth</h3>
            <p className="">
              We place our customers at the core of everything we do, ensuring a
              seamless and enjoyable experience. By focusing on their needs, we
              deliver exceptional service that exceeds expectations.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-sm-6">
          <div className="ethoscont about-content-box">
            {/* <img src={`${baseUrl}front/assets/images/Career-img/career-icon-03.jpg`} alt=""> */}
            <h3 className="">Striving for Perfection</h3>
            <p className="">
              We embrace innovation and continuously evolve with the latest
              technology and market trends. Our commitment to cutting-edge
              solutions keeps us ahead and provides our users with the best
              tools and features.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-sm-6">
          <div className="ethoscont about-content-box about-content-box-bg">
            {/* <img src={`${baseUrl}front/assets/images/Career-img/career-icon-03.jpg`} alt=""> */}
            <h3 className="">Working Together for Success</h3>
            <p className="">
              We conduct our business with honesty and transparency. Our
              dedication to ethical practices builds trust and ensures a fair
              and reliable marketplace for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default page