import { connectDb } from '../../../../../../lib/dbConnect';
import { brandModel, brandSellerModel } from '@/Http/Models/branModel';


export async function GET(req) {
    try {
        await connectDb();

        const url = new URL(req.url);
        const brandModule = url.searchParams.get('brand_module');
        const query = brandModule ? { status: parseInt(brandModule) } : {};
 

            const brandList =  await brandSellerModel.aggregate([
              {
                $match: query
              },
              {
                $lookup: {
                  from: "sellers",
                  localField: "seller_id",
                  foreignField: "_id",
                  as: "seller_id"
                }
              },
              {
                $unwind: {
                  path: "$seller_id",
                  preserveNullAndEmptyArrays: false  
                }
              },
              {
                $sort: {
                  name: 1
                }
              }
                ]) 

        const brandNameList = await brandSellerModel.find(query).select('name').sort({
          name: 1
        });

            return new Response(
                JSON.stringify({
                    success : true,
                    data    : brandList,
                    brandNameList:brandNameList
                }),
                { status: 200 }
              );

    }catch(error){
        console.error('Error fetching brand brand:', error);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Error fetching brand',
            error: error.message,
          }),
          { status: 500 }
        );
    }
}