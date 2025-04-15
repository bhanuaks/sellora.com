import mongoose from 'mongoose';

const { Schema } = mongoose;  

// Define the category schema
const categorySchema = new Schema(
  {
    
    name: {
      type: String,
      required: true, // 'name' is a required field
    },
    slug: {
      type: String,
    },
    showList: {
      type: String,
    },
    photo: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
      required: false, // Optional field
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'], // Only these values are allowed
      default: 'Active', // Default to 'Active' if not specified
    },
    
  category_variant:{
    type:Object,
    default:{}
  },

  list_image:{
    type: String,
    default:null
  },

  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Export the model, creating it if it doesn't exist already
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);


const productDynamicField = new Schema({
  category_id:{
    type:mongoose.Types.ObjectId,
    ref:"Category",
    required:[true, "Category id is required."]
  },
  field_name:{
    type:String,
    default:null
  },

  required:{
    type:String,
    default:null
  },
  field_type:{
    type:String,
    default:'input'
  },
  select_value:{
    type:Array,
    default:[]
  }
}, {timestamps:true})


export const productDynamicFieldModel = mongoose.models.ProductDynamicField || mongoose.model("ProductDynamicField",productDynamicField) 