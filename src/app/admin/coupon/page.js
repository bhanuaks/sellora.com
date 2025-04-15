import Link from 'next/link'
import React from 'react'


function page() {
    return (
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18"> Coupons</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Coupons</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          {" "}
                          Coupons Name
                        </label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Select Category
                        </label>
                        <select className="form-select">
                          <option>Select...</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Select Sub Category
                        </label>
                        <select className="form-select">
                          <option>Select...</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Select Child Category
                        </label>
                        <select className="form-select" name="product_status">
                          <option>Select...</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Coupon valid from
                        </label>
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Coupon valid to
                        </label>
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Special offers
                        </label>
                        <textarea
                          className="textarea2"
                          placeholder="FREEDOM Sale - Apply Coupon FREEDOM23 & Get Upto 20% Off (price inclusive of discount)"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          Active/Deactive
                        </label>
                        <select className="form-select">
                          <option>Active</option>
                          <option>Deactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="form-label"
                        >
                          &nbsp;
                        </label>
                        <div className="col-sm-auto">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end card body */}
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="table-responsive">
                  {/* id="example2" */}
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width={80}>Sl No.</th>
                        <th>Coupons Name</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Child Category</th>
                        <th>Coupon valid from</th>
                        <th>Coupon valid to</th>
                        <th>Special offers</th>
                        <th width={15}>Status</th>
                        <th width={10}>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>
                          FREEDOM Sale - Apply Coupon FREEDOM23 &amp; Get Upto
                          20% Off (price inclusive of discount)
                        </td>
                        <td>
                          <a href="#" className="active2">
                            Active
                          </a>
                        </td>
                        <td>
                          <a href="#">
                            <i className="fas fa-pencil-alt" />
                          </a>
                        </td>
                        <td>
                          <a href="#">
                            <i className="far fa-trash-alt" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* container-fluid */}
  </div>
</div>

    )
}

export default page;