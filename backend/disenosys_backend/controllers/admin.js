const CatchAsyncError = require("../middlewares/CatchAsyncError")
const UserModel = require("../models/Admin.js")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/ErrorHandler")
const SendToken = require("../utils/SendToken")



exports.RegisterUser = CatchAsyncError(async(req,res,next)=>{

    const {userName,userEmail,password,userType} = req.body;
    console.log(req.body);

    const hPassword = await bcrypt.hash(password,10)

    const user = await UserModel.create({
        userName: userName,
        userEmail: userEmail,
        password: hPassword,
        userType:"admin"
    }
    
    )
    if(!user)
    {
        return next(new ErrorHandler("Error in creating user",400))
    }
  SendToken(user,res,201)
})




exports.LoginUser = CatchAsyncError(async (req, res, next) => {
    const { identifier, password } = req.body;
    console.log(req.body)
    const user = await UserModel.findOne({
      $or: [{ userEmail: identifier }, { userName: identifier }],
    }).select("+password")
  
    if (!user) {
      return next(new ErrorHandler("Invalid username or email", 401));
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid username,email or password", 401));
    }
  
    SendToken(user, res, 200);
  });

  exports.RegisterUserLD = CatchAsyncError(async(req,res,next)=>{

    const {userName,userEmail,password} = req.body;
    console.log(req.body);

    const hPassword = await bcrypt.hash(password,10)

    const user = await UserModel.create({
        userName: userName,
        userEmail: userEmail,
        password: hPassword,
        userType:"L&D"
    }
    
    )
    if(!user)
    {
        return next(new ErrorHandler("Error in creating user",400))
    }
  SendToken(user,res,201)
})




exports.LoginUserLD = CatchAsyncError(async (req, res, next) => {
    const { identifier, password } = req.body;
    console.log(req.body)
    const user = await UserModel.findOne({
      $or: [{ userEmail: identifier }, { userName: identifier }],
    }).select("+password")
  
    if (!user) {
      return next(new ErrorHandler("Invalid username or email", 401));
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid username,email or password", 401));
    }
  
    SendToken(user, res, 200);
  });