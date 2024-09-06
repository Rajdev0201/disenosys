const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const errorMiddleware = require("./middlewares/error.js")
// const ejs = require("ejs")


dotenv.config({ path: path.join(__dirname, "./.env") })

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Mongodb Connected")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(
  cors({
    origin: "*",
  })
);
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const UserRoute = require("./routes/UserRoute.js")
const CourseRoute = require("./routes/CourseRoute.js")
const addCart = require("./routes/addToCart.js")
const payment = require("./routes/Payment.js")

app.use("/api/v1", UserRoute);
app.use("/api/v1", CourseRoute);
app.use("/api/v1",addCart);
app.use("/course",payment);

app.use(errorMiddleware);
module.exports = app