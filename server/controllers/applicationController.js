const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Application.create({
      applicant: req.user._id,
      job: req.params.id,
      resume: req.file.path,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getJobApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // 1️⃣ Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2️⃣ Check ownership (very important)
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to view applicants for this job",
      });
    }

    // 3️⃣ Find applications for this job
    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.json({
      totalApplicants: applications.length,
      applications,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { applyToJob,getJobApplicants };
