import { connectDb } from '../../../../../../lib/dbConnect';
import { sellerModel, sellorBusinessAndBeneficiaryAddressModel } from '@/Http/Models/sellerModel';

export async function GET(req) {
  try {
    await connectDb();
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const limit = parseInt(queryParams.limit, 10) || 10; 
    const page = parseInt(queryParams.page, 10) || 1;

    const filter = {};
    if (queryParams.approval_status) filter.approvalStatus = queryParams.approval_status;
    if (queryParams.seller_name) filter._id = queryParams.seller_name;

    if (queryParams.from_date && queryParams.to_date) {
      filter.createdAt = {
        $gte: new Date(queryParams.from_date),
        $lte: new Date(queryParams.to_date),
      };
    }else if (queryParams.from_date ) {
      filter.createdAt = {
        $gte: new Date(queryParams.from_date), 
      };
    }

    const data = await sellerModel
      .find(filter)
      .sort({ createdAt: -1 })
      // .skip((page - 1) * limit)
      // .limit(limit) 
      .select('+show_password');
    
        const sellerBusiness = await Promise.all(
            data.map(async (sellerItem)=>{
                const sellerBusinessData = await sellorBusinessAndBeneficiaryAddressModel.find({seller_id:sellerItem._id})  
                return {
                    ...sellerItem.toObject(), 
                    sellerBusinessData: sellerBusinessData,  
                };
            }) 
        ) 
        
        const totalRecords = await sellerModel.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        const sellerName = await sellerModel
        .find({ status: 'Active' }) 
        .select('name')
        .sort({ name: 1 }).lean();;

    return new Response(
        JSON.stringify({ 
            success: true,
            data : sellerBusiness, 
            totalRecords,
            totalPages,
            sellerName,
            message: 'Seller fetch successfully'
         }),
        { status: 200 }
      );
  }catch(error){
    console.error('Error in POST request:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


export async function POST(req) {
  try{
    const { vendorType, sellerId, status, remarks, approvalStatus } = await req.json();

    if(vendorType==='vendorApproval'){

      const updatedSeller = await sellerModel.findByIdAndUpdate(
        sellerId,
        { 
          approvalStatus: approvalStatus,
          remarks: remarks,
          approvalDate: new Date(),
        },
        { new: true }
      );

    }
    if(vendorType === 'vendorStatus'){
       const updatedSeller = await sellerModel.findByIdAndUpdate(
        sellerId,
        { status: status },
        { new: true }
      );

    }
   
    return new Response(
      JSON.stringify({ message: 'Successfully updated', success: true }),
      {
      success: true,
      message: `Seller status has been updated.`,
      data: '',
    });

  }catch(error){
    console.error('Error in POST request:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}