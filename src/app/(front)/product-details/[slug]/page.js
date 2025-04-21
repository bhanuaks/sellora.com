"use client";
import { baseUrl, variantArrayFormat } from "@/Http/helper";
import Link from "next/link";
import React, { useState, useEffect, Suspense, lazy, useContext } from "react";
import NavCategory from "../../frontComponents/productDetails/NavCategory";
import VariantImage from "../../frontComponents/productDetails/VariantImage";
import Variants from "../../frontComponents/productDetails/Variants";
import SpecialOfferP from "../../frontComponents/productDetails/SpecialOfferP";
// import SimilarItem from '../../frontComponents/productDetails/SimilarItem';
import KeyAttributes from "../../frontComponents/productDetails/KeyAttributes";
import QuickDelivery from "../../frontComponents/productDetails/QuickDelivery";
import QuestionsAnswers from "../../frontComponents/productDetails/QuestionsAnswers";
import CustomerReviews from "../../frontComponents/productDetails/CustomerReviews";
import ProductDescription from "../../frontComponents/productDetails/ProductDescription";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProductImageSkeletonLoader from "@/app/skeleton_loader/product_image";
import ProductDetailsSkeletonLoader from "@/app/skeleton_loader/productDetails";
import ListingLoaderSkeleton from "@/app/skeleton_loader/listingLoader";
import { CartContaxt } from "@/app/contaxtData/cartContaxt";
import Image from "next/image";
import ButtonAndOfferSection from "../../frontComponents/productDetails/ButtonAndOfferSection";

