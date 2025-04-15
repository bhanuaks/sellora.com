import mongoose, { Schema } from "mongoose"


const taxInformationSchema = new Schema({
        seller_id:{
            type:mongoose.Types.ObjectId,
            ref:"Seller"
        },
        tax_classication : { //Are you a U.S. resident entity?
            type:String,
            enum: ["Individual", "Business"]
        },
        u_s_resident  : String,
        federal_tax_classication : String,
        llc_type : String,
        full_name : String,
        trade_name : String,  
        employer_identification_number: String,
        tin_number : String,  
        image : String,  
        country : String,
        address_line_1 : String,
        city : String,
        address_line_2 : String,  
        state : String,           
        zip_code:String,         
       
},{timestamps:true}) 

export const sellerTaxInformationModel = mongoose.models.SellerTaxInformation ||  mongoose.model("SellerTaxInformation", taxInformationSchema)

