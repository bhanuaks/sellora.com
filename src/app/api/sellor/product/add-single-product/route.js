import { deleteImageOne, uploadImageFun } from "@/app/api/uploadImage/route";
import { isEmpty, main_large_img_path, main_medium_img_path, main_thumb_img_path, product_large_img_path1, product_large_img_path2, product_large_img_path3, product_large_img_path4, product_medium_img_path1, product_medium_img_path2, product_medium_img_path3, product_medium_img_path4, product_thumb_img_path1, product_thumb_img_path2, product_thumb_img_path3, product_thumb_img_path4, responseFun, slugify, variant_large_img_path1 } from "@/Http/helper";
import { productModel, productOtherDetailModel } from "@/Http/Models/productModel";
import path from 'path'
import { connectDb } from "../../../../../../lib/dbConnect";
import mongoose from "mongoose";
import { checkFilePath, moveFile } from "@/app/api/ckeckFilePath/route";

const errors = {};
const imagePaths = [
    { thumb: product_thumb_img_path1, medium: product_medium_img_path1, large: product_large_img_path1 },
    { thumb: product_thumb_img_path2, medium: product_medium_img_path2, large: product_large_img_path2 },
    { thumb: product_thumb_img_path3, medium: product_medium_img_path3, large: product_large_img_path3 },
    { thumb: product_thumb_img_path4, medium: product_medium_img_path4, large: product_large_img_path4 }
];

const imageSizeMap = { large: 1600, medium: 1100, thumb: 400 }; 

const product_large_img_paths = [product_large_img_path2, product_large_img_path3, product_large_img_path4];
const product_medium_img_paths = [product_medium_img_path2, product_medium_img_path3, product_medium_img_path4];
const product_thumb_img_paths = [product_thumb_img_path2, product_thumb_img_path3, product_thumb_img_path4];
  

async function moveImageIfExists(imageIndex, imageFile) { 
    for (let i = 0; i < product_large_img_paths.length; i++) { 
        const largPath = `public/${product_large_img_paths[i]}`;
        const mediumPath = `public/${product_medium_img_paths[i]}`;
        const thumbPath = `public/${product_thumb_img_paths[i]}`;
        let exisPath = await checkFilePath(largPath, imageFile); 
        if (exisPath) {
            const res= await moveFile(largPath, imageFile, `public/${imagePaths[imageIndex-1].large}`);
            console.log(largPath, imageFile, `public/${imagePaths[imageIndex-1].large}`, imageIndex);
            await moveFile(mediumPath, imageFile, `public/${imagePaths[imageIndex-1].medium}`);
            await moveFile(thumbPath, imageFile, `public/${imagePaths[imageIndex-1].thumb}`);
        }
    }
}


const uploadImages = async (image, index, productName) => {
    const extension = path.extname(image.name);
    const acceptedExtensions = ['.jpg', '.png', '.jpeg', '.webp'];
    if (!acceptedExtensions.includes(extension)) {
        errors[`image_${index}`] = "Image must be jpg, png, jpeg, or webp.";
        return null;
    }
    const filename = `${productName}${index}${Date.now()}.${extension}`;
    
    for (const [sizeType, size] of Object.entries(imageSizeMap)) {
        await uploadImageFun(image, `public/${imagePaths[index - 1][sizeType]}`, filename, size);
    }
    return filename;
};

const deleteOldImages = async (index, existProduct, requestImage) => {
    const oldPath = existProduct?.[`image_${index}`];
    if (!requestImage.includes(oldPath)) { 
        for (const sizeType of Object.keys(imageSizeMap)) {
            await deleteImageOne(`public/${imagePaths[index - 1][sizeType]}${oldPath}`);
        }
    }
};
// upload images
const processImageUpload = async (image, index, existProduct, productName, requestImage) => {
   
    if (image && typeof image !== "string") {
        const newImagePath = await uploadImages(image, index, productName);
        await deleteOldImages(index, existProduct, requestImage);
        return newImagePath;
    } else if (image && image !== "null") {
       
        await moveImageIfExists(index, image)
        // after move delete  old uploaded image
        if (existProduct && existProduct[`image_${index}`] && existProduct[`image_${index}`] != image) {
            await deleteOldImages(index, existProduct, requestImage);
            const oldPath = existProduct[`image_${index}`]
        }
        return image;
    } else if((!image || image == "null") && existProduct[[`image_${index}`]]) {
        console.log({image, index}, existProduct[`image_${index}`]);
        await deleteOldImages(index, existProduct, requestImage);
        return null;
    }
};



