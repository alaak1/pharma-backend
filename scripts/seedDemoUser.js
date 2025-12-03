import bcrypt from "bcrypt";
import dotenv from "dotenv";
import sequelize from "../config/db.js";
import User from "../models/user.js";

dotenv.config();

const DEMO_EMAIL = "demo@pharma.local";
const DEMO_PASSWORD = "demo-view-only";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const existing = await User.findOne({ where: { email: DEMO_EMAIL } });
    if (existing) {
      console.log(`Demo user already exists: ${DEMO_EMAIL}`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
    const demoUser = await User.create({
      first_name: "Demo",
      last_name: "User",
      name: "Demo User",
      phone: "0000000000",
      role: "support", // view-only
      email: DEMO_EMAIL,
      password: hashedPassword,
    });

    console.log(`Created demo user ${demoUser.email} (role=${demoUser.role})`);
    console.log(`Password: ${DEMO_PASSWORD}`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding demo user:", error.message);
    process.exit(1);
  }
})();
