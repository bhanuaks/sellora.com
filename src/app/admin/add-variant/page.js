"use client"
import { baseUrl, isEmpty } from '@/Http/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const page = () => {

    const [dynamicProductField, setDynamicProductField] = useState(
        { variant_name: '',  select_value: [] , status:1}
    );
    const [variantList, setVariantList] = useState([])
    const [errors, setErrors] = useState({});

    function updateInputData(e) {
        let { name, value } = e.target;
        if(name == "variant_name"){
             value = value.replace(/[^a-zA-Z0-9\s]/g, "");
        }
        setDynamicProductField((preData) => ({
            ...preData,
            [name]: value
        }))
        setErrors((preError) => ({
            ...preError,
                [name]: !value.trim()?`${name.replace("_", ' ')} is required`:''
        }))
    }

 
    function addSelectValue() {

        const filterData = dynamicProductField

        let oldSelectValue = filterData.select_value || [];
        if (isEmpty(filterData.adding_value)) {
            setErrors((preError) => ({
                ...preError,
                select_value: 'required'
            }))
            return
        } else {
            setErrors((preError) => ({
                ...preError,
                select_value: ''
            }))
        }
        oldSelectValue.push(filterData.adding_value)
        setDynamicProductField((preData) => ({
            ...preData,
            adding_value: oldSelectValue,
            adding_value: ''
        }))
    }

    function deleteSelectValue(valueIndex) {
        const filterData = dynamicProductField;
        let oldSelectValue = filterData.select_value || [];
        const removedData = oldSelectValue.filter((item, i) => i != valueIndex)
        setDynamicProductField((prevData) => (
            { ...prevData, select_value: removedData }
        ))
    }

    function saveVariant(e){
        e.preventDefault();
        setErrors({})
        $('.loader-container').css('display', 'flex')
        fetch(`${baseUrl}admin-login/api/save-variant`,{
            method:"POST",
            body:JSON.stringify(dynamicProductField)
        }).then((response)=>{
            if(!response.ok){
                $('.loader-container').css('display', 'none')
                throw new Error("Network Error")
            }
            return response.json();
        }).then((res)=>{
            $('.loader-container').css('display', 'none')
           if(res.status){
            setVariantList(res.data.list)
            setDynamicProductField({ variant_name: '',  select_value: [] })
            toast.success(`Success! ${res.data.message}`)
           }else if(res.data.status_code && res.data.status_code == "400"){
            setErrors(res.data.errors)
            $(`input[name="${Object.keys(res.data.errors)[0]}"]`).focus()
           }
        })
    }

    useEffect(()=>{
        $('.loader-container').css('display', 'flex')
        fetch(`${baseUrl}admin-login/api/save-variant`,{
            method:"GET", 
        }).then((response)=>{
            if(!response.ok){
                $('.loader-container').css('display', 'none')
                throw new Error("Network Error")
            }
            return response.json();
        }).then((res)=>{
            $('.loader-container').css('display', 'none')
           if(res.status){
            setVariantList(res.data.list) 
           } 
        })
    },[])

    function handleEdit(variant){
        setDynamicProductField(variant)
    }
    function handleDelete (e, _id){
        e.preventDefault();

        $('.loader-container').css('display', 'flex')
        fetch(`${baseUrl}admin-login/api/save-variant`,{
            method:"DELETE",
            body:JSON.stringify({_id}) 
        }).then((response)=>{
            if(!response.ok){
                $('.loader-container').css('display', 'none')
                throw new Error("Network Error")
            }
            return response.json();
        }).then((res)=>{
            $('.loader-container').css('display', 'none')
           if(res.status){
            toast.success("Success! variant has been deleted")
            setVariantList(variantList.filter((item)=>item._id != _id)) 
           } 
        })
    }
    return (
        <div className="main-content">
            <ToastContainer 
                            position="top-center"
                            autoClose={3000} // Toast disappears after 3 seconds
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
            <style>
                {`
        .mainTitle {
            font-family: 'Open Sans';
            text-align: center;
            margin: 30px auto;
          }

          .fieldInput {
            display: block;
            // margin: 70px auto;
            width: 100%;
            // height: 35px;
            position: relative;
            // box-shadow: 0 4px 20px 0 rgba(0,0,0,0.09);
            // border-radius: 35px;
            // overflow: hidden;
            .form-input {
              width: 200px;
              background: none;
              border: none;
              padding: 12px 20px;
              font-size: 9px;
              color: #6A7C92;
              &:focus {
                outline: none;
              }
            }
            .form-submit {
              font-size: 12px;
              background: #fc7137 !important;
              color: #fff !important;  
              position: absolute;
              right: 0;
              top: 0;
              width: 70px;
              height: 38px;
              // border-radius: 17px;
              border: none;
              background: none;
              box-shadow: 5px -2px 81px 1px rgba(0,0,0,0.09);
              cursor: pointer;
            }
          }

          .footer {
            font-family: 'Open Sans';
            text-align: center;
            font-size: 12px;
            color: #6A7C92;
          }

          .select_values {
                   border: 1px solid #b2c3a7;
                    background: #b2c3a7;
                    padding: 3px 5px;
                    margin: 2px 2px;
                    border-radius: 5px;
            }
                    .select_values span {
                    border-left: 1px solid;
                    padding-left: 5px;
                    color: red;
                    font-weight: 600;
                    cursor:pointer;
                }
        `}
            </style>
            <div className="page-content">
                <div className="container-fluid">
                    {/* Page Title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Add Variant</h4>
                            </div>
                        </div>
                    </div>
                    {/* ======== */}
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="card">
                                <div className="card-body"> 
                                    <form action={"#"} onSubmit={(e)=>saveVariant(e)} >
                                    <div className="row"> 
                                        <div className="row" >
                                            <div className="col-lg-12" />
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Variant Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="variant_name"
                                                        
                                                        value={dynamicProductField.variant_name || ''}
                                                        onChange={(e) => updateInputData(e)}
                                                        placeholder="Enter field name"
                                                    />
                                                    {errors.variant_name && ( 
                                                        <span className='error_message'>{errors.variant_name}</span>
                                                    )}

                                                </div>
                                            </div> 
                                            <div className="col-lg-12 col-12" />
                                            <div className="col-lg-4 col-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Add Value</label>
                                                    <fieldset className="fieldInput">
                                                        <input className="form-control" type="text"
                                                            name="adding_value"
                                                            placeholder="Enter Value"
                                                           
                                                            value={dynamicProductField.adding_value || ''}
                                                            onChange={(e) => updateInputData(e)}
                                                        />
                                                           {errors.select_value && ( 
                                                        <span className='error_message'>{errors.select_value}</span>
                                                    )}
                                                        <button type="button" className="form-submit" onClick={() => addSelectValue()}>Add Value</button>

                                                    </fieldset>
                                                </div>
                                            </div>


                                            {/* <div className="col-lg-4 col-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Variant Values</label><br />
                                                                <select className='form-select'>  
                                                                {dynamicProductField.select_value && dynamicProductField.select_value.length > 0 ? dynamicProductField.select_value.map((data, keyIndex) => (
                                                                        <option   key={keyIndex}>{data}</option>
                                                                    )) : ""} 
                                                                </select>
                                                                
                                                            </div>
                                                        </div> */}

                                            <div className="col-lg-12 col-12" /> 
                                                <div className="col-lg-4 col-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Variant Values</label><br />
                                                        <div style={{ display: 'ruby' }}>
                                                            {dynamicProductField.select_value && dynamicProductField.select_value.length > 0 ? dynamicProductField.select_value.map((data, keyIndex) => (
                                                                <div className="select_values" key={keyIndex}>{data} <span  onClick={() => deleteSelectValue(keyIndex)}>X</span></div>
                                                            )) : (
                                                                <></>
                                                            // <div style={{color:'red', fontSize:'14px'}}>You have not added any value. please add at least one value.</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                           


                                                        <div className="col-lg-12 col-12" />
                                                        <div className="col-lg-4 col-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Status</label><br />
                                                                <select className='form-select' name='status'  
                                                                value={dynamicProductField?.status}
                                                                onChange={(e) => updateInputData(e)}>   
                                                                 <option value={1}>Active</option>
                                                                 <option value={0}>Deactive</option>
                                                                </select>
                                                                
                                                            </div>
                                                        </div> 
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    </form>
                                </div>
                            </div>

{/*===================================== list of varinat================================= */}
<div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Sl No.</th>
                          <th>Variant Name</th>
                          <th>Values</th>  
                          <th>Status</th>  
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variantList.length > 0 ? (
                          variantList.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.variant_name}</td>
                              <td>
                              <div style={{ display: 'ruby' }}>
                              {item.select_value? item.select_value.map((data, keyIndex)=>( 
                                    <div className="select_values" key={keyIndex} >{data} </div>
                              )):''}
                              </div>
                              </td>
                             <td>{item.status==1?"Active":"Deactive"}</td>
                              <td><Link href="#" onClick={() => handleEdit(item)}><i className="fas fa-pencil-alt"></i></Link></td>
                              <td><Link href="#" onClick={(e) => handleDelete(e, item._id)}><i className="fas fa-trash-alt"></i></Link></td>
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

              {/* end list variant */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page