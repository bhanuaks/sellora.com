

"use client";   
import { UserAppProvider } from "@/app/contaxtData/userContaxtData";
// import { AppProvider } from "./contaxtData/contextData";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import '../../../../public/front/loader.css'

 

export default function RootLayout({ children }) {

  
 
    return (
      <UserAppProvider>
         <div>
             <ToastContainer 
                                    position="top-center"
                                    autoClose={3000} 
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="colored"
                                /> 
                            {/* loader start */} 
                            <div className="loaderouter"><div className="loader"></div></div> 
                            {/* loader end */}
            {children}
            </div>
         </UserAppProvider>
      ); 
    
 
}
