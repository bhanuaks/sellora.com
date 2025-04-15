import {
  baseUrl,
  getUSFormatAmount,
  main_thumb_img_path,
  product_thumb_img_path1,
  product_thumb_img_path2,
  product_thumb_img_path3,
  product_thumb_img_path4,
  product_thumb_img_path5,
  product_thumb_img_path6,
  product_thumb_img_path7,
} from "@/Http/helper";

import {
  variant_thumb_img_path1,
  variant_thumb_img_path2,
  variant_thumb_img_path3,
  variant_thumb_img_path4,
  variant_thumb_img_path5,
  variant_thumb_img_path6,
  variant_thumb_img_path7,
} from "@/Http/helper";
import { fileBasePath } from "@/Http/urlHelper";
import React from "react";

function ProductListTable({ productList }) {
  return (
    <div className="table-responsive">
      {/* id="example2" */}
      <table
        className="table table-bordered table-hover"
        style={{ width: "1500px" }}
      >
        <thead>
          <tr>
            <th width={5}>Sl No.</th> <th width={200}>Vendor</th>
            <th >Main Photo</th> 
            <th style={{minWidth:'300px'}}>Product Photo</th> 
            <th style={{minWidth:'200px'}}>Product Name</th>
            <th>Category</th> <th>Sub Category</th>
            <th>Child Category</th>
            <th>Brand</th>
            <th>Currency</th>
            <th>Tax Code</th>
            <th>Tax Rate</th>
            <th>SKU</th>
            <th>MSRP</th>
            <th>B2B Price</th>
            <th>Regular Price</th>
            <th>Stock</th> 
            <th>Variants</th> 
            <th width={15}>Status</th>
            {/* <th width={50}>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 &&
            productList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.seller?.name}</td>
                <td>
                <div className="product_img">
                    <img
                      src={`${fileBasePath}${main_thumb_img_path}${item?.main_image}`}
                    />
                  </div>

                </td>
                <td>
                  
                  {item.variants?.withImage == "Yes" ? (
                    <>
                      {item?.variants?.image_1 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path1}${item?.variants?.image_1}`}
                          />
                        </div>
                      )}

                      {item?.variants?.image_2 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path2}${item?.variants?.image_2}`}
                          />
                        </div>
                      )}
                        {item?.variants?.image_3 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path3}${item?.variants?.image_3}`}
                          />
                        </div>
                      )}

                        {item?.variants?.image_4 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path4}${item?.variants?.image_4}`}
                          />
                        </div>
                      )}

                    {item?.variants?.image_5 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path5}${item?.variants?.image_5}`}
                          />
                        </div>
                      )}

                    {item?.variants?.image_6 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path6}${item?.variants?.image_6}`}
                          />
                        </div>
                      )}

                    {item?.variants?.image_7 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${variant_thumb_img_path7}${item?.variants?.image_7}`}
                          />
                        </div>
                      )}

                     
                    </>
                  ) : (
                    <>
                      {item?.image_1 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path1}${item?.image_1}`}
                          />
                        </div>
                      )}

                      {item?.image_2 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path2}${item?.image_2}`}
                          />
                        </div>
                      )}
                      {item?.image_3 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path3}${item?.image_3}`}
                          />
                        </div>
                      )}
                      {item?.image_4 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path4}${item?.image_4}`}
                          />
                        </div>
                      )}
                      {item?.image_5 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path5}${item?.image_5}`}
                          />
                        </div>
                      )}
                      {item?.image_6 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path6}${item?.image_6}`}
                          />
                        </div>
                      )}
                      {item?.image_7 && (
                        <div className="product_img">
                          <img
                            src={`${fileBasePath}${product_thumb_img_path7}${item?.image_7}`}
                          />
                        </div>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <div className="products_name">
                    <a target="_blank" href={`${baseUrl}product-details/${item.slug}?pId=${item._id}&vId=${item.variants?._id}`}
                    style={{color:'#242483', fontWeight:'600'}}>
                      {item.product_name.length > 90
                        ? item.product_name.slice(0, 87) + "..."
                        : item.product_name}
                    </a>
                  </div>
                </td>
                <td>{item.category?.name}</td>
                <td>{item.subcategories?.subCategoryName}</td>
                <td>{item.childcategories?.childCategoryName}</td>
                <td>{item.brand?.name}</td>
                <td>{item.currency}</td>
                <td>{item.taxCode}</td>
                <td>{item.taxRate}</td>
                <td>{item.variants?.sku}</td>
                <td>{getUSFormatAmount(item.variants?.msrp)}</td>
                <td>{getUSFormatAmount(item.variants?.businessSalePrice)}</td>
                <td>{getUSFormatAmount(item.variants?.consumerSalePrice)}</td>
                <td>{item.variants?.stock}</td>
                <td>
                <div style={{width:'120px'}}>
                    {item.variants?.customAttributes && Object.keys(item.variants.customAttributes).length > 0 && 
                    Object.keys(item.variants.customAttributes).map((varinatData, index)=>(
                      <React.Fragment key={index}> <strong>{varinatData} : </strong>{item.variants?.customAttributes[varinatData]}<br /></React.Fragment>
                    ))}
                    </div>
                   
                </td>
                <td>
                  <a href="#" className={`
                    ${item.variants?.approved_status == 1 && "approved" }
                    ${item.variants?.approved_status == 0 && "danger" }
                    ${item.variants?.approved_status == 2 && ".text-warning" }
                    `}>
                    {item.variants?.approved_status == 1 && "Approved" } 
                    {item.variants?.approved_status == 2 && "Pending" }
                    {item.variants?.approved_status == 0 && "Rejected" } 
                    
                  </a>
                </td>
                
                {/* <td>
                  <a href="#">
                    <i className="far fa-trash-alt" />
                  </a>
                </td> */}
              </tr>
            ))}
           
        </tbody>
      </table>
    </div>
  );
}

export default ProductListTable;
