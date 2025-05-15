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


function BannerPage() {

   
  // useEffect(() => {
  //   alert('sds')
  // }, []);

  const formRef = useRef(null);
  const [dynamicProductField, setDynamicProductField] = useState([
     
  ]); 
  const [banners, setBanners] = useState([]);  
  const [variantList, setVariantList] = useState([]); 
  const [categoriesVariant, setCategoriesVariant] = useState([])
  
  const bannerImageRef =useRef();
  const listImageRef =useRef();
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    photo: null,
    
    status: "Active",
    dropdownValues: {
      
    },
  });
  const [errors, setErrors] = useState({});
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
  const validate = () => {
    const errors = {}; 
    if (!formData.photo) {
      errors.photo = "file is required.";
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
    formDataToSubmit.append('id', formData._id || "");
    formDataToSubmit.append('title', formData.title ||  "");
    formDataToSubmit.append('subtitle', formData.subtitle || "");
    formDataToSubmit.append('price', formData.price || "");
    formDataToSubmit.append('url', formData.url || "");
    formDataToSubmit.append('status', formData.status);
     

    if (formData.photo) formDataToSubmit.append('photo', formData.photo);
    

    const url = '/api/admin/banner';
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
        setFormData({ id: null, title: '', subtitle:'', url:'', price:'', photo: null,   status: 'Active', dropdownValues: {} });
        toast.success(result.message);
        
        // unselect all selected values
        

        if(bannerImageRef.current){
          bannerImageRef.current = null;
        }
        

      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save banner.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saving banner:', error);
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

 
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/api/admin/banner`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });

      const result = await response.json();
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        fetchBanners(); // Refresh category list
        toast.success(result.message);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete banner.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchBanners = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/banner');
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        setBanners(result.data);   
         

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

  /* useEffect(() => {
    
      if (typeof window !== "undefined") {
        // Initialize Select2
        $(".multiple").select2({
          placeholder: "Select an values",
          allowClear: true,
          multiple: true,
        });
  
       
  
        // Add an onChange event listener to track changes
        $(".multiple").on("change", function () {
          const selectedValues = $(this).val(); // Get selected values
          const name = $(this).attr("name"); // Get dropdown name attribute
  
         
          if(selectedValues.length){
            setCategoriesVariant((preData)=>({
                ...preData,
                [name]:selectedValues
            }))
          }else{
            setCategoriesVariant((preData) => {
              const newData = { ...preData };
              delete newData[name]; 
              return newData;
            });
          } 
         
        });
      }
    
  
    // Cleanup: Remove event listeners on unmount
    return () => {
      if (typeof window !== "undefined") {
        $(".multiple").off("change");
      }
    };
  }, [variantList.length]);
*/
  // const populateSelect = (selectId, options, preSelectedValues = []) => {
  //   const select = $(`select[name="${selectId}"]`);
  //   select.empty(); // Clear existing options
  //   options.forEach((item) => {
  //     select.append(new Option(item.name, item._id));
  //   });
  //   select.val(preSelectedValues).trigger("change");
  // };
  /* function updateFieldInputData(key, e){
    let { name, value , checked} = e.target;  
    if(name.includes("field_type") ){
      name = "field_type"
    }
    if(name == "required"){
      const assignValue = checked?'Yes':"No"; 
      const updatedData = dynamicProductField.map((prevData, i) =>
        i === key ? { ...prevData, [name]:assignValue } : prevData
      );
      setDynamicProductField(updatedData)
      return
    }
    
    // else
    const updatedData = dynamicProductField.map((prevData, i) =>
        i === key ? { ...prevData, [name]: value } : prevData
      );
        console.log(updatedData);
      setDynamicProductField(updatedData)
}


function addModeField(){
  setDynamicProductField([...dynamicProductField,{field_name:'', required:'', field_type:"input", select_value:[]}])
}
  

  function deleteField(index){
    
    const filterData = dynamicProductField.filter((_,i)=> i !=index)
    setDynamicProductField(filterData)
  
  }

  */
 

  function addSelectValue(index){
     
    const filterData = dynamicProductField[index];
    
    let oldSelectValue = filterData.select_value || [];
    if(isEmpty(filterData.adding_value)){
      setErrors((preError)=>({
        ...preError,
        [`adding_value_error_${index}`]: 'required'
      }))
      return
    }else{
        setErrors((preError)=>({
          ...preError,
          [`adding_value_error_${index}`]: ''
        }))
    }
    oldSelectValue.push(filterData.adding_value)
    const updatedData = dynamicProductField.map((prevData, i) =>
      i === index ? { ...prevData, select_value: oldSelectValue,adding_value:'' } : prevData
    ); 
    
    setDynamicProductField(updatedData)
  }

  function deleteSelectValue(index, valueIndex){
    const filterData = dynamicProductField[index]; 
    let oldSelectValue = filterData.select_value || [];
    const removedData = oldSelectValue.filter((item,i)=>i != valueIndex) 
    const updatedData = dynamicProductField.map((prevData, i) =>
      i === index ? { ...prevData, select_value: removedData } : prevData
    ); 
    setDynamicProductField(updatedData)
  }

  function hendleShowCategory(e, id){
    const {checked} = e.target;
    fetch(`${baseUrl}api/admin/update-category-list-status`,{
      method:"PUT",
      body:JSON.stringify({checked, id})
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Network error")
      }
      return response.json();
    }).then((res)=>{
      if(res.status){ 
        toast.success("Updated successfully")
      }
    }).catch((error)=>{
      toast.error("Update failed")
    })
  }

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
                <h4 className="mb-sm-0 font-size-18">Add Banner</h4>
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
                <h4>Banner information </h4>
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
                            placeholder="Enter sub title"
                          />
                          {errors.subtitle && (
                            <span className="text-danger">{errors.subtitle}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Starting Price</label>
                          <input
                            className="form-control"
                            type="number"
                            name="price"
                            
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                          />
                          {errors.price && (
                            <span className="text-danger">{errors.price}</span>
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
                        <div style={{color:'red'}}><span>Note: </span> Image size of  411px (width) × 422px (height) </div>
                      </div>

                      
                       

                      

                       <div className="col-lg-4">
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
              {/* variant end */}
              {/* List of Categories */}
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Sl No.</th>
                          <th>Title</th>
                          <th>Sub Title</th>
                          <th>URL</th>
                          <th>Price</th>
                          <th>Banner Image</th>
                          
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banners.length > 0 ? (
                          banners.map((banners, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{banners.title}</td>
                              <td>{banners.subtitle}</td>
                              <td>{banners.url}</td>
                              <td>{banners.price}</td>
                              
                              <td>
                                {banners.photo != null ?
                                  <img
                                    src={banners.photo}
                                    alt="Banner"
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                    }}
                                  />
                                  : ''}
                              </td>
                              
                              <td><Link href="#" onClick={() => handleEdit(banners)}><i className="fas fa-pencil-alt"></i></Link></td>
                              <td><Link href="#" onClick={() => handleDelete(banners._id)}><i className="fas fa-trash-alt"></i></Link></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No banner found.
                            </td>
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
    </div>
  );
}

export default BannerPage;
