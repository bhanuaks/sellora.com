import ChildCategory from '../../../../../lib/childcategoryModel';
import { connectDb } from '../../../../../lib/dbConnect';


export async function GET(req) {
    try {
        await connectDb();

        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const subCategoryId = searchParams.get('subCategory_id');
        let query = { status: "Active","subCategoryId":subCategoryId }; 
        
        const subcategories = await ChildCategory.find(query).sort({
            childCategoryName: 1,
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
