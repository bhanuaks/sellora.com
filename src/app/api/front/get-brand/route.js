import { brandModel } from '@/Http/Models/branModel';
import { connectDb } from '../../../../../lib/dbConnect';
import { Category } from '../../../../../lib/categoryModel';
import { productModel, productVariantModel } from '@/Http/Models/productModel';
import { responseFun } from '@/Http/helper';
import ChildCategory from '../../../../../lib/childcategoryModel';
import { subCategory } from '../../../../../lib/subcategoryModel';


export async function GET(req) {
    try {
        await connectDb();

        const url = new URL(req.url);
        
        //console.log('urllllll', url.searchParams.get('category'))
        //const brandModule = url.searchParams.get('brand_module');
        //const query = brandModule ? { status: parseInt(brandModule) } : {};
        const category = url.searchParams.get('category')
        const subcategory = url.searchParams.get('subcategory');
        const childcategory = url.searchParams.get('childcategory');

      


        let query = {};
                
                if (category) {
                    const categoryData = await Category.findOne({slug : decodeURIComponent(category)});
                   
                    if (categoryData) {
                        query.category_id = categoryData._id;
                    }else{
                        return responseFun(true, { message: "No products found matching the filters." }, 404);
                    }
                }
                if (subcategory) {
                            const subcategoryData = await subCategory.findOne({ slug: decodeURIComponent(subcategory) }); 
                            if (subcategoryData) {
                                query.subcategory_id = subcategoryData._id;
                            }else{
                                return responseFun(true, { message: "No products found matching the filters." }, 404);
                            }
                        }
                        
                         // if choose child category
                        if (childcategory) {
                            const childcategoryData = await ChildCategory.findOne({ slug: decodeURIComponent(childcategory) });
                            if (childcategoryData) {
                                query.childcategory_id = childcategoryData._id;
                            }else{
                                return responseFun(true, { message: "No products found matching the filters." }, 404);
                            }
                        }    

                        query.save_as_draft = 0;
        
                const products = await productModel.find(query).populate('brand_id');
                
                /* const brand = products.map((prod)=>{
                      return {
                        name:prod.brand_id.name,
                        _id:prod.brand_id._id,
                        productName:prod.product_name
                      }

                })

                const uniqueBrands = Array.from(
                  new Map(brand.map(b => [b.name, b])).values()
                );
                */
               let obj=[]
                 let productWithVariant = await Promise.all( 
                 
                 products.map(async (prod)=>{
                                        let variantQuery = {
                                            product_id: prod._id,
                                            listingStatus: 1,
                                            isProcessing:'Approved'
                                        }; 
                                                
                                            let variantQueryBuilder = await productVariantModel.find(variantQuery)
                              //console.log('nnnnnnnnnn', variantQueryBuilder.length, prod._id, prod.brand_id.name)
                                        //if (!variantQueryBuilder.length) return null;
                                        
                                        if(variantQueryBuilder.length > 0){
                                           // console.log('okkkk') 
                                          let objNew = {
                                            name:prod.brand_id.name,
                                            _id:prod.brand_id._id,
                                            productName:prod.product_name
                                          }
                                          
                                          obj.push(objNew)
                                          }

                                        
                                    })

                                  )
                                 
                
                  //productWithVariant = productWithVariant.filter((item)=> item != null)
        
                //console.log('totalbrnaddddd', productWithVariant, obj)
                
                //const brandList =  await brandModel.find({status:1}).sort({name:1})
                const uniqueBrands = Array.from(
                  new Map(obj.map(b => [b.name, b])).values()
                );            
                uniqueBrands.sort((a, b) => a.name.localeCompare(b.name));                 

            return new Response(
                JSON.stringify({
                    success : true,
                    data    : uniqueBrands,
                    
                    
                }),
                { status: 200 }
              );

    }catch(error){
        console.error('Error fetching brand:', error);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Error fetching brand',
            error: error.message,
          }),
          { status: 500 }
        );
    }
}