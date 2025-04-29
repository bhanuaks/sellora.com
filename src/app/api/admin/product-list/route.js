import { responseFun } from "@/Http/helper";
import { productModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";


export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
    const from_date = searchParams.get("from_date") || "";
    const to_date = searchParams.get("to_date") || "";
    const sellerId = searchParams.get("seller_name") || "";
    const approval_status = searchParams.get("approval_status") || "";
    const product_name = searchParams.get("product_name") || "";
    
    const limit = 20;
    const skip = (page - 1) * limit;

    const matchQuery = {};
    const variantQuery = {};
    
    if (from_date) {
        matchQuery.createdAt = { $gte: new Date(from_date) };
      }

      if (to_date) {
        matchQuery.createdAt = { $lte: new Date(to_date) };
      }

      if (sellerId) {
        matchQuery.seller_id = new mongoose.Types.ObjectId(sellerId);
      }
 
      if (product_name) {
        matchQuery.product_name = { $regex: product_name, $options: "i" };
      }

    try{
        const productList = await productModel.aggregate([
            {
                $match:matchQuery
            },
            {
                // join with seller
                $lookup:{
                    from:"sellers",
                    let:{sellerId: "$seller_id"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{$eq: ["$_id", "$$sellerId"]}
                            }
                        },
                        {
                            $project:{
                                name:1,
                                mobile:1,
                                email:1,
                                _id:1
                            }
                        }
                    ],
                    as:"seller"
                     
                }
            },
            {
                $addFields:{
                    seller:{$arrayElemAt: ["$seller", 0]}
                }
            },
        //end seller data
        
        //  category
        {
             
            $lookup:{
                from:"categories",
                let:{categoryId: "$category_id"},
                pipeline:[
                    {
                        $match:{
                            $expr:{$eq: ["$_id", "$$categoryId"]}
                        }
                    },
                    {
                        $project:{
                            name:1,
                            slug:1, 
                            _id:1
                        }
                    }
                ],
                as:"category"
                 
            }
        },
        {
            $addFields:{
                category:{$arrayElemAt: ["$category", 0]}
            }
        },

        // sub category  //  category
        {
             
            $lookup:{
                from:"subcategories",
                let:{subcategoryId: "$subcategory_id"},
                pipeline:[
                    {
                        $match:{
                            $expr:{$eq: ["$_id", "$$subcategoryId"]}
                        }
                    },
                    {
                        $project:{
                            subCategoryName:1,
                            slug:1, 
                            _id:1
                        }
                    }
                ],
                as:"subcategories"
                 
            }
        },
        {
            $addFields:{
                subcategories:{$arrayElemAt: ["$subcategories", 0]}
            }
        },
         
        // child categories

        {
             
            $lookup:{
                from:"childcategories",
                let:{childcategoryId: "$childcategory_id"},
                pipeline:[
                    {
                        $match:{
                            $expr:{$eq: ["$_id", "$$childcategoryId"]}
                        }
                    },
                    {
                        $project:{
                            childCategoryName:1,
                            slug:1, 
                            _id:1
                        }
                    }
                ],
                as:"childcategories"
                 
            }
        },
        {
            $addFields:{
                childcategories:{$arrayElemAt: ["$childcategories", 0]}
            }
        },

         // get brand 

         {
             
            $lookup:{
                from:"brands",
                let:{brandId: "$brand_id"},
                pipeline:[
                    {
                        $match:{
                            $expr:{$eq: ["$_id", "$$brandId"]}
                        }
                    },
                    {
                        $project:{
                            name:1,
                            slug:1, 
                            _id:1
                        }
                    }
                ],
                as:"brand"
                 
            }
        },
        {
            $addFields:{
                brand:{$arrayElemAt: ["$brand", 0]}
            }
        },

         // get brand 

         {
             
            $lookup:{
                from:"productvariants",
                let:{productId: "$_id"},
                pipeline:[
                    {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ["$product_id", "$$productId"] },
                              ...(approval_status
                                ? [
                                    approval_status === "Pending"
                                      ? { $eq: ["$isProcessing", "Processing"] }
                                      : { $eq: ["$isProcessing", approval_status] }
                                  ]
                                : [])
                            ]
                          }
                        }
                      }
                    
                ],
                as:"variants"
                 
            }
        },
        {
            $unwind: {
                path: "$variants",  
                preserveNullAndEmptyArrays: true 
            }
        },
        

        {
            $facet: {
                data: [
                    // Sort before pagination
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            _id: 1,
                            product_name: 1,
                            slug: 1,
                            product_id_type: 1,
                            product_description: 1,
                            image_1: 1,
                            image_2: 1,
                            image_3: 1,
                            image_4: 1,
                            image_5: 1,
                            image_6: 1,
                            image_7: 1,
                            main_image: 1,
                            currency: 1,
                            taxCode: 1,
                            taxRate: 1,
                            variant: 1,
                            seller: 1,
                            category: 1,
                            subcategories: 1,
                            childcategories: 1,
                            brand: 1,
                            variants: 1,
                            isProcessing: 1,
                            save_as_draft: 1,
                            createdAt: 1
                        }
                    }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        },
        {
            $addFields: {
                total: { $arrayElemAt: ["$totalCount.count", 0] }
            }
        },
        {
            $project: {
                data: 1,
                total: { $ifNull: ["$total", 0] }
            }
        }

        ]);
        
        const totalPages = Math.ceil(productList[0].total / limit);
        let pagination= {
            totalCount:productList[0].total,
            page,
            pageSize:limit, 
            totalPages:totalPages,
        };

        return responseFun(true, { products:productList[0].data, pagination }, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, error,500)
    }
}

export async function DELETE(request) {
    
    try{ 
        return responseFun(true, "", 200)

    }catch(error){
        console.log(error);
        return responseFun(false, error,500)
    }
}