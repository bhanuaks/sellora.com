import React, { useState, useEffect } from "react";
import { baseUrl, getVariantAttribute, variantArrayFormat, currencyCode, capitalizeLetter, getSizeName, variant_thumb_img_path1, discountPrice } from "@/Http/helper";
import Image from "next/image";
import { elements } from "../../../../../../public/assets-admin/assets/libs/chart.js/chart.umd";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/(website)/contaxtData/cartContaxt";
import { fileBasePath } from "@/Http/urlHelper";

const VariantList = ({ attributes, setChangeVariant, setOnClickVarient,
  variantArrayList,
  selectedVariant,
  setSelectedVariant,
  variantId,
  productDetails
}) => {

  const router = useRouter();
  const {user} = useCart()
  const [activeVariants, setActiveVariants] = useState({});
  const [changeVariant, setChangeVariantLocal] = useState({});
  const [variantListAfterClick, setVariantListAfterClick] = useState([]);
  const [threshold, setThreshold] = useState([]);
  const [thresholdType, setThresholdType] = useState(""); 

  useEffect(() => {
    if (variantArrayList.length > 0) {
      let firstVariant = variantArrayList[0]
      if (variantId) {
        firstVariant = variantArrayList.filter((variantItem) => variantItem._id == variantId)[0] || null;
      }
      setThreshold(firstVariant.threshold)
      setThresholdType(firstVariant.discount_type)
      selectDefaultVariant(firstVariant)
      
    }

  }, [variantArrayList.length, attributes.length])


  function selectDefaultVariant(variant) {
    const firstVariant = variant
    setSelectedVariant((preData) => ({
      ...preData,
      variant_id: firstVariant._id
    }))

    Object.keys(attributes).map((item) => {
      setSelectedVariant((preData) => ({
        ...preData,
        [item]: firstVariant[capitalizeLetter(item)]
      }))
      setOnClickVarient((prev) => ({ ...prev, [item]: firstVariant[capitalizeLetter(item)] }));
    })
     
    setChangeVariantLocal(firstVariant)
    setChangeVariantLocal(firstVariant);
    setChangeVariant(firstVariant);
    
 

  }

  useEffect(() => {
    $('.disabled_variant').removeClass('disabled_variant')
    disabledNotExistVariants()
  }, [selectDefaultVariant])

  function disabledNotExistVariants() {

    Object.keys(attributes).map((variantName) => {

      const vValue = selectedVariant[variantName]

      const availableVariant = variantArrayList.filter((filterItem) => {
        return filterItem[capitalizeLetter(variantName)] == vValue
      })

      Object.keys(attributes).map((variantNameInnner) => {
        if (variantNameInnner != variantName) {
          const elements = document.querySelectorAll(`.variant_${variantNameInnner}_class`);
          elements.forEach((element) => {
            const displayValue = element.getAttribute('valueattr')
            const filereData = availableVariant.filter((filterItem) => {
              return filterItem[capitalizeLetter(variantNameInnner)] == displayValue
            })

            if (filereData.length == 0) {
              element.classList.add("disabled_variant");
            }

            //  console.log(variantNameInnner,displayValue);
          });
        }
      })
    })
  }
  function changeVariantData(variant_name, variant_value) {
    const oldVariant = selectedVariant;
    oldVariant[variant_name] = variant_value;
    // check variant in variant list
    const filterVariantSelected = variantArrayList.filter((item) => {
      return Object.keys(oldVariant).every((element) => {
        if (element !== "variant_id") {
          return item[capitalizeLetter(element)] === selectedVariant[element];
        }
        return true;
      });
    });
    // select variant form list  
    if (filterVariantSelected.length > 0) {
      // if has selected variant
      router.push(`${baseUrl}/product-details/${productDetails.slug}?pId=${productDetails._id}&vId=${filterVariantSelected[0]._id}`)
      selectDefaultVariant(filterVariantSelected[0])
    } else {
      // else selected default variant

      const filtersItem = variantArrayList.filter((item) => {
        return item[capitalizeLetter(variant_name)] == variant_value;
      });
      router.push(`${baseUrl}/product-details/${productDetails.slug}?pId=${productDetails._id}&vId=${filtersItem[0]._id}`)
      selectDefaultVariant(filtersItem[0])
    }

  }


  const handleColorClick = (key, item) => {
     
    if (activeVariants[key] === item._id) {

    } else {
      setActiveVariants((prev) => ({ ...prev, [key]: item._id }));

      fetchVariant(
        {
          'productId': item.productId,
          'variantValueId': item._id
        }
      );
      // api end
      setChangeVariantLocal(item);
      setChangeVariant(item);
      setOnClickVarient((prev) => ({ ...prev, [key]: item.name }));

    }
  };

  const fetchVariant = async (filters = {}) => {
    try {
      const url = new URL(`${baseUrl}/api/product-details/filter-variant?`);

      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          url.searchParams.append(key, filters[key]);
        }
      });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      //  setProductDetails(data.data.productData);
      setVariantListAfterClick(data.data.variantList);

    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }


  const setAttributesCheck = variantListAfterClick.length > 0 ? variantArrayFormat(variantListAfterClick) : attributes;


  return (
    <>
      <style>
        {`
          .disabled_variant {
            opacity: 0.5!important;
            cursor: not-allowed;
          }
        `}
      </style>
      {/* Price Details */}
      <div className="price_box_details">
        <ul>
          <li>
            <span>MSRP</span>:
            <span className="price_details_old" id="msrp">{changeVariant.msrp ? `${currencyCode(changeVariant.currency)} ${changeVariant.msrp}` : `${currencyCode(changeVariant.currency)} 15`}</span>
          </li>
          <li>
            <span>Sale price</span>:
            {user?.role_consumer_business == "Business" ?( 
              <span className="price_details" id="consumerSalePrice"> {changeVariant.businessSalePrice ? `${currencyCode(changeVariant.currency)} ${changeVariant.businessSalePrice}` : `${currencyCode(changeVariant.currency)} 0`}</span>
            ):(
              <span className="price_details" id="consumerSalePrice"> {changeVariant.consumerSalePrice ? `${currencyCode(changeVariant.currency)} ${changeVariant.consumerSalePrice}` : `${currencyCode(changeVariant.currency)} 0`}</span>

            )}
          </li>
        </ul>
      </div>

      {/* threshold discount */}
       
      {(user?.role_consumer_business == "Business") && ( threshold && threshold.length > 0 && threshold[0].unit > 0 )? (
        <table className="table_2">
          <tbody>
            <tr>
              <td className="firest">Grab More :</td>
              {threshold.map((data, index)=>(
                <td key={index}><div className="piece"><span>(Piece)</span> {data.unit}- {threshold[index+1]?threshold[index+1].unit-1:"Above"}</div></td>
              ))}
              
            </tr>
            <tr>
              <td className="firest">Pay Less :</td>
              {threshold.map((data, index)=>(
                <td key={index} >
                 <span className="pay-less"> ${discountPrice(changeVariant.businessSalePrice, data.discount, thresholdType)} </span>
                  {/* {thresholdType == "percentage"?(
                    <span className="pay-less">{data.discount}%</span>
                  ):(
                    <span className="pay-less">${data.discount}</span>
                  )} */}
                 
                  </td>
              ))}
              
            </tr>
          </tbody>
        </table>
      ) : null}



      {Object.keys(attributes).map((key) => (
        <div key={key}>
          <div className="color_outer">
            <p>
              <span>{key.toUpperCase()}: {key === "size" ? getSizeName(selectedVariant[key]) : selectedVariant[key]}</span>
            </p>
          </div>
          <div className="colo_list_outer22">

            {attributes[key].map((item) => (
              (key === "Color" || key === "Colour") && item.withImage == "Yes" ? (
                <div
                  key={item._id}
                  className={`color_outer_list variant_${key}_class ${selectedVariant[key] === item.value ? "active_color" : ""
                    } 
                  ${item.stock === 0 ? "disabled_variant" : ""}
                  ${setAttributesCheck[key]?.some(attr => attr._id === item._id) ? "" : "disabled_variant"}
                  `
                  }
                  valueattr={item.value}
                  onClick={() => changeVariantData(key, item.value)}
                >
                  <Image width={0} height={0} src={`${fileBasePath}${variant_thumb_img_path1}${item.image_1}`} 
                  loading="lazy"
                  sizes="100vw"
                  style={{width:"auto", height:"auto"}}
                  alt="Variant"
                  /> 

                </div>

              ) : (
                <div
                  key={item._id}
                  className={`color_outer_list  variant_${key}_class ${selectedVariant[key] === item.value ? "active_color" : ""
                    }  
                  ${item.stock === 0 ? "disabled_variant" : ""}
                    ${setAttributesCheck[key]?.some(attr => attr._id === item._id) ? "" : "disabled_variant"}
                  `}
                  valueattr={item.value}
                  onClick={() => changeVariantData(key, item.value)}
                >
                  {item.value}
                </div>
              )
            ))}

          </div>
          <div className="clear" />
        </div>
      ))}

      <div className="clear" />
    </>
  );
};

export default VariantList;
