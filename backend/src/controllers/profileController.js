import Profile from "../models/Profile.js";

// Health check
export const getHealth = (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy ✅" });
};

// Create profile
export const createProfile = async (req, res, next) => {
  try {
    const existingProfile = await Profile.findOne();

    if (existingProfile) {
      return res.status(409).json({
        status: "error",
        message: "Profile already exists",
      });
    }

    const profile = new Profile(req.body);
    await profile.save();

    res.status(201).json({
      status: "success",
      message: "Profile created",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// Get profile
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Profile updated",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// Get projects by skill
export const getProjectsBySkill = async (req, res, next) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({
        status: "error",
        message: "Skill query parameter is required",
      });
    }

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    const filteredProjects = profile.projects.filter((project) =>
      project.techStack.some(
        (tech) => tech.toLowerCase() === skill.toLowerCase()
      )
    );

    res.status(200).json({
      status: "success",
      data: {
        skill,
        count: filteredProjects.length,
        projects: filteredProjects,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get top skills
export const getTopSkills = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    const skillCount = {};

    profile.projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        skillCount[tech] = (skillCount[tech] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);

    res.status(200).json({
      status: "success",
      data: topSkills,
    });
  } catch (err) {
    next(err);
  }
};

// Search
export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    const query = q.toLowerCase();
    const results = {
      nameMatch: [],
      skillsMatch: [],
      projectsMatch: [],
    };

    // Search name
    if (profile.name.toLowerCase().includes(query)) {
      results.nameMatch = [{ type: "name", value: profile.name }];
    }

    // Search skills
    results.skillsMatch = profile.skills.filter((skill) =>
      skill.toLowerCase().includes(query)
    );

    // Search projects
    results.projectsMatch = profile.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );

    res.status(200).json({
      status: "success",
      query,
      data: results,
    });
  } catch (err) {
    next(err);
  }
};

// Delete profile
export const deleteProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndDelete();

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Profile deleted",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};
