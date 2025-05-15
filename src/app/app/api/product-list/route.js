import { isEmpty, responseFun } from "@/Http/helper";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import { Category } from "../../../../../lib/categoryModel";
import { subCategory } from "../../../../../lib/subcategoryModel";
import ChildCategory from "../../../../../lib/childcategoryModel";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const subcategory = url.searchParams.get('subcategory');
    const childcategory = url.searchParams.get('childcategory');
    const brands = url.searchParams.getAll('brands') || [];
    const minPrice = parseFloat(url.searchParams.get('minPrice'));
    const maxPrice = parseFloat(url.searchParams.get('maxPrice'));
    const sortVal = parseInt(url.searchParams.get('sortVal'));
    const reviewVal = parseFloat(url.searchParams.get('reviewVal'));

 

    const page = parseInt(url.searchParams.get('page')) || 1; 
    const limit =  6;
    const skip = (page - 1) * limit;

    const query = { save_as_draft: 0 };

    // Category filters
    if (category) {
      const categoryData = await Category.findOne({ slug: decodeURIComponent(category) });
      if (!categoryData) return responseFun(true, { message: "No products found matching the filters." }, 404);
      query.category_id = categoryData._id;
    }

    if (subcategory) {
      const subcategoryData = await subCategory.findOne({ slug: decodeURIComponent(subcategory) });
      if (!subcategoryData) return responseFun(true, { message: "No products found matching the filters." }, 404);
      query.subcategory_id = subcategoryData._id;
    }

    if (childcategory) {
      const childcategoryData = await ChildCategory.findOne({ slug: decodeURIComponent(childcategory) });
      if (!childcategoryData) return responseFun(true, { message: "No products found matching the filters." }, 404);
      query.childcategory_id = childcategoryData._id;
    }

    if (brands.length > 0) {
      query.brand_id = { $in: brands };
    }

    const totalProducts = await productModel.countDocuments(query);
    const products = await productModel.find(query)
      .select("_id product_name slug stock avgRating main_image")
      .skip(skip)
      .limit(limit);

    const productWithVariant = await Promise.all(
      products.map(async (prod) => {
        const variantQuery = {
          product_id: prod._id,
          listingStatus: 1,
          isProcessing: 'Approved',
        };

        if (!isNaN(minPrice)) variantQuery.consumerSalePrice = { $gte: minPrice };
        if (!isNaN(maxPrice)) {
          variantQuery.consumerSalePrice = {
            ...variantQuery.consumerSalePrice,
            $lte: maxPrice,
          };
        }

        let variants = await productVariantModel.find(variantQuery).sort({consumerSalePrice:1});
        if (!variants.length) return null;

        if (sortVal === 1) {
          variants.sort((a, b) => a.consumerSalePrice - b.consumerSalePrice);
        } else if (sortVal === 2) {
          variants.sort((a, b) => b.consumerSalePrice - a.consumerSalePrice);
        }

        const topVariant = variants[0];

        let avgRating = 0;
        if (!isNaN(reviewVal)) {
          const pipeline = [
            { $match: { product_id: prod._id, ...(reviewVal > 0 ? { star: { $gte: reviewVal } } : {}) } },
            { $group: { _id: null, avgRating: { $avg: "$star" } } },
          ];
          const reviewData = await ProductReviewModal.aggregate(pipeline);
          if (!reviewData.length && reviewVal > 0) return null;
          avgRating = reviewData[0]?.avgRating || 0;
        }

        return {
          ...prod.toObject(),
          variant: {
            variant_id: topVariant._id,
            stock: topVariant.stock,
            currency: topVariant.currency,
            businessSalePrice: topVariant.businessSalePrice,
            consumerSalePrice: topVariant.consumerSalePrice,
            msrp: topVariant.msrp,
            withImage: topVariant.withImage,
            image_1: topVariant.image_1,
            stock_status: topVariant.stock_status,
          },
          avgRating,
        };
      })
    );

    let finalList = productWithVariant.filter(Boolean);

    if (isNaN(sortVal) && !isNaN(reviewVal) && reviewVal > 0) {
      finalList.sort((a, b) => b.avgRating - a.avgRating);
    }

    // const totalPages = Math.ceil(totalProducts / limit);
    const totalPages = Math.ceil(totalProducts / limit);
    let pagination= {
        totalCount:totalProducts,
        page,
        pageSize:limit, 
        totalPages:totalPages,
    };
    
    return responseFun(true, {products:finalList, pagination}, 200);
  } catch (error) {
    console.error(error);
    return responseFun(false, { message: "An error occurred while fetching products" }, 500);
  }
}



export async function DELETE(request) {
    return responseFun(false, { message: "An error occurred while fetching products" }, 500);
    
}