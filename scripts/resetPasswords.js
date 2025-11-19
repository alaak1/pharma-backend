import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";
import User from "../models/user.js";

(async () => {
  try {
    const users = await User.findAll();
    const newPassword = "pharma123";

    for (const user of users) {
      const hash = await bcrypt.hash(newPassword, 10);
      user.password = hash;
      await user.save();
      console.log(`✅ Updated password for ${user.email}`);
    }

    console.log("All user passwords reset successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error resetting passwords:", err.message);
    process.exit(1);
  }
})();
