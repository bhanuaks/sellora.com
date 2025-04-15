
import { connectDb } from "../../../../../lib/dbConnect";
import { UserModel } from "../../../../../lib/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { username, password } = await req.json();

  // Connect to the database
  await connectDb();

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });
    

    if (!user) {
      // If user does not exist, return invalid credentials
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 200 }
      );
    }

    // Manually compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {admin : user}, //{ userId: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET, // Your secret key
        { expiresIn: '2h' } // Token expiration time
      );
      const response = NextResponse.json({
                      message:"Login successful",
                      status:true,
                      success:true,
                      admin:user
                  },  { status: 200 }); 

       response.cookies.set('adminAuthToken',token,{
          expireIn:"2h",
      });
      
      return response;
      
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Something went wrong. Please try again.' }),
      { status: 500 }
    );
  }
}
