const express = require("express")
const { postJob, getJob, createCheckoutSession, handleRazorpayCallback, getPlaceOrder, postPremiumJobUser, getPremiumJobsList } = require("../controllers/findJob.js")
const router = express.Router()
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: 'dapilmiei',
    api_key: '247445749891881',
    api_secret: 'aGTYn8CLmtagTL45f2SKdjiX3A8',
  });
  

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Upload_Comapny_logo',
    format: async (req, file) => 'jpg', 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, 
  },
});
const storageP = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Upload_Resume_Premium_Users',
    format: async (req, file) => 'pdf', 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, 
  },
});


const upload = multer({ storage: storage });
const uploadPremiumJobList = multer({ storage: storageP });

router.post("/postJob", upload.single('logo'), postJob);
router.get("/getJob",getJob)

router.post("/checkout-order",createCheckoutSession)
router.post('/handle-razorpay-callback', handleRazorpayCallback);
router.get("/getPlaceOrder",getPlaceOrder)


router.post("/postPremium",uploadPremiumJobList.single('resume'),postPremiumJobUser)
router.get("/getpremiumlist",getPremiumJobsList)
module.exports = router;