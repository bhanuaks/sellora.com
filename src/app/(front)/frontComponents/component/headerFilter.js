'use client';
import React from "react";
import Link from 'next/link'

const HeaderFilter = (props) => {

  const sortByLatest = (e) => {
    //console.log('latest', e.target.value)
    
    props.getSortBy(e.target.value)
  }


return (
<div className="filter-select-area">
            <div className="top-filter">
              
              <span>
                {/* Showing 1–20 of 57 results */}
                </span>
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
)
}
export default HeaderFilter;