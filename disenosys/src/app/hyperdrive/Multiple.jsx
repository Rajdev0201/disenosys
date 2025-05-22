"use client"
import React, { useState } from 'react'
import StepOne from './Stepone';
import StepTwo from './Steptow';
import StepThree from './Stepthree';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Multiple = () => {
      const [currentStep, setCurrentStep] = useState(1);
      const[load,setLoad] = useState(false);
      const [isChecked, setIsChecked] = useState(false);
      const router = useRouter();
      const initialFormData = {
        fname: "",
        lname:"",
        dob: new Date(),
        gender:"",
        permanent:"",
        communication:"",
        no1:"",
        no2:"",
        emg:"",
        email:"",
        panno:"",
        aadharno:"",
        blood:"",
        father:"",
        mother:"",
        marital:"",
        n1:"",
        ndob: new Date(),
        nrealtion:"",
        naddress:"",
        bank:"",
        branch:"",
        Ac:"",
        IFSC:"",
        Edu:"",
        Passed:"",
        Academy:"",
        isIndia:"yes",
        idProof:null,
        profile:null,
        file:null,
        ten:null,
        plustwo:null,
        ug:null,
        pg:null,
        afile:null,
        voter:null,
        pan:null,
        rdate:new Date(),
        cdate: new Date(),
        cname:"",
        mode:"",
        sid:"",
        end: "Not Completed",
        status: "In-progress",
      };
    
      const [formData, setFormData] = useState(initialFormData);


      const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            fname,
            lname,
            dob,
            gender,
            permanent,
            communication,
            no1,
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
            idProof,
            profile,
            ten,
            plustwo,
            ug,
            pg,
            afile,
            voter,
            pan,
            rdate,
            cdate,
            cname,
            mode,
        } = formData;
      
        // Validation checks
        if (!fname.trim()) {
          alert("Error: First Name is required.");
          return;
        }
        if (!lname.trim()) {
            alert("Error: Last Name is required.");
            return;
          }
        
          if (!dob) {
            alert("Error: dob is required.");
            return;
          }

          if (!gender.trim()) {
            alert("Error: Gender is required.");
            return;
          }

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
          alert("Error: Please enter a valid email address.");
          return;
        }
       
        if (!permanent.trim()) {
            alert("Error: permanent address is required.");
            return;
          }

          if (!communication.trim()) {
            alert("Error: communication address is required.");
            return;
          }

          if (!no1) {
            alert("Error: Personal number is required.");
            return;
          }

          if (!emg) {
            alert("Error: Emergency number is required.");
            return;
          }

      
        // if (!panno.trim()) {
        //   alert("Error: Pan number is required.");
        //   return;
        // }
      
        // if (!aadharno.trim()) {
        //   alert("Error: Aadhar no is required.");
        //   return;
        // }
      
        if (!blood.trim()) {
          alert("Error: Blood group is required.");
          return;
        }
      
        if (!father.trim()) {
          alert("Error: Father name is required.");
          return;
        }
      
        if (!mother.trim()) {
          alert("Error: Mother name is required.");
          return;
        }

        if (!marital.trim()) {
            alert("Error: Marital Status is required.");
            return;
          }

          if (!n1.trim()) {
            alert("Error: nominee name is required.");
            return;
          }

          if (!ndob) {
            alert("Error: Nominee DOB is required.");
            return;
          }

          if (!nrealtion.trim()) {
            alert("Error: Nominee Relationship is required."); 
            return;
          }
          if (!naddress.trim()) {
            alert("Error: nominee address is required.");
            return;
          } 

          if (!bank.trim()) {
            alert("Error: bank name is required.");
            return;
          } 
      
          if (!branch.trim()) {
            alert("Error: bank branch is required.");
            return;
          } 
       
          if (!Ac.trim()) {
            alert("Error: bank Ac is required.");
            return;
          } 

          if (!IFSC.trim()) {
            alert("Error: IFSC code is required.");
            return;
          } 
          
          if (!Edu.trim()) {
            alert("Error: Highest Qualification is required.");
            return;
          } 
          
          if (!Passed.trim()) {
            alert("Error: Passed out year is required.");
            return;
          } 
          
          if (!Academy.trim()) {
            alert("Error: Academy Name is required.");
            return;
          } 

          if (isIndia === null) {
            alert("Please select if you are Indian or not.");
            return;
          }
          if (!mode.trim()) {
            alert("Error: Please enter your course preference.");
            return;
          }

          
          if (isIndia === "yes") {
            if (!panno || !aadharno) {
              alert("Error: Pan and Aadhar are required for Indian applicants.");
              return;
            }
          }
      
          if (isIndia === "yes") {
            if (!profile || !ten || !plustwo || !ug  || !afile || !pan || !voter) {
              alert("Error: All documents are required for Indian applicants.");
              return;
            }
          } else {
            if (!profile || !idProof) {
              alert("Error: All docs are required for non-Indian applicants.");
              return;
            }
          }
               
          if (!rdate) {
            alert("Error: Registration Date is required.");
            return;
          } 
          if (!cdate) {
            alert("Error: Course join Date is required.");
            return;
          }
          if (!cname) {
            alert("Error: Course name is required.");
            return;
          }
          
    
        const form = new FormData();
        form.append("fname", formData.fname);
        form.append("lname", formData.lname);
        form.append("dob", formData.dob);
        form.append("gender", formData.gender);     
        form.append("permanent",formData.permanent);
        form.append("communication",formData.communication);
        form.append("no1",formData.no1); 
        form.append("no2",formData.no2); 
        form.append("emg",formData.emg); 
        form.append("email",formData.email); 
        form.append("panno",formData.panno); 
        form.append("aadharno",formData.aadharno); 
        form.append("blood",formData.blood); 
        form.append("father",formData.father); 
        form.append("mother",formData.mother); 
        form.append("marital",formData.marital); 
        form.append("n1",formData.n1);       
        form.append("ndob",formData.ndob);  
        form.append("nrealtion",formData.nrealtion);    
        form.append("naddress",formData.naddress);    
        form.append("bank",formData.bank);    
        form.append("branch",formData.branch); 
        form.append("Ac",formData.Ac);     
        form.append("IFSC",formData.IFSC);   
        form.append("Edu",formData.Edu);
        form.append("Passed",formData.Passed);
        form.append("Academy",formData.Academy);
        form.append("isIndia",formData.isIndia);
        form.append("idProof",formData.idProof);
        form.append("profile",formData.profile);
        form.append("file",formData.file);
        form.append("ten",formData.ten);
        form.append("plustwo",formData.plustwo);
        form.append("ug",formData.ug);
        form.append("pg",formData.pg);                  
        form.append("afile", formData.afile);
        form.append("voter", formData.voter);
        form.append("pan", formData.pan);
        form.append("rdate", formData.rdate);
        form.append("cdate", formData.cdate);
        form.append("cname", formData.cname);
        form.append("mode",formData.mode); 
        form.append("sid", formData.sid);
        form.append("start", formData.sid);
        form.append("end", formData.end);
        form.append("status", formData.status);
        try {
          setLoad(true);
          await axios.post("https://disenosys-dkhj.onrender.com/studentadd", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          alert("Form submitted successfully!");
          router.push("/applied");
          setFormData(initialFormData);
        } catch (error) {
          console.error("Error submitting career:", error);
          alert("Error" + error.response.data.message);
        }
        setLoad(false);
      };
    const nextStep = () => {

        setCurrentStep((prev) => prev + 1);
      }
      const prevStep = () => setCurrentStep((prev) => prev - 1);
    
  return (
    <div className="lg:max-w-2xl mx-auto mt-16 lg:mt-24 lg:mb-10 border rounded-lg shadow-md bg-white">
    <div className="flex items-center justify-between px-8 py-6">
    <div className="flex items-center w-full">
  <div
    className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium ${
      currentStep >= 1 ? "bg-sky-600 text-white rounded-full" : "bg-white text-sky-600 ring-2 rounded-full ring-sky-600"
    }`}
  >
    1
  </div>
  <div
    className={`h-1 w-[50px] lg:w-[220px] px-4 ${
      currentStep >= 2 ? "bg-gray-100" : "bg-gray-300"
    }`}
  ></div>
</div>

<div className="flex items-center w-full">
  <div
    className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium ${
      currentStep >= 2 ? "bg-sky-600 text-white rounded-full" : "bg-white text-sky-600 ring-2 rounded-full ring-sky-600"
    }`}
  >
    2
  </div>
  <div
    className={`h-1 w-[50px] lg:w-[240px] ${
      currentStep >= 3 ? "bg-blue-100" : "bg-gray-300"
    }`}
  ></div>
</div>

<div className="flex items-center">
  <div
    className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium ${
      currentStep === 3 ? "bg-sky-600 text-white rounded-full" : "bg-white text-sky-600 ring-2 rounded-full ring-sky-600"
    }`}
  >
    3
  </div>
</div>
</div>

    <div className="p-6">
      {currentStep === 1 && (
        <StepOne  
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep} />
      )}
      {currentStep === 2 && (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 3 && (
        <StepThree
        formData={formData}
        setFormData={setFormData}
        prevStep={prevStep}
        handleSubmit={handleSubmit}
        initialFormData={initialFormData} 
        isChecked={isChecked}
        setIsChecked={setIsChecked} 
        load={load}
        />
      )}
    </div>
  </div>
  )
}

export default Multiple