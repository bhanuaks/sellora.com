"use client";
 
import { baseUrl, fetcher } from "@/Http/helper";
import Link from "next/link"; 
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import useSWR, { mutate } from "swr";
import UrlComponents from "./UrlComponents";
import { apiRequest } from "@/Http/apiHelper";

function page() {

    const [deleting, setDeleting] = useState(null);
    const { data, error, isLoading } = useSWR('/api/admin/collections/view-collection', fetcher);
    const list = data?.data.list
   
   async function deleteCollection(e, _id){
    e.preventDefault();
    if(!confirm("Are you sure to delete this collection"))
    setDeleting(_id)
    const response = await apiRequest('/api/admin/collections/view-collection', "DELETE", {_id})
    setDeleting(null)
    if(response.status){
        mutate('/api/admin/collections/view-collection')
    }
   }

   
     function hendleShowCategory(e, id){
       const {checked} = e.target;
       fetch(`${baseUrl}api/admin/collections`,{
         method:"PUT",
         body:JSON.stringify({checked, id})
       }).then((response)=>{
         if(!response.ok){
           throw new Error("Network error")
         }
         return response.json();
       }).then((res)=>{
         if(res.status){ 
           toast.success("Updated successfully")
         }
       }).catch((error)=>{
         toast.error("Update failed")
       })
     }

  return (
    <div className="main-content">

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

      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Collection List</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Collections</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Display message */}

          {/* Form */}
          <div className="row">
            <div className="col-lg-12">
              

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th width={50}>Sl No.</th>
                            <th width={300}>Collection Name</th>
                            <th  >Link</th> 
                            <th >Total Product</th> 
                            <th>Show Navbar</th>
                            <th width={10}>Edit</th>
                            <th width={60}>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                            {list && list.map((item, index)=>(
                                <tr key={index}>
                                    <td width={50}>{index+1}</td>
                                    <td width={300}>{item.name}</td>
                                     <UrlComponents item={item} /> 
                                    <td >{item.productIds.length}</td> 
                                    <td>
                                      <input type="checkbox" value={"checked"} 
                                          defaultChecked={item?.ShowInNav == true}
                                          onClick={(e)=>hendleShowCategory(e, item._id)}
                                        />
                              </td>

                                    <td width={10}><Link href={`/admin/collections?updateId=${item._id}`}><i className="fa fa-edit" /> </Link></td>
                                    <td width={60}><Link href={`#`} onClick={(e)=>deleteCollection(e, item._id)} > 
                                    {deleting == item._id ?"Deleting..":(
                                     <i className="fa fa-trash" /> 
                                    )}
                                   
                                    </Link></td>
                                </tr>
                            ))}
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

export default page;
