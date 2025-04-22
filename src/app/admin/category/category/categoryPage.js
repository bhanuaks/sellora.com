"use client";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
// import { toast } from 'react-toastify';
import "parsleyjs";
import { baseUrl, isEmpty } from "@/Http/helper";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";


function CategoryPage() {

   
  // useEffect(() => {
  //   alert('sds')
  // }, []);

  const formRef = useRef(null);
  const [dynamicProductField, setDynamicProductField] = useState([
     
  ]); 
  const [varinatIndex, setvarinatIndex] = useState([]);  
  const [categories, setCategories] = useState([]);  
  const [variantList, setVariantList] = useState([]); 
  const [categoriesVariant, setCategoriesVariant] = useState([])
  
  const bannerImageRef =useRef();
  const listImageRef =useRef();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    photo: null,
    list_image: null,
    status: "Active",
    dropdownValues: {
      
    },
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // State for success/error messages

  useEffect(() => {
    if (typeof window !== "undefined") { 
      window.$ = window.jQuery = $; 
      if (formRef.current) {
        $(formRef.current).parsley();  
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, multiple } = e.target;
    if (multiple) {
      const values = Array.from(e.target.selectedOptions, option => option.value);
      setFormData((prevData) => ({
        ...prevData,
        dropdownValues: {
          ...prevData.dropdownValues,
          [name]: values, // Update the specific dropdown value
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'photo' || name === 'list_image' ? files[0] : value,
      }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const validate = () => {
    const errors = {};

    // Validation checks
    if (!formData.name) {
      errors.name = "Name is required.";
    }
    return errors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrors({})
    if (dynamicProductField.length) {
      let errors = {};  
    
      dynamicProductField.forEach((itemData, index) => {
        if (itemData.field_type === "select" && itemData.select_value.length === 0) {
          errors[`adding_value_error_${index}`] = "Minimum one value required.";
        } else {
          console.log(`Field at index ${index} is valid.`);
        }
      });
    
      if (Object.keys(errors).length > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
        return
      }
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // remove select variant and value null
    const filteredVariant = Object.fromEntries(
      Object.entries(categoriesVariant).filter(([key, value]) => value !== "select")
    );
   
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formData._id);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('status', formData.status);
    formDataToSubmit.append('dynamicField', JSON.stringify(dynamicProductField));
    formDataToSubmit.append('variant', JSON.stringify(filteredVariant || [])); 

    if (formData.photo) formDataToSubmit.append('photo', formData.photo);
    if (formData.list_image) formDataToSubmit.append('list_image', formData.list_image);

    const url = '/admin-login/api/category';
    const method = 'POST';
    $('.loader-container').css('display', 'flex')
    try {
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });

      const result = await response.json();

      if (response.ok) { 
         if(!result.success && result.data.status_code && result.data.status_code == 400){
            setErrors(result.data.errors);
            $('.loader-container').css('display', 'none');
            return
         } 
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'success', text: result.message });
        fetchCategories();
        setFormData({ id: null, name: '', photo: null, list_image:null,  status: 'Active', dropdownValues: {} });
        setDynamicProductField([])
        toast.success(result.message);
        
        // unselect all selected values
        setCategoriesVariant([])
        $('.multiple').each((index, element) => {
            const select = $(`select[name="${$(element).attr('name')}"]`); 
            select.val(null).trigger('change');
        });

        if(bannerImageRef.current){
          bannerImageRef.current = null;
        }
        if (listImageRef.current) {
          listImageRef.current = null;
        }

      } else {
        $('.loader-container').css('display', 'none')
        setMessage({ type: 'error', text: result.message || 'Failed to save category.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (category) => {
   
    // clear old selected variant data
      setCategoriesVariant([])
        $('.multiple').each((index, element) => {
            const select = $(`select[name="${$(element).attr('name')}"]`); 
            select.val(null).trigger('change');
        });


    setFormData({
      ...category,
      // dropdownValues: { 
      // },
    }); 

    setDynamicProductField(category.dynamicField)
    setCategoriesVariant(category.category_variant)
    console.log({variant:category.category_variant, category});
    Object.keys(category.category_variant || {}).forEach((key) => {
      if(typeof category.category_variant[key] !== "string"){
        $(`select[name="${key}"]`)
        .val(category.category_variant[key]) 
        .trigger("change"); 
      }
    });
     

  };

 
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      $('.loader-container').css('display', 'flex')
      const response = await fetch(`/admin-login/api/category`, {
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
        fetchCategories(); // Refresh category list
        toast.success(result.message);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete category.' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchCategories = async () => {
    try {
    $('.loader-container').css('display', 'flex') 
      const response = await fetch('/admin-login/api/category');
      const result = await response.json();
      if (response.ok) {
        $('.loader-container').css('display', 'none') 
        setCategories(result.data);   
        setVariantList(result.variantList); 

      } else {
        $('.loader-container').css('display', 'none') 
        alert(result.message || 'Failed to fetch categories.');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to fetch categories.');
    }
  };

   

 useEffect(()=>{
  fetchCategories()
 },[])

  useEffect(() => {
    
      if (typeof window !== "undefined") {
        // Initialize Select2
        $(".multiple").select2({
          placeholder: "Select an values",
          allowClear: true,
          multiple: true,
        });
  
        
        // Add an onChange event listener to track changes
        $(".multiple").on("change", function () {
          const selectedValues = $(this).val(); // Get selected values
          const name = $(this).attr("name"); // Get dropdown name attribute
          
         
          if(selectedValues.length){
            setCategoriesVariant((preData)=>({
                ...preData,
                [name]:selectedValues
            }))
          }else{

            setCategoriesVariant((preData)=>({
              ...preData,
              [name]:"select"
          }))

            // setCategoriesVariant((preData) => {
            //   const newData = { ...preData };
            //   delete newData[name]; 
            //   return newData;
            // });
          } 
         
        });
      }
    
  
    // Cleanup: Remove event listeners on unmount
    return () => {
      if (typeof window !== "undefined") {
        $(".multiple").off("change");
      }
    };
  }, [variantList.length, setCategoriesVariant, setvarinatIndex]);

  // const populateSelect = (selectId, options, preSelectedValues = []) => {
  //   const select = $(`select[name="${selectId}"]`);
  //   select.empty(); // Clear existing options
  //   options.forEach((item) => {
  //     select.append(new Option(item.name, item._id));
  //   });
  //   select.val(preSelectedValues).trigger("change");
  // };
  function updateFieldInputData(key, e){
    let { name, value , checked} = e.target;  
    if(name.includes("field_type") ){
      name = "field_type"
    }
    if(name == "required"){
      const assignValue = checked?'Yes':"No"; 
      const updatedData = dynamicProductField.map((prevData, i) =>
        i === key ? { ...prevData, [name]:assignValue } : prevData
      );
      setDynamicProductField(updatedData)
      return
    }
    
    // else
    const updatedData = dynamicProductField.map((prevData, i) =>
        i === key ? { ...prevData, [name]: value } : prevData
      );
        console.log(updatedData);
      setDynamicProductField(updatedData)
}


function addModeField(){
  setDynamicProductField([...dynamicProductField,{field_name:'', required:'', field_type:"input", select_value:[]}])
}

  function deleteField(index){
    
    const filterData = dynamicProductField.filter((_,i)=> i !=index)
    setDynamicProductField(filterData)
  
  }

 

  function addSelectValue(index){
     
    const filterData = dynamicProductField[index];
    
    let oldSelectValue = filterData.select_value || [];
    if(isEmpty(filterData.adding_value)){
      setErrors((preError)=>({
        ...preError,
        [`adding_value_error_${index}`]: 'required'
      }))
      return
    }else{
        setErrors((preError)=>({
          ...preError,
          [`adding_value_error_${index}`]: ''
        }))
    }
    oldSelectValue.push(filterData.adding_value)
    const updatedData = dynamicProductField.map((prevData, i) =>
      i === index ? { ...prevData, select_value: oldSelectValue,adding_value:'' } : prevData
    ); 
    
    setDynamicProductField(updatedData)
  }

  function deleteSelectValue(index, valueIndex){
    const filterData = dynamicProductField[index]; 
    let oldSelectValue = filterData.select_value || [];
    const removedData = oldSelectValue.filter((item,i)=>i != valueIndex) 
    const updatedData = dynamicProductField.map((prevData, i) =>
      i === index ? { ...prevData, select_value: removedData } : prevData
    ); 
    setDynamicProductField(updatedData)
  }

  function hendleShowCategory(e, id){
    const {checked} = e.target;
    fetch(`${baseUrl}api/admin/update-category-list-status`,{
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

  function changeTypeVariant(e, name, field_id,  index){
    const {value} =  e.target;
    console.log({value, name, field_id});
    if(value == "none"){
      const select = $(`select[name="${name}"]`); 
      select.val(null).trigger('change');
      
      setCategoriesVariant((preData) => {
        const newData = { ...preData };
        delete newData[name]; 
        return newData;
      }); 
     
      return;
    }

    if(value == "input"){
         
        const select = $(`select[name="${name}"]`); 
        select.val(null).trigger('change');

        setCategoriesVariant((preData)=>({
          ...preData,
          [name]:value
      }))
        return;
    }

    if(value == "select"){

        setCategoriesVariant((preData)=>({
            ...preData,
            [name]:value
        }))  

    }else{
      const selectedValues = $(`#${field_id}`).val();    
          if(selectedValues && selectedValues.length){
            setCategoriesVariant((preData)=>({
                ...preData,
                [name]:selectedValues
            }))
          }else{
            setCategoriesVariant((preData) => {
              const newData = { ...preData };
              delete newData[name]; 
              return newData;
            });
          } 
    }
    
  }

  return (
    <div className="main-content">
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
                    padding: 0px 5px;
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

                .hide_select .select2-container--default{
                     display:none;
                }
                     
        `}
      </style>

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
                <h4 className="mb-sm-0 font-size-18">Add Category</h4>
              </div>
            </div>
          </div>
          {/* Add Category Form */}
          {message && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}


            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
            <form onSubmit={handleSubmit} encType="multypart/form-data" ref={formRef}>
              <div className="card">
                <div className="card-body">
                <h4>Category information </h4>
                  <hr></hr> 
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Category Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter category name"
                          />
                          {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Banner Image</label>
                          <input
                            className="form-control"
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            ref={bannerImageRef}
                          />
                          {formData.photo && typeof formData.photo ==="string" ?( 
                          <a href={`${baseUrl}${formData.photo}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errors.photo && (
                            <span className="text-danger">{errors.photo}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> image size 968x314px</div>
                      </div>

                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Listing Image</label>
                          <input
                            className="form-control"
                            type="file"
                            name="list_image"
                            onChange={handleChange}
                            ref={listImageRef}
                          />
                          {formData.list_image && typeof formData.list_image ==="string" ?( 
                          <a href={`${baseUrl}${formData.list_image}`} target="_blank" style={{color:'#333383'}}>View Image</a>
                          ):''}
                          {errors.list_image && (
                            <span className="text-danger">{errors.list_image}</span>
                          )}
                        </div>
                        <div style={{color:'red'}}><span>Note: </span> Image size of 254px (width) × 154px (height)</div>
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
                       

                      

                      {/* <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div> */}
                    </div>
                  
                </div>
              </div>

              {/* variant start */}
              <div className="card">
                <div className="card-body">
                  <h4>Variants </h4>
                  <span class="text-success">
                    <strong>Variants Rule:</strong>
                    <p>1. If the field type is set to "Input", it will appear in the seller variant list, and the seller can manually enter the value.<br />
                     2. If the field type is set to "Select" and a value is chosen from the dropdown, it will appear in the seller variant list, and the seller must choose a value from the given options.</p>
                  </span>
                  <hr></hr>
                  <br /> 
                  
                  
                 
                    <div className="row"> 

                    {variantList && variantList.length ? variantList.map((item, index)=>(

                        <div className="col-lg-6" key={index}>
                          <div className="mb-3">
                              <label className="form-label">{item.variant_name} : </label>
                              <br /> 
                              &nbsp;<input type="radio" value={"none"} name={`${item.variant_name}_id`} 
                              checked={ typeof categoriesVariant?.[item.variant_name] =="undefined"?true:false}
                               onChange={(e)=>changeTypeVariant(e, item.variant_name, `${item.variant_name}_id`,   index)} /> None
                                

                              &nbsp;<input type="radio" value={"select"} name={`${item.variant_name}_id`} 
                              checked={  typeof categoriesVariant?.[item.variant_name] =="object"  || categoriesVariant?.[item.variant_name] =="select" ?true:false}
                               onChange={(e)=>changeTypeVariant(e, item.variant_name, `${item.variant_name}_id`,   index)} /> Select
                               
                              &nbsp;<input type="radio" value={"input"} name={`${item.variant_name}_id`} 
                              checked={ categoriesVariant?.[item.variant_name] == "input"?true:false}
                              onChange={(e)=>changeTypeVariant(e, item.variant_name, `${item.variant_name}_id`,  index)} /> Input Field
 

                              <div className={`${ typeof categoriesVariant?.[item.variant_name] !=="object"  && categoriesVariant?.[item.variant_name] !=="select" ? "hide_select":""}`}>
                              <select
                                className={`form-select multiple `}
                                id={`${item.variant_name}_id`}                                
                                name={item.variant_name}
                                onChange={(e) => handleDropdownChange(e, `${item.variant_name}`)}
                                multiple
                                 
                              >
                                 {item.select_value.length ? item.select_value.map((vValue, index)=>(
                                      <option value={vValue} key={index}>{vValue}</option>
                                 )):''}
                               
                              </select>
                              </div>
                              {/* <input type="text"  
                              className="form-control"
                              disabled={true}
                              style={{display:`${categoriesVariant?.[item.variant_name] !== "input" ? "none":""}`}}
                              /> */}
                            </div>
                          </div> 
                        )):''}

                     
                    </div>
                 
                </div>
              </div>
              {/* add product dynamic field */}
              <div className="card">
                <div className="card-body">
                <h4>Product Dynamic Field </h4>
                  <hr></hr> 
                    <div className="row">
                      {dynamicProductField.length>0 ? dynamicProductField.map((item, index)=>(
                        <div className="row" key={index}>
                         <div className="col-lg-12" />
                          <div className="col-lg-4">
                          <div className="mb-3">
                          <label className="form-label">Field Name {index+1}</label>
                          <input
                            className="form-control"
                            type="text"
                            name="field_name"
                            required
                            value={dynamicProductField[index].field_name || ''}
                            onChange={(e)=>updateFieldInputData(index, e)}
                            placeholder="Enter field name"
                          />
                           
                        </div>
                      </div>

                      <div className="col-lg-2 col-6">
                        <div className="mb-3">
                          <label className="form-label">Field Type</label>
                          <br />
                          <input
                            className=""
                            type="radio"  
                            value={"input"} 
                            name={`field_type_${index}`}
                            style={{marginTop:'5px'}} 
                            onChange={(e)=>updateFieldInputData(index, e)}
                            checked={item.field_type == "input"?true:false}

                          />
                          &nbsp;Input 
                          &nbsp;
                          <input
                            className=""
                            type="radio"  
                            value={"select"}  
                            name={`field_type_${index}`}
                            onChange={(e)=>updateFieldInputData(index, e)}
                            checked={item.field_type == "select"?true:false}
                            style={{marginTop:'5px'}} 
                          />
                          &nbsp;Select
                          
                        </div>
                      </div>


                      <div className="col-lg-2 col-6">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <br />
                          <input
                            className=""
                            type="checkbox"
                            name="required"
                            
                            value={"Yes"}
                            checked={dynamicProductField[index].required == "Yes"?true:false}
                            style={{marginTop:'10px'}}
                            onChange={(e)=>updateFieldInputData(index, e)}
                          />
                          &nbsp;Required
                          
                        </div>
                      </div>

                      <div className="col-lg-2 col-6">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <br />
                          <div
                            className="" 
                            style={{marginTop:'10px', color:'red', cursor:'pointer'}}
                            
                          >
                          &nbsp; <span onClick={()=>deleteField(index)}><i className='fa fa-trash' /> Delete </span>
                          </div>
                          
                        </div>
                      </div>
                        {item.field_type == "select" ? (<>
                      <div className="col-lg-2 col-12" />
                      <div className="col-lg-4 col-6">
                        <div className="mb-3">
                          <label className="form-label">Add Select Value</label>
                          <fieldset className="fieldInput">
                          <input className="form-control" type="text" name="adding_value" 
                          placeholder="Enter Value"  required={item.select_value.length==0?true:false}
                          value={item.adding_value || '' } onChange={(e)=>updateFieldInputData(index, e)} />
                          <button type="button" className="form-submit" onClick={()=>addSelectValue(index)}>Add Value</button>
                          {errors[`adding_value_error_${index}`] && (
                            <span className="error_message"> {errors[`adding_value_error_${index}`]}</span>
                        )}
                        </fieldset> 
                        </div>
                      </div>

                      {item.select_value && item.select_value.length >0 ? (
                      <div className="col-lg-4 col-6">
                        <div className="mb-3">
                          <label className="form-label">Values</label><br />
                          <div style={{display:'ruby'}}> 
                            {item.select_value && item.select_value.length >0 ? item.select_value.map((data, keyIndex)=>(
                                    <div className="select_values" key={keyIndex}>{data} <span onClick={()=>deleteSelectValue(index, keyIndex)}>X</span></div>
                            )):""} 
                          </div>
                        </div>
                      </div>
                      ):""}

                  </>):""}

                      </div>
                      )) :""}
                       

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label"><a className="add_more_product_field" onClick={()=>addModeField()}>+Add {dynamicProductField.length>0?"More":''} Field</a></label>
                            
                        </div>
                      </div> 

                      
                    </div>
                  
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                
                    <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div> 
                      
                    </div>
                  
                </div>
              </div>
              </form>
              {/* variant end */}
              {/* List of Categories */}
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Sl No.</th>
                          <th>Category Name</th>
                          <th>Banner Image</th>
                          <th>Listing Image</th>
                          <th>Category Variants</th>
                          <th>Show Navbar</th>
                          <th>Status</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.length > 0 ? (
                          categories.map((category, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{category.name}</td>
                              <td>
                                {category.photo != null ?
                                  <img
                                    src={category.photo}
                                    alt="Category"
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                    }}
                                  />
                                  : ''}
                              </td>
                              <td>
                                {category.list_image != null ?
                                  <img
                                    src={category.list_image}
                                    alt="list_image"
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                    }}
                                  />
                                  : ''}
                              </td>
                              
                              <td>
                                {category?.category_variant && Object.keys(category.category_variant).map((variantItem,index)=>(
                                  <div key={index}><strong >{variantItem}:</strong> 
                                    <div style={{display: 'ruby'}}  >
                                  {typeof category.category_variant[variantItem] != "string" ? category.category_variant[variantItem].map((item, key2)=>(
                                      <div className="select_values" key={key2}>{item} </div>  
                                    )):(()=>{
                                        if(category.category_variant[variantItem] == "input"){
                                          return " Input Type"
                                        }
                                    })()}
                                    </div>
                                  <br /></div>
                                ))}
                                {/* {JSON.stringify(category?.category_variant)} */}
                                </td>
                              <td>
                                <input type="checkbox" value={"checked"} 
                                    defaultChecked={category?.showList == "Yes"}
                                    onClick={(e)=>hendleShowCategory(e, category._id)}
                                  />
                              </td>
                              <td><Link href="#" className="active2">{category.status}</Link></td>
                              <td><Link href="#" onClick={() => handleEdit(category)}><i className="fas fa-pencil-alt"></i></Link></td>
                              <td><Link href="#" onClick={() => handleDelete(category._id)}><i className="fas fa-trash-alt"></i></Link></td>
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

export default CategoryPage;
