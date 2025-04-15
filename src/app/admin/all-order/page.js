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
            <h4 className="mb-sm-0 font-size-18">All Order</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);"> Dashboard</a>
                </li>
                <li className="breadcrumb-item active">All Order</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="form-label"
                      >
                        {" "}
                        From Date
                      </label>
                      <input className="form-control" type="date" />
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="form-label"
                      >
                        {" "}
                        To Date
                      </label>
                      <input className="form-control" type="date" />
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="form-label"
                      >
                        {" "}
                        Vendor
                      </label>
                      <select className="form-select" name="product_status">
                        <option>Ashish</option>
                        <option>Kunal</option>
                        <option>Gaurav </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
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
                <div className="card-header2">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className=" statouter">
                        <div className="stats">
                          {" "}
                          <span>Total sale</span>{" "}
                          <span>
                            <b>55</b>
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="statouter">
                        <div className="stats">
                          {" "}
                          <span>Sale Comission</span>{" "}
                          <span>
                            <b>1.1</b>
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="statouter">
                        <div className="stats">
                          {" "}
                          <span>Vendor share</span>{" "}
                          <span>
                            <b>53.9</b>
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end card body */}
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="dataTables_length">
                  <div className="table-responsive">
                    {/* id="example2" */}
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th width={10}>SNo.</th>
                          <th width={150}>Date</th>
                          <th width={140}>Order ID </th>
                          <th width={340}>Product</th>
                          <th width={130}>Customer Name </th>
                          <th width={200}>Mobile</th>
                          <th width={120}>Amount</th>
                          <th width={140}>Delivery Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <span className="date_dj">2 August</span> <br />
                            at <span className="time">3:16 pm</span>
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <a href="#" className="orange2">
                              Accept order
                            </a>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="orange">Pending</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <span className="date_dj">4 August</span> <br />
                            at 3:16 pm
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <span className="green2">Accepted order</span>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="blue">Proceed</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <span className="date_dj">6 August</span> <br />
                            at 3:16 pm
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <a href="#" className="orange2">
                              Accept order
                            </a>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="out_of_delivery_dark_blue">
                              Out for Delivery
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <span className="date_dj">7 August</span> <br />
                            at 3:16 pm
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <span className="green2">Accepted order</span>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="green">Delivered</span>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <span className="date_dj">2 August</span> <br />
                            at <span className="time">3:16 pm</span>
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <a href="#" className="orange2">
                              Accept order
                            </a>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="orange">Pending</span>
                          </td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>
                            <span className="date_dj">4 August</span> <br />
                            at 3:16 pm
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <span className="green2">Accepted order</span>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="blue">Proceed</span>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>
                            <span className="date_dj">6 August</span> <br />
                            at 3:16 pm
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <a href="#" className="orange2">
                              Accept order
                            </a>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="out_of_delivery_dark_blue">
                              Out for Delivery
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>
                            <span className="date_dj">7 August</span> <br />
                            at 3:16 pm
                            {/* <a href="request-view.html"><i className="fa fa-eye"></i> Request View</a> */}
                          </td>
                          <td>
                            <span className="unfull_1">
                              <a href="invoice.html" target="_blank">
                                #SEL8798834
                              </a>
                            </span>
                            <br />
                            <span className="green2">Accepted order</span>
                          </td>
                          <td>Apple AirPods Max Over-Ear Wireless Headphone</td>
                          <td>Ravi Kumar</td>
                          <td>9891000000</td>
                          <td>
                            <span className="online_price">$ 499</span>
                          </td>
                          <td>
                            <span className="green">Delivered</span>
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
      {/* end col */}
    </div>
  </div>
  {/* container-fluid */}
</div>

    )
}

export default page;