const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },


    shortDescription: {
      type: String,
      required: true,
      maxlength: 250,
    },

    description: {
      type: String,
      required: true,
    },

    coverImage: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    category: {
      type: String,
      enum: [
        "Full Stack",
        "Frontend",
        "Backend",
        "AI/ML",
        "Mobile",
        "Other",
      ],
      default: "Full Stack",
    },

    githubUrl: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);





module.exports = mongoose.model(
  "Project",
  projectSchema
);