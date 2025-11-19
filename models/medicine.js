import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { ulid } from "ulid";


const Medicine = sequelize.define(
  "Medicine",
  {
    id: {
        type: DataTypes.STRING(26),
        primaryKey: true,
        defaultValue: () => ulid()
    },
   med_name: DataTypes.STRING,
    closet: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    dose: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  },
  {
    tableName: "medicine",     // ✅ match Laravel table
    freezeTableName: true,      // ✅ don't pluralize
    timestamps: true,           // ✅ use Laravel timestamps
    createdAt: "created_at",    // ✅ match Laravel's column names
    updatedAt: "updated_at",
  }
);

export default Medicine;