const SimilarItem = lazy(() =>
  import("../../frontComponents/productDetails/SimilarItem")
);
const page = () => {
  const ProductDetails = () => {
    const router = useRouter();
    const { addToCartProduct } = useContext(CartContaxt);
    const [productDetails, setProductDetails] = useState(null);
    const [variantList, setVariantList] = useState([]);
    const [variantArrayList, setVariantArrayList] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState({});
    const [changeVariant, setChangeVariant] = useState({});
    const [onClickVarient, setOnClickVarient] = useState({});
    const [seller, setSeller] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    // const attributes = variantArrayFormat(variantList);
    const [proccess, setProccess] = useState(false);
    const searchParams = useSearchParams();
    const { slug } = useParams();
    const productId = searchParams.get("pId");
    const variantId = searchParams.get("vId");

    const fetchProduct = async (filters = {}) => {
      try {
        const url = new URL(`${baseUrl}/api/product-details`);

        Object.keys(filters).forEach((key) => {
          if (filters[key]) {
            url.searchParams.append(key, filters[key]);
          }
        });

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProductDetails(data.data.productData);
        setVariantList(data.data.variantList);
        setSeller(data.data?.productData?.seller || null);

        setAttributes(variantArrayFormat(data.data.variantList));
        setVariantArrayList(data.data.variantArray);
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    };

    useEffect(() => {
      if (slug || productId) {
        fetchProduct({ slug, productId });
      }
    }, [slug, productId]);

    async function addToCart(e) {
      e.preventDefault();
      setProccess(true);
      const resData = await addToCartProduct(
        productDetails._id,
        selectedVariant.variant_id,
        parseInt(selectedQuantity)
      );
      if (resData) {
        router.push(`${baseUrl}cart`);
      }
      setProccess(false);
    }


    const scrollToElement = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };


    if (!productDetails) {
      return (
        <div className="row" style={{ margin: "40px 0px" }}>
          <div className="col-lg-7">
            <ProductImageSkeletonLoader />
          </div>
          <div className="col-lg-5">
            <ProductDetailsSkeletonLoader />
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavCategory productDetails={productDetails}></NavCategory>

        <div className="section-seperator">
          <div className="container">
            <hr className="section-seperator" />
          </div>
        </div>

        <div className="rts-chop-details-area rts-section-gap">
          <div className="container">
            <div className="shopdetails-style-1-wrapper">
              <div className="row">
                <div className="col-lg-6">
                  <VariantImage
                    variantList={variantList}
                    productDetails={productDetails}
                    changeVariant={changeVariant}
                  />
                 
                </div>
                <div className="col-lg-4">
                  <div className="contents">
                    <div className="pro-details-brand">
                      <span>
                        Brand:
                        {productDetails &&
                          Object.keys(productDetails).length > 0 && (
                            <Link href="#">{productDetails.brand_id.name}</Link>
                          )}
                      </span>
                    </div>
                    <span className="product-title">
                      {productDetails &&
                        Object.keys(productDetails).length > 0 && (
                          <h2 className="product-title">
                            {productDetails.product_name}
                          </h2>
                        )}
                    </span>
                    {/* <i className={`fa-star${product.avgRating >0 && product.avgRating < 1?"-half-alt fa-solid selected":""}  ${product.avgRating >=1?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >1 && product.avgRating < 2?"-half-alt fa-solid selected":""} ${product.avgRating >=2?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >2 && product.avgRating < 3?"-half-alt fa-solid selected":""} ${product.avgRating >=3?"fa-solid selected":"fa-light"}`} />
                              <i className={`fa-star${product.avgRating >3 && product.avgRating < 4?"-half-alt fa-solid selected":""} ${product.avgRating >=4?"fa-solid selected":"fa-light"}`} /> 
                              <i className={`fa-star${product.avgRating >4 && product.avgRating < 5?"-half-alt fa-solid selected":""} ${product.avgRating >=5?"fa-solid selected":"fa-light"}`} />   */}
              
                    <div className="product-status">
                      <div className="rating-stars-group" onClick={()=>scrollToElement("ratingSection")} style={{cursor:"pointer"}}>
                        <div className="rating-star">
                          <i className={`fa-star${productDetails.avgRating >0 && productDetails.avgRating < 1?"-half-alt fa-solid selected":""}  ${productDetails.avgRating >=1?"fa-solid selected":"fa-light"}`}  />
                        </div>
                        <div className="rating-star">
                          <i className={`fa-star${productDetails.avgRating >1 && productDetails.avgRating < 2?"-half-alt fa-solid selected":""}  ${productDetails.avgRating >=2?"fa-solid selected":"fa-light"}`} />
                        </div>
                        <div className="rating-star">
                          <i className={`fa-star${productDetails.avgRating >2 && productDetails.avgRating < 3?"-half-alt fa-solid selected":""}  ${productDetails.avgRating >=3?"fa-solid selected":"fa-light"}`} />
                        </div>
                        <div  className="rating-star">
                          <i className={`fa-star${productDetails.avgRating >3 && productDetails.avgRating < 4?"-half-alt fa-solid selected":""}  ${productDetails.avgRating >=4?"fa-solid selected":"fa-light"}`} />
                        </div>
                        <div className="rating-star">
                          <i className={`fa-star${productDetails.avgRating >4 && productDetails.avgRating < 5?"-half-alt fa-solid selected":""}  ${productDetails.avgRating >=5?"fa-solid selected":"fa-light"}`} />
                        </div>
                        <span >({productDetails.avgRating.toFixed(1)}) {productDetails.totalReviews} Reviews</span>
                      </div>
                    </div>

                    <Variants
                      attributes={attributes}
                      setChangeVariant={setChangeVariant}
                      setOnClickVarient={setOnClickVarient}
                      variantArrayList={variantArrayList}
                      selectedVariant={selectedVariant}
                      setSelectedVariant={setSelectedVariant}
                      variantId={variantId}
                      productDetails={productDetails}
                    ></Variants>
                    
                    <div className="product-uniques">
                      <ul>
                      {seller?.shipFrom && (
                        <li>
                          <span>Ships from</span>
                          <span className="colon">: </span> 
                           {seller?.shipFrom?.city} - {seller?.shipFrom?.zip_code}
                        </li>
                      )}
                       
                        <li>
                          <span>Seller</span>
                          <span className="colon">: </span>
                          <Link
                            href={`${baseUrl}seller-details/${productDetails?.seller_id}`}
                          >
                            <strong>{seller?.display_name || seller?.name}</strong>
                          </Link>
                          &nbsp; <span className="rating_2312">4.7*</span>
                        </li>
                        <li>
                          <span>Returns</span>
                          <span className="colon">: </span> 30 day
                          refund/replacement
                        </li>
                      </ul>
                    </div>
                    <div className="brand_list">
                      <ul>
                        {Object.keys(onClickVarient).map((key, item) => (
                          <li key={key}>
                            <span>{key.toUpperCase()}</span>
                            {onClickVarient[key]}
                          </li>
                        ))}
                        <li>
                          <span>Manufacture </span>
                          {productDetails &&
                            Object.keys(productDetails).length > 0 && (
                              <>{productDetails.manufacturer_details}</>
                            )}
                        </li>
                      </ul>
                    </div> 

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="shop-sight-sticky-sidevbar mb--20">
                          <h6>
                            Protections for this product
                            {/* <i className="fa fa-angle-right" /> */}
                          </h6>
                          <div className="single-offer-area">
                            <div className="icon">
                              <img
                                src={`${baseUrl}front/assets/images/secure.jpg`}
                                alt="icon"
                              />
                            </div>
                            <div className="details">
                              <h2>Secure payments</h2>
                              <p>
                                Every payment you make on sellora.com is secured
                                with strict SSL encryption and PCI DSS data
                                protection protocols
                              </p>
                            </div>
                          </div>
                          <div className="single-offer-area">
                            <div className="icon">
                              <img
                                src={`${baseUrl}front/assets/images/refund.jpg`}
                                alt="icon"
                              />
                            </div>
                            <div className="details">
                              <h2>Easy Return &amp; Refund</h2>
                              <p>
                                Claim a refund if your order is missing or
                                arrives with product issues, plus free local
                                returns for defects on qualifying purchases
                              </p>
                            </div>
                          </div>
                          <div className="not_2">
                            <p>
                              Sellora.com protects all your orders placed and
                              paid on the platform with
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  <ButtonAndOfferSection 
                  addToCart={addToCart}
                  proccess ={proccess}
                  changeVariant = {changeVariant}
                  selectedQuantity ={selectedQuantity}
                  setSelectedQuantity = {setSelectedQuantity}
                  />
                 <ProductDescription
                    productDetails={productDetails}
                  ></ProductDescription>
              </div>
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="row">
              <ListingLoaderSkeleton />
              <ListingLoaderSkeleton />
              <ListingLoaderSkeleton />
              <ListingLoaderSkeleton />
              <ListingLoaderSkeleton />
              <ListingLoaderSkeleton />
            </div>
          }
        >
          <SimilarItem productDetails={productDetails} />
        </Suspense>

        <KeyAttributes productDetails={productDetails} changeVariant={changeVariant}/>

        <QuickDelivery></QuickDelivery>

        <QuestionsAnswers  product_id={productDetails?._id}  slug={productDetails?.slug}  /> 

        <CustomerReviews product_id={productDetails?._id}  slug={productDetails?.slug}  /> 
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
};

export default page;
