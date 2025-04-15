import { NextResponse } from "next/server";  
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// const crypto = require('crypto');
// require('dotenv').config();

export const fetcher = (url) => fetch(url).then((res) => res.json());

const algorithm = 'aes-256-cbc';  
const secretKey = process.env.SECRET_KEY || "12hfyutrferhji876tyhgfrtuioldsde";  
const iv = crypto.randomBytes(16);  

export function encryptText(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
      iv: iv.toString('hex'),
      data: encrypted.toString('hex')
  };
}

export function decryptText(encrypted) {
 
  const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey),
      Buffer.from(encrypted.iv, 'hex')  
  );
  const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted.data, 'hex')),  
      decipher.final()
  ]);
  return decrypted.toString();  
}

export const baseUrl = "http://localhost:3000/"

// product image Path
export const main_thumb_img_path = "uploads/product/main_image/thumb/"
export const main_medium_img_path = "uploads/product/main_image/medium/"
export const main_large_img_path = "uploads/product/main_image/large/"

export const product_thumb_img_path1 = "uploads/product/img1/thumb/"
export const product_medium_img_path1 = "uploads/product/img1/medium/"
export const product_large_img_path1 = "uploads/product/img1/large/"

export const product_thumb_img_path2 = "uploads/product/img2/thumb/"
export const product_medium_img_path2 = "uploads/product/img2/medium/"
export const product_large_img_path2 = "uploads/product/img2/large/"

export const product_thumb_img_path3 = "uploads/product/img3/thumb/"
export const product_medium_img_path3 = "uploads/product/img3/medium/"
export const product_large_img_path3 = "uploads/product/img3/large/"

export const product_thumb_img_path4 = "uploads/product/img4/thumb/"
export const product_medium_img_path4 = "uploads/product/img4/medium/"
export const product_large_img_path4 = "uploads/product/img4/large/"

export const product_thumb_img_path5 = "uploads/product/img5/thumb/"
export const product_medium_img_path5 = "uploads/product/img5/medium/"
export const product_large_img_path5 = "uploads/product/img5/large/"

export const product_thumb_img_path6 = "uploads/product/img6/thumb/"
export const product_medium_img_path6 = "uploads/product/img6/medium/"
export const product_large_img_path6 = "uploads/product/img6/large/"

export const product_thumb_img_path7 = "uploads/product/img7/thumb/"
export const product_medium_img_path7 = "uploads/product/img7/medium/"
export const product_large_img_path7 = "uploads/product/img7/large/"

//  variant image path 
export const variant_thumb_img_path1 = "uploads/variant/img1/thumb/"
export const variant_medium_img_path1 = "uploads/variant/img1/medium/"
export const variant_large_img_path1 = "uploads/variant/img1/large/"

export const variant_thumb_img_path2 = "uploads/variant/img2/thumb/"
export const variant_medium_img_path2 = "uploads/variant/img2/medium/"
export const variant_large_img_path2 = "uploads/variant/img2/large/"

export const variant_thumb_img_path3 = "uploads/variant/img3/thumb/"
export const variant_medium_img_path3 = "uploads/variant/img3/medium/"
export const variant_large_img_path3 = "uploads/variant/img3/large/"

export const variant_thumb_img_path4 = "uploads/variant/img4/thumb/"
export const variant_medium_img_path4 = "uploads/variant/img4/medium/"
export const variant_large_img_path4 = "uploads/variant/img4/large/"

export const variant_thumb_img_path5 = "uploads/variant/img5/thumb/"
export const variant_medium_img_path5 = "uploads/variant/img5/medium/"
export const variant_large_img_path5 = "uploads/variant/img5/large/"

export const variant_thumb_img_path6 = "uploads/variant/img6/thumb/"
export const variant_medium_img_path6 = "uploads/variant/img6/medium/"
export const variant_large_img_path6 = "uploads/variant/img6/large/"

export const variant_thumb_img_path7 = "uploads/variant/img7/thumb/"
export const variant_medium_img_path7 = "uploads/variant/img7/medium/"
export const variant_large_img_path7 = "uploads/variant/img7/large/"


export function getPricingLabel(price) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const isEmpty = (value) => !value || value.trim() === '';

 
export function getUSFormatAmount(amount){ 
  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  return formattedAmount
}

export const formatSlugToName = (slug) => {
  return slug
    .split("-") // Split by hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join words with spaces
};

  export function sendSMSFunction(templeteId, message){

    return true
  }

  export const dynamincOtp =(from, to)=>{
        return Math.floor(from + Math.random() * to);
    }

    export const responseFun=(status = false, data = null, status_code = 500)=> {
        return NextResponse.json(
          { status, data },
          { status: status_code }
        )
    }


    export const decodeJwt = (token) => {
        try {
          // Decode the JWT without verifying the signature
          const decoded = jwt.decode(token);
          return decoded;
        } catch (error) {
          console.error('Error decoding JWT:', error);
          return null;
        }
      };
   
export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function slugify(text) {
  return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') 
      .replace(/[^\w\-]+/g, '') 
      .replace(/\-\-+/g, '-');  
}

export const dateConvertInDateTime = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date); 
  return formattedDate;
};


