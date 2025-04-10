"use client"
import { motion } from "framer-motion";


const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const AdmissionCourses = () => {
    
    const courses = [
        { title: "CATIA Foundations for Automotive Designers", color: "from-blue-400 to-indigo-600" },
        { title: "Advanced CATIA Surface", color: "from-purple-500 to-pink-600" },
        { title: "Fundamentals Of BIW in Automotive Design", color: "from-green-400 to-teal-600" },
        { title: "Fundamentals of Plastic Trims", color: "from-yellow-400 to-orange-500" },
        { title: "Solid Model Remastering", color: "from-rose-400 to-red-500" },
        { title: "Automotive B-Pillar Assembly", color: "from-cyan-500 to-blue-600" },
        { title: "Bracket And Reinforcement", color: "from-lime-400 to-green-500" },
        { title: "Automotive Close Volume & Feature Creation", color: "from-fuchsia-500 to-violet-600" },
        { title: "Surface Remastering for Automotive Designers", color: "from-amber-400 to-yellow-500" },
      ];
      
  return (
    <div className="bg-white py-12 px-6 font-garet">
      <motion.h2
        className="text-3xl font-bold text-center mb-10 text-blue-500"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false , amount:0.3 }}
      >
        Choose Your Course
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {courses?.map((course, idx) => (
          <motion.div
            key={idx}
            className={`rounded-lg text-white p-6 bg-gradient-to-r ${course?.color} shadow-lg`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={idx}
            viewport={{ once: false , amount:0.3}}
          >
            <h3 className="text-xl font-semibold">{course?.title}</h3>
            <p className="mt-2 text-sm">
              Dive into hands-on projects and interactive lessons taught by professionals.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionCourses;
