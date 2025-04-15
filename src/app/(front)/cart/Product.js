'use client';
import { baseUrl, getOffPrecentage, main_thumb_img_path } from '@/Http/helper'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ListingLoaderSkeleton from '@/app/skeleton_loader/listingLoader';
import { useCart } from '@/app/contaxtData/cartContaxt';
import { fileBasePath } from '@/Http/urlHelper';

const Product = () => {
  
  const params = useParams();
  const {user} = useCart()
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [childcategory, setChildcategory] = useState('');
  const [products, setProducts] = useState([]);

  const [prductProccess, setPrductProccess] = useState(false)

  const fetchProduct = async (category, subcategory, childcategory) => {
    try {
      setPrductProccess(true)
      const url = new URL(`${baseUrl}/api/product`);
      const queryParams = {
        category,
        subcategory,
        childcategory,
      };

      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          url.searchParams.append(key, queryParams[key]);
        }
      });
      const response = await fetch(url,{method:"POST"});
      setPrductProccess(false)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
     
      setProducts(data.data);

    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  } 

    useEffect(() => {
      if (params.category) {
        setCategory(params.category); 
      }
      if (params.subcategory) {
        setSubcategory(params.subcategory);
      }
      if (params.childcategory) {
        setChildcategory(params.childcategory);
      }

    }, [params]);
  
    useEffect(() => {
      if (category) {
        fetchProduct(category, subcategory, childcategory);
      }
    }, [category, subcategory, childcategory]); 

    if(prductProccess){
      return(
        <div className='row'> 
          {Array.from({length:12},(_,i)=>(
            <ListingLoaderSkeleton key={i}/>
          ))} 
        </div>
      )
    }
   
   
  return (
    <>
       {products && products.length > 0 ? (
          products.map((product, index) => (
        <div className="col-lg-20 col-lg-4 col-md-6 col-sm-6 col-12"  key={index}>
          <div className="single-shopping-card-one deals-of-day">
            <div className="image-and-action-area-wrapper">
              
              <Link href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
              <div className='reletive w-full h-full'> 
                      <img src={`${fileBasePath}${main_thumb_img_path}${product.main_image}`}
                        alt="Product Image" 
                        className='object-cover'
                        layout="fill"
                        />
                  </div>
                {/* <img src={`${baseUrl}${main_thumb_img_path}${product.main_image}`}  alt='Product Image'></img> */}
              </Link>
              <div className="action-share-option">
                <div className="single-action openuptip message-show-action">
                  
                  <i className="fa-light fa-heart" />
                </div>
                <div className="single-action openuptip cta-quickview product-details-popup-btn">
                  
                  <i className="fa-regular fa-eye" />
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="start-area-rating"> 
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
              </div>
              <Link href={`${baseUrl}/product-details/${product.slug}?pId=${product._id}&vId=${product.variant?._id}`}>
                <h4 className="title">{product?.product_name ? product.product_name :''} </h4>
              </Link>
              
              {user?.role_consumer_business == "Business" ?( 
                <>
                <div className="price-area"> 
                  <span className="current">${product.variant && product.variant.businessSalePrice}</span>
                  <div className="previous">${product.variant && product.variant.msrp}</div>
                </div>
                <div className="min-off">
                  Min. {product.variant? getOffPrecentage(product.variant.msrp, product.variant.businessSalePrice).toFixed(2):0}% <span>Off</span>
                </div>

                </>):(
                  // else consumer type user
                <>
                <div className="price-area"> 
                  <span className="current">${product.variant && product.variant.consumerSalePrice}</span>
                  <div className="previous">${product.variant && product.variant.msrp}</div>
                </div>
                <div className="min-off">
                  Min. {product.variant? getOffPrecentage(product.variant.msrp, product.variant.consumerSalePrice).toFixed(2):0}% <span>Off</span>
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