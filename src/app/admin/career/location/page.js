"use client";  
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {  toast } from 'react-toastify';


function page() {
  const [locations, setLocations] = useState([]);
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
    if (!formData.name.trim()) newErrors.name = 'Location Name is required.';
    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData._id === undefined && locations.some(cat => cat.name.toLowerCase() === formData.name.toLowerCase())) {
    
      setMessage({ type: 'error', text: 'Location name must be unique.' });
      return;
    }
    

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formData._id);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('status', formData.status);

    const url = '/api/career/location';
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
        fetchlocations();
        setFormData({ id: null, name: '', photo: null, status: 'Active' });
        toast.success(result.message);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save location.' });
       
      }
    } catch (error) {
      console.error('Error saving location:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (location) => {
    setFormData(location);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this location?')) return;


    try {
      $('.loader-container').css('display', 'none')
      const response = await fetch(`/api/career/location`, {
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
        fetchlocations(); // Refresh category list
        toast.success(result.message);
      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to delete location.' });
        toast.error(result.message);
      }
    } catch (error) {
      $('.loader-container').css('display', 'none')
      console.error('Error deleting location:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchlocations = async () => {
    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch('/api/career/location');
      const result = await response.json();
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setLocations(result.data);
      } else {
        alert(result.message || 'Failed to fetch Location.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('Failed to fetch Location.');
    }
  };

  useEffect(() => {
    fetchlocations();
  }, []);

    return (
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18"> Location</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Location</li>
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
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Location Name
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
               
                    <div className="col-lg-4">
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
              </form>
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
                        <th width={80}>Sl No.</th>
                        <th>Location </th>
                        <th width={15}>Status</th>
                        <th width={10}>Edit</th>
                        <th width={10}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {locations.length > 0 ? (
                          locations.map((cat, index) => (
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
                            <td colSpan="5" className="text-center">No locations found</td>
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