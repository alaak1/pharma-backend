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
  const medicine = await Medicine.create(req.body);
  res.status(201).json(medicine);
};

export const update = async (req, res) => {
  const medicine = await Medicine.findByPk(req.params.id);
  if (!medicine) return res.status(404).json({ message: "Not found" });
  await medicine.update(req.body);
  res.json({ message: "Updated successfully", medicine });
};