export async function POST(request) {

    connectDb()
    const formData = await request.formData();

    const {
        category_id,
        subcategory_id,
        childcategory_id,
        brand_id,

        product_name,
        product_id_type,
        product_description,
        key_feature,
        search_keywords,
        target_gender,
        age_range,
        material,
        model_name,
        model_number,
        manufacture_part_number,
        safety_warning,
        country_of_origin,
        manufacturer_details,
        packer_details,
        importer_details,


        image_1,
        image_2,
        image_3,
        image_4,


        seller_id,
        _id,

        main_image,
        dynamicField,
        keyAttributes,
        taxCode,
        taxRate,
        currency,
        fulfillmentBy,
        shippingProvider,

        packageWeight,
        packageBreadth,
        packageHeight,
        packageLength

    } = Object.fromEntries(formData);


    let key_feature_array = key_feature ? JSON.parse(key_feature) : [];

    const dynamicFields = dynamicField ? JSON.parse(dynamicField) : [];
    const keyAttributesData = keyAttributes ? JSON.parse(keyAttributes) : [];

   

    if (isEmpty(product_name)) errors.product_name = "This field is required";
    if (isEmpty(product_description)) errors.product_description = "This field is required";
    if (isEmpty(search_keywords)) errors.search_keywords = "This field is required";
    if (isEmpty(target_gender)) errors.target_gender = "This field is required";

    // if (isEmpty(taxCode)) errors.taxCode = `Tax Code is required.`;
    // if (isEmpty(taxRate)) errors.taxRate = `Tax Rate is required.`;
    if (isEmpty(currency)) errors.currency = `Currency is required.`;
    if (isEmpty(fulfillmentBy)) errors.fulfillmentBy = `This field is required.`;
    if (isEmpty(shippingProvider)) errors.shippingProvider = `This field is required.`;

    if (key_feature_array.length == 0) {
        errors.key_feature_0 = "This field is required";
    } else {
        key_feature_array.forEach((keyItem, index) => {
            if (isEmpty(keyItem)) errors[`key_feature_${index}`] = "This field is required";
        })
    }

    if (!image_1 || image_1 == "null") {
        errors.image = "minimum 1 image required";
    }

    if (!main_image || main_image == "null") {
        errors.main_image = "Please select main image.";
    }


    // validate dynamicField
    const dynamicFieldData = [];
    if (dynamicFields.length > 0) {
        dynamicFields.forEach((item) => {
            if (isEmpty(item.field_value) && item.required === "Yes") {
                errors[`${item.field_name.toLowerCase().replace(/ /g, '_')}_error`] = `${item.field_name} is required.`;
            }
            const data = {
                field_name: item.field_name,
                field_value: item.field_value || null
            }
            dynamicFieldData.push(data)
        });
    }

    // validate key attribute 
    if (keyAttributesData.length > 0) {
        keyAttributesData.forEach((item, key) => {
            if (isEmpty(item.key_attribute)) {
                errors[`attribute_name_${key}_error`] = "This field is required."
            }
            if (isEmpty(item.key_value)) {
                errors[`attribute_value_${key}_error`] = "This field is required."
            }
        });
    }


    if (Object.keys(errors).length > 0) {
        return responseFun(false, { errors, status_code: 400, dynamicFieldData }, 200)
    }
    let image_1_path = image_1 || null;
    let image_2_path = image_2 || null;
    let image_3_path = image_3 || null;
    let image_4_path = image_4 || null;
    let main_image_path = main_image || null
    let existProduct = null;

    
    
    if (_id) {
        existProduct = await productModel.findById(_id)
    }

    
    //  upload main image
    if (main_image && typeof main_image != "string") {

        if (existProduct && existProduct.main_image) {
            const oldPath = existProduct.main_image
            await deleteImageOne(`${main_large_img_path}${oldPath}`)
            await deleteImageOne(`${main_medium_img_path}${oldPath}`)
            await deleteImageOne(`${main_thumb_img_path}${oldPath}`)
        }
        const extension = path.extname(main_image.name);
        const accepteExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
        if (!accepteExtensions.includes(extension)) {
            errors.main_image = "image must be jpg, png,jpeg."
        }
        const shortenedProductName = product_name.length > 6 ? product_name.slice(0, 6).toString().trim() : product_name.toString().trim();
        const filname_large = `${shortenedProductName}_main_${new Date().toISOString().replace(/[-:.TZ]/g, "")}.${extension}`;
        const filname_medium = `${shortenedProductName}_main_${new Date().toISOString().replace(/[-:.TZ]/g, "")}.${extension}`;
        const filname = `${shortenedProductName}_main_${new Date().toISOString().replace(/[-:.TZ]/g, "")}.${extension}`;
        const uploadingPath = "public/uploads/product/main_image/";
        await uploadImageFun(main_image, `public/${main_large_img_path}`, filname, 1600)
        await uploadImageFun(main_image, `public/${main_medium_img_path}`, filname, 1100)
        await uploadImageFun(main_image, `public/${main_thumb_img_path}`, filname, 400)
        //   await uploadImageFun(main_image, uploadingPath, filname, 1100)
        main_image_path = filname;

        

    } else if (!main_image && existProduct && existProduct.main_image) {
        const oldPath = existProduct.main_image
        await deleteImageOne(oldPath)
    }

    // end upload main image
    const requestImage = [image_1, image_2, image_3, image_4];
    const fileShortenedProductName = product_name.length > 6 ? product_name.slice(0, 6).toString().trim() : product_name.toString().trim();
    image_1_path =await processImageUpload(image_1, 1, existProduct, fileShortenedProductName, requestImage)
    image_2_path =await processImageUpload(image_2, 2, existProduct, fileShortenedProductName, requestImage)
    image_3_path =await processImageUpload(image_3, 3, existProduct, fileShortenedProductName, requestImage)
    image_4_path =await processImageUpload(image_4, 4, existProduct, fileShortenedProductName, requestImage)

    
 
    


  

 
    if (Object.keys(errors).length > 0) {
        return responseFun(false, { errors, status_code: 400 }, 200)
    }

    try {
        let product = null;
        if (_id && _id != "null") {
            product = await productModel.findByIdAndUpdate(_id, {
                seller_id,
                category_id,
                subcategory_id: subcategory_id && subcategory_id != "null" ? subcategory_id : null,
                childcategory_id: childcategory_id && childcategory_id != "null" ? childcategory_id : null,
                brand_id: brand_id ? brand_id : null,
                slug: slugify(product_name),
                product_name,
                product_id_type,
                product_description,
                key_feature: key_feature_array,
                search_keywords,
                target_gender,
                age_range,
                material,
                model_name,
                model_number,
                manufacture_part_number,
                safety_warning,
                country_of_origin,
                manufacturer_details,
                packer_details,
                importer_details,
                image_1: image_1_path,
                image_2: image_2_path,
                image_3: image_3_path,
                image_4: image_4_path,
                main_image: main_image_path,
                dynamicFields: dynamicFieldData,
                keyAttributes: keyAttributesData,

                currency,
                taxCode,
                taxRate,
                fulfillmentBy,
                shippingProvider,

                packageWeight,
                packageBreadth,
                packageHeight,
                packageLength
            })


        } else {
            product = await productModel.create({
                seller_id,
                category_id,
                subcategory_id: subcategory_id && subcategory_id != "null" ? subcategory_id : null,
                childcategory_id: childcategory_id && childcategory_id != "null" ? childcategory_id : null,
                brand_id: brand_id ? brand_id : null,
                slug: slugify(product_name),
                product_name,
                product_id_type,
                product_description,
                key_feature: key_feature_array,
                search_keywords,
                target_gender,
                age_range,
                material,
                model_name,
                model_number,
                manufacture_part_number,
                safety_warning,
                country_of_origin,
                manufacturer_details,
                packer_details,
                importer_details,
                image_1: image_1_path,
                image_2: image_2_path,
                image_3: image_3_path,
                image_4: image_4_path,
                main_image: main_image_path,
                dynamicFields: dynamicFieldData,
                keyAttributes: keyAttributesData,

                currency,
                taxCode,
                taxRate,
                fulfillmentBy,
                shippingProvider,

                packageWeight,
                packageBreadth,
                packageHeight,
                packageLength


            })
        }




        return responseFun(true, { data: product }, 200)

    } catch (error) {
        console.log(error);
        return responseFun(false, { data: error }, 200)
    }
}