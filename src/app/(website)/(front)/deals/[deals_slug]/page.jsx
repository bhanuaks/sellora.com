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
    const [mobileFilter, setMobileFilter] = useState(false);
        const [activeIndices, setActiveIndices] = useState([]);
    


      const [pageInfo, setPageInfo] = useState({
        page: 1,
        hasMore: true
      });

     
      function toggleContent() { 
        if (window.innerWidth < 768) {
          setMobileFilter(!mobileFilter)
        }
      }

      
     const fetchProduct = async (brands, minPrice, maxPrice, sortVal, reviewVal, page=1) => {
      if(prductProccess){
        return false
      }
      if(page != 1 && page == pageInfo.page){
        return false
      }

       try {
         setPrductProccess(true)
         //const url = new URL(`${baseUrl}/api/product/deals?deal=${'hot-deals'}`);  
         const url = new URL(`${baseUrl}/api/product/deals?deal=${'hot-deals'}`);
        const queryParams = {
          brands:brands,
          minPrice:minPrice,
          maxPrice:maxPrice,
          sortVal:sortVal,
          reviewVal:reviewVal,
          page:page
        };
  
        Object.keys(queryParams).forEach((key) => {
          if (queryParams[key]) {
            url.searchParams.append(key, queryParams[key]);
          }
        });
         
         
         
         const response = await fetch(url,{method:"POST"});
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
   
         const data = await response.json();
         const newProducts = data.data.products || []; 
         const currentPage = data.data.pagination.page || 1;
         const filterPrice = data.data.filterPrice;
         setPageInfo(prev => ({
            ...data.data.pagination,
            hasMore: data.data.pagination 
              ? data.data.pagination.page < data.data.pagination.totalPages 
              : false
          }));

          if(filterPrice){
            setMinP(filterPrice.lowestPrice)
            setMaxP(filterPrice.highestPrice)
           }

         if (currentPage > 1 && products.length > 0) {
           setProducts(prevProducts => [...prevProducts, ...newProducts]);
         } else {
           setProducts(newProducts);
         }

         
         setPrductProccess(false)
   
       } catch (error) {
         console.error('Error fetching products:', error);
         return [];
       }
     } 

     useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && 
          pageInfo.hasMore
        ) {
          fetchProduct(brandIds, minPriceVal, maxPriceVal, sortByVal, reviewVal, pageInfo.page+1);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchProduct, pageInfo.hasMore]);


     useEffect(()=>{
        fetchProduct(brandIds, minPriceVal, maxPriceVal, sortByVal, reviewVal)
     },[])

     const getBrand = (ids) => { 
      setBrandIds(ids)
      fetchProduct(ids, minPriceVal, maxPriceVal, sortByVal, reviewVal);

   }

   const getPrice = (minPrice, maxPrice) => { 
      setMinPriceVal(minPrice)
      setMaxPriceVal(maxPrice)
      fetchProduct( brandIds, minPrice, maxPrice, sortByVal, reviewVal); 
  }

 const getSortBy = (value) => { 
    setSortByVal(value)
    fetchProduct(brandIds, minPriceVal, maxPriceVal, value, reviewVal); 
  }
  const getReview = (value) => { 
      setReviewVal(value)
      fetchProduct(brandIds, minPriceVal, maxPriceVal, sortByVal, value); 
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
 {/* <!-- =========================mobile-coding ===filter======================--> */}
 <button  onClick={()=>toggleContent()} className="d-lg-none filter_outer"> Filter
            {/* <!-- <i className="fa fa-angle-up"></i> --> */}
            &nbsp;
            {mobileFilter ?(<i className="fa fa-angle-up"></i>):(<i className="fa fa-angle-down"></i>) }
              
            </button>
            <div className="mobile_short">
            <div className="d-flex align-items-center">
              <div className="sort-by_0348"> <span>Sort By</span></div>
              <div className="single-select" style={{float:'right'}}>
                <select className="form-select" onChange={(e)=>getSortBy(e.target.value)}>
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
                    {/* <div className={`accordion-item2 ${activeIndices.includes("category") ? 'active' : ''}`} >
                      <div className="accordion-header"  onClick={()=>toggleAccordion("category")}>
                        Department <span className="accordion-icon" />{" "}
                      </div>
                      <DepartmentFilter mobile={true}/>
                    </div> */}
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
                      
                     
                          <BrandFilter getBrand={getBrand}  mobile={true} />
                       
                    
                    </div>
                  </div>
                </div>

            </div> 
          )}


          <div className="sidebar-filter-main theiaStickySidebar d-lg-block d-none"> 
        {/* <DepartmentFilter />  */}
        
        {products && maxP &&
          <PriceFilter getPrice={getPrice} products={products} brandId={brandIds} reviewValue={reviewVal} minp={minP} maxp={maxP} />
        }
         <CustomerReviewFilter getReview={getReview}  /> 
          <BrandFilter getBrand={getBrand} /> 
          </div>
        </div>

        <div className="col-xl-10 col-lg-12">
        
          <HeaderFilter getSortBy={getSortBy} products={products || []} pageInfo={pageInfo} /> 

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