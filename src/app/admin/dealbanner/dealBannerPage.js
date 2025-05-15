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

    const imgRef2 = useRef(null);
  const [previewUrl2, setPreviewUrl2] = useState(null);

  const [dynamicProductField, setDynamicProductField] = useState([
     
  ]); 
  const [banners, setBanners] = useState([]);  
  const [variantList, setVariantList] = useState([]); 
  const [categoriesVariant, setCategoriesVariant] = useState([])
  
  const bannerImageRef =useRef();
  const bannerImageRefRight =useRef();
  const listImageRef =useRef();
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    subtitle:"",
    url:"",
    photo: null,
    
  });
  const [formDataRight, setFormDataRight] = useState({
    id: null,
    title: "",
    subtitle: "",
    url:"",
    photo: null,
    
  });
  const [errors, setErrors] = useState({});
  const [errorsRight, setErrorsRight] = useState({});
  const [message, setMessage] = useState(null); // State for success/error messages

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
  const handleChangeRight = (e) => {
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
            setPreviewUrl2(reader.result);
           }
          reader.readAsDataURL(file);
        }

        setFormDataRight((prevData) => ({
          ...prevData,
          [name]: name === 'photo' ? files[0] : value,
        })); 
         return

      }


      setFormDataRight((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrorsRight((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const validate = () => {
    const errors = {};

    // Validation checks
    if (!formData.photo) {
      errors.photo = "Banner image is required.";
    }
    return errors;
  }
  const validateRight = () => {
    const errorsRight = {};

    // Validation checks
    if (!formDataRight.photo) {
      errorsRight.photo = "Banner image is required.";
    }
    return errorsRight;
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
    formDataToSubmit.append('title', formData.title || "");
    formDataToSubmit.append('subtitle', formData.subtitle || "");
    formDataToSubmit.append('pid', 1);
    formDataToSubmit.append('url', formData.url || "");
    
     

    if (formData.photo) formDataToSubmit.append('photo', formData.photo);
    

    const url = '/api/admin/dealBannerLeft';
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
        setMessage({ type: 'success', text: result.message });
        fetchBanners();
        setFormData({ id: null, title: '', subtitle:'',  url:'', pid:'', photo: null,   status: 'Active', dropdownValues: {} });
        toast.success(result.message);
        
        // unselect all selected values
        

        if(bannerImageRef.current){
          bannerImageRef.current = null;
        }
        

      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save left banner.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saving left banner:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight = async (e) => {
    e.preventDefault(); 
    setErrorsRight({})
    
    const validationErrors = validateRight();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRight(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formDataRight._id);
    formDataToSubmit.append('title', formDataRight.title || "");
    formDataToSubmit.append('subtitle', formDataRight.subtitle || "");
    formDataToSubmit.append('pid', 2);
    formDataToSubmit.append('url', formDataRight.url || "");
    
     

    if (formDataRight.photo) formDataToSubmit.append('photo', formDataRight.photo);
    

    const url = '/api/admin/dealBannerRight';
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
            setErrorsRight(result.data.errors);
            $('.loader-container').css('display', 'none');
            return
         }

        $('.loader-container').css('display', 'none')
        setMessage({ type: 'success', text: result.message });
        fetchBannersRight();
        setFormDataRight({ id: null, title: '', subtitle: '',  url:'', pid:'', photo: null,   status: 'Active', dropdownValues: {} });
        toast.success(result.message);
        
        // unselect all selected values
        

        if(bannerImageRefRight.current){
          bannerImageRefRight.current = null;
        }
        

      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save right banner.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saving right banner:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (category) => {
   
    
    setFormData({
      ...category,
      // dropdownValues: { 
      // },
    }); 

    

  };

 
  
  

  const fetchBanners = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/dealBannerLeft');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormData({
            ...result.data[0],
            // dropdownValues: { 
            // },
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
const fetchBannersRight = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/dealBannerRight');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormDataRight({
            ...result.data[0],
            // dropdownValues: { 
            // },
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
  fetchBannersRight()
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
          {message && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}


            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
            <form onSubmit={handleSubmit} encType="multypart/form-data" ref={formRef}>
              <div className="card">
                <div className="card-body">
                <h4>Left Deal Banner information </h4>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <input
                            className="form-control"
                            type="text"
                            name="title"
                            
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                          />
                          {errors.title && (
                            <span className="text-danger">{errors.title}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4">
                      <div className="mb-3">
                          <label className="form-label">Sub Title</label>
                          <input
                            className="form-control"
                            type="text"
                            name="subtitle"
                            
                            value={formData.subtitle}
                            onChange={handleChange}
                            placeholder="Enter Sub title"
                          />
                          {errors.subtitle && (
                            <span className="text-danger">{errors.subtitle}</span>
                          )}
                        </div>
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
                        <div style={{color:'red'}}><span>Note: </span> Image size of 740px (width) × 350px (height) </div>
                      </div>

                      
                       
                      <div className="col-lg-12"></div>

                      <div className="col-lg-6">
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

              

              
              


              <form onSubmit={handleSubmitRight} encType="multypart/form-data" ref={formRef}>
              <div className="card">
                <div className="card-body">
                <h4>Right Deal Banner information </h4>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <input
                            className="form-control"
                            type="text"
                            name="title"
                            
                            value={formDataRight.title}
                            onChange={handleChangeRight}
                            placeholder="Enter title"
                          />
                          {errorsRight.title && (
                            <span className="text-danger">{errorsRight.title}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Sub Title</label>
                          <input
                            className="form-control"
                            type="text"
                            name="subtitle"
                            
                            value={formDataRight.subtitle}
                            onChange={handleChangeRight}
                            placeholder="Enter Sub title"
                          />
                          {errorsRight.subtitle && (
                            <span className="text-danger">{errorsRight.subtitle}</span>
                          )}
                        </div>
                      </div>
                      
                      
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">URL</label>
                          <input
                            className="form-control"
                            type="text"
                            name="url" 
                            value={formDataRight.url}
                            onChange={handleChangeRight}
                            placeholder="Enter URL"
                          />
                          {errorsRight.url && (
                            <span className="text-danger">{errorsRight.url}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Banner Image</label>
                          <input
                            className="form-control"
                            type="file"
                            name="photo"
                            onChange={handleChangeRight}
                            ref={bannerImageRefRight}
                          />
                          {/* {formDataRight.photo && typeof formDataRight.photo ==="string" ?( 
                          <a href={`${baseUrl}${formDataRight.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''} */}
                          {errorsRight.photo && (
                            <span className="text-danger">{errorsRight.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> Image size of 740px (width) × 350px (height) </div>
                      </div>
 


                      <div className="col-lg-12"></div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          {(()=>{
                            let imageUrl = null;
                            if(previewUrl2){ 
                                imageUrl = previewUrl2;
                            }else if(formDataRight?.photo){
                                imageUrl = formDataRight.photo; 
                            }
                            return <img src={imageUrl}
                           style={{maxWidth:'100%'}}
                           ref={imgRef2}
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
    
  );
}

export default DealBannerPage;
