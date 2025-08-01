import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

// hash function
export let hashPassword = async (password) => {
    try {
        return await bcrypt.hashSync(password, 10);
    } catch(error){
        console.error("Error in hashPassword:", error);
        throw new Error("Hashing failed");
    }  
}

// compare passwords
export let comparePassword = async (password, hashedPassword) => {
    try {
        console.log(password,hashedPassword)
      let compare=await bcrypt.compare(password,hashedPassword)
        return compare;
    } catch(error){
        console.error("Error in comparePassword:", error);
        throw new Error("Comparison failed");
    }
}

export let accesstoken=(data)=>{
    try{
    const token = jwt.sign(data, process.env.SECRET_KEY, {expiresIn:"1hr"});
        return token;
    }
    catch(error){
        console.error("Error in accesstoken:", error);
    }
}