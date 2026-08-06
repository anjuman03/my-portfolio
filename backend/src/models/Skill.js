const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 50,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Programming",
        "Frontend",
        "Backend",
        "Database",
        "Tools",
        "Cloud",
        "Other",
      ],
    },

    icon: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);