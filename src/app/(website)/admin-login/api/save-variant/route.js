import { capitalizeLetter, isEmpty, responseFun } from "@/Http/helper";
import { variantModel } from "@/Http/Models/VarinatModel";
import { connectDb } from "../../../../../../lib/dbConnect";

await connectDb();
export async function POST(request) { 

    const {_id, variant_name, select_value, status }= await request.json();

    const errors = {};
    if(isEmpty(variant_name))errors.variant_name = "Variant name is required."
    // if(!select_value || select_value.length==0){
    //     errors.select_value = "Variant value is required."
    // }
    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:400}, 200)
    }

    try{

        const checkQuery = {
            variant_name: capitalizeLetter(variant_name)
        }; 
        if (_id) {
            checkQuery._id = { $ne: _id };
        }
        
                const checkVariantExist  = await variantModel.findOne(checkQuery)
                
                if(checkVariantExist){
                    errors.variant_name = "This variant already exists in database."
                    return responseFun(false, {errors, status_code:400}, 200)
                }
            if(_id){
                const variant = await variantModel.findByIdAndUpdate(_id, {
                    variant_name:capitalizeLetter(variant_name), 
                    select_value: select_value || [],
                    status
                })
                const variantList = await getValiantList()
                return responseFun(true, {message:"Variant has been updated successfully.", list:variantList}, 201)
            }else{

                const variant = await variantModel.create({
                    variant_name:capitalizeLetter(variant_name),
                    select_value: select_value || [],
                    status
                })
                const variantList = await getValiantList()
                return responseFun(true, {message:"Variant has been Added successfully.", list:variantList}, 201)
            }
        return responseFun(true, {message:"Success"}, 201)
    }catch(error){
        console.log(error);
        return responseFun(false,{error}, 200)
    }
}


export async function GET(request) {
    const list = await getValiantList();
    return responseFun(true, {list}, 200)
}


export async function DELETE(request) {
    const { _id } = await request.json()
    try{
        const deletedVariant = await variantModel.findByIdAndDelete(_id);
        return responseFun(true, {message:"Varinat has been deleted seccessfully. "}, 200) 
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
    
   
}


async function getValiantList() {
    
    try{
        const list = await variantModel.find().sort({createdAt:-1}).lean();
        return list;
    }catch(error){
        console.log(error);
        return []
    }
}

