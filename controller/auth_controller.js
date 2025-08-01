import User from "../models/user_model.js";
import { accesstoken, comparePassword, hashPassword } from "../utils/helper.js";



export const RegisterUser=async(req,res)=>{
    try{
         let { username, email, password } = req.body;
        let emailExists= await User.findOne({ email:email})
        if(emailExists){
            return res.status(400).json({ message: "Email already exists" });
        }
       
        let hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Error hashing password" });
        }
        let newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        let savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(500).json({ message: "Error saving user" });
        }
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                password: savedUser.password, // Note: Avoid sending password in response
            }
        });
    }catch(error){
        console.error("Error in RegisterUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const LoginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        let token = accesstoken({ id: user._id, email: user.email, role:user.role});
        res.status(200).json({
            message: "Login successful",user,token
        })

        }catch (error) {
        console.error("Error in LoginUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout=(req,res)=>{
    try {
        res.clearCookie("access-token",{path:"/"});
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({
           message: error.message
        })
        
    }
}

// Check if user exists
        // console.log(req.body)
        // const user = await User.findOne( { email: req.body.email });
        // console.log(user,"======")
        // if (!user) {    
        //     return res.status(400).json({ message: "Invalid email or password" });
        // }
        // // Compare passwords
    
        // const isPasswordValid = await comparePassword(req.body.password, user.password);
        
        // if (!isPasswordValid) {
        //     return res.status(400).json({ message: "Invalid  password" });
        // }
        // let token=  accesstoken({user})
        // if(!token){
        //     return res.status(400).json({ message: "something went wrong " });
        // }
        // // Respond with user data (excluding password)
        // res.cookie("access-token",token,{
        //     httpOnly: true,
        //     maxAge:24 * 60 *60 * 1000,
        //     secure:false,
        //     path:"/"
        // })
        // return res.status(200).json({
        //     message: "Login successful",
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email,
        //            token
        //     }
        // });