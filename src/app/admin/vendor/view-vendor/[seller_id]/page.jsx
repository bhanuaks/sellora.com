"use client"
import React, { useEffect, useState } from "react";
import SellerDetails from "../SellerDetails";
import { apiRequest } from "@/Http/apiHelper";

function page({ params }) {
  const seller_id = params.seller_id;
    const [seller, setSeller] = useState(null) 

  async function getSellerDetails(seller_id) {
    const response = await apiRequest(`/api/admin/seller/seller-details?seller_id=${seller_id}`)
    if(response.status){
        setSeller(response.data);
    }
  }
 useEffect(()=>{

    if(seller_id){ 
        getSellerDetails(seller_id)
    }

 },[seller_id])

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <SellerDetails />
        </div>
      </div>
    </div>
  );
}

export default page;
