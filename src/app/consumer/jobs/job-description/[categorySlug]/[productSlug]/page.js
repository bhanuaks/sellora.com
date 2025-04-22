

"use client"
import Link from 'next/link'
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

import { useRouter } from 'next/navigation'; 

const page = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchjob = async () => {
    const segments = pathname.split('/').filter(Boolean);
    const categorySlug = segments[3] || '';
    const productSlug = segments[4]  || '';

    try {
      const response = await fetch(`/api/career/job?status=Active&categorySlug=${categorySlug}&productSlug=${productSlug}`);
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


  console.log(jobs);
  
  useEffect(() => {
    fetchjob();
    const token = localStorage.getItem('careerToken');
        if (!token) {
          router.push("/consumer/candidate-login");
        }

  }, []);


  

  return (

    <>
  <section className="discription-sec">
      {jobs.map((job, index) => (
        <div className="container" key={index}>
          <div className="row">
            <div className="col-lg-12">
              <div className="discription-content">
                <h1>{job.jobTitle}</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="discription-content">
                <h2>About Sellora</h2>
                <p>
                  Sellora is devoted to revolutionizing commerce in Global by
                  investing in advanced, locally-developed technology, creating
                  customer-focused features, offering a broad range of products, and
                  maintaining a top-notch supply chain. Our growing customer base
                  and extensive product offerings across various categories
                  highlight our commitment to creating job opportunities, supporting
                  entrepreneurs and MSMEs, and promoting sustainable growth. At
                  Sellora, we strive to deliver exceptional value for our customers,
                  stakeholders, and the environment.
                </p>
                <h2>Job Description</h2>
                   <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
                <h2>Skills Required</h2>
                <div dangerouslySetInnerHTML={{ __html: job.skills }} />
                <h2>Job Role</h2>
                <div dangerouslySetInnerHTML={{ __html: job.jobRole }} />
                <h2>Location</h2>
                <div dangerouslySetInnerHTML={{ __html: job.location }} />
                <h2>About the Role</h2>
                <div dangerouslySetInnerHTML={{ __html: job.aboutTheRole }} />
                <h2>About the team</h2>
                <div dangerouslySetInnerHTML={{ __html: job.aboutTheTeam }} />
                <h2>To succeed in this role, you should have the following</h2>
                <div dangerouslySetInnerHTML={{ __html: job.toSucceedInThisRole }} />
                <h2>Why work with us?</h2>
                <div dangerouslySetInnerHTML={{ __html: job.whyWorkWithUs }} />
              </div>
              <div className="text-center apply-now-brn-wrapper">
                <a
                  href={`/consumer/job-apply?jobCategory=${job?.categoryId?.slug}&job=${job.slug}&jobTitle=${job.jobTitle}`}
                  data-toggle="modal"
                  data-target="#applypopup"
                  className="animate-btn-style3 applynow-btn"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
  </section>
  
</>

  


  )
}

export default page