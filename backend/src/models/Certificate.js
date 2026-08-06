const mongoose = require("mongoose");
const slugify = require("slugify");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      unique: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    credentialId: {
      type: String,
      default: "",
      trim: true,
    },

    credentialUrl: {
      type: String,
      default: "",
    },

    image: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
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

certificateSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);