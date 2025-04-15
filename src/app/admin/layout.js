

"use client";
import Script from "next/script";

import { usePathname } from "next/navigation";
import Header from "./component/Header";
import Footer from "./component/Footer";
import '../../../public/sellorloader.css'
import { baseUrl } from "@/Http/helper";
import { useEffect } from "react";



export default function SellorDashboardRootLayout({ children }) {
    useEffect(()=>{
        $(document).ready(function(){
            $('.loader-container').css('display', 'none')
        })
    },[])

    return (
        <html>
            <head>
            <meta charSet="utf-8" />
            <title>Sellora | Admin Panel</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <link rel="shortcut icon" type="image/x-icon" href="/assets-admin/favicon.ico" />

            <link rel="stylesheet"
                href="/assets-admin/assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css"/>

            <link
                href="/assets-admin/assets/css/bootstrap.min.css"
                rel="stylesheet"
            />

            <link rel="stylesheet" href="/assets-admin/assets/css/icons.min.css" />

            <link rel="stylesheet" href="/assets-admin/assets/css/app.min.css"  />
            </head>
            <body>
            <div className="loader-container">
                <div className="loader-wrapper">
                    <div className="circle"></div> 
                    <img src={`${baseUrl}loader_logo.png`} alt="Loading..." className="logo-loader" /> 
                </div>
            </div>
                <Header />
                {children}
                <Footer />

                <div className="rightbar-overlay"></div>

                <Script src="/assets-admin/assets/libs/jquery/jquery.min.js"  />
                <Script src="/assets-admin/assets/libs/bootstrap/js/bootstrap.bundle.min.js"  />
                <Script src="/assets-admin/assets/libs/metismenu/metisMenu.min.js"  />
                <Script src="/assets-admin/assets/libs/simplebar/simplebar.min.js"  />
                <Script src="/assets-admin/assets/libs/node-waves/waves.min.js"  />
                <Script src="/assets-admin/assets/libs/feather-icons/feather.min.js"  />
                <Script src="/assets-admin/assets/libs/pace-js/pace.min.js"  />
                <Script src="/assets-admin/assets/libs/apexcharts/apexcharts.min.js"  />
                <Script
                    src="/assets-admin/assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js" 
                    
                />
                <Script
                    src="/assets-admin/assets/libs/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js"
                    
                />
                {/* <Script src="/assets-admin/assets/js/pages/dashboard.init.js"  /> */}
                <Script src="/assets-admin/assets/js/app.js"  />
                <Script src="/assets-admin/assets/js/popper.min.js"  />
                <Script src="/assets-admin/assets/js/bootstrap.min.js"  />
            </body>
        </html>
    );
}
