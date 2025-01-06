"use client";
import React from "react";
import { motion } from "framer-motion";

const Learn = () => {
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.6 } },
  };

  return (
    <div className="flex justify-center items-center min-h-screen  mt-12">
      <div className="relative flex flex-col items-center">
        <div className="absolute right-0 lg:left-[450px] h-full w-1 bg-[#182073] rounded-full flex flex-col items-center">
          {/* Top Rounded Shape */}
          <div className="w-4 h-4 bg-[#057FE3] rounded-full -mt-2"></div>
          {/* Middle Rounded Shape */}
          <div className="w-4 h-4 bg-[#057FE3] rounded-full mt-auto mb-auto"></div>
          {/* Bottom Rounded Shape */}
          <div className="w-4 h-4 bg-[#057FE3] rounded-full mt-2"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:lg:text-lg font-bold">
              Introduction to Automotive Design Workflow
              </h2>
              <p>
              Discover how designs move from concepts to production and the key stages in the process.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 lg:gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg col-start-2  w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">Tools of the Trade: Industry Software Overview</h2>
              <p>
              Get a quick introduction to essential software like Alias, CATIA, and SolidWorks.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">
              Sketching Basics for Automotive Design
              </h2>
              <p>
              Learn the foundations of automotive sketching and bring your initial ideas to life.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 lg:gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg col-start-2 w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">Design Thinking and Ideation</h2>
              <p>
              Explore creative problem-solving techniques for innovative automotive concepts.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 lg:gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">
              Emerging Trends in Automotive Design
              </h2>
              <p>
              Understand the latest industry trends, from electric vehicles to autonomous technologies.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 lg:gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg col-start-2 w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">Materials and Manufacturing Overview</h2>
              <p>
              Gain insights into automotive materials and how they influence design and production.
              </p>
            </div>
          </div>
        </motion.div>
       
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">
              Career Pathways in Automotive Design
              </h2>
              <p>
              Explore career opportunities in the industry and what skills employers look for.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="grid lg:grid-cols-2 lg:gap-28 items-center mb-10">
            <div className="bg-white p-6 shadow-lg rounded-lg col-start-2  w-[250px] h-[200px] lg:w-[400px] lg:h-[150px]">
              <h2 className="lg:text-lg font-bold">Insider Tips for Building a Portfolio</h2>
              <p>
              Learn what makes a design portfolio stand out and impress top employers.
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Learn;
