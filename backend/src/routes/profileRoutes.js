import express from "express";
import {
  getHealth,
  createProfile,
  getProfile,
  updateProfile,
  getProjectsBySkill,
  getTopSkills,
  search,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// Health route
router.get("/health", getHealth);

// Profile routes
router.post("/api/profile", createProfile);
router.get("/api/profile", getProfile);
router.put("/api/profile", updateProfile);
router.delete("/api/profile", deleteProfile);

// Projects and skills routes
router.get("/api/projects", getProjectsBySkill);
router.get("/api/skills/top", getTopSkills);

// Search route
router.get("/api/search", search);

export default router;
