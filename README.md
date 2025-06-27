# Pharmacy Management Application

This is a full-stack Pharmacy Management Application designed to streamline pharmacy operations, including product management, user authentication, and healthcare services. The project is divided into backend and frontend components.

## Features
- Product listing and management
- User authentication (Doctor, Nurse, User)
- Shopping cart functionality
- Healthcare services and appointment booking
- Admin dashboard
- Responsive UI

## Technologies Used
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Redux

## Project Structure
```
Pharmacy-Management-Application/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── data/
│   ├── models/
│   ├── routes/
│   └── seederScript.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── uploads/
├── package.json
├── Procfile
└── server.js
```

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Backend Setup
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your MongoDB connection in `backend/config/db.js`.
4. Start the backend server:
   ```sh
   node ../server.js
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

### Seeder Script
To seed the database with initial product data, run:
```sh
node backend/seederScript.js
```

## Deployment
- The project can be deployed using services like Heroku, Vercel, or Netlify.
- The `Procfile` is included for Heroku deployment.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Open source libraries and contributors
"# Pharmacy-" 
