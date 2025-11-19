import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => res.json({ status: "online" }));
app.use("/api", authRoutes);
app.use("/api/medicine", medicineRoutes);

const PORT = process.env.PORT || 8080;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
