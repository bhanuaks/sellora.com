"use client";
import $ from 'jquery';
window.$ = $;
window.jQuery = $; 
import "select2";
import "select2/dist/css/select2.min.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function ItemWeightTemplete() {
  const [varients, setVariant] = useState([]);
  const [formData, setFormData] = useState({
    id: null, // Add id to distinguish between create and edit
    name: '',
    photo: null,

    status: 'Active',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // State for success/error messages

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
    if (!formData.name.trim()) newErrors.name = ' Item Weight Name is required.';

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
    formDataToSubmit.append('id', formData._id);
    formDataToSubmit.append('name', formData.name);

    formDataToSubmit.append('status', formData.status);

    const url = '/admin-login/api/variant/item-weight';
    const method = 'POST';

    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        fetchVariant();
        setFormData({ id: null, name: '', photo: null, status: 'Active' });
        toast.success(result.message);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to save  Item Weight.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saving  Item Weight:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (category) => {
    setFormData(category);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this variant?')) return;
    

    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/admin-login/api/variant/item-weight`, {
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
        fetchVariant(); // Refresh category list
        toast.success(result.message);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete  Item Weight.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting  Item Weight:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchVariant = async () => {
    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch('/admin-login/api/variant/item-weight');
      const result = await response.json();
      $('.loader-container').css('display', 'none')

      if (response.ok) {
        setVariant(result.data);
      } else {
        alert(result.message || 'Failed to fetch varients.');
      }
    } catch (error) {
      console.error('Error fetching varients:', error);
      alert('Failed to fetch  Item Weight.');
    }
  };

  useEffect(() => {
    fetchVariant();
    if (typeof window !== "undefined") {
      // Initialize Select2
      $(".multiple").select2({
        minimumResultsForSearch: Infinity, // Hides the search box
      });
    }
  }, []);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Add  Item Weight</h4>
              </div>
            </div>
          </div>
          {/* Add Size Form */}
          {message && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}


            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit} encType="multypart/form-data">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label"> Item Weight (in cm)</label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter  Item Weight Name"
                          />
                          {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )}
                        </div>
                      </div>
                     

                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option>Active</option>
                            <option>Deactive</option>
                          </select>
                        </div>
                      </div>
                      

                      <div className="col-lg-4">
                        <div className="mb-3 py-4">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* List of Categories */}
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th> Item Weight (in cm) Name</th>
                          <th>Status</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {varients.length > 0 ? (
                          varients.map((value, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{value.name}</td>

                              <td><Link href="#" className="active2">{value.status}</Link></td>
                              <td><Link href="#" onClick={() => handleEdit(value)}><i className="fas fa-pencil-alt"></i></Link></td>
                              <td><Link href="#" onClick={() => handleDelete(value._id)}><i className="fas fa-trash-alt"></i></Link></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No categories found.
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

export default ItemWeightTemplete;
