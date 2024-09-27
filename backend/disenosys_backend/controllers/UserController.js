const CatchAsyncError = require("../middlewares/CatchAsyncError")
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/ErrorHandler")
const SendToken = require("../utils/SendToken")
const nodemailer = require("nodemailer")
const SendEmail = require("../utils/SendEmail")
const crypto = require("crypto")

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


exports.RegisterUser = CatchAsyncError(async(req,res,next)=>{

    const {userName,userEmail,password} = req.body;
    console.log(req.body);

    const hPassword = await bcrypt.hash(password,10)

    const user = await UserModel.create({
        userName: userName,
        userEmail: userEmail,
        password: hPassword
    }
    
    )
    if(!user)
    {
        return next(new ErrorHandler("Error in creating user",400))
    }
  SendToken(user,res,201)
})

// exports.LoginUser = CatchAsyncError(async(req,res,next)=>{

//     const {userEmail,userName,password} = req.body

// if(!userEmail && !userName)
// {
//     return next(new ErrorHandler("Username or useremail is required",400))
// }

// const user = await UserModel.findOne({$or:[{userEmail: userEmail},{userName: userName}]}).select("+password")

// if(!user)
// {
//     return next(new ErrorHandler("No user Found",401))
// }

//     if(! await user.isValidatePassword(password))
//     {
//         return next(new ErrorHandler("Email or Password is Wrong",401))
//     }
 

//   SendToken(user,res,200)
// })

exports.LoginUser = CatchAsyncError(async (req, res, next) => {
    const { identifier, password } = req.body;
    console.log(req.body)
    // Check if identifier is an email or username
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
  

exports.ResetLink = CatchAsyncError(async(req,res)=>{

    const {userEmail} = req.body

        const user = await UserModel.findOne({userEmail : userEmail})
        console.log(user)
        if(!user)
            {
                return next(new ErrorHandler("Not a valid user",401))
            }
        const token = await user.getresetPasswordToken()
    
        await user.save({validateBeforeSave: false})
    
        const resetUrl = `http://localhost:8000/api/v1/forgotPassword/${token}`;
       
    
          const message = {
              from: "sandbox.smtp.mailtrap.io",
              to: "",
              subject: "Reset Password",
              text: resetUrl
          }
      
        //  await SendEmail(message)
        
        res.json({resetUrl})
    
})

exports.ResetPassword = CatchAsyncError(async(req,res)=>{

        const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')
    
    const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    })
    if(!user)
        {
            return next(new ErrorHandler("Your token is expired",400))
        }

    if(req.body.password != req.body.confirmPassword)
        {
            return next(new ErrorHandler("Password and Confirm Password Not Matched",400))
        }
    const hash = await bcrypt.hash(req.body.password,10)
    user.password = hash
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
   await user.save({validateBeforeSave: false})
    res.json({
        message:"Hello World"
    })
})


exports.google = CatchAsyncError(async(req,res)=> {
   
        const { userEmail, userName } = req.body;
    
        try {
      
            let user = await UserModel.findOne({ userEmail });
    
            if (!user) {
                user = await UserModel.create({
                    userName,
                    userEmail,
                    password: "N/A", 
                });
            } else {
                user.userName = userName; 
                await user.save();
            }
    
           
            res.status(200).json({
                success: true,
                user,
                token: user.getJwtToken(),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    
})



exports.facebook = CatchAsyncError(async(req,res)=> {
   
    const { userEmail, userName } = req.body;

    try {
  
        let user = await UserModel.findOne({ userEmail });

        if (!user) {
            user = await UserModel.create({
                userName,
                userEmail,
                password: "N/A", 
            });
        } else {
            user.userName = userName; 
            await user.save();
        }

       
        res.status(200).json({
            success: true,
            user,
            token: user.getJwtToken(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }

})


exports.LinkedIn = CatchAsyncError(async (req, res) => {
    const { userEmail, userName } = req.body;
  
    if (!userEmail || !userName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both userEmail and userName',
      });
    }
  
    try {
      let user = await UserModel.findOne({ userEmail });
  
      if (!user) {
        user = await UserModel.create({
          userName,
          userEmail,
          password: "N/A",
        });
      } else {
        user.userName = userName; 
        await user.save();
      }
  
      res.status(200).json({
        success: true,
        user,
        token: user.getJwtToken(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  });
  





