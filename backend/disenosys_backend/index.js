const express = require("express")
const app = express()
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const errorMiddleware = require("./middlewares/error.js");
const fetch = require("node-fetch");
const axios = require("axios");
const fs = require("fs");
const multer = require('multer');
// const fileUpload = require('express-fileupload');


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
const resume = require("./models/resume.js")
const PortfolioPage = require("./models/portfolio.js")
const ProfilePage = require("./models/profile.js")
// const ProfilePage = require("./models/profile.js")
const profile = require("./routes/profile.js");

app.use("/api/v1", UserRoute);
app.use("/api/v1", CourseRoute);
app.use("/api/v1",addCart);
app.use("/course",payment);
app.use("/update",profile);

app.get("/",(req,res) => {
 res.send("hi")
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// app.use(fileUpload({
//   debug: true,
// }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadResume = multer({ storage: storage});

// Update the upload route for resume
app.post('/upload', uploadResume.single('file'), async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = `uploads/${file.filename}`;

  const newResume = new resume({ name, filePath });
  await newResume.save();

  res.status(200).json({ message: 'Resume uploaded successfully', filePath });
});






const uploadDirPort = path.join(__dirname, 'uploadsPortfolio');
if (!fs.existsSync(uploadDirPort)) {
  fs.mkdirSync(uploadDirPort);
}

const storagePort = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirPort);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadPort = multer({ storage: storagePort});

app.post('/upload-portfolio', uploadPort.single('file'), async (req, res) => {
  const { name, title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(uploadDirPort, file.filename);

  const newPortfolio = new PortfolioPage({ filePath, name, title, description });
  await newPortfolio.save();

  res.status(200).json({ message: 'Portfolio uploaded successfully', filePath });
});






const uploadDirProfile = path.join(__dirname, 'uploadsPortfolio');
if (!fs.existsSync(uploadDirPort)) {
  fs.mkdirSync(uploadDirPort);
}

const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirPort);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProfile = multer({ storage: storageProfile});

app.post('/upload-profile', uploadProfile.single('file'), async (req, res) => {
  const { name, title, userId } = req.body;
  console.log(req.body);

  if (!userId) {
      return res.status(400).send('User ID is required.');
  }

  try {
      const existingProfile = await ProfilePage.findOne({ userId });

      if (existingProfile) {
          const updatedProfile = {
              name,
              title,
              ...(req.file && { filePath: path.join(uploadDirPort, req.file.filename) }),
          };

          await ProfilePage.updateOne({ userId }, { $set: updatedProfile });
          return res.status(200).json({ message: 'Profile updated successfully', userId });
      } else {
          // Create a new profile
          if (!req.file) {
              return res.status(400).send('No file uploaded.');
          }

          const filePath = path.join(uploadDirPort, req.file.filename);
          const newProfile = new ProfilePage({ filePath, name, title, userId });
          await newProfile.save();

          return res.status(201).json({ message: 'Profile created successfully', filePath });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
  }
});



app.get('/resumes/:username', async (req, res) => {
  try {
    const resumes = await resume.find({ name: req.params.username });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes' });
  }
});


app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params; // Ensure you're extracting id from req.params
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const historyDeleted = await resume.findByIdAndDelete(id);

    if (!historyDeleted) {
      return res.status(404).json({ message: "Delete is not completed: No transaction found with this ID" });
    }

    res.status(200).json({
      status: true,
      message: "Deleted your resume",
      historyDeleted,
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while deleting the history", error: err.message });
  }
});


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