# Real-Time Chat Application

A full-stack real-time chat application built with **Node.js, React, MongoDB, and Socket.io**, containerized in a single project folder. It supports **real-time messaging, JWT authentication, user profile management, and proper error handling**.



## Features

- Real-time messaging with `Socket.io`
- Secure authentication using `JWT`
- Profile management with image uploads via `Cloudinary`
- Global state management using `Zustand`
- Error handling with `react-toastify`
- UI icons powered by `lucide-react`
- Fully containerized for easy setup and deployment

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Real-time Communication:** Socket.io  
- **Authentication:** JWT  
- **State Management:** Zustand  
- **Image Storage:** Cloudinary  
- **Icons:** Lucide React  
- **Error Handling:** React Toastify  
- **Deployment:** (Add deployed URL)  

## Installation & Setup

### 1. Clone the Repository  
```sh
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### 2. create env file and add the following
```sh
MONGOOSE_CONNECTION_STRING=your_mongodb_connection_string
PORT=your_server_port
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
ORIGIN=your_client_url

VITE_SERVER_URL=your_backend_server_url
VITE_BASE_URL=your_frontend_base_url
```

### 3. Install dependencies
```sh
npm run build
```

### 4. backend setup
```sh
npm start
```



### 5. frontend setup for development
```sh
npm run dev --prefix frontend
```

![Screenshot (8)](https://github.com/user-attachments/assets/ba5a211f-2e32-439d-8afb-605856a09078)

