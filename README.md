Job Portal (MERN Stack)

A full-stack MERN Job Portal application that connects job seekers with recruiters.

This project consists of:

Frontend – React-based user interface

Backend – Node.js, Express, MongoDB API

Authentication – JWT-based role-based access

File Uploads – Resume upload (PDF only)

🚀 Features
👤 For Job Seekers (Applicants)

Browse all available job listings

View detailed job information (title, company, location, salary, description)

Apply to jobs with resume upload (PDF only)

User authentication and profile management

🧑‍💼 For Recruiters

Post new job openings

Manage job listings (view, delete)

View all applicants for each job posting

Track application status

Download applicant resumes

🔐 General Features

Role-based authentication (Applicant / Recruiter)

JWT-based secure authentication

Protected routes

Responsive design

Modern UI

Real-time updates (future scope)

🛠 Tech Stack
Frontend

React 18

React Router DOM v6

Axios

Context API

CSS3

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Bcrypt

Multer (File Upload)

📂 Project Structure
jobportal/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md

⚙️ Installation Guide
1️⃣ Clone the repository
git clone <repository-url>
cd jobportal

2️⃣ Setup Backend
cd backend
npm install


Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start backend:

npm start


Backend runs at:

http://localhost:5000

3️⃣ Setup Frontend
cd frontend
npm install


Create .env file inside frontend folder (optional):

REACT_APP_API_URL=http://localhost:5000


Start frontend:

npm start


Frontend runs at:

http://localhost:3000

🔌 API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

Jobs

GET /api/jobs

POST /api/jobs

DELETE /api/jobs/:id

POST /api/jobs/:id/apply

GET /api/jobs/:id/applicants

👥 User Roles
Applicant

View jobs

Apply with resume

Cannot create jobs

Recruiter

Create jobs

Manage jobs

View applicants

Cannot apply to jobs

Admin (Future Scope)

Full access

📦 Available Scripts
Backend
npm start

Frontend
npm start

🔮 Future Enhancements

Job search & filtering

Email notifications

Saved jobs

Application tracking

Profile management

Analytics dashboard

Real-time notifications (WebSockets)

🤝 Contributing

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📜 License

ISC

👨‍💻 Contributors

Frontend Developer

Backend Developer