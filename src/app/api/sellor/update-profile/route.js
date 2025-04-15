import { encryptText, isEmpty, rand, responseFun } from "@/Http/helper"
import { sellerModel, sellerPickupAddressModel, sellerReturnAddressModel, sellorAccountInformationModel, sellorBusinessAndBeneficiaryAddressModel, sellorCardInformationModel, sellorSettingModel } from "@/Http/Models/sellerModel"
import { connectDb } from "../../../../../lib/dbConnect"
 import path from "path";
import mongoose from "mongoose";
import { uploadImageFun } from "../../uploadImage/route";
import { sellerTaxInformationModel } from "@/Http/Models/sellerTaxInformation";



export async function POST(request) {
    await connectDb();
    const { searchParams } = new URL(request.url)
    const update = searchParams.get('update')
    switch(update){
        case "contact_details":
        return await updateContactDetails(request)
        break
        case "display_information":
        return await updateDisplayInformation(request)
        break
        case "pickUpAddress":
        return await updatePickAddress(request)
        break
        case "returnAddress":
        return await updatereturnAddress(request)
        break
        case "businessDetails":
        return await updateBusinessDetails(request)
        break
        case "taxInformation":
        return await updateTaxInformation(request)
        break
        case "shippingSetting":
        return await updateShippingSetting(request)
        break
        case "bankDetails":
        return await updateBankDetails(request)
        break
        case "cardDetails":
        return await updateCardDetails(request)
        break
        default:
         return responseFun(true, {update},200)  
    }
    // if(update=="contact_details"){ 
    //    return await updateContactDetails(request)
    // }
    return responseFun(true, {update},200)
}


