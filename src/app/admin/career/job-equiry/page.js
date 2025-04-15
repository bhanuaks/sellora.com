"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import { baseUrl } from "@/Http/helper";

function page() {
  const [jobEnquiries, setJobEnquiries] = useState([]);
  const fetchJobEnquiries = async () => {
    try {
      const response = await fetch("/api/career/job-apply");
      const result = await response.json();
      if (response.ok) {
        setJobEnquiries(result.data);
      } else {
        alert(result.message || "Failed to fetch job enquiry.");
      }
    } catch (error) {
      console.error("Error fetching job enquiry:", error);
      alert("Failed to fetch job enquiry.");
    }
  };

  useEffect(() => {
      fetchJobEnquiries();
    }, []);


    return (
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* start page title */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Job Enquiry</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);"> Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Job Enquiry</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                  
                    {/* end card body */}
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="table-responsive">
                          {/* id="example2" */}
                          <table className="table table-bordered table-hover">
                            <thead>
                            
                              <tr>
                                <th width={80}>Sl No.</th>
                                <th>Resume</th>
                                <th>Name </th>
                                <th>Email </th>
                                <th>Phone Number</th>
                                <th>Total Experience (in years) </th>
                                <th>Gender </th>
                                <th>Current Location</th>
                                <th>Qualification</th>
                                <th>College Name</th>
                                <th>Year Of Passing</th>
                                <th>Current Industry</th>
                                <th>Current Company Name</th>
                                <th>Role Applied for</th>
                                <th>Fixed Compensation</th>
                                <th>Variable Compensation</th>
                                <th width={150}>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                            {jobEnquiries.length > 0 ? (
                              jobEnquiries.map((cat, index) => (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link href={`${baseUrl}/${cat.uploadResume}`} target="_blank">View Resume</Link></td>
                                <td>{cat.name}</td>
                                <td>{cat.email}</td>
                                <td>{cat.phoneNumber}</td>
                                <td>{cat.totalExperience}</td>
                                <td>{cat.gender}</td>
                                <td>{cat.currentLocation}</td>
                                <td>{cat.qualification}</td>
                                <td>{cat.collegeName}</td>
                                <td>{cat.yearOfPassing}</td>
                                <td>{cat.currentIndustry}</td>
                                <td>{cat.currentCompanyName}</td>
                                <td>{cat.roleAppliedfor}</td>
                                <td>{cat.fixedCompensation}</td>
                                <td>{cat.variableCompensation}</td>
                                <td>
                                {new Date(cat.createdAt).toLocaleString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                                </td>
                              </tr>
                               ))
                              ) : (
                                <tr>
                                  <td colSpan="15" className="text-center">No locations found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* container-fluid */}
          </div>
        </div>
    )
}

export default page;