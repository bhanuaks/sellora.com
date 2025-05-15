import { responseFun } from "@/Http/helper";
import { Category } from "../../../../../../lib/categoryModel";



export async function GET() {
    


    try{

    const category = await Category.aggregate([
        {
          $match: {
            status: 'Active',
            showList:"Yes"
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
            preserveNullAndEmptyArrays: false
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
                      { $eq: ['$listingStatus', 1] },
                      { $eq: ['$isProcessing', "Approved"] }
                    ]
                  }
                }
              }
            ],
            as: 'variants'
          }
        },
        {
          $match: {
            'variants.0': { $exists: true }
          }
        },

        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            slug: { $first: '$slug' },
            status: { $first: '$status' },
            list_image: { $first: '$list_image' },
            productCount: { $sum: 1 }  
          } 
        },
        {
          $sort: {
            productCount: -1
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


export async function POST(params) {
    return responseFun(false, "", 500)
}