async function updateContactDetails(request){
    const {_id, name, email, mobile} = await request.json();
    
    try{

        const seller = await sellerModel.findById(_id).select('complete_step'); 
        const complete_step = seller?.complete_step;
        const sellerUpdate = await sellerModel.findByIdAndUpdate(_id,{
            name, 
            complete_step: !complete_step || complete_step < 1?1:complete_step
        })

        return responseFun(true, {message:"Updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
    
}

async function updateDisplayInformation(request){
    const {_id, display_name, business_description} = await request.json();
    
    const errors = {};

    if(isEmpty(display_name))errors.display_name = "display name is required";
    if(isEmpty(business_description))errors.business_description = "business description is required"; 

    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403}, 200)
    }

    try{
        const seller = await sellerModel.findById(_id).select('complete_step'); 
        const complete_step = seller?.complete_step;

        const sellerUpdate = await sellerModel.findByIdAndUpdate(_id,{
            display_name,
            business_description,
            complete_step: !complete_step || complete_step < 2?2:complete_step
        })
        return responseFun(true, {message:"Updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
    
}

async function updatePickAddress(request) {
    const {_id, display_name, business_description, address} = await request.json();
    // console.log(_id, display_name, business_description, address);

    const errors = {};

    if(isEmpty(_id))errors._id = "Seller id is required";
    if(isEmpty(address.name))errors.name = "name is required";
    if(isEmpty(address.address_line_1))errors.address_line_1 = "address_line_1 is required";
    if(isEmpty(address.city))errors.city = "city is required";
    if(isEmpty(address.country))errors.country = "country is required";
    if(isEmpty(address.mobile))errors.mobile = "mobile is required"; 

    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403}, 200)
    }


    try{
        const exists =  await sellerPickupAddressModel.findById(address._id)
        // update seller complete status
        const seller = await sellerModel.findById(_id).select('complete_step'); 
        const complete_step = seller?.complete_step;
        const sellerUpdate = await sellerModel.findByIdAndUpdate(_id,{ 
            complete_step: !complete_step || complete_step < 3?3:complete_step
        })

        if(exists){
        const pickUpAddress = await sellerPickupAddressModel.findByIdAndUpdate(address._id,{ 
                    seller_id:_id, 
                    name:address.name,
                    address_line_1:address.address_line_1,
                    address_line_2:address.address_line_2,
                    city:address.city,
                    state:address.state,
                    zip_code:address.zip_code,
                    country:address.country,
                    country_s_name:address.country_s_name,
                    mobile_code:address.mobile_code,
                    mobile:address.mobile,
                })
        }else{
            const pickUpAddress = await sellerPickupAddressModel.create({ 
                seller_id:_id,
                name:address.name,
                address_line_1:address.address_line_1,
                address_line_2:address.address_line_2,
                city:address.city,
                state:address.state,
                zip_code:address.zip_code,
                country:address.country,
                country_s_name:address.country_s_name,
                mobile_code:address.mobile_code,
                mobile:address.mobile,
            })
        }
        return responseFun(true, {message:"Pickup Address Updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    } 
}



async function updatereturnAddress(request) {
    const {_id, display_name, business_description, address} = await request.json();
    // console.log(_id, display_name, business_description, address);

    const errors = {};

    if(isEmpty(_id))errors._id = "Seller id is required";
    if(isEmpty(address.name))errors.name = "name is required";
    if(isEmpty(address.address_line_1))errors.address_line_1 = "address_line_1 is required";
    if(isEmpty(address.city))errors.city = "city is required";
    if(isEmpty(address.country))errors.country = "country is required";
    if(isEmpty(address.mobile))errors.mobile = "mobile is required"; 

    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403}, 200)
    }


    try{
        const exists =  await sellerReturnAddressModel.findById(address._id)
        // update sellor complete status
        const seller = await sellerModel.findById(_id).select('complete_step'); 
        const complete_step = seller?.complete_step;
        const sellerUpdate = await sellerModel.findByIdAndUpdate(_id,{ 
            complete_step: !complete_step || complete_step < 4?4:complete_step
        })
        if(exists){
            const pickUpAddress = await sellerReturnAddressModel.findByIdAndUpdate(address._id,{ 
                seller_id:_id,
                name:address.name,
                address_line_1:address.address_line_1,
                address_line_2:address.address_line_2,
                city:address.city,
                state:address.state,
                zip_code:address.zip_code,
                country:address.country,
                country_s_name:address.country_s_name,
                mobile_code:address.mobile_code,
                mobile:address.mobile,
            })
        }else{
            const pickUpAddress = await sellerReturnAddressModel.create({ 
                seller_id:_id,
                name:address.name,
                address_line_1:address.address_line_1,
                address_line_2:address.address_line_2,
                city:address.city,
                state:address.state,
                zip_code:address.zip_code,
                country:address.country,
                country_s_name:address.country_s_name,
                mobile_code:address.mobile_code,
                mobile:address.mobile,
            })
        }
       
        return responseFun(true, {message:"Return Address Updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    } 
}


async function updateBusinessDetails(request) { 

    const formData = await request.formData();
    const {
        _id,
        seller_id,
        country_s_name,
        mobile_code,
        mobile,
        business_name,
        business_address,
        city,
        state,
        zip_code,
        country,
        are_you_beneficial_for_business,
        are_you_business_representative,
        beneficiary_first_name,
        beneficiary_last_name,
        beneficiary_date_of_birth,
        beneficiary_nationality,
        proof_of_identification,
        identification_proof_file,
        beneficiary_address,
        beneficiary_city,
        beneficiary_state,
        beneficiary_zip_code,
        beneficiary_country,
        proof_of_address,
        proof_of_address_file,
        beneficial_designation,
        representative_designation

    } = Object.fromEntries(formData);

    const errors ={};

    if(isEmpty(mobile))errors.mobile = "Mobile number is required.";
    if(isEmpty(country))errors.country = "country is required.";
    if(isEmpty(business_name))errors.business_name = "business_name is required.";
    if(isEmpty(business_address))errors.business_address = "business_address is required.";
    if(isEmpty(city))errors.city = "city is required.";
    if(isEmpty(state))errors.state = "state is required.";
    if(isEmpty(zip_code))errors.zip_code = "zip_code is required.";
    if(isEmpty(country))errors.country = "country is required.";
    if(isEmpty(beneficiary_first_name))errors.beneficiary_first_name = "first name  is required.";
    if(isEmpty(beneficiary_last_name))errors.beneficiary_last_name = "last name is required.";
    if(isEmpty(beneficiary_date_of_birth))errors.beneficiary_date_of_birth = "date of birth is required.";
    if(isEmpty(beneficiary_nationality))errors.beneficiary_nationality = "nationality is required.";
    if(isEmpty(proof_of_identification))errors.proof_of_identification = "identification is required.";
    if(isEmpty(beneficiary_address))errors.beneficiary_address = "address is required.";
    if(isEmpty(beneficiary_city))errors.beneficiary_city = "city is required.";
    if(isEmpty(beneficiary_state))errors.beneficiary_state = "state is required.";
    if(isEmpty(beneficiary_zip_code))errors.beneficiary_zip_code = "zipcode is required.";
    if(isEmpty(beneficiary_country))errors.beneficiary_country = "country is required.";
    if(isEmpty(proof_of_address))errors.proof_of_address = "address is required.";

     
    if(are_you_business_representative =="Yes"){
        if(isEmpty(representative_designation))errors.representative_designation = "designation is required."; 
    }
    if(are_you_beneficial_for_business =="Yes"){
        if(isEmpty(beneficial_designation))errors.beneficial_designation = "designation is required."; 
    }

    if(!identification_proof_file)errors.identification_proof_file = "this field is required.";
    if(!proof_of_address_file)errors.proof_of_address_file = "this field is required.";

    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403}, 200)
    }

    try{

         // update sellor complete status
         const seller = await sellerModel.findById(seller_id).select('complete_step'); 
         const complete_step = seller?.complete_step;
         const sellerUpdate = await sellerModel.findByIdAndUpdate(seller_id,{ 
             complete_step: !complete_step || complete_step < 5?5:complete_step
         })

        const exists = await sellorBusinessAndBeneficiaryAddressModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}) 
        
        let identification_proof_file_path = "";
        let proof_of_address_file_path = "";
        // upload file 1
        if (identification_proof_file  && typeof identification_proof_file !== 'string') { 
            const extension = path.extname(identification_proof_file.name);   
            const extensions = ['.jpg','.png','.jpeg', '.pdf']; 
            if(!extensions.includes(extension)){
                errors.identification_proof_file = "Please select valid image."
                
              }

              const fileName = identification_proof_file.name
              const sanitizedFileName = fileName.length > 6 
                ? fileName.slice(0, 6).replace(/\s/g, '-') 
                : fileName.replace(/\s/g, '-');

            const filename = `${sanitizedFileName}${Date.now()}${extension}`;  
            const uploadingPath =  "public/uploads/beneficiary_identity/"; 
            await uploadImageFun(identification_proof_file, uploadingPath, filename,1400);
            identification_proof_file_path =`uploads/beneficiary_identity/${filename}`
        }else if(exists){
            identification_proof_file_path = exists.identification_proof_file
        }

          // upload file 2
        if (proof_of_address_file  && typeof proof_of_address_file !== 'string') { 
            const extension = path.extname(proof_of_address_file.name);   
            const extensions = ['.jpg','.png','.jpeg', '.pdf'];   
            if(!extensions.includes(extension)){
                errors.proof_of_address_file = "Please select valid image."
              }
              const fileName = proof_of_address_file.name
              const sanitizedFileName = fileName.length > 6 
                ? fileName.slice(0, 6).replace(/\s/g, '-') 
                : fileName.replace(/\s/g, '-');

            const filename = `${sanitizedFileName}${Date.now()}${extension}`; 
            const uploadingPath =  "public/uploads/beneficiary_address/"; 
            await uploadImageFun(proof_of_address_file, uploadingPath, filename,1400); 
            proof_of_address_file_path =`uploads/beneficiary_address/${filename}` 
        }else if(exists){
            proof_of_address_file_path = exists.proof_of_address_file
        }
        
        // if image error then return 
        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:403}, 200)
        }

        if(exists){ 

            const businessDetails = await sellorBusinessAndBeneficiaryAddressModel.findByIdAndUpdate(_id,{
                seller_id,
                country_s_name,
                mobile_code,
                mobile,
                business_name,
                business_address,
                city,
                state,
                zip_code,
                country,
                are_you_beneficial_for_business,
                are_you_business_representative,
                beneficiary_first_name,
                beneficiary_last_name,
                beneficiary_date_of_birth,
                beneficiary_nationality,
                proof_of_identification,
                identification_proof_file:identification_proof_file_path,
                beneficiary_address,
                beneficiary_city,
                beneficiary_state,
                beneficiary_zip_code,
                beneficiary_country,
                proof_of_address,
                proof_of_address_file:proof_of_address_file_path,
                representative_designation:are_you_business_representative =="Yes"?representative_designation:'',
                beneficial_designation:are_you_beneficial_for_business =="Yes"?beneficial_designation:'',
            })

        }else{

            const businessDetails = await sellorBusinessAndBeneficiaryAddressModel.create({
                seller_id,
                country_s_name,
                mobile_code,
                mobile,
                business_name,
                business_address,
                city,
                state,
                zip_code,
                country,
                are_you_beneficial_for_business,
                are_you_business_representative,
                beneficiary_first_name,
                beneficiary_last_name,
                beneficiary_date_of_birth,
                beneficiary_nationality,
                proof_of_identification,
                identification_proof_file:identification_proof_file_path,
                beneficiary_address,
                beneficiary_city,
                beneficiary_state,
                beneficiary_zip_code,
                beneficiary_country,
                proof_of_address,
                proof_of_address_file:proof_of_address_file_path
            })

        }
        return responseFun(true, {message:"Business Details updated"}, 200)

       
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
 }



 
