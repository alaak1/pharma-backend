import Medicine from "../models/medicine.js";

export const getAll = async (req, res) => {
  try {
    const medicines = await Medicine.findAll({
      order: [["id", "ASC"]], // optional for sorted results
    });
    return res.json(medicines); // ✅ clean JSON
  } catch (error) {
    console.error("❌ Error fetching medicines:", error);
    return res.status(500).json({
      error: "Failed to fetch medicines",
      details: error.message,
    });
  }
};


export const getById = async (req, res) => {
  const medicine = await Medicine.findByPk(req.params.id);
  if (!medicine) return res.status(404).json({ message: "Not found" });
  res.json(medicine);
};

export const create = async (req, res) => {
    console.log("REQ BODY FROM FRONTEND:", req.body);
console.log("RAW BODY:", req.rawBody);
console.log("HEADERS:", req.headers);
  try {
    const medicine = await Medicine.create(req.body);

    return res.status(201).json({
      message: "Medicine created successfully",
      data: medicine
    });
    
  } catch (error) {
    console.error("Error creating medicine:", error);

    return res.status(500).json({
      message: "Failed to create medicine",
      error: error.message,
      details: error
    });
  }
};

export const update = async (req, res) => {
  const medicine = await Medicine.findByPk(req.params.id);
  if (!medicine) return res.status(404).json({ message: "Not found" });
  await medicine.update(req.body);
  res.json({ message: "Updated successfully", medicine });
};
