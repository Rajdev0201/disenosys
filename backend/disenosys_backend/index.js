const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const errorMiddleware = require("./middlewares/error.js");
const fetch = require("node-fetch");

// const ejs = require("ejs")
// require('dotenv').config();
// require('./config/passport-set.js');

const LINKEDIN_CLIENT_ID = "86mz8rwaet7akp";
const LINKEDIN_CLIENT_SECRET = "WPL_AP1.LmVZLcEe0gCCOHGT.AhiX0g==";
const LINKEDIN_CALLBACK_URL = "http://localhost:3000/";

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

app.post("/linkedin-login", async (req, res) => {
  const { code } = req.body;

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: LINKEDIN_CALLBACK_URL,
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET,
        }),
      }
    );
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const profileResponse = await fetch(
      "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    const userProfile = await profileResponse.json();

    res.json(userProfile);
  } catch (error) {
    console.error("Error during LinkedIn OAuth process:", error);
    res.status(500).json({ error: "LinkedIn OAuth failed" });
  }
});

app.use(errorMiddleware);
module.exports = app