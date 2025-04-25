import { encryptText, isEmpty, responseFun } from "@/Http/helper";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { connectDb } from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { ReportInfringementModel } from "@/Http/Models/reportInfringment";


export async function GET(req) {
  try {
    

    const reportInfringement = await ReportInfringementModel.find().sort({
      createdAt: -1
    });
    

    return new Response(
      JSON.stringify({
        success: true, data: reportInfringement, 
        
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching report:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching report', error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
   
    connectDb();

    const {

        name,
        email,
        mobile,
        address,
        ipDescription,
        infringementLocation,
        goodFaith,
        accuracy,
        signature,
        mobile_code,
        country_s_name

    } = await request.json();

    //console.log(name,email,mobile,address, mobile_code)     
    
    const errors = {};
        if(isEmpty(name))errors.name = `Name is required.`
        if(isEmpty(email))errors.email = `Email is required.`
        if(isEmpty(mobile))errors.mobile = `Mobile is required.`
        if(isEmpty(address))errors.address = `Address is required.`
        if(isEmpty(ipDescription))errors.ipDescription = `Description is required.`
        if(isEmpty(infringementLocation))errors.infringementLocation = `Location is required.`
        if(isEmpty(goodFaith))errors.goodFaith = `Good faith is required.`
        if(isEmpty(signature))errors.signature = `Signature is required.`
        if(isEmpty(accuracy))errors.accuracy = `Accuracy is required.`
        
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(email && !regex.test(email)){
            errors.email = `Email is not valid?` 
        }
        if (mobile && !/^\d+$/.test(mobile)) {
            errors.mobile = "Only numeric values allowed.";
            
          }

        if(Object.keys(errors).length>0){
             return responseFun(false, {errors, status_code:400}, 200); 
        } 

    try{

        

        const user = await ReportInfringementModel.create({
            name,
            email,
            mobile,
            address,
            ipDescription,
            infringementLocation,
            goodFaith,
            accuracy,
            signature,
            mobile_code,
            country_s_name
            })

           
                
             return responseFun(true, {user},  200);;
        
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200);
    }

}

export async function DELETE(req) {

  const { id } = await req.json()

  try {
  
    const banner = await ReportInfringementModel.findById(id);
    
    
    if (!banner) {
      return new Response(
        JSON.stringify({ success: false, message: 'Report infringement us not found' }),
        { status: 404 }
      );
    }

    

    // Remove associated photo if it exists
    

    await ReportInfringementModel.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true, message: 'Report infringement deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting report infringement:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting report infringement', error: error.message }),
      { status: 500 }
    );
  }
}