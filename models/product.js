import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
     
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
}, {

    timestamps: true
});
let ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;