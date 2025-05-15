'use client';
import React from "react";
import Link from 'next/link'

const HeaderFilter = ({getSortBy, products, pageInfo}) => {

  const sortByLatest = (e) => {
    //console.log('latest', e.target.value)
    
    getSortBy(e.target.value)
  }
 

return (
<div className="filter-select-area">
            <div className="top-filter"> 
              <span>
                    {products?.length > 0 && (
                      <>Showing 1–{products.length} of {pageInfo?.totalCount} results</>
                    )}
                    </span>
              <div className="d-none d-lg-block">
              <div className="right-end">
                <span>Short By Latest</span>
                <div className="single-select">
                  <select onChange={sortByLatest}>
                    <option data-display="Best Match">Best Match</option>
                    <option value={1}>Price, low to high</option>
                    <option value={2}>Price, high to low</option>
                  </select>
                </div>
              </div>
              </div>
            </div>
          </div>
)
}
export default HeaderFilter;