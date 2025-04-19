'use client'
import { dateValidateConverter } from '@/Http/helper';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';


function page() {
    
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childcategories, setChildCategories] = useState([]);
  const [formData, setFormData] = useState({
      id: null,
      category_id: '',
      subCategoryId: '',
      childCategoryId: '',
      couponName: '',
      couponValue: '',
      couponType: '',
      validFrom: '',
      validTo: '',
      minAmount: '',
      description: '',
      status: 'Active',
      
    });
    const [couponList, setCouponList] = useState([])
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  
  const fetchCategories = async () => {
    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch('/admin-login/api/category-list');
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none')
        setCategories(result.data);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to fetch categories.' });
      }
    } catch (error) {
      $('.loader-container').css('display', 'none')
      console.error('Error fetching categories:', error);
      setMessage({ type: 'error', text: 'Failed to fetch categories.' });
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      if(categoryId){
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/admin-login/api/sub-category-list?category_id=${categoryId}`);
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none')
        setSubCategories(result.data);
        setChildCategories([])
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to fetch sub categories.' });
      }
    }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage({ type: 'error', text: 'Failed to fetch sub categories.' });
    }
  };

  const fetchChildCategories = async (subCategoryId) => {
    try {
      if(subCategoryId){
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/admin-login/api/child-category-list?subCategory_id=${subCategoryId}`);
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none')
        setChildCategories(result.data);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to fetch subcategories.' });
      }
    }
    } catch (error) {
      $('.loader-container').css('display', 'none')
      console.error('Error fetching subcategories:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category_id") {
      fetchSubCategories(value);
    }
    if (name === "subCategoryId") {
      fetchChildCategories(value);
    }

    
  };
  function generateCoupon() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let coupon = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      coupon += characters[randomIndex];
      
    }
    //return coupon;
    
    setFormData((prev) => ({
      ...prev,
      couponName: coupon,
    }));

    
  }
  
  
  function isValidDateRange(fromDateStr, toDateStr) {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
  
    // Check if both dates are valid
    if (isNaN(fromDate) || isNaN(toDate)) {
      return false; // Invalid date format
    }
  
    return toDate >= fromDate;
  }
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`; // Format: DD-MM-YYYY
  }

  const validate = () => {
    const errors = {};

    // Validation checks
    if (!formData.couponName) {
      errors.couponName = "Coupon code is required.";
    }
    
    
    if (!formData.couponType) {
      errors.couponType = "Coupon type is required.";
    }
    if (!formData.couponValue) {
      errors.couponValue = "Coupon value is required.";
    }
    if (!formData.validFrom) {
      errors.validFrom = "Coupon value is required.";
    }
    if (!formData.validTo) {
      errors.validTo = "Coupon value is required.";
      
    } else {
      if (isValidDateRange(formData.validFrom, formData.validTo)) { } else {
        
        errors.validTo = "Expiry date must be greater than or equal to start date";
      }
    }
    
    return errors;
  }


  const handleSubmit = async (e) => {
      e.preventDefault(); 
      setErrors({})
      //console.log(formData)
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('id', formData._id);
      formDataToSubmit.append('coupon_code', formData.couponName || "");
      formDataToSubmit.append('category_id', formData.category_id || "");
      formDataToSubmit.append('subcategory_id', formData.subCategoryId || "");
      formDataToSubmit.append('childcategory_id', formData.childCategoryId || "");
      formDataToSubmit.append('coupon_type', formData.couponType || "");
      formDataToSubmit.append('coupon_value', formData.couponValue || "");
      formDataToSubmit.append('min_amount', formData.minAmount || "");
      formDataToSubmit.append('valid_from', formData.validFrom || "");
      formDataToSubmit.append('valid_to', formData.validTo || "");
      formDataToSubmit.append('description', formData.description || "");
      formDataToSubmit.append('status', formData.status || "");
      
  
      const url = '/api/admin/coupon';
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
          fetchCoupon();
          setFormData({ id: null, couponName: '', category_id:'',  subCategoryId:'', childCategoryId:'', validFrom: '',   status: 'Active', validTo:'', couponType:'', couponValue:'', description:'',minAmount:'' });
          toast.success(result.message);
          
          // unselect all selected values
          
  
          
          
  
        } else {
          $('.loader-container').css('display', 'none')
          setMessage({ type: 'error', text: result.message || 'Failed to save coupon.' });
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error saving coupon:', error);
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        toast.error(`Error: ${error.message}`);
      }
    };
  
const fetchCoupon = async () => {
  try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/admin/coupon');
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        setCouponList(result.data);   
         

      } else {
        $('.loader-container').css('display', 'none') 
        alert(result.message || 'Failed to fetch coupons.');
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      alert('Failed to fetch coupons.');
    }

}
const handleEdit = async (category) => {
   await fetchCategories()
   await fetchSubCategories(category.category_id?._id)
   await fetchChildCategories(category.subcategory_id?._id) 
  //console.log(category)

  let fromDate = formatDate(category.valid_from)
  let toDate = formatDate(category.valid_to)
  setFormData({ _id: category._id, couponName: category.coupon_code, category_id:category.category_id?._id,  subCategoryId:category.subcategory_id?._id, childCategoryId:category.childcategory_id?._id, validFrom: fromDate,   status: category.status, validTo:toDate, couponType:category.coupon_type, couponValue:category.coupon_value, description:category.description, minAmount:category.min_amount });
  

  

};
const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;

    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/api/admin/coupon`, {
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
        fetchCoupon(); // Refresh category list
        toast.success(result.message);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete coupon.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCoupon()  
    fetchCategories();

      
    }, []);
  
  return (
        <>
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
        
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18"> Coupons</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Coupons</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                <form onSubmit={handleSubmit} encType="multypart/form-data">
                  <div className="row">
                    <div className="col-lg-4">
                    <div className="row">
                    <div className="col-lg-9">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          {" "}
                          Coupons Code<span className='text-danger'>*</span>
                        </label>
                        <input 
                        name="couponName"
                        value={formData.couponName}
                        onChange={handleChange}
                        className="form-control" type="text" />
                        {errors.couponName && (
                              <span className="text-danger">{errors.couponName}</span>
                            )}
                      </div>
                      </div>
                      <div className="col-lg-3">
                      <div className="mb-3">      
                      <label
                          htmlFor="example-text-input"
                          className="form-label mt-3"
                        >
                          {" "}
                          
                        </label>
                      <button type="button" className="btn btn-primary" onClick={generateCoupon}>
                            Generate
                          </button>
                          </div>
                          </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Select Category
                        </label>
                        <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="form-select">
                          <option>Select...</option>
                          {categories && categories.map((category, index) => (
                                <option  value={category._id} key={index}>
                                  {category.name}
                                </option>
                              ))}
                        </select>
                        {errors.category_id && (
                              <span className="text-danger">{errors.category_id}</span>
                            )}
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Select Sub Category
                        </label>
                        <select
                              name="subCategoryId"
                              value={formData.subCategoryId}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value={" "}>Select...</option>
                              {subcategories.map((subcategory, index) => (
                                <option value={subcategory._id} key={index}>
                                  {subcategory.subCategoryName}
                                </option>
                              ))}
                            </select>
                            {errors.subCategoryId && (
                              <span className="text-danger">{errors.subCategoryId}</span>
                            )}
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                          
                        >
                          Select Child Category
                        </label>
                        <select
                              name="childCategoryId"
                              value={formData.childCategoryId}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value={" "}>Select...</option>
                              {childcategories.map((childcategory, index) => (
                                <option value={childcategory._id} key={index}>
                                  {childcategory.childCategoryName}
                                </option>
                              ))}
                            </select>
                            {errors.childCategoryId && (
                              <span className="text-danger">{errors.childCategoryId}</span>
                            )}
                      </div>
                    </div>
                    
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Coupon Type<span className='text-danger'>*</span>
                        </label>
                        <select 
                        name="couponType"
                        value={formData.couponType}
                        onChange={handleChange}
                        className="form-select">
                          <option value="">Select</option>
                          <option value="1">Amount</option>
                          <option value="2">Percentage(%)</option>
                        </select>
                        {errors.couponType && (
                              <span className="text-danger">{errors.couponType}</span>
                            )}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          {" "}
                          Value (Amount or Percentage(%))<span className='text-danger'>*</span>
                        </label>
                        <input 
                        name="couponValue"
                        value={formData.couponValue}
                        onChange={handleChange}
                        className="form-control" type="number" />
                      {errors.couponValue && (
                              <span className="text-danger">{errors.couponValue}</span>
                            )}
                      </div>
                      
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          {" "}
                          Min. Amount
                        </label>
                        <input 
                        name="minAmount"
                        value={formData.minAmount}
                        onChange={handleChange}
                        className="form-control" type="number" />
                        {errors.minAmount && (
                              <span className="text-danger">{errors.minAmount}</span>
                            )}
                      </div>
                    </div>
                    
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Start Date<span className='text-danger'>*</span>
                        </label>
                        <input 
                        name="validFrom"
                        value={formData.validFrom}
                        onChange={handleChange}
                        className="form-control" type="date" />
                        {errors.validFrom && (
                              <span className="text-danger">{errors.validFrom}</span>
                            )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Expiry Date<span className='text-danger'>*</span>
                        </label>
                        <input 
                        name="validTo"
                        value={formData.validTo}
                        onChange={handleChange}
                        className="form-control" type="date" />
                        {errors.validTo && (
                              <span className="text-danger">{errors.validTo}</span>
                            )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          className="textarea2"
                          placeholder="FREEDOM Sale - Apply Coupon FREEDOM23 & Get Upto 20% Off (price inclusive of discount)"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          maxLength={150}
                        />
                        {errors.description && (
                              <>
                              <span className="text-danger">{errors.description}</span>
                              <br></br>
                              </>
                            )}
                            <p className='text-danger'>Max 150 characters only</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Active/Deactive
                        </label>
                        <select 
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-select">
                          <option>Active</option>
                          <option>Deactive</option>
                        </select>
                        {errors.status && (
                              <span className="text-danger">{errors.status}</span>
                            )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          &nbsp;
                        </label>
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
              </div>
            </div>
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
                        <th width={80}>Sl. No.</th>
                        <th>Coupons Code</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Child Category</th>
                        <th>Coupon Type</th>
                        <th>Value</th>
                        <th>Min. Amount</th>
                        <th>Start Date</th>
                        <th>Expiry Date</th>
                        <th>Description</th>
                        <th width={15}>Status</th>
                        <th width={10}>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {couponList && couponList.length > 0 ? (
                          couponList.map((couponList, index) => (
                            <tr key={index}>
                      
                      <td>{index + 1}</td>
                        <td>{couponList.coupon_code}</td>
                        <td>{couponList.category_id?.name}</td>
                        <td>{couponList.subcategory_id?.subCategoryName}</td>
                        <td>{couponList.childcategory_id?.childCategoryName}</td>
                        <td>{couponList.coupon_type == 1 ? 'Amount':'Percentage'}</td>
                        <td>{couponList.coupon_value}{couponList.coupon_type == 1 ? '':'%'}</td>
                        <td>{couponList?.min_amount}</td>
                        <td>{dateValidateConverter(couponList.valid_from)}</td>
                        <td>{dateValidateConverter(couponList.valid_to)}</td>
                        <td>{couponList.description}</td>
                        <td>{couponList.status}</td>
                        
                        <td><Link href="#" onClick={() => handleEdit(couponList)}><i className="fas fa-pencil-alt"></i></Link></td>
                              <td><Link href="#" onClick={() => handleDelete(couponList._id)}><i className="fas fa-trash-alt"></i></Link></td>
                            </tr>
                    ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No coupon found.
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
    {/* container-fluid */}
  </div>
</div>
</>

    )
}

export default page;