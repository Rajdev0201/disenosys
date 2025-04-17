const findJob = require("../models/findJob.js");


exports.postJob = async (req,res) => {
    const { title, description, companyName, type, location, experience, level, salary, jobPosted, jobExpire } = req.body;
    const logo = req.file.path;

    try {
        const newJob = await findJob.create({
            title,
            description,
            logo,
            companyName,
            type,
            location,
            experience,
            level,
            salary,
            jobPosted,
            jobExpire
        });


        res.status(201).json({
            success: true,
            message: "Job Details created Successfully.",
            newJob
        });
    } catch (error) {
        console.error("Error saving to the database:", error);
        return res.status(500).json({
            success: false,
            message: "There was an issue saving the job."
        });
    }
}



exports.getJob = async (req,res) => {
    try {
        const jobs = await findJob.find();
        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            success: false,
            message: "There was an issue fetching the jobs."
        });
    }
}