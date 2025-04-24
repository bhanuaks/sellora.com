import Link from "next/link";
import React from "react";

const SpecialOfferP = () => {
    return (
        <>
        <h6 className="mb--10">Special offers:</h6>
              <ul className="offer-avil-list">
                <li>
                  {" "}
                  <i className="fas fa-tag" />
                  Freedom Sale - Apply Coupon Freedom 23 &amp; Get Upto 20% Off
                  (price inclusive of discount) &nbsp;
                  <span className="check-t-c-pop">T&amp;C </span>{" "}
                </li>
                <li>
                  {" "}
                  <i className="fas fa-tag" />
                  Pay Leter Get extra 6% off (price inclusive of
                  cashback/coupon) &nbsp;
                  <span className="check-t-c-pop"> T&amp;C </span>{" "}
                </li>
                <li>
                  {" "}
                  <i className="fas fa-tag" />
                  Pay Leter Get extra 6% off (price inclusive of
                  cashback/coupon) &nbsp;
                  <span className="check-t-c-pop"> T&amp;C </span>{" "}
                </li>
              </ul>
        </>
    )
}
export default SpecialOfferP;