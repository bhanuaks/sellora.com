import { responseFun } from "@/Http/helper";
import { productModel } from "@/Http/Models/productModel"; 
import mongoose from "mongoose";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("searchText") || "";
    const seller_id = searchParams.get("seller_id") || "";
    if(!searchText){
        return responseFun(true, {products:[]}, 200) 
    }
    try{
        const query = { save_as_draft: "0" }; 
        if (searchText && searchText.trim() !== "") {
            query.product_name = { $regex: searchText.trim(), $options: "i" };
        }
        if(seller_id && seller_id.trim() !== ""){
            query.seller_id = new mongoose.Types.ObjectId(seller_id)
        }
        const products = await productModel.find(query)
        .select("_id product_name main_image");
        return responseFun(true, {products}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, error.message, 500)
    }
}