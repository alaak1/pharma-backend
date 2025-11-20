import { Sequelize } from "sequelize";
import mysql2 from "mysql2";       // <-- key change here
import dotenv from "dotenv";

dotenv.config();

console.log("Connecting to DB:", process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE);

const sequelize = new Sequelize(
  process.env.DB_DATABASE,       // database
  process.env.DB_USERNAME,       // username
  process.env.DB_PASSWORD,       // password
  {
    host: process.env.DB_HOST,   // hostname
    port: process.env.DB_PORT,   // port number
    dialect: "mysql",
    dialectModule: mysql2,       // <-- use imported mysql2
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

export default sequelize;
