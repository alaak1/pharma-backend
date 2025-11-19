import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.ENUM("admin", "support", "regular"),
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  },
  {
    tableName: "users",
    freezeTableName: true,
    createdAt: "created_at",  // ✅ match Laravel
    updatedAt: "updated_at",  // ✅ match Laravel
  }
);

export default User;
