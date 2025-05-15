"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {  toast } from 'react-toastify';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
// import { FormatPainter } from 'ckeditor5-premium-features';

// import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import dynamic from "next/dynamic";  
const Description = dynamic(() => import('./Description'), { ssr: false });

// import Description from "./Description";

function Page() {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  const [formData, setFormData] = useState({
          id: null,
          categoryId : null,
          locationId : null, 
          jobTitle   : '',
          jobDescription:'',
          skills   : '',
          jobRole  : '',
          location : '',
          aboutTheRole : '',
          aboutTheTeam : '',
          toSucceedInThisRole : '',
          whyWorkWithUs : '',
          status: 'Active',
        });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.categoryId.trim()) newErrors.categoryId = 'Category Name is required.';
      return newErrors;
    if (!formData.locationId.trim()) newErrors.locationId = 'Location Name is required.';
      return newErrors;
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required.';
      return newErrors;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('id', formData.id);
      formDataToSubmit.append('categoryId', formData.categoryId);
      formDataToSubmit.append('locationId', formData.locationId);
      formDataToSubmit.append('jobTitle', formData.jobTitle);
      formDataToSubmit.append('jobDescription', formData.jobDescription);
      formDataToSubmit.append('skills', formData.skills);
      formDataToSubmit.append('jobRole', formData.jobRole);
      formDataToSubmit.append('location', formData.location);
      formDataToSubmit.append('aboutTheRole', formData.aboutTheRole);
      formDataToSubmit.append('aboutTheTeam', formData.aboutTheTeam);
      formDataToSubmit.append('toSucceedInThisRole', formData.toSucceedInThisRole);
      formDataToSubmit.append('whyWorkWithUs', formData.whyWorkWithUs);
      formDataToSubmit.append('status', formData.status);
  
      const url = '/api/career/job';
      const method = 'POST';
  
      try {
        $('.loader-container').css('display', 'flex')
        const response = await fetch(url, {
          method,
          body: formDataToSubmit,
        });
  
        const result = await response.json();
  
        if (response.ok) {
          $('.loader-container').css('display', 'none')
          setMessage({ type: 'success', text: result.message });
          fetchJob();
         
          setFormData({
            id: null,
            categoryId:  '',
            locationId:  '',
            jobTitle: '',
            jobDescription: '',
            skills: '',
            jobRole: '',
            location: '',
            aboutTheRole: '',
            aboutTheTeam: '',
            toSucceedInThisRole: '',
            whyWorkWithUs: '',
            status: 'Active',
        });
          
           toast.success(result.message);
        } else {
          $('.loader-container').css('display', 'none')
          setMessage({ type: 'error', text: result.message || 'Failed to save job.' }); 
        }
      } catch (error) {
        console.error('Error saving job:', error);
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        toast.error(`Error: ${error.message}`);
      }
    };
  
    const handleEdit = (job) => {
          setFormData({
            id: job._id,
            categoryId: job.categoryId?._id || '',
            locationId: job.locationId?._id || '',
            jobTitle: job.jobTitle || '',
            jobDescription: job.jobDescription || '',
            skills: job.skills || '',
            jobRole: job.jobRole || '',
            location: job.location || '',
            aboutTheRole: job.aboutTheRole || '',
            aboutTheTeam: job.aboutTheTeam || '',
            toSucceedInThisRole: job.toSucceedInThisRole || '',
            whyWorkWithUs: job.whyWorkWithUs || '',
            status: job.status || 'Active',
        });
    };
  
     // Handle CKEditor Change
  // const handleEditorChange = (field, data) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: data,
  //   }));
  // };
  
    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this job?')) return;
  
  
      try {
        $('.loader-container').css('display', 'none')
        const response = await fetch(`/api/career/job`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        });
  
        const result = await response.json();
  
        if (response.ok) {
          $('.loader-container').css('display', 'none')
          setMessage({ type: 'success', text: result.message });
          fetchJob();
          toast.success(result.message);
        } else {
          $('.loader-container').css('display', 'none')
          setMessage({ type: 'error', text: result.message || 'Failed to delete job.' });
          toast.error(result.message);
        }
      } catch (error) {
        $('.loader-container').css('display', 'none')
        console.error('Error deleting job:', error);
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        toast.error(`Error: ${error.message}`);
      }
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

  const fetchJob  =  async () => {
    try {
      const response = await fetch("/api/career/job");
      const result = await response.json();
      if (response.ok) {
        setJobs(result.data);
      } else {
        alert(result.message || "Failed to fetch job.");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      alert("Failed to fetch job.");
    }
  }


  useEffect(() => {
    fetchCategories();
    fetchLocations();
    fetchJob();
  }, []);

  

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
        {message && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}


            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select  className="form-control" 
                          name="categoryId"
                          value={formData.categoryId || ""}
                          onChange={handleChange}
                        >
                          <option value={""}>Select</option>
                          {categories.map((cat, index) => (
                            <option key={index} value={cat._id}>{cat.name}</option>
                          ))}
                        </select>
                        {errors.categoryId && (
                            <span className="text-danger">{errors.categoryId}</span>
                          )}
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Location</label>
                        <select  className="form-control"
                          name="locationId"
                          value={formData.locationId || ""}
                          onChange={handleChange}
                        >
                          <option value={""}>Select</option>
                          {locations.map((lan, index) => (
                            <option key={index} value={lan._id}>{lan.name}</option>
                          ))}
                        </select>
                        {errors.locationId && (
                            <span className="text-danger">{errors.locationId}</span>
                          )}
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Job Title</label>
                        <input type="text" className="form-control" name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                        />
                        {errors.jobTitle && (
                            <span className="text-danger">{errors.jobTitle}</span>
                          )}
                      </div>
                    </div>
                      
                    <div className="col-lg-12">
                    <label className="form-label">Job Description</label>
                    <Description formData={formData} setFormData={setFormData} name={"jobDescription"} />
                     

                   
                        

                    </div>

                    <div className="col-lg-12">
                    <label className="form-label">Skills Required
                    </label>

                    <Description formData={formData} setFormData={setFormData} name={"skills"} />
                     
                     
                    </div>

                    <div className="col-lg-12">
                    <label className="form-label">Job Role</label>
                    <Description formData={formData} setFormData={setFormData} name={"jobRole"} />

                    
                    </div>

                    <div className="col-lg-12">
                    <label className="form-label"> location</label>
                    <Description formData={formData} setFormData={setFormData} name={"location"} />

                   
                    </div>

                    <div className="col-lg-12">
                    <label className="form-label">About the Role</label>
                    <Description formData={formData} setFormData={setFormData} name={"aboutTheRole"} />

                   
                    </div>

                    <div className="col-lg-12">
                    <label className="form-label">About the team                    </label>
                    <Description formData={formData} setFormData={setFormData} name={"aboutTheTeam"} />

                    
                    </div>

                    <div className="col-lg-12">
                    <label className="form-label">To succeed in this role, you should have the following
                    </label>
                    <Description formData={formData} setFormData={setFormData} name={"toSucceedInThisRole"} />

                   
                    </div>

                    <div className="col-lg-12">
                    <label className="form-label">Why work with us?                    </label>
                    <Description formData={formData} setFormData={setFormData} name={"whyWorkWithUs"} /> 
                    </div>
                    
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Active/Deactive</label>
                        <select className="form-select" name="status"
                          value={formData?.status || ""}
                          onChange={handleChange}
                        >
                          <option value={"Active"}>Active</option>
                          <option value={"InActive"}>InActive</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <div className="mb-3">
                        <label className="form-label">&nbsp;</label>
                        <div className="col-sm-auto">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                </div>
                {/* end card body */}
              </div>
            </div>
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
                        <th>Category Name</th>
                        <th>Location</th>
                        <th>Job Title</th>
                        <th width={15}>Status</th>
                        <th width={10}>Edit</th>
                        <th width={10}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {jobs.length > 0 ? (
                          jobs.map((job, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{job.categoryId?.name}</td> 
                              <td>{job.locationId?.name}</td>
                              <td>{job.jobTitle}</td>
                              <td>
                                <span className={job.status === 'Active' ? 'text-success' : 'text-danger'}>
                                  {job.status}
                                </span>
                              </td>
                              <td>
                                <Link href={'#'} className="btn btn-sm btn-warning" onClick={() => handleEdit(job)}>
                                  <i className="fas fa-pencil-alt" />
                                </Link>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(job._id)}>
                                  <i className="far fa-trash-alt" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">No categories found</td>
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
      {/* container-fluid */}
    </div>
  );
}

export default Page;
