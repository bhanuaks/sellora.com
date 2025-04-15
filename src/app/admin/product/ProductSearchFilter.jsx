import React from 'react'

function ProductSearchFilter() {
  return (
    <div className="col-lg-12">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                From Date
              </label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                To Date
              </label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label"> 
                Select Vender
              </label>
              <select className="form-select" name="product_status">
                <option>Ashish</option>
                <option>Kunal</option>
                <option>Gaurav </option>
              </select>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="mb-3">
              <label htmlFor="example-text-input" className="form-label">
                Status
              </label>
              <select className="form-select" name="product_status">
                <option value={""}>All</option>
                <option value={"Approved"}>Approved</option>
                <option value={"Accept"}>Accept</option>
                <option value={"Reject"}>Reject</option>
              </select>
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
      </div>
    </div>
    {/* end card body */}
  </div>
  )
}

export default ProductSearchFilter