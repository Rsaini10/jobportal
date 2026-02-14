# Job Portal - Complete Setup Guide

This guide will help you set up both the backend and frontend of the Job Portal application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- MongoDB (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- Git - [Download](https://git-scm.com/downloads)
- A code editor (VS Code recommended)

## Part 1: Backend Setup

### Step 1: Verify MongoDB is Running

Open a terminal and run:
```bash
mongod --version
```

Start MongoDB (if not already running):
```bash
# On Windows (if installed as service, it runs automatically)
# On Mac/Linux:
mongod
```

### Step 2: Navigate to Backend Directory

```bash
cd path/to/your/backend-folder
```

### Step 3: Install Backend Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- multer

### Step 4: Create Environment File

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jobportal
JWT_SECRET=mysecretkey
```

**Important**: Change `JWT_SECRET` to a secure random string in production!

### Step 5: Create Routes Folder

Your backend should have a `routes` folder with these files:

**routes/authRoutes.js:**
```javascript
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
```

**routes/jobRoutes.js:**
```javascript
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
  createJob,
  deleteJob,
  getAllJobs,
} = require("../controllers/jobController");
const {
  applyToJob,
  getJobApplicants,
} = require("../controllers/applicationController");

// Public route
router.get("/", getAllJobs);

// Recruiter routes
router.post("/", protect, authorizeRoles("recruiter"), createJob);
router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);
router.get("/:id/applicants", protect, authorizeRoles("recruiter"), getJobApplicants);

// Applicant routes
router.post("/:id/apply", protect, authorizeRoles("applicant"), upload.single("resume"), applyToJob);

module.exports = router;
```

### Step 6: Create Uploads Folder

```bash
mkdir uploads
```

This folder will store uploaded resumes.

### Step 7: Start the Backend Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: 127.0.0.1
```

### Step 8: Test Backend API

Open your browser or Postman and test:
```
http://localhost:5000
```

You should see: `Job Portal API is running...`

## Part 2: Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a new terminal window:
```bash
cd path/to/job-portal-frontend
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

**Note**: This may take 2-5 minutes depending on your internet speed.

### Step 3: Verify API URL

The frontend is configured to connect to `http://localhost:5000/api` by default.

If your backend runs on a different port, create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:YOUR_PORT
```

### Step 4: Start the Frontend Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## Part 3: Using the Application

### Initial Setup

1. **Open the app**: Navigate to `http://localhost:3000`
2. **Register as Recruiter**: Click "Register" → Select "Recruiter" → Fill form
3. **Register as Applicant**: Open incognito window → Click "Register" → Select "Job Seeker"

### As a Recruiter

1. **Login** with recruiter credentials
2. **Create a Job**:
   - Click "+ Create New Job"
   - Fill in job details (title, company, location, salary, description)
   - Click "Create Job"
3. **View Your Jobs**: See all jobs you've posted in the dashboard
4. **View Applicants**: Click "View Applicants" on any job
5. **Delete Jobs**: Click "Delete" to remove a job posting

### As an Applicant

1. **Login** with applicant credentials
2. **Browse Jobs**: View all available positions
3. **Apply to Job**:
   - Click "Apply Now" on any job card
   - Upload your resume (must be PDF, max 5MB)
   - Click "Submit Application"
4. **Track Applications**: View jobs you've applied to

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Ensure MongoDB is running
- Check MONGO_URI in `.env`
- Try: `mongodb://localhost:27017/jobportal` instead of `127.0.0.1`

### Issue: "CORS error" in browser console
**Solution**: 
- Ensure `cors` is installed in backend: `npm install cors`
- Add to `app.js`: `app.use(cors())`

### Issue: "Token invalid" or authentication errors
**Solution**:
- Clear browser localStorage: Open DevTools → Application → Local Storage → Delete
- Ensure JWT_SECRET is same as when token was created
- Re-login after clearing storage

### Issue: "File upload failed"
**Solution**:
- Ensure `uploads/` folder exists in backend
- Check file is PDF format
- Verify file size is under 5MB
- Ensure multer is installed: `npm install multer`

### Issue: Frontend shows "Loading..." forever
**Solution**:
- Check backend is running on port 5000
- Open DevTools → Network tab to see failed requests
- Verify API endpoints are correct

### Issue: "Module not found" errors
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Testing the Complete Flow

### Test Case 1: Job Creation and Application

1. **As Recruiter**:
   - Login → Dashboard → Create Job
   - Title: "Software Engineer"
   - Company: "Tech Corp"
   - Location: "Remote"
   - Salary: 100000
   - Description: "Looking for experienced developer"

2. **As Applicant** (new browser/incognito):
   - Login → Browse Jobs
   - Find "Software Engineer" position
   - Apply with resume
   - Confirm success message

3. **Back to Recruiter**:
   - Dashboard → View Applicants
   - See applicant name, email, resume link
   - Click "View Resume" to download

### Test Case 2: Role-Based Access

1. **As Applicant**:
   - Try accessing: `http://localhost:3000/recruiter/dashboard`
   - Should redirect to jobs page (no access)

2. **As Recruiter**:
   - Try applying to a job
   - Should see "Only applicants can apply" message

## Project Structure

```
job-portal/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Application.js
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── uploads/          (created automatically)
│   ├── .env
│   ├── app.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## Production Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a secure random string
- [ ] Set up MongoDB Atlas or production database
- [ ] Update MONGO_URI to production database
- [ ] Enable environment-based configuration
- [ ] Set up proper CORS origins (not wildcard)
- [ ] Add rate limiting and security middleware
- [ ] Set up file size limits and validation
- [ ] Configure proper error handling
- [ ] Set up logging system
- [ ] Add HTTPS/SSL certificates
- [ ] Set up backup strategy for database
- [ ] Configure CDN for resume files
- [ ] Add monitoring and analytics

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "applicant" // or "recruiter"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { "id": "...", "name": "...", "email": "...", "role": "..." }
}
```

### Job Endpoints

#### Get All Jobs
```
GET /api/jobs

Response:
{
  "count": 5,
  "jobs": [...]
}
```

#### Create Job (Recruiter only)
```
POST /api/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "Remote",
  "salary": 100000,
  "description": "Job description here"
}
```

#### Delete Job (Recruiter only)
```
DELETE /api/jobs/:id
Authorization: Bearer {token}
```

#### Apply to Job (Applicant only)
```
POST /api/jobs/:id/apply
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- resume: (PDF file)
```

#### Get Job Applicants (Recruiter only)
```
GET /api/jobs/:id/applicants
Authorization: Bearer {token}

Response:
{
  "totalApplicants": 3,
  "applications": [...]
}
```

## Support

For issues, questions, or contributions:
1. Check this guide first
2. Review the README.md
3. Open an issue in the repository
4. Contact the development team

## Next Steps

Once everything is working:
1. Explore the codebase
2. Customize the UI/styling
3. Add new features
4. Implement search and filters
5. Add email notifications
6. Create admin panel
7. Deploy to production

Happy coding! 🚀
