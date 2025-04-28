import { encryptText, isEmpty, responseFun } from "@/Http/helper";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { connectDb } from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { ContactUsModel } from "@/Http/Models/contactUsModel";


export async function GET(req) {
  try {
    

    const contactUs = await ContactUsModel.find().sort({
      createdAt: -1
    });
    

    return new Response(
      JSON.stringify({
        success: true, data: contactUs, 
        
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contact us:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching contact us', error: error.message }),
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
        subject,
        feedback,
        message,
        captcha,
        userCaptcha,
        mobile_code,
        country_s_name

    } = await request.json();

    //console.log(name,email,mobile,subject)     
    
    const errors = {};
        if(isEmpty(name))errors.name = `Name is required.`
        if(isEmpty(email))errors.email = `Email is required.`
        if(isEmpty(mobile))errors.mobile = `Mobile is required.`
        if(isEmpty(subject))errors.subject = `Subject is required.`
        if(isEmpty(feedback))errors.feedback = `Feedback is required.`
        if(isEmpty(message))errors.message = `Message is required.`
        if(isEmpty(userCaptcha))errors.captcha = `Captcha is required.`

        if(userCaptcha && captcha != userCaptcha){ 
            errors.captcha = `Captcha is not valid.` 
        }
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(email && !regex.test(email)){
            errors.email = `Email is not valid.` 
        }
        if (!/^\d+$/.test(mobile)) {
            errors.mobile = "Only numeric values allowed.";
            
          }

        if(Object.keys(errors).length>0){
             return responseFun(false, {errors, status_code:400}, 200); 
        } 

    try{

        

        const user = await ContactUsModel.create({
            name,
            email,
            mobile,
            subject,
            feedback,
            message,
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
  
    const banner = await ContactUsModel.findById(id);
    
    
    if (!banner) {
      return new Response(
        JSON.stringify({ success: false, message: 'Contact us not found' }),
        { status: 404 }
      );
    }

    

    // Remove associated photo if it exists
    

    await ContactUsModel.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true, message: 'Contact us deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact us:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting contact us', error: error.message }),
      { status: 500 }
    );
  }
}