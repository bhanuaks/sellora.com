"use client"
import { AppContext } from '@/app/contaxtData/contextData';
import { baseUrl } from '@/Http/helper';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'


function page() {

    const {globalData, setGlobalData} = useContext(AppContext)
   const globalUser = {}
       const [admin, setAdmin] = useState(null);
       useEffect(()=>{
        setAdmin(globalData.admin)
         console.log(globalData);
       },[globalData.admin])
   
     const [errors, setErrors] = useState({})
     const [passwordData, setPasswordData] = useState({
       old_password:"",
       new_password:"",
       confirm_password:"",
     })
   
   
     function changeInputData(e){
       const {name, value} = e.target;
         setPasswordData((preData)=>({
           ...preData,
           [name]:value
         }))
   
         setErrors((preError)=>({
           ...preError,
           [name]:!value.toString().trim()?`${name.replace("_", " ")} is required`:''
         }))
     }
   
     function changePassword(e){
       e.preventDefault();
       $('.loader-container').css('display','flex')
   
       fetch(`${baseUrl}admin-login/api/change-password`, {
         method:"POST",
         body:JSON.stringify({
           ...passwordData,
           admin_id:admin?admin._id:''
         })
       }).then((response)=>{
         if(!response.ok){ 
           $('.loader-container').css('display','none')
           throw new Error(`Network Error! ${response.statusText}`)
         }
         return response.json()
       }).then((res)=>{
           if(res.status){
               window.location.reload();
            }else if(res.data.status_code && res.data.status_code == "400"){
             $('.loader-container').css('display','none')
           setErrors(res.data.errors)
         }
       })
     }


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Change Password</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);"> Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active">Change Password</li>
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
                                    <form action={'#'} onSubmit={(e)=>changePassword(e)}>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="form-label"
                                                    >
                                                        Old Password<span>*</span>
                                                    </label>
                                                    <input className="form-control"
                                                     type="password" 
                                                     name='old_password'
                                                     value={passwordData.old_password}
                                                     onChange={(e)=>changeInputData(e)}
                                                     />
                                                      {errors.old_password && (  
                                                        <span className='error_message'>{errors.old_password}</span>
                                                        )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="form-label"
                                                    >
                                                        New Password<span>*</span>
                                                    </label>
                                                    <input className="form-control" 
                                                    type="password"
                                                    name='new_password'
                                                    value={passwordData.new_password}
                                                    onChange={(e)=>changeInputData(e)}
                                                     />
                                                     {errors.new_password && (  
                                                        <span className='error_message'>{errors.new_password}</span>
                                                        )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="form-label"
                                                    >
                                                        Confirm Password<span>*</span>
                                                    </label>
                                                    <input className="form-control"
                                                    type="password" 
                                                    name='confirm_password'
                                                    value={passwordData.confirm_password}
                                                    onChange={(e)=>changeInputData(e)}
                                                    />
                                                    {errors.confirm_password && (  
                                                        <span className='error_message'>{errors.confirm_password}</span>
                                                        )}
                                                </div>
                                                <div className="mb-3">
                                                    <div className="col-sm-auto">
                                                        <button type="submit" className="btn btn-primary">
                                                            Change Password
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
                    </div>
                </div>
                {/* container-fluid */}
            </div>
        </div>

    )
}

export default page;