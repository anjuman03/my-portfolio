require("dotenv").config();

const connectDB = require("../src/config/database");
const Admin = require("../src/models/Admin");

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit(0);
    }

    await Admin.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    console.log("✅ Admin created successfully.");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedAdmin();