"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Page() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    const [formData, setFormData] = useState({
        id :null,
        subCategoryName: '',
        status: 'Active',
        category_id: '',
    });
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({}); // State for tracking errors

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!formData.subCategoryName.trim()) {
            newErrors.subCategoryName = 'Sub Category name is required.';
        }
        if (!formData.category_id) {
            newErrors.category_id = 'Category is required.';
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
            id: formData._id,
            category_id: formData.category_id,
            subCategoryName: formData.subCategoryName,
            status: formData.status,
        };

        const url = '/admin-login/api/subcategory'; // Assuming you have an API endpoint for subcategory
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

                fetchSubCategories();
                setMessage({ type: 'success', text: result.message });
                fetchCategories();
                setFormData({ subCategoryName: '', status: 'Active', category_id: '' }); // Reset form data
                setErrors({});
            } else {
                $('.loader-container').css('display', 'none') 
                setMessage({ type: 'error', text: result.message || 'Failed to save subcategory.' });
            }
        } catch (error) {
            console.error('Error saving subcategory:', error);
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            console.error('Error fetching categories:', error);
            setMessage({ type: 'error', text: 'Failed to fetch categories.' });
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await fetch('/admin-login/api/subcategory');
            const result = await response.json();
            if (response.ok) {
                setSubCategories(result.data);
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to fetch subcategories.' });
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };
    const handleEdit = (subcategory) => {
        setFormData({
            ...subcategory,
            category_id: subcategory.category_id?._id || '', // Set the category ID
        });
    };
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            try {
                const response = await fetch(`/admin-login/api/subcategory`, {
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
                    fetchSubCategories(); // Re-fetch subcategories after deletion
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
        fetchSubCategories();
    }, []);

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* Page Title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Add Sub Category</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Category</a>
                                        </li>
                                        <li className="breadcrumb-item active">Add Sub Category</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Display message */}
                    {message && (
                        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Form */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            {/* Category Selection */}
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor="category_id" className="form-label">Select Category</label>
                                                    <select
                                                        className="form-select"
                                                        name="category_id"
                                                        value={formData.category_id}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select a category</option>
                                                        {categories.length > 0 ? (
                                                            categories.map((category) => (
                                                                <option key={category._id} value={category._id}>
                                                                    {category.name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">No categories found</option>
                                                        )}
                                                    </select>
                                                    {errors.category_id && <span className="text-danger">{errors.category_id}</span>}
                                                </div>
                                            </div>

                                            {/* Subcategory Name */}
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor="subCategoryName" className="form-label">Sub Category Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="subCategoryName"
                                                        value={formData.subCategoryName}
                                                        onChange={handleChange}
                                                        placeholder="Enter subcategory name"
                                                    />
                                                    {errors.subCategoryName && <span className="text-danger">{errors.subCategoryName}</span>}
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor="status" className="form-label">Status</label>
                                                    <select
                                                        className="form-select"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Deactive">Deactive</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th width={50}>Sl No.</th>
                                                        <th width={300}>Category Name</th>
                                                        <th width={500}>Sub Category Name</th>
                                                        <th width={15}>Status</th>
                                                        <th width={10}>Edit</th>
                                                        <th width={60}>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subcategories.length > 0 ? (
                                                        subcategories.map((subcategory, index) => (
                                                            <tr key={subcategory._id}>
                                                                <td>{index + 1}</td>
                                                                <td>{subcategory.category_id && subcategory.category_id.name ? subcategory.category_id.name : 'No category'}</td>
                                                                <td>{subcategory.subCategoryName}</td>
                                                                <td>
                                                                    <Link href="#" className={subcategory.status.toLowerCase()}>
                                                                        {subcategory.status}
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link href="#" onClick={() => handleEdit(subcategory)}>
                                                                        <i className="fas fa-pencil-alt" />
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link href="#" onClick={() => handleDelete(subcategory._id)}>
                                                                        <i className="far fa-trash-alt" />
                                                                    </Link>
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
            </div>
        </div>
    );
}

export default Page;
