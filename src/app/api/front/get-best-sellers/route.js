import { responseFun } from "@/Http/helper";
import { productModel } from "@/Http/Models/productModel";




export async function GET() {
    
    
    try{
        
        
        const products = await productModel.aggregate([
            // Step 1: Lookup subcategory
            {
              $match: {
                save_as_draft: '0'
              }
            },
            {
              $lookup: {
                from: 'subcategories',
                localField: 'subcategory_id',
                foreignField: '_id',
                as: 'subcategory'
              }
            },
            { $unwind: '$subcategory' },
          
            // Step 2: Lookup category
            {
                $lookup: {
                    from: 'categories',
                    let: { categoryId: '$subcategory.category_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ['$_id', '$$categoryId'] },
                              { $eq: ['$showList', 'Yes'] }
                              
                            ]
                          }
                        }
                      }
                    ],
                    as: 'category'
                  }
                },
                { $unwind: '$category' },
          
            // Step 3: Lookup product variants with listingStatus = 1
            {
              $lookup: {
                from: 'productvariants',
                let: { productId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ['$product_id', '$$productId'] },
                          { $eq: ['$listingStatus', 1] },
                          { $eq: ["$isProcessing", 'Approved'] }
                        ]
                      }
                    }
                  },
                  {
                    $sort: { consumerSalePrice: 1 } // ascending order
                  }
                ],
                as: 'variants'
              }
            },
          
            // Step 4: Only include products that have at least one active variant
            {
              $match: {
                'variants.0': { $exists: true }
              }
            },
          
            // Step 5: Group products under subcategories
            {
              $group: {
                _id: {
                  categoryId: '$category._id',
                  categoryName: '$category.name',
                  subcategoryId: '$subcategory._id',
                  categorySlug:   '$category.slug',
                  subcategorySlug:'$subcategory.slug',
                  subcategoryName: '$subcategory.subCategoryName'
                },
                products: {
                  $push: {
                    productId: '$_id',
                    name: '$product_name',
                    main_image:'$main_image',
                    slug:'$slug',
                    variants: '$variants'
                  }
                }
              }
            },
          
            // Step 6: Slice products to limit 4 per subcategory
            {
              $project: {
                _id: 0,
                categoryId: '$_id.categoryId',
                categoryName: '$_id.categoryName',
                categorySlug: '$_id.categorySlug',
                subcategoryId: '$_id.subcategoryId',
                subcategoryName: '$_id.subcategoryName',
                subcategorySlug: '$_id.subcategorySlug',
                products: { $slice: ['$products', 4] }
              }
            },
          
            // Step 7: Group subcategories under categories
            {
              $group: {
                _id: {
                  categoryId: '$categoryId',
                  categoryName: '$categoryName',
                  categorySlug: '$categorySlug'
                },
                subcategories: {
                  $push: {
                    subcategoryId: '$subcategoryId',
                    subcategoryName: '$subcategoryName',
                    slug:'$subcategorySlug',
                    products: '$products'
                  }
                }
              }
            },
          
            // Step 8: Slice subcategories to limit 4 per category
            {
              $project: {
                _id: 0,
                categoryId: '$_id.categoryId',
                categoryName: '$_id.categoryName',
                categorySlug:'$_id.categorySlug',
                subcategories: { $slice: ['$subcategories', 4] }
              }
            }
          ]);
          
          
          
             

        return responseFun(true, {
            products, 
            
        }, 200)

    }catch(error){
        
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}