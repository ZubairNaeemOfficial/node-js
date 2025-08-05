import ProductModel from "../models/product.js";

export const CreateProduct = async (req, res) => {
    try {
        let { name, price, description,user } = req.body;
        // Handle image upload if needed
         // Assuming user ID is available in req.user
    //    let userId = req.user ? req.user.id : " ";
    //    console.log("User ID:", userId,req.user);
        let newProduct = new ProductModel({
            name,
            price,
            description,
            user
        });

        let savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error in createProduct:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find().populate("user", "username email");
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}