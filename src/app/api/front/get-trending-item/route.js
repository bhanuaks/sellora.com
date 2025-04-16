import { responseFun } from "@/Http/helper";
import { orderProductModel } from "@/Http/Models/order";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";




export async function GET() {
    
    
    try{
        
        
        const productsWithOrder = await productModel.aggregate([
            {
              $lookup: {
                from: "orderproducts",
                localField: "_id",
                foreignField: "product_id",
                as: "orderData"
              }
            },
            {
              $addFields: {
                orderCount: { $size: "$orderData" }
              }
            },
            {
              $lookup: {
                from: "productvariants",
                let: { productId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$product_id", "$$productId"] },
                          { $eq: ["$listingStatus", 1] }
                        ]
                      }
                    }
                  },
                  {
                    $sort: { consumerSalePrice: 1 }
                  }
                ],
                as: "variants"
              }
            },
            {
                $match: {
                  "variants.0": { $exists: true } // Only include products where variants array is NOT empty
                }
            },
            {
              $project: {
                _id: 1,
                product_name: 1,
                orderCount: 1,
                variants: {
                  _id: 1,
                  product_id: 1,
                  consumerSalePrice: 1,
                  listingStatus: 1
                }
              }
            },
            {
              $sort: { orderCount: -1 } // Optional: change to any sorting logic
            },
            {
              $limit: 10
            }
          ]);
          
          //console.log(productsWithOrder.length)
            if(productsWithOrder){
                        
                        let productWithVariant
                        let arrProd=[]
                        const arrList = productsWithOrder.map(async (wishlistList) => {
                                
                            //arrProd.push(wishlistList.product_id._id)
                        let queryProduct = {
                            _id:wishlistList._id
                        }
                        
                            
                        const products = await productModel.find(queryProduct);
                        
                        
                        productWithVariant = await Promise.all(
                                
                            products.map(async (prod)=>{
                                //console.log(prod._id)                
                                
                                let variantQuery = {
                                                    product_id: prod._id,
                                                    listingStatus: 1
                                                }; 
                                   
                                                let variantQueryBuilder  = await productVariantModel.find(variantQuery)
                                                                                  
                                                //console.log('chekkkkkk', wishlistList._id, prod._id, variantQueryBuilder.length)
                                                //if (!variantQueryBuilder.length) return null;
                                                
                                                 
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
                                                            orderCount:wishlistList.orderCount
                                                            
                                                        }
                        
                                                
                        
                        
                                            })
            
                                        
                                         )
            
                                        return  productWithVariant = productWithVariant.filter((item)=> item != null)                 
                                        
                                        //arrProd.push(productWithVariant)
                                        })
                                       
                        
                        
                        //console.log('finalllll',arrList,arrProd)
            
                        let finalResults = await Promise.all(arrList);
                        finalResults = finalResults.flat(Infinity)
            
                        finalResults = finalResults.sort(
                            (a, b) => b.orderCount - a.orderCount
                          );               
                        /* finalResults = finalResults.sort(
                            (a, b) => a.variant.consumerSalePrice - b.variant.consumerSalePrice
                          );
                          */
                        
                        return responseFun(true, {finalResults}, 200)
                     } else {
                        return responseFun(false, {message:'No record found?'}, 200)
                     }     

        

    }catch(error){
        
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}