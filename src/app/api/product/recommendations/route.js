import { responseFun } from "@/Http/helper";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import { wishlistModel } from "@/Http/Models/wishlistModel";
import mongoose from "mongoose";



export async function GET(req) {

       
        const url = new URL(req.url);
        const user_id = url.searchParams.get('user_id');
        const sortVal = "";
        const searchVal = "";
        const categoryIds = []
        const productIds = []
        //console.log('useriddddd', user_id)
        try {
        
            if(user_id){
                const wishlist = await wishlistModel.find({user_id:user_id}).populate('product_id');
                wishlist.map(async (wishlistList) => {
                    categoryIds.push(wishlistList.product_id.category_id)
                    productIds.push(wishlistList.product_id._id)
                })
            }
             
            //console.log(categoryIds)
        
        
            
            
            let productWithVariant
            let arrProd=[]
            
                    
                //arrProd.push(wishlistList.product_id._id)
            /* let queryProduct = { 
                
                category_id: { $in: categoryIds },
                _id : { $nin: productIds} 
            }
                */
            let queryProduct = [
                { $match: { 
                    category_id: { $in: categoryIds },
                    _id: { $nin: productIds },
                    save_as_draft: '0'
                    
                    } },
                { $sample: { size: 10 } } 
              ]
                
            const products = await productModel.aggregate(queryProduct);
            
            
            productWithVariant = await Promise.all(
                    
                products.map(async (prod)=>{
                                    let variantQuery = {
                                        product_id: prod._id,
                                        listingStatus: 1,
                                        isProcessing:'Approved'
                                    }; 
                       
                                    let variantQueryBuilder  = await productVariantModel.find(variantQuery)
                                                                      
                                    if (!variantQueryBuilder.length) return null;
            
                                     
                                    let pipeline
                                    
                                    
                                        pipeline = [
                                            { $match: { product_id: prod._id } },
                                            { $group: { _id: null, avgRating: { $avg: "$star" } } },
                                        ];
                                    
                                    
                                    const reviewAvg = await ProductReviewModal.aggregate(pipeline);
            
                                    const avgRating = reviewAvg.length > 0 ? reviewAvg[0].avgRating : 0;
                                            
                                    const totalReviews = await ProductReviewModal.countDocuments(
                                             { product_id: prod._id }   
                                          );    
                                        
                                        return {
                                                ...prod,
                                                variant:variantQueryBuilder[0],
                                                avgRating:avgRating,
                                                totalReviews:totalReviews,
                                                
                                            }
            
                                    
            
            
                                })

                            
                             )

                            productWithVariant = productWithVariant.filter((item)=> item != null)                 
                            
                            //arrProd.push(productWithVariant)
                            
                           
            
            
            // console.log('finalllll',productWithVariant.length)

            
            
            return responseFun(true, {productWithVariant}, 200)
         
        } catch (error){
            console.log(error);
            return responseFun(false, {error}, 200)
        }
   
        
        

}

