import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { ulid } from "ulid";



const Medicine = sequelize.define(
  "Medicine",
  {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => ulid() },
    med_name: DataTypes.STRING,
    closet: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    dose: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  },
  {
    tableName: "medicine",     
    freezeTableName: true,    
    timestamps: true,           
    createdAt: "created_at",  
    updatedAt: "updated_at",
  }
);

export default Medicine;