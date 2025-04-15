"use client";  
import { useState, useEffect } from 'react';

import {  toast } from 'react-toastify';
import Link from 'next/link';

function page() {

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
            id: null, 
            name: '',
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
    if (!formData.name.trim()) newErrors.name = 'Category Name is required.';
    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData._id === undefined  && categories.some(cat => cat.name.toLowerCase() === formData.name.toLowerCase())) {
      setMessage({ type: 'error', text: 'Category name must be unique.' });
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formData._id);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('status', formData.status);

    const url = '/api/career/careerCategories';
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
        fetchCategories();
        setFormData({ id: null, name: '', photo: null, status: 'Active' });
        toast.success(result.message);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save category.' });
       
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (category) => {
    setFormData(category);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;


    try {
      $('.loader-container').css('display', 'none')
      const response = await fetch(`/api/career/careerCategories`, {
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
        fetchCategories(); // Refresh category list
        toast.success(result.message);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to delete category.' });
        toast.error(result.message);
      }
    } catch (error) {
      $('.loader-container').css('display', 'none')
      console.error('Error deleting category:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchCategories = async () => {
    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch('/api/career/careerCategories');
      const result = await response.json();
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setCategories(result.data);
      } else {
        alert(result.message || 'Failed to fetch Category.');
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Failed to fetch Category.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);



    return (
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18"> Category</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Category</li>
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
          <form onSubmit={handleSubmit}>

            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Category Name
                        </label>
                        <input className="form-control" type="text"  
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                             />
                            {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )}
                      </div>
                    </div>
                   
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Active/InActive
                        </label>
                        <select className="form-select" 
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            >
                          <option>Active</option>
                          <option>InActive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2">
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
                </div>
              </div>
            </div>
            </form>
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
                        <th>Category Name</th>
                        <th width={15}>Status</th>
                        <th width={10}>Edit</th>
                        <th width={10}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {categories.length > 0 ? (
                          categories.map((cat, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{cat.name}</td>
                              <td>
                                <span className={cat.status === 'Active' ? 'text-success' : 'text-danger'}>
                                  {cat.status}
                                </span>
                              </td>
                              <td>
                                <Link href={'#'} className="btn btn-sm btn-warning" onClick={() => handleEdit(cat)}>
                                  <i className="fas fa-pencil-alt" />
                                </Link>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat._id)}>
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
    </div>
    {/* container-fluid */}
  </div>
</div>

    )
}

export default page;