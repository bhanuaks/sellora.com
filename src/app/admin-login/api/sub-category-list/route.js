import { connectDb } from '../../../../../lib/dbConnect';
import { subCategory } from '../../../../../lib/subcategoryModel';

export async function GET(req) {
    try {
        await connectDb();

        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('category_id');
        let query = { status: "Active","category_id":categoryId }; 
        
        const subcategories = await subCategory.find(query).sort({
            subCategoryName: 1,
        });

        return new Response(
            JSON.stringify({ success: true, data: subcategories }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Error fetching subcategories', error: error.message }),
            { status: 500 }
        );
    }
}
