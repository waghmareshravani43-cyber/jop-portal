const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job" });
  }
};

// Get Jobs with Filters
exports.getJobs = async (req, res) => {
  try {
    const { location, workType } = req.query;

    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (workType) {
      filter.workType = workType;
    }

    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Get Distinct Locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Job.distinct("location");
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

// Get Distinct Work Types
exports.getWorkTypes = async (req, res) => {
  try {
    const workTypes = await Job.distinct("workType");
    res.json(workTypes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch work types" });
  }
};
