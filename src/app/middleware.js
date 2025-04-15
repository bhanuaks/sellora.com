// src/app/middleware.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token'); // Assuming JWT is stored in cookies

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    if (decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect if not admin
    }
    return NextResponse.next(); // Allow access if admin
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect if token is invalid
  }
}

export const config = {
  matcher: ['/admin/dashboard'], // Protect only admin routes
};
