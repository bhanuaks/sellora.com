import React from 'react'

export default function Modal() {
  return (
    <>
  {/* Modal */}
  <div
    className="modal modal-compare-area-start fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Products Compare
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="compare-main-wrapper-body">
            <div className="single-compare-elements name">Preview</div>
            <div className="single-compare-elements">
              <div className="thumbnail-preview">
                {" "}
                <img src="assets/images/grocery/01.jpg" alt="grocery" />{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="thumbnail-preview">
                {" "}
                <img src="assets/images/grocery/02.jpg" alt="grocery" />{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="thumbnail-preview">
                {" "}
                <img src="assets/images/grocery/03.jpg" alt="grocery" />{" "}
              </div>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname spacifiq">
            <div className="single-compare-elements name">Name</div>
            <div className="single-compare-elements">
              <p>J.Crew Mercantile Women's Short</p>
            </div>
            <div className="single-compare-elements">
              <p>Amazon Essentials Women's Tanks</p>
            </div>
            <div className="single-compare-elements">
              <p>Amazon Brand - Daily Ritual Wom</p>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname">
            <div className="single-compare-elements name">Price</div>
            <div className="single-compare-elements price">
              <p>$25.00</p>
            </div>
            <div className="single-compare-elements price">
              <p>$39.25</p>
            </div>
            <div className="single-compare-elements price">
              <p>$12.00</p>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname">
            <div className="single-compare-elements name">Description</div>
            <div className="single-compare-elements discription">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
              </p>
            </div>
            <div className="single-compare-elements discription">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
              </p>
            </div>
            <div className="single-compare-elements discription">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
              </p>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname">
            <div className="single-compare-elements name">Rating</div>
            <div className="single-compare-elements">
              <div className="rating">
                {" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />
                <span>(25)</span>{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="rating">
                {" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />
                <span>(19)</span>{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="rating">
                {" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />{" "}
                <i className="fa-solid fa-star" />
                <span>(120)</span>{" "}
              </div>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname">
            <div className="single-compare-elements name">Weight</div>
            <div className="single-compare-elements">
              <div className="rating">
                <p>320 gram</p>
              </div>
            </div>
            <div className="single-compare-elements">
              <p>370 gram</p>
            </div>
            <div className="single-compare-elements">
              <p>380 gram</p>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname">
            <div className="single-compare-elements name">Stock status</div>
            <div className="single-compare-elements">
              <div className="instocks">
                {" "}
                <span>In Stock</span>{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="outstocks">
                {" "}
                <span className="out-stock">Out Of Stock</span>{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="instocks">
                {" "}
                <span>In Stock</span>{" "}
              </div>
            </div>
          </div>
          <div className="compare-main-wrapper-body productname">
            <div className="single-compare-elements name">Buy Now</div>
            <div className="single-compare-elements">
              <div className="cart-counter-action">
                {" "}
                <a
                  href="#"
                  className="rts-btn btn-primary radious-sm with-icon"
                >
                  <div className="btn-text"> Add To Cart </div>
                  <div className="arrow-icon">
                    {" "}
                    <i className="fa-regular fa-cart-shopping" />{" "}
                  </div>
                  <div className="arrow-icon">
                    {" "}
                    <i className="fa-regular fa-cart-shopping" />{" "}
                  </div>
                </a>{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="cart-counter-action">
                {" "}
                <a
                  href="#"
                  className="rts-btn btn-primary radious-sm with-icon"
                >
                  <div className="btn-text"> Add To Cart </div>
                  <div className="arrow-icon">
                    {" "}
                    <i className="fa-regular fa-cart-shopping" />{" "}
                  </div>
                  <div className="arrow-icon">
                    {" "}
                    <i className="fa-regular fa-cart-shopping" />{" "}
                  </div>
                </a>{" "}
              </div>
            </div>
            <div className="single-compare-elements">
              <div className="cart-counter-action">
                {" "}
                <a
                  href="#"
                  className="rts-btn btn-primary radious-sm with-icon"
                >
                  <div className="btn-text"> Add To Cart </div>
                  <div className="arrow-icon">
                    {" "}
                    <i className="fa-regular fa-cart-shopping" />{" "}
                  </div>
                  <div className="arrow-icon">
                    {" "}
                    <i className="fa-regular fa-cart-shopping" />{" "}
                  </div>
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* =======================signu-up====================== */}
  {/* Modal */}
  <div
    className="modal signup_erea fade"
    id="signup"
    tabIndex={-1}
    aria-labelledby="signup"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="close-reg"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            X
          </button>
          <div className="main-register fl-wrap col-container">
            <div className="row">
              <div className="col-lg-4  col left_side_panel_login">
                <h2>Looks like you're New customer here!</h2>
                <p> Sign up with your mobile number to get started</p>
                <br />
                <img src="assets/images/login.png" />
              </div>
              <div className="col-lg-8 col">
                <div className="mrl_20 mt--60">
                  <div className="container">
                    <div className="row">
                      {/* <div className="col-lg-12">
            <h3><span>Universal Student Homes</span> Login</h3>
          </div> */}
                      <div className="col-lg-12">
                        <div className="custom-form">
                          <form action="#" className="registration-form">
                            <div className="input-wrapper">
                              <label htmlFor="email">Enter Mobile Number</label>
                              <input
                                type="email"
                                placeholder="Enter Mobile Number"
                              />
                              <p>
                                we'll send you <strong>OTP</strong> on your
                                email address
                              </p>
                            </div>
                            {/* <div className="input-wrapper">
                          <label for="password">Password*</label>
                          <input type="password" id="password">
                      </div> */}
                            <button className="rts-btn btn-primary">
                              Continue
                            </button>
                            <div className="another-way-to-registration">
                              <div className="registradion-top-text">
                                {" "}
                                <span>Or</span>{" "}
                              </div>
                              <div className="login-with-brand">
                                {" "}
                                <a href="#" className="single">
                                  {" "}
                                  <img
                                    src="assets/images/form/google.svg"
                                    alt="login"
                                  />{" "}
                                </a>{" "}
                                <a href="#" className="single faceboomk_button">
                                  {" "}
                                  <i className="fa-brands fa-facebook-f" />{" "}
                                  Facebook{" "}
                                </a>
                              </div>
                              {/*   <p>Existing User? <a href="#">Login</a></p> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="search-input-area">
    <div className="container">
      <div className="search-input-inner">
        <div className="input-div">
          <input
            id="searchInput1"
            className="search-input"
            type="text"
            placeholder="Search by keyword or #"
          />
          <button>
            <i className="far fa-search" />
          </button>
        </div>
      </div>
    </div>
    <div id="close" className="search-close-icon">
      <i className="far fa-times" />
    </div>
  </div>
</>

  )
}
