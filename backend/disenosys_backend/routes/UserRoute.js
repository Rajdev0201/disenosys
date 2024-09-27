const express = require("express")
const { RegisterUser, LoginUser, ResetLink, ResetPassword, google, LinkedIn, facebook } = require("../controllers/UserController.js")

const router = express.Router()

router.post("/user/register",RegisterUser)
router.post("/user/login",LoginUser)
router.post("/user/forgotPassword",ResetLink)
router.post("/user/changePassword",ResetPassword)
router.post("/user/google",google)
router.post("/user/linkedIn",LinkedIn)
router.post("/user/facebook",facebook)

module.exports = router