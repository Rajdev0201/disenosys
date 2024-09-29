const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const errorMiddleware = require("./middlewares/error.js");
const fetch = require("node-fetch");
const axios = require("axios");

// const ejs = require("ejs")
// require('dotenv').config();
// require('./config/passport-set.js');

const LINKEDIN_CLIENT_ID = "86xiq0kdd6l43i";
const LINKEDIN_CLIENT_SECRET = "WPL_AP1.ojibLusdShatmsUq.07+vuQ==";
const LINKEDIN_CALLBACK_URL = "https://www.disenosys.com";

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
const linkedin = require("./models/linkedin.js")

app.use("/api/v1", UserRoute);
app.use("/api/v1", CourseRoute);
app.use("/api/v1",addCart);
app.use("/course",payment);

app.get("/",(req,res) => {
 res.send("hi")
})

app.post('/linkedin-login', async (req, res) => {
  const { code } = req.body;
  console.log(code);

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    // Step 1: Exchange code for access token
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: LINKEDIN_CALLBACK_URL,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = response.data;

    if (!tokenData.access_token) {
      return res.status(400).json({ error: tokenData.error_description || 'Failed to fetch access token' });
    }

    const accessToken = tokenData.access_token;

    // Step 2: Fetch user profile information
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = profileResponse.data;
    console.log('User Profile:', userProfile);

    // Step 3: Extract relevant fields
    const name = userProfile.name; // Full name
    const email = userProfile.email; // Email address
    // const picture = userProfile.picture; // Profile picture URL

    // Step 4: Save or update user in your database
    let user = await linkedin.findOne({ email }); // Search by email

    if (!user) {
      // Create a new user if it doesn't exist
      user = await linkedin.create({
        name,
        email,
        // picture, // Store profile picture URL
      });
    } else {
      // Update existing user if they are already in the database
      user.name = name;
      // user.picture = picture; // Update profile picture URL if needed
      await user.save();
    }

    // Step 5: Respond with the user data
    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('Error during LinkedIn OAuth process:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'LinkedIn OAuth failed', details: error.response ? error.response.data : error.message });
  }
});



app.use(errorMiddleware);
module.exports = app