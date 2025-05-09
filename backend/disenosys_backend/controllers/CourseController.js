const CatchAsyncError = require("../middlewares/CatchAsyncError")
const CourseModel = require("../models/CourseModel")
const ErrorHandler = require("../utils/ErrorHandler")

exports.createCourse = CatchAsyncError(async(req,res,next)=>{

    const {courseName,category,price,description,duration,noOfLessons} = req.body


    const course = await CourseModel.create({
        courseName: courseName,
        category: category,
        price: price,
        duration: duration,
        description: description,
        noOfLessons: noOfLessons
    })
    if(!course)
    {
        return next(new ErrorHandler("Error in Creating Course",400))
    }

    res.status(200).json({
        success: true,
        course
    })
})

exports.getAllCourses = CatchAsyncError(async(req,res,next)=>{

    const courses = await CourseModel.find()

    if(!courses)
    {
        return next(new ErrorHandler("Error in Getting Corses",400))
    }

    res.json({
        success: true,
        courses
    })
})

exports.getByCategories = CatchAsyncError(async(req,res)=>{

    const {category} = req.query
    const courses = await CourseModel.find({category: {
        $in:[category]
    }})

    if(!courses)
    {
        return next(new ErrorHandler("Mention Valid Category",400))
    }
const length = courses.length
    res.status(200).json({
        success: true,
        courses
    })
})


exports.Reviews = CatchAsyncError(async (req, res) => {
    const { courseId, name, rating, message,like } = req.body;
    console.log(req.body)
    if (!courseId || !rating) {
      return res.status(400).json({ success: false, message: "Course ID and rating are required" });
    }
  
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
  
    const newReview = {
      name: name || "Anonymous",
      rating,
      like,
      message: message || "",
    };
    course.reviews.push(newReview);
    await course.save(); 
  
    res.status(200).json({ success: true, message: "Review added successfully", reviews: course.reviews });
  });