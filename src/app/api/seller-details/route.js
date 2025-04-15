import { responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const seller_id = searchParams.get('seller_id')

    try{
        const seller = await sellerModel.findById(seller_id)
        return responseFun(true, {seller}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, error, 200)
    }
}


export async function POST(request) {
    
    return responseFun(true, "", 200)
}