async function updateTaxInformation(request) { 

    const formData = await request.formData();
    const {
        _id,
        seller_id,
        tax_classication,
        u_s_resident,
        federal_tax_classication,
        llc_type,
        full_name,
        trade_name,
        tin_number,
        image,
        country,
        address_line_1,
        city,
        address_line_2,
        state,    
        zip_code,
        employer_identification_number,

    } = Object.fromEntries(formData);

    const errors ={};

    if(u_s_resident=="Yes"){

        if(isEmpty(federal_tax_classication))errors.federal_tax_classication = "federal tax classication is required.";
        if(isEmpty(llc_type))errors.llc_type = "llc type is required.";
        if(isEmpty(full_name))errors.full_name = "full name is required.";
        // if(isEmpty(trade_name))errors.trade_name = "trade name is required.";
        if(isEmpty(tin_number))errors.tin_number = "tin number is required.";
        if(isEmpty(country))errors.country = "country is required.";
        if(isEmpty(address_line_1))errors.address_line_1 = "address is required.";
        if(isEmpty(city))errors.city = "city is required.";
        if(isEmpty(state))errors.state = "state is required.";
        if(isEmpty(zip_code))errors.zip_code = "zip_code is required."; 
        if(!image){
                errors.image = "image is required.";  
        }


    }
    
     

    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403}, 200)
    }

    try{

         // update sellor complete status
         const seller = await sellerModel.findById(seller_id).select('complete_step'); 
         const complete_step = seller?.complete_step;
         const sellerUpdate = await sellerModel.findByIdAndUpdate(seller_id,{ 
             complete_step: !complete_step || complete_step < 6?6:complete_step
         })

        const exists = await sellerTaxInformationModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}) 
        
        let image_path = ""; 
        // upload file 1
        if (image && typeof image  != "string") { 
            const extension = path.extname(image.name);   
            const extensions = ['.jpg','.png','.jpeg', '.pdf']; 
            if(!extensions.includes(extension)){
                errors.image = "Please select valid image." 
              }
              const fileName = image.name
              const sanitizedFileName = fileName.length > 6 
                ? fileName.slice(0, 6).replace(/\s/g, '-') 
                : fileName.replace(/\s/g, '-'); 
            const filename = `${sanitizedFileName}${Date.now()}${extension}`;  
            const uploadingPath =  "public/uploads/tax_proof/"; 
            await uploadImageFun(image, uploadingPath, filename,1400);
            image_path =`uploads/tax_proof/${filename}`
        }else if(exists){
            image_path = exists.image
        }

          
        
        
        // if image error then return 
        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:403}, 200)
        }

        if(exists){ 

            const businessDetails = await sellerTaxInformationModel.findByIdAndUpdate(_id,{
                seller_id,
                tax_classication,
                u_s_resident,
                federal_tax_classication,
                llc_type,
                full_name,
                trade_name,
                tin_number,
                image:image_path,
                country,
                address_line_1,
                city,
                address_line_2,
                state,    
                zip_code,
                employer_identification_number
            })

        }else{

            const businessDetails = await sellerTaxInformationModel.create({
                seller_id,
                tax_classication,
                u_s_resident,
                federal_tax_classication,
                llc_type,
                full_name,
                trade_name,
                tin_number,
                image:image_path,
                country,
                address_line_1,
                city,
                address_line_2,
                state,    
                zip_code,
                employer_identification_number
            })

        }
        return responseFun(true, {message:"Tax Information Updated"}, 200)

       
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
 }


 async function updateShippingSetting(request) {
    
    const {_id, seller_id, shipping_setting, shipping_rate} = await request.json();
    try{
        const exists = await sellorSettingModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)})  

          // update sellor complete status
          const seller = await sellerModel.findById(seller_id).select('complete_step'); 
          const complete_step = seller?.complete_step;
          const sellerUpdate = await sellerModel.findByIdAndUpdate(seller_id,{ 
              complete_step: !complete_step || complete_step < 7?7:complete_step
          })

        if(exists){  
            const setting = await sellorSettingModel.findByIdAndUpdate(_id,{
                seller_id, 
                shipping_setting,
                shipping_rate
            }) 
        }else{ 
            const setting = await sellorSettingModel.create({
                seller_id, 
                shipping_setting,
                shipping_rate
            })
        }
        return responseFun(true, {message:"Setting has been Updated"}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }

 }

 
 async function updateBankDetails(request) {
    
    const {_id, seller_id, account_holder_name, bank_name, bank_address, account_number, routing_number, country, zipcode, state} = await request.json();

    const errors ={}; 

        if(isEmpty(account_holder_name))errors.account_holder_name = "account holder name is required.";
        if(isEmpty(bank_name))errors.bank_name = "bank name is required.";
        if(isEmpty(bank_address))errors.bank_address = "bank address is required.";
        if(isEmpty(account_number))errors.account_number = "account number is required.";
        if(isEmpty(country))errors.country = "country is required.";
        if(isEmpty(zipcode))errors.zipcode = "zipcode is required.";
         
        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:403}, 200)
        }

    try{

        const exists = await sellorAccountInformationModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)})  
                    // update sellor complete status
                    const seller = await sellerModel.findById(seller_id).select('complete_step'); 
                    const complete_step = seller?.complete_step;
                    const sellerUpdate = await sellerModel.findByIdAndUpdate(seller_id,{ 
                        complete_step: !complete_step || complete_step < 8?8:complete_step
                    })

        if(exists){  
            const setting = await sellorAccountInformationModel.findByIdAndUpdate(_id,{
                seller_id, 
                account_holder_name,
                bank_name,
                bank_address,
                account_number,
                routing_number,
                country,
                zipcode, 
                state
            }) 
        }else{ 
            const setting = await sellorAccountInformationModel.create({
                seller_id, 
                account_holder_name,
                bank_name,
                bank_address,
                account_number,
                routing_number,
                country,
                zipcode, 
                state
            })
        }
        return responseFun(true, {message:"Account Information Updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }

 }


 
 async function updateCardDetails(request) {
    
    const {_id, seller_id, card_holder_name, name_of_card, card_number, expire_month, expire_year, security_code, billing_address} = await request.json();

    const errors ={}; 

        // if(isEmpty(card_holder_name))errors.card_holder_name = "card holder name is required.";
        if(isEmpty(name_of_card))errors.name_of_card = "name of card is required.";
        if(isEmpty(card_number))errors.card_number = "card number is required.";
        if(isEmpty(expire_month))errors.expire_month = "expire month is required.";
        if(isEmpty(expire_year))errors.expire_year = "expire year is required.";
        if(isEmpty(security_code))errors.security_code = "security code is required.";
        if(isEmpty(billing_address))errors.billing_address = "billing address is required."; 
        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:403}, 200)
        }
       

        // =========================================================================================
        // check account and securty code
        if(card_number.length < 19 || card_number.length > 19){
            errors.card_number = "please enter valid number.";
        }
        // if(security_code.length < 3 || security_code.length > 3){
        //     errors.security_code = "please enter valid code.";
        // }
        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:403}, 200)
        }
        // =========================================================================================


    try{

        const exists = await sellorCardInformationModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}) 
        
         // update sellor complete status
         const seller = await sellerModel.findById(seller_id).select('complete_step'); 
         const complete_step = seller?.complete_step;
         const sellerUpdate = await sellerModel.findByIdAndUpdate(seller_id,{ 
             complete_step: !complete_step || complete_step < 9?9:complete_step
         })
        

            const encript_card_number = encryptText(card_number.trim())
            const encript_expire_month = encryptText(expire_month.trim())
            const encript_expire_year = encryptText(expire_year.trim())
            const encript_security_code = encryptText(security_code.trim()) 
            if(exists){ 
                
               
            const setting = await sellorCardInformationModel.findByIdAndUpdate(_id,{
                seller_id, 
                card_holder_name,
                name_of_card,

                card_number:encript_card_number.data,
                card_number_iv:encript_card_number.iv,

                expire_month:encript_expire_month.data,
                expire_month_iv:encript_expire_month.iv,

                expire_year:encript_expire_year.data,
                expire_year_iv:encript_expire_year.iv,

                security_code:encript_security_code.data,
                security_code_iv:encript_security_code.iv,

                billing_address,
            }) 
            
        }else{ 
            const setting = await sellorCardInformationModel.create({
                seller_id, 
                card_holder_name,
                name_of_card,
                
                card_number:encript_card_number.data,
                card_number_iv:encript_card_number.iv,

                expire_month:encript_expire_month.data,
                expire_month_iv:encript_expire_month.iv,

                expire_year:encript_expire_year.data,
                expire_year_iv:encript_expire_year.iv,

                security_code:encript_security_code.data,
                security_code_iv:encript_security_code.iv,

                billing_address,
            })
        }
        return responseFun(true, {message:"Account Information Updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }

 }

 