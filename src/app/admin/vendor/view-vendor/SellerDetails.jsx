import { baseUrl, decryptText } from '@/Http/helper';
import { fileBasePath } from '@/Http/urlHelper';
import React from 'react';

const SellerDetails = ({ seller }) => {
   
  if(!seller){
    return <></>
  }
  return (
    <div className="container mt-5" style={{maxWidth:'100%'}}>
      <h2 className="mb-4">Seller Details</h2>

      {/* Personal Info */}
      <Card title="Personal Information" bg="primary">
        <div className='row'>
          <div className='col-lg-6'>
              <p><strong>Full Name:</strong> {seller?.name}</p>
              <p><strong>Email:</strong> {seller?.email}</p>
              <p><strong>Phone:</strong> +{seller?.mobile_code} {seller?.mobile}</p>
          </div>

          <div className='col-lg-6'>
              <p><strong>Display Name:</strong> {seller?.display_name}</p>
              <p><strong>Business Description:</strong> {seller?.business_description}</p>
              <p><strong>Status:</strong> {seller?.status}</p>
              <p><strong>Approva Status:</strong> {seller?.approvalStatus}</p>
          </div>


        </div>
       
        
      </Card>

      {/* Bank Info */}
      <Card title="Bank Information" bg="success">
      <div className='row'>
        <div className='col-lg-6'>
              <p><strong>Bank Name:</strong> {seller?.accountInfo?.bank_name}</p>
              <p><strong>Account Number:</strong> {seller?.accountInfo?.account_number}</p>
              <p><strong>Bank Address:</strong> {seller?.accountInfo?.bank_address}</p>
              <p><strong>Routing Number:</strong> {seller?.accountInfo?.routing_number}</p> 
          </div> 
          <div className='col-lg-6'>
              <p><strong>State:</strong> {seller?.accountInfo?.state}</p>
              <p><strong>Country:</strong> {seller?.accountInfo?.country}</p>
              <p><strong>Zipcode:</strong> {seller?.accountInfo?.zipcode}</p>
          </div>
      </div> 
      </Card>

    

      {/* Pickup Address */}
      <Card title="Pickup Address" bg="info">
      <div className='row'>
      <div className='col-lg-6'>
        <p><strong>Name:</strong> {seller?.pickupAddress?.name}</p>
        <p><strong>Mobile:</strong> +{seller?.pickupAddress?.mobile_code} {seller?.pickupAddress?.mobile}</p>
        <p><strong>Address Line 1:</strong> {seller?.pickupAddress?.address_line_1}</p>
        <p><strong>Address Line 2:</strong> {seller?.pickupAddress?.address_line_2}</p>
        </div>

        <div className='col-lg-6'>
        <p><strong>City:</strong> {seller?.pickupAddress?.city}</p>
        <p><strong>State:</strong> {seller?.pickupAddress?.state}</p>
        <p><strong>Zip Code:</strong> {seller?.pickupAddress?.zip_code}</p>
        <p><strong>Country:</strong> {seller?.pickupAddress?.country}</p>
        </div>
      </div> 
      </Card>

        {/* Shipping Info */}
        <Card title="Return Address" bg="info">
          <div className='row'>
          <div className='col-lg-6'>
            <p><strong>Name:</strong> {seller?.returnAddress?.name}</p>
            <p><strong>Mobile:</strong> +{seller?.returnAddress?.mobile_code} {seller?.returnAddress?.mobile}</p>
            <p><strong>Address Line 1:</strong> {seller?.returnAddress?.address_line_1}</p>
            <p><strong>Address Line 2:</strong> {seller?.returnAddress?.address_line_2}</p>
            </div>

            <div className='col-lg-6'>
            <p><strong>City:</strong> {seller?.returnAddress?.city}</p>
            <p><strong>State:</strong> {seller?.returnAddress?.state}</p>
            <p><strong>Zip Code:</strong> {seller?.returnAddress?.zip_code}</p>
            <p><strong>Country:</strong> {seller?.returnAddress?.country}</p>
            </div>
          </div> 
          </Card>


 {/* Bussness Info */}
 <Card title="Business Details" bg="secondary">
      <div className='row'>
      <div className='col-lg-6'>
          <p><strong>Registered Business Name:</strong> {seller?.businessInfo?.business_name}</p>
          <p><strong>Mobile Number:</strong> +{seller?.businessInfo?.mobile_code} {seller?.businessInfo?.mobile}  </p>
          <p><strong>Registered Business Address:</strong> {seller?.businessInfo?.business_address} </p>
          <p><strong>City:</strong> {seller?.businessInfo?.city} </p>
          <p><strong>State:</strong>  {seller?.businessInfo?.state} </p>
          </div>
          <div className='col-lg-6'>
          <p><strong>Zip Code:</strong> {seller?.businessInfo?.zip_code}</p>
          <p><strong>Country:</strong> {seller?.businessInfo?.country}</p> 
          </div>
          <br />
          <div className='col-lg-12'>
              <h4>Personal Information of Beneficiary</h4>
          </div>
          <div className='col-lg-6'>
          <p><strong>Are you a beneficiary of the business?:</strong> {seller?.businessInfo?.are_you_beneficial_for_business}</p>
          {seller?.businessInfo?.are_you_beneficial_for_business == "Yes" ? (
            <>
              <p><strong>Designation*:</strong> {seller?.businessInfo?.beneficial_designation}</p>
            </>
          ):(
                <>
                  <p><strong>Are you business-representative?:</strong> {seller?.businessInfo?.are_you_business_representative}</p>
                  {seller?.businessInfo?.are_you_business_representative == "Yes" && ( 
                    <p><strong>Designation*:</strong> {seller?.businessInfo?.representative_designation}</p>
                  )}
                </>
          )}

          

          <p><strong>Name:</strong> {seller?.businessInfo?.beneficiary_first_name} {seller?.businessInfo?.beneficiary_last_name}</p>
          <p><strong>Date of Birth:</strong> {seller?.businessInfo?.beneficiary_date_of_birth}</p>
          <p><strong>Nationality:</strong> {seller?.businessInfo?.beneficiary_nationality}</p>
          <p><strong>Proof of Identification:</strong> {seller?.businessInfo?.proof_of_identification}</p>
          <p><strong>Proof of Identification Documents:</strong>  {" "}
          <a href={`${baseUrl}${seller?.businessInfo?.identification_proof_file}`} target='_blank'>View Documents</a> OR <a href={`${fileBasePath}${seller?.businessInfo?.identification_proof_file}`} download>Download File</a>
          </p>
          </div>

          <div className='col-lg-6'> 
          <p><strong>Address:</strong> {seller?.businessInfo?.beneficiary_address}</p>
          <p><strong>City:</strong> {seller?.businessInfo?.beneficiary_city}</p>
          <p><strong>State:</strong> {seller?.businessInfo?.beneficiary_state}</p>
          <p><strong>Zip code:</strong> {seller?.businessInfo?.beneficiary_zip_code}</p>
          <p><strong>Country:</strong> {seller?.businessInfo?.beneficiary_country}</p>
          <p><strong>Proof of Address:</strong> {seller?.businessInfo?.proof_of_address}</p>
          <p><strong>Proof of Address Document:</strong> <a href={`${fileBasePath}${seller?.businessInfo?.proof_of_address_file}`} target='_blank'>View Documents</a> OR <a href={`${fileBasePath}${seller?.businessInfo?.proof_of_address_file}`} download>Download File</a></p>  
        
          </div>
        </div>
      
      </Card>

      {/* Card Info */}
      {seller?.cartInfo && (
        <Card title="Card Information" bg="secondary">
      <div className='row'>
      <div className='col-lg-6'>
          <p><strong>Name Of Card:</strong> {seller?.cartInfo?.name_of_card}</p>
          {seller?.cartInfo?.card_number && seller?.cartInfo?.card_number_iv && ( 
            <p><strong>Card Number:</strong> **** **** **** {decryptText({data:seller?.cartInfo?.card_number, iv:seller?.cartInfo?.card_number_iv}).slice(15,19) }</p>
          )}

           {seller?.cartInfo?.expire_month && seller?.cartInfo?.expire_month_iv && ( 
            <p><strong>Expire:</strong> {decryptText({data:seller?.cartInfo?.expire_month, iv:seller?.cartInfo?.expire_month_iv}) }/{decryptText({data:seller?.cartInfo?.expire_year, iv:seller?.cartInfo?.expire_year_iv  }) }</p>
          )}

          </div>
          <div className='col-lg-6'>
          <p><strong>Security Code:</strong>***</p>
          <p><strong>Billing Address:</strong>{seller?.cartInfo?.billing_address}</p>
          </div>
        </div> 
      </Card>
      )}


        {/* Shipping Info */}
        <Card title="Tax Information" bg="info">
          <div className='row'>
          <div className='col-lg-6'>
            <p><strong>What is your tax classication?:</strong> {seller?.taxInfo?.tax_classication}</p>
            <p><strong>Are you a U.S. resident entity?:</strong> {seller?.taxInfo?.u_s_resident}</p>
            </div>

            <div className='col-lg-6'>
            {seller?.taxInfo?.u_s_resident == "Yes" && ( 
              <>
                <p><strong>Federal tax classication:</strong> {seller?.taxInfo?.federal_tax_classication}</p>
                <p><strong>LLC type:</strong> {seller?.taxInfo?.llc_type}</p>
              </>
            )}
            </div>
            <br />
            {seller?.taxInfo?.u_s_resident == "Yes" && ( 
              <>
               <div className='col-lg-12'>
              <h4>Tax Identity Information</h4>
          </div>
            <div className='col-lg-6'>
            <p><strong>Full name:</strong> {seller?.taxInfo?.full_name}</p>
            <p><strong>Doing business as “DBA” or trade name:</strong> {seller?.taxInfo?.trade_name}</p>
            <p><strong>Taxpayer Identication Number Type:</strong> {seller?.taxInfo?.employer_identification_number}</p>
            </div>

            <div className='col-lg-6'>
            <p><strong>Taxpayer Identication Number (TIN) :</strong> {seller?.taxInfo?.tin_number} </p>
            <p><strong>Document:</strong> <a href={`${fileBasePath}${seller?.taxInfo?.image}`}> View</a> OR <a href={`${fileBasePath}${seller?.taxInfo?.image}`} download> Download</a> </p>
            
            </div>

 
             <br></br>
            <div className='col-lg-12'>
                <h4>Address</h4>
             <br></br>

            </div>
          <div className='col-lg-6'>
                <p><strong>Country:</strong> {seller?.taxInfo?.country} </p>
                <p><strong>Address line 1:</strong> {seller?.taxInfo?.address_line_1} </p>
                <p><strong>City:</strong> {seller?.taxInfo?.city} </p>
              </div>

             <div className='col-lg-6'>
                <p><strong>Address line 2:</strong> {seller?.taxInfo?.address_line_2}</p>
                <p><strong>State:</strong> {seller?.taxInfo?.state}</p>
                <p><strong>Zip Code:</strong> {seller?.taxInfo?.zip_code}</p>
            </div>
              </>
            )}
         

          </div> 
          </Card>

      
    </div>
  );
};

const Card = ({ title, children, bg = 'light', textColor = 'white' }) => (
  <div className="card mb-4">
    <div className={`card-header bg-${bg} text-${textColor}`}>{title}</div>
    <div className="card-body">{children}</div>
  </div>
);

export default SellerDetails;
