import { CartContaxt, useCart } from "@/app/(website)/contaxtData/cartContaxt";
import { useCategory } from "@/app/(website)/contaxtData/CategoryProvider";
import { baseUrl } from "@/Http/helper";
import { sellerUrl } from "@/Http/urlHelper";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import CategoryMenu from "./CategoryMenu";
import MobileCategoryMenu from "./MobileCategoryMenu";
import { usePathname } from "next/navigation";
import MobileMenuSection from "./MobileMenuSection";
import NavbarCategorySection from "./NavbarCategorySection";

function Header() {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childcategories, setChildCategories] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const { user } = useCart();
  const { allCategory } = useCategory();

  const pathname = usePathname();

  useEffect(() => {
    $(".rts-megamenu").css("display", "none");
    $(".category-sub-menu2").css("display", "none");
    $("#side-bar").removeClass("show");
    $("#anywhere-home").removeClass("bgshow");

    setTimeout(() => {
      $(".rts-megamenu").css("display", "");
      $(".category-sub-menu2").css("display", "");

    }, 200);
  }, [pathname]);

  useEffect(() => {
    const updateCartCount = () => {
      const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");
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

  function logoutUser(e) {
    e.preventDefault();
    $(".loaderouter").css("display", "flex");
    fetch(`${baseUrl}api/user/user-logout`, {
      method: "POST",
      body: JSON.stringify({ user_id: "" }),
    })
      .then((response) => {
        if (!response.ok) {
          $(".loaderouter").css("display", "none");
          throw new Error("Network Error");
        }
        return response.json();
      })
      .then((res) => {
        if (res.status) {
          window.location.reload();
        } else {
          $(".loaderouter").css("display", "none");
        }
      });
  }


  useEffect(()=>{

    fetch('/api/front/collections')
    .then((response)=>{
      if(!response.ok){
        throw new Error("Network Error")
      }
      return response.json();
    }).then((res)=>{
      if(res.status){
        setCollections(res.data.collection)
      }
    })
  },[])

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
                      {/* all category start */}
                     <div className="category-btn">
  {" "}
          <span className="ml--10 toggle-menu">All Category</span>
          <CategoryMenu allCategory={allCategory} />
        </div>

{/* all category end */}
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
                          <img
                            src={`${baseUrl}front/assets/images/camera.png`}
                            alt="Images search" 
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
                          <Link href={`${baseUrl}cart`} className="over_link" />
                        </div>
                        <Link
                          href={`${sellerUrl}`}
                          target="_blank"
                          className="btn-narrow"
                        >
                          <div className="rts-btn become_a_seller">
                            {/* <i className="fa-regular fa-user" />  */}
                            Become a Seller
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <NavbarCategorySection 
           allCategory={allCategory || []}
           collections={collections || []}
           categories={categories || []}
           user={user}
           logoutUser={logoutUser}
           cartItemTotal={cartItemTotal}
           />
         
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
                  <MobileMenuSection categories={categories} collections={collections}/>
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
                  <MobileCategoryMenu allCategory={allCategory || []} />
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
