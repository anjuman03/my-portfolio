const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },

    grade: {
      type: String,
      default: "",
    },

    startYear: {
      type: Number,
      required: true,
    },

    endYear: {
      type: Number,
      default: null,
    },

    currentlyStudying: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
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
  "Education",
  educationSchema
);