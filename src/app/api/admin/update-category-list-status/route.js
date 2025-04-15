import { responseFun } from "@/Http/helper";
import { Category } from "../../../../../lib/categoryModel";


export async function PUT(request) {
    
    const {checked, id} = await request.json()
    try{
         await Category.findByIdAndUpdate(id, {
            showList:checked?"Yes":"No"
         })
         return responseFun(true, "success", 200)
    }catch(error){
        console.log(error);
        return responseFun(false, "error", 500)
    }
}

export async function Get(request) {
     
    try{
         
         return responseFun(true, "success", 200)
    }catch(error){
        console.log(error);
        return responseFun(false, "error", 500)
    }
}