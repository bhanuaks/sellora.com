import React from 'react'

const CartPageLoader = () => {
  return (
    <>
    <style>
        {`
         .skeleton {
            background-color: #e0e0e0;
            border-radius: 4px;
            animation: shimmer 1.5s infinite linear;
            background: linear-gradient(to right, #e0e0e0 0%, #f8f8f8 50%, #e0e0e0 100%);
            background-size: 200% 100%;
        }

        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }

            100% {
                background-position: 200% 0;
            }
        }

        .cart-container {
            /* width: 80%; */
            margin: auto;
            margin-top: 20px;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .cart-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }

        .skeleton-img {
            width: 100px;
            height: 100px;
            border-radius: 8px;
            margin-right: 20px;
        }

        .skeleton-coupon-area {
            width: 100%;
            height: 100px;
            border-radius: 8px;
            margin-right: 20px;
            margin-bottom: 10px;
        }

        .skeleton-text {
            flex: 1;
        }

        .skeleton-title {
            width: 80%;
            height: 20px;
            margin-bottom: 10px;
        }

        .skeleton-subtext {
            width: 60%;
            height: 15px;
            margin-bottom: 10px;
        }

        .skeleton-price {
            width: 40px;
            height: 20px;
            margin-left: 20px;
        }

        .skeleton-btn {
            width: 50px;
            height: 30px;
            border-radius: 5px;
            margin-left: 20px;
        }

        .order-summary {
            margin-top: 20px;

            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .skeleton-summary-item {
            width: 100%;
            height: 20px;
            margin-bottom: 10px;
        }

        .skeleton-coupon {
            width: 100px;
            height: 30px;
            border-radius: 5px;
            margin-top: 10px;
        }

        .skeleton-cart-heading {
            width: 150px;
            height: 30px;
            border-radius: 5px;
            margin-top: 10px;
        }

        .skeleton-summary-item-col {
            width: 100%;
            height: 30px;
            border-radius: 5px;
            margin-top: 10px;
        }

        .skeleton-summary-button {
            width: 90%;
            height: 50px;
            border-radius: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        `}
    </style>
    <div className="row">
    <div className="cart-container col-lg-8">
        <div className="skeleton skeleton-cart-heading"></div>
        <hr />
        <div className="cart-item">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton-text">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-subtext"></div>
                <div className="skeleton skeleton-subtext"></div>
            </div>
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton skeleton-btn"></div>
        </div>

        <div className="cart-item">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton-text">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-subtext"></div>
                <div className="skeleton skeleton-subtext"></div>
            </div>
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton skeleton-btn"></div>
        </div>
    </div>

    <div className="order-summary col-lg-3">
        <div className="skeleton skeleton-cart-heading"></div>
        <hr />
        {/* <div className="skeleton skeleton-coupon-area"></div> */}
        <div className="skeleton skeleton-coupon-area"></div>
        {/* <!-- <div className="skeleton skeleton-summary-item"></div> --> */}

        <div className="mb-3" style={{display: 'flex', justifyContent: 'space-between', maxWidth: '100%', gap: '100px'}}>
            <div className="skeleton skeleton-summary-item-col "></div>
            <div className="skeleton skeleton-summary-item-col "></div>
        </div>

        <div className="mb-3" style={{display: 'flex', justifyContent: 'space-between', maxWidth: '100%', gap: '100px'}}>
            <div className="skeleton skeleton-summary-item-col "></div>
            <div className="skeleton skeleton-summary-item-col "></div>
        </div>
        <hr />
        <div className="mb-3" style={{display: 'flex', justifyContent: 'space-between', maxWidth: '100%', gap: '100px'}}>
            <div className="skeleton skeleton-summary-item-col "></div>
            <div className="skeleton skeleton-summary-item-col "></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="skeleton skeleton-summary-button"></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="skeleton skeleton-summary-button"></div>
        </div>

    </div>
</div>
</>
  )
}

export default CartPageLoader