import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export let AuthenticateUser = async (req, res, next) => {
  try{
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    // "Bearer uwewioewpeiwiefwvxwncd.sxwxdwwxwhxwjkls"
    // ["Bearer","uwewioewpeiwiefwvxwncd.sxwxdwwxwhxwjkls"]
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }
    await jwt.verify(token, process.env.SECRET_KEY,(err,user)=>{
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();

    });
  }
  catch (error) {
    console.error("Error in authenticateUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  
};

export let authorizeRole = (...roles) => {
    return (req,res,next)=>{
      console.log(roles,req.user)
      let userrole=req.user.role;
      if(!roles.includes(userrole)){
        return res.status(403).json({ message: "You don't have permission to access this resource" });
      }
      next();
    }  
};
