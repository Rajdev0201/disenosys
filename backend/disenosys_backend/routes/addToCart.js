const express = require("express");
const { postCart, getCart, increament, decreament, removeCart } = require("../controllers/addToCart");
const router = express.Router();

router.post("/addCart", postCart);
router.get("/getCart", getCart);
router.patch("/cart/:id/increament", increament);
router.patch("/cart/:id/decreament", decreament);
router.delete("/cart/:id", removeCart);

module.exports = router;
