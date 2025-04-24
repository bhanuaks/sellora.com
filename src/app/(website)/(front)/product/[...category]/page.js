'use client';
import Link from 'next/link'
import Product from '../../frontComponents/Product';
import DepartmentFilter from '../../frontComponents/component/departmentFilter'; 
import PriceFilter from '../../frontComponents/component/priceFilter'; 
import HeaderFilter from '../../frontComponents/component/headerFilter';
import BrandFilter from '../../frontComponents/component/brandFilter';
import CustomerReviewFilter from '../../frontComponents/component/customerReviewFilter';
import { useEffect, useState } from 'react';
import { baseUrl, formatSlugToName } from '@/Http/helper';
import { useParams } from 'next/navigation'; 

function page() {
  
  
    const params = useParams();
    const [activeIndices, setActiveIndices] = useState([]);
    const [mobileFilter, setMobileFilter] = useState(false);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [childcategory, setChildcategory] = useState('');
    const [products, setProducts] = useState([]);
  
    const [prductProccess, setPrductProccess] = useState(false)
    const [brandIds, setBrandIds] = useState("")
    const [minPriceVal, setMinPriceVal] = useState("")
    const [maxPriceVal, setMaxPriceVal] = useState("")
    const [sortByVal, setSortByVal] = useState("")
    const [reviewVal, setReviewVal] = useState("")
    const [minP, setMinP] = useState(0)
    const [maxP, setMaxP] = useState(0)
  
    const fetchProduct = async (category, subcategory, childcategory, brands, minPrice, maxPrice, sortVal, reviewVal) => {
      try {
        setPrductProccess(true)
        const url = new URL(`${baseUrl}/api/product`);
        const queryParams = {
          category,
          subcategory,
          childcategory,
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
        //console.log(brands, url)
        const response = await fetch(url,{method:"POST"});
        setPrductProccess(false)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
       
        setProducts(data.data);

        //console.log('pricingssss', maxPrice)
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
  
    useEffect(() => {
      if (Array.isArray(params?.category)) {
        const [cat, sub, child] = params.category;
        console.log(params.category);
        setCategory(cat || '');
        setSubcategory(sub || '');
        setChildcategory(child || '');
      }
    }, [params]);
    
      useEffect(() => {
        if (category) {
          fetchProduct(category, subcategory, childcategory, brandIds, minPriceVal, maxPriceVal, sortByVal, reviewVal);
        }
      }, [category, subcategory, childcategory]); 
  
   const getBrand = (ids) => {

      //console.log('brndmainmmmm ',ids, minPriceVal)
      setBrandIds(ids)
      fetchProduct(category, subcategory, childcategory, ids, minPriceVal, maxPriceVal, sortByVal, reviewVal);

   }

   const getPrice = (minPrice, maxPrice) => {

    //console.log('pricemainmmmm ',price)
    setMinPriceVal(minPrice)
    setMaxPriceVal(maxPrice)
    fetchProduct(category, subcategory, childcategory, brandIds, minPrice, maxPrice, sortByVal, reviewVal); 
 }
 const getSortBy = (value) => {

  //console.log('pricemainmmmm ', value)
  setSortByVal(value)
  fetchProduct(category, subcategory, childcategory, brandIds, minPriceVal, maxPriceVal, value, reviewVal);

}
const getReview = (value) => {

  //console.log('pricemainmmmm ', value)
  setReviewVal(value)
  fetchProduct(category, subcategory, childcategory, brandIds, minPriceVal, maxPriceVal, sortByVal, value);

}

function toggleContent() { 
  if (window.innerWidth < 768) {
    setMobileFilter(!mobileFilter)
  }
}

const toggleAccordion = (name) => {
  setActiveIndices((prev) =>
    prev.includes(name)
      ? prev.filter((i) => i !== name) // remove if already active
      : [...prev, name]               // add if not active
  );
};

  return (
    <>
  {/* rts navigation bar area start */}
  <div className="rts-navigation-area-breadcrumb">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
          <Link href="#"><i className="fa-regular fa-chevron-right" />{formatSlugToName(category)}</Link> 
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
        {/* <!-- =========================mobile-coding ===filter======================--> */}
          <button  onClick={()=>toggleContent()} className="d-lg-none filter_outer"> Filter
            {/* <!-- <i className="fa fa-angle-up"></i> --> */}
            <i className="fa fa-angle-down"></i> </button>
            <div className="mobile_short">
            <div className="d-flex align-items-center">
              <div className="sort-by_0348"> <span>Sort By</span></div>
              <div className="single-select" style={{float:'right'}}>
                <select className="form-select">
                  <option data-display="Best Match">Best Match</option>
                  <option value="1">Price, low to high</option>
                  <option value="2">Price, high to low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          {mobileFilter && (
 <div id="myContent" style={{display:`${mobileFilter?"block":"none"}`}}>
 <div className="sidebar-filter-main  ">
       <div className="accordion">
         <div className={`accordion-item2 ${activeIndices.includes("category") ? 'active' : ''}`} >
           <div className="accordion-header"  onClick={()=>toggleAccordion("category")}>
             Department <span className="accordion-icon" />{" "}
           </div>
           <DepartmentFilter mobile={true}/>
         </div>
         <div className={`accordion-item2 ${activeIndices.includes("price") ? 'active' : ''}`}>
           <div className="accordion-header"  onClick={()=>toggleAccordion("price")}>
             Price Filter <span className="accordion-icon" />{" "}
           </div>
           {products && maxP &&
                   <PriceFilter getPrice={getPrice} products={products} brandId={brandIds} reviewValue={reviewVal} minp={minP} maxp={maxP} mobile={true} />
                   }
         </div>
         <div className={`accordion-item2 ${activeIndices.includes("reviews") ? 'active' : ''}`}>
           <div className="accordion-header" onClick={()=>toggleAccordion("reviews")}>
             Customer Reviews <span className="accordion-icon" />{" "}
           </div>
           <CustomerReviewFilter getReview={getReview} mobile={true}/>
         </div>
         <div className={`accordion-item2 ${activeIndices.includes("brand") ? 'active' : ''}`} >
           <div className="accordion-header"  onClick={()=>toggleAccordion("brand")} >
             Select Brands <span className="accordion-icon" />{" "}
           </div>
           
           {category && 
               <BrandFilter getBrand={getBrand} category={category}  mobile={true} />
             }
         
         </div>
       </div>
     </div>

 </div> 
          )}
         

          
              <div className="sidebar-filter-main theiaStickySidebar d-lg-block d-none"> 
              <DepartmentFilter />
              {products && maxP &&
              <PriceFilter getPrice={getPrice} products={products} brandId={brandIds} reviewValue={reviewVal} minp={minP} maxp={maxP} />
              }
              <CustomerReviewFilter getReview={getReview} />
              {category && 
                <BrandFilter getBrand={getBrand} category={category} />
              }
                </div>
            </div>
        
        <div className="col-xl-10 col-lg-12"> 
          <HeaderFilter getSortBy={getSortBy}   products={products || []} /> 
          <div className="row g-4">
            <Product products={products || []} prductProccess={prductProccess}/>
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