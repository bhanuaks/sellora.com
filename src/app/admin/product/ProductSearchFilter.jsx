import { fetcher } from '@/Http/helper';
import React from 'react'
import useSWR from 'swr';

function ProductSearchFilter({formData, handleChange, filterFunction}) {

  const { data:sellerData, error, isLoading } = useSWR(`/api/admin/filter-seller`, fetcher);
  const sellerName = sellerData?.data?.seller

  
  return (
    <div className="col-lg-12">
    <div className="card">
      <div className="card-body">
        <form  onSubmit={(e)=>filterFunction(e)}>
        <div className="row">
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                From Date
              </label>
              <input type="date" className="form-control"   name="from_date" value={formData.from_date} onChange={handleChange}/>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                To Date
              </label>
              <input type="date" className="form-control"  name="to_date" value={formData.to_date} onChange={handleChange}  
              min={formData.from_date}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                Select Vender
              </label>
              <select className="form-select" name="seller_name" value={formData.seller_name} onChange={handleChange} >
                <option value="">All</option>
              {sellerName && sellerName.length > 0 && (
                              sellerName.map((seller, index) => (
                                <option key={index} value={seller._id}>
                                  {seller.name || 'All'}
                                </option>
                              ))
                            )} 
              </select>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label">
                Status
              </label>
              <select className="form-select"name="approval_status" value={formData.approval_status} onChange={handleChange} >
                <option value={""}>All</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Approved"}>Approved</option>
                <option value={"Rejected"}>Rejected</option>
              </select>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                Product Name
              </label>
              <input type="text" className="form-control"   name="product_name" value={formData.product_name} onChange={handleChange}/>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="mb-3">
              <div className="col-sm-auto">
                <label className="form-label d-lg-block">&nbsp;</label>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
    {/* end card body */}
  </div>
  )
}

export default ProductSearchFilter