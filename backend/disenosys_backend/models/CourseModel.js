const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required:[true,"Please Enter CourseName"]
    },
    description:{
        type: String
    },
    category:[
        {
        type: String,
        required:[true,"Please Enter Course Category"]
        }
    ],
    members:[
        {
            type: mongoose.Types.ObjectId,
            ref:"users"
        }
    ],
    reviews:[
        {
   
        }
    ],
    price:{
        type: Number,
        required:[true,"Please Enter price"]
    },
    duration:{
        type: String
    },

    detailsDescription: [
        {
            overview: {
                type: [String], 
                required: [true, "Overview is required"]
            },
        }
    ],

    Curriculum: [
        {
            title: {
                type: String,
                required: [true, "Please enter the title"]
            },
            subTopics: {
                type: String,
                required: [true, "Please enter the subtopics"]
            }
        }
    ],

    directors:[
        {
            name:{
                type: String,
            },
            role:{
                type: String,
            },
            exp:{
                type: String,
            },
            PASTCOMPANIES:[
             {
                type:String
             }
            ],
          img:{
            type:String
          },
          detail:{
            
            type:String
            
          },
        }
    ],
    imagePath:{
        type: String
    },
    noOfLessons:{
        type: Number
    },
    questions: [
        {
         head:{ type: String, required: true },
          questionText: { type: String, required: true }, // Question statement
          type: { type: String, enum: ["input", "mcq", "match", "fill"], required: true }, // Type of question
          options: [{ type: String }], // Options for MCQ
          correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true }, // Can be a string, array, or object
          matchPairs: [
            {
              left: { type: String },
              right: { type: String },
            },
          ],
        },
      ],

})

module.exports = mongoose.model("Course",courseSchema)