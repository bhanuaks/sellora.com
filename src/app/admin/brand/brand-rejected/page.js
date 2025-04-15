"use client";

import Link from 'next/link'
import React, { useState, useEffect} from 'react'
import { format } from 'date-fns';
import  Autocomplete from '../Autocomplete';
import ImageModal from '../brand-list/imageModal';

function page() {
  const [barnds, setBrands] = useState([]);
  const [brandNameList, setBrandNames] = useState([]);
   const [modalIsOpen, setIsOpen] = useState(false);
       const [filePath, setFilePath] = useState("");
       const [fileType, setTileType] = useState("jpg");

  const fetchBrands = async () => {
    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch('/admin-login/api/brand?brand_module=0');
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
                  <h4 className="mb-sm-0 font-size-18"> Brand Rejected</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="javascript: void(0);"> Dashboard</a></li>
                      <li className="breadcrumb-item"><a href="javascript: void(0);"> Brand</a></li>
                      <li className="breadcrumb-item active">Brand Rejected</li>
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
                            <th>TM  Information</th>
                            <th>Seller</th>
                            <th>Status</th>
                            <td>Date</td>
                          </tr>
                        </thead>
                        <tbody>
                        {barnds.length > 0 ? (
                            barnds.map((child, index) => (
                          <tr key={index}>
                            <td>{index +1}</td>
                            <td>
                              <p>{child.name}</p>
                              <p>Brand Owner : {child.brand_owner}</p>
                             <p><span onClick={()=>viewFile(child.certificate)} style={{cursor:"pointer"}}>Brand File</span>  
                               {/* <i className="fa fa-edit" /> */}
                               </p>
                            </td>
                            <td>
                              <p>Selling  Other Platform : {child.are_you_selling_in_other_platform}</p>
                              <p>Plateform Name : {child.platform_name}</p>
                              <p>Store Link <Link href={child.platform_link}><i className="fa fa-edit" /></Link> </p>
                            </td>
                            <td>
                              <p>Enter TM Number : {child.tm_number}</p>
                              <p>TM Status : {child.tm_status}</p>
                              <p>Enter TM Class : {child.tm_class}</p>
                              <p>TM Type : {child.tm_type}</p>
                            </td>
                            <td>{child.seller_id.name}</td>
                            <td><div className='active2'>Rejected</div></td>
                            <td>
                              {format(new Date(child.approve_Date), 'MMMM dd, yyyy')}
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