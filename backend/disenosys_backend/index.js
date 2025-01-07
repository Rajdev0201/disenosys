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
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { OpenAI } = require('openai'); 
const pdfParse = require('pdf-parse');

// const fileUpload = require('express-fileupload');


// const ejs = require("ejs")
// require('dotenv').config();
// require('./config/passport-set.js');

const CLIENT_ID = "86xiq0kdd6l43i";
const CLIENT_SECRET = "WPL_AP1.ojibLusdShatmsUq.07+vuQ==";
const REDIRECT_URI = "https://www.disenosys.com/course";


dotenv.config({ path: path.join(__dirname, "./.env") })



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,       
  useUnifiedTopology: true,    
  serverSelectionTimeoutMS: 30000,
})
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

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
const orgins = ["https://disenosys.onrender.com","http://localhost:3000","https://disenosys-dkhj.onrender.com"]
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
const bootcamp = require("./routes/bootcamp.js")
const linkedin = require("./models/linkedin.js")
const resume = require("./models/resume.js")
const PortfolioPage = require("./models/portfolio.js")
const ProfilePage = require("./models/profile.js")
// const ProfilePage = require("./models/profile.js")
const profile = require("./routes/profile.js");
const port = require("./routes/Portfolio.js");
const resumeUpdate = require("./routes/resume.js");
const UserModel = require("./models/UserModel.js");
const questionRoutes = require("./routes/quiz.js");
const catiaExam = require("./routes/results.js")
const Question = require("./models/quiz.js");
const Catia = require("./models/catia.js");
const Product = require("./models/product.js");
const adminRoute = require("./routes/admin.js");
const code  = require("./routes/code.js");
const student = require("./routes/student.js");
const Student = require("./models/certificate.js")
const consult = require("./routes/consult.js")
const Blog = require("./models/blog.js")
const blog = require("./routes/blog.js")
const career = require("./models/career.js")


app.use("/api/v1", UserRoute);
app.use("/api/v1", CourseRoute);
app.use("/api/v1",addCart);
app.use("/course",payment);
app.use("/bootcamp",bootcamp);
app.use("/consult",consult);
app.use("/update",profile);
app.use("/update",port);
app.use("/resume",resumeUpdate);
app.use('/api/questions', questionRoutes);
app.use('/exam',catiaExam)
app.use('/admin',adminRoute);
app.use('/api/admin',code);
app.use('/api/student',student);
app.use('/api/blog',blog)

