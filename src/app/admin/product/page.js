'use client'; 
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductSearchFilter from './ProductSearchFilter';
import useSWR , {mutate} from 'swr'; 
import { fetcher } from '@/Http/helper';
import ProductListTable from './productListTable';
import { apiRequest } from '@/Http/apiHelper';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';


function page() {
  const { data:productData, error, isLoading } = useSWR('/api/admin/product-list', fetcher);
  const [productList, setProductList] = useState([]);
  const [approveProccess, setApproveProccess] =  useState("")
  useEffect(()=>{
    if(productData?.data){
      setProductList(productData.data.products)
    }
  },[productData])

 
  async function ApproveProduct(product_id, variant_id, status){
    const message = status == 1? "Are you sure to Approve this":"Are you sure to Reject this"
    if(!confirm(message)){
      return
    }
      setApproveProccess(variant_id)
      const response = await apiRequest('/api/admin/product-list/approve-product', "PUT", {product_id, variant_id, status})
      setApproveProccess("")
   
    if(response.status){
      toast.success(response.data)
      mutate('/api/admin/product-list')
    }else{
      Swal.fire({
        icon:"error",
        text:response.data,
        title:"error"
      })
    }
  }
  
    return (
        <div className="main-content">
           <ToastContainer 
                            position="top-center"
                            autoClose={3000} // Toast disappears after 3 seconds
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
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
              <ProductListTable productList={productList} ApproveProduct={ApproveProduct} approveProccess={approveProccess}/>
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