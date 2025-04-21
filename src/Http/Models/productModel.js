const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
    category_id:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:[true, "Category is required"]
    },

    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Sellor", 
    },
    subcategory_id:{
        type:mongoose.Types.ObjectId,
          ref:"subCategory",
          required: false,
          default: null,
    },
    childcategory_id:{
        type:mongoose.Types.ObjectId,
        ref:"ChildCategory",
        required: false,
        default: null,
    },
    brand_id:{
        type:mongoose.Types.ObjectId,
        ref:"Brand",
        required:[true, "Brand is required"]
    },
    product_name:{
        type:String,
        required:[true, "Product name is required"]
    },
    slug:{
        type:String
    },
    product_id:{
        type:String
    },
    product_id_type:String,
    product_description:String,
    key_feature:[{
        type:String
    }],
    search_keywords:String,
    target_gender:String,
    age_range:String,
    material:String,
    model_name:String,
    model_number:String,
    manufacture_part_number:String,
    safety_warning:String,
    country_of_origin:String,
    manufacturer_details:String,
    packer_details:String,
    importer_details:String,

    image_1:{
        type:String,
        default:null
    }, 
    image_2:{
        type:String,
        default:null
    }, 
    image_3:{
        type:String,
        default:null
    }, 
    image_4:{
        type:String,
        default:null
    }, 
    image_5:{
        type:String,
        default:null
    }, 
    image_6:{
        type:String,
        default:null
    }, 
    image_7:{
        type:String,
        default:null
    }, 
    main_image:{
        type:String,
        default:null
    },
    dynamicFields:{
        type:Array,
        default:[]
    },
    keyAttributes:{
        type:Array,
        default:[]
    },
    listingStatus:{
        type:Number,
        enum:[0, 1, 2] ,// 0=>Deactive, 1=>Active, 2=> Draft
        default:1,
    },

    currency:{
        type:String,
        default:"USD"
    },
    taxCode: {
        type:String, 
    },
    taxRate:{
        type:Number, 
    },
    fulfillmentBy:{
        type:String,
        default:"Sellora",
    },
    shippingProvider:{
        type:String,
        default:"Merchant",
    },
    variant:{
        type:String,
        default:"Yes"
    },

    save_as_draft: {
        type:String,
        enum:["1","0"],
        default:"1" // 1=>save as draft, 0 => submit successfully
    }, 
    packageBreadth:String,  
    product_length:String,
    product_length_unit : String,
    product_width:String,
    product_width_unit :String,
    product_weight:String,
    product_weight_unit : String,
    packageLength:String,
    packageLengthUnit:String,
    packageWidth:String,
    packageWidthUnit:String,
    packageHeight:String,
    packageHeightUnit:String,
    color:String,
    size:String,
    style:String,
    pettern:String,
    unit_coun:String,
    unit_count_type:String,
    item_type_name:String,
    recommanded_use:String,
    packageWeight:String,
    packageWeightUnit:String,

    productHeight:String,
    productHeightUnit:String,
    numberOfItem:String, 
     

},{timestamps:true})


export const productModel = mongoose.models.Product || mongoose.model("Product", productSchema) 



const productOtherDetailsSchema = new Schema({
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    containsLiquidContents:String,
    liquidVolume:String,
    liquidVolumeUnit:String,
    isTheItemHeaSensitive:String,
    isTheItemHeaSensitiveInstructions:String,
    isTheLiquidProductDoubleSealed:String, 
    isTheLiquidProductDoubleSealedInstructions:String,
    dangerousGoodsRegulations:String,
    safetyWarning:String,
    hasWrittenWarranty:String,
    ProductIsOrContainsAnElectronicComponent:String,
    productIsOrContainsThisBatteryType:String, 
    areBatteriesIncluded:String,
    batteryCellComposition:String

},{timestamps:true})


export const productOtherDetailModel = mongoose.models.ProductOtherDetails || mongoose.model("ProductOtherDetails", productOtherDetailsSchema) 

const productVariantSchema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Sellor", 
        default:null,
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    sku:{
        type:String,
        required:[true, "sku is required"]
    },
    sin:{
        type:String, 
    },
    listingStatus:{
        type:Number,
        enum:[0, 1, 2, 3, 4] // 0=>Deactive, 1=>Active, 2=> Draft, 3=>Archive, 4=>Delete
    },
    isProcessing:{
        type:String,
         enum:["Processing","Approved"],
         default:"Processing" 
    },
    msrp:Number,
    consumerSalePrice:Number,
    businessSalePrice:Number,
    currency:String,
    taxCode:String,
    taxRate:String,
    fulfillmentBy:String,
    shippingProvider:String,
    stock:{
        type:Number,
        default:0
    },
    customAttributes:{
        type:Object, 
    },
    discount_type:{
        type:String,
        default:"percentage"
    },
    withImage:String,
    image_1:{
        type:String,
        default:null,
    }, 
    image_2:{
        type:String,
        default:null,
    },
    image_3:{
        type:String,
        default:null,
    }, 
    image_4:{
        type:String,
        default:null,
    }, 
    image_5:{
        type:String,
        default:null,
    }, 
    image_6:{
        type:String,
        default:null,
    }, 
    image_7:{
        type:String,
        default:null,
    }, 
    stock_status:{
        type:String,
        default:"In Stock",
    },

    manual_product_id:String,
    manual_product_id_type:String,
    conditionType:String,
    expireDate:String


},{timestamps:true})

export const productVariantModel = mongoose.models.ProductVariant || mongoose.model("ProductVariant", productVariantSchema)


const variantThresholdSchema = new Schema({ 
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    variant_id:{
        type:mongoose.Types.ObjectId,
        ref:"ProductVariant"
    },
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Sellor", 
        default:null,
    },

    unit:{
        type:Number,
        default:null,
    },
    discount:{
        type:Number,
        default:null,
    },
}, {timestamps:true})

export const variantThresholdSchemaModal = mongoose.models.VariantThreshold || mongoose.model("VariantThreshold", variantThresholdSchema) 


const thresholdSchema = new Schema({ 
        product_id:{
            type:mongoose.Types.ObjectId,
            ref:"Product"
        },
        quantity_base_discount:{
            type:Number,
            default:null,
        },
        type_threshold_levels_1_unit:{
            type:Number,
            default:null,
        },
        threshold_levels_1_discount:{
            type:Number,
            default:null,
        }, 
        threshold_levels_2_unit:{
            type:Number,
            default:null,
        },
        threshold_levels_2_discount:{
            type:Number,
            default:null,
        }, 
        threshold_levels_3_unit:{
            type:Number,
            default:null,
        },
        threshold_levels_3_discount:{
            type:Number,
            default:null,
        }, 
        threshold_levels_1_fixed_price:{
            type:Number,
            default:null,
        },
        threshold_levels_2_fixed_price:{
            type:Number,
            default:null,
        },
        threshold_levels_3_fixed_price:{
            type:Number,
            default:null,
        },
}, {timestamps:true})

export const productThresholdModel = mongoose.models.ProductThreshold || mongoose.model("ProductThreshold", thresholdSchema) 