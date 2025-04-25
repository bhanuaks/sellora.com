"use client"
import Link from 'next/link'
import { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; 


const page = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  
  const [searchData, setSearchData] = useState({
      jobTitle: "",
      location: "",
  });
  
 

  const handleSubmit = (e) => {
        e.preventDefault();
        setCategory([]);
        fetchjobList();
    };

  const handleChange = (e) => {
     
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/career/careerCategories?status=Active");
      const result = await response.json();
      if (response.ok) {
        setCategories(result.data);
      } else {
        alert(result.message || "Failed to fetch Category.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      alert("Failed to fetch Category.");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/career/location?status=Active");
      const result = await response.json();
      if (response.ok) {
        setLocations(result.data);
      } else {
        alert(result.message || "Failed to fetch Location.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch Location.");
    }
  };
 
  const fetchjobList = async () => {
    
    
    try {
      const response = await fetch(`/api/career/job?status=Active&categoryF=${category}&jobTitle=${searchData.jobTitle}&location=${searchData.location}`);
      const result = await response.json();
      if (response.ok) {
       setJobs(result.data);
      } else {
        alert(result.message || "Failed to fetch job.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch job.");
    }
  };

  const handleCategoryClick = (e, categorySlug) => {
    e.preventDefault(); 
    setCategory(categorySlug); 
    setSearchData({
          jobTitle: "",
          location: "",
      });
      
    router.push(`/consumer/jobs?category=${categorySlug}`); 
    // fetchjobList(); 
  };

 

  useEffect(() => {
    if (category) {
      fetchjobList();
    }
  }, [category]);

  useEffect(() => {
      fetchCategories();
      fetchLocations();
      fetchjobList();
      if (router.isReady) {
          setCategory(router.query.category || ""); 
      }
      const token = sessionStorage.getItem('careerToken');
        if (!token) {
          router.push("/consumer/candidate-login");
        }
    }, []);
  return (
    <>
  <section className="page-title jobs-bg">
    <div className="container-fluid">
      <div className="page-title-wrap">
        <div className="row align-items-center">
          <div className="col col-md-12 col-12">
            <div className="breadcumb-wrap">
              <h2 className="about-heading">Explore For Opportunities Here</h2>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  </section>
  <section className="shop-grid-sidebar-area rts-section-gap job-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div>
            <h1 className="job-main-title mob-none">Current Openings</h1>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4 rts-sticky-column-item">
          <div className="sidebar-filter-main theiaStickySidebar job-category-col">
            <div className="single-filter-box singal-job-filter">
              <h5 className="title job-title">Category</h5>
              <div className="filterbox-body job-filterbox">
                <div className="category-wrapper _p13n-zg-nav-tree-all_style_zg-browse-group__88fbz job-category-wrapper">
                 
                  <ul className="list_cat job-list">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <Link onClick={(e) => handleCategoryClick(e, cat.slug)} href={`/consumer/jobs?category=${cat.slug}`}  key={index}>{cat.name}</Link>
                    </li>
                   ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-8">
          <div className="col-lg-12">
            <div>
              <h1 className="job-main-title desk-none mob-block">
                Current Openings
              </h1>
            </div>
          </div>
          <div className="search-sec job-search-sec">
            <form onSubmit={handleSubmit} method="post" noValidate="novalidate">
              <div className="row">
                <div className="col-lg-9 col-md-10 col-sm-10">
                  <div className="search-outer job-search-outer">
                    <div className="row">
                     
                      <div className="col-lg-8 col-md-8 col-sm-7 p-0">
                        {/* <input type="text" className="form-control search-slt" placeholder="Enter Drop City"> */}
                        <div className="search-header career-slider-input">
                          <input
                            type="text"
                            className="form-control search-slt search-slt2 job-search-input"
                            placeholder="Search Jobs"
                            value={searchData.jobTitle}
                            name='jobTitle'
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 p-0">
                        <select onChange={handleChange}
                          className="form-control search-slt seerch-select select-job-location select-job-location2"
                          id="exampleFormControlSelect1"
                          name='location'
                          value={searchData.location}
                        >
                          <option value={''}>Select</option>
                          {locations.map((lan, index) => (
                              <option key={index} value={lan._id}>{lan.name}</option>
                           ))}
                        </select>
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-md-2 col-sm-2 p-0">
                  <div className="job-search-btn">
                    <button type="submit" className="rts-btn radious-sm with-icon">
                        <div className="arrow-icon career-slider-icon job-search-btn-icon">
                          <i className="fa-solid fa-magnifying-glass" />
                        </div>
                      </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div className="row g-4" key={index}>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="single-shopping-card-one deals-of-day job-box">
                      <div className="body-content">
                        <Link href={`/consumer/jobs/job-description/${job?.categoryId?.slug}/${job.slug}`}>
                          <h4 className="title job-box-title">
                           {job.jobTitle}
                          </h4>
                        </Link>
                        <p>Location: {job?.categoryId?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Not Found</div>
            )}


        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default page