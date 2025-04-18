import { CartContaxt, useCart } from "@/app/contaxtData/cartContaxt";
import { useCategory } from "@/app/contaxtData/CategoryProvider";
import { baseUrl } from "@/Http/helper";
import { sellerUrl } from "@/Http/urlHelper";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import CategoryMenu from "./CategoryMenu";
import MobileCategoryMenu from "./MobileCategoryMenu";
import { usePathname } from "next/navigation";

function Header() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childcategories, setChildCategories] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const { user } = useCart();
  const { allCategory } = useCategory();

 

      const pathname = usePathname();

      useEffect(() => {
        $('.rts-megamenu').css('display', 'none');

        setTimeout(() => {
        $('.rts-megamenu').css('display', '');
          
        }, 200);

      }, [pathname]);


  useEffect(() => {
    const updateCartCount = () => {
      const cartData = JSON.parse(localStorage.getItem("cart") || "[]"); 
      setCartItemTotal(cartData.length);
    };

    window.addEventListener("cartUpdated", updateCartCount);
    updateCartCount();

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/front/fetch-categories");
      const result = await response.json();
      if (response.ok) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function logoutUser(e){
    e.preventDefault()
     $('.loaderouter').css('display','flex')
            fetch(`${baseUrl}api/user/user-logout`,{
                method:"POST", 
                body:JSON.stringify({user_id:""})
            }).then((response)=>{ 
                if(!response.ok){
                    $('.loaderouter').css('display','none')
                    throw new Error("Network Error")
                }
                return response.json()
            }).then((res)=>{
                if(res.status){ 
                    window.location.reload()
                }else{ 
                    $('.loaderouter').css('display','none')
                }
            })
}
  
  return (
    <>
      <div>
        {/* rts header area start */}
        <div className="rts-header-one-area-one">
          <div className="search-header-area-main-1">
            <div className="container-fluid">
              <div className="search-header-area-main without-category">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="logo-search-category-wrapper style-five-call-us">
                      
                      <Link href="/" className="logo-area">
                        
                        <img
                          src={`${baseUrl}front/assets/images/logo-01.png`}
                          alt="logo-main"
                          className="logo"
                        />
                      </Link>
                      <Link href="#">
                        <div className="location-area">
                          <div className="icon">
                            
                            <i className="fa-light fa-location-dot" />
                          </div>
                          <div className="information">
                            
                            <span>Deliver to</span>
                            <p>India</p>
                          </div>
                        </div>
                      </Link>
                      <div className="search-container">
                        <button>
                          
                          <i className="fa-light fa-magnifying-glass" />
                        </button>
                        <input
                          type="text"
                          placeholder="Search for products, categories"
                        />
                        <button>
                          
                          <i className="fa-light fa-microphone microphone" />
                        </button>
                        <button>
                          
                          <Image
                            src={`${baseUrl}front/assets/images/camera.png`}
                            alt="Images search"
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="lazy"
                            style={{ width: "auto", height: "auto" }}
                          />
                        </button>
                      </div>
                      <div className="accont-wishlist-cart-area-header">
                        <div className="category-hover-header language-hover">
                          <Link
                            href="/user/login"
                            className="btn-border-only account"
                          >
                            
                            <i className="fa-light fa-user" />
                            {user ? <>{user.full_name}</> : <>Login</>}
                          </Link>
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
                        <div className="btn-border-only cart">
                          
                          <i className="fa-sharp fa-regular fa-cart-shopping" />
                          <span className="number">{cartItemTotal}</span>
                          <Link
                            href={`${baseUrl}cart`}
                            className="over_link"
                          />
                        </div>
                        <Link
                          href={`${sellerUrl}`}
                          target="_blank"
                          className="btn-narrow"
                        >
                          <div className="rts-btn btn-primary btn-primary2">
                            <i className="fa-regular fa-user" /> Become a Seller
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rts-header-nav-area-one header--sticky">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="nav-and-btn-wrapper">
                    <div className="nav-area-bottom-left-header-four">
                      <div className="category-btn category-hover-header five-style">
                        
                        <img
                          className="parent"
                          src={`${baseUrl}front/assets/images/icons/14.svg`}
                          alt="icons"
                        />
                        <span className="ml--10">All Categories</span>
                        <CategoryMenu allCategory={allCategory || []} />
                      </div>
                      <div className="nav-area">
                        <nav>
                          <ul className="parent-nav"> 

                          <li className={`parent`} > <Link href={`${baseUrl}deals/hot-deals`}>Hot Deals</Link></li>

                            {categories.length > 0 ? (
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
                                                       
                                                        <div className="menu-section" key={subIndex}>
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
                                                                    key={
                                                                      childIndex
                                                                    }
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
                                              
                                              {category?.photo && 
                                              <Link
                                                href={`${baseUrl}product/${category.slug}`}
                                                className="feature-add-megamenu-area"
                                              >
                                                <img
                                                  src={`${baseUrl}${category.photo}`}
                                                  alt={`${category.photo}`}
                                                />
                                              </Link>
                                              }
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
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="logo-search-category-wrapper after-md-device-header header-mid-five-call">
                    
                    <Link href={`${baseUrl}`} className="logo-area">
                      
                      <img
                        src={`${baseUrl}front/assets/images/logo-01.png`}
                        alt="logo-main"
                        className="logo"
                      />
                    </Link>
                    <div className="category-search-wrapper">
                      <div className="category-btn category-hover-header">
                        
                        <img
                          className="parent"
                          src={`${baseUrl}front/assets/images/icons/bar-1.svg`}
                          alt="icons"
                        />
                        <span>Categories</span>
                        <ul className="category-sub-menu">
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/01.svg`}
                                alt="icons"
                              />
                              <span>Breakfast &amp; Dairy</span>
                              <i className="fa-regular fa-plus" />
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/02.svg`}
                                alt="icons"
                              />
                              <span>Meats &amp; Seafood</span>
                              <i className="fa-regular fa-plus" />
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/03.svg`}
                                alt="icons"
                              />
                              <span>Breads &amp; Bakery</span>
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/04.svg`}
                                alt="icons"
                              />
                              <span>Chips &amp; Snacks</span>
                              <i className="fa-regular fa-plus" />
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/05.svg`}
                                alt="icons"
                              />
                              <span>Medical Healthcare</span>
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/06.svg`}
                                alt="icons"
                              />
                              <span>Breads &amp; Bakery</span>
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/07.svg`}
                                alt="icons"
                              />
                              <span>Biscuits &amp; Snacks</span>
                              <i className="fa-regular fa-plus" />
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/08.svg`}
                                alt="icons"
                              />
                              <span>Frozen Foods</span>
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/09.svg`}
                                alt="icons"
                              />
                              <span>Grocery &amp; Staples</span>
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="#" className="menu-item">
                              
                              <img
                                src={`${baseUrl}front/assets/images/icons/10.svg`}
                                alt="icons"
                              />
                              <span>Other Items</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <form action="#" className="search-header">
                        <input
                          type="text"
                          placeholder="Search for products, categories or brands"
                          required
                        />
                        <button className="rts-btn btn-primary radious-sm with-icon">
                          
                          <span className="btn-text"> Search </span>
                          <span className="arrow-icon">
                            
                            <i className="fa-light fa-magnifying-glass" />
                          </span>
                          <span className="arrow-icon">
                            
                            <i className="fa-light fa-magnifying-glass" />
                          </span>
                        </button>
                      </form>
                    </div>
                    <div className="main-wrapper-action-2 d-flex">
                      <div className="accont-wishlist-cart-area-header">
                        <div className="category-hover-header language-hover">
                          
                          <Link href="#" className="btn-border-only account">
                            
                            <i className="fa-light fa-user" />
                            <span className="text">Account</span>
                          </Link>
                          <ul className="category-sub-menu dropdown_fd">
                            <li>
                              
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#signup"
                                className="menu-item"
                              >
                                
                                <span>
                                  <i className="far fa-handshake" />
                                  New customer?
                                </span>
                              </Link>
                            </li>
                            <li>
                              
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#signup"
                                className="menu-item"
                              >
                                
                                <span>
                                  <i className="fa fa-sign-in" />
                                  Sign Up
                                </span>
                              </Link>
                            </li>
                            <li>
                              
                              <Link
                                href="my-profile.html"
                                className="menu-item"
                              >
                                
                                <span>
                                  <i className="far fa-user" />
                                  My Profile
                                </span>
                              </Link>
                            </li>
                            <li>
                              
                              <Link href="myorders.html" className="menu-item">
                                
                                <span>
                                  <i className="far fa-shopping-cart" />
                                  My Orders
                                </span>
                              </Link>
                            </li>
                            <li>
                              
                              <Link href="wishList.html" className="menu-item">
                                
                                <span>
                                  <i className="far fa-heart" />
                                  Wishlist
                                </span>
                              </Link>
                            </li>
                            <li>
                              
                              <Link href="rewards.html" className="menu-item">
                                
                                <span>
                                  <i className="far fa-gift" />
                                  Rewards
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="btn-border-only cart category-hover-header">
                          
                          <i className="fa-sharp fa-regular fa-cart-shopping" />
                          <span className="text">My Cart</span>
                          <Link href="#" className="over_link" />
                        </div>
                      </div>
                      <div className="actions-area">
                        <div className="search-btn" id="search">
                          
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
                          </svg>
                        </div>
                        <div className="menu-btn" id="menu-btn">
                          
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
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="side-bar" className="side-bar header-two">
          <button className="close-icon-menu">
            <i className="far fa-times" />
          </button>
          <form action="#" className="search-input-area-menu mt--30">
            <input type="text" placeholder="Search..." required />
            <button>
              <i className="fa-light fa-magnifying-glass" />
            </button>
          </form>
          <div className="mobile-menu-nav-area tab-nav-btn mt--20">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Menu
                </button>
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Category
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
                tabIndex={0}
              >
                {/* mobile menu area start */}
                <div className="mobile-menu-main">
                  <nav className="nav-main mainmenu-nav mt--30">
                    <ul className="mainmenu metismenu" id="mobile-menu-active">
                      <li>
                        
                        <Link href="products" className="main">
                          Hot Deal's
                        </Link>
                      </li>

                      <li className="has-droupdown">
                        
                        <Link href="#" className="main" aria-expanded="false">
                          Fashion
                        </Link>
                        <ul
                          className="submenu mm-collapse"
                          style={{ height: "0px" }}
                        >
                          <li className="has-droupdown third-lvl">
                            
                            <Link className="main" href="#">
                              Sub Heading
                            </Link>
                            <ul className="submenu-third-lvl mm-collapse">
                              <li>
                                <Link href="products" />
                                Fashion 1
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 2
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 3
                              </li>
                            </ul>
                          </li>
                          <li className="has-droupdown third-lvl">
                            
                            <Link className="main" href="#">
                              Sub Heading 2
                            </Link>
                            <ul className="submenu-third-lvl mm-collapse">
                              <li>
                                <Link href="products" />
                                Fashion 01
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 02
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 03
                              </li>
                            </ul>
                          </li>
                          <li className="has-droupdown third-lvl">
                            
                            <Link className="main" href="#">
                              Sub Heading 3
                            </Link>
                            <ul className="submenu-third-lvl mm-collapse">
                              <li>
                                <Link href="products" />
                                Fashion 001
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 002
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 003
                              </li>
                            </ul>
                          </li>
                          <li className="has-droupdown third-lvl">
                            
                            <Link className="main" href="#">
                              Sub Heading 4
                            </Link>
                            <ul className="submenu-third-lvl mm-collapse">
                              <li>
                                <Link href="products" />
                                Fashion 0001
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 0002
                              </li>
                              <li>
                                <Link href="products" />
                                Fashion 0003
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Home &amp; Kitchen
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Fashion
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Home &amp; Kitchen
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Beauty &amp; Health
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Electronics
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Luxury
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Holistic
                        </Link>
                      </li>
                      <li>
                        
                        <Link href="products" className="main">
                          Travel
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* mobile menu area end */}
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabIndex={0}
              >
                <div className="category-btn category-hover-header menu-category">
                  <MobileCategoryMenu allCategory ={allCategory  || []}/>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
