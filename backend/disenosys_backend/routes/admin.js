const express = require("express")
const { RegisterUser, LoginUser, RegisterUserLD, LoginUserLD } = require("../controllers/admin.js")


const router = express.Router()

router.post("/register",RegisterUser)
router.post("/login",LoginUser)
router.post("/registerld",RegisterUserLD)
router.post("/loginld",LoginUserLD)
module.exports = router