'use client';
import { baseUrl, getOffPrecentage, main_thumb_img_path } from '@/Http/helper'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import ListingLoaderSkeleton from '@/app/skeleton_loader/listingLoader';
import { useCart } from '@/app/contaxtData/cartContaxt';
import { fileBasePath } from '@/Http/urlHelper';
import { toast, ToastContainer } from 'react-toastify';
import { userAppContaxt } from '@/app/contaxtData/userContaxtData';

const Product = ({ products, prductProccess }) => {

  const [wishlistUser, setWishlistUser] = useState([])
  const { user } = useCart()


  const fetchData = async (userid) => {
    try {
      //$('.loader-container').css('display', 'flex') 

      const response = await fetch(`/api/product/remove-wishlist?user_id=${userid}`);
      const result = await response.json();
      //console.log(result)
      if (result.status) {
        //$('.loader-container').css('display', 'none') 
        //setProductList(result.data.finalResults);
        const newArray = result.data.wishlist.map((list) => {
          return list.product_id
        })

        //console.log(newArray)
        setWishlistUser(newArray)


      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);

    }
  }

  useEffect(() => {
    //console.log('useriddddd',user)
    //$(".successfully-addedin-wishlist").show()
    
    if (user?._id) {
     
      fetchData(user?._id)

      
    }
  }, [user])

  if (prductProccess) {
    return (
      <div className='row'>
        {Array.from({ length: 12 }, (_, i) => (
          <ListingLoaderSkeleton key={i} />
        ))}
      </div>
    )
  }

  const showWishlist = async (pid, vid) => {
    //toast.success("pls login")
    //console.log(pid,vid, user._id)
    try {
      if (user) {
        const response = await fetch(`/api/product/add-to-wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user._id, product_id: pid, variant_id: vid })
        });

        const result = await response.json();
        
        if (result.status) { 
          toast.success('Added from wishlist successfully.')
          setWishlistUser([...wishlistUser, pid])
          
        } else {
          toast.success(result.data.message)
        }
      } else {
        toast.error("You have not logged in. Please login")
      }

    } catch (error) {
      console.error('Network error:', error);
    }

  }

  const removeWishlist = async (pid, vid) => {
    //toast.success("pls login")
    //console.log(pid,vid, user._id)
    try {
      if (user) {
        const response = await fetch(`/api/product/remove-wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user._id, product_id: pid, variant_id: vid })
        });

        const result = await response.json();
        if (result.status) {
          //console.log('okkkkkkkkkkkkk')
          
          const newArray = wishlistUser.filter((list) => list != pid)
          
          setWishlistUser(newArray)
          toast.success('Wishlist remove successfully.')
        } else {
          toast.success(result.data.message)
        }
      }

    } catch (error) {
      console.error('Network error:', error);
    }

  }





  
  return (
    <>

      <div className="successfully-addedin-wishlist">  <div className="d-flex" > <i className="fa-regular fa-check"></i>    <p>Your item has already added in wishlist successfully</p>  </div></div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <div className="col-6 col-lg-20 col-lg-4 col-md-6 col-sm-6 " key={index}>
            <div className="single-shopping-card-one deals-of-day">
              <div className="image-and-action-area-wrapper">

                <Link href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>

                  <div className="w-full flex justify-center items-center" style={{ minHeight: '200px' }}>
                    <img
                      src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                      alt="Product Image"
                      loading="lazy" 
                    />
                  </div>
                </Link>
                <div className="action-share-option"> 
                  {wishlistUser.includes(product._id) ?
                    <div className="single-action openuptip message-show-action wishlist_active" onClick={() => removeWishlist(product._id, product.variant?._id)}>

                      <i className="fa fa-heart" />
                    </div>
                    :
                    <div className="single-action openuptip message-show-action" onClick={() => showWishlist(product._id, product.variant?._id)}>

                      <i className="fa-light fa-heart" />
                    </div>
                  }



                  {/* <div className="single-action openuptip cta-quickview product-details-popup-btn">

                    <i className="fa-regular fa-eye" />
                  </div> */}
                </div>
              </div>
              <div className="body-content">
                <div className="start-area-rating">

                  <i className={`fa-star${product.avgRating > 0 && product.avgRating < 1 ? "-half-alt fa-solid selected" : ""}  ${product.avgRating >= 1 ? "fa-solid selected" : "fa-light"}`} />
                  <i className={`fa-star${product.avgRating > 1 && product.avgRating < 2 ? "-half-alt fa-solid selected" : ""} ${product.avgRating >= 2 ? "fa-solid selected" : "fa-light"}`} />
                  <i className={`fa-star${product.avgRating > 2 && product.avgRating < 3 ? "-half-alt fa-solid selected" : ""} ${product.avgRating >= 3 ? "fa-solid selected" : "fa-light"}`} />
                  <i className={`fa-star${product.avgRating > 3 && product.avgRating < 4 ? "-half-alt fa-solid selected" : ""} ${product.avgRating >= 4 ? "fa-solid selected" : "fa-light"}`} />
                  <i className={`fa-star${product.avgRating > 4 && product.avgRating < 5 ? "-half-alt fa-solid selected" : ""} ${product.avgRating >= 5 ? "fa-solid selected" : "fa-light"}`} />

                </div>
                <Link href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
                  <h4 className="title">{product?.product_name ? product.product_name : ''} </h4>
                </Link>

                {user?.role_consumer_business == "Business" ? (
                  <>
                    <div className="price-area">
                      <span className="current">${product.variant && product.variant.businessSalePrice}</span>
                      <div className="previous">${product.variant && product.variant.msrp}</div>
                    </div>
                    <div className="min-off">
                      Min. {product.variant ? getOffPrecentage(product.variant.msrp, product.variant.businessSalePrice).toFixed(2) : 0}% <span>Off</span>
                    </div>

                  </>) : (
                  // else consumer type user
                  <>
                    <div className="price-area">
                      <span className="current">${product.variant && product.variant.consumerSalePrice}</span>
                      <div className="previous">${product.variant && product.variant.msrp}</div>
                    </div>
                    <div className="min-off">
                      Min. {product.variant ? getOffPrecentage(product.variant.msrp, product.variant.consumerSalePrice).toFixed(2) : 0}% <span>Off</span>
                    </div>
                  </>
                )}

                <div className="cart-counter-action">

                  <Link
                    href="#"
                    className="rts-btn btn-primary radious-sm with-icon"
                  >
                    <div className="btn-text"> Add To Cart </div>
                    <div className="arrow-icon">
                      <i className="fa-regular fa-cart-shopping" />
                    </div>
                    <div className="arrow-icon">
                      <i className="fa-regular fa-cart-shopping" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">No products found</div>
      )}
    </>
  )
}

export default Product

