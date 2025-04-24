import { baseUrl, formatSlugToName } from '@/Http/helper'
import React from 'react'
import HelpCenterSidebar from './HelpCenterSidebar'
import CreateOrEditAnAccount from './PageComponents/CreateOrEditAnAccount';
import AccountSecurityorUnrecognizedChargesOrOrders from './PageComponents/AccountSecurityorUnrecognizedChargesOrOrders';
import TrackYourOrder from './PageComponents/yourOrder/TrackYourOrder';
import MissingItems from './PageComponents/yourOrder/MissingItems';
import OrdersNotReceived from './PageComponents/yourOrder/OrdersNotReceived';
import Reorder from './PageComponents/yourOrder/Reorder';
import Return from './PageComponents/yourOrder/Return';
import ShippingAndDelivery from './PageComponents/yourOrder/ShippingAndDelivery';
import PaymentMethod from './PageComponents/PaymentMethod/PaymentMethod';
import CancellationandReturnPolicy from './PageComponents/CancellationandReturnPolicy/CancellationPolicy';
import ReturnPolicy from './PageComponents/CancellationandReturnPolicy/ReturnPolicy';
import TermsAndConditions from './PageComponents/TermsofUse/TermsAndConditions';
import PrivacyPolicy from './PageComponents/PrivacyPolicies/PrivacyPolicy';
import FAQ from './PageComponents/FAQ/FAQ';
import Backorder from './PageComponents/yourOrder/Backorder';

function page({params}) {

    const pagename = params.policy_page;
  return (
    <>
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            {" "}
            Help <i className="fa-regular fa-chevron-right" />{" "}
            <a className="current" href="#">
              {formatSlugToName(pagename)}  
            </a>{" "}
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
  <div className="help_00000001">
    <div className="container">
      <div className="row">
        <HelpCenterSidebar />
        {(() => {
            if (pagename === "create-or-edit-account") {
                return <CreateOrEditAnAccount />;
            } else if (pagename === "account-security-or-unrecognized-charges-or-orders") {
                return <AccountSecurityorUnrecognizedChargesOrOrders />
            }else if (pagename === "track-your-order") {
                return <TrackYourOrder />;
            }else if (pagename === "backorder") {
               return <Backorder />;

            }else if (pagename === "missing-items") {
               return <MissingItems />;

            }else if (pagename === "orders-not-received") {
               return <OrdersNotReceived />;

            }else if (pagename === "reorder") {
               return <Reorder />;

            }else if (pagename === "return") {
               return <Return />;

            }else if (pagename === "delivery-information") {
               return <ShippingAndDelivery />;

            }else if (pagename === "payment") {
               return <PaymentMethod />;

            }else if (pagename === "cancellation-policy") {
               return <CancellationandReturnPolicy />;

            }else if (pagename === "return-policy") {
               return <ReturnPolicy />;

            }else if (pagename === "terms-of-use") {
               return <TermsAndConditions />;

            }else if (pagename === "privacy-policy") {
               return <PrivacyPolicy />;

            }else if (pagename === "faq") {
               return <FAQ />;

            }   
           
             
            })()}
        

      </div>
    </div>
  </div>
</>

  )
}

export default page