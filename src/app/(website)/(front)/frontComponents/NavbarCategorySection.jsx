import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'
import CategoryMenu from './CategoryMenu'

function NavbarCategorySection({allCategory, collections, categories, user, logoutUser, cartItemTotal}) {
  return (
    <div className="rts-header-nav-area-one header--sticky menu_bg">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <div className="nav-and-btn-wrapper">
          <div className="nav-area-bottom-left-header-four">
            <div className="category-btn category-hover-header five-style allcategory_display">
              <img
                className="parent"
                src={`${baseUrl}front/assets/images/icons/14.svg`}
                alt="icons"
              />
              <span className="ml--10 toggle-menu">All Categories</span>
                <CategoryMenu allCategory={allCategory || []} />
            </div>
            <div className="nav-area">
             <nav>
                          <ul className="parent-nav">
                            {collections.length > 0 && collections.map((deal, keyIndex)=>(
                              <li className={`parent`} key={keyIndex}>
                                {" "}
                                <Link href={`${baseUrl}deals/${deal.slug}`}>
                                 {deal.name}
                                </Link>
                              </li>
                            ))}
                            

                            {categories && categories.length > 0 ? (
                              categories.map((category, index) => (
                                <li
                                  className={`parent ${
                                    category.subcategories &&
                                    category.subcategories.length > 0
                                      ? "with-megamenu"
                                      : ""
                                  }`}
                                  key={index}
                                >
                                  <Link
                                    href={`${baseUrl}product/${category.slug}`}
                                  >
                                    {category.name}
                                  </Link>

                                  {/* Subcategory list */}
                                  {category.subcategories &&
                                    category.subcategories.length > 0 && (
                                      <div className="rts-megamenu">
                                        <div className="wrapper">
                                          <div className="row">
                                            <div className="col-lg-8">
                                              <div className="menu-container">
                                                {category.subcategories.map(
                                                  (subcategory, subIndex) => (
                                                    <div
                                                      className="menu-section"
                                                      key={subIndex}
                                                    >
                                                      <div className="men_heading">
                                                        <Link
                                                          href={`${baseUrl}product/${category.slug}/${subcategory.slug}`}
                                                        >
                                                          <h3>
                                                            {
                                                              subcategory.subCategoryName
                                                            }
                                                          </h3>
                                                        </Link>
                                                      </div>
                                                      <ul>
                                                        {subcategory.childcategory &&
                                                        subcategory
                                                          .childcategory
                                                          .length > 0 ? (
                                                          subcategory.childcategory.map(
                                                            (
                                                              child,
                                                              childIndex
                                                            ) => (
                                                              <li
                                                                key={childIndex}
                                                              >
                                                                <Link
                                                                  href={`${baseUrl}product/${category.slug}/${subcategory.slug}/${child.slug}`}
                                                                >
                                                                  {
                                                                    child.childCategoryName
                                                                  }
                                                                </Link>
                                                              </li>
                                                            )
                                                          )
                                                        ) : (
                                                          <li></li>
                                                        )}
                                                      </ul>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </div>

                                            {/* Right section with featured image */}
                                            <div className="col-lg-4">
                                              {category?.photo && (
                                                <Link
                                                  href={`${baseUrl}product/${category.slug}`}
                                                  className="feature-add-megamenu-area"
                                                >
                                                  <img
                                                    src={`${baseUrl}${category.photo}`}
                                                    alt={`${category.photo}`}
                                                  />
                                                </Link>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </li>
                              ))
                            ) : (
                              <li></li>
                            )}
                          </ul>
                        </nav>
            </div>
          </div>
          {/*  <div class="right-btn-area header-five"> <a href="sell-online.html" target="_blank" class="btn-narrow">
        <div class="rts-btn btn-primary btn-primary2" ><i class="fa-regular fa-user"></i> Become a Seller </div>
        </a> </div> */}
          {/* button-area end */}
        </div>
      </div>
      <div className="col-lg-12">
        <div className="logo-search-category-wrapper after-md-device-header header-mid-five-call">
          {" "}
          <Link href="/" className="logo-area">
            {" "}
            <img
              src={`${baseUrl}front/assets/images/logo-01.png`}
              alt="logo-main"
              className="logo"
            />{" "}
          </Link>
          <div className="category-search-wrapper">
          
            <form action="#" className="search-header">
              <input
                type="text"
                placeholder="Search for products, categories or brands"
                required=""
              />
              <button className="rts-btn btn-primary radious-sm with-icon">
                {" "}
                <span className="btn-text"> Search </span>{" "}
                <span className="arrow-icon">
                  {" "}
                  <i className="fa-light fa-magnifying-glass" />{" "}
                </span>{" "}
                <span className="arrow-icon">
                  <i className="fa-light fa-magnifying-glass" />{" "}
                </span>{" "}
              </button>
            </form>
          </div>
          <div className="main-wrapper-action-2 d-flex">
            <div className="accont-wishlist-cart-area-header">
               
              <div className="category-hover-header language-hover">
                {" "}
                <a href="#" className="btn-border-only account">
                  {/* <img src="assets/images/login_icon.png">  */}
                  <i className="fa-light fa-user" />
                  <span className="text"> {user ? <>{user.full_name}</> : <>Login</>}</span>{" "}
                </a>

                <ul className="category-sub-menu dropdown_fd">
                            {!user ? (
                              <>
                                <li>
                                  <Link href={`${baseUrl}user/register`}>
                                    <i className="far fa-handshake" />
                                    New customer?
                                  </Link>
                                </li>
                                <li>
                                  <Link href={`${baseUrl}user/login`}>
                                    <i className="fa fa-sign-in" />
                                    Sign In
                                  </Link>
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  <Link href={`${baseUrl}user/my-profile`}>
                                    <i className="far fa-user" />
                                    My Profile
                                  </Link>
                                </li>
                                <li>
                                  <Link href={`${baseUrl}user/myorders`}>
                                    <i className="far fa-shopping-cart" />
                                    My Orders
                                  </Link>
                                </li>
                                <li>
                                  <Link href={`${baseUrl}user/wishList`}>
                                    <i className="far fa-heart" />
                                    Wishlist
                                  </Link>
                                </li>
                                <li>
                                  <Link href={`${baseUrl}user/rewards`}>
                                    <i className="far fa-gift" />
                                    Rewards
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#" onClick={logoutUser}>
                                    <i className="far fa-right-from-bracket" />
                                    Logout
                                  </Link>
                                </li>
                              </>
                            )}
                          </ul>



               
              </div>
              {/* <a href="#" class="btn-border-only wishlist">
                                  <i class="fa-regular fa-heart"></i>
                                  Wishlist
                              </a> */}
              <div className="btn-border-only cart category-hover-header">
                {" "}
                {/* <img src={`${baseUrl}front/assets/images/cart_top_header.png`} /> */}
                <i class="fa-sharp fa-regular fa-cart-shopping"></i>
 
                <span className="number">{cartItemTotal}</span>{" "}
                <span className="text">Cart</span>{" "}
                <a href="#" className="over_link" />
              </div>
            </div>
            <div className="actions-area">
              <div className="search-btn" id="search">
                {" "}
                <svg
                  width={17}
                  height={16}
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z"
                    fill="#1F1F25"
                  />
                </svg>{" "}
              </div>
              <div className="menu-btn" id="menu-btn">
                {" "}
                <svg
                  width={20}
                  height={16}
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y={14} width={20} height={2} fill="#1F1F25" />
                  <rect y={7} width={20} height={2} fill="#1F1F25" />
                  <rect width={20} height={2} fill="#1F1F25" />
                </svg>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default NavbarCategorySection