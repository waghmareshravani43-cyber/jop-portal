const Application = require("../models/application");

exports.applyJob = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ message: "Application Submitted" });
  } catch (err) {
    res.status(500).json({ error: "Application failed" });
  }
};
