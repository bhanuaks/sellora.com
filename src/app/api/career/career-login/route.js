import { connectDb } from "../../../../../lib/dbConnect";
import CareerUser from "../../../../../lib/career/CareerUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDb();
    
    const { email, password } = await req.json(); // Read JSON data

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: "Email and password are required" }), {
        status: 400,
      });
    }

    // Check if user exists
    let user = await CareerUser.findOne({ email });

    if (user) {
      // If user exists but is InActive, prevent login
      if (user.status === "InActive") {
        return new Response(JSON.stringify({ success: false, message: "Account is inactive. Contact support." }), {
          status: 403,
        });
      }

      // If user exists, verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return new Response(JSON.stringify({ success: false, message: "Invalid password" }), {
          status: 401,
        });
      }
    } else {
      // If user doesn't exist, create a new account
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new CareerUser({ email, password: hashedPassword, status: "Active" });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return new Response(JSON.stringify({ success: true, message: "Login successful", token }), {
      status: 200,
    });

  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error", error: error.message }),
      { status: 500 }
    );
  }
}
