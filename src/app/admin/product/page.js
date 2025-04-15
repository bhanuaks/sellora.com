'use client'; 
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductSearchFilter from './ProductSearchFilter';
import useSWR from 'swr'; 
import { fetcher } from '@/Http/helper';
import ProductListTable from './productListTable';


function page() {
  const { data:productData, error, isLoading } = useSWR('/api/admin/product-list', fetcher);
  const [productList, setProductList] = useState([]);

  useEffect(()=>{
    if(productData?.data){
      setProductList(productData.data.products)
    }
  },[productData])

 
  
    return (
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18"> View Product</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Prodcuts</a>
                </li>
                <li className="breadcrumb-item active"> View Product</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <ProductSearchFilter />
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-10">
                <strong>View List</strong>
              </div>
              <div className="col-lg-2">
                <div className="mb-2">
                  <select className="form-select form-select-md rounded py-0.5 ltr:pl-3 rtl:pr-3 border-gray-50 bg-gray-50/20 dark:border-zinc-600 dark:text-gray-100 dark:bg-zinc-700">
                    <option value="Ascending">
                      Ascending
                    </option>
                    <option value="Descending">Descending </option>
                  </select>
                </div>
              </div>
              <ProductListTable productList={productList}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default page;