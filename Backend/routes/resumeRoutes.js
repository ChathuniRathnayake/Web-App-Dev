const express = require("express");
const {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume
} = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");
const {uploadResumeImages} = require("../controllers/uploadImages");

const router = express.Router();

router.post("/", protect, createResume); //create resume
router.get("/", protect, getUserResume); // get resume
router.get("/:id", protect, getResumeById);//get resume by ID
router.put("/:id", protect, updateResume); //update resume
router.put("/:id/upload-images", protect, uploadResumeImages);

router.delete("/:id", protect, deleteResume); //delete resume


module.exports = router;