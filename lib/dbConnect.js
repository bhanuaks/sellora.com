import mongoose, { Schema } from "mongoose"; 

export const connectDb=async ()=>{

    try{
    const {connection} =await  mongoose.connect(process.env.MONGODB_URI,{
            dbName: "selloraDB",
            
        }); 
        
    }catch(error){
        console.log('fail to connect database');
        console.log(error);
    }
}


const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);