"use client";
import Link from "next/link";
import React, { useState } from "react";
import { baseUrl } from "@/Http/helper";

const KeyAttributes = ({ productDetails, changeVariant }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="key_attributes">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Key attributes</h2>
                {/* <h2 className="title-left"> Key attributes</h2> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" >
              <h6>&nbsp;</h6>
              <div className="additional-information_right_side" style={{height:`${showMore?"auto":"235px"}`, overflow:'hidden'}}>
                <ul>
                  {/* if exist color in variant then show variant color else product color */}
                  {changeVariant.customAttributes?.Color ? (
                    <ul className="info-list ">
                      <li className="info-label">Color</li>
                      <li className="info-value">
                        {changeVariant.customAttributes?.Color}
                      </li>
                    </ul>
                  ) : (
                    productDetails?.color && (
                      <ul className="info-list ">
                        <li className="info-label">Color</li>
                        <li className="info-value">{productDetails.color}</li>
                      </ul>
                    )
                  )}

                  {/* if exist size in variant then show variant size else product size */}
                  {changeVariant.customAttributes?.Size ? (
                    <ul className="info-list ">
                      <li className="info-label">Size</li>
                      <li className="info-value">
                        {changeVariant.customAttributes?.Size}
                      </li>
                    </ul>
                  ) : (
                    productDetails?.size && (
                      <ul className="info-list ">
                        <li className="info-label">Size</li>
                        <li className="info-value">{productDetails.size}</li>
                      </ul>
                    )
                  )}

                  {productDetails?.numberOfItem && (
                    <ul className="info-list ">
                      <li className="info-label">Number of Item</li>
                      <li className="info-value">
                        {productDetails.numberOfItem}
                      </li>
                    </ul>
                  )}

                  {productDetails?.material && (
                    <ul className="info-list ">
                      <li className="info-label">Material</li>
                      <li className="info-value">{productDetails.material}</li>
                    </ul>
                  )}
                  {productDetails?.pettern && (
                    <ul className="info-list ">
                      <li className="info-label">Pattern</li>
                      <li className="info-value">{productDetails.pettern}</li>
                    </ul>
                  )}
                  {productDetails?.unit_coun && (
                    <ul className="info-list ">
                      <li className="info-label">Unit Count</li>
                      <li className="info-value">
                        {productDetails.unit_coun}{" "}
                        {productDetails.unit_count_type}
                      </li>
                    </ul>
                  )}
                  {productDetails?.item_type_name && (
                    <ul className="info-list ">
                      <li className="info-label">Item Type Name</li>
                      <li className="info-value">
                        {productDetails.item_type_name}
                      </li>
                    </ul>
                  )}
                  {productDetails?.recommanded_use && (
                    <ul className="info-list ">
                      <li className="info-label">Recommanded Use</li>
                      <li className="info-value">
                        {productDetails.recommanded_use}
                      </li>
                    </ul>
                  )}
                  {productDetails?.model_name && (
                    <ul className="info-list ">
                      <li className="info-label">Model Name</li>
                      <li className="info-value">
                        {productDetails.model_name}
                      </li>
                    </ul>
                  )}
                  {productDetails?.model_number && (
                    <ul className="info-list ">
                      <li className="info-label">Model Number</li>
                      <li className="info-value">
                        {productDetails.model_number}
                      </li>
                    </ul>
                  )}

                  {changeVariant.sin && (
                    <ul className="info-list ">
                      <li className="info-label">SIN</li>
                      <li className="info-value">{changeVariant.sin}</li>
                    </ul>
                  )}

                  {productDetails?.manufacture_part_number && (
                    <ul className="info-list ">
                      <li className="info-label">Manufacture Part Number</li>
                      <li className="info-value">
                        {productDetails.manufacture_part_number}
                      </li>
                    </ul>
                  )}

                  {productDetails?.manufacturer_details && (
                    <ul className="info-list ">
                      <li className="info-label">Manufacturer</li>
                      <li className="info-value">
                        {productDetails.manufacturer_details}
                      </li>
                    </ul>
                  )}
                  {productDetails?.packer_details && (
                    <ul className="info-list ">
                      <li className="info-label">Packer Contact Information</li>
                      <li className="info-value">
                        {productDetails.packer_details}
                      </li>
                    </ul>
                  )}
                  {productDetails?.importer_details && (
                    <ul className="info-list ">
                      <li className="info-label">Importer Details</li>
                      <li className="info-value">
                        {productDetails.importer_details}
                      </li>
                    </ul>
                  )}

                  {productDetails?.product_length && (
                    <ul className="info-list ">
                      <li className="info-label">Product Dimensions</li>
                      <li className="info-value">
                        {productDetails.product_length}{" "}
                        {productDetails.product_length_unit} x{" "}
                        {productDetails.product_width}{" "}
                        {productDetails.product_width_unit} x{" "}
                        {productDetails.productHeight}{" "}
                        {productDetails.productHeightUnit};{" "}
                        {productDetails.product_weight}{" "}
                        {productDetails.product_weight_unit}
                      </li>
                    </ul>
                  )}

                  {productDetails?.packageLength && (
                    <ul className="info-list ">
                      <li className="info-label">Package Dimensions</li>
                      <li className="info-value">
                        {productDetails.packageLength}{" "}
                        {productDetails.packageLengthUnit} x{" "}
                        {productDetails.packageWidth}{" "}
                        {productDetails.packageWidthUnit} x{" "}
                        {productDetails.packageHeight}{" "}
                        {productDetails.packageHeightUnit};{" "}
                        {productDetails.packageWeight}{" "}
                        {productDetails.packageWeightUnit}
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
              <div
                    className="show-more"
                    onClick={() => setShowMore(!showMore)}
                    style={{fontWeight:600, cursor:"pointer", color:"#000"}}
                  >
                    ({showMore ? "Show Less" : "Show more"})
                  </div>
            </div>

            <div className="col-lg-6">
              <h6>&nbsp;</h6>
              <div className="additional-information_right_side">
                <ul>
                  {productDetails?.compliance?.containsLiquidContents && (
                   

                        <ul className="info-list ">
                        <li className="info-label">Contains Liquid Contents</li>
                        <li className="info-value">
                        {productDetails?.compliance?.containsLiquidContents}
                        </li>
                        </ul>


                  )}
                  {productDetails?.compliance?.liquidVolume && (
                     
                      <ul className="info-list ">
                      <li className="info-label">Liquid Volume</li>
                      <li className="info-value">
                      {productDetails?.compliance?.liquidVolume}{" "}
                        {productDetails?.compliance?.liquidVolumeUnit}
                      </li>
                      </ul>
                  )}

                  {productDetails?.compliance?.isTheItemHeaSensitive && (
                   
                        <ul className="info-list ">
                        <li className="info-label">Is the Item Heat Sensitive</li>
                        <li className="info-value">
                        {productDetails?.compliance?.isTheItemHeaSensitive}
                        </li>
                        </ul>

                  )}
                  {productDetails?.compliance
                    ?.isTheItemHeaSensitiveInstructions && (
                   

                    <ul className="info-list ">
                    <li className="info-label">Instructions</li>
                    <li className="info-value">
                    {
                  productDetails?.compliance
                    .isTheItemHeaSensitiveInstructions
                }{" "}
                    </li>
                    </ul>
                  )}
                  {productDetails?.compliance
                    ?.isTheLiquidProductDoubleSealed && (
                     
                     <ul className="info-list ">
                     <li className="info-label">Is the liquid product double sealed?</li>
                     <li className="info-value">
                     {
                        productDetails?.compliance
                          .isTheLiquidProductDoubleSealed
                      }
                     </li>
                     </ul>
                  )}
                  {productDetails?.compliance
                    ?.isTheLiquidProductDoubleSealedInstructions && (
                  

                    <ul className="info-list ">
                    <li className="info-label">Instructions</li>
                    <li className="info-value">
                    {
                                            productDetails?.compliance
                                              .isTheLiquidProductDoubleSealedInstructions
                                          }
                    </li>
                    </ul>

                  )}

                  {productDetails?.compliance?.dangerousGoodsRegulations && (
                   
                    <ul className="info-list ">
                    <li className="info-label">Dangerous Goods Regulations</li>
                    <li className="info-value">
                    {productDetails?.compliance.dangerousGoodsRegulations}
                    </li>
                    </ul>
                  )}

                  {productDetails?.compliance?.safetyWarning && ( 
                    <ul className="info-list ">
                    <li className="info-label">Safety Warning</li>
                    <li className="info-value">
                    {productDetails?.compliance.safetyWarning}
                    </li>
                    </ul>
                  )}

                  {productDetails?.compliance?.hasWrittenWarranty && ( 
                    <ul className="info-list ">
                    <li className="info-label">Has Written Warranty</li>
                    <li className="info-value">
                    {productDetails?.compliance.hasWrittenWarranty}
                    </li>
                    </ul>
                  )}

                  {productDetails?.compliance
                    ?.ProductIsOrContainsAnElectronicComponent && (
                    

                        <ul className="info-list ">
                        <li className="info-label">Product is or Contains an Electronic Component?{" "}</li>
                        <li className="info-value">
                        {
                            productDetails?.compliance
                              .ProductIsOrContainsAnElectronicComponent
                          }
                        </li>
                        </ul>

                  )}
                  {productDetails?.compliance
                    ?.productIsOrContainsThisBatteryType && (
                  

                        <ul className="info-list ">
                        <li className="info-label">Product is or Contains this Battery Type?</li>
                        <li className="info-value">
                        {
                              productDetails?.compliance
                                .productIsOrContainsThisBatteryType
                            }
                        </li>
                        </ul>

                  )}

                  {productDetails?.compliance
                    ?.productIsOrContainsThisBatteryType == "Yes" &&
                    productDetails?.compliance?.areBatteriesIncluded && (
                     

                      <ul className="info-list ">
                      <li className="info-label">Are batteries included?</li>
                      <li className="info-value">
                      {productDetails?.compliance.areBatteriesIncluded}
                      </li>
                      </ul>

                    )}

                  {productDetails?.compliance
                    ?.productIsOrContainsThisBatteryType == "Yes" &&
                    productDetails?.compliance?.areBatteriesIncluded ==
                      "Yes" && (
                      

                  <ul className="info-list ">
                  <li className="info-label">Battery Cell Composition</li>
                  <li className="info-value">
                  {productDetails?.compliance.batteryCellComposition}
                  </li>
                  </ul>
                    )}
                </ul>

                <ul>
                  {productDetails?.dynamicFields?.map((item, index) =>
                    item.field_value && item.field_value?.trim() !== "" ? ( 
                    <ul className="info-list " key={index}>
                    <li className="info-label">{item.field_name}</li>
                    <li className="info-value">
                    {item.field_value}
                    </li>
                    </ul>
                    ) : null
                  )}
                </ul>
              </div>
              
            </div>
           
           
            {/* <div className="col-lg-6">
             

              <div className="additional-information">
                {productDetails?.dynamicFields.filter(
                  (item) => item.field_value && item.field_value.trim() !== ""
                ).length > 5 ? (
                  <div
                    className="text show-more-height"
                    style={{ height: `${showMore ? "auto" : ""}` }}
                  >
                    <ul>
                      {productDetails?.dynamicFields?.map((item, index) =>
                        item.field_value && item.field_value?.trim() !== "" ? (
                          <li key={index}>
                            <span>{item.field_name}</span> {item.field_value}
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                {productDetails?.dynamicFields.filter(
                  (item) => item.field_value && item.field_value.trim() !== ""
                ).length > 5 ? (
                  <div
                    className="show-more"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show more"}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div> */}
            {/* <div className="col-lg-6">
          <h6>&nbsp;</h6>
          <div className="additional-information_right_side">
            <ul>

            {productDetails && productDetails.keyAttributes.length>0? productDetails.keyAttributes.map((item, index)=>(
                  item.key_value !=""?(
                    <li key={index}>
                      <span>{item.key_attribute}</span> {item.key_value}
                  </li>
                  ):null
                  
                )):''}
               
            </ul>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default KeyAttributes;
