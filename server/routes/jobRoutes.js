
const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { createJob,deleteJob,getAllJobs } = require("../controllers/jobController");
const upload = require("../middlewares/uploadMiddleware");
const { applyToJob,getJobApplicants } = require("../controllers/applicationController");

// POST /api/jobs
router.post("/", protect, authorizeRoles("recruiter"), createJob);
// GET /api/jobs
router.get("/", getAllJobs);

router.delete("/:id",protect,authorizeRoles("recruiter"),
  deleteJob
);
// POST /api/jobs/:id/apply
router.post("/:id/apply",protect,authorizeRoles("applicant"),upload.single("resume"),applyToJob
);
router.get(
  "/:id/applicants",
  protect,
  authorizeRoles("recruiter"),
  getJobApplicants
);


module.exports = router;
