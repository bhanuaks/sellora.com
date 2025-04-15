"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";


function page() {

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childcategories, setChildCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    subCategoryId: '',
    childCategoryName: '',
    status: 'Active',
    category_id: '',
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({}); // State for tracking errors

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.subCategoryId.trim()) {
      newErrors.subCategoryId = 'Sub Category name is required.';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'Category is required.';
    }
    if (!formData.childCategoryName) {
      newErrors.childCategoryName = 'Child Category is required.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare form data for submission
    const formDataToSubmit = {
      id: formData.id,
      category_id: formData.category_id,
      subCategoryId: formData.subCategoryId,
      childCategoryName: formData.childCategoryName,
      status: formData.status,
    };

    const url = '/admin-login/api/child-category'; // Assuming you have an API endpoint for subcategory
    const method = 'POST';

    try {
      $('.loader-container').css('display', 'flex')

      const response = await fetch(url, {
        method,
        body: JSON.stringify(formDataToSubmit),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        $('.loader-container').css('display', 'none')
        fetchChildCategories();
        setMessage({ type: 'success', text: result.message });
        fetchCategories();
        setFormData({ category_id: '', subCategoryId: '', status: 'Active', childCategoryName: '' }); // Reset form data
        setErrors({});
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save child category.' });
      }
    } catch (error) {
      $('.loader-container').css('display', 'none')
      console.error('Error saving child category:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
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
  };

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
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/admin-login/api/sub-category-list?category_id=${categoryId}`);
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none')
        setSubCategories(result.data);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to fetch sub categories.' });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage({ type: 'error', text: 'Failed to fetch sub categories.' });
    }
  };

  const fetchChildCategories = async () => {
    try {
      const response = await fetch('/admin-login/api/child-category');
      const result = await response.json();
      if (response.ok) {
        setChildCategories(result.data);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to fetch subcategories.' });
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  const handleEdit = (childCategory) => {
    setFormData({
      id: childCategory._id,
      category_id: childCategory.category_id?._id || '',
      subCategoryId: childCategory.subCategoryId?._id || '',
      childCategoryName: childCategory.childCategoryName || '',
      status: childCategory.status || 'Active',
    });
  
    // Fetch subcategories for the selected category
    if (childCategory.category_id?._id) {
      fetchSubCategories(childCategory.category_id._id);
    }
  };
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this childcategory?')) {
      try {
        const response = await fetch(`/admin-login/api/child-category`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        });

        const data = await response.json();
        if (data.success) {
          console.log(data);
          setMessage({ type: 'success', text: data.message });
          fetchChildCategories(); // Re-fetch subcategories after deletion
        } else {
          setMessage({ type: 'error', text: data.message });
        }
      } catch (error) {
        console.error('Error deleting subcategory:', error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchChildCategories();
  }, []);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18"> Add Child Category</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);"> Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);"> Category</a>
                    </li>
                    <li className="breadcrumb-item active">Add Child Category</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* end page title */}
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
                        <div>
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
                              className="form-select"
                            >
                              <option value={" "}>Select...</option>
                              {categories.map((category, index) => (
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
                      </div>
                      <div className="clearfix" />
                      <div className="col-lg-4">
                        <div>
                          <div className="mb-3">
                            <label
                              htmlFor="example-text-input"
                              className="form-label"
                            >
                              Select Sub Category{" "}
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
                      </div>
                      <div className="col-lg-4">
                        <div>
                          <div className="mb-3">
                            <label
                              htmlFor="example-text-input"
                              className="form-label"
                            >
                              Child Category Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=""
                              name='childCategoryName'
                              value={formData.childCategoryName}
                              onChange={handleChange}
                            />
                            {errors.childCategoryName && (
                              <span className="text-danger">{errors.childCategoryName}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-lg-4">
                        <div>
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
                              <option value="Active">Active</option>
                              <option value="Deactive">Deactive</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <div className="col-sm-auto">
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
                {/* end card body */}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="table-responsive">
                      {/* id="example2" */}
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th width={50}>Sl No.</th>
                            <th width={200}> Category Name</th>
                            <th width={200}> Sub Category Name</th>
                            <th width={200}> Child Category Name</th>
                            <th width={15}>Status</th>
                            <th width={10}>Edit</th>
                            <th width={50}>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {childcategories.length > 0 ? (
                            childcategories.map((child, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                
                                <td>{child.category_id ? child.category_id.name : ''}</td>
                                <td>{child.subCategoryId ? child.subCategoryId.subCategoryName : ''}</td>
                                <td>{child.childCategoryName}</td>
                                <td>
                                  <a href="#" className="active2" >
                                    {child.status}
                                  </a>
                                </td>
                                <td>
                                  <a href="#" onClick={() => handleEdit(child)}>
                                    <i className="fas fa-pencil-alt" />
                                  </a>
                                </td>
                                <td>
                                  <a href="#" onClick={() => handleDelete(child._id)}>
                                    <i className="far fa-trash-alt" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6">No subcategories found</td>
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