import Link from 'next/link'
import React from 'react'


const Footer = () => {
    return (

        <div>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6"> Copyright © 2024 Sellora | All Rights Reserved.</div>
                        <div className="col-sm-6">
                            <div className="text-sm-end d-none d-sm-block"> <Link href="https://www.akswebsoft.com/" title="AKS Websoft Consulting Pvt. Ltd." target="_blank"><img src="/assets-admin/assets/images/aks2.png" alt="AKS Websoft Consulting Pvt. Ltd." className="powerd" /></Link> </div>
                        </div>
                    </div>
                </div>
            </footer>
        
            <div className="right-bar">
                <div data-simplebar className="h-100">
                    <div className="rightbar-title d-flex align-items-center p-3">
                        <h5 className="m-0 me-2">Theme Customizer</h5>
                        <Link href="" className="right-bar-toggle ms-auto"> <i className="mdi mdi-close noti-icon" /> </Link> </div>
                   
                    <hr className="m-0" />
                    <div className="p-4">
                        <h6 className="mb-3">Layout</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout" id="layout-vertical" defaultValue="vertical" />
                            <label className="form-check-label" htmlFor="layout-vertical">Vertical</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout" id="layout-horizontal" defaultValue="horizontal" />
                            <label className="form-check-label" htmlFor="layout-horizontal">Horizontal</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2">Layout Mode</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-mode" id="layout-mode-light" defaultValue="light" />
                            <label className="form-check-label" htmlFor="layout-mode-light">Light</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-mode" id="layout-mode-dark" defaultValue="dark" />
                            <label className="form-check-label" htmlFor="layout-mode-dark">Dark</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2">Layout Width</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-width" id="layout-width-fuild" defaultValue="fuild" onChange={() => document.body.setAttribute('data-layout-size', 'fluid')} />
                            <label className="form-check-label" htmlFor="layout-width-fuild">Fluid</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-width" id="layout-width-boxed" defaultValue="boxed" onChange={() => document.body.setAttribute('data-layout-size', 'boxed')} />
                            <label className="form-check-label" htmlFor="layout-width-boxed">Boxed</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2">Layout Position</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-position" id="layout-position-fixed" defaultValue="fixed" onChange={() => document.body.setAttribute('data-layout-scrollable', 'false')} />
                            <label className="form-check-label" htmlFor="layout-position-fixed">Fixed</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-position" id="layout-position-scrollable" defaultValue="scrollable" onChange={() =>document.body.setAttribute('data-layout-scrollable', 'true')} />
                            <label className="form-check-label" htmlFor="layout-position-scrollable">Scrollable</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2">Topbar Color</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="topbar-color" id="topbar-color-light" defaultValue="light" onChange={() =>document.body.setAttribute('data-topbar', 'light')} />
                            <label className="form-check-label" htmlFor="topbar-color-light">Light</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="topbar-color" id="topbar-color-dark" defaultValue="dark" onChange={() =>document.body.setAttribute('data-topbar', 'dark')} />
                            <label className="form-check-label" htmlFor="topbar-color-dark">Dark</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2 sidebar-setting">Sidebar Size</h6>
                        <div className="form-check sidebar-setting">
                            <input className="form-check-input" type="radio" name="sidebar-size" id="sidebar-size-default" defaultValue="default" onChange={() =>document.body.setAttribute('data-sidebar-size', 'lg')} />
                            <label className="form-check-label" htmlFor="sidebar-size-default">Default</label>
                        </div>
                        <div className="form-check sidebar-setting">
                            <input className="form-check-input" type="radio" name="sidebar-size" id="sidebar-size-compact" defaultValue="compact" onChange={() =>document.body.setAttribute('data-sidebar-size', 'md')} />
                            <label className="form-check-label" htmlFor="sidebar-size-compact">Compact</label>
                        </div>
                        <div className="form-check sidebar-setting">
                            <input className="form-check-input" type="radio" name="sidebar-size" id="sidebar-size-small" defaultValue="small" onChange={() =>document.body.setAttribute('data-sidebar-size', 'sm')} />
                            <label className="form-check-label" htmlFor="sidebar-size-small">Small (Icon View)</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2 sidebar-setting">Sidebar Color</h6>
                        <div className="form-check sidebar-setting">
                            <input className="form-check-input" type="radio" name="sidebar-color" id="sidebar-color-light" defaultValue="light" onChange={() =>document.body.setAttribute('data-sidebar', 'light')} />
                            <label className="form-check-label" htmlFor="sidebar-color-light">Light</label>
                        </div>
                        <div className="form-check sidebar-setting">
                            <input className="form-check-input" type="radio" name="sidebar-color" id="sidebar-color-dark" defaultValue="dark" onChange={() =>document.body.setAttribute('data-sidebar', 'dark')} />
                            <label className="form-check-label" htmlFor="sidebar-color-dark">Dark</label>
                        </div>
                        <div className="form-check sidebar-setting">
                            <input className="form-check-input" type="radio" name="sidebar-color" id="sidebar-color-brand" defaultValue="brand" onChange={() =>document.body.setAttribute('data-sidebar', 'brand')} />
                            <label className="form-check-label" htmlFor="sidebar-color-brand">Brand</label>
                        </div>
                        <h6 className="mt-4 mb-3 pt-2">Direction</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-direction" id="layout-direction-ltr" defaultValue="ltr" />
                            <label className="form-check-label" htmlFor="layout-direction-ltr">LTR</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="layout-direction" id="layout-direction-rtl" defaultValue="rtl" />
                            <label className="form-check-label" htmlFor="layout-direction-rtl">RTL</label>
                        </div>
                    </div>
                </div>
                {/* end slimscroll-menu*/}
            </div>
            {/* large modal */}
            {/* View Cancellation */}
            <div className="modal fade" id="view-cancellation" tabIndex={-1} role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">View Cancellation</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer;