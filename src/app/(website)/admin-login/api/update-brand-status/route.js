import mongoose from 'mongoose';
import { connectDb } from '../../../../../../lib/dbConnect';
import { brandModel, brandSellerModel } from '@/Http/Models/branModel';

export async function POST(req, res) {  
  await connectDb();
      const { brandId, status, remarks } = await req.json();
      
      if (!brandId) {
        return new Response(
          JSON.stringify({ success: false, message: 'Brand ID is required.' }),
          { status: 404 }
        );
      }

      const session = await mongoose.startSession();
      session.startTransaction()
      try { 

        const updatedBrand = await brandSellerModel.findByIdAndUpdate(
          brandId,
          { status, remarks,approve_Date: new Date() },
          { new: true }
        );
        
        if (!updatedBrand) {
          return new Response(
            JSON.stringify({ success: false, message: 'Brand not found.' }),
            { status: 404 }
          );
        }
  
        const brandName = new RegExp(`^${updatedBrand.name}$`, 'i')
        const existBrand = await brandModel.findOne({
          name: brandName
        });
        if(!existBrand){
          // if not exist brand then add in brand collect
           await brandModel.create({
            name:updatedBrand.name,
            slug:updatedBrand.slug,
            status:1,
            seller_ids:[updatedBrand.seller_id],
          })
        }else{
          // if already exist brand then add add selleer id
          const sellerIds = existBrand.seller_ids || [];
          if (!sellerIds.includes(updatedBrand.seller_id)) {
            sellerIds.push(updatedBrand.seller_id);
          }

          await brandModel.findByIdAndUpdate(
            existBrand._id,
            { 
              seller_ids: sellerIds,
            },
            { new: true } 
          )

        }
        session.commitTransaction();
        return new Response(
            JSON.stringify({ success: true, message: updatedBrand }),
            { status: 200 }
          );
      } catch (error) {
        console.log(error);
        session.abortTransaction();
        return new Response(
            JSON.stringify({ success: true, message: 'Error updating brand status' }),
            { status: 500 }
          );
      }
  }