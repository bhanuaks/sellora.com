import { isEmpty, rand, responseFun, slugify } from "@/Http/helper";
import path from 'path'
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { Category } from "../../../../lib/categoryModel";
import { subCategory } from "../../../../lib/subcategoryModel";
import ChildCategory from "../../../../lib/childcategoryModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";

export async function POST(req) {
    try {
       
        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        const subcategory = url.searchParams.get('subcategory');
        const childcategory = url.searchParams.get('childcategory');
        const brands = url.searchParams.get('brands');
        const minPrice = url.searchParams.get('minPrice');
        const maxPrice = url.searchParams.get('maxPrice');
        const sortVal = url.searchParams.get('sortVal');
        const reviewVal = url.searchParams.get('reviewVal');

        

        const  filterBy ="";
        const  start_price = minPrice;
        const  end_price = maxPrice;
        const  brand = [];
        
        //console.log('routessssss', category, subcategory)

        let query = {};
        
        if (category) {
            const categoryData = await Category.findOne({slug : decodeURIComponent(category)});
           
            if (categoryData) {
                //console.log('catttttttt')                    
                query.category_id = categoryData._id;
            }else{
                //console.log('okkkk')
                return responseFun(true, { message: "No products found matching the filters." }, 404);
            }
        }
        
        // if choose sub category
        if (subcategory) {
            const subcategoryData = await subCategory.findOne({ slug: decodeURIComponent(subcategory) }); 
            //console.log('oooooo', subcategoryData)
            if (subcategoryData) {
                
                query.subcategory_id = subcategoryData._id;
            }else{
                return responseFun(true, { message: "No products found matching the filters." }, 404);
            }
        }
        
         // if choose child category
        if (childcategory) {
            const childcategoryData = await ChildCategory.findOne({ slug: decodeURIComponent(childcategory) });
            if (childcategoryData) {
                query.childcategory_id = childcategoryData._id;
            }else{
                return responseFun(true, { message: "No products found matching the filters." }, 404);
            }
        }
        
        //{ brand_id: { $in: brandIds } }
        if(brands){
            let newBrands = brands.split(',')
            query.brand_id= {
                $in:newBrands
            }
        }

        
        //console.log('querrrrrr', query)
        // fetch  product data
        
        const products = await productModel.find(query);
        
        //console.log('dddddd', query)
        // get variant data
         let productWithVariant = await Promise.all(
                    products.map(async (prod)=>{
                        let variantQuery = {
                            product_id: prod._id,
                            listingStatus: 1
                        }; 

                        if(start_price){
                            variantQuery.consumerSalePrice  = {...variantQuery.consumerSalePrice, $gte:start_price }
                        }
                        if(end_price){
                            variantQuery.consumerSalePrice = {...variantQuery.consumerSalePrice, $lte:end_price}
                        }

                        //let variantQueryBuilder = await productVariantModel.find(variantQuery).sort({consumerSalePrice:-1 })

                        let variantQueryBuilder  = await productVariantModel.find(variantQuery)
                        
                        
                        /* if(sortVal==1){
                            variantQueryBuilder = await productVariantModel.find(variantQuery).sort({consumerSalePrice:1 })
                        } else if(sortVal == 2){
                            variantQueryBuilder = await productVariantModel.find(variantQuery).sort({consumerSalePrice:-1 })
                        } else {
                            variantQueryBuilder = await productVariantModel.find(variantQuery)
                        }
                            */
                         
                        
                        //console.log("Mongoose query:");
                        //console.log("Mongoose .find() query filter:", variantQueryBuilder.getQuery());      // filters
                        //console.log("Mongoose .find() query options:", variantQueryBuilder.getOptions());   // sort, limit, etc.

                        //await variantQueryBuilder.exec();
                        //variantQueryBuilder = await variantQueryBuilder.exec();
                        if (filterBy) {
                            let sortOrder = filterBy === "ASC"? 1:-1;
                            variantQueryBuilder = variantQueryBuilder.sort({consumerSalePrice: sortOrder }).limit(1);
                        }
                        //  const variant =  variantQueryBuilder; 

                         
                        
                        if (!variantQueryBuilder.length) return null;

                         
                        let pipeline
                        
                        if (reviewVal > 0) {
                            //pipeline.push({ $match: { star: 4 } });
                            
                            
                                pipeline = [
                                    { $match: { product_id: prod._id, star: { $gte : parseInt(reviewVal)} } },
                                    { $group: { _id: null, avgRating: { $avg: "$star" } } },
                                ];
                            

                        } else {
                            pipeline = [
                                { $match: { product_id: prod._id } },
                                { $group: { _id: null, avgRating: { $avg: "$star" } } },
                            ];
                        }
                        
                        const reviewAvg = await ProductReviewModal.aggregate(pipeline);


                        /* const reviewAvg = await ProductReviewModal.aggregate([
                            { $match: { product_id: prod._id } },
                            { $group: { _id: null, avgRating: { $avg: "$star" } } },
                            
                        ]);
                        */
                        //console.log('ratinggggg',reviewAvg)
                        //const avgRating = reviewAvg.length > 0 ? reviewAvg[0].avgRating : 0;
                        if(reviewVal > 0){
                            if(reviewAvg.length > 0){
                                const avgRating = reviewAvg.length > 0 ? reviewAvg[0].avgRating : 0;
                                return {
                                    ...prod.toObject(),
                                    variant:variantQueryBuilder[0],
                                    avgRating:avgRating
                                }

                            }
                        } else {
                            const avgRating = reviewAvg.length > 0 ? reviewAvg[0].avgRating : 0;
                                return {
                                    ...prod.toObject(),
                                    variant:variantQueryBuilder[0],
                                    avgRating:avgRating
                                }

                        }


                    })
                 )

               productWithVariant = productWithVariant.filter((item)=> item != null)
               
               if(sortVal==1){
                
                //console.log('okkkkk')
                productWithVariant = productWithVariant.sort(
                    (a, b) => a.variant.consumerSalePrice - b.variant.consumerSalePrice
                  );
                } else if(sortVal == 2){
                    productWithVariant = productWithVariant.sort(
                        (a, b) => b.variant.consumerSalePrice - a.variant.consumerSalePrice
                      );
                } 
               
                if (reviewVal > 0) {
                    if(sortVal > 0){ } else {
                    productWithVariant = productWithVariant.sort(
                        (a, b) => a.avgRating - b.avgRating
                      );
                    }


                }
                


       
        return responseFun(true, productWithVariant, 200);
          
      } catch (error) {
        console.log(error);
       return responseFun(false, {message:"An error occurred while fetching products"}, 500)
    }
}
