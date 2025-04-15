import { isEmpty, rand, responseFun, slugify } from "@/Http/helper";
import path from 'path'
import { uploadImageFun } from "../../uploadImage/route";
import { brandCountModel, brandModel } from "@/Http/Models/branModel";

export async function POST(request) {
    const formData = await request.formData();

    const {
        name,
        certificate_name,
        certificate,
        brand_owner,
        are_you_selling_in_other_platform,
        platform_name,
        platform_link,
        tm_number,
        tm_status,
        tm_class,
        tm_type,
        seller_id
    } = Object.fromEntries(formData);


    const errors = {}

    if(isEmpty(name))errors.name = "brand name is required"
    if(isEmpty(certificate_name))errors.certificate_name = "please select certficate name"
    if(!certificate){
        errors.certificate = "please select certficate file"
    }
    if(brand_owner=="Yes"){
        if(isEmpty(tm_number))errors.tm_number = "tm number is required"
        if(isEmpty(tm_status))errors.tm_status = "tm status is required"
        if(isEmpty(tm_class))errors.tm_class = "tm class is required"
        if(isEmpty(tm_type))errors.tm_type = "tm type is required" 
    }
    if(are_you_selling_in_other_platform=="Yes"){
        if(isEmpty(platform_name))errors.platform_name = "platform_name is required"
        if(isEmpty(platform_link))errors.platform_link = "platform link is required" 
    }

    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403}, 200) 
    }

    try{
        let certificate_path = ""; 
        if(certificate && typeof certificate != "string"){
            const extension = path.extname(certificate.name)
            const accepteExtensions = ['.jpg','.png','jpeg']; 
            if(!accepteExtensions.includes(extension)){
                errors.certificate = "certificate must be jpg, png,jpeg." 
              }
            const filename = `certificate-${rand(11111, 99999999)}${extension}`;
            const uploadingPath =  "public/uploads/brand/"; 
            await uploadImageFun(certificate, uploadingPath, filename, 1400)
            certificate_path =`uploads/brand/${filename}`
        }
            const existBrand = await brandModel.findOne({name:name});
            if(existBrand){
                errors.name = "this brand already exists" 
            }
            if(Object.keys(errors).length>0){
                return responseFun(false, {errors, status_code:403}, 200)
            }
            const requestId = await getRequestId()
            const addBrandRes = await brandModel.create({
                request_id:requestId,
                seller_id,
                name,
                slug:slugify(name),
                certificate_name,
                certificate:certificate_path,
                brand_owner,
                are_you_selling_in_other_platform,
                platform_name,
                platform_link,
                tm_number,
                tm_status,
                tm_class,
                tm_type
            })
            return responseFun(true, {message:"Brand has been sent for approval"}, 200)
    }catch(error){
         console.log(error);
                return responseFun(false, {error}, 200)
    }

}

export async function getRequestId(){
    const lastBrandId = await brandCountModel.findOneAndUpdate(
        {id:"1"},
        {$inc: {counter:1}},
        {returnDocument: 'after', upsert:'true'} //create new record if not exists
    )
    return lastBrandId.counter;
}