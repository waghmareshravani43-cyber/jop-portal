const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/locations", jobController.getLocations);
router.get("/worktypes", jobController.getWorkTypes);

module.exports = router;
