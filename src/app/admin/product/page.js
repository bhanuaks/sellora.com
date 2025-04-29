'use client'; 
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import ProductSearchFilter from './ProductSearchFilter';
import useSWR , {mutate} from 'swr'; 
import { baseUrl, fetcher } from '@/Http/helper';
import ProductListTable from './productListTable';
import { apiRequest } from '@/Http/apiHelper';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';


function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams()  
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;

  const from_date = searchParams.get("from_date") || "";
  const to_date = searchParams.get("to_date") || "";
  const seller_name = searchParams.get("seller_name") || "";
  const approval_status = searchParams.get("approval_status") || "";
  const product_name = searchParams.get("product_name") || "";

  const { data:productData, error, isLoading } = useSWR(`/api/admin/product-list?page=${page}&from_date=${from_date}&to_date=${to_date}&seller_name=${seller_name}&approval_status=${approval_status}&product_name=${product_name}`, fetcher);
  const [productList, setProductList] = useState([]);
  const [approveProccess, setApproveProccess] =  useState("")
  const [pagination, setPagination] =  useState(null)
    const [formData, setFormData] = useState({
      page: page,
      from_date: from_date,
      to_date: to_date,
      seller_name: seller_name,
      approval_status: approval_status,
      product_name: product_name
    });

  useEffect(()=>{
    if(productData?.data){
      console.log(productData.data);
      setProductList(productData.data.products)
      setPagination(productData.data.pagination) 
    }
  },[productData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


 
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

  function filterFunction(e){
    e.preventDefault()
    const query = new URLSearchParams({
      page: formData.page,
      from_date: formData.from_date,
      to_date: formData.to_date,
      seller_name: formData.seller_name,
      approval_status: formData.approval_status,
      product_name: formData.product_name

    }).toString(); 

    router.push(`/admin/product?${query}`)
 
  }


  function paginationFun(page, size, e){
    e.preventDefault();
    setFormData((preData)=>({
      ...preData,
      page:page
    }))
    const query = new URLSearchParams({
      page: formData.page,
      from_date: formData.from_date,
      to_date: formData.to_date,
      seller_name: formData.seller_name,
      approval_status: formData.approval_status,
      product_name: formData.product_name

    }).toString(); 
    router.push(`/admin/product?${query}`)
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

                        {/* {isLoading && (
                           <div className="loader-container" style={{display:'flex'}}>
                              <div className="loader-wrapper">
                                  <div className="circle"></div> 
                                  <img src={`${baseUrl}loader_logo.png`} alt="Loading..." className="logo-loader" /> 
                              </div>
                          </div>
                        )} */}
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
        <ProductSearchFilter 
        formData={formData}
        handleChange={handleChange}
        filterFunction ={filterFunction}
        />
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-10">
                <strong>Product List</strong>
              </div>
              {/* <div className="col-lg-2">
                <div className="mb-2">
                  <select className="form-select form-select-md rounded py-0.5 ltr:pl-3 rtl:pr-3 border-gray-50 bg-gray-50/20 dark:border-zinc-600 dark:text-gray-100 dark:bg-zinc-700">
                    <option value="Ascending">
                      Ascending
                    </option>
                    <option value="Descending">Descending </option>
                  </select>
                </div>
              </div> */}
              <ProductListTable productList={productList} ApproveProduct={ApproveProduct} approveProccess={approveProccess} pagination={pagination} />
              <div className="fixed-table-pagination">
                      <div className="row">
                        <div className="col-lg-8"> </div>
                        <div className="col-lg-4">
                          <div className="pull-right  pagination d-flex">
                            
                            {pagination && pagination.totalPages>1 ?(
                                <ul className="pagination">
              
                                  
                                <li className={`page-pre ${pagination.page <= 1? "pointer-events-none opacity-50 deactive_btn":""}`}>
                                  <Link href="#" onClick={(e)=>{
                                    if(pagination.page > 1){ 
                                      paginationFun((pagination.page-1),  pagination.pageSize, e)
                                    }else{
                                      e.preventDefault();
                                    }
                                  }
                                    }> 
                                    <i className="fa fa-arrow-left" />
                                  </Link>
                                </li>
                                
              
                          {Array.from({length:pagination.totalPages}, (_, i)=>{
                              if (Math.abs(pagination.page - (i + 1)) <= 3) {
                                return ( 
                                  <li className={`page-number current  ${i} ${pagination.page== (i+1)?'active':''}`} key={i} >
                                      <a   href="#"  onClick={(e)=>paginationFun((i+1),  pagination.pageSize, e)}>
                                        {i + 1} 
                                      </a>
                                  </li> 
                                );
                              } 
                              return null; 
                             })} 
                                
                                <li
                                    className={`page-next ${pagination.page == pagination.totalPages ? "pointer-events-none opacity-10 deactive_btn" : ""}`}
                                  >
                                    <Link
                                      href="#"
                                      onClick={(e) => {
                                        if (pagination.page < pagination.totalPages) {
                                          paginationFun(parseInt(pagination.page) + 1, pagination.pageSize, e);
                                        } else {
                                          e.preventDefault();
                                        }
                                      }}
                                    >
                                      <i className="fa fa-arrow-right" />
                                    </Link>
                                  </li>
                                </ul>
                            ):null}
                           
                          </div>
                        </div>
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

function page() {
  return (
    <Suspense fallback={<>Wait</>}>

      <ProductListPage />
    </Suspense>
  )
}

export default page;