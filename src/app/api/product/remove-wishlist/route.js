import { responseFun } from "@/Http/helper";
import { wishlistModel } from "@/Http/Models/wishlistModel";
import mongoose from "mongoose";


export async function GET(req) {


    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');
    //console.log('useriddddd', user_id)
    try {
        if (user_id) {
            const wishlist = await wishlistModel.find({ user_id: user_id });
            //console.log(wishlist)
            if (wishlist) {

                return responseFun(true, {wishlist}, 200)

            }
        }
    } catch (error) {
        console.log(error);
        return responseFun(false, { error }, 200)
    }

}

export async function POST(request) {

    const { product_id, variant_id, user_id } = await request.json();


    try {
        const deleteWishlist = await wishlistModel.findOneAndDelete({
            product_id: new mongoose.Types.ObjectId(product_id),
            variant_id: new mongoose.Types.ObjectId(variant_id),
            user_id: new mongoose.Types.ObjectId(user_id),
        })

        return responseFun(true, { message: "Wishlist has been removed." }, 200)
    } catch (error) {
        console.log(error);
        return responseFun(false, { error }, 200)
    }
}