import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let userSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:[8, 'Password must be at least 8 characters long'],
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
},{
    timestamps:true
});
let UserModel=mongoose.model("User",userSchema);
export default UserModel;

