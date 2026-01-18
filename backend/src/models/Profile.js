import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    education: [
      {
        college: String,
        degree: String,
        year: String,
      },
    ],
    skills: {
      type: [String],
      default: [],
    },
    projects: [
      {
        title: String,
        description: String,
        techStack: [String],
        github: String,
        live: String,
      },
    ],
    links: {
      github: String,
      linkedin: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
