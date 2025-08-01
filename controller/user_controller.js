import UserModel from "../models/user_model.js";

export let PostUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let newUser = new UserModel({ username, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in PostUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export let GetUser=async(req,res)=>{
  try {
    let users=await UserModel.find({});
    res.status(200).json({success:true,users:users});
    
  } catch (error) {
    console.error("Error in GetUser:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }
}

export let DeleteUser=async (req,res)=>{
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    let deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    
  } catch (error) {
    console.error("Error in DeleteUser:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }
}

// update controller

export let UpdateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { username, email, password } = req.body;
   
    let updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error in UpdateUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// get by id
export let GetUserById = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    let user =await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    res.status(200).json({ success: true, user: user });
  }
  catch (error) {
    console.error("Error in GetUserById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


