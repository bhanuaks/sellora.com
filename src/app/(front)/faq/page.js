import Link from 'next/link';
import React from 'react';

const faqs = [
  {
    question: "What is an OTP or verification code?",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    question: "Can I use an international number to sign up?",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    question: "How can I change the email ID linked with my Sellora account?",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    question: "Can I reactivate my inactive Sellora account?",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    question: "Can I use the Cash on Delivery payment option for every product I buy on Sellora?",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }
];

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
                <Link className="current" href="/faq">
                  FAQ
                </Link>
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
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-left-area-main-wrapper shipping">
                <h2>FAQ's</h2>
                <div className="accordion-main-area-wrapper-style-1">
                  <div className="accordion" id="accordionExample">
                    {faqs.map((faq, index) => (
                      <div className="accordion-item" key={index}>
                        <div className="accordion-header">
                          <button
                            className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={index === 0 ? 'true' : 'false'}
                            aria-controls={`collapse${index}`}
                          >
                            {faq.question}
                          </button>
                        </div>
                        <div
                          id={`collapse${index}`}
                          className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
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
