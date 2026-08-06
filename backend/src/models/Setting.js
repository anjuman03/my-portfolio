const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    /* -------------------------------------------------------------------------- */
    /*                            Portfolio Details                               */
    /* -------------------------------------------------------------------------- */

    portfolioName: {
      type: String,
      default: "",
      trim: true,
    },

    fullName: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      default: "",
      trim: true,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
    },

    about: {
      type: String,
      default: "",
    },

    /* -------------------------------------------------------------------------- */
    /*                              Contact Info                                  */
    /* -------------------------------------------------------------------------- */

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    /* -------------------------------------------------------------------------- */
    /*                              Social Links                                  */
    /* -------------------------------------------------------------------------- */

    github: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    twitter: {
      type: String,
      default: "",
      trim: true,
    },

    leetcode: {
      type: String,
      default: "",
      trim: true,
    },

    hackerrank: {
      type: String,
      default: "",
      trim: true,
    },

    codechef: {
      type: String,
      default: "",
      trim: true,
    },

    codeforces: {
      type: String,
      default: "",
      trim: true,
    },

    /* -------------------------------------------------------------------------- */
    /*                               Profile Image                                */
    /* -------------------------------------------------------------------------- */

    profileImage: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    /* -------------------------------------------------------------------------- */
    /*                                  Resume                                    */
    /* -------------------------------------------------------------------------- */

    resume: {
  url: {
    type: String,
    default: "",
  },

  publicId: {
    type: String,
    default: "",
  },

  downloadUrl: {
    type: String,
    default: "",
  },
},

    resumeButtonText: {
      type: String,
      default: "Download Resume",
    },

    /* -------------------------------------------------------------------------- */
    /*                                 Settings                                   */
    /* -------------------------------------------------------------------------- */

    themeColor: {
      type: String,
      default: "#2563eb",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Setting",
  settingSchema
);