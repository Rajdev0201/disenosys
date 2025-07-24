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
const BIW = require("./models/biw.js");
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
const mentor = require('./models/mentor.js');
const contact = require('./routes/contact.js')
const scholar = require('./routes/scholar.js')
const course = require('./routes/course.js')
const teacher = require('./routes/teachers.js');
const onlineStd = require('./routes/onlineStd.js');
const spa = require('./models/onlineStd.js');
const ExamC = require('./models/certificatesave.js');
const InternC = require('./models/internship.js');
const CourseC = require('./models/coursecertificate.js');
const gpdxC = require('./models/Gpdxcertificate.js');
const GpdxC = require("./models/Gpdxcertificate.js");
const enroll = require("./routes/enroll.js");
const FindJob = require("./routes/findJob.js");
const batch = require("./routes/batch.js");
const attendance = require("./routes/attendance.js");

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
app.use('/contact',contact);
app.use('/scholar',scholar);
app.use("/ld",course);
app.use("/ld",teacher)
app.use("/ld",onlineStd)
app.use("/enroll",enroll)
app.use("/Jobs",FindJob)
app.use("/",batch)
app.use("/",attendance)

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


const storageC = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Upload_resume',
    format: async (req, file) => 'pdf', 
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`, 
  },
});

const uploadCareer = multer({ storage: storageC });

const storageM = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mentor_images', 
    format: async (req, file) => 'png', 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});




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
  try {

    const existingCareer = await career.findOne({ 
      $or: [{ email }, { name }] 
    });

    if (existingCareer) {
      return res.status(409).json({ error: 'Your data already exists!' }); 
    }
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


const uploadMentor = multer({
  storage: storageM,
}).fields([
  { name: 'file', maxCount: 1 }, // For the PDF
  { name: 'filePic', maxCount: 1 }, // For the image
]);

const storageSPA = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'SPA_images',
      format: file.fieldname === 'profile' ? 'png' : 'pdf', 
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const uploadSPA = multer({
  storage: storageSPA,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: 'idProof', maxCount: 1 }, 
  { name: 'profile', maxCount: 1 }, 
  { name: 'file', maxCount: 1 },
  { name: 'ten', maxCount: 1 }, 
  { name: 'plustwo', maxCount: 1 }, 
  { name: 'ug', maxCount: 1 }, 
  { name: 'pg', maxCount: 1 }, 
  { name: 'afile', maxCount: 1 }, 
  { name: 'voter', maxCount: 1 },
  { name: 'pan', maxCount: 1 },
]);


app.post('/mentor', uploadMentor, async (req, res) => {
  const {
    name,
    email,
    phone,
    link,
    exp,
    bio,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    course,
    automotive,
    totalHour,
    component,
    yearexp,
    brief,
  } = req.body;

  const topics = req.body.topics ? JSON.parse(req.body.topics) : [];
  const A1 = a1 ? JSON.parse(a1) : [];
  const A2 = a2 ? JSON.parse(a2) : [];
  const A3 = a3 ? JSON.parse(a3) : [];
  const A4 = a4 ? JSON.parse(a4) : [];
  const A5 = a5 ? JSON.parse(a5) : [];
  const A6 = a6 ? JSON.parse(a6) : [];
  const A7 = a7 ? JSON.parse(a7) : [];
  const A8 = a8 ? JSON.parse(a8) : [];
  const A9 = a9 ? JSON.parse(a9) : [];
  const A10 = a10 ? JSON.parse(a10) : [];
  const A11 = a11 ? JSON.parse(a11) : [];

  // Validate if both files are uploaded
  if (!req.files || !req.files['file'] || !req.files['filePic']) {
    return res.status(400).send('Both files must be uploaded.');
  }

  const file = req.files['file'][0];
  const filePic = req.files['filePic'][0];

  try {
    const newCareer = new mentor({
      filePath: file.path,
      filePic: filePic.path,
      name,
      email,
      phone,
      link,
      exp,
      bio,
      a1: A1,
      a2: A2,
      a3: A3,
      a4: A4,
      a5: A5,
      a6: A6,
      a7: A7,
      a8: A8,
      a9: A9,
      a10: A10,
      a11: A11,
      course,
      automotive,
      totalHour,
      component,
      yearexp,
      brief,
      topics,
    });

    await newCareer.save();

    return res.status(201).json({
      message: 'Mentor data uploaded successfully',
      filePath: file.path,
      imageFilePath: filePic.path,
    });
  } catch (error) {
    console.error('Error saving mentor data:', error);
    return res.status(500).send('Internal server error');
  }
});



app.post("/studentadd",uploadSPA, async (req, res) => {
  const { fname,
    lname,
    dob,
    gender,
    permanent,
    communication,
    no1,
    no2,
    emg,
    email,
    panno,
    aadharno,
    blood,
    father,
    mother,
    marital,
    n1,
    ndob,
    nrealtion,
    naddress,
    bank,
    branch,
    Ac,
    IFSC,
    Edu,
    Passed,
    Academy,
    rdate,
    cdate,
    start,
    end,
    status,
    cname,
    mode,
    isIndia
  } = req.body;
 
  const profile = req?.files?.['profile']?.[0] || null;
  const idProof = req?.files?.['idProof']?.[0] || null;
  const file = req?.files?.['file']?.[0] || null;
  const ten = req?.files?.['ten']?.[0] || null;
  const plustwo = req?.files?.['plustwo']?.[0] || null;
  const ug = req?.files?.['ug']?.[0] || null;
  const pg = req?.files?.['pg']?.[0] || null;
  const afile = req?.files?.['afile']?.[0] || null;
  const voter = req?.files?.['voter']?.[0] || null;
  const pan = req?.files?.['pan']?.[0] || null;

  try {
    const lastEntry = await spa.findOne().sort({ sid: -1 });
    let newSidNumber = 110; 

     if (lastEntry && lastEntry.sid) {
  const lastNumber = parseInt(lastEntry.sid.replace(/\D/g, ""), 10);
  if (!isNaN(lastNumber)) {
    newSidNumber = lastNumber + 1;
  }
       }
       
    const c1 = "PGDBW - PG DIPLOMA (BODY IN WHITE - BIW)";
    const c2 = "PGDPT - PG DIPLOMA (PLASTIC TRIMS)";
    const c3 = "MNPDB - AUTOMOTIVE PRODUCT DEVELOPMENT - BODY MASTERS";

    let subrowsToAdd = [];

    if (cname === c1) {
      subrowsToAdd = [
        { cname: "DSST01 - CATIA Foundations for Automotive Designers", start: "", end: "" },
        { cname: "DSST02 - Advanced CATIA Surfacing for Automotive Designers", start: "", end: "" },
        { cname: "DSPT04 - Surface Remastering for Automotive Designers", start: "", end: "" },
        { cname: "DSBW01 - Fundamentals of Automotive Body in White (BIW)", start: "", end: "" },
        { cname: "DSBW02 - Automtotive BIW Product Development - BIW BRACKETS & REINFORCEMENTS", start: "", end: "" },
      ];
    }else if(cname === c2){
       subrowsToAdd = [
        { cname: "DSST01 - CATIA Foundations for Automotive Designers", start: "", end: "" },
        { cname: "DSST02 - Advanced CATIA Surfacing for Automotive Designers", start: "", end: "" },
        { cname: "DSPT01 - Fundamentals of Automotive Plastic Trims", start: "", end: "" },
        { cname: "DSPT04 - Surface Remastering for Automotive Designers", start: "", end: "" },
        { cname: "DSPT02 - Close Volume and Engineering Features for Automotive Designers", start: "", end: "" },
      ];    
    }else if(cname === c3){
        subrowsToAdd = [
        { cname: "DSST01 - CATIA Foundations for Automotive Designers", start: "", end: "" },
        { cname: "DSST02 - Advanced CATIA Surfacing for Automotive Designers", start: "", end: "" },
        { cname: "DSPT01 - Fundamentals of Automotive Plastic Trims", start: "", end: "" },
        { cname: "DSPT03 - Solid Remastering for Automotive Designers", start: "", end: "" },
        { cname: "DSPT04 - Surface Remastering for Automotive Designers", start: "", end: "" },
        { cname: "DSBW01 - Fundamentals of Automotive Body in White (BIW)", start: "", end: "" },
        { cname: "DSCD01 - Automotive concept Design and master sections", start: "", end: "" },
        { cname: "DSBW02 - Automtotive BIW Product Development - BIW BRACKETS & REINFORCEMENTS", start: "", end: "" },
        { cname: "DSPT02 - Close Volume and Engineering Features for Automotive Designers", start: "", end: "" },
      ];  
    }else {
      subrowsToAdd = [{ cname, start, end }];
    }

    const updatedEntry = subrowsToAdd;
    console.log(updatedEntry);
    let newSid = `DSST${newSidNumber}`;
    const newContact = new spa({  fname,
      lname,
      dob,
      gender,
      permanent,
      communication,
      no1,
      no2,
      emg,
      email,
      panno,
      aadharno,
      blood,
      father,
      mother,
      marital,
      n1,
      ndob,
      nrealtion,
      naddress,
      bank,
      branch,
      Ac,
      IFSC,
      Edu,
      Passed,
      Academy,
      isIndia,
      idProof: idProof?.path || null,
      profile: profile?.path || null,
     file: file?.path || null,
     ten: ten?.path || null,
     plustwo: plustwo?.path || null,
     ug: ug?.path || null,
     pg: pg?.path || null,
     afile: afile?.path || null,
     voter: voter?.path || null,
     pan: pan?.path || null,
      rdate,
      cdate,
      cname,
      mode,
      start,
      end,
      status,
      subrows:updatedEntry,
      sid:newSid
     });
    await newContact.save();
    res.status(200).json({ success: true, message: "Form submitted successfully!",
      profile:profile,
      idProof:idProof,
      file:file,
      ten:ten,
      plustwo:plustwo,
      ug:ug,
      pg:pg,
      afile:afile,
      voter:voter,
      pan:pan,
     });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});


app.get('/mentordata', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const exp = req.query.exp;
  const automotive = req.query.automotive;

  let filter = {};

  if (exp) {
    filter.exp = parseInt(exp);
  }
  if (automotive) {
    filter.automotive = { $regex: automotive, $options: "i" };
  }

  try {
    const totalMentors = await mentor.countDocuments(filter);
    const data = await mentor
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: 'Mentor data retrieved',
      data,
      page,
      totalPage: Math.ceil(totalMentors / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Data fetch failed' });
  }
});


app.get('/careerdata', async (req, res) => {
  try {
    const data = await career.aggregate([
      {
        $sort: { createdAt: -1 } // Step 1: Sort all records by newest first
      },
      {
        $group: {
          _id: "$name", // Step 2: Group by unique user (email or userId)
          latestApplication: { $first: "$$ROOT" } // Step 3: Keep the latest application
        }
      },
      {
        $replaceRoot: { newRoot: "$latestApplication" } // Step 4: Replace the root to show only filtered data
      },
      {
        $sort: { createdAt: -1 } // Step 5: Sort again to maintain order
      }
    ]);

    if (!data.length) {
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

const uploadxlGpdx = multer({ storage: multer.memoryStorage() });
app.post("/upload-xl-gpdx", uploadxlGpdx.single("file"), (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const students = XLSX.utils.sheet_to_json(sheet).map(student => {
      if (student.awardedDate) student.awardedDate = excelDateToJSDate(student.awardedDate);
      return student;
    });
    
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
    const generateRandomUdin = () => {
      return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };

    const students = XLSX.utils.sheet_to_json(sheet).map(student => {
      if (student.date) student.date = excelDateToJSDate(student.date);
      student.udin = generateRandomUdin();
      return student;
    });

    res.json(students); 
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file");
  }
});




const uploadcertificateExam = multer({ storage: multer.memoryStorage() });
app.post("/send-certificate-exam", uploadcertificateExam.none(), async(req, res) => {
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
  });
  const newExam = new ExamC({
    name:name,
    course:course,
    email:email,
    score:score,
  });

  await newExam.save();
  res.status(200).send({ success: true, message: "Certificate sent successfully",data:newExam });
});


const uploadgpdxCourse= multer({ storage: multer.memoryStorage() });

app.post("/send-gpdxcourse", uploadgpdxCourse.none(), async(req, res) => {
  const { email, pdfDataUrl,name,score,awardedDate } = req.body;
  console.log(awardedDate)
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
    subject: `Certificate for GPDX Exam`,
    text: `Dear ${name},\n\nPlease find attached your certificate for completing the gpdx exam.\n\nBest Regards,\nYour Company`,
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
  const newExam = new gpdxC({
    name:name,
    email:email,
    score:score,
    Completion:awardedDate,
  });

  await newExam.save();
  res.status(200).send({ success: true, message: "Certificate sent successfully",data:newExam });
});

const uploadCourse= multer({ storage: multer.memoryStorage() });
app.post("/send-certificate-course", uploadCourse.none(), async(req, res) => {
  const { email, pdfDataUrl,name ,course,date,udin} = req.body;
  console.log(udin)
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

  
  const newCourse = new CourseC({
    name:name,
    course:course,
    email:email,
    Completion:date,
    Udin:udin,
    url:pdfDataUrl
  });

  await newCourse.save();
  res.status(200).send({ success: true, message: "Certificate sent successfully",data:newCourse });
});

app.get("/courselist-c" ,async (req,res) => {
  try{
      const course = await CourseC.find();
  
      if(!course){
            return res.status(400).json({ error: 'No Data is available' });
      }
  
      res.status(200).json({
          message: 'course-c data is saved',
          data: course,
        });
      }catch(err){
          console.log(err);
          return res.status(500).json({err : "data is not fetched"})
      }
})

app.get("/udinget", async (req, res) => {
  try {
      const { udin } = req.query;
      // console.log(udin);
      if (!udin) {
          return res.status(400).json({ error: "UDIN is required" });
      }

      const course = await CourseC.findOne({ Udin:udin }); 
      // console.log(course)
      if (!course) {
          return res.status(404).json({ error: "No certificate found for this UDIN" });
      }

      res.status(200).json({
          message: "Certificate found",
          data: course,
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Data could not be fetched" });
  }
});



app.get("/internlist-c" ,async (req,res) => {
  try{
      const intern = await InternC.find();
  
      if(!intern){
            return res.status(400).json({ error: 'No Data is available' });
      }
  
      res.status(200).json({
          message: 'intern-c data is saved',
          data: intern,
        });
      }catch(err){
          console.log(err);
          return res.status(500).json({err : "data is not fetched"})
      }
})

app.get("/gpdx-c" ,async (req,res) => {
  try{
      const gpdx = await GpdxC.find();
  
      if(!gpdx){
            return res.status(400).json({ error: 'No Data is available' });
      }
  
      res.status(200).json({
          message: 'gpdx-c data is saved',
          data: gpdx,
        });
      }catch(err){
          console.log(err);
          return res.status(500).json({err : "data is not fetched"})
      }
})


app.get("/exam-c" ,async (req,res) => {
  try{
      const exam = await ExamC.find();
  
      if(!exam){
            return res.status(400).json({ error: 'No Data is available' });
      }
  
      res.status(200).json({
          message: 'exam-c data is saved',
          data: exam,
        });
      }catch(err){
          console.log(err);
          return res.status(500).json({err : "data is not fetched"})
      }
})

const uploadsingleExam = multer({ storage: multer.memoryStorage() });

app.post("/send-single-certificate-exam", uploadsingleExam.none(),async (req, res) => {
  try {
    const { email, pdfDataUrl,name,course,score} = req.body;
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

    const newExam = new ExamC({
      name:name,
      course:course,
      email:email,
      score:score,
    });
  
    await newExam.save();
    res.status(200).send({ success: true, message: "Certificate sent successfully",data:newExam });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
  
});

const uploadsingleCourse= multer({ storage: multer.memoryStorage() });

app.post("/send-single-certificate-course", uploadsingleCourse.none(),async (req, res) => {
  try {
    const { email, pdfDataUrl,name,course,date,udin} = req.body;
    console.log(udin)
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
      subject: `Certificate of Completion for ${course}`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333333;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
              }
              .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 20px;
                margin: 20px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #004aad;
                font-size: 24px;
                margin-bottom: 10px;
              }
              p {
                font-size: 16px;
                line-height: 1.6;
                color: #555555;
              }
              .footer {
                margin-top: 20px;
                font-size: 14px;
                text-align: start;
                color: #888888;
              }
              .highlight {
                color: #004aad;
                font-weight: bold;
              }
              .cta {
                color: #ffffff;
                background-color: #004aad;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h1>Certificate of Completion</h1>
              <p>Dear <span class="highlight">${name}</span>,</p>
              <p>We are pleased to inform you that you have successfully completed the <span class="highlight">${course}</span>. Please find attached your Certificate of Completion for the course.</p>
              <p>We congratulate you on your achievement and wish you continued success in your future endeavors.</p>
              <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
              
              <p class="footer">Best regards, <br />The Disenosys Team</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `${name}_Certificate_of_Completion.pdf`,
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
    const newCourse = new CourseC({
      name:name,
      course:course,
      email:email,
      Completion:date,
      Udin:udin,
      url:pdfDataUrl
    });
  
    await newCourse.save();
    res.status(200).send({ success: true, message: "Certificate sent successfully",data:newCourse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
});

const uploadsingleGpdx= multer({ storage: multer.memoryStorage() });

app.post("/send-single-gpdx", uploadsingleGpdx.none(),async (req, res) => {
  try {
    const { email, pdfDataUrl,name,score,date} = req.body;
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
      subject: `Certificate of Completion for GPDX exam`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333333;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
              }
              .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 20px;
                margin: 20px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #004aad;
                font-size: 24px;
                margin-bottom: 10px;
              }
              p {
                font-size: 16px;
                line-height: 1.6;
                color: #555555;
              }
              .footer {
                margin-top: 20px;
                font-size: 14px;
                text-align: start;
                color: #888888;
              }
              .highlight {
                color: #004aad;
                font-weight: bold;
              }
              .cta {
                color: #ffffff;
                background-color: #004aad;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h1>Certificate of Completion</h1>
              <p>Dear <span class="highlight">${name}</span>,</p>
              <p>We are pleased to inform you that you have successfully completed the <span class="highlight">gpdx exam</span>. Please find attached your Certificate of Completion for the course.</p>
              <p>We congratulate you on your achievement and wish you continued success in your future endeavors.</p>
              <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
              
              <p class="footer">Best regards, <br />The Disenosys Team</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `${name}_Certificate_of_Completion.pdf`,
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
    const newExam = new gpdxC({
      name:name,
      email:email,
      score:score,
      Completion:date,
    });
  
    await newExam.save();
    res.status(200).send({ success: true, message: "Certificate sent successfully",data:newExam });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
});
const uploadcertificate = multer({ dest: 'uploadcertificate/' });


app.post("/send-certificate", uploadcertificate.none(), async(req, res) => {
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
  });

  const newIntern = new InternC({
    name:name,
    course:course,
    email:email,
  });

  await newIntern.save();
  res.status(200).send({ success: true, message: "Certificate sent successfully",data:newIntern}) 
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
    });
    const newIntern = new InternC({
      name:name,
      course:course,
      email:email,
    });
  
    await newIntern.save();
    res.status(200).send({ success: true, message: "Certificate sent successfully",data:newIntern}) 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the certificate request");
  }
});



const upload = multer({ dest: 'uploadsquiz/' });


app.post('/quiz', upload.none(), async (req, res) => {
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

app.post('/biw', upload.none(), async (req, res) => {
  try {
    const { examname, createdBy } = req.body;

    if (!req.file || !examname || !createdBy) {
      return res.status(400).json({ error: 'Missing required fields or file' });
    }

    // Read Excel File
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const row of sheetData) {
      console.log("Processing row:", row);

      // Normalize row keys and values
      const normalizedRow = Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key.trim(), String(value).trim()])
      );

      const options = [
        {
          text: normalizedRow['Option1'] || '',
          isCorrect: normalizedRow['Option1_isCorrect']?.toUpperCase() === 'TRUE'
        },
        {
          text: normalizedRow['Option2'] || '',
          isCorrect: normalizedRow['Option2_isCorrect']?.toUpperCase() === 'TRUE'
        },
        {
          text: normalizedRow['Option3'] || '',
          isCorrect: normalizedRow['Option3_isCorrect']?.toUpperCase() === 'TRUE'
        },
        {
          text: normalizedRow['Option4'] || '',
          isCorrect: normalizedRow['Option4_isCorrect']?.toUpperCase() === 'TRUE'
        }
      ];

      console.log("Constructed options:", options);

      // Validate fields before saving
      if (
        normalizedRow['Question'] &&
        options.every(option => option.text) &&
        options.some(option => option.isCorrect) // Ensure at least one correct answer
      ) {
        const question = new BIW({
          question: normalizedRow['Question'],
          options,
          examname, // From req.body
          createdBy // From req.body
        });

        try {
          const savedQuestion = await question.save();
          console.log(`Saved question: ${savedQuestion.question}`);
        } catch (saveError) {
          console.error(`Error saving question: ${saveError.message}`, saveError);
        }
      } else {
        console.warn(`Skipping invalid row: ${JSON.stringify(normalizedRow)}`);
      }
    }

    res.status(200).json({ message: 'Questions uploaded and saved successfully!' });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ error: 'Failed to upload questions', details: err });
  }
});


const catia = multer({ dest: 'uploadsquiz/' });
app.post('/catia', catia.none(), async (req, res) => {
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
app.post('/product', product.none(), async (req, res) => {
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