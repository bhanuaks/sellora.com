import { connectDb } from '../../../../../lib/dbConnect';
import { Category } from '../../../../../lib/categoryModel';

export async function GET(req) {
    try {
      await connectDb();
      let query = { status: "Active" };
      const categories = await Category.find(query).sort({
        name:1
      });
  
      return new Response(
        JSON.stringify({ success: true, data: categories }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error fetching categories:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error fetching categories', error: error.message }),
        { status: 500 }
      );
    }
}


