import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/Http/helper";
import { apiRequest } from "@/Http/apiHelper";

const CustomerReviews = ({ product_id, slug }) => {
  const [orderBy, setOrderBy] = useState("Top");
  const [totalReviews, setTotalReviews] = useState(0);
  const [average, setAverage] = useState(0);
  const [starPercentages, setStarPercentages] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [existReviews, setExistReviews] = useState(null);

  useEffect(() => {
    async function getReviewData() {
      const data = await apiRequest(
        `/api/product/fetch-review?product_id=${product_id}&orderBy=${orderBy}`,
        "GET"
      );

      
      if (data.status) {
        setTotalReviews(data.data.totalReviews);
        setStarPercentages(data.data.starPercentages);
        setReviewList(data.data.reviewList);
        setAverage(data.data.average);
        setExistReviews(data.data.existReviews);
        
      }
    }
    getReviewData();
  }, [orderBy, product_id]);

  return (
    <>
      <div className="review_section" id="ratingSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3">
                  <div className="single-tab-content-shop-details">
                    <div className="product-details-review-product-style">
                      <div className="average-stars-area-left">
                        <div className="top-stars-wrapper">
                          <div className="rating-disc">

                            <span>Customer reviews</span>
                            <div className="stars">
                              
                              <i className={`fa-star${average >0 && average < 1?"-half-alt fa-solid selected":""}  ${average >=1?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${average >1 && average < 2?"-half-alt fa-solid selected":""} ${average >=2?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${average >2 && average < 3?"-half-alt fa-solid selected":""} ${average >=3?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${average >3 && average < 4?"-half-alt fa-solid selected":""} ${average >=4?"fa-solid selected":"fa-light"}`} /> 
                              <i className={`fa-star${average >4 && average < 5?"-half-alt fa-solid selected":""} ${average >=5?"fa-solid selected":"fa-light"}`} />  
                              {/* <i className="fa-solid fa-star-half-alt" /> */}
                              <span className="out">{average.toFixed(1)} out of 5</span>
                            </div>
                          </div>
                        </div>
                        <div className="average-stars-area">
                          <span>{totalReviews.toLocaleString("en-In")} global ratings</span>
                        </div>
                        <div className="review-charts-details">
                          {starPercentages && Object.entries(starPercentages).sort(([a], [b]) => b - a).map((item, index)=>(
                           
                            
                             <div className="single-review" key={index}>
                            <div className="stars"> 
                              {item[0]} star
                            </div>
                            <div className="single-progress-area-incard">
                              <div className="progress">
                                <div
                                  className="progress-bar wow fadeInLeft"
                                  role="progressbar"
                                  style={{ width: `${item[1]}%` }}
                                  aria-valuenow={25}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                            <span className="pac">{item[1].toFixed()}%</span>
                          </div> 
                            

                          ))} 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "20px 0px" }}>
                    <div className="accordion" id="regularAccordionRobots">
                
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="regularHeadingSecond"
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#regularCollapseSecond"
                            aria-expanded="false"
                            aria-controls="regularCollapseSecond"
                          >

                            How customer reviews and ratings work
                          </button>
                        </h2>
                        <div
                          id="regularCollapseSecond"
                          className="accordion-collapse collapse"
                          aria-labelledby="regularHeadingSecond"
                          data-bs-parent="#regularAccordionRobots"
                        >
                          <div className="accordion-body">
                            Customer Reviews, including Product Star Ratings
                            help customers to learn more about the product and
                            decide whether it is the right product for them. To
                            calculate the overall star rating and percentage
                            breakdown by star, we don’t use a simple average.
                            Instead, our system considers things like how recent
                            a review is and if the reviewer bought the item on
                            Amazon. It also analyzed reviews to verify
                            trustworthiness.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="rewi_area">
                    <h6>Review this product</h6>
                    <p>Share your thoughts with other customers</p>
                    <div className="write_button">
                      <Link href={`${baseUrl}user/product-review/${slug}`}>{existReviews?"Edit customer review":"Write a customer review"}</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="suctormers_story">
                    <h6>Customers say</h6>
                    {/* <p>
                      Customers like the sound quality, battery life, and
                      appearance of the headphones. For example, they mention
                      the music is clear, they're noise-canceling, and it lasts
                      all day. That said, some complain about the fit. Opinions
                      are mixed on quality, comfort, and performance.
                    </p>
                    <div className="ai_generated">
                      AI-generated from the text of customer reviews
                    </div>
                    <div className="link_list">
                      <h6>Select to learn more</h6>
                      <ul>
                        <li>
                          <i
                            className="fa
                        fa-check-circle"
                          />
                          <Link href="#">Sound quality</Link>
                        </li>
                        <li>
                          <i
                            className="fa
                                fa-check-circle"
                          />
                          <Link href="#">Value</Link>
                        </li>
                        <li>
                          <i
                            className="fa fa-check-circle"
                          />
                          <Link href="#">Battery life</Link>
                        </li>
                        <li>
                          <i
                            className="fa fa-check-circle"
                          />
                          <Link href="#">Appearance</Link>
                        </li>
                        <li>
                          <i
                            className="fa fa-check-circle"
                          />
                          <Link href="#">Quality</Link>
                        </li>
                        <li>
                          <i
                            className="fa fa-check-circle"
                          />
                          <Link href="#">Comfort</Link>
                        </li>
                        <li>
                          <i
                            className="fa fa-check-circle"
                          />
                          <Link href="#">Performance</Link>
                        </li>
                      </ul>
                    </div> */}
                   
                    <div className="list_drop">
                      <select value={orderBy} onChange={(e)=>setOrderBy(e.target.value)}>
                        <option value={"Top"}>Top Review</option>
                        <option value={"Most"}>Most Recent</option>
                      </select>
                    </div>
                    <div className="clear" />
                    <div className="col-lg-12">
                      <div className="rew_display">
                        <h6>Top reviews from the United States</h6>
                      </div>
                     
                      {reviewList.length >0  &&  reviewList.map((singleReview, index)=>(
                            <div className="rew_display" key={index}>
                            <div className="viewr">
                              <img
                                src={`${baseUrl}front/assets/images/review_testi.png`}
                              />
                             {singleReview.user?.full_name}
                            </div>
                            <div className="yellow">
                              <i className={`fa-solid fa-star ${singleReview.star >=1?"selected":""}`} />
                              <i className={`fa-solid fa-star ${singleReview.star >=2?"selected":""}`} />
                              <i className={`fa-solid fa-star ${singleReview.star >=3?"selected":""}`} />
                              <i className={`fa-solid fa-star ${singleReview.star >=4?"selected":""}`} />
                              <i className={`fa-solid fa-star ${singleReview.star >=5?"selected":""}`} />
                              <span className="out_2">
                                &nbsp;{singleReview.title}
                              </span>
                            </div>
                            <div className="review_description">
                              <p>
                              {singleReview.message}
                              </p>
                            </div>
                            </div>
                      ))}



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerReviews;
