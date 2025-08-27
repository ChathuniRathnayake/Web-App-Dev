const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");
const { start } = require("node:repl");

//@desc   Create a new resume
//@route  POST/api/resume
//@access Private
const createResume = async (req, res) => {
    try {

        const {title} = req.body;

        //default template
        const defaultResumeData = {
            profileInfo:{
                profileImg: null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:"",
            },
            contactInfo:{
                email:"",
                phone:"",
                location:"",
                linkedin:"",
                github:"",
                website:"",
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
                    institution:"",
                    degree:"",
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
            projects:[
                {
                    title:"",
                    github:"",
                    description:"",
                    liveDemo:"",
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
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

//@desc   Get resume of logged-in user
//@route  GET/api/resume
//@access Private
const getUserResume = async (req, res) => {
    try{
        const resumes = await Resume.find({userId: req.user_id}).sort({updateAt: -1});
        res.json(resumes);
    }
    catch (error){
         res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

//@desc   Get single resume by ID
//@route  GET/api/resume/:id
//@access Private
const getResumeById = async (req, res) => {
    try{
        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        res.json(resume);

    }
    catch (error){
         res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

//@desc   Update resume
//@route  PUT/api/resume/:id
//@access Private
const updateResume = async (req, res) => {
    try{
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if(!resume){
            return res.status(404).json({message: "Resume not found or unauthorized"});
        }

        //merge updates
        Object.assign(resume, req.body);

        //save updated resume
        const savedResume = await resume.save();

        res.json(savedResume);
    }
    catch (error){
         res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

//@desc   Delete resume
//@route  DELETE/api/resume/:id
//@access Private
const deleteResume = async (req, res) => {
    try{
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if(!resume){
            return res.status(404).json({message:"Resume not found or unauthorized"});
        }

        //delete thumbnailLink and profileViewUrl images from uploads folder
        const uploadsFolder = path.join(__dirname, '..', 'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldProfile);
        }

        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if(!deleted){
            return res.status(404).json({message: "Resume not found ir unauthorized"});
        }
        res.json({message: "Resume deleted successfully"})
    
    }
    catch(error){
        res.status(500).json({message:"Failed to create resume", error: error.message});
    }
};

module.exports = {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume,
};