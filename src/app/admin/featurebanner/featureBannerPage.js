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


function FeatureBannerPage() {

   
  

  const formRef = useRef(null);
  const [dynamicProductField, setDynamicProductField] = useState([
     
  ]); 
  const [banners, setBanners] = useState([]);  
  const [variantList, setVariantList] = useState([]); 
  const [categoriesVariant, setCategoriesVariant] = useState([])
  
  const bannerImageRef =useRef();
  const bannerImageRefRight =useRef();
  const bannerImageRefRight1 =useRef();
  const bannerImageRefRight2 =useRef();
  const bannerImageRefRight3 =useRef();
  const bannerImageRefRight4 =useRef();
  const listImageRef =useRef();
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    subtitle:"",
    url:"",
    photo: null,
    title_r:"",
    url_r:"",
    photo_r:null,
    title_m1:"",
    url_m1:"",
    photo_m1:null,
    title_m2:"",
    url_m2:"",
    photo_m2:null,
    title_m3:"",
    url_m3:"",
    photo_m3:null,
    title_m4:"",
    url_m4:"",
    photo_m4:null

    
  });
  const [formDataRight, setFormDataRight] = useState({
    id: null,
    title: "",
    subtitle: "",
    url:"",
    photo: null,
    
  });
  const [formDataRight1, setFormDataRight1] = useState({
    id: null,
    title: "",
    subtitle: "",
    url:"",
    photo: null,
    
  });
  const [formDataRight2, setFormDataRight2] = useState({
    id: null,
    title: "",
    subtitle: "",
    url:"",
    photo: null,
    
  });
  const [formDataRight3, setFormDataRight3] = useState({
    id: null,
    title: "",
    subtitle: "",
    url:"",
    photo: null,
    
  });
  const [formDataRight4, setFormDataRight4] = useState({
    id: null,
    title: "",
    subtitle: "",
    url:"",
    photo: null,
    
  });
  const [errors, setErrors] = useState({});
  const [errorsRight, setErrorsRight] = useState({});
  const [errorsRight1, setErrorsRight1] = useState({});
  const [errorsRight2, setErrorsRight2] = useState({});
  const [errorsRight3, setErrorsRight3] = useState({});
  const [errorsRight4, setErrorsRight4] = useState({});

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
    
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const handleChangeRight = (e) => {
    const { name, value, files } = e.target;
    
      setFormDataRight((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrorsRight((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleChangeRight1 = (e) => {
    const { name, value, files } = e.target;
    
      setFormDataRight1((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrorsRight1((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const handleChangeRight2 = (e) => {
    const { name, value, files } = e.target;
    
      setFormDataRight2((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrorsRight2((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const handleChangeRight3 = (e) => {
    const { name, value, files } = e.target;
    
      setFormDataRight3((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrorsRight3((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const handleChangeRight4 = (e) => {
    const { name, value, files } = e.target;
    
      setFormDataRight4((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value,
      }));
    

    setErrorsRight4((prevErrors) => ({ ...prevErrors, [name]: '' }));
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
  const validateRight1 = () => {
    const errorsRight1 = {};

    // Validation checks
    if (!formDataRight1.photo) {
      errorsRight1.photo = "Banner image is required.";
    }
    return errorsRight1;
  }
  const validateRight2 = () => {
    const errorsRight2 = {};

    // Validation checks
    if (!formDataRight2.photo) {
      errorsRight2.photo = "Banner image is required.";
    }
    return errorsRight2;
  }
  const validateRight3 = () => {
    const errorsRight3 = {};

    // Validation checks
    if (!formDataRight3.photo) {
      errorsRight3.photo = "Banner image is required.";
    }
    return errorsRight3;
  }
  const validateRight4 = () => {
    const errorsRight4 = {};

    // Validation checks
    if (!formDataRight4.photo) {
      errorsRight4.photo = "Banner image is required.";
    }
    return errorsRight4;
  }
  

  const handleSubmitRight = async (e) => {
    //e.preventDefault(); 
    setErrorsRight({})
    
    const validationErrors = validateRight();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRight(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formDataRight._id);
    formDataToSubmit.append('title', formDataRight.title || "");
    //formDataToSubmit.append('subtitle', formDataRight.subtitle || "");
    formDataToSubmit.append('pid', 2);
    formDataToSubmit.append('url', formDataRight.url || "");
    
     

    if (formDataRight.photo) formDataToSubmit.append('photo', formDataRight.photo);
    

    const url = '/api/admin/featureBannerRight';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();
      fetchBannersRight();
        if(bannerImageRefRight.current){
          bannerImageRefRight.current = null;
        }
      /* if (response.ok) {
         
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
        */
    } catch (error) {
      console.error('Error saving right banner:', error);
      //setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      //toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight1 = async (e) => {
    //e.preventDefault(); 
    setErrorsRight1({})
    
    const validationErrors = validateRight1();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRight1(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formDataRight1._id);
    formDataToSubmit.append('title', formDataRight1.title || "");
    //formDataToSubmit.append('subtitle', formDataRight.subtitle || "");
    formDataToSubmit.append('pid', 3);
    formDataToSubmit.append('url', formDataRight1.url || "");
    
     

    if (formDataRight1.photo) formDataToSubmit.append('photo', formDataRight1.photo);
    

    const url = '/api/admin/featureBannerRight1';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();
      fetchBannersRight1();
        if(bannerImageRefRight1.current){
          bannerImageRefRight1.current = null;
        }
     /* if (response.ok) {
         
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
        */
    } catch (error) {
      console.error('Error saving right banner:', error);
      //setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      //toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight2 = async (e) => {
    //e.preventDefault(); 
    setErrorsRight2({})
    
    const validationErrors = validateRight2();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRight2(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formDataRight2._id);
    formDataToSubmit.append('title', formDataRight2.title || "");
    //formDataToSubmit.append('subtitle', formDataRight.subtitle || "");
    formDataToSubmit.append('pid', 4);
    formDataToSubmit.append('url', formDataRight2.url || "");
    
     

    if (formDataRight2.photo) formDataToSubmit.append('photo', formDataRight2.photo);
    

    const url = '/api/admin/featureBannerRight2';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();
      fetchBannersRight2();
        if(bannerImageRefRight2.current){
          bannerImageRefRight2.current = null;
        }
      /* if (response.ok) {
         
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
        */
    } catch (error) {
      console.error('Error saving right banner:', error);
      //setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      //toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight3 = async (e) => {
    //e.preventDefault(); 
    setErrorsRight3({})
    
    const validationErrors = validateRight3();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRight3(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formDataRight3._id);
    formDataToSubmit.append('title', formDataRight3.title || "");
    //formDataToSubmit.append('subtitle', formDataRight.subtitle || "");
    formDataToSubmit.append('pid', 5);
    formDataToSubmit.append('url', formDataRight3.url || "");
    
     

    if (formDataRight3.photo) formDataToSubmit.append('photo', formDataRight3.photo);
    

    const url = '/api/admin/featureBannerRight3';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();
      fetchBannersRight3();
        if(bannerImageRefRight3.current){
          bannerImageRefRight3.current = null;
        }
      /* if (response.ok) {
         
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
        */
    } catch (error) {
      console.error('Error saving right banner:', error);
      //setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      //toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight4 = async (e) => {
    //e.preventDefault(); 
    setErrorsRight4({})
    
    const validationErrors = validateRight4();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRight4(validationErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formDataRight4._id);
    formDataToSubmit.append('title', formDataRight4.title || "");
    //formDataToSubmit.append('subtitle', formDataRight.subtitle || "");
    formDataToSubmit.append('pid', 6);
    formDataToSubmit.append('url', formDataRight4.url || "");
    
     

    if (formDataRight4.photo) formDataToSubmit.append('photo', formDataRight4.photo);
    

    const url = '/api/admin/featureBannerRight4';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();
      fetchBannersRight4();
        if(bannerImageRefRight4.current){
          bannerImageRefRight4.current = null;
        }
      /* if (response.ok) {
         
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
        */
    } catch (error) {
      console.error('Error saving right banner:', error);
      //setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      //toast.error(`Error: ${error.message}`);
    }
  };

  
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
    formDataToSubmit.append('url', formData.url || "");
    if (formData.photo) formDataToSubmit.append('photo', formData.photo);
    if (formDataRight.photo) formDataToSubmit.append('photo_r', formDataRight.photo);
    formDataToSubmit.append('title_r', formDataRight.title || "");
    formDataToSubmit.append('url_r', formDataRight.url || ""); 
    if (formDataRight1.photo) formDataToSubmit.append('photo_m1', formDataRight1.photo);
    formDataToSubmit.append('title_m1', formDataRight1.title || "");
    formDataToSubmit.append('url_m1', formDataRight1.url || "");
    if (formDataRight2.photo) formDataToSubmit.append('photo_m2', formDataRight2.photo);
    formDataToSubmit.append('title_m2', formDataRight2.title || "");
    formDataToSubmit.append('url_m2', formDataRight2.url || "");
    if (formDataRight3.photo) formDataToSubmit.append('photo_m3', formDataRight3.photo);
    formDataToSubmit.append('title_m3', formDataRight3.title || "");
    formDataToSubmit.append('url_m3', formDataRight3.url || "");
     if (formDataRight4.photo) formDataToSubmit.append('photo_m4', formDataRight4.photo);
    formDataToSubmit.append('title_m4', formDataRight4.title || "");
    formDataToSubmit.append('url_m4', formDataRight4.url || "");

    const url = '/api/admin/featureBannerLeft';
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
        //setFormData({ id: null, title: '', subtitle:'',  url:'', pid:'', photo: null,   status: 'Active', dropdownValues: {} });
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
      const response = await fetch('/api/admin/featureBannerLeft');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormData({
            ...result.data[0],
            
          });
          setFormDataRight({
            title:result.data[0].title_r,
            url:result.data[0].url_r,
            photo:result.data[0].photo_r
            
          });
          setFormDataRight1({
            title:result.data[0].title_m1,
            url:result.data[0].url_m1,
            photo:result.data[0].photo_m1
            
          });
          setFormDataRight2({
            title:result.data[0].title_m2,
            url:result.data[0].url_m2,
            photo:result.data[0].photo_m2
            
          });
          setFormDataRight3({
            title:result.data[0].title_m3,
            url:result.data[0].url_m3,
            photo:result.data[0].photo_m3
            
          });
          setFormDataRight4({
            title:result.data[0].title_m4,
            url:result.data[0].url_m4,
            photo:result.data[0].photo_m4
            
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
      const response = await fetch('/api/admin/featureBannerRight');
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
  const fetchBannersRight1 = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/featureBannerRight1');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormDataRight1({
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
  const fetchBannersRight2 = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/featureBannerRight2');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormDataRight2({
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
  const fetchBannersRight3 = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/featureBannerRight3');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormDataRight3({
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
  const fetchBannersRight4 = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/featureBannerRight4');
      const result = await response.json();
      
      //console.log(result.data)
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        //setBanners(result.data);   
        setFormDataRight4({
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
                <h4 className="mb-sm-0 font-size-18">Update Feature Banner</h4>
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
          <form onSubmit={handleSubmit} encType="multypart/form-data" ref={formRef}>
            <div className="col-lg-12">
            
              <div className="card">
                <div className="card-body">
                <h6>Left Feature Banner information </h6>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          
                          <textarea name="title" onChange={handleChange} className="form-control" maxlength="50"  rows="2" cols="50" value={formData.title}>{formData.title}</textarea>
                          
                          { /* <input
                            className="form-control"
                            type="text"
                            name="title"
                            
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                          />   
                          */ }                      
                          {errors.title && (
                            <span className="text-danger">{errors.title}</span>
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
                          {formData.photo && typeof formData.photo ==="string" ?( 
                          <a href={`${baseUrl}${formData.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errors.photo && (
                            <span className="text-danger">{errors.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 920x920px</div>
                      </div>

                      
                       

                      

                       

                      </div>

                    </div>
                  
                </div>
               
              </div>

              

              <div className="card">
                <div className="card-body">
                <h6>Middle 1 Feature Banner information </h6>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          
                          <textarea name="title" onChange={handleChangeRight1} className="form-control" maxlength="50"  rows="2" cols="50" value={formDataRight1.title}>{formDataRight1.title}</textarea>
                          
                          {errorsRight1.title && (
                            <span className="text-danger">{errorsRight1.title}</span>
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
                            
                            value={formDataRight1.url}
                            onChange={handleChangeRight1}
                            placeholder="Enter URL"
                          />
                          {errorsRight1.url && (
                            <span className="text-danger">{errorsRight1.url}</span>
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
                            onChange={handleChangeRight1}
                            ref={bannerImageRefRight1}
                          />
                          {formDataRight1.photo && typeof formDataRight1.photo ==="string" ?( 
                          <a href={`${baseUrl}${formDataRight1.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errorsRight1.photo && (
                            <span className="text-danger">{errorsRight1.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 450x229px</div>
                      </div>

                      
                       

                      

                       
                    </div>
                  
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                <h6>Middle 2 Feature Banner information </h6>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <textarea name="title" onChange={handleChangeRight2} className="form-control" maxlength="50"  rows="2" cols="50" value={formDataRight2.title}>{formDataRight2.title}</textarea>
                          
                          {errorsRight2.title && (
                            <span className="text-danger">{errorsRight2.title}</span>
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
                            
                            value={formDataRight2.url}
                            onChange={handleChangeRight2}
                            placeholder="Enter URL"
                          />
                          {errorsRight2.url && (
                            <span className="text-danger">{errorsRight2.url}</span>
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
                            onChange={handleChangeRight2}
                            ref={bannerImageRefRight2}
                          />
                          {formDataRight2.photo && typeof formDataRight2.photo ==="string" ?( 
                          <a href={`${baseUrl}${formDataRight2.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errorsRight2.photo && (
                            <span className="text-danger">{errorsRight2.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 450x229px</div>
                      </div>

                      
                       

                      

                       
                    </div>
                  
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                <h6>Middle 3 Feature Banner information </h6>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          
                          <textarea name="title" onChange={handleChangeRight3} className="form-control" maxlength="50"  rows="2" cols="50" value={formDataRight3.title}>{formDataRight3.title}</textarea>
                          
                          {errorsRight3.title && (
                            <span className="text-danger">{errorsRight3.title}</span>
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
                            
                            value={formDataRight3.url}
                            onChange={handleChangeRight3}
                            placeholder="Enter URL"
                          />
                          {errorsRight3.url && (
                            <span className="text-danger">{errorsRight3.url}</span>
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
                            onChange={handleChangeRight3}
                            ref={bannerImageRefRight3}
                          />
                          {formDataRight3.photo && typeof formDataRight3.photo ==="string" ?( 
                          <a href={`${baseUrl}${formDataRight3.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errorsRight3.photo && (
                            <span className="text-danger">{errorsRight3.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 450x229px</div>
                      </div>

                      
                       

                      

                       
                    </div>
                  
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                <h6>Middle 4 Feature Banner information </h6>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <textarea name="title" onChange={handleChangeRight4} className="form-control" maxlength="50"  rows="2" cols="50" value={formDataRight4.title}>{formDataRight4.title}</textarea>
                          
                          
                          {errorsRight4.title && (
                            <span className="text-danger">{errorsRight4.title}</span>
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
                            
                            value={formDataRight4.url}
                            onChange={handleChangeRight4}
                            placeholder="Enter URL"
                          />
                          {errorsRight4.url && (
                            <span className="text-danger">{errorsRight4.url}</span>
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
                            onChange={handleChangeRight4}
                            ref={bannerImageRefRight4}
                          />
                          {formDataRight4.photo && typeof formDataRight4.photo ==="string" ?( 
                          <a href={`${baseUrl}${formDataRight4.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errorsRight4.photo && (
                            <span className="text-danger">{errorsRight4.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 450x229px</div>
                      </div>

                      
                       

                      

                       
                    </div>
                  
                </div>
              </div>
              


              
              <div className="card">
                <div className="card-body">
                <h6>Right Feature Banner information </h6>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <textarea name="title" onChange={handleChangeRight} className="form-control" maxlength="50"  rows="2" cols="50" value={formDataRight.title}>{formDataRight.title}</textarea>
                          
                          
                          {errorsRight.title && (
                            <span className="text-danger">{errorsRight.title}</span>
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
                          {formDataRight.photo && typeof formDataRight.photo ==="string" ?( 
                          <a href={`${baseUrl}${formDataRight.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errorsRight.photo && (
                            <span className="text-danger">{errorsRight.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 920x920px</div>
                      </div>

                      
                       

                      

                       
                    </div>
                  
                </div>
              </div>

              <div className="col-lg-12">
                       <div className="mt-4">
                        
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                        </div>
                      </div>
                       <br />     
              
                        

              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default FeatureBannerPage;
