"use client"
import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React, { useState } from 'react'

function MobileCategoryMenu({allCategory}) {

      const [expandedCategory, setExpandedCategory] = useState(null);
    
      const toggleSubmenu = (catIndex) => {
        setExpandedCategory(expandedCategory === catIndex ? null : catIndex);
      };
      if(!allCategory){
        
            return <></>
      }


  return (
    <ul  className={`${expandedCategory?"category-sub-menu metismenu expanded":"category-sub-menu metismenu"}`}
     id="category-active-menu">
                       
                       {allCategory && allCategory.length > 0 && allCategory.map((cateData, cateIndex)=>(
                        cateData.subcategories.length > 0 ?(
                         
                      <li key={cateIndex}> 
                        <Link href={`${baseUrl}product/${cateData.slug}`} className="menu-item"> 
                            <span>{cateData.name} </span>
                            {expandedCategory === cateIndex ?( <i className="fa-regular fa-minus"  onClick={() => toggleSubmenu(cateIndex)}/>) : ( <i className="fa-regular fa-plus"  onClick={() => toggleSubmenu(cateIndex)} />)}
                           
                          </Link> 
                          <ul className={`submenu ${expandedCategory === cateIndex ? "expanded mm-collapse mm-show" : "submenu mm-collapse"}`}
                            style={{height:`${expandedCategory === cateIndex ? "auto" : "0px"}`}}
                            >
                                 {cateData.subcategories.map((subCatItem, subCatItemIndex) => (
                                        <li key={subCatItemIndex}>
                                        <Link
                                            className="mobile-menu-link"
                                            href={`${baseUrl}product/${cateData.slug}/${subCatItem.slug}`}
                                        >
                                            {subCatItem?.subCategoryName}
                                        </Link>
                                        </li>
                                    ))} 
                                  </ul> 
                              </li>
                        
                        ):(
                        <li key={cateIndex}> 
                        <Link href={`${baseUrl}product/${cateData.slug}`} className="menu-item"> 
                            <span>{cateData.name} </span> 
                          </Link>
                        </li>
                        )
                        
                       ))} 
                      </ul>
  )
}

export default MobileCategoryMenu