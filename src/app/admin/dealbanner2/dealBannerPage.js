"use client";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
// import { toast } from 'react-toastify';
import "parsleyjs";
import { baseUrl, isEmpty } from "@/Http/helper";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";


function DealBannerPage() {

   
  

  const formRef = useRef(null);
  const imgRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  
  const bannerImageRef =useRef();
 
  const [formData, setFormData] = useState({
    id: null, 
    url:"",
    photo: null,
    
  });
 
  const [errors, setErrors] = useState({});
    

  useEffect(() => {
    if (typeof window !== "undefined") { 
      window.$ = window.jQuery = $; 
      if (formRef.current) {
        $(formRef.current).parsley();  
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
      if(name === 'photo'){
        const file = files[0];

        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          alert('Please select a JPG or PNG image.');
          return;
        }

        if(file){
           const reader = new FileReader();
           reader.onloadend=()=>{
            setPreviewUrl(reader.result);
           }
          reader.readAsDataURL(file);
        }

        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'photo' ? files[0] : value,
        })); 
         return

      }


      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
 
  const validate = () => {
    const errors = {};

    // Validation checks
    if (!formData.photo) {
      errors.photo = "Banner image is required.";
    }
    if (isEmpty(formData.url)) {
      errors.photo = "required.";
    }
    return errors;
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrors({})
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formData._id);  
    formDataToSubmit.append('url', formData.url || ""); 
    if (formData.photo) formDataToSubmit.append('photo', formData.photo);
    

    const url = '/api/admin/deal/update-deal-banner-2';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();

      if (response.ok) {
         
         if(!result.success && result.data.status_code && result.data.status_code == 400){
            setErrors(result.data.errors);
            $('.loader-container').css('display', 'none');
            return
         }

        $('.loader-container').css('display', 'none')
       
        fetchBanners();
        setFormData({ id: null, title: '', subtitle:'',  url:'', pid:'', photo: null,   status: 'Active', dropdownValues: {} });
        toast.success(result.message);
        
        // unselect all selected values
        

        if(bannerImageRef.current){
          bannerImageRef.current = null;
        }
        

      } else {
        $('.loader-container').css('display', 'none')
        
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saving left banner:', error);
     
      toast.error(`Error: ${error.message}`);
    }
  };

 

 

 
  
  

  const fetchBanners = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/deal/update-deal-banner-2');
      const result = await response.json();
      
      
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
       
        setFormData({
            ...result.data, 
          });

      } else {
        $('.loader-container').css('display', 'none') 
        alert(result.message || 'Failed to fetch banners.');
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      alert('Failed to fetch banners.');
    }
  };
 
   

 useEffect(()=>{
  fetchBanners() 
 },[])

  
 

  

  return (
    <div className="main-content">
      <style>
        {`
        .mainTitle {
            font-family: 'Open Sans';
            text-align: center;
            margin: 30px auto;
          }

          .fieldInput {
            display: block;
            // margin: 70px auto;
            width: 100%;
            // height: 35px;
            position: relative;
            // box-shadow: 0 4px 20px 0 rgba(0,0,0,0.09);
            // border-radius: 35px;
            // overflow: hidden;
            .form-input {
              width: 200px;
              background: none;
              border: none;
              padding: 12px 20px;
              font-size: 9px;
              color: #6A7C92;
              &:focus {
                outline: none;
              }
            }
            .form-submit {
              font-size: 12px;
              background: #fc7137 !important;
              color: #fff !important;  
              position: absolute;
              right: 0;
              top: 0;
              width: 70px;
              height: 38px;
              // border-radius: 17px;
              border: none;
              background: none;
              box-shadow: 5px -2px 81px 1px rgba(0,0,0,0.09);
              cursor: pointer;
            }
          }

          .footer {
            font-family: 'Open Sans';
            text-align: center;
            font-size: 12px;
            color: #6A7C92;
          }

          .select_values {
                   border: 1px solid #b2c3a7;
                    background: #b2c3a7;
                    padding: 0px 5px;
                    margin: 2px 2px;
                    border-radius: 5px;
            }
                    .select_values span {
                    border-left: 1px solid;
                    padding-left: 5px;
                    color: red;
                    font-weight: 600;
                    cursor:pointer;
                }
                     
        `}
      </style>

      <ToastContainer 
                      position="top-center"
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



      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Update Deal Banner</h4>
              </div>
            </div>
          </div>
          {/* Add Category Form */}
         
          <div className="row">
            <div className="col-lg-12">
            <form onSubmit={handleSubmit} encType="multypart/form-data" ref={formRef}>
              <div className="card">
                <div className="card-body">
                <h4>Deal Banner </h4>
                  <hr></hr> 
                    <div className="row">
                      
                      
                       <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Banner Image</label>
                          <input
                            className="form-control"
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            ref={bannerImageRef}
                          />
                          {/* {formData.photo && typeof formData.photo ==="string" ?( 
                          <a href={`${baseUrl}${formData.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''} */}
                          {errors.photo && (
                            <span className="text-danger">{errors.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> Image size of 1600px (width) × 350px (height) </div>
                      </div>
                      
                      
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">URL</label>
                          <input
                            className="form-control"
                            type="text"
                            name="url"
                            
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="Enter URL"
                          />
                          {errors.url && (
                            <span className="text-danger">{errors.url}</span>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          {(()=>{
                            let imageUrl = null;
                            if(previewUrl){ 
                                imageUrl = previewUrl;
                            }else if(formData?.photo){
                                imageUrl = formData?.photo; 
                            }
                            return <img src={imageUrl}
                           style={{maxWidth:'100%'}}
                           ref={imgRef}
                           />
                          })()}
                           
                          
                        </div>
                      </div>
                     

                      
                       

                      

                       <div className="col-lg-12">
                       <div className="mt-4">
                        
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        </div>
                      </div>

                      </div>

                    </div>
                  
                </div>
                </form>
              </div> 
              
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default DealBannerPage;
