const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { handleLeadSubmission, getLeads, updateStaus, postHook, test } = require("../controllers/leads");
const sendLeadToWhatsapp = require("../utils/WhatsappApi");

cloudinary.config({
    cloud_name: 'dapilmiei',
    api_key: '247445749891881',
    api_secret: 'aGTYn8CLmtagTL45f2SKdjiX3A8',
  });

const storageP = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Upload_Resume_leads',
    format: async (req, file) => 'pdf', 
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, 
  },
});
  
const upload = multer({ storage: storageP });

router.post("/leads-post",upload.single('resume'),handleLeadSubmission);
router.get("/get-leads",getLeads);
router.put("/updated-status/:id",updateStaus)
router.post("/webhook/lead-webhook",postHook)
router.get("/test",sendLeadToWhatsapp)
router.post("/test",test)

module.exports = router;