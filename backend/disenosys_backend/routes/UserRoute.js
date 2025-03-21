const express = require("express")
const { RegisterUser, LoginUser, ResetLink, ResetPassword, google, LinkedIn, facebook, updateProfile, changePassword, deleteAccount } = require("../controllers/UserController.js")
const { isAuthenticated } = require("../middlewares/Authenticate.js")

const router = express.Router()

router.post("/user/register",RegisterUser)
router.post("/user/login",LoginUser)
router.post("/user/forgotPassword",ResetLink)
router.post("/user/changePassword",ResetPassword)

router.put("/update-profile", isAuthenticated, updateProfile);
router.put("/change-password", isAuthenticated, changePassword);
router.delete("/delete-account", isAuthenticated, deleteAccount);


router.post("/user/google",google)
router.post("/user/linkedIn",LinkedIn)
router.post("/user/facebook",facebook)

module.exports = router