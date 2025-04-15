    import { decodeJwt, isEmpty, rand, responseFun } from "@/Http/helper";
    import { ProductReviewModal } from "@/Http/Models/ProductReview";
    import { cookies } from "next/headers"; 
import { productModel } from "@/Http/Models/productModel";
import { ProductQuestionModal } from "@/Http/Models/productQuestion";


    export async function POST(request) {
        
        const { question, product_id } = await request.json();
        const cookieStore = cookies();
        const userToken = cookieStore.get("userAuthToken")?.value;
        if(!userToken){
            return responseFun(false,{message:"user Token not fount", status_code:402}, 401)
        }
        const user = decodeJwt(userToken)?.user;
        if(!user){
            return responseFun(false,{message:"user not fount", status_code:402}, 401)
        } 
        
        const errors = {};
        if(isEmpty(question))errors.question = "question is required.";
        if(isEmpty(product_id))errors.pruduct_id = "pruduct_id is required."; 
        
        if(Object.keys(errors).length > 0){
            return responseFun(false,{errors, status_code:403}, 200)
        }
        try{ 
            
            const questionRes = await ProductQuestionModal.create({
                user_id:user._id,
                product_id: product_id, 
                question, 
            });

            return responseFun(true, questionRes, 200)
        }catch(error){
            console.log(error);
            return responseFun(false,"error", 500)
        }
    }



export async function GET(request) {
    
    const searchParams = new URL(request.url).searchParams; 
    const slug = searchParams.get("slug")  
    try{
        const product = await productModel.findOne({
            slug:slug
        })
        .select("_id seller_id product_name main_image");
        return responseFun(true, {product}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, "something went wrong", 500)
    }
}