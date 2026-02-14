//
const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//delete job 
// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only owner recruiter can delete
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this job",
      });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get All Jobs (Public)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob,deleteJob,getAllJobs };
