const CatchAsyncError = require("../middlewares/CatchAsyncError")
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/ErrorHandler")
const SendToken = require("../utils/SendToken")
const nodemailer = require("nodemailer")
const SendEmail = require("../utils/SendEmail")
const crypto = require("crypto")

const passport = require('passport');
const linkedin = require("../models/linkedin")
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
  



  exports.updateProfile = async (req, res, next) => {
    try {
      const {mobile, email } = req.body;
      console.log(req.body)
  
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
  
      user.userEmail = email || user.userEmail;
      user.mobile = mobile || user.mobile;

      await user.save();
      const updatedUser = await UserModel.findById(req.user.id).select("-password");

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully",
      user: updatedUser 
    });
    } catch (error) {
      next(error);
      console.error("Update profile error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

  exports.changePassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
  
      console.log("Received Data:", req.body); // Debugging
  
      // Ensure all fields are provided
      if (!oldPassword || !newPassword || !confirmPassword) {
        return next(new ErrorHandler("All fields are required", 400));
      }
  
      const user = await UserModel.findById(req.user.id).select("+password");
  
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
  
      console.log("User Password from DB:", user.password); // Debugging
  
      // Ensure user has a password stored
      if (!user.password) {
        return next(new ErrorHandler("User does not have a password set", 400));
      }
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }
  
      if (newPassword.length < 6) {
        return next(new ErrorHandler("New password must be at least 6 characters long", 400));
      }
  
      if (oldPassword === newPassword) {
        return next(new ErrorHandler("New password cannot be the same as the old password", 400));
      }
  
      if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("New password and confirm password do not match", 400));
      }
  
      // Ensure newPassword is properly passed to bcrypt.hash()
      console.log("New Password before Hashing:", newPassword); // Debugging
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      next(error);
    }
  };
  
  
  // Delete Account
  exports.deleteAccount = async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id);
  
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
  
      await user.deleteOne();
      res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  exports.ResetLink = CatchAsyncError(async (req, res, next) => {
    const { userEmail } = req.body;

    const user = await UserModel.findOne({ userEmail });

    if (!user) {
        return next(new ErrorHandler("Not a valid user", 401));
    }

    const token = user.getresetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `https://www.disenosys.com/reset-password?token=${token}`; // frontend route

    const message = {
        to: userEmail,
          subject: "Reset Your Password - Disenosys",
          text: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
               <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
               <h2 style="color: #1e3a8a; text-align: center;">Disenosys - Password Reset</h2>
                 <p>Hi there,</p>
                <p>We received a request to reset your password for your Disenosys account.</p>
                <p style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
                </p>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                <hr style="margin: 30px 0;" />
               <p style="text-align: center; font-size: 12px; color: #777;">
                &copy; ${new Date().getFullYear()} Disenosys. All rights reserved.
              </p>
             </div>
             </div>
          
          `,
        };
        
    

    // SendEmail is a utility that uses nodemailer/mailtrap/etc.
    await SendEmail(message);

    res.status(200).json({
        success: true,
        message: `Reset password link has been sent to ${userEmail}`,
    });
});


exports.ResetPassword = CatchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Your token has expired or is invalid", 400));
  }

  const { password, confirmPassword } = req.body;


  if (!password || password.length < 6) {
    return next(new ErrorHandler("Password must be at least 6 characters", 400));
  }


  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  const hash = await bcrypt.hash(password, 10);
  user.password = hash;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully",
  });
});




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
   
    try {
      const user = await linkedin.findById({email});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error('Error fetching current user:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  
  





