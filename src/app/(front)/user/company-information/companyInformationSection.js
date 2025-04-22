import { baseUrl } from '@/Http/helper';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import '../../../../../public/front/error.css'
import { countriesList } from '@/Http/citizenList';

function CompanyInformationSection({ user }) {

    const [company, setCompany] = useState(null) 
    const [errors, setErrors] = useState({}) 
    const [edit, setEdit] = useState(false)
    useEffect(()=>{
        if(user){ 
            setCompany((prevData) => ({
                ...prevData,
                ...user.company,
                user_id: user._id,
            }));
        }
    },[user])

    
    function hendleInputData(e){

        const {name, value} = e.target 
        setCompany((preData)=>({
            ...preData,
            [name]:value
        })) 

        if(name != "tax_id" && name != "website"){
          setErrors((preError)=>({
            ...preError,
            [name]:!value.toString().trim()?`${name.replace('_', ' ')} is required`:''
          }))
        }
       
    }

     function submitCompnyData(e){
            e.preventDefault()
            setErrors({})
            $('.loaderouter').css('display','flex')
            fetch(`${baseUrl}api/user/edit/edit-company-details`,{
                method:"POST",
                body:JSON.stringify(company)
            }).then((response)=>{ 
                if(!response.ok){
                    $('.loaderouter').css('display','none')
                    throw new Error("Network Error")
                }
                return response.json()
            }).then((res)=>{
                $('.loaderouter').css('display','none')
                if(res.status){ 
                    toast.success(`Success! ${res.data.message}`)
                    setEdit(false)
                }else if(res.data.status_code && res.data.status_code == 400){
                    setErrors(res.data.errors)
                    const firstErrorKey= Object.keys(res.data.errors)[0]
                    $(`input[name="${firstErrorKey}"]`).focus();
                    $(`select[name="${firstErrorKey}"]`).focus();
                }
            })
        }



  return (
    <div className="col-lg-10 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
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

  <div className="dashboard-account-area">
    <h2 className="title text-center">My Profile</h2>
    <h3 className="title animated fadeIn">Company Information</h3>
    <span className="edit2">
    <a href="#" onClick={(e)=>{e.preventDefault(); setEdit(!edit); setErrors({})}} >
        {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
        {!edit?"Edit":'Cancel'}
      </a>
    </span>
    <div className="profile-info">
    <form action={'#'} onSubmit={(e)=>submitCompnyData(e)} >
      <div className="row registration-form">
        <div className="col-lg-5">
          <div>
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label className="name_field">Company Name</label>
                  <input
                    type="text"
                    name='company_name'
                    value={company?.company_name}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                  />
                  {errors.company_name && errors.company_name != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.company_name}</span>
                              ):''}
                </div>
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label className="name_field">Year Established</label>
                  <input type="text"  
                    name='established_year'
                    value={company?.established_year}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                    />
                    {errors.established_year && errors.established_year != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.established_year}</span>
                              ):''}
                </div>
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label className="name_field">Official Website</label>
                  <input
                    type="text"
                    name='website'
                    value={company?.website}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                  />
                  {errors.website && errors.website != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.website}</span>
                              ):''}
                </div>
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
          {/* <div className="mt--20">
            <div className="row">
              <div className="col-lg-12">
                <div className="input-wrapper">
                  <label htmlFor="email" className="name_field">
                    Buyer Type
                  </label>
                  <div className="radio_button">
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        defaultChecked=""
                        name="buyer"
                      />
                      Business
                    </label>
                    <label>
                      <input
                        type="radio"
                        className="input-radio"
                        name="buyer"
                      />
                      Consumer
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-lg-5 offset-lg-2">
          <div className="row">
            <div className="col-lg-10 col-10">
              <div className="input-wrapper">
                <label className="name_field">Registered Address</label>
                <textarea 
                    name='address'
                    value={company?.address}
                    onChange={(e)=>hendleInputData(e)}
                    disabled={!edit}
                />
                {errors.address && errors.address != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.address}</span>
                              ):''}
              </div>
            </div>
            <div className="col-lg-2 col-2">
              <label className="d-block">&nbsp;</label>
              {/* <div className="edit"><a href="#">Edit</a></div> */}
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label htmlFor="email" className="name_field">
                    Country/Region
                  </label>
                  <select  className='nice-select'
                   name='country'
                   value={company?.country}
                   onChange={(e)=>hendleInputData(e)}
                   disabled={!edit}
                   > 
                    <option value={""}>select</option>
                    {countriesList && countriesList.map((country, index)=>( 
                      <option value={country} key={index}>{country}</option>
                    ))}
                  </select>
                 
                   
                </div>
                {errors.country && errors.country != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.country}</span>
                              ):''}
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
          <div className="mt--20">
            <div className="row">
              <div className="col-lg-10 col-10">
                <div className="input-wrapper">
                  <label htmlFor="email" className="name_field">
                    Tax ID
                  </label>
                  <input type="text"
                   name='tax_id'
                   value={company?.tax_id}
                   onChange={(e)=>hendleInputData(e)} 
                   disabled={!edit}
                   />
                   {errors.tax_id && errors.tax_id != ""? ( 
                                  <span id="name_error" className="input-error-tip" style={{display: 'inline-block'}}>{errors.tax_id}</span>
                              ):''}
                </div>
              </div>
              <div className="col-lg-2 col-2">
                <label className="d-block">&nbsp;</label>
                {/* <div className="edit"><a href="#">Edit</a></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
        {edit && (
                <div className='button_container'>  
                    <button className='rts-btn btn-primary' type='submit'>Save</button>
                </div>
            )} 
             </form>
    </div>
  </div>
</div>

  )
}

export default CompanyInformationSection