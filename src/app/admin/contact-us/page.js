'use client'
import { dateValidateConverter } from '@/Http/helper';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';


function page() {
    
  
  const [couponList, setCouponList] = useState([])
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  
  
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`; // Format: DD-MM-YYYY
  }

  
const fetchContactUs = async () => {
  try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/api/front/contact-us');
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        setCouponList(result.data);   
         

      } else {
        $('.loader-container').css('display', 'none') 
        alert(result.message || 'Failed to fetch contact us.');
      }
    } catch (error) {
      console.error('Error fetching contact us:', error);
      alert('Failed to fetch contact us.');
    }

}

const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact us?')) return;

    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/api/front/contact-us`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });

      const result = await response.json();
      //console.log(result)
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        fetchContactUs(); // Refresh category list
        toast.success(result.message);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete contact us.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting contact us:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchContactUs()  
    

      
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
            <h4 className="mb-sm-0 font-size-18"> Contact Us</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Contact Us</li>
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
                <div className="table-responsive">
                  {/* id="example2" */}
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width={80}>Sl. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Subject</th>
                        <th>Feedback</th>
                        <th>Message</th>
                        
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {couponList && couponList.length > 0 ? (
                          couponList.map((couponList, index) => (
                            <tr key={index}>
                      
                      <td>{index + 1}</td>
                        <td>{couponList.name}</td>
                        <td>{couponList.email}</td>
                        <td>{couponList.mobile}</td>
                        <td>{couponList.subject}</td>
                        <td>{couponList.feedback}</td>
                        <td>{couponList.message}</td>
                        <td><Link href="#" onClick={() => handleDelete(couponList._id)}><i className="fas fa-trash-alt"></i></Link></td>
                            </tr>
                    ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No record found.
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