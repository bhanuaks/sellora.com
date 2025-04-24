import Link from 'next/link'
import React from 'react'

const ViewAddressSection = ({clickAddressEdit, address}) => {
     
    return (
        <div className="shipping-address-billing-address-account">
            <div className="half">
                <h2 className="title">Billing Address</h2>
                <Link href="#" onClick={(e)=>clickAddressEdit(e, "Billing", address)}>
                    <i className="fa fa-pencil" aria-hidden="true" /> {address?"Edit":"Add"}
                </Link>
                {address && (
                    <p className="address">
                              <strong>{address.b_first_name+' '+address.b_last_name}</strong> <br />                
                            {address.b_company_name && (<>{address.b_company_name} <br /> </>)} 
                            {address.b_address && (<>{address.b_address}  </>)} 
                            {address.b_city} <br />{address.b_state} {address.b_zipcode}<br />
                            {address.b_country}<br /> 
                            </p>
                )}
               
                {/* <Link href="#" onClick={(e)=>clickAddressEdit(e, "Billing", address)}>
                    <i className="fa fa-pencil" aria-hidden="true" /> {address?"Edit":"Add"}
                </Link> */}
            </div>
            <div className="half">
                <h2 className="title">Shipping Address</h2>
                <Link href="#" onClick={(e)=>clickAddressEdit(e, "Shipping", address)}>
                    <i className="fa fa-pencil" aria-hidden="true" /> {address?"Edit":"Add"}
                </Link>
                {address && (
                    <p className="address">
                              <strong>{address.first_name+' '+address.last_name}</strong> <br />                
                            {address.company_name && (<>{address.company_name} <br /> </>)} 
                            {address.address && (<>{address.address}  </>)} 
                            {address.city} <br />{address.state} {address.zipcode}<br />
                            {address.country}<br /> 
                            </p>
                )}
                {/* <Link href="#" onClick={(e)=>clickAddressEdit(e, "Shipping", address)}>
                    <i className="fa fa-pencil" aria-hidden="true" /> {address?"Edit":"Add"}
                </Link> */}
            </div>
        </div>
    )
}

export default ViewAddressSection