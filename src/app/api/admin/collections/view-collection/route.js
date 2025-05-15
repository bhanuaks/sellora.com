import { responseFun } from "@/Http/helper";
import { collectionModal } from "@/Http/Models/CollectionModel";


export async function GET(request) {
    
    try{  
        const collectionList = await collectionModal.find().sort({createdAt:-1})
        return responseFun(true, {list:collectionList}, 200) 

    }catch(error){
        console.log(error);
        return responseFun(false, error.message, 500)
    }
}


export async function DELETE(request) {
    
    const { _id } = await request.json();
    try{  
        const collectionList = await collectionModal.findByIdAndDelete(_id)
        return responseFun(true, "Deleted Successfully", 200)  
    }catch(error){
        console.log(error);
        return responseFun(false, error.message, 500)
    }
}