const { Schema, default: mongoose } = require("mongoose");


const brandScheema = new Schema({
    seller_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    }],
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // 0 => reject, 1 => approved, 2 => pending
      default: 2
    },
  }, { timestamps: true });
  
  export const brandModel = mongoose.models.Brand || mongoose.model('Brand', brandScheema);

const brandCountSchema = new Schema({
    id:String,
    counter:{
        type:Number,
        Default:100000
    }
  },{timestamps:true})
  
  
  export const brandCountModel = mongoose.models.BrandCount || mongoose.model('BrandCount', brandCountSchema);



  const sellerBrandSchema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    }, 
    name:String,
    slug:String,
    certificate_name:String,
    certificate:String,
    brand_owner:{
        type:String,
        enum:['Yes', "No"]
    },

    are_you_selling_in_other_platform:{
        type:String,
        enum:['Yes', "No"]
    },
    // if selling other platform then add these field
    platform_name:String,
    platform_link:String,

    // if sellor brand owner then add these field
     tm_number:String,
     tm_status:String,
     tm_class:String,
     tm_type:String, 
     request_id:Number, 
     status:{
        type:Number,
        enum:[0,1,2], // 0=>reject, 1=>approved, 2=>pending, 
        default:2
     },

     approve_by:String,
     remarks:String,
     approve_Date:{
            type:Date
    },

},{timestamps:true})

export const brandSellerModel = mongoose.models.SellerBrand || mongoose.model('SellerBrand', sellerBrandSchema);

