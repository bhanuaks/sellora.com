"use client"
import Link from 'next/link'
import React, { useEffect } from 'react' 
import MetisMenu from "metismenujs";
import { usePathname, useRouter } from 'next/navigation';
// import "metismenujs/dist/metismenujs.css";



const Header = () => {

    const currentPath = usePathname();
        const handleLogout = async () => {
          try {
            $('.loader-container').css('display','flex')
            const res = await fetch('/admin-login/api/logout', {
              method: 'POST', 
            })
            if (res.ok) {
              window.location.reload();
            }
            $('.loader-container').css('display','none')
          } catch (error) {
            $('.loader-container').css('display','none')
            console.error('Logout error:', error)
          }
        }
        // useEffect(() => {
        //     new MetisMenu("#side-menu");
        //   }, []);

         
       
    return (
        
        <div id="layout-wrapper">
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        {/* LOGO */}
                        <div className="navbar-brand-box"> 
                            <Link href="/admin/dashboard" className="logo logo-dark"> 
                            <span className="logo-sm"> <img src="/assets-admin/assets/images/small_logo.png" height={50} /> </span> <span className="logo-lg">
                            <img src="/assets-admin/assets/images/logo.png" height={40} /> </span> </Link>
                            <Link href="/admin/dashboard" className="logo logo-light"> <span className="logo-sm"> <img src="/assets-admin/assets/images/logo-sm.svg" height={24} /> </span> <span className="logo-lg"> <img src="/assets-admin/assets/images/logo-sm.svg" height={24} /> <span className="logo-txt">Sellora</span> </span> </Link> </div>
                        <button type="button" className="btn btn-sm font-size-16 header-item" id="vertical-menu-btn"> <i className="fa fa-fw fa-bars" /> </button>
                        {/* App Search*/}
                        <div className="app-search d-none d-lg-block admin_heading">
                            <div className="position-relative">
                                <h1>Admin Panel</h1>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-inline-block d-lg-none ms-2">
                            <button type="button" className="btn header-item" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i data-feather="search" className="icon-lg" /> </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Search Result" />
                                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item topbar-light bg-light-subtle" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img className="rounded-circle header-profile-user" src="/assets-admin/assets/images/users/avatar-1.jpg" alt="Header Avatar" /> <span className="d-none d-xl-inline-block ms-1 fw-medium">Sellora</span> <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <Link className="dropdown-item" href="/admin/change-password"><i className="mdi mdi-lock font-size-16 align-middle me-1" /> Change Password</Link>
                                <div className="dropdown-divider" />
                                <Link className="dropdown-item" href="#" onClick={handleLogout}><i className="mdi mdi-logout font-size-16 align-middle me-1" /> Logout</Link></div>
                        </div>
                    </div>
                </div>
            </header>
            {/* ========== Left Sidebar Start ========== */}
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                              <li> <Link href="/admin/dashboard" className={`${currentPath == "/admin/dashboard"?"dashboard":''}`}> <i data-feather="home" /> <span data-key="t-dashboard">Dashboard</span></Link></li>
                           
                            <li> <Link href="/admin/add-variant" className={`${currentPath == "/admin/add-variant"?"dashboard":''}`}> 
                            <i data-feather="briefcase" /> <span>Add Variant</span> </Link> </li> 

                            <li> <Link href=""   className={`has-arrow ${["/admin/category/sub-category", "/admin/category/category", "/admin/category/child-category" ].includes(currentPath)?"dashboard":''}`}> <i data-feather="grid" /> <span data-key="t-apps">Category</span></Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/admin/category/category"> Add Category</Link></li>
                                    <li><Link href="/admin/category/sub-category"> Add Sub Category</Link></li>
                                    <li><Link href="/admin/category/child-category"> Add Child Category</Link></li>
                                </ul>
                            </li>

                            {/* <li> <Link href="" className="has-arrow"> <i data-feather="grid" /> <span data-key="t-apps">Variant</span></Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/admin/variant/size"> Size</Link></li>
                                    <li><Link href="/admin/variant/color"> Color</Link></li>
                                    <li><Link href="/admin/variant/package-length">  Package Length </Link></li>
                                    <li><Link href="/admin/variant/package-breadth">  Package Breadth</Link></li>
                                    <li><Link href="/admin/variant/package-height">  Package Height</Link></li>
                                    <li><Link href="/admin/variant/package-weight">  Package Weight</Link></li>
                                    <li><Link href="/admin/variant/item-length"> Item Length</Link></li>
                                    <li><Link href="/admin/variant/item-breadth"> Item Breadth </Link></li>
                                    <li><Link href="/admin/variant/item-height">  Item Height</Link></li>
                                    <li><Link href="/admin/variant/item-weight">  Item Weight</Link></li>
                                    
                                </ul>
                            </li> */}
                            <li> <Link href="" className={`has-arrow ${["/admin/product"].includes(currentPath)?"dashboard":''}`}> <i data-feather="grid" /> <span data-key="t-apps">Products</span> </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/admin/product"> View Product</Link></li>
                                </ul>
                            </li>

                            <li> <Link href="" className={`has-arrow ${["/admin/brand/brand-pending", "/admin/brand/brand-rejected", "/admin/brand/brand-list"].includes(currentPath)?"dashboard":''}`}> <i data-feather="grid" /> <span data-key="t-apps">Brand</span> </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/admin/brand/brand-pending"> Pending Brand</Link></li>
                                    <li><Link href="/admin/brand/brand-rejected"> Rejected Brand</Link></li>
                                    <li><Link href="/admin/brand/brand-list"> Brand List</Link></li>
                                    
                                </ul>
                            </li>

                            <li> <Link href="" className={`has-arrow ${["/admin/vendor/view-vendor"].includes(currentPath)?"dashboard":''}`}> <i data-feather="users" /> <span data-key="t-authentication">Vendor</span> </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    {/* <li><Link href="add-vendor">Add Vendor</Link></li> */}
                                    <li><Link href="/admin/vendor/view-vendor">View Vendor</Link></li>
                                </ul>
                            </li>
                            <li> <Link href="/admin/new-order" className={`  ${currentPath == "/admin/new-order" ?"dashboard":''}`}> <i data-feather="briefcase" /> <span>New Order</span> </Link> </li>
                            <li> <Link href="/admin/all-order" className={`  ${currentPath == "/admin/all-order" ?"dashboard":''}`}> <i data-feather="briefcase" /> <span>All Order</span> </Link> </li>
                            <li> <Link href="/admin/coupon" className={`  ${currentPath == "/admin/coupon" ?"dashboard":''}`}> <i data-feather="gift" /> <span>Coupons </span> </Link> </li>
                            <li> <Link href="" className={`has-arrow ${["/admin/career/location","/admin/career/category","/admin/career/jop","/admin/career/jop-equery"].includes(currentPath)?"career":''}`}> <i data-feather="users" /> <span data-key="t-authentication">Career</span> </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    {/* <li><Link href="add-vendor">Add Vendor</Link></li> */}
                                    <li><Link href="/admin/career/location">Location</Link></li>
                                    <li><Link href="/admin/career/category">Category</Link></li>
                                    <li><Link href="/admin/career/job">Job</Link></li>
                                    <li><Link href="/admin/career/job-equiry">Job Enquiry</Link></li>
                                </ul>
                            </li>

                            <li> <Link href="" className={`has-arrow ${["/admin/banner/mainbanner", "/admin/banner/otherbanner"].includes(currentPath)?"dashboard":''}`}> <i data-feather="grid" /> <span data-key="t-apps">Banner</span> </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/admin/banner/mainbanner"> Main Banner</Link></li>
                                    <li><Link href="/admin/banner/otherbanner"> Other Banner</Link></li> 
                                </ul>
                            </li> 
                            <li> <Link href="/admin/dealbanner" className={`  ${currentPath == "/admin/dealbanner" ?"dashboard":''}`}> <i data-feather="gift" /> <span>Deal Banner </span> </Link> </li> 
                            <li> <Link href="/admin/featurebanner" className={`  ${currentPath == "/admin/featurebanner" ?"dashboard":''}`}> <i data-feather="gift" /> <span>Feature Banner </span> </Link> </li>

                            <li> <Link href="" className={`has-arrow ${["/admin/contact-us", "/admin/report-infringement"].includes(currentPath)?"dashboard":''}`}> <i data-feather="users" /> <span data-key="t-apps">Enquiry</span> </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/admin/contact-us"> Contact Us</Link></li>
                                    <li><Link href="/admin/report-infringement"> Report Infringement</Link></li> 
                                </ul>
                            </li>
                        </ul>
                     </div>
                    {/* Sidebar */}
                </div>
            </div>
        </div>
        
    )
}

export default Header;