import { responseFun } from "@/Http/helper";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { Category } from "../../../../lib/categoryModel";
import { subCategory } from "../../../../lib/subcategoryModel";
import ChildCategory from "../../../../lib/childcategoryModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const categorySlug = url.searchParams.get("category");
    const subcategorySlug = url.searchParams.get("subcategory");
    const childcategorySlug = url.searchParams.get("childcategory");
    const brands = url.searchParams.get("brands");
    const minPrice = parseFloat(url.searchParams.get("minPrice"));
    const maxPrice = parseFloat(url.searchParams.get("maxPrice"));
    const sortVal = parseInt(url.searchParams.get("sortVal"));
    const reviewVal = parseInt(url.searchParams.get("reviewVal"));

    const query = { save_as_draft: 0 };

    let highestPrice = 0;
    let lowestPrice = 0;



    if (categorySlug) {
      const category = await Category.findOne({ slug: decodeURIComponent(categorySlug) });
      if (!category) return responseFun(true, { message: "No products found matching the filters." }, 404);
      query.category_id = category._id;
    }

    if (subcategorySlug) {
      const subcategory = await subCategory.findOne({ slug: decodeURIComponent(subcategorySlug) });
      if (!subcategory) return responseFun(true, { message: "No products found matching the filters." }, 404);
      query.subcategory_id = subcategory._id;
    }

    if (childcategorySlug) {
      const childcategory = await ChildCategory.findOne({ slug: decodeURIComponent(childcategorySlug) });
      if (!childcategory) return responseFun(true, { message: "No products found matching the filters." }, 404);
      query.childcategory_id = childcategory._id;
    }

    if (brands) {
      query.brand_id = { $in: brands.split(',') };
    }

    // Fetch all matching products without skip/limit for accurate filtering
    const allMatchingProducts = await productModel.find(query);

    const filteredProducts = await Promise.all(
      allMatchingProducts.map(async (prod) => {
        const variantQuery = {
          product_id: prod._id,
          listingStatus: 1,
          isProcessing: "Approved",
        };

        if (!isNaN(minPrice)) {
          variantQuery.consumerSalePrice = { $gte: minPrice };
        }
        if (!isNaN(maxPrice)) {
          variantQuery.consumerSalePrice = {
            ...variantQuery.consumerSalePrice,
            $lte: maxPrice
          };
        }

        const variant = await productVariantModel.find(variantQuery).sort({ consumerSalePrice: 1 }).limit(1);
        if (!variant.length) return null;

        const reviewPipeline = [
          {
            $match: {
              product_id: prod._id,
              ...(reviewVal > 0 ? { star: { $gte: reviewVal } } : {})
            }
          },
          {
            $group: {
              _id: null,
              avgRating: { $avg: "$star" }
            }
          }
        ];

        const reviewAvg = await ProductReviewModal.aggregate(reviewPipeline);
        const avgRating = reviewAvg.length ? reviewAvg[0].avgRating : 0;

        if (reviewVal > 0 && avgRating === 0) return null;

        return {
          ...prod.toObject(),
          variant: variant[0],
          avgRating
        };
      })
    );

    // Remove nulls
    let result = filteredProducts.filter(Boolean);

    // Apply sorting
    if (sortVal === 1) {
      result.sort((a, b) => a.variant.consumerSalePrice - b.variant.consumerSalePrice);
    } else if (sortVal === 2) {
      result.sort((a, b) => b.variant.consumerSalePrice - a.variant.consumerSalePrice);
    }

    if (reviewVal > 0 && (!sortVal || sortVal === 0)) {
      result.sort((a, b) => b.avgRating - a.avgRating);
    }

    let filterPrice = null;

    if (page === 1 && result.length > 0) {
      const prices = result.map(item => item.variant.consumerSalePrice);
      const highestPrice = Math.max(...prices);
      const lowestPrice = Math.min(...prices);
    
      filterPrice = {
        highestPrice,
        lowestPrice
      };
    }

    // Paginate final result
    const paginatedResult = result.slice(skip, skip + limit);

    
      
    const pagination = {
      totalCount: result.length,
      totalPages: Math.ceil(result.length / limit),
      page,
      pageSize: limit,
    };

    return responseFun(true, { products: paginatedResult, pagination, filterPrice}, 200);

  } catch (error) {
    console.error("Error fetching products:", error);
    return responseFun(false, { message: "An error occurred while fetching products." }, 500);
  }
}