export const dateFormat=(requestDateFormate) =>{

  const fullDate = new Date(requestDateFormate);
  const date = fullDate.getDate()
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  return `${date}/${month.toString().padStart(2,"0")}/${year}`
}


export function getVariantAttribute(value){
  const currArray = {
    'colorId':'Color', 
    'sizeId':'Size',
    'itemBreadthId':'Breadth',
    'itemHeightId':'Height',
    'itemLengthId':'Length',
    'itemWeightId':'Weight',
    'packageBreadthId':'Package Breadth',
    'packageHeightId':'Package Height',
    'packageLengthId':'Package Length',
    'packageWeightId':'Package Weight',
  };
  return currArray[value];
}



export const createFormData =(data)=>{
  const formData = new FormData();
    Object.entries(data).forEach(([key, value])=>{
      if(value instanceof File){
        formData.append(key, value);
      }else if(typeof value =="object" && value != ""){
        formData.append(key, JSON.stringify(value))
      }else{
        formData.append(key, value);
      }
    })
    return formData
 }



 export const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
 export function dateValidateConverter(date){
  const currentDate = new Date(date);
  // const todayDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate() }`; 
  const formatedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  return formatedDate;
}

export function variantArrayFormat(variantList){
  const uniquKeys = [];
  variantList.forEach((variant) => {
    if(!variant.customAttributes){
      return []
    }
      Object.keys(variant.customAttributes).forEach((variantItem)=>{ 
        if(!uniquKeys.includes(variantItem) && variant.customAttributes[variantItem] != ""){
          uniquKeys.push(variantItem)
        } 
      })
  })

  const attributeArr = {}; 
  if (uniquKeys.length > 0) {
    uniquKeys.forEach((keyName) => {
      variantList.forEach((variant) => {
        // const variantValue = variant.customAttributes[keyName]; 
        const newValue = variant.customAttributes[keyName]; 
        const variantValue = {
                    _id : variant._id,
                    productId : variant.product_id,
                    varientId : variant._id,
                    name:  keyName,
                    value:newValue,
                    withImage: variant.withImage,
                    image_1: variant.image_1,
                    image_2: variant.image_2,
                    image_3: variant.image_3,
                    image_4: variant.image_4,
                    businessSalePrice:variant.businessSalePrice,
                    consumerSalePrice:variant.consumerSalePrice,
                    currency:variant.currency,
                    fulfillmentBy:variant.fulfillmentBy,
                    msrp:variant.msrp,
                    shippingProvider:variant.shippingProvider,
                    sku:variant.sku,
                    stock:variant.stock,
                    taxCode:variant.taxCode,
                    taxRate:variant.taxRate
                }; 

                if (!attributeArr[keyName]) {
                  attributeArr[keyName] = [];
                } 
                const filterOldAddedData = attributeArr[keyName].some((dataItem) => dataItem.value === newValue); 
                if (!filterOldAddedData) {
                  attributeArr[keyName].push(variantValue);
                }
      });
    });
  }

 
  return attributeArr

} 

export function currencyCode(currencyCode){
  if(currencyCode=='USD'){
     return "$";
  }
  return "$";
}



export function getOffPrecentage(oldPrice, currentPrice){ 
  const onePercentage = oldPrice/100; 
  const offAmount = oldPrice-currentPrice;
  const offperCentage = offAmount/onePercentage;
  return offperCentage;
}

export function getPrecentageAmount(amount, percentage){ 
  const onePercentage = amount/100; 
  const offAmount = onePercentage*percentage; 
  return offAmount;
}

export function getStatus(status){
  const statusString = {
    '0': 'Deactived',
    '1': 'Actived',
    '2': 'Draft',
    '3': 'Archived',
    '4': 'Deleted',
  };

  return statusString[status];
}

export function capitalizeLetter(string) {
  if (!string) return ""; 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getSizeName(size) {
  const sizeString = {
      'M': 'Medium',
      'L': 'Large',
      'S': 'Small',
      'XL': 'Extra Large',
      'XS': 'Extra Small',
      'XXL': 'Double Extra Large',
  };

  return sizeString[size] || 'Unknown Size';  
}

export function showNotification(message){

  let containerElement = document.querySelector('.popup-container');

  if (!containerElement) {
    containerElement = document.createElement('div');
    containerElement.classList.add('popup-container');
    document.body.append(containerElement);
  } 

  let popupElement = document.createElement('div');
  popupElement.classList.add('popup'); let textElement = document.createElement('div');
  textElement.classList.add('popup-text');
  textElement.innerHTML = message;

  popupElement.appendChild(textElement);
  containerElement.appendChild(popupElement);

  setTimeout(() => {
    popupElement.remove();
  }, 3000);
}

 

export function getBasePrice(amountIncludingGST, tax){ 
  const basePrice = amountIncludingGST / (1 + tax / 100);
  return basePrice
  }
  
  export function discountPrice(priceAmount, discount, discountType="percentage"){ 
      if(discountType == "percentage"){
        const discountAmount = (priceAmount/100) *discount;
        return (priceAmount - discountAmount)
      }else{
        return (priceAmount - discount) 
      } 
  }