app.get("/",(req,res) => {
 res.send("hi")
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

//   debug: true,
// }));


const storageResume = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadResume = multer({ storage: storageResume});

app.post('/upload-resume', uploadResume.single('file'), async (req, res) => {
  const { userId } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const newResume = new resume({
      filePath: req.file.filename, 
      userId,
    });

    await newResume.save(); 

    return res.status(201).json({ message: 'Resume uploaded successfully', filePath: req.file.filename });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});


cloudinary.config({
  cloud_name: 'dapilmiei',
  api_key: '247445749891881',
  api_secret: 'aGTYn8CLmtagTL45f2SKdjiX3A8',
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images', // Cloudinary folder
    format: async (req, file) => 'png', // Format to save the file
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // File name
  },
});

const uploadBlog = multer({ storage });

app.post('/blog', uploadBlog.single('file'), async (req, res) => {
  const { name, designation, title, description } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('Uploaded file details:', req.file);

  try {
    const newBlog = new Blog({
      filePath: req.file.path, 
      name,
      designation,
      title,
      description,
    });

    await newBlog.save();

    return res.status(201).json({
      message: 'Blog uploaded successfully',
      filePath: req.file.path,
    });
  } catch (error) {
    console.error('Error saving blog:', error);
    return res.status(500).send('Internal server error');
  }
});




const storageC = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Upload_resume',
    format: async (req, file) => 'pdf', 
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`, 
  },
});

const uploadCareer = multer({ storage: storageC });

app.post('/career', uploadCareer.single('file'), async (req, res) => {
  const { name, email, phone, dob, gender, experience,expmonths, employee,current,cinr,
    expected,
    einr,
    notice,
    city,
    relocate,
    location,
    } = req.body;
     
  const companies = req.body.companies ? JSON.parse(req.body.companies) : [];
  console.log(companies)
 
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log(req.file)
  try {
    const newCareer = new career({
      filePath: req.file.path,
      name,
      email,
      phone,
      dob: new Date(dob),
      gender,
      experience,
      expmonths,
      employee,
      current,
      cinr,
      expected,
      einr,
      notice,
      city,
      relocate,
      location,
      companies,
    });

    await newCareer.save();

    return res.status(201).json({
      message: 'Career data uploaded successfully',
      filePath: req.file.path,
    });
  } catch (error) {
    console.error('Error saving career:', error);
    return res.status(500).send('Internal server error');
  }
});

app.get('/careerdata', async (req, res) => {
  try {
    const data = await career.find();

    if (!data) {
      return res.status(400).json({ error: 'No Data is available' });
    }

    res.status(200).json({
      message: 'Career data retrieved successfully',
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Data could not be fetched' });
  }
});


app.use('/uploadsPortfolio', express.static(path.join(__dirname, 'uploadsPortfolio')));

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
    const { userId, title, description } = req.body;
    console.log(req.body);
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      const newPortfolio = new PortfolioPage({
        filePath: req.file.filename, 
        userId,
        title,
        description,
      });
  
      await newPortfolio.save();
  
      return res.status(201).json({ message: 'Portfolio uploaded successfully', filePath: req.file.filename });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  });
  


app.use('/uploadsProfile', express.static(path.join(__dirname, 'uploadsProfile')));

const uploadDirProfile = path.join(__dirname, 'uploadsProfile');
if (!fs.existsSync(uploadDirProfile)) {
  fs.mkdirSync(uploadDirProfile);
}

const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirProfile); // Use the correct upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Store with timestamp to avoid name conflicts
  },
});


const uploadProfile = multer({ storage: storageProfile });


app.post('/upload-profile', uploadProfile.single('file'), async (req, res) => {
  const { userName, title, userId } = req.body;
  console.log(req.body); 

  if (!userId) {
    return res.status(400).send('User ID is required.');
  }

  try {
    const existingUser = await UserModel.findOne({ _id: userId });

    if (existingUser) {
      const updatedProfile = {
        userName,
        title,
        ...(req.file && { filePath: req.file.filename }),
      };
      await UserModel.updateOne({ _id: userId }, { $set: updatedProfile });
      return res.status(200).json({ message: 'Profile updated successfully', userId });
    } else {
      return res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});





app.get('/resumes', async (req, res) => {
  try {
    const resumes = await resume.find({ userId: req.params.userId });
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


// app.post('/linkedin-login', async (req, res) => {
//   const { code } = req.body;
//   console.log(code);

//   if (!code) {
//     return res.status(400).json({ error: 'Authorization code is missing' });
//   }

//   try {
//     // Step 1: Exchange code for access token
//     const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
//       params: {
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: LINKEDIN_CALLBACK_URL,
//         client_id: LINKEDIN_CLIENT_ID,
//         client_secret: LINKEDIN_CLIENT_SECRET,
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     const tokenData = response.data;

//     if (!tokenData.access_token) {
//       return res.status(400).json({ error: tokenData.error_description || 'Failed to fetch access token' });
//     }

//     const accessToken = tokenData.access_token;

//     // Step 2: Fetch user profile information
//     const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const userProfile = profileResponse.data;
//     console.log('User Profile:', userProfile);

//     // Step 3: Extract relevant fields
//     const name = userProfile.name; // Full name
//     const email = userProfile.email; // Email address
//     // const picture = userProfile.picture; // Profile picture URL

//     // Step 4: Save or update user in your database
//     let user = await linkedin.findOne({ email }); // Search by email

//     if (!user) {
//       // Create a new user if it doesn't exist
//       user = await linkedin.create({
//         name,
//         email,
//         // picture, // Store profile picture URL
//       });
//     } else {
//       // Update existing user if they are already in the database
//       user.name = name;
//       // user.picture = picture; // Update profile picture URL if needed
//       await user.save();
//     }

//     // Step 5: Respond with the user data
//     res.status(200).json({
//       success: true,
//       user,
//     });

//   } catch (error) {
//     console.error('Error during LinkedIn OAuth process:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: 'LinkedIn OAuth failed', details: error.response ? error.response.data : error.message });
//   }
// });


app.get("/auth", (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
  )}&scope=openid%20profile%20email%20w_member_social`;
  res.json({ url: authUrl });
});

app.post("/get-access-token", async (req, res) => {
  const { code } = req.body; 

  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: "authorization_code",
        code : code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret:CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = response.data;
      // On success, return the access token
      res.json({ accessToken: tokenData.access_token });
  } catch (error) {
      console.error("Error getting access token:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to get access token" });
  }
});

