"use client"
import { apiRequest } from '@/Http/apiHelper'
import { baseUrl, fetcher } from '@/Http/helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'

const CareerPage = () => {

  const [showSearchPopup, setShowSearchPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [jobList, setJobList] = useState([]);
  const [selectedLocation, setLocation] = useState("");
  const router = useRouter();

  const {data:locationData, error, isLoading:loadingLoaction } = useSWR(`/api/front/career/locations`, fetcher)
  const locationList = locationData?.data?.locations || [];

  const showPopupFun=()=>{
    setShowSearchPopup(true)
  }

   useEffect(() => {
          function handleClickOutside(event) { 
              const clickedInsideInput = event.target.classList.contains("search-slt2");
               const insidePopup = event.target.closest(".product-popup"); 
              if (!clickedInsideInput && !insidePopup) {
                  setShowSearchPopup(false);
              }
          } 
          document.addEventListener("click", handleClickOutside);
      
          return () => {
              document.removeEventListener("click", handleClickOutside);
          };
      }, []);



        async function searchProducts(searchText) {
          setIsLoading(true);
          const response = await apiRequest(
            `/api/front/career/search-job?searchText=${searchText}&location=${selectedLocation}`
          );
          setIsLoading(false); 
          if (response.status) {
            setJobList(response.data.jobs);
          }
      
        }
      
        useEffect(() => {
          const timeout = setTimeout(() => {
            searchProducts(searchData);
          }, 300);
          return () => clearTimeout(timeout);
        }, [searchData, selectedLocation]);


        function hendleSearchSubmit(){
          router.push(`/consumer/jobs?jobTitle=${searchData}&location=${selectedLocation}`)
        }


  return (

    <>
  <section>
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={`${baseUrl}front/assets/images/career-bg.jpg`}
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
    
    </div>
  </section>
  <section className="search-sec">
    <div className="container">
      <div className="slider-heading">
        <h1>Connecting Dreams to Careers</h1>
      </div>
      <form action="#" method="post" noValidate="novalidate">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="search-outer">
              <div className="row">
                {/* <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                          <input type="text" className="form-control search-slt" placeholder="Enter Pickup City">
                      </div> */}
                <div className="col-lg-7 col-md-7 col-sm-6 col-12 p-0">
                  {/* <input type="text" className="form-control search-slt" placeholder="Enter Drop City"> */}
                  <div className="search-header career-slider-input">
                    <input
                      type="text"
                      className="form-control search-slt search-slt2"
                      placeholder="Explore jobs by title or keyword"
                      required=""
                      onClick={()=>showPopupFun()}
                       value={searchData || ""}
                            onChange={(e) => {
                              setSearchData(e.target.value);
                            }}
                    />
                     
                    
                  {/* <!-- ===============popup-window=============== --> */}
                          <div className="product-popup" id="productPopup" style={{display:`${showSearchPopup?"block":"none"}`}} >
                          
                          {(()=>{
                                    if(!searchData){
                                      return (<div className="ml-5"> Search Job </div>)  
                                    }else if(searchData && jobList.length == 0){
                                        return (<div style={{display:"flex", justifyContent:"center"}} > Record Not found! </div>)   
                                    }else if(searchData && isLoading){
                                        return (<div style={{display:"flex", justifyContent:"center"}} > Seaching... </div>)  
                                    } 
                                    return null  
                                })()}


                          <ul>
                                
                            {jobList.length > 0 && searchData &&
                                jobList.map((item, index) => (
                                  <li
                                    key={index} 
                                  > 
                                    <div className="product-info">
                                      <Link href={`/consumer/jobs/job-description/${item.categoryId?.slug}/${item.slug}`}>
                                          <strong>{item.jobTitle}</strong>
                                      </Link>
                                        
                                    </div>
                                  </li>
                                ))}
                            
                               
                      
                                
                            {/* <!-- Add more products as needed --> */}
                          </ul>
                        </div>
                      {/* <!-- ===============popup-window=end============== --> */}
 
                    <Link
                      href="javascript: void(0);"
                      className="rts-btn radious-sm with-icon"
                    >
                      <div className="arrow-icon career-slider-icon">
                        {" "}
                        <i className="fa-solid fa-magnifying-glass" />{" "}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-12 p-0">
                  <select
                    className="form-control search-slt seerch-select select-job-location"
                    id="exampleFormControlSelect1"
                    value={selectedLocation || ""}
                    onChange={(e)=>setLocation(e.target.value)}
                  >
                    <option value={""}>Location</option>
                    {locationList.length && locationList.map((item, index)=>(
                     <option value={item._id} key={index} >{item.name}</option> 
                    ))}
                     
                  </select>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-12 p-0">
                  <button type="button" className="btn wrn-btn " onClick={()=>hendleSearchSubmit()}>
                    <i className="fa-solid fa-arrow-right fa-arrow-right-bg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="social-and-payment-area-wrapper social-career-list social-career-list2 social-list">
        <div className="social-one-wrapper social-two-wrapper">
          {/* <span>Follow Us:</span> */}
          <ul>
            <li>
              <Link href="#">
                <i className="fa-brands fa-facebook-f" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-brands fa-twitter" />
              </Link>
            </li>
            {/* <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li> */}
            <li>
              <Link href="#">
                <i className="fa-brands fa-linkedin" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-brands fa-instagram" />
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="payment-access"> <span>Payment Accepts:</span> <img src={`${baseUrl}front/assets/images/payment/06.png`} alt=""> </div> */}
      </div>
    </div>
  </section>
  <section className="careersection1">
    <div className="container">
      <h4 className="bighd text-center">
        Build the Future of E-Commerce with Sellora
      </h4>
      <div className="row justify-content-center ">
        <div
          className="col-lg-6 col-md-6 col-sm-5 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-img-box">
            <img src={`${baseUrl}front/assets/images/career-img-01.jpg`} alt="career image" />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-7 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-content">
            {/* <h4 className="bighd">Meet Our Team</h4> */}
            <p>
              Sellora is one of the newest and fastestgrowing marketplace
              platforms, built to empower both sellers and customers with a
              seamless shopping experience. we are at the forefront of
              innovation, offering a dynamic environment where your ideas can
              make a significant impact on the future of e-commerce.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
    </div>
  </section>
  <section className="careersection2">
    <div className="container">
      <h4 className="bighd text-center">Why Join Sellora?</h4>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6 col-sm-6">
          <div className="ethoscont">
            <img src={`${baseUrl}front/assets/images/Career-img/career-icon-01.jpg`} alt="" />
            <h3 className="text-center"> Growth &amp; Learning</h3>
            <p className="text-center">
              We believe that investing in people is key to our success. Whether
              you’re just starting your career or looking to expand your
              expertise, we provide ample opportunities for continuous learning
              and career progression.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-6">
          <div className="ethoscont">
            <img src={`${baseUrl}front/assets/images/Career-img/career-icon-02.jpg`} alt="" />
            <h3 className="text-center">Collaborative Culture</h3>
            <p className="text-center">
              Our success is built on teamwork. At Sellora, you will be part of
              a highly collaborative environment where everyone’s ideas are
              valued, and innovation thrives.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-6">
          <div className="ethoscont">
            <img src={`${baseUrl}front/assets/images/Career-img/career-icon-03.jpg`} alt="" />
            <h3 className="text-center">Work-Life Harmony</h3>
            <p className="text-center">
              We understand the importance of balance. Our flexible work
              policies and supportive environment allow you to grow
              professionally while maintaining a healthy personal life.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="careersection5">
    <div className="container">
      <h4 className="bighd text-center">Life at Sellora</h4>
      <div className="row justify-content-center align-items-center">
        <div
          className="col-lg-6 col-md-6 col-sm-5 col-12 order-lg-2 order-md-2 order-sm-2 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="">
            <img
              src={`${baseUrl}front/assets/images/Career-img/career-img-04.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-7 col-sm-7 order-lg-1 order-md-1 order-sm-1  wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents">
            <h4 className="bighd-subtitle">Diverse &amp; Inclusive</h4>
            <p>
              We celebrate diversity and ensure that everyone feels included and
              valued. At Sellora, we believe that different perspectives drive
              innovation and growth.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div
          className="col-lg-6 col-md-6 col-sm-5 col-12 order-lg-1 order-md-1 order-sm-1"
          data-wow-delay="0s"
        >
          <div className="">
            <img
              src={`${baseUrl}front/assets/images/Career-img/career-img-03.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-7 col-12 order-lg-2 order-md-2 order-sm-2 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents">
            <h4 className="bighd-subtitle">Learning &amp; Development</h4>
            <p>
              We are committed to your growth. With access to workshops,
              certifications, and hands-on experiences, you’ll have the tools to
              enhance your skills and grow your career.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div
          className="col-lg-6 col-md-6 col-sm-5 col-12 order-lg-2 order-md-2 order-sm-2 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="">
            <img
              src={`${baseUrl}front/assets/images/Career-img/career-img-02.jpg`}
              alt="career image"
            />
          </div>
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-7 col-12 order-lg-1 order-md-1 order-sm-1 wow fadeInUp"
          data-wow-delay="0s"
        >
          <div className="career-contents">
            <h4 className="bighd-subtitle">Health &amp; Wellness</h4>
            <p>
              Your well-being is a priority. From health benefits to wellness
              programs, we make sure that our employees are taken care of both
              mentally and physically.
            </p>
          </div>
          {/* <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
        </div>
      </div>
    </div>
  </section>
  <section className="careersection4">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="opportunities-content">
            <h3 className="bighd text-center mt-5 opportunities-heading">
              Take the Next Step in Your Career
            </h3>
            <p>
              We’re always on the lookout for talented individuals ready to make
              an impact. Explore <br />
              our current openings and join a dynamic team that’s transforming
              e-commerce.
            </p>
            <Link href="/consumer/jobs" className="animate-btn-style3 applybtn">
              Browse Opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

const page = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <CareerPage/>
    </Suspense>
  )
}
export default page