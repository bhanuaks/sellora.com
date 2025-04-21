import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
    <div className="rts-navigation-area-breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="navigator-breadcrumb-wrapper">
              Help
              <i className="fa-regular fa-chevron-right" />
              <a className="current" href="#">
                Cancellation and Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section-seperator">
      <div className="container">
        <hr className="section-seperator" />
      </div>
    </div>
    <div className="rts-map-contact-area rts-section-gap2">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="contact-left-area-main-wrapper shipping">
              <h1 className="text-center">
                Cancellation and Return Policy
                <br />
              </h1>
              <h1 className="text-center">Order Cancellation Policy</h1>
              <p>
                At Sellora, we aim to provide a seamless shopping experience.
                However, we understand that customers may wish to cancel an order.
                The following outlines our cancellation policy:
              </p>
              <h3>Customer-Initiated Cancellations</h3>
              <p>
                Before Dispatch: Orders can be canceled at any time before they
                are dispatched from our warehouse.
              </p>
              <p>
                After Dispatch: Once the order is out for delivery, it cannot be
                canceled. However, customers may choose to reject the delivery at
                the doorstep.
              </p>
              <p>
                Time-Sensitive Categories: The cancellation window may vary
                depending on the product category. Specific timeframes mentioned
                on the product or order confirmation page shall be considered
                final.
              </p>
              <p>
                Cancellation Charges: In some cases, post the cancellation window,
                a nominal cancellation fee may apply.
              </p>
              <h3>Seller-Initiated Cancellations</h3>
              <p>
                In the rare event that an order is canceled by the seller due to
                unforeseen circumstances such as stock unavailability or
                logistical constraints, a full refund will be processed for all
                prepaid orders.
              </p>
              <h3>Hyperlocal (MINUTES Delivery) Orders</h3>
              <p>
                Orders placed under the ‘MINUTES Delivery’ category are typically
                non-cancellable and non-refundable through the self-service
                option, due to rapid dispatch and delivery timelines. However,
                cancellation or refunds may be granted under the following
                circumstances by contacting customer support:
              </p>
              <p>
                The order was not delivered within the estimated time;
                <br />
                The order was not picked up by the delivery agent;
                <br />
                The seller did not accept or canceled the order;
                <br />
                Any other valid reason as determined by Sellora.
                <br />
                Sellora’s Right to Cancel
              </p>
              <h3>
                Sellora reserves the right to cancel orders in part or in full due
                to:
              </h3>
              <p>
                Product unavailability;
                <br />
                Fraud detection or prevention;
                <br />
                Violation of our Terms of Use;
                <br />
                Force majeure or unforeseen logistical issues.
              </p>
              <p>
                In such cases, customers will not be charged for the canceled
                portion and a refund will be issued within 5 –10business days.
                Refund tracking is available under the ‘Order Details’ section on
                the platform.
              </p>
              <h1 className="text-center">Return Policy</h1>
              <p>
                Sellora offers a return and replacement policy governed by product
                categories. Return options such as refunds, replacements, or
                exchanges are available depending on the item purchased and are
                subject to the terms below.
              </p>
              <p>
                Return Guidelines
                <br />
                All returns must be initiated within the timeframe mentioned on
                the respective product page.
              </p>
              <p>
                Items must be returned in their original condition, along with all
                tags, packaging, accessories, user manuals, and warranty cards (if
                applicable).
              </p>
              <p>
                Certain products may be eligible for a single replacement only.
              </p>
              <p>Category-Wise Return Window Policy</p>
              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td>
                      <p>
                        <strong>Category</strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        <strong>
                          Returns Window, Actions Possible and Conditions
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Furniture &amp; Large Home Items</strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        30 days – Refund or Replacement
                        <br />
                        <em>
                          For installation-required products, returns are valid
                          only if installed by authorized personnel.
                        </em>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>
                          Lifestyle (Apparel, Footwear, Accessories)
                        </strong>
                      </p>
                    </td>
                    <td>
                      <p>30 days – Refund, Replacement, or Exchange</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Home Decor, Tools, Furnishings</strong>
                      </p>
                    </td>
                    <td>
                      <p>30 days – Refund or Replacement</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>
                          Books, Sports, Fitness Equipment, Auto Accessories
                        </strong>
                      </p>
                    </td>
                    <td>
                      <p>14 days – Replacement only</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Toys, Stationery, Musical Instruments</strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        14 days – Replacement only
                        <br />
                        <em>
                          Wind instruments are non-returnable unless
                          defective/damaged.
                        </em>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Mobiles (select brands)</strong>
                      </p>
                    </td>
                    <td>
                      <p>7 days – Replacement only</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Electronics &amp; Small Appliances</strong>
                      </p>
                    </td>
                    <td>
                      <p>7 days – Replacement only</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>
                          High-End Electronics &amp; Large Appliances (select
                          brands)
                        </strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        2 days – Service Center Replacement/Repair only
                        <br />
                        <em>
                          Contact brand service center for DOA or warranty issues.
                        </em>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Chimney, Water Purifier, Fan, Geyser</strong>
                      </p>
                    </td>
                    <td>
                      <p>14 days – Replacement only</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>No-Questions-Asked Products</strong>
                      </p>
                    </td>
                    <td>
                      <p>14 days – Refund or Replacement</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                For all return-eligible items, the issue will be assessed through
                online troubleshooting, tele-support, or technical visits as
                needed.
              </p>
              <h3>Exceptions &amp; Non-Returnable Items</h3>
              <p>Products marked as "non-returnable" on the product page;</p>
              <p>
                Hygiene-related items such as innerwear, cosmetics, personal
                wellness products unless delivered in a damaged/defective
                condition;
              </p>
              <p>Perishable goods, customized products, or digital downloads.</p>
              <h3>When will the User get the refund?</h3>
              <p>
                Following are the processing timelines after product is received
                by us or when the seller notifies us of the receipt of the
                products.
              </p>
              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td>
                      <p>
                        <strong>Payment Method</strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        <strong>Refund Processing Time</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Credit/Debit Card</p>
                    </td>
                    <td>
                      <p>Up to 10 business days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Pre-Paid Credit/Debit Card</p>
                    </td>
                    <td>
                      <p>Up to 30 business days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>PayPal</p>
                    </td>
                    <td>
                      <p>
                        Up to 30 business days depending on your financial
                        institution
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>EBT/SNAP Card</p>
                    </td>
                    <td>
                      <p>Up to 5 business days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Healthy Benefits Plus OTC Card</p>
                    </td>
                    <td>
                      <p>Up to 5 business days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Affirm</p>
                    </td>
                    <td>
                      <p>Up to 5 business days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Third Party Gift Card</p>
                    </td>
                    <td>
                      <p>
                        Up to 10 business days, may take longer if linked to an
                        international bank
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>
                Additional Guidelines and Exceptions for Returns and Refunds
              </h3>
              <ul>
                <li>
                  For items valued over $600, we recommend insurance your return
                  shipment to protect against potential loss or damage in transit.
                </li>
                <li>
                  International returns (including from U.S. territories) over
                  $750 may not be eligible for reimbursement of customs duties or
                  import taxes.
                </li>
                <li>
                  Certain product categories may be subject to a restocking fee of
                  up to 20%, as clearly indicated on the item’s product page.
                </li>
              </ul>
              <p>
                Sellora reserves the right to{" "}
                <strong>
                  withhold refunds or perform additional verification
                </strong>{" "}
                in the following cases:
              </p>
              <ul>
                <li>
                  Items returned without original packaging, accessories, or in
                  used condition
                </li>
                <li>False or fraudulent return claims</li>
                <li>Repeated return abuse or violation of our return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  


  )
}

export default page