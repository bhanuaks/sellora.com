"use client";
import { apiRequest } from "@/Http/apiHelper";
import { baseUrl, main_thumb_img_path } from "@/Http/helper";
import { fileBasePath } from "@/Http/urlHelper";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function CollectionsComponents() {

    const router =  useRouter();
    const searchParams = useSearchParams();
    const updateId = searchParams.get("updateId");

  const [errors, setErrors] = useState({});
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [products, setProducts] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [seller, setSeller] = useState("");
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productDetailsArray, setProductDetailsArray] = useState([]);

  async function searchProducts(searchText) {
    setIsLoading(true);
    const response = await apiRequest(
      `/api/admin/collections/search-products?searchText=${searchText}&seller_id=${
        seller?._id || ""
      }`
    );
    setIsLoading(false); 
    if (response.status) {
      setProducts(response.data.products);
    }

  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchProducts(searchData);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchData]);

  function hendleSelectProduct(product) {
    const exists = selectedProduct.includes(product._id);
    if (exists) {
      setSelectedProduct(selectedProduct.filter((id) => id !== product._id));
      setProductDetailsArray(
        productDetailsArray.filter((item) => item._id !== product._id)
      );
    } else {
      setSelectedProduct([...selectedProduct, product._id]);
      setProductDetailsArray([...productDetailsArray, product]);
    }
  }

  function removeProduct(product_id) {
    if (product_id) {
      setSelectedProduct(selectedProduct.filter((id) => id !== product_id));
      setProductDetailsArray(
        productDetailsArray.filter((item) => item._id !== product_id)
      );
    }
  }


  useEffect(() => {
        function handleClickOutside(event) { 
            const clickedInsideInput = event.target.classList.contains("product-input");
             const insidePopup = event.target.closest(".product-popup"); 
            if (!clickedInsideInput && !insidePopup) {
                setOpenSearchBox(false);
            }
        } 
        document.addEventListener("click", handleClickOutside);
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (updateId) {
                $('.loader-container').css("display", "flex"); 
                const apiRes = await apiRequest(`/api/admin/collections?_id=${updateId}`); 
                $('.loader-container').css("display", "none");
    
                if (apiRes.status) {
                    const data = apiRes.data.collection;
                    setSelectedProduct(data.productIds);
                    setProductDetailsArray(apiRes.data.products);
                    setCollectionName(data.name);
                    setCollectionId(data._id);
                }
            }
        };
    
        fetchData();
    }, [updateId]);

async function saveCollection(e){
    e.preventDefault(); 
    setErrors({})
    $('.loader-container').css("display", "flex");
    const apiRes = await apiRequest(`/api/admin/collections`, "POST", {name:collectionName, productIds:selectedProduct, _id:collectionId});
    $('.loader-container').css("display", "none");
    if(apiRes.status){
         toast.success(apiRes.data) 

         setSelectedProduct([])
         setProductDetailsArray([])
         setCollectionName("")
         setCollectionId("")
        if(collectionId){
            router.push('/admin/view-collection');
        }
    }else if(apiRes.data.status_code == "400"){
        setErrors(apiRes.data.errors)
        const firstError = Object.keys(apiRes.data.errors)[0]
        $(`input[name="${firstError}"]`).focus();
    }
    
}


  return (
    <div className="main-content">

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

      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">{collectionId?"Update":"Create"} Collection</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Collections</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Display message */}

          {/* Form */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={(e)=>saveCollection(e)}>
                    <div className="row">
                      {/* Category Selection */}
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="category_id" className="form-label">
                            Collection Name <span>*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Enter collection name"
                            value={collectionName}
                            onChange={(e)=>setCollectionName(e.target.value)}
                          />
                          {errors.name && ( 
                            <span className="error_message">{errors.name}</span>
                          )}
                        </div>
                      </div>

                      {/* Subcategory Name */}
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="subCategoryName"
                            className="form-label"
                          >
                            Search and select products
                          </label>
                          <input
                            className="form-control product-input"
                            type="text"
                            name="productIds"
                            placeholder="search products"
                            value={searchData || ""}
                            onChange={(e) => {
                              setSearchData(e.target.value);
                            }}
                            onClick={() => setOpenSearchBox(true)} 
                          />
                           {errors.productIds && ( 
                            <span className="error_message">{errors.productIds}</span>
                          )}

                          {/* <!-- ===============popup-window=============== --> */}
                          <div
                            className="product-popup"
                            id="productPopup"
                            style={{
                              display: `${openSearchBox ? "block" : "none"}`,
                            }}
                          >
                             {(()=>{
                                    if(!searchData){
                                      return (<div className="ml-5"> Enter product name </div>)  
                                    }else if(searchData && products.length == 0){
                                        return (<div style={{display:"flex", justifyContent:"center"}} > Record Not found! </div>)   
                                    }else if(searchData && isLoading){
                                        return (<div style={{display:"flex", justifyContent:"center"}} > Seaching... </div>)  
                                    } 
                                    return null  
                                })()}
                            <ul>
                               
                                 
                              {products.length > 0 &&
                                products.map((prod, index) => (
                                  <li
                                    key={index}
                                    className={`${
                                      selectedProduct.includes(prod._id)
                                        ? "selected"
                                        : ""
                                    }`}
                                    onClick={(e) => hendleSelectProduct(prod)}
                                  >
                                    <img
                                      src={`${fileBasePath}${main_thumb_img_path}/${prod.main_image}`}
                                      alt="Product 1"
                                    />
                                    <div className="product-info">
                                      <strong>{prod.product_name}</strong>
                                      {/* <span>Short description of Product 1</span> */}
                                    </div>
                                  </li>
                                ))}

                              {/* <!-- Add more products as needed --> */}
                            </ul>
                          </div>
                          {/* <!-- ===============popup-window=end============== --> */}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="col-lg-12">
                        {productDetailsArray.length > 0 && (
                            <>
                       <h4>Collection Products</h4>
                          <table>
                            <thead>
                              <tr>
                                <th>S.N.</th>
                                <th>Main Image</th>
                                <th>Product Name</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productDetailsArray.map((item, index) => (
                                <tr key={index}>
                                  <td>{index+1}</td>
                                  <td>
                                    <img
                                      src={`${fileBasePath}${main_thumb_img_path}/${item.main_image}`}
                                      style={{ maxWidth: "100px" }}
                                    />
                                  </td>
                                  <td>{item.product_name}</td>
                                  <td>
                                    <i
                                      className="fa fa-trash"
                                      onClick={() => removeProduct(item._id)}
                                    ></i>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </>
                        )}
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3 mt-3">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionsComponents;
