'use client';
import Link from 'next/link'
import DepartmentFilter from '../../frontComponents/component/departmentFilter';
import PriceFilter from '../../frontComponents/component/priceFilter';
import CustomerReviewFilter from '../../frontComponents/component/customerReviewFilter';
import BrandFilter from '../../frontComponents/component/brandFilter';
import HeaderFilter from '../../frontComponents/component/headerFilter';
import Product from '../../frontComponents/Product';
import { useCategory } from '@/app/(website)/contaxtData/CategoryProvider';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/Http/helper';
 

function page() {
 

    
     const [products, setProducts] = useState([]); 
     const [prductProccess, setPrductProccess] = useState(false)
      const [brandIds, setBrandIds] = useState("")
      const [minPriceVal, setMinPriceVal] = useState("")
      const [maxPriceVal, setMaxPriceVal] = useState("")
      const [sortByVal, setSortByVal] = useState("")
      const [reviewVal, setReviewVal] = useState("")
      const [minP, setMinP] = useState(0)
      const [maxP, setMaxP] = useState(0)
     
     const fetchProduct = async (brands, minPrice, maxPrice, sortVal, reviewVal) => {
       try {
         setPrductProccess(true)
         //const url = new URL(`${baseUrl}/api/product/deals?deal=${'hot-deals'}`);  
         const url = new URL(`${baseUrl}/api/product/deals?deal=${'hot-deals'}`);
        const queryParams = {
          brands:brands,
          minPrice:minPrice,
          maxPrice:maxPrice,
          sortVal:sortVal,
          reviewVal:reviewVal
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

         if(maxPrice){ } else {
          //console.log('pricingssss', maxPrice)
          let product = data.data
        let prodPrice = product.map((list,index) => {
          return list.variant.consumerSalePrice
        })
        prodPrice = prodPrice.sort(
          (a, b) => a - b
        );

        setMinP(prodPrice[0])
        setMaxP(prodPrice[prodPrice.length - 1])
      }
   
       } catch (error) {
         console.error('Error fetching products:', error);
         return [];
       }
     } 

     useEffect(()=>{
        fetchProduct(brandIds, minPriceVal, maxPriceVal, sortByVal, reviewVal)
     },[])

     const getBrand = (ids) => {

      //console.log('brndmainmmmm ',ids)
      setBrandIds(ids)
      fetchProduct(ids, minPriceVal, maxPriceVal, sortByVal, reviewVal);

   }

   const getPrice = (minPrice, maxPrice) => {

    //console.log('pricemainmmmm ',price)
    setMinPriceVal(minPrice)
    setMaxPriceVal(maxPrice)
    fetchProduct( brandIds, minPrice, maxPrice, sortByVal, reviewVal);

 }
 const getSortBy = (value) => {

  //console.log('pricemainmmmm ', value)
  setSortByVal(value)
  fetchProduct(brandIds, minPriceVal, maxPriceVal, value, reviewVal);

}
const getReview = (value) => {

  //console.log('pricemainmmmm ', value)
  setReviewVal(value)
  fetchProduct(brandIds, minPriceVal, maxPriceVal, sortByVal, value);

}

  return (
    <>
  {/* rts navigation bar area start */}
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href="#">Hot Deals</Link>
            {/* <i className="fa-regular fa-chevron-right" /> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rts navigation bar area end */}
  <div className="section-seperator">
    <div className="container">
      <hr className="section-seperator" />
    </div>
  </div>
  {/* shop[ grid sidebar wrapper */}
  <div className="shop-grid-sidebar-area rts-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-xl-2 col-lg-12 rts-sticky-column-item">
          <div className="sidebar-filter-main theiaStickySidebar"> 
        {/* <DepartmentFilter />  */}
        
        {products && maxP &&
        <PriceFilter getPrice={getPrice} products={products} brandId={brandIds} reviewValue={reviewVal} minp={minP} maxp={maxP} />
        }
        <CustomerReviewFilter getReview={getReview}  />
         
        <BrandFilter getBrand={getBrand} />
        
        

          </div>
        </div>

        <div className="col-xl-10 col-lg-12">
        
          <HeaderFilter getSortBy={getSortBy} products={products || []} /> 

          <div className="row g-4">
            <Product products={products} prductProccess={prductProccess}/>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* shop[ grid sidebar wrapper end */}
</>

  )
}
export default page