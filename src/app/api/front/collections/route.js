import { responseFun } from "@/Http/helper";
import { collectionModal } from "@/Http/Models/CollectionModel";


export async function GET(request) {
    
    try{

        const collection = await collectionModal.find({ShowInNav:true})
        .select("_id name slug").sort({name:1})
        return responseFun(true, {collection:collection}, 200)

    }catch(error){
        console.log(error.message);
        return responseFun(false, {error:error.message}, 500)
    }
}

export async function POST(request) {
    
    try{

       
        return responseFun(true, "", 200)

    }catch(error){
        console.log(error.message);
        return responseFun(false, {error:error.message}, 500)
    }
}