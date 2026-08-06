const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Freelance",
        "Contract",
      ],
      default: "Internship",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Experience",
  experienceSchema
);