app.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  try {
      const profileResponse  = await axios.get("https://api.linkedin.com/v2/userinfo", {
          headers: { Authorization: authorization }
      });

      // const userProfile = profileResponse.data;
      res.json({ profile: profileResponse.data });
      // console.log('User Profile:', userProfile);
  
  } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch profile" });
  }
});



const uploadxl = multer({ dest: 'uploadxl/' });
const excelDateToJSDate = (serial) => {
  const excelStartDate = new Date(Date.UTC(1899, 11, 30));
  return new Date(excelStartDate.getTime() + serial * 86400000);
};

app.post("/upload-xl", uploadxl.single("file"), (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const students = XLSX.utils.sheet_to_json(sheet).map(student => {
      if (student.from) student.from = excelDateToJSDate(student.from);
      if (student.to) student.to = excelDateToJSDate(student.to);
      if (student.awardedDate) student.awardedDate = excelDateToJSDate(student.awardedDate);

      return student;
    });

    res.json(students);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file");
  }
});


const uploadxlExam = multer({ storage: multer.memoryStorage() });
app.post("/upload-xl-exam", uploadxlExam.single("file"), (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const students = XLSX.utils.sheet_to_json(sheet).map(student => student);

    res.json(students); 
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file");
  }
});


const uploadxlCourse = multer({ storage: multer.memoryStorage() });
app.post("/upload-xl-course", uploadxlCourse.single("file"), (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const students = XLSX.utils.sheet_to_json(sheet).map(student => {
      if (student.date) student.date = excelDateToJSDate(student.date);
      return student;
    });

    res.json(students); 
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file");
  }
});




const uploadcertificateExam = multer({ storage: multer.memoryStorage() });
app.post("/send-certificate-exam", uploadcertificateExam.none(), (req, res) => {
  const { email, pdfDataUrl,score,name,course} = req.body;
  console.log(email)
  if (!email || !pdfDataUrl) {
    return res.status(400).send("Missing email or PDF data");
  }


  const base64Data = pdfDataUrl.split(";base64,").pop();
  const pdfBuffer = Buffer.from(base64Data, "base64");

  const transporter = nodemailer.createTransport({

 host: 'smtp.office365.com', 
port: 587,                 
secure: false,   
auth: {
  user: 'classes@disenosys.com',
  pass: 'xnccsypkfhfpymwg',
}
});


  const mailOptions = {
    from: "classes@disenosys.com",
    to: email,
    subject: `Certificate for ${course}`,
    text: `Dear ${name},\n\nPlease find attached your certificate for completing the ${course}.\n\nBest Regards,\nYour Company`,
    attachments: [
      {
        filename:`${name}_certificate.pdf`,
        content: pdfBuffer,
      },
    ],
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Certificate sent successfully");
  });
});

const uploadcertificateCourse= multer({ storage: multer.memoryStorage() });
app.post("/send-certificate-course", uploadcertificateCourse.none(), (req, res) => {
  const { email, pdfDataUrl,name,course} = req.body;
  console.log(email)
  if (!email || !pdfDataUrl) {
    return res.status(400).send("Missing email or PDF data");
  }


  const base64Data = pdfDataUrl.split(";base64,").pop();
  const pdfBuffer = Buffer.from(base64Data, "base64");

  const transporter = nodemailer.createTransport({

 host: 'smtp.office365.com', 
port: 587,                 
secure: false,   
auth: {
  user: 'classes@disenosys.com',
  pass: 'xnccsypkfhfpymwg',
}
});


  const mailOptions = {
    from: "classes@disenosys.com",
    to: email,
    subject: `Certificate for ${course}`,
    text: `Dear ${name},\n\nPlease find attached your certificate for completing the ${course}.\n\nBest Regards,\nYour Company`,
    attachments: [
      {
        filename:`${name}_certificate.pdf`,
        content: pdfBuffer,
      },
    ],
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Certificate sent successfully");
  });
});


const uploadsingleExam = multer({ storage: multer.memoryStorage() });

app.post("/send-single-certificate-exam", uploadsingleExam.none(),async (req, res) => {
  try {
    const { email, pdfDataUrl,name,course} = req.body;
    console.log(email)
    if (!email || !pdfDataUrl) {
      return res.status(400).send("Missing email or PDF data");
    }
  
    const base64Data = pdfDataUrl.split(";base64,").pop();
    const pdfBuffer = Buffer.from(base64Data, "base64");

    const transporter = nodemailer.createTransport({

      host: 'smtp.office365.com', 
     port: 587,                 
     secure: false,   
     auth: {
      user: 'classes@disenosys.com',
      pass: 'xnccsypkfhfpymwg',
    }
     });
     
  

    const mailOptions = {
      from: "classes@disenosys.com"  ,
      to: email,
      subject: `Certificate for ${course}`,
      text: `Dear ${name},\n\nPlease find attached your certificate for completing the ${course}.\n\nBest Regards,\nYour Company`,
      attachments: [
        {
          filename:`${name}_certificate.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent: " + info.response);
      res.send("Certificate sent successfully");
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
});

const uploadsingleCourse= multer({ storage: multer.memoryStorage() });

app.post("/send-single-certificate-course", uploadsingleCourse.none(),async (req, res) => {
  try {
    const { email, pdfDataUrl,name,course} = req.body;
    console.log(email)
    if (!email || !pdfDataUrl) {
      return res.status(400).send("Missing email or PDF data");
    }
  
    const base64Data = pdfDataUrl.split(";base64,").pop();
    const pdfBuffer = Buffer.from(base64Data, "base64");

    const transporter = nodemailer.createTransport({

      host: 'smtp.office365.com', 
     port: 587,                 
     secure: false,   
     auth: {
      user: 'classes@disenosys.com',
      pass: 'xnccsypkfhfpymwg',
    }
     });
     
  

    const mailOptions = {
      from: "classes@disenosys.com"  ,
      to: email,
      subject: `Certificate for ${course}`,
      text: `Dear ${name},\n\nPlease find attached your certificate for completing the ${course}.\n\nBest Regards,\nYour Company`,
      attachments: [
        {
          filename:`${name}_certificate.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent: " + info.response);
      res.send("Certificate sent successfully");
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
});


const uploadcertificate = multer({ dest: 'uploadcertificate/' });
app.post("/send-certificate", uploadcertificate.none(), (req, res) => {
  const { email, pdfDataUrl,name,course } = req.body;
  console.log(email)
  if (!email || !pdfDataUrl) {
    return res.status(400).send("Missing email or PDF data");
  }


  const base64Data = pdfDataUrl.split(";base64,").pop();
  const pdfBuffer = Buffer.from(base64Data, "base64");

  const transporter = nodemailer.createTransport({

 host: 'smtp.office365.com', 
port: 587,                 
secure: false,   
auth: {
  user: 'classes@disenosys.com',
  pass: 'xnccsypkfhfpymwg',
}
});


  const mailOptions = {
    from: "classes@disenosys.com",
    to: email,
    subject: `Certificate for ${course}`,
    text: `Dear ${name},\n\nPlease find attached your certificate for completing the ${course}.\n\nBest Regards,\nYour Company`,
    attachments: [
      {
        filename:`${name}_certificate.pdf`,
        content: pdfBuffer,
      },
    ],
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Certificate sent successfully");
  });
});



const uploadsingle = multer({ dest: 'uploadcertificatesingle/' });

app.post("/send-single-certificate", uploadsingle.none(),async (req, res) => {
  try {
    const { email, pdfDataUrl,name,course } = req.body;
    console.log(email)
    if (!email || !pdfDataUrl) {
      return res.status(400).send("Missing email or PDF data");
    }
  
    const base64Data = pdfDataUrl.split(";base64,").pop();
    const pdfBuffer = Buffer.from(base64Data, "base64");

    const transporter = nodemailer.createTransport({

      host: 'smtp.office365.com', 
     port: 587,                 
     secure: false,   
     auth: {
      user: 'classes@disenosys.com',
      pass: 'xnccsypkfhfpymwg',
    }
     });
     
  

    const mailOptions = {
      from: "classes@disenosys.com"  ,
      to: email,
      subject: `Certificate for ${course}`,
      text: `Dear ${name},\n\nPlease find attached your certificate for completing the ${course}.\n\nBest Regards,\nYour Company`,
      attachments: [
        {
          filename:`${name}_certificate.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent: " + info.response);
      res.send("Certificate sent successfully");
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
});




const upload = multer({ dest: 'uploadsquiz/' });


app.post('/quiz', upload.single('file'), async (req, res) => {
  try {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      for (const row of sheetData) {
          console.log("Processing row:", row);

          const normalizedRow = Object.fromEntries(
              Object.entries(row).map(([key, value]) => [key.trim(), String(value).trim()])
          );

          const options = [
              { text: normalizedRow['Option1'] || '', isCorrect: normalizedRow['Option1_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option2'] || '', isCorrect: normalizedRow['Option2_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option3'] || '', isCorrect: normalizedRow['Option3_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option4'] || '', isCorrect: normalizedRow['Option4_isCorrect'].toUpperCase() === 'TRUE' }
          ];

          console.log("Constructed options:", options);

          // Check if the question and options are valid
          if (normalizedRow['Question'] && options.every(option => option.text)) {
              const question = new Question({
                  question: normalizedRow['Question'],
                  options
              });

              // console.log("Question object to save:", JSON.stringify(question, null, 2));

              try {
                  const savedQuestion = await question.save();
                  console.log(`Saved question: ${savedQuestion.question}`);
              } catch (saveError) {
                  console.error(`Error saving question: ${saveError.message}`, saveError);
              }
          } else {
              console.warn(`Skipping question due to missing fields: ${JSON.stringify(normalizedRow)}`);
          }
      }

      res.status(200).json({ message: 'Questions uploaded and saved successfully!' });
  } catch (err) {
      console.error('Error details:', err);
      res.status(500).json({ error: 'Failed to upload questions', details: err });
  }
});


const catia = multer({ dest: 'uploadsquiz/' });
app.post('/catia', catia.single('file'), async (req, res) => {
  try {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      for (const row of sheetData) {
          console.log("Processing row:", row);

          const normalizedRow = Object.fromEntries(
              Object.entries(row).map(([key, value]) => [key.trim(), String(value).trim()])
          );

          const options = [
              { text: normalizedRow['Option1'] || '', isCorrect: normalizedRow['Option1_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option2'] || '', isCorrect: normalizedRow['Option2_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option3'] || '', isCorrect: normalizedRow['Option3_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option4'] || '', isCorrect: normalizedRow['Option4_isCorrect'].toUpperCase() === 'TRUE' }
          ];

          console.log("Constructed options:", options);

          // Check if the question and options are valid
          if (normalizedRow['Question'] && options.every(option => option.text)) {
              const question = new Catia({
                  question: normalizedRow['Question'],
                  options
              });

              // console.log("Question object to save:", JSON.stringify(question, null, 2));

              try {
                  const savedQuestion = await question.save();
                  console.log(`Saved question: ${savedQuestion.question}`);
              } catch (saveError) {
                  console.error(`Error saving question: ${saveError.message}`, saveError);
              }
          } else {
              console.warn(`Skipping question due to missing fields: ${JSON.stringify(normalizedRow)}`);
          }
      }

      res.status(200).json({ message: 'Questions uploaded and saved successfully!' });
  } catch (err) {
      console.error('Error details:', err);
      res.status(500).json({ error: 'Failed to upload questions', details: err });
  }
});



const product = multer({ dest: 'uploadsquiz/' });
app.post('/product', product.single('file'), async (req, res) => {
  try {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      for (const row of sheetData) {
          console.log("Processing row:", row);

          const normalizedRow = Object.fromEntries(
              Object.entries(row).map(([key, value]) => [key.trim(), String(value).trim()])
          );

          const options = [
              { text: normalizedRow['Option1'] || '', isCorrect: normalizedRow['Option1_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option2'] || '', isCorrect: normalizedRow['Option2_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option3'] || '', isCorrect: normalizedRow['Option3_isCorrect'].toUpperCase() === 'TRUE' },
              { text: normalizedRow['Option4'] || '', isCorrect: normalizedRow['Option4_isCorrect'].toUpperCase() === 'TRUE' }
          ];

          console.log("Constructed options:", options);

          // Check if the question and options are valid
          if (normalizedRow['Question'] && options.every(option => option.text)) {
              const question = new Product({
                  question: normalizedRow['Question'],
                  options
              });

              // console.log("Question object to save:", JSON.stringify(question, null, 2));

              try {
                  const savedQuestion = await question.save();
                  console.log(`Saved question: ${savedQuestion.question}`);
              } catch (saveError) {
                  console.error(`Error saving question: ${saveError.message}`, saveError);
              }
          } else {
              console.warn(`Skipping question due to missing fields: ${JSON.stringify(normalizedRow)}`);
          }
      }

      res.status(200).json({ message: 'Questions uploaded and saved successfully!' });
  } catch (err) {
      console.error('Error details:', err);
      res.status(500).json({ error: 'Failed to upload questions', details: err });
  }
});




app.post('/post-student-details', async (req, res) => {
  const { name, course, from, to, award, email } = req.body;

  try {
   
    const newStudent = new Student({
      name,
      course,
      from,
      to,
      award,
      email
    });

    await newStudent.save();
    res.status(200).send({ studentId: newStudent._id });
  } catch (error) {
    console.error("Error saving student data:", error);
    res.status(500).send("Error saving student details");
  }
});


app.use(errorMiddleware);
module.exports = app