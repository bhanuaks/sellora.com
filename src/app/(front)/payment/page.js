import { baseUrl } from '@/Http/helper'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
 <>
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            Help
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">
              Payment
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
            <h1 class="text-center">Payment</h1>
            <h2>
              <img src={`${baseUrl}front/assets/images/payment_01.png`} /> Payment Methods
              Accepted at Sellora
            </h2>
            <p>
              At <strong>Sellora</strong>, we provide a range of secure and
              convenient payment options to give you flexibility and confidence
              when shopping with us.
            </p>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} /> Credit &amp; Debit
              Cards
            </h3>
            <p>We accept all major cards, including:</p>
            <ul>
              <li>Visa</li>
              <li>Mastercard</li>
              <li>American Express</li>
              <li>Discover</li>
              <li>Diners Club</li>
              <li>JCB</li>
            </ul>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} /> Pay by Bank
            </h3>
            <p>
              Connect your bank account securely and pay directly from your bank
              at checkout.
            </p>
            <ul>
              <li>Save up to three accounts</li>
              <li>Only one account can be active at a time</li>
              <li>Allow up to five business days for fund withdrawal</li>
            </ul>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} /> PayPal
            </h3>
            <p>
              Choose PayPal at checkout for quick, secure, and trusted
              transactions using your PayPal account.
            </p>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} /> Gift Cards &amp;
              eGift Cards
            </h3>
            <p>
              Sellora accepts <strong>Sellora Gift Cards</strong> and{" "}
              <strong>Sellora eGift Cards:</strong>
            </p>
            <ul>
              <li>Enter the 16-digit card number and PIN during checkout</li>
              <li>eGift Cards: PIN is sent via email confirmation</li>
              <li>
                Gift cards can be used online across all eligible products
              </li>
              <li>
                Note: Gift cards cannot be used to purchase other gift cards
              </li>
            </ul>
            <hr />
            <p>
              <strong>To check your gift card balance:</strong>
            </p>
            <ul>
              <li>Log in to your Sellora account</li>
              <li>Go to “Wallet” under account settings</li>
              <li>
                Select “Check Balance” and enter your gift card number and PIN
              </li>
            </ul>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} /> Health &amp; Benefit
              Cards
            </h3>
            <p>
              Use your HSA/FSA cards and eligible Benefit Cards (e.g., Healthy
              Benefits, OTC Network) on qualifying items.
            </p>
            <ul>
              <li> Just enter them like a regular credit card at checkout</li>
            </ul>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} /> Refund Credit &amp;
              Sellora Wallet
            </h3>
            <p>
              Refunds from returns are processed back to your original payment
              method or issued as <strong>Sellora Wallet Credit</strong>, which
              can be used for future purchases.
            </p>
            <hr />
            <h3>
              <img src={`${baseUrl}front/assets/images/credit_debit.png`} />
              Affirm (Buy Now, Pay Later)
            </h3>
            <p>
              See Affirm as a payment option at checkout. Break your purchase
              into easy monthly payments with no hidden fees.
            </p>
            <h3>
              <img src={`${baseUrl}front/assets/images/Payment-Methods.png`} /> How to Add or
              Manage Payment Methods
            </h3>
            <ul className="list_3">
              <li>
                Log in to your <strong>Sellora</strong> account
              </li>
              <li>
                Go to <strong>Account Settings &gt; Wallet</strong>
              </li>
              <li>
                Click on <strong>Add New Payment Method</strong>
              </li>
              <li>
                Choose your preferred option: Card, Bank, PayPal, Gift Card,
                etc.
              </li>
              <li>
                Enter the required details and click <strong>Save</strong>
              </li>
            </ul>
            <hr />
            <p>
              <strong>To edit or remove:</strong>
            </p>
            <ul>
              <li>Select the saved payment method</li>
              <li>Edit card details (e.g., expiration, security code)</li>
              <li>If the card number changes, delete and re-add the card</li>
            </ul>
            <p>
              Need help? Contact our support team at{" "}
              <a href="mailto:paments@sellora.com"> paments@sellora.com</a> for
              any payment-related queries.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

</>

  )
}
