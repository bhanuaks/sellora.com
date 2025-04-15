
'use client';
import React from "react";
import Link from 'next/link'

const CustomerReviewFilter = (props) => {

 const getReviewSelected = (e) => {

  props.getReview(e.target.value)

 }



  return (
<div className="single-filter-box">
<h5 className="title">Customer Reviews</h5>
<div className="filterbox-body">
  <div className="category-wrapper ">
    {/* single category */}
    
    <div className="single-category">
      <input id="reviewall" type="radio" name="radio" value={0} onClick={getReviewSelected} />
      <label htmlFor="reviewall">All </label>
    </div>

    <div className="single-category">
      <input id="review5" type="radio" name="radio" value={4} onClick={getReviewSelected} />
      <label htmlFor="review5">
        <i className="fa-solid fa-star" />{" "}
        <i className="fa-solid fa-star" />
        <i className="fa-solid fa-star" />{" "}
        <i className="fa-solid fa-star" />{" "}
        <i className="far fa-star" />
        &amp; up
      </label>
    </div>
    <div className="single-category">
      <input id="review4" type="radio" name="radio" value={3} onClick={getReviewSelected} />
      <label htmlFor="review4">
        <i className="fa-solid fa-star" />{" "}
        <i className="fa-solid fa-star" />
        <i className="fa-solid fa-star" />{" "}
        <i className="far fa-star" />{" "}
        <i className="far fa-star" />
        &amp; up
      </label>
    </div>
    <div className="single-category">
      <input id="review2" type="radio" name="radio" value={2} onClick={getReviewSelected} />
      <label htmlFor="review2">
        <i className="fa-solid fa-star" />{" "}
        <i className="fa-solid fa-star" />
        <i className="far fa-star" />{" "}
        <i className="far fa-star" />{" "}
        <i className="far fa-star" />
        &amp; up
      </label>
    </div>
    <div className="single-category">
      <input id="review1" type="radio" name="radio" value={1} onClick={getReviewSelected} />
      <label htmlFor="review1">
        <i className="fa-solid fa-star" />{" "}
        <i className="far fa-star" />
        <i className="far fa-star" />{" "}
        <i className="far fa-star" />{" "}
        <i className="far fa-star" />
        &amp; up
      </label>
    </div>
  </div>
</div>
</div>
  )
}

export default CustomerReviewFilter;