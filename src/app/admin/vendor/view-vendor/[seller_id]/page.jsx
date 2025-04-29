"use client"
import React, { use, useEffect, useState } from "react";
import SellerDetails from "../SellerDetails";
import { apiRequest } from "@/Http/apiHelper";

function page({ params }) {
  // const seller_id = params.seller_id;
  const { seller_id } = use(params);
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
          <SellerDetails seller={seller} />
        </div>
      </div>
    </div>
  );
}

export default page;
