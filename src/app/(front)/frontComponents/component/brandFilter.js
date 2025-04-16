'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { baseUrl } from "@/Http/helper";

const BrandFilter = (props) => {

  const [brand, setBrand] = useState([])
  const [selectedValues, setSelectedValues] = useState([]);
  let allCheckbox = []
  
  const handleCheckboxChange = (e,id) => {
        
    const { value, checked } = e.target;
    
    setSelectedValues((prevValues) => {
      if (checked) {
       
        return [...prevValues, id] // Add value if checked
      } else {
        return prevValues.filter((item) => item !== id); // Remove if unchecked
      }

    })
    
  
    //console.log('checkkkk', allCheckbox)
    
    
  }
  
  


    const fetchBrand = async (category, subcategory, childcategory) => {
      const url = new URL(`${baseUrl}/api/front/get-brand`);
              const queryParams = {
                category:category,
                subcategory:subcategory,
                childcategory:childcategory
              };
        
              Object.keys(queryParams).forEach((key) => {
                if (queryParams[key]) {
                  url.searchParams.append(key, queryParams[key]);
                }
              });
      
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        //console.log(result.data)
        if (response.ok) {
           setBrand(result.data)
        } else {
    
        }
      } catch (error) {
        //console.error('Error fetching banners:', error);
        //alert('Failed to fetch banners.');
        //`${baseUrl}${bannerLeft.photo}`
      }
    };

useEffect(()=>{
//console.log('branddddd',props)
  fetchBrand(props.category, props.subcategory, props.childcategory)

},[])

useEffect(() => {
  //console.log("All Selected Values:", selectedValues);
  if(selectedValues.length > 0){
  props.getBrand(selectedValues)
  }else{
    props.getBrand(selectedValues)
  }
}, [selectedValues]);

return (
<div className="single-filter-box">
<h5 className="title">Select Brands</h5>
<div className="filterbox-body">
  <div className="category-wrapper">
    
    {brand && brand.map((brandList) => {

    return(
    <div className="single-category" key={brandList._id}>
      <input id={brandList._id} type="checkbox" onChange={(e) => handleCheckboxChange(e, brandList._id)} />
      <label htmlFor={brandList._id}>{brandList.name} </label>
    </div>
    )})}


  </div>
</div>
</div>
)
}

export default BrandFilter;
