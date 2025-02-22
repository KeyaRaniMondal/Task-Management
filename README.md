# Taskify

A web-based task management application designed for seamless task organization.  
The app ensures a smooth experience across both desktop and mobile devices,  
featuring a mobile-friendly drag-and-drop interface for task management.  

## 🚀 Live Demo  

🔗 Taskify (https://task-management-54816.web.app/) 

## 📌 Features  
- ✅ **Cross-Platform Compatibility** – Works smoothly on both desktop and mobile.  
- 🖱️ **Drag-and-Drop Functionality** – Easily reorder tasks with a mobile-friendly interface.  
- 🔥 **Authentication** – Secure user authentication with Firebase.  
- 📊 **Task Management API** – Powered by Express.js and MongoDB.  
- 🔄 **CRUD Operations** – Users can create, retrieve, update, and delete tasks.  

## 📂 API Endpoints  
**POST** `/tasks` – Add a new task  
**GET** `/tasks` – Retrieve all tasks for the logged-in user  
**PUT** `/tasks/:id` – Update task details (title, description, category)  
**DELETE** `/tasks/:id` – Delete a task  

## 🛠️ Technologies Used  

### Frontend:  
- **React** (⚡ v19)  
- **React Router DOM** (📌 v7.2.0)  
- **Material UI** (🎨 v6.4.5)  
- **Tailwind CSS** (💡 v4.0.7)  
- **Axios** (🔗 v1.7.9)  
- **Lottie React** (🎬 v2.4.1)  

### Backend:  
- **Express.js** (🚀 API framework)  
- **MongoDB** (🗄️ Database)  
- **Firebase** (🔥 Authentication)  

## 📥 Installation  

### 1️⃣ Clone the Repository  

git clone https://github.com/KeyaRaniMondal/task-management.git  
cd task-management
2️⃣ Install Dependencies

npm install
3️⃣ Start the Development Server

npm run dev
4️⃣ Backend Setup
Ensure you have Node.js and MongoDB installed.

cd backend  
npm install  
node server.js  
📜 Dependencies
json

{
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@hello-pangea/dnd": "^18.0.1",
  "@lottiefiles/dotlottie-react": "^0.13.0",
  "@mui/icons-material": "^6.4.5",
  "@mui/material": "^6.4.5",
  "@tailwindcss/vite": "^4.0.7",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "lottie-react": "^2.4.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.2.0",
  "sweetalert2": "^11.17.2",
  "tailwindcss": "^4.0.7"
}











