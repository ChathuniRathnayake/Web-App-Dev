/* eslint-disable no-unused-vars */
import React, {useRef, useState, useEffect} from 'react'
import { LuArrowLeft, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2 } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import TitleInput from '../../Components/Inputs/TitleInput';
import {useReactToPrint} from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from '../../Components/StepProgress';
import ProfileInfoForm from './forms/ProfileInfoForm';
import ContactInfoForm from './forms/ContactInfoForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationDetailsForm from './forms/EducationDetailsForm';


const EditResume = () => {

  const {resumeId} = useParams();
  const navigate =useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef (null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("education-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink:"",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl:"",
      fullName:"",
      designation:"",
      summary:"",
    },
    template:{
      theme:"",
      colorPalette:"",
    },
    contactInfo:{
      email:"",
      phone:"",
      location:"",
      linkedIn:"",
      github:"",
      website:""

    },
    workExperience:[
      {
        company:"",
        role:"",
        startDate:"",
        endDate:"",
        description:"",
      },
    ],
    education:[
      {
        degree:"",
        institution:"",
        startDate:"",
        endDate:"",
      },
    ],
    skills:[
      {
        name:"",
        progress:0,
      },
    ],
    certifications:[
      {
        title:"",
        issuer:"",
        year:"",
      },
    ],
    languages:[
      {
        name:"",
        progress:0,
      },
    ],
    interests:[""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  //validate inputs
  const validateAndNext = (e) => {};

  // Function to navigate to the next page
  const goToNextStep = () => {};

  // Function to navigate to the previous page
  const goBack = () => {};

  const renderForm = () => {
    switch (currentPage){
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return(
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) =>{
              updateSection("contactInfo", key, value);
            }}
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />
        );

        case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );

        case "skills":
          return (
            <SkillsInfoForm
              skillsInfo={resumeData?.skills}
              updateArrayItem={(index, key, value) => {
                updateArrayItem("skills", index, key, value);
              }}
              addArrayItem={(newItem) => addArrayItem("skills", newItem)}
              removeArrayItem={(index) => removeArrayItem("skills", index)}/>
          );

      default:
        return null
    }
      
  };

  // Update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Update array item (like workExperience [0], skills [1], etc.)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      
      if (key===null) {
        updatedArray[index] = value; // for simple strings like in interests
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }
        
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section],newItem],
    }));
  };

  // Remove item from array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) =>{
      const updateArray = [...prev[section]];
      updateArray.splice(index, 1);
      return{
        ...prev,
        [section]: updateArray,
      };
    });
  };

  // Fetch resume info by ID
  const fetchResumeDetailsById = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID (resumeId)
      );

      if (response.data && response.data.profileInfo) {
      const resumeInfo = response.data;
      setResumeData((prevState) => ({
        ...prevState,
        title: resumeInfo?.title || "Untitled",
        template: resumeInfo?.template || prevState?.template,
        profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
        contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
        workExperience:
          resumeInfo?.workExperience || prevState?.workExperience,
        education: resumeInfo?.education || prevState?.education,
        skills: resumeInfo?.skills || prevState?.skills,
        projects: resumeInfo?.projects || prevState?.projects,
        certifications:
          resumeInfo?.certifications || prevState?.certifications,
        languages: resumeInfo?.languages || prevState?.languages,
        interests: resumeInfo?.interests || prevState?.interests,
      }));
      
    }}
    catch(error){
      console.error("Error fetching resumes", error);
    }
  };

  // upload thumbnail and resume profile img
  const uploadResumeImages = async () => {};
  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {};

  // Delete Resume
  const handleDeleteResume = async () => {};

  // download resume
  const reactToPrintFn = useReactToPrint({contentRef: resumeDownloadRef });

  // Function to update baseWidth based on the resume container size
  const updateBaseWidth = () => {};

  useEffect (() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  },[] );

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
          <TitleInput 
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }></TitleInput>

            <div className="flex items-center gap-4">
              <button 
                className="btn-small-light"
                onClick={() => setOpenThemeSelector(true)}>

                <LuPalette className="text-[16px]"/>
                <span className="hidden md:block">Change Theme</span>
              </button>

              <button className="btn-small-light" onClick={handleDeleteResume}>
                <LuTrash2 className="text-[16px]"/>
                <span className="hidden md:block">Delete</span>
              </button>

              <button className="btn-small-light" onClick={setOpenPreviewModal(true)}>
                <LuDownload className="text-[16px]"/>
                <span className="hidden md:block">Preview and Download</span>
              </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cold-2 gap-5">
            <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
              
              <StepProgress progress={0}/>
              
              {renderForm()}
              <div className="mx-5">
                {errorMsg && (
                  <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                    <LuCircleAlert className="text-md"/>{errorMsg}
                  </div>
                )}

                <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                  <button 
                    className="btn-small-light" 
                    onClick={goBack}
                    disabled = {isLoading}
                  >
                    <LuArrowLeft className="text-[16px]"/>
                    Back
                  </button>
                  <button
                    className="btn-small-light"
                    onClick={uploadResumeImages}
                    disabled={isLoading}>
                      <LuSave className="text-[16px]"/>
                      {isLoading ? "updating..." : "Save & exit"}
                    </button>

                  <button 
                    className="btn-small"
                    onClick={validateAndNext}
                    disabled={isLoading}>
                      {currentPage === "additionalInfo" && (
                        <LuDownload className="text-[16px]"/>
                      )}
                      {currentPage === "additionalInfo"
                        ? "Preview & Download"
                        : "Next"}
                      {currentPage !== "additionalInfo" &&(
                        <LuArrowLeft classname="text-[16px] rotate-180"/>
                      )}
                    </button>
                </div>
              </div>
            </div>
        </div>

        <div ref={resumeRef} className="h-[100vh]"></div>

      </div>
    </DashboardLayout>
  )
}

export default EditResume
