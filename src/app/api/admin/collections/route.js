import { isEmpty, responseFun, slugify } from "@/Http/helper";
import { collectionModal } from "@/Http/Models/CollectionModel";
import { productModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";


export async function POST(request) {
    const {_id, name, productIds} = await request.json();
     
    const errors = {};
    if(isEmpty(name))errors.name = "Collection name is required";
    if(!productIds || productIds.length <= 0)errors.productIds = "Please select atleast one products";

    if(Object.keys(errors).length > 0){
        return responseFun(false, {errors, status_code:400}, 200)
    }

    try{

        const exists = await collectionModal.findOne({
            name:name,
            ...(_id && { _id: { $ne: _id } } )
        });

        if(exists){
            errors.name = "This collection has already created.";
            return responseFun(false, {errors, status_code:400}, 200)
        } 

        
          if(_id){
                await collectionModal.findByIdAndUpdate(_id, {
                    name,
                    slug:slugify(name),
                    productIds
                })
            }else{
                await collectionModal.create({
                    name,
                    slug:slugify(name),
                    productIds
                })
            }

        return responseFun(true, `Collection ${_id?"Updated":"Created"} successfully`, 200);

    }catch(error){
        console.log(error);
        return responseFun(false, error.message, 500);
    }
}


export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const _id  = searchParams.get("_id")
    if(!_id){
        return responseFun(false, "Collection id not found", 400)
    }
    try{
        const collection = await collectionModal.findById(_id)
        const products = await getProductsFromCollection(collection);

        return responseFun(true, {collection, products}, 200)

    }catch(error){
        return responseFun(false, error.message, 500)
    }
}

async function getProductsFromCollection(collection) {
    if (!collection?.productIds?.length) return [];
    const objectIds = collection.productIds.map(id => new mongoose.Types.ObjectId(id));
    console.log(objectIds);
    const products = await productModel.find({
        _id: { $in: objectIds }
    }).select("_id product_name main_image"); 
    return products;
}



export async function PUT(request) {

    const { checked, id } = await request.json(); 
        try{
                await collectionModal.findByIdAndUpdate(id, {
                    ShowInNav:checked?true:false
                })

                return responseFun(true, "success", 200)
        }catch(error){
            console.log(error);
            return responseFun(false, "error", 500)
        }
   
}