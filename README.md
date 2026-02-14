# Job Portal Frontend

A modern React-based job portal application that connects job seekers with recruiters.

## Features

### For Job Seekers (Applicants)
- Browse all available job listings
- View detailed job information (title, company, location, salary, description)
- Apply to jobs with resume upload (PDF only)
- User authentication and profile management

### For Recruiters
- Post new job openings
- Manage job listings (view, delete)
- View all applicants for each job posting
- Track application status
- Download applicant resumes

### General Features
- Role-based authentication (Applicant/Recruiter)
- Responsive design for all devices
- Modern, intuitive UI
- Real-time updates

## Tech Stack

- **React 18** - Frontend framework
- **React Router DOM v6** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Context API** - State management
- **CSS3** - Styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-portal-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional - defaults to localhost:5000):
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
job-portal-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ApplicantsList.js      # View applicants for a job
│   │   ├── ApplyModal.js          # Apply to job with resume
│   │   ├── CreateJobModal.js      # Create new job posting
│   │   ├── JobCard.js             # Job listing card
│   │   ├── Navbar.js              # Navigation bar
│   │   └── PrivateRoute.js        # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.js         # Authentication state management
│   ├── pages/
│   │   ├── Home.js                # Landing page
│   │   ├── Jobs.js                # Job listings page
│   │   ├── Login.js               # Login page
│   │   ├── RecruiterDashboard.js  # Recruiter dashboard
│   │   └── Register.js            # Registration page
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── styles/
│   │   ├── App.css                # Global styles
│   │   ├── Auth.css               # Authentication pages styles
│   │   ├── Components.css         # Component styles
│   │   ├── Dashboard.css          # Dashboard styles
│   │   ├── Home.css               # Home page styles
│   │   ├── Jobs.css               # Jobs page styles
│   │   └── Navbar.css             # Navbar styles
│   ├── App.js                     # Main app component with routing
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## API Endpoints Used

The frontend connects to the following backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (Recruiter only)
- `DELETE /api/jobs/:id` - Delete job (Recruiter only)
- `POST /api/jobs/:id/apply` - Apply to job (Applicant only)
- `GET /api/jobs/:id/applicants` - Get job applicants (Recruiter only)

## User Roles

### Applicant
- Can browse and view all job listings
- Can apply to jobs with resume upload
- Cannot create or manage job postings

### Recruiter
- Can create job postings
- Can view and manage their own job postings
- Can view applicants for their jobs
- Cannot apply to jobs

### Admin
- Has all privileges (future feature)

## Usage

### As a Job Seeker

1. **Register**: Click "Register" and select "Job Seeker (Applicant)" role
2. **Login**: Use your credentials to log in
3. **Browse Jobs**: View all available job listings
4. **Apply**: Click "Apply Now" and upload your resume (PDF format)

### As a Recruiter

1. **Register**: Click "Register" and select "Recruiter" role
2. **Login**: Use your credentials to log in
3. **Create Job**: Click "+ Create New Job" in the dashboard
4. **Manage Jobs**: View, edit, or delete your job postings
5. **View Applicants**: Click "View Applicants" to see who applied

## Key Features Implementation

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Automatic token refresh on page reload
- Protected routes based on user role

### File Upload
- Resume upload using multipart/form-data
- PDF file validation
- File size limit (5MB)

### State Management
- Context API for global authentication state
- Local state for component-specific data
- Persistent login across page refreshes

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## Environment Variables

Create a `.env` file with the following (optional):

```
REACT_APP_API_URL=http://localhost:5000
```

Default API URL is `http://localhost:5000/api`

## Backend Integration

This frontend is designed to work with the Job Portal backend API. Make sure the backend is running before starting the frontend.

Backend should have:
- MongoDB database running
- CORS enabled for frontend origin
- All required endpoints implemented
- File upload middleware configured

## Troubleshooting

### API Connection Issues
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify API endpoints match

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET matches backend
- Verify token is being sent in headers

### File Upload Issues
- Ensure file is PDF format
- Check file size is under 5MB
- Verify multer is configured in backend

## Future Enhancements

- [ ] Search and filter jobs
- [ ] Advanced applicant filtering
- [ ] Email notifications
- [ ] Application status updates
- [ ] Saved jobs feature
- [ ] Profile management
- [ ] Company profiles
- [ ] Job recommendations
- [ ] Analytics dashboard

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Contact

For issues and questions, please open an issue in the repository.
