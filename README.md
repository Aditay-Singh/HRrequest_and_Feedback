##Video Demo

https://github.com/user-attachments/assets/406b0ac1-9f84-438e-acd2-04ed38c771da

## HR side interface
![HR side](https://github.com/user-attachments/assets/458e0cea-1b07-4fd4-9045-0e816e41fca2)

 
 # Feedback Workflow System

## Overview
A simple feedback workflow system where HR users can send feedback form links to clients/users, with automated email notifications.

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email**: Resend API

## Features
- ✅ HR Dashboard with "Send Feedback Request" button
- ✅ Automated email with feedback form link
- ✅ Feedback form submission
- ✅ Email notifications to HR and user
- ✅ Minimal tracking data storage

## Setup Instructions

### Backend Setup
```powershell
cd backend
npm install
Copy-Item .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

## API Endpoints
- POST /api/feedback/send-request
- POST /api/feedback/submit
- GET /api/feedback/list
- GET /api/feedback/:token

## Deployment
- Frontend: Vercel
- Backend: Render/Railway

## License
MIT
