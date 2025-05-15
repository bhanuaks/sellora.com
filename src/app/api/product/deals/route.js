import { responseFun } from "@/Http/helper";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import { collectionModal } from "@/Http/Models/CollectionModel";
import mongoose from "mongoose";

// product query
const buildProductQuery = (params, collectionProductIds) => {
  const { brands, minPrice, maxPrice } = params;
  const objectIds = collectionProductIds;
  
  const query = {
    save_as_draft: 0,
    _id: { $in: objectIds }
  };

  if (brands) {
    query.brand_id = { $in: brands.split(',') };
  }

  return query;
};

// variant query
const buildVariantQuery = (productId, { minPrice, maxPrice }) => {
  const query = {
    product_id: productId,
    listingStatus: 1,
    isProcessing: 'Approved'
  };

  if (minPrice || maxPrice) {
    query.consumerSalePrice = {};
    if (minPrice) query.consumerSalePrice.$gte = minPrice;
    if (maxPrice) query.consumerSalePrice.$lte = maxPrice;
  }

  return query;
};

// calculate average ratings
const getProductRatings = async (productId, minReview) => {
  const matchStage = { product_id: productId };
  if (minReview > 0) {
    matchStage.star = { $gte: minReview };
  }

  const pipeline = [
    { $match: matchStage },
    { $group: { _id: null, avgRating: { $avg: "$star" } } }
  ];

  const reviewAvg = await ProductReviewModal.aggregate(pipeline);
  return reviewAvg.length > 0 ? reviewAvg[0].avgRating : 0;
};

// Helper function to sort products
const sortProducts = (products, sortVal) => {
  if (sortVal === 1) {
    return [...products].sort((a, b) => a.variant.consumerSalePrice - b.variant.consumerSalePrice);
  }
  if (sortVal === 2) {
    return [...products].sort((a, b) => b.variant.consumerSalePrice - a.variant.consumerSalePrice);
  }
  return products;
};

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const params = {
      deal: url.searchParams.get('deal'),
      brands: url.searchParams.get('brands'),
      minPrice: url.searchParams.get('minPrice'),
      maxPrice: url.searchParams.get('maxPrice'),
      sortVal: parseInt(url.searchParams.get('sortVal')) || 0,
      reviewVal: parseInt(url.searchParams.get('reviewVal')) || 0,
      page: parseInt(url.searchParams.get('page')) || 1,
      limit: parseInt(url.searchParams.get('limit')) || 10
    };

    // Validate required parameters
    if (!params.deal) {
      return responseFun(false, { message: "Deal parameter is required" }, 400);
    }

    let highestPrice = 0;
    let lowestPrice = 0;

    // Find collection
    const collection = await collectionModal.findOne({ slug: params.deal });
    if (!collection) {
      return responseFun(false, { message: "Deal not found!" }, 404);
    }

    // Build and execute product query
    const productQuery = buildProductQuery(params, collection.productIds);
    // const totalCount = await productModel.countDocuments(productQuery);
    
    const products = await productModel.find(productQuery)
    // const products = collection.productIds
      // .skip((params.page - 1) * params.limit)
      // .limit(params.limit);

    // Process products with variants and ratings
    const productProcessing = products.map(async (prod) => {
      const variantQuery = buildVariantQuery(prod._id, params);
      const variants = await productVariantModel.find(variantQuery).limit(1);
      
      if (!variants.length) return null;

      const avgRating = await getProductRatings(prod._id, params.reviewVal);
      
      // If review filter is active, skip products that don't meet the rating
      if (params.reviewVal > 0 && avgRating < params.reviewVal) {
        return null;
      }

      return {
        ...prod.toObject(),
        variant: variants[0],
        avgRating
      };
    });

    let productWithVariant = (await Promise.all(productProcessing)).filter(Boolean);
    
    // Apply sorting
    productWithVariant = sortProducts(productWithVariant, params.sortVal);

    let filterPrice = null;
    if (params.page === 1 && productWithVariant.length > 0) {
      const prices = productWithVariant.map(item => item.variant.consumerSalePrice);
      const highestPrice = Math.max(...prices);
      const lowestPrice = Math.min(...prices);
    
      filterPrice = {
        highestPrice,
        lowestPrice
      };
    }

    const totalCount = productWithVariant.length;
    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit;
    const paginatedResult = productWithVariant.slice(startIndex, endIndex);
    return responseFun(true, {
      products: paginatedResult,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / params.limit),
        page: params.page,
        pageSize: params.limit
      },
      filterPrice
      
    }, 200);

  } catch (error) {
    console.error("Product fetch error:", error);
    return responseFun(false, { 
      message: "An error occurred while fetching products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, 500);
  }
}