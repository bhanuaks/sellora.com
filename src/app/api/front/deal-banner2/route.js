import { responseFun } from "@/Http/helper"; 
import { DealBanner2 } from "@/Http/Models/dealBanner2";

export async function GET(req) {
  try {
    

    const banners = await DealBanner2.findOne().sort({
      createdAt: -1
    });
    

    return new Response(
      JSON.stringify({
        success: true, data: banners, 
        
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching banners:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching banners', error: error.message }),
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try { 
    return responseFun(false, "", 500); 
  } catch (error) { 
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching banners', error: error.message }),
      { status: 500 }
    );
  }
}