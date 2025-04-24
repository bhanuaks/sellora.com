'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { baseUrl } from "@/Http/helper";
import { useParams } from "next/navigation";
import CategoryListingLoader from "@/app/(website)/skeleton_loader/categoryListingLoader";

const DepartmentFilter = ({mobile=null}) => {
  
  const params = useParams();
  const category_slug = params?.category?.[0] || "";
  const sub_category_slug = params?.category?.[1] || "";
  const child_category_slug = params?.category?.[2] || "";
  
  const [category, setCategory] = useState(null)
  const [subCategories, setSubCategories] = useState(null)
  const [childCategories, childSubCategories] = useState(null)
  const [proccess, setProccess] = useState(false)

  useEffect(()=>{
    setProccess(true)
    fetch(`${baseUrl}api/front/get-categories-by-slug?slug=${category_slug}&sub_category_slug=${sub_category_slug || ""}`, {
      method:"GET", 
    }).then((response)=>{

      if(!response.ok){ 
        setProccess(false)
        throw new Error("Network Error")
      }
      return response.json();
    }).then((res)=>{
      if(res.status){
        setCategory(res.data.category)
        setSubCategories(res.data.subCategories)
        childSubCategories(res.data.childCategory)
      }
      setProccess(false)
    })
  },[category_slug])


  if(proccess){
    return (
      <div className="single-filter-box">
      <CategoryListingLoader />
      </div>
    )
  }
  if(mobile){
     return (
      <div className="accordion-content"> 
      <div className="filterbox-body">
        <div className="category-wrapper _p13n-zg-nav-tree-all_style_zg-browse-group__88fbz">
          <div className="cat_heading">
            {sub_category_slug ?(
              <Link href={`${baseUrl}product/${category?.slug}`}> {category && category.name} </Link> 
            ):(
              category && category.name
            )} 
             </div>
              {sub_category_slug ? (
                <div >
                 <div className="cat_sub_heading"><Link href={`${baseUrl}product/${category?.slug}/${subCategories?.slug}`}>  {subCategories && subCategories.subCategoryName} </Link> </div>
                 {childCategories && childCategories.length>0 ?( 
                      <ul className="list_cat">
                        {childCategories.map((childCate, index)=>(
                          <li key={index}><a href={`${baseUrl}product/${category?.slug}/${subCategories?.slug}/${childCate.slug}`}>{childCate.childCategoryName}</a></li>
                        ))}
                           
                      </ul> 
                 ):""}
                 
                 </div>

              ):null}
          {subCategories && subCategories.length>0 ? subCategories.map((subCate, index)=>(
            <div key={index}>
              <div className="cat_sub_heading">
                <Link href={`${baseUrl}product/${category?.slug}/${subCate.slug}`}>{subCate.subCategoryName} </Link> 
                </div>

                 
            </div>
          )):""}
           
        </div>
      </div>
    </div>
     )
  }


  return (
    <div className="single-filter-box">
      <h5 className="title">Department</h5>
      <div className="filterbox-body">
        <div className="category-wrapper _p13n-zg-nav-tree-all_style_zg-browse-group__88fbz">
          <div className="cat_heading">
            {sub_category_slug ?(
              <Link href={`${baseUrl}product/${category?.slug}`}> {category && category.name} </Link> 
            ):(
              category && category.name
            )} 
             </div>
              {sub_category_slug ? (
                <div >
                 <div className="cat_sub_heading"><Link href={`${baseUrl}product/${category?.slug}/${subCategories?.slug}`}>  {subCategories && subCategories.subCategoryName} </Link> </div>
                 {childCategories && childCategories.length>0 ?( 
                      <ul className="list_cat">
                        {childCategories.map((childCate, index)=>(
                          <li key={index}><a href={`${baseUrl}product/${category?.slug}/${subCategories?.slug}/${childCate.slug}`}>{childCate.childCategoryName}</a></li>
                        ))}
                           
                      </ul> 
                 ):""}
                 
                 </div>

              ):null}
          {subCategories && subCategories.length>0 ? subCategories.map((subCate, index)=>(
            <div key={index}>
              <div className="cat_sub_heading">
                <Link href={`${baseUrl}product/${category?.slug}/${subCate.slug}`}>{subCate.subCategoryName} </Link> 
                </div>

                 
            </div>
          )):""}
           
        </div>
      </div>
    </div>
)};

export default DepartmentFilter;