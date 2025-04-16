import { responseFun } from "@/Http/helper";
import { FeatureBanner } from "@/Http/Models/featureBannerModel";

export async function GET(req) {
  try {
    

    const banners = await FeatureBanner.find().sort({
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