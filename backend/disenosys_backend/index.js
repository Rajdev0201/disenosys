const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const errorMiddleware = require("./middlewares/error.js");
const session = require('express-session');
const passport = require('passport');
// const ejs = require("ejs")
// require('dotenv').config();
// require('./config/passport-set.js');

dotenv.config({ path: path.join(__dirname, "./.env") })

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Mongodb Connected")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(session({
//   secret:"1234n",
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());
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
const orgins = ["https://disenosys.onrender.com","http://localhost:3000",]
app.use(cors({
  origin: orgins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const UserRoute = require("./routes/UserRoute.js")
const CourseRoute = require("./routes/CourseRoute.js")
const addCart = require("./routes/addToCart.js")
const payment = require("./routes/Payment.js")

app.use("/api/v1", UserRoute);
app.use("/api/v1", CourseRoute);
app.use("/api/v1",addCart);
app.use("/course",payment);

app.get("/",(req,res) => {
 res.send("hi")
})

app.use(errorMiddleware);
module.exports = app