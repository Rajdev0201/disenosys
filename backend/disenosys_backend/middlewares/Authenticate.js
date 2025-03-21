const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")




exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
      return next(new ErrorHandler("Login first to continue", 401));
    }
    
    const bearer = token.split(" ")[1];
    console.log(bearer)
    
    try {
      const verified = jwt.verify(bearer, process.env.JWT_SECRET);
      console.log(verified)
    
      const user = await UserModel.findById(verified.id);
      if (!user) {
        return next(new ErrorHandler("Not a User", 401));
      }
    
      req.user = user;
      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
    
};
