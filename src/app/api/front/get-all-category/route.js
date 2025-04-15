import { responseFun } from "@/Http/helper";
import { Category } from "../../../../../lib/categoryModel";





export async function GET() {
    
    
    try{
        
        let query = {
            status:"Active"
        }
       // const category = await Category.find(query);
       
       const category = await Category.aggregate([
        
        {
          $match: { 
            status: 'Active', 
           // list_image: { $ne: '' || null }  

          }
          
        },
        
        
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'category_id',
            as: 'products'
          }
        },
        
        {
          $unwind: {
            path: '$products',
            preserveNullAndEmptyArrays: false // only categories with products
          }
        },
        
        {
          $lookup: {
            from: 'productvariants',
            let: { productId: '$products._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$product_id', '$$productId'] },
                      { $eq: ['$listingStatus', 1] }
                    ]
                  }
                }
              }
            ],
            as: 'products.variants'
          }
        },
        
        {
          $match: {
            'products.variants.0': { $exists: true }
          }
        },
        
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            slug: { $first: '$slug' },
            status: { $first: '$status' },
            list_image: { $first: '$list_image' },
            //products: { $push: '$products' },
            productCount: { $sum: 1 } // only products with at least one valid variant
          }
        }
      ]);
      
             

        return responseFun(true, {
            category, 
            
        }, 200)

    }catch(error){
        
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}