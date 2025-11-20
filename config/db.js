import { Sequelize } from "sequelize";
import mysql2 from "mysql2";       // <-- key change here
import dotenv from "dotenv";

dotenv.config();

console.log("Connecting to DB:", process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE);

const sequelize = new Sequelize(
  process.env.DB_DATABASE,      
  process.env.DB_USERNAME,       
  process.env.DB_PASSWORD,      
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,   
    dialect: "mysql",
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    },      
    logging: false,
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
