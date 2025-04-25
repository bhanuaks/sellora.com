"use client";
import Link from 'next/link'
import { useState, useEffect, useContext, Suspense  } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
// import jwtDecode from "jwt-decode";
// import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from '@/app/(website)/contaxtData/contextData';
import { decodeJwt } from '@/Http/helper';

const JobApplyComponent = () => {
  const { globalData } = useContext(AppContext)
  const [jobTitles, setJobTitle] = useState('');
  const searchParams = useSearchParams(); 
  const jobTitle = searchParams.get("jobTitle") || "";
  const router  = useRouter();
  const [formData, setFormData] = useState({
                        uploadResume: '',
                        name        : '',
                        email       : '',
                        phoneNumber : '',
                        totalExperience : '',
                        gender      : '',
                        currentLocation : '',
                        qualification : '',
                        collegeName : '',
                        yearOfPassing : '',
                        currentIndustry : '',
                        roleAppliedfor: '',
                        fixedCompensation : '',
                        currentCompanyName: '',
                        variableCompensation: '',
                        categorySlug : '',
                        jobSlug : '',
                        userId : ''
                });

  const [errors, setErrors] = useState({});
  
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      const categorySlug  = searchParams.get("jobCategory") || "";
      const jobSlug      = searchParams.get("job") || "";

      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      const userId = getUserIdFromToken();
      formDataToSubmit.append("userId", userId);
      formDataToSubmit.append("categorySlug", categorySlug);
      formDataToSubmit.append("jobSlug", jobSlug);
      
      

      try {
        $('.loader-container').css('display', 'flex')
        const response = await fetch("/api/career/job-apply", {
          method: "POST",
          body: formDataToSubmit,
        });
  
        const result = await response.json();
  
        if (response.ok) {
          
          setFormData({
            uploadResume: "",
            name: "",
            email: "",
            phoneNumber: "",
            totalExperience: "",
            gender: "",
            currentLocation: "",
            qualification: "",
            collegeName: "",
            yearOfPassing: "",
            currentIndustry: "",
            roleAppliedfor: "",
            fixedCompensation: "",
            currentCompanyName: '',
            variableCompensation: "",
            categorySlug : '',
            jobSlug : '',
            userId : ''
          });

          toast.success(result.message || "Job application submitted successfully!");
        } else {
          toast.error(result.message || "Failed to submit job application.");
        }

      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }

    };

    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      if (name === "uploadResume") {
        const file = files[0];
        if (file) {
          const allowedExtensions = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
          const maxSize = 5 * 1024 * 1024; // 5MB
  
          if (!allowedExtensions.includes(file.type)) {
            setErrors((prev) => ({ ...prev, uploadResume: "Only PDF or Word files are allowed." }));
            return;
          } else if (file.size > maxSize) {
            setErrors((prev) => ({ ...prev, uploadResume: "File size should not exceed 5MB." }));
            return;
          }
          setErrors((prev) => ({ ...prev, uploadResume: "" }));
          setFormData((prev) => ({ ...prev, uploadResume: file }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };
    
    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Name is required.";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address.";
      }
      if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
      if (!formData.yearOfPassing.match(/^\d{4}$/) || formData.yearOfPassing < 1900 || formData.yearOfPassing > new Date().getFullYear()) {
        newErrors.yearOfPassing = `Enter a valid year.`;
      }
      if (!formData.totalExperience.trim()) {
        newErrors.totalExperience = "Total Experience (in years) is required";
      }
      if (!formData.gender.trim()) {
        newErrors.gender = "Gender is required.";
      }
     
      if (!formData.currentLocation.trim()) {
        newErrors.currentLocation = "Current location is required .";
      }
      if (!formData.qualification.trim()) {
        newErrors.qualification = "Qualification is required .";
      }
      if (!formData.collegeName.trim()) {
        newErrors.collegeName = "College name is required .";
      }
      if (!formData.fixedCompensation.trim()) {
        newErrors.fixedCompensation = "Fixed compensation is required .";
      }
      if (!formData.uploadResume) newErrors.uploadResume = "Resume is required.";
  
      return newErrors;
    };

  useEffect(() => {

    const token = sessionStorage.getItem('careerToken');
      if (!token) {
        router.push("/consumer/candidate-login");
      }

    if (jobTitle) {
      setJobTitle(jobTitle);
    }
  }, [jobTitle]);

  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("careerToken"); 
    const decodedToken = decodeJwt(token)
    // if (!token) return null; // If no token is found, return null
    // const decodedToken = jwt.decode(token);
    return decodedToken.userId;
   
};

  return (
    <div className="rts-register-area job-apply-sectin">
  <div className="container">
     <ToastContainer 
            position="top-right"
            autoClose={3000}  
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    <div className="row">
      <div className="col-lg-12">
        <div className="discription-content job-apply-heading">
          <h1> {jobTitles ? `Applying to ${jobTitles}` : ''} </h1>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12">
        <div className="registration-wrapper-1 job-apply-wrapper mb--20 mt--10">
          <div className="main-register fl-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="mrl_20 mb--20 mt--20 job-form-ml">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="custom-form">
                          <form
                            onSubmit={handleSubmit}
                            className="registration-form job-apply-form"
                          >
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  <label>
                                    Upload Resume{" "}
                                    <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  <div
                                    className="input-group file-input-group"
                                    data-controller="file-input" 
                                  >
                                     <input
                                      className="form-control"
                                      type="text"
                                      placeholder="No file selected"
                                      readOnly
                                      value={formData.uploadResume ? formData.uploadResume.name : ""}
                                    />
                                     <input
                                          type="file"
                                          className="form-control"
                                          id="customFile"
                                          data-target="file-input.input"
                                          data-action="file-input#display"
                                          name="uploadResume"
                                          onChange={handleChange} 
                                        />
                                    <div className="input-group-append">
                                      <label className="btn choose-filebtn mb-0" htmlFor="customFile">
                                        Choose file...
                                      </label>
                                    </div>
                                    
                                  </div>
                                  
                                  {errors.uploadResume && (
                                      <span className="text-danger">{errors.uploadResume}</span>
                                    )}
                                </div>
                              </div>
                            </div>
                          
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  <label>
                                    {" "}
                                    Name <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  <input type="text" placeholder=""
                                     name="name"
                                     value={formData.name}
                                     onChange={handleChange}
                                  />
                                  {errors.name && (
                                    <span className="text-danger">{errors.name}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Email <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input type="email" placeholder=""
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                  />
                                  {errors.email && (
                                    <span className="text-danger">{errors.email}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Phone Number <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""

                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                  />
                                  {errors.phoneNumber && (
                                    <span className="text-danger">{errors.phoneNumber}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Total Experience (in years){" "}
                                    <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="totalExperience"
                                    value={formData.totalExperience}
                                    onChange={handleChange}
                                  />
                                   {errors.totalExperience && (
                                    <span className="text-danger">{errors.totalExperience}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  <label>
                                    Gender <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  <select 
                                      name="gender"
                                      value={formData.gender}
                                      onChange={handleChange}
                                  >
                                    <option value={''}>-- Please Select Gender--</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>other</option>
                                  </select>
                                  {errors.gender && (
                                    <span className="text-danger">{errors.gender}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Current Location
                                    <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="currentLocation"
                                    value={formData.currentLocation}
                                    onChange={handleChange}
                                  />
                                   {errors.currentLocation && (
                                    <span className="text-danger">{errors.currentLocation}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Qualification<span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                  />
                                   {errors.qualification && (
                                    <span className="text-danger">{errors.qualification}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    College Name<span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="collegeName"
                                    value={formData.collegeName}
                                    onChange={handleChange}
                                  />
                                  {errors.collegeName && (
                                    <span className="text-danger">{errors.collegeName}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Year Of Passing{" "}
                                    <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="yearOfPassing"
                                    value={formData.yearOfPassing}
                                    onChange={handleChange}
                                  />
                                  {errors.yearOfPassing && (
                                    <span className="text-danger">{errors.yearOfPassing}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>Current Industry</label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="currentIndustry"
                                    value={formData.currentIndustry}
                                    onChange={handleChange}
                                  />
                                  {errors.currentIndustry && (
                                    <span className="text-danger">{errors.currentIndustry}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>Current Company Name</label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="currentCompanyName"
                                    value={formData.currentCompanyName}
                                    onChange={handleChange}
                                  />
                                  {errors.currentCompanyName && (
                                    <span className="text-danger">{errors.currentCompanyName}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>Role Applied for </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="roleAppliedfor"
                                    value={formData.roleAppliedfor}
                                    onChange={handleChange}
                                  />
                                  {errors.roleAppliedfor && (
                                    <span className="text-danger">{errors.roleAppliedfor}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>
                                    Fixed Compensation
                                    <span className="star">*</span>
                                  </label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="fixedCompensation"
                                    value={formData.fixedCompensation}
                                    onChange={handleChange}
                                  />
                                  {errors.fixedCompensation && (
                                    <span className="text-danger">{errors.fixedCompensation}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label>Variable Compensation</label>
                                </div>
                                <div className="col-lg-9">
                                  {" "}
                                  <input
                                    type="text"
                                    id="mobile_code"
                                    placeholder=""
                                    name="variableCompensation"
                                    value={formData.variableCompensation}
                                    onChange={handleChange}
                                  />
                                  {errors.variableCompensation && (
                                    <span className="text-danger">{errors.variableCompensation}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="input-wrapper job-input-wrapper">
                              <div className="row align-items-center">
                                <div className="col-lg-3">
                                  {" "}
                                  <label className="mob-none">&nbsp;</label>
                                </div>
                                <div className="col-lg-9">
                                  <button className="rts-btn btn-primary jon-apply-btn">
                                    Submit
                                  </button>
                                </div>
                              </div>
                             
                            </div>
                          </form>
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
    </div>
  </div>
</div>

  )
}


function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobApplyComponent />
    </Suspense>
  );
}
export default page