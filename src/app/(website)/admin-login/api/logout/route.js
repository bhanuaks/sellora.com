
import cookie from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {


    const response = NextResponse.json({status:true, message:"Logout successfully"},{status:200})
    response.cookies.set('adminAuthToken', '', {
      maxAge:'0'
    });

    return response
    // // Set the adminAuthToken cookie to expire immediately (logout)
    // res.setHeader('Set-Cookie', cookie.serialize('adminAuthToken', '', {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',  // Secure in production environment
    //   sameSite: 'Strict',
    //   expires: new Date(0),  // Expire the cookie immediately
    //   path: '/',  // Apply it globally
    // }));

    // // Return a response indicating successful logout
    // return res.status(200).json({
    //   success: true,
    //   message: 'Successfully logged out',
    // });
  } catch (error) {
    // Handle any errors during logout process
    console.error('Error during logout:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
}
