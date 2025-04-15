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
            <div className="col-lg-6">
              <h6>&nbsp;</h6>
              <div className="additional-information_right_side">
                <ul>
                  {/* if exist color in variant then show variant color else product color */}
                 { changeVariant.customAttributes?.Color ? (
                    <li>
                        <span>Color</span> {changeVariant.customAttributes?.Color}
                    </li>
                  ):productDetails?.color && (
                    <li>
                      <span>Color</span> {productDetails.color}
                    </li>
                  )
                  }

                {/* if exist size in variant then show variant size else product size */}
              { changeVariant.customAttributes?.Size ? (
                    <li>
                        <span>Size</span> {changeVariant.customAttributes?.Size}
                    </li>
                  ):
                  productDetails?.size && (
                    <li>
                      <span>Size</span> {productDetails.size}
                    </li>
                  )
                  }

                  
              
                  
                

                  {productDetails?.numberOfItem && (
                    <li>
                      <span>Number of Item</span> {productDetails.numberOfItem}
                    </li>
                  )}

              {productDetails?.material && (
                    <li>
                      <span>Material</span> {productDetails.material}
                    </li>
                  )}
                  {productDetails?.pettern && (
                    <li>
                      <span>Pattern</span> {productDetails.pettern}
                    </li>
                  )}
                  {productDetails?.unit_coun && (
                    <li>
                      <span>Unit Count</span>
                      {productDetails.unit_coun}{" "}
                      {productDetails.unit_count_type}
                    </li>
                  )}
                  {productDetails?.item_type_name && (
                    <li>
                      <span>Item Type Name</span>
                      {productDetails.item_type_name}
                    </li>
                  )}
                  {productDetails?.recommanded_use && (
                    <li>
                      <span>Recommanded Use</span>
                      {productDetails.recommanded_use}
                    </li>
                  )}
                  {productDetails?.model_name && (
                    <li>
                      <span>Model Name</span>
                      {productDetails.model_name}
                    </li>
                  )}
                  {productDetails?.model_number && (
                    <li>
                      <span>Model Number</span>
                      {productDetails.model_number}
                    </li>
                  )}

                  {changeVariant.sin && (
                    <li>
                        <span>SIN</span> {changeVariant.sin}
                    </li>
                  )}

                  {productDetails?.manufacture_part_number && (
                    <li>
                      <span>Manufacture Part Number</span>
                      {productDetails.manufacture_part_number}
                    </li>
                  )}

                  {productDetails?.manufacturer_details && (
                    <li>
                      <span>Manufacturer </span>
                      {productDetails.manufacturer_details}
                    </li>
                  )}
                  {productDetails?.packer_details && (
                    <li>
                      <span>Packer Contact Information</span>{" "}
                      {productDetails.packer_details}
                    </li>
                  )}
                  {productDetails?.importer_details && (
                    <li>
                      <span>Importer Details</span>
                      {productDetails.importer_details}
                    </li>
                  )}
                  {productDetails?.product_length && (
                    <li>
                      <span>Product Dimensions </span>
                      {productDetails.product_length}{" "}
                      {productDetails.product_length_unit} x{" "}

                      {productDetails.product_width}{" "}
                      {productDetails.product_width_unit} x{" "}

                      {productDetails.productHeight}{" "}
                      {productDetails.productHeightUnit}; {" "}

                      {productDetails.product_weight}{" "}
                      {productDetails.product_weight_unit}
                    </li>
                  )}

                  
 
                  {productDetails?.packageLength && (
                    <li>
                      <span>Package Dimensions</span>
                      {productDetails.packageLength}{" "}
                      {productDetails.packageLengthUnit} x{" "}

                      {productDetails.packageWidth}{" "}
                      {productDetails.packageWidthUnit} x{" "}

                      {productDetails.packageHeight}{" "}
                      {productDetails.packageHeightUnit};{" "}

                      {productDetails.packageWeight}{" "}
                      {productDetails.packageWeightUnit}

                    </li>
                  )}

                    
                </ul>
              </div>
            </div>


            <div className="col-lg-6">
              <h6>&nbsp;</h6>
              <div className="additional-information_right_side">
                <ul>
                  {productDetails?.compliance?.containsLiquidContents && (
                    <li>
                      <span>Contains Liquid Contents</span> {productDetails?.compliance?.containsLiquidContents}
                    </li>
                  )}
                  {productDetails?.compliance?.liquidVolume && (
                    <li>
                      <span>Liquid Volume</span> {productDetails?.compliance?.liquidVolume} {productDetails?.compliance?.liquidVolumeUnit}
                    </li>
                  )}

                  {productDetails?.compliance?.isTheItemHeaSensitive && (
                    <li>
                      <span>Is the Item Heat Sensitive</span> {productDetails?.compliance?.isTheItemHeaSensitive}
                    </li>
                  )}
                  {productDetails?.compliance?.isTheItemHeaSensitiveInstructions && (
                    <li>
                      <span>Instructions</span>
                      {productDetails?.compliance.isTheItemHeaSensitiveInstructions}{" "} 
                    </li>
                  )}
                  {productDetails?.compliance?.isTheLiquidProductDoubleSealed && (
                    <li>
                      <span>Is the liquid product double sealed?</span>
                      {productDetails?.compliance.isTheLiquidProductDoubleSealed}
                    </li>
                  )}
                  {productDetails?.compliance?.isTheLiquidProductDoubleSealedInstructions && (
                    <li>
                      <span>Instructions</span>
                      {productDetails?.compliance.isTheLiquidProductDoubleSealedInstructions}
                    </li>
                  )}

                  {productDetails?.compliance?.dangerousGoodsRegulations && (
                    <li>
                      <span>Dangerous Goods Regulations</span>
                      {productDetails?.compliance.dangerousGoodsRegulations}
                    </li>
                  )}

                  {productDetails?.compliance?.safetyWarning && (
                    <li>
                      <span>Safety Warning</span>
                      {productDetails?.compliance.safetyWarning}
                    </li>
                  )}

                  {productDetails?.compliance?.hasWrittenWarranty && (
                    <li>
                      <span>Has Written Warranty</span>
                      {productDetails?.compliance.hasWrittenWarranty}
                    </li>
                  )}

                  {productDetails?.compliance?.ProductIsOrContainsAnElectronicComponent && (
                    <li>
                      <span>Product is or Contains an Electronic Component? </span>
                      {productDetails?.compliance.ProductIsOrContainsAnElectronicComponent}
                    </li>
                  )}
                  {productDetails?.compliance?.productIsOrContainsThisBatteryType && (
                    <li>
                      <span>Product is or Contains this Battery Type?</span>{" "}
                      {productDetails?.compliance.productIsOrContainsThisBatteryType}
                    </li>
                  )}  


                {productDetails?.compliance?.productIsOrContainsThisBatteryType == "Yes" && productDetails?.compliance?.areBatteriesIncluded && (
                    <li>
                      <span>Are batteries included?</span>{" "}
                      {productDetails?.compliance.areBatteriesIncluded}
                    </li>
                  )}  

                {productDetails?.compliance?.productIsOrContainsThisBatteryType == "Yes" && productDetails?.compliance?.areBatteriesIncluded == "Yes" && (
                    <li>
                      <span>Battery Cell Composition</span>{" "}
                      {productDetails?.compliance.batteryCellComposition}
                    </li>
                  )}  

 
                  
                </ul>
              
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
