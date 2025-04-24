import Link from 'next/link';
import React from 'react';
 

function FAQPage() {
  return (
    <>
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            Consumer Policy
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="faq.html">
              FAQ
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
  <div className="rts-map-contact-area rts-section-gap2">
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="contact-left-area-main-wrapper shipping">
            <h2>Frequently Asked Questions (FAQ)</h2>
            <div className="accordion-main-area-wrapper-style-1">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      1. What is Sellora?
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {" "}
                      Sellora is an online marketplace that connects buyers and
                      sellers, offering a wide range of products across various
                      categories.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {" "}
                      2. How do I create an account?
                    </button>
                  </div>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {" "}
                      To create an account, click on the "Sign Up" button on the
                      homepage. Fill out the required information, including
                      your email address and a secure password. You will receive
                      a confirmation email to verify your account.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      3. How can I place an order?{" "}
                    </button>
                  </div>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="list_3">
                        <li>
                          Browse our categories or use the search bar to find
                          products.
                        </li>
                        <li>Click on the product for more details.</li>
                        <li>
                          Select your desired quantity and click "Add to Cart."
                        </li>
                        <li>
                          When you're ready to purchase, go to your cart and
                          click "Checkout."
                        </li>
                        <li>
                          Follow the prompts to enter your shipping information
                          and payment details.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      4. What payment methods do you accept?
                    </button>
                  </div>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We accept various payment methods, including credit/debit
                      cards, net banking, and popular e-wallets. You can choose
                      your preferred method during checkout.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      5. Can I track my order?
                    </button>
                  </div>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes! Once your order is shipped, you will receive a
                      tracking number via email. You can use this number to
                      track your shipment in real-time.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      {" "}
                      6. What is your return policy?{" "}
                    </button>
                  </div>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We offer a hassle-free return policy. If you’re not
                      satisfied with your purchase, you can return it within 30
                      days for a full refund, provided it’s in its original
                      condition. For detailed return instructions, visit our
                      Return Policy page.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      7. How can I contact customer support?
                    </button>
                  </div>
                  <div
                    id="collapseSeven"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can reach our customer support team via the "Contact
                      Us" page on our website. We are available through email,
                      live chat, and phone support.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      8. Do you offer international shipping?
                    </button>
                  </div>
                  <div
                    id="collapseEight"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Currently, we offer shipping within Unite States. We are
                      working on expanding our shipping options to international
                      destinations in the future.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNine"
                      aria-expanded="false"
                      aria-controls="collapseNine"
                    >
                      9. How can I become a seller on Sellora?
                    </button>
                  </div>
                  <div
                    id="collapseNine"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      To become a seller, click on the "Become a Seller" link on
                      our homepage. Fill out the application form, and our team
                      will review your request. Once approved, you can start
                      listing your products.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTen"
                      aria-expanded="false"
                      aria-controls="collapseTen"
                    >
                      10. Is my personal information secure?
                    </button>
                  </div>
                  <div
                    id="collapseTen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Absolutely! We prioritize your privacy and use
                      industry-standard encryption to protect your personal
                      information. Please review our Privacy Policy for more
                      details.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEleven"
                      aria-expanded="false"
                      aria-controls="collapseEleven"
                    >
                      11. How do I reset my password?
                    </button>
                  </div>
                  <div
                    id="collapseEleven"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If you’ve forgotten your password, click on the "Forgot
                      Password?" link on the login page. Follow the instructions
                      to reset your password via the email linked to your
                      account.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwelve"
                      aria-expanded="false"
                      aria-controls="collapseTwelve"
                    >
                      12. Can I modify or cancel my order?
                    </button>
                  </div>
                  <div
                    id="collapseTwelve"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can modify or cancel your order within a short period
                      after placing it. To do so, contact our customer support
                      as soon as possible.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThirteen"
                      aria-expanded="false"
                      aria-controls="collapseThirteen"
                    >
                      13. What if the item I received is damaged or defective?
                    </button>
                  </div>
                  <div
                    id="collapseThirteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If you receive a damaged or defective item, please contact
                      our customer support within 48 hours of delivery. We’ll
                      guide you through the return process and ensure you
                      receive a replacement or refund.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFourteen"
                      aria-expanded="false"
                      aria-controls="collapseFourteen"
                    >
                      14. How do I leave a review for a product?
                    </button>
                  </div>
                  <div
                    id="collapseFourteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      To leave a review, navigate to the product page of the
                      item you purchased. Scroll down to the review section,
                      select a star rating, and write your feedback. Your review
                      will be posted after it’s approved.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFifteen"
                      aria-expanded="false"
                      aria-controls="collapseFifteen"
                    >
                      15. What are the shipping costs?
                    </button>
                  </div>
                  <div
                    id="collapseFifteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Shipping costs vary based on the size, weight, and
                      destination of the package. You can view the shipping fee
                      during the checkout process before finalizing your order.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSixteen"
                      aria-expanded="false"
                      aria-controls="collapseSixteen"
                    >
                      16. How long does delivery take?
                    </button>
                  </div>
                  <div
                    id="collapseSixteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Delivery times depend on your location and the seller’s
                      shipping method. Generally, you can expect delivery within
                      3-8 business days. You’ll receive an estimated delivery
                      date at checkout.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeventeen"
                      aria-expanded="false"
                      aria-controls="collapseSeventeen"
                    >
                      17. Can I use discount codes?
                    </button>
                  </div>
                  <div
                    id="collapseSeventeen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes! If you have a discount code, enter it during the
                      checkout process to apply the discount to your order
                      total.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEighteen"
                      aria-expanded="false"
                      aria-controls="collapseEighteen"
                    >
                      18. What should I do if I encounter a technical issue on
                      the website?
                    </button>
                  </div>
                  <div
                    id="collapseEighteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If you experience any technical issues, try refreshing the
                      page or clearing your browser’s cache. If the problem
                      persists, contact our customer support for assistance.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNinteen"
                      aria-expanded="false"
                      aria-controls="collapseNinteen"
                    >
                      19. Are there any membership or subscription fees?
                    </button>
                  </div>
                  <div
                    id="collapseNinteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      There are no membership or subscription fees to shop on
                      Sellora. All users can browse and purchase products
                      without opt membership.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwenty"
                      aria-expanded="false"
                      aria-controls="collapseTwenty"
                    >
                      20. Can I save items for later?
                    </button>
                  </div>
                  <div
                    id="collapseTwenty"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes! You can add items to your Wishlist by clicking the
                      heart icon on the product page. This allows you to save
                      products for future reference.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentyone"
                      aria-expanded="false"
                      aria-controls="collapseTwentyone"
                    >
                      21. How do I update my account information?
                    </button>
                  </div>
                  <div
                    id="collapseTwentyone"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      To update your account information, log in to your account
                      and go to the "Account Settings" section. From there, you
                      can edit your personal details, shipping address, and
                      payment information.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentytwo"
                      aria-expanded="false"
                      aria-controls="collapseTwentytwo"
                    >
                      22. What happens if I forget my account email?
                    </button>
                  </div>
                  <div
                    id="collapseTwentytwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If you forget the email associated with your account, try
                      to remember any other emails you may have used. If you
                      still can’t find it, please contact customer support for
                      assistance.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentythree"
                      aria-expanded="false"
                      aria-controls="collapseTwentythree"
                    >
                      23. Can I request a specific delivery date?
                    </button>
                  </div>
                  <div
                    id="collapseTwentythree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      While we can’t guarantee specific delivery dates, you can
                      leave a note during checkout with your preferred delivery
                      timeframe. We’ll do our best to accommodate your request.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentyfour"
                      aria-expanded="false"
                      aria-controls="collapseTwentyfour"
                    >
                      24. What should I do if my order is delayed?
                    </button>
                  </div>
                  <div
                    id="collapseTwentyfour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If your order hasn’t arrived by the estimated delivery
                      date, check the tracking information first. If it still
                      appears to be delayed, please contact our customer support
                      for help.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentyfive"
                      aria-expanded="false"
                      aria-controls="collapseTwentyfive"
                    >
                      25. Are there any restrictions on purchasing?
                    </button>
                  </div>
                  <div
                    id="collapseTwentyfive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Some products may have age restrictions (like alcohol or
                      certain electronics) and can only be purchased by users of
                      a specific age. Please check product details for any such
                      restrictions.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentysix"
                      aria-expanded="false"
                      aria-controls="collapseTwentysix"
                    >
                      26. Do you have a mobile app?
                    </button>
                  </div>
                  <div
                    id="collapseTwentysix"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes! Our mobile app is available for both Android and iOS.
                      You can download it from the Google Play Store or Apple
                      App Store for a convenient shopping experience.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentyseven"
                      aria-expanded="false"
                      aria-controls="collapseTwentyseven"
                    >
                      27. What should I do if I suspect fraud or unauthorized
                      use of my account?
                    </button>
                  </div>
                  <div
                    id="collapseTwentyseven"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If you suspect any fraudulent activity or unauthorized use
                      of your account, please change your password immediately
                      and contact our customer support to report the issue.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentyeignt"
                      aria-expanded="false"
                      aria-controls="collapseTwentyeignt"
                    >
                      28. Do you offer gift cards?
                    </button>
                  </div>
                  <div
                    id="collapseTwentyeignt"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes, we offer gift cards! You can purchase them directly
                      from our website and send them to friends or family via
                      email.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwentynine"
                      aria-expanded="false"
                      aria-controls="collapseTwentynine"
                    >
                      29. Can I sell products internationally on Sellora?
                    </button>
                  </div>
                  <div
                    id="collapseTwentynine"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Currently, international selling is not supported. Sellers
                      can only list products available for shipment within
                      United States.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThirtee"
                      aria-expanded="false"
                      aria-controls="collapseThirtee"
                    >
                      30. How do I unsubscribe from promotional emails?
                    </button>
                  </div>
                  <div
                    id="collapseThirtee"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      If you wish to unsubscribe from our promotional emails,
                      click the "Unsubscribe" link at the bottom of any
                      promotional email you receive, or adjust your email
                      preferences in your account settings.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
}

export default FAQPage;
