"use client";
import { baseUrl, dateConvertInDateTime, decryptText } from '@/Http/helper';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Page() {
  const [sellers, setSellers] = useState([]);
  const [sellerName, setSellerName] = useState([]);
  const [pagination, setPagination] = useState(null)
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_date: '',
    to_date: '',
    seller_name: '',
    approval_status: ''
  });
  const limit = 10;

  // Fetch sellers data
  const fetchSeller = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/admin-login/api/vendor?${query}`);
      const result = await response.json();
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setSellers(result.data);
        setSellerName(result.sellerName);
        setTotalPages(result.totalPages);
        setPagination(result.pagination)
      } else {
        alert(result.message || 'Failed to fetch sellers.');
      }
    } catch (error) {
      console.error('Error fetching sellers:', error);
      alert('Failed to fetch sellers.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const approvalAdminStatus = async (sellerId, status) => {
    Swal.fire({
          title: "Vendor Approval",
          html: `
           <div style="text-align:left;">
            <label for="status" style="display:block; text-align:left;">Select Status:</label>
            <select id="status" class="swal2-input" style="width: 100%; margin-bottom: 15px;">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option> 
            </select>
    
            <label for="remarks" style="display:block; text-align:left;">Remarks:</label>
            <input id="remarks" class="form-control" placeholder="Enter remarks" autocapitalize="off" style="width: 100%;" />
          </div>
            `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: async (login) => {
            const approvalStatus = document.getElementById('status').value;
            const approvalRemarks = document.getElementById('remarks').value;
            if (!approvalStatus) {
              Swal.showValidationMessage('Please select a approval Status');
              return false;
            }
            if (!approvalRemarks) {
              Swal.showValidationMessage('Please enter remarks');
              return false;
          }
    
          try {
            $('.loader-container').css('display', 'flex')
              const response = await fetch('/admin-login/api/vendor', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sellerId, 
                approvalStatus,
                remarks: approvalRemarks,
                vendorType:'vendorApproval',
              }),
            });
    
            if (!response.ok) {
              throw new Error('Failed to update vendor status');
            }
    
            $('.loader-container').css('display', 'none')
            fetchSeller();
          } catch (error) {
            Swal.showValidationMessage(`Error: ${error.message}`);
            return false;
          }
            
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            
          }
        });
  }

  const changeStatus = async (sellerId, status) => {
    try{
        const response = await fetch('/admin-login/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId, 
          status,
          vendorType:'vendorStatus',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update brand status');
      }
      fetchSeller();

    }catch(error){

    }
  }

  const handleSubmit = (sellerId, status) => {
    e.preventDefault();
    fetchSeller(currentPage, formData);
  };

 
  

  useEffect(() => {
    fetchSeller(currentPage, formData);
  }, [currentPage, formData]);


  
  function paginationFun(page, size, e){
    e.preventDefault();
    setCurrentPage(page)
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">View Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript:void(0);">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="javascript:void(0);">Products</a></li>
                    <li className="breadcrumb-item active">View Product</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Form */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label htmlFor="from_date" className="form-label">From Date</label>
                          <input type="date" id="from_date" name="from_date" value={formData.from_date} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label htmlFor="to_date" className="form-label">To Date</label>
                          <input type="date" id="to_date" name="to_date" value={formData.to_date} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      {/* <div className="col-lg-3">
                        <div className="mb-3">
                          <label htmlFor="seller_name" className="form-label">Select Vendor</label>
                          <select className="form-select" id="seller_name" name="seller_name" value={formData.seller_name} onChange={handleChange}>
                            <option value="">All</option>
                            {sellerName.length > 0 && (
                              sellerName.map((seller, index) => (
                                <option key={index} value={seller._id}>
                                  {seller.name || 'All'}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                      </div> */}
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label htmlFor="approval_status" className="form-label">Approve Status</label>
                          <select className="form-select" id="approval_status" name="approval_status" value={formData.approval_status} onChange={handleChange}>
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-lg-2">
                        <div className="mb-3">
                          <div className="col-sm-auto">
                            <label className="form-label d-lg-block">&nbsp;</label>
                            <button type="submit" className="btn btn-primary">Search</button>
                           
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Sellers List */}
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive fixTableHead"  >
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Sl No.</th>
                        <th>Display Name</th>
                        <th>Mobile No</th>
                        <th>Email</th>
                        <th>Registered Business Name</th>
                        <th>Registered Business Address</th>
                        <th>Password</th>
                        <th>Last Login</th>
                        <th>Status</th>
                        <th>Approval Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellers.length > 0 ? (
                        sellers.map((value, index) => (
                          <tr key={index}>
                            <td>{((pagination.page -1) * pagination.pageSize) + (index+1) }</td>
                            <td><a href={`/admin/vendor/view-vendor/${value._id}`} target='_blank'>{value.name}</a> </td>
                            <td>{value.mobile}</td>
                            <td>{value.email}</td>
                            <td>{value?.sellerBusinessData?.[0]?.business_name || 'N/A'}</td>
                            <td>{value?.sellerBusinessData?.[0]?.business_address || 'N/A'}</td> 
                            <td>{value.show_password? decryptText(value.show_password):''}</td>
                            <td>
                              <div style={{maxWidth:'80px'}}> 
                                  {value.lastloginTimeDate? dateConvertInDateTime(value.lastloginTimeDate):''}
                              </div>
                              </td>
                            <td>
                            {value?.status === 'Active' ? (
                              <Link href={" "} onClick={() => changeStatus(value._id, 'Deactive')} >Active</Link>
                            ) : (
                              <Link href={" "} onClick={() => changeStatus(value._id, 'Active')}>Deactive</Link>
                            )}
                            </td>
                            <td>
                            {value?.approvalStatus === 'Approved' ? (
                              <Link href={" "}>Approved</Link>
                            ) : value?.approvalStatus === 'Rejected' ? (
                              <Link href={" "}>Rejected</Link>
                            ) : (
                              <Link href={" "} onClick={() => approvalAdminStatus(value._id, 'Active')}>Pending</Link>
                             )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="8" className="text-center">No sellers found.</td></tr>
                      )}
                    </tbody>
                  </table>
                                
                
                </div>

                
              </div>

              <div className="fixed-table-pagination">
        <div className="row">
          <div className="col-lg-8"> </div>
          <div className="col-lg-4">
            <div className="pull-right  pagination d-flex">
              
              {pagination && pagination.totalPages>1 ?(
                  <ul className="pagination">

                    
                  <li className={`page-pre ${pagination.page <= 1? "pointer-events-none opacity-50 deactive_btn":""}`}>
                    <Link href="#" onClick={(e)=>{
                      if(pagination.page > 1){ 
                        paginationFun((pagination.page-1),  pagination.pageSize, e)
                      }else{
                        e.preventDefault();
                      }
                    }
                      }> 
                      <i className="fa fa-arrow-left" />
                    </Link>
                  </li>
                  

            {Array.from({length:pagination.totalPages}, (_, i)=>{
                if (Math.abs(pagination.page - (i + 1)) <= 3) {
                  return ( 
                    <li className={`page-number current  ${i} ${pagination.page== (i+1)?'active':''}`} key={i} >
                        <a   href="#"  onClick={(e)=>paginationFun((i+1),  pagination.pageSize, e)}>
                          {i + 1} 
                        </a>
                    </li> 
                  );
                } 
                return null; 
               })} 
                  
                  <li
                      className={`page-next ${pagination.page == pagination.totalPages ? "pointer-events-none opacity-10 deactive_btn" : ""}`}
                    >
                      <Link
                        href="#"
                        onClick={(e) => {
                          if (pagination.page < pagination.totalPages) {
                            paginationFun(parseInt(pagination.page) + 1, pagination.pageSize, e);
                          } else {
                            e.preventDefault();
                          }
                        }}
                      >
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </li>
                  </ul>
              ):null}
             
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
