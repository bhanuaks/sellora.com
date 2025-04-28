"use client";
import Link from 'next/link'
import React, { useState, useEffect} from 'react'
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { baseUrl } from '@/Http/helper';
import  Autocomplete from '../Autocomplete';
import ImageModal from '../brand-list/imageModal';

function page() {
 const [barnds, setBrands] = useState([]);
 const [loading, setLoading] = useState(false);
 const [brandNameList, setBrandNames] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
      const [filePath, setFilePath] = useState("");
      const [fileType, setTileType] = useState("jpg");

 const handleGithubLookup = async (brandId) => {
    Swal.fire({
      title: "Brand Approval",
      html: `
       <div style="text-align:left;">
        <label for="status" style="display:block; text-align:left;">Select Status:</label>
        <select id="status" class="swal2-input" style="width: 100%; margin-bottom: 15px;">
          <option value="2">Pending</option>
          <option value="1">Approved</option>
          <option value="0">Rejected</option> 
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
        const status = document.getElementById('status').value;
        const remarks = document.getElementById('remarks').value;
        if (!status) {
          Swal.showValidationMessage('Please select a status');
          return false;
        }
        if (!remarks) {
          Swal.showValidationMessage('Please enter remarks');
          return false;
      }

      try {
        $('.loader-container').css('display', 'flex')
        const response = await fetch('/admin-login/api/update-brand-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brandId, 
            status,
            remarks,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update brand status');
        }
        $('.loader-container').css('display', 'none')
        fetchBrands();
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
  }; 


  const fetchBrands = async () => {
    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch('/admin-login/api/brand?brand_module=2');
      const result = await response.json();
      $('.loader-container').css('display', 'none')
      if (response.ok) {
        setBrands(result.data);
        setBrandNames(result.brandNameList);
      } else {
        alert(result.message || 'Failed to fetch brand.');
      }
    } catch (error) {
      alert('Failed to fetch brand.');
    }
  };

  useEffect(() => {
    fetchBrands();
  },[]);

  function viewFile(path){
    setFilePath(path)
    setIsOpen(true)
    const splitName = path.split('.');
    setTileType(splitName[splitName.length-1])
  }


    return (
        <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0 font-size-18"> Brand Pending</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="javascript: void(0);"> Dashboard</a></li>
                      <li className="breadcrumb-item"><a href="javascript: void(0);"> Brand</a></li>
                      <li className="breadcrumb-item active">Brand Pending</li>
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
                      <div className="col-lg-4">
                        <div>
                          <div className="mb-3">
                          <Autocomplete brandNameList = {brandNameList}></Autocomplete>
                          </div>
                        </div>
                      </div>
                      {/* <div className="mb-3">
                      <div className="col-sm-auto">
                        <button type="submit" className="btn btn-primary">se</button>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* end card body */}
            </div>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="table-responsive">
                      {/* id="example2" */}
                      <p /><table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Brand Name</th>
                            <th>Owener Information</th>
                            <th>TM Information</th>
                            <th>Seller</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {barnds.length > 0 ? (
                            barnds.map((child, index) => (
                          <tr key={index}>
                            <td>{index +1}</td>
                            <td>
                              <p><b>{child.name}</b></p>
                              <p>Brand Owner : {child.brand_owner}</p>
                              <p><span onClick={()=>viewFile(child.certificate)} style={{color:'#0000ffd6', cursor:"pointer"}}>View Certificate</span>  
                               {/* <i className="fa fa-edit" /> */}
                               </p>
                            </td>
                            <td>
                            <div style={{maxWidth:"200px"}}>
                                <p>Selling  Other Platform : {child.are_you_selling_in_other_platform}</p> 
                                {child.platform_name  && (
                                <p>Plateform Name : {child.platform_name}</p> 
                                )}

                                {child.platform_link && ( 
                                    <p>Store Link: <Link href={child.platform_link} style={{color:'#0000ffd6', cursor:"pointer"}} >{child.platform_link}</Link> </p>
                                )}
                              </div>

                            </td>
                            <td>
                            {child.tm_number && ( 
                              <p>Enter TM Number : {child.tm_number}</p>
                            )}
                            {child.tm_status && ( 
                              <p>TM Status : {child.tm_status}</p>
                            )}
                            {child.tm_class && ( 
                              <p>Enter TM Class : {child.tm_class}</p>
                            )}
                            {child.tm_type && ( 
                              <p>TM Type : {child.tm_type}</p>
                            )}
                            </td>
                            <td>{child.seller_id.name}</td>
                            <td>
                              <select className="form-control" onClick={() => handleGithubLookup(child._id)} name=''>
                                <option>Pending</option>
                              </select>
                            </td>
                            <td>
                            {format(new Date(child.createdAt), 'MMMM dd, yyyy')}
                            </td>
                          </tr>
                          ))
                         ) : (
                          <tr>
                            <td colSpan="7">No brand found</td>
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
        <ImageModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} path={filePath} type={fileType}/>
      </div>
    );
};

export default page;