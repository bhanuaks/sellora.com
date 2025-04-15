"use client"
import { baseUrl, main_thumb_img_path } from '@/Http/helper'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ImageUploader from './ImageUploader'
import { useParams, useRouter } from 'next/navigation'
import { fileBasePath } from '@/Http/urlHelper'
import { ToastContainer, toast } from 'react-toastify';

function Page() {
  const formData =  new FormData()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState({});
   const params = useParams();
   const productSlug = params.slug;
  const router = useRouter();
  const [reviewData, setReviewData] = useState({
    title:"",
    star:1,
    files:null,
    pruduct:"",
    variant:"",
    message:""
  })


  useEffect(()=>{ 
    fetch(`${baseUrl}api/user/save-review?slug=${productSlug}`,{
      method:"GET", 
    }).then((response)=>{ 
      if(!response.ok){
        throw new Error("Network Error");
      }
      return response.json();
    }).then((res)=>{ 
      if(res.status){
        setProduct(res.data.product)
        if(res.data.review){
            setReviewData(res.data.review)
            if(res.data.review.files){ 
              setSelectedFiles(res.data.review.files)
            }
        }
       
      }
    })

  },[productSlug])


  useEffect(()=>{
    setReviewData((preData)=>({
      ...preData,
      pruduct:product?._id
    }))
  },[product])

  function updateReview(start){ 
      setReviewData((preData)=>({
        ...preData,
        star:start
      })) 
  }

  function hendleInputData(e){ 
    const {name, value} = e.target
      setReviewData((preData)=>({
        ...preData,
        [name]:value
      })) 
      if(!value){
        setErrors((preData)=>({
          ...preData,
          [name]:`${name} is required.`
        }))
      }else{
        setErrors((preData)=>({
          ...preData,
          [name]:``
        }))
      }
     
  }


  function submitReview(e){
    console.log('object');
    e.preventDefault();

    formData.append('title', reviewData.title)
    formData.append('star', reviewData.star) 
    formData.append('pruduct_id', reviewData.pruduct)
    formData.append('variant_id', reviewData.variant)
    formData.append('message', reviewData.message)
    formData.append('_id', reviewData?._id || "" )
    selectedFiles.forEach((file) => {
        formData.append("files", file);  
    });

    $('.loaderouter').css('display','flex')  
    fetch(`${baseUrl}api/user/save-review`,{
      method:"POST",
      body:formData
    }).then((response)=>{ 
      if(!response.ok){
         $('.loaderouter').css('display','none') 
        throw new Error("Network Error");
      }
      return response.json();
    }).then((res)=>{ 
      $('.loaderouter').css('display','none') 
      if(res.status){
        toast.success("Thank You!")
        router.push('/user/myorders')
      }else if(res.data.status_code == 403){
        setErrors(res.data.errors)
      }
    })
  }

  return (
    <section className="pt--30">
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
                      {/* loader start */} 
                      <div className="loaderouter"><div className="loader"></div></div> 
                      {/* loader end */}
  <div className="container">
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <div className="single-tab-content-shop-details pb--70">
          <div className="product-details-review-product-style">
            <div className="itemInfo_Dfdsf">
              <div className="itemImg_ddsfd">
                <Image src={`${fileBasePath}${main_thumb_img_path}${product?.main_image}`}
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{width:"auto", height:"auto"}}
                  alt=''
                 />
              </div>
              <h4>{product?.product_name}</h4>
            </div>
            <hr />
            <div className="submit-review-area">
              <form action="#" className="submit-review-area" onSubmit={(e)=>submitReview(e)}>
                <h5 className="title">Write Review</h5>
                <div className="your-rating">
                  <span>Rating</span>
                  <div className="stars">
                    <i className={`fa-solid fa-star ${reviewData.star >=1?"selected":""}`} onClick={()=>updateReview(1)} />
                    <i className={`fa-solid fa-star ${reviewData.star >=2?"selected":""} `} onClick={()=>updateReview(2)}/>
                    <i className={`fa-solid fa-star ${reviewData.star >=3?"selected":""} `} onClick={()=>updateReview(3)}/>
                    <i className={`fa-solid fa-star ${reviewData.star >=4?"selected":""} `} onClick={()=>updateReview(4)}/>
                    <i className={`fa-solid fa-star ${reviewData.star >=5?"selected":""} `} onClick={()=>updateReview(5)}/>
                  </div>
                </div>
                <div className="half-input-wrapper">
                  <div className="half-input">
                    <label>Title</label>
                    <input
                      type="text"
                          name="title"
                      placeholder="What most important to Know?" 
                      onChange={(e)=>hendleInputData(e)}
                      value={reviewData.title || ""}
                    />
                    {errors?.title && ( 
                      <div className='error_message'>{errors?.title}</div>
                    )}
                  </div>
                  <hr />
                  
                <ImageUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} errors={errors} setErrors={setErrors} />
                </div>
                <div className="half-input-wrapper">
                  <label>Write your review</label>
                  <textarea 
                    placeholder="Write Your Review"  
                    name="message"
                    onChange={(e)=>hendleInputData(e)}
                     value={reviewData.message || ""}
                  />
                  {errors?.message && ( 
                      <div className='error_message'>{errors?.message}</div>
                    )}
                </div>
                <button className="rts-btn btn-primary">SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Page