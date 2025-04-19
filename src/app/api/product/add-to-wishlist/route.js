import { responseFun } from "@/Http/helper";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import { wishlistModel } from "@/Http/Models/wishlistModel";
import mongoose from "mongoose";



export async function GET(req) {

       
        const url = new URL(req.url);
        const user_id = url.searchParams.get('user_id');
        const sortVal = url.searchParams.get('sortVal');
        const searchVal = url.searchParams.get('searchVal');
        
        //console.log('useriddddd', user_id)
        try {
        if(user_id){
            const wishlist = await wishlistModel.find({user_id:user_id}).populate('product_id').populate('variant_id').populate('user_id');
        //console.log(wishlist)
         if(wishlist){
            
            let productWithVariant
            let arrProd=[]
            const arrList = wishlist.map(async (wishlistList) => {
                    
                //arrProd.push(wishlistList.product_id._id)
            let queryProduct = {
                _id:wishlistList.product_id._id,
                
            }
            queryProduct.save_as_draft = 0;
            if(searchVal && searchVal != ''){
                queryProduct.product_name = { $regex: searchVal, $options: 'i' }
            }
                
            const products = await productModel.find(queryProduct);
            
            
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
                                                ...prod.toObject(),
                                                variant:variantQueryBuilder[0],
                                                avgRating:avgRating,
                                                totalReviews:totalReviews,
                                                wishlistDetail:{
                                                    _id:wishlistList._id,
                                                    createdAt:wishlistList.createdAt,
                                                    updatedAt:wishlistList.updatedAt
                                                },
                                                wishlistId:wishlistList._id,
                                                userId:wishlistList.user_id._id,
                                                variantId:wishlistList.variant_id._id
                                            }
            
                                    
            
            
                                })

                            
                             )

                            return  productWithVariant = productWithVariant.filter((item)=> item != null)                 
                            
                            //arrProd.push(productWithVariant)
                            })
                           
            
            
            //console.log('finalllll',arrList,arrProd)

            let finalResults = await Promise.all(arrList);
            finalResults = finalResults.flat(Infinity)


            if(sortVal==1){
                
                //console.log('okkkkk')
                finalResults = finalResults.sort(
                    (a, b) => a.variant.consumerSalePrice - b.variant.consumerSalePrice
                  );
                } else if(sortVal == 2){
                    finalResults = finalResults.sort(
                        (a, b) => b.variant.consumerSalePrice - a.variant.consumerSalePrice
                      );
                }
            
            return responseFun(true, {finalResults}, 200)
         } else {
            return responseFun(false, {message:'No record found?'}, 200)
         }
        }   
        
        }catch(error){
            console.log(error);
            return responseFun(false, {error}, 200)
        }


}

export async function POST(request) { 

    const {product_id, variant_id, user_id } = await request.json();

    if(!product_id || !variant_id || !user_id){
        return responseFun(false, {message:"user Id, product Id  and variant Id are required"}, 200) 
    }
     
    try{
        const product = await productModel.findById(product_id) 
        const wishlistData = {
            user_id:user_id,
            product_id:product_id,
            variant_id:variant_id,
            
        }

        let wishlist = await wishlistModel.findOne({
            user_id:new mongoose.Types.ObjectId(user_id),
            product_id:new mongoose.Types.ObjectId(product_id),
            variant_id:new mongoose.Types.ObjectId(variant_id),
        })

        if(wishlist){
            
            return responseFun(false, {message:"wishlist already done"}, 200)    
        }else{
            wishlist = await wishlistModel.create(wishlistData)
        } 

        return responseFun(true, {wishlist}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}