"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'


function page() {

    useEffect(() => {
        const counters = document.querySelectorAll('.counter-value');
        counters.forEach((counter) => {
          (function updateCounter() {
            const target = +counter.getAttribute('data-target');
            let current = +counter.innerText;
            let increment = target / 250;
    
            if (increment < 1) increment = 1;
    
            if (current < target) {
              counter.innerText = (current + increment).toFixed(0);
              setTimeout(updateCounter, 1);
            } else {
              counter.innerText = target;
            }
          })();
        });
      }, []);
    return (
        <>
            {/* Hello world */}
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">Dashboard</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript:void(0);">Dashboard</a>
                                            </li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-h-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-10"> 
                                                <span className="new-user mb-3">Total Vendor</span>
                                                <h4 className="mb-3"> 
                                                    <span className="counter-value" data-target={20}>
                                                        0
                                                    </span>
                                                </h4>
                                            </div>
                                            <div className="col-2 border2 bg-success-subtle2"> 
                                                <i data-feather="users" />
                                            </div>
                                        </div>
                                        <div className="text-nowrap"> 
                                            <span className="ms-1">Monthly Vendor</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end col */}
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-h-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-10">
                                                
                                                <span className="new-user mb-3"> Total Earnings</span>
                                                <h4 className="mb-3">
                                                    <span className="rupee">$</span>
                                                    <span className="counter-value" data-target="559.25" />
                                                </h4>
                                            </div>
                                            <div className="col-2 border2 bg-info-subtle2">
                                                
                                                <i data-feather="shopping-cart" />
                                            </div>
                                        </div>
                                        <div className="text-nowrap">
                                            
                                            <span className="ms-1">View net earnings</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end col*/}
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-h-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-10">
                                                
                                                <span className="new-user mb-3">Total Clients</span>
                                                <h4 className="mb-3">
                                                    
                                                    <span className="counter-value" data-target={500}>
                                                        0
                                                    </span>
                                                </h4>
                                            </div>
                                            <div className="col-2 border2 bg-warning-subtle2">
                                                
                                                <i data-feather="users" />
                                            </div>
                                        </div>
                                        <div className="text-nowrap">
                                            {/* <span className="badge badge-soft-success text-success">-2</span> */}
                                            <span className="ms-1">Clients</span>
                                        </div>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                            {/* end col */}
                            {/* end col */}
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-h-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-10">
                                                
                                                <span className="new-user mb-3">Order</span>
                                                <h4 className="mb-3">
                                                    
                                                    <span className="counter-value" data-target={36894}>
                                                        0
                                                    </span>
                                                </h4>
                                            </div>
                                            <div className="col-2 border2 bg-info-subtle2">
                                                
                                                <i data-feather="shopping-cart" />
                                            </div>
                                        </div>
                                        <div className="text-nowrap">
                                            
                                            <span className="ms-1">View all orders</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end col*/}
                            {/* end col */}
                        </div>
                        {/* end row*/}
                        {/* end row*/}
                        <div className="row">
                            {/* end col */}
                            <div className="col-xl-9">
                                <div className="card">
                                    <div className="card-header align-items-center d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
                                    </div>
                                    {/* end card header */}
                                    <div className="card-body  ">
                                        <div className="tab-content">
                                            <div
                                                className="tab-pane active"
                                                id="transactions-all-tab"
                                                role="tabpanel"
                                            >
                                                <div className="table-responsive">
                                                    {/* id="example2" */}
                                                    <table className="table table-bordered table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th width={10}>Sl No.</th>
                                                                <th width={250}>Product</th>
                                                                <th width={140}>Order ID </th>
                                                                <th width={130}>Customer Name </th>
                                                                <th>Mobile</th>
                                                                <th>Amount</th>
                                                                <th>Vendor</th>
                                                                <th width={120}>Delivery Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <div className="products_name">
                                                                        Apple AirPods Max Over-Ear Wireless Headphone
                                                                        <br />
                                                                        <span className="date_dj">
                                                                            3 August at 3:16 pm
                                                                        </span>
                                                                    </div>
                                                                    {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                                                                </td>
                                                                <td>
                                                                    <span className="unfull_1">
                                                                        <a href="invoice.html" target="_blank">
                                                                            #SEL8798
                                                                        </a>
                                                                    </span>
                                                                    <br />
                                                                    <a href="#" className="orange2">
                                                                        Accept order
                                                                    </a>
                                                                </td>
                                                                <td>Ravi Kumar</td>
                                                                <td>9891000000</td>
                                                                <td>
                                                                    <span className="online_price">
                                                                        <strong>$</strong>12,821.79
                                                                    </span>
                                                                </td>
                                                                <td>Zoetic Fashion</td>
                                                                {/* <a href="#"><span className="btn acepte btn-rounded">Paid</span></a> </td>*/}
                                                                <td>
                                                                    <span className="orange">Pending</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <div className="products_name">
                                                                        Apple AirPods Max Over-Ear Wireless Headphone
                                                                        <br />
                                                                        <span className="date_dj">
                                                                            3 August at 3:16 pm
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="unfull_1">
                                                                        <a href="invoice.html" target="_blank">
                                                                            #SEL8798
                                                                        </a>
                                                                    </span>
                                                                    <br />
                                                                    <span className="green2">Accepted order</span>
                                                                </td>
                                                                <td>Ravi Kumar</td>
                                                                <td>9891000000</td>
                                                                <td>
                                                                    <span className="online_price">
                                                                        <strong>$</strong>12,821.79
                                                                    </span>
                                                                </td>
                                                                <td>Zoetic Fashion</td>
                                                                <td>
                                                                    <span className="blue">Proceed</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    <div className="products_name">
                                                                        Smart Speaker &amp; Google Assistant, Light Grey
                                                                        <br />
                                                                        <span className="date_dj">
                                                                            3 August at 3:16 pm
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="unfull_1">
                                                                        <a href="invoice.html" target="_blank">
                                                                            #SEL8798
                                                                        </a>
                                                                    </span>
                                                                    <br />
                                                                    <a href="#" className="orange2">
                                                                        Accept order
                                                                    </a>
                                                                </td>
                                                                <td>Ravi Kumar</td>
                                                                <td>9891000000</td>
                                                                <td>
                                                                    <span className="online_price">
                                                                        <strong>$</strong>12,821.79
                                                                    </span>
                                                                </td>
                                                                <td>Zoetic Fashion</td>
                                                                <td>
                                                                    <span className="out_of_delivery_dark_blue">
                                                                        Out for Delivery
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    <div className="products_name">
                                                                        Electric 1.8 liter Multi Cooker <br />
                                                                        <span className="date_dj">
                                                                            3 August at 3:16 pm
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="unfull_1">
                                                                        <a href="invoice.html" target="_blank">
                                                                            #SEL8798
                                                                        </a>
                                                                    </span>
                                                                    <br />
                                                                    <span className="green2">Accepted order</span>
                                                                </td>
                                                                <td>Ravi Kumar</td>
                                                                <td>9891000000</td>
                                                                <td>
                                                                    <span className="online_price">
                                                                        <strong>$</strong>12,821.79
                                                                    </span>
                                                                </td>
                                                                <td>Zoetic Fashion</td>
                                                                <td>
                                                                    <span className="green">Delivered</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {/* end tab pane */}
                                        </div>
                                        {/* end tab content */}
                                    </div>
                                    {/* end card body */}
                                </div>
                                {/* end card */}
                            </div>
                            <div className="col-xl-3">
                                <div className="card bg-primary text-white shadow-primary card-h-100">
                                    <div className="card-body p-0">
                                        <div
                                            id="carouselExampleCaptions"
                                            className="carousel slide text-center widget-carousel"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <div className="text-center p-4">
                                                        <h4 className="mt-3 lh-base fw-normal text-white">
                                                            Notification
                                                        </h4>
                                                        <p className="text-white-50 font-size-13">
                                                            Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s
                                                        </p>
                                                        <button type="button" className="btn btn-light btn-sm">
                                                            View details
                                                            <i className="mdi mdi-arrow-right ms-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <div className="text-center p-4">
                                                        <h4 className="mt-3 lh-base fw-normal text-white">
                                                            Notification
                                                        </h4>
                                                        <p className="text-white-50 font-size-13">
                                                            Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s,
                                                        </p>
                                                        <button type="button" className="btn btn-light btn-sm">
                                                            View details
                                                            <i className="mdi mdi-arrow-right ms-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <div className="text-center p-4">
                                                        <h4 className="mt-3 lh-base fw-normal text-white">
                                                            Notification
                                                        </h4>
                                                        <p className="text-white-50 font-size-13">
                                                            Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s,
                                                        </p>
                                                        <button type="button" className="btn btn-light btn-sm">
                                                            View details
                                                            <i className="mdi mdi-arrow-right ms-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-indicators carousel-indicators-rounded">
                                                <button
                                                    type="button"
                                                    data-bs-target="#carouselExampleCaptions"
                                                    data-bs-slide-to={0}
                                                    className="active"
                                                    aria-current="true"
                                                    aria-label="Slide 1"
                                                />
                                                <button
                                                    type="button"
                                                    data-bs-target="#carouselExampleCaptions"
                                                    data-bs-slide-to={1}
                                                    aria-label="Slide 2"
                                                />
                                                <button
                                                    type="button"
                                                    data-bs-target="#carouselExampleCaptions"
                                                    data-bs-slide-to={2}
                                                    aria-label="Slide 3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end row */}
                    </div>
                    {/* container-fluid */}
                </div>
                {/* End Page-content */}
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                
                                Copyright © 2024 Sellora | All Rights Reserved.
                            </div>
                            <div className="col-sm-6">
                                <div className="text-sm-end d-none d-sm-block">
                                    
                                    <a
                                        href="https://www.akswebsoft.com/"
                                        title="AKS Websoft Consulting Pvt. Ltd."
                                        target="_blank"
                                    >
                                        <img
                                            src="assets/images/aks2.png"
                                            alt="AKS Websoft Consulting Pvt. Ltd."
                                            className="powerd"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>

    );
}

export default page;