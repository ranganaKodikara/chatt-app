# Chatt App

A modern fullstack real-time chat application built with React, Vite, Zustand, Socket.IO, Express, and MongoDB.

## Features

- User authentication (signup, login, logout) with JWT and cookies
- Real-time messaging with Socket.IO
- Image upload for messages and profile pictures (Cloudinary)
- Responsive UI with Tailwind CSS and DaisyUI
- Theme switching (30+ themes)
- Online users indicator
- Profile management
- Sidebar with contacts and online status
- Modern React patterns (hooks, Zustand for state management)
- Production-ready build and development scripts

## Tech Stack

- **Frontend:** React 19, Vite, Zustand, React Router, Lucide Icons, DaisyUI, Tailwind CSS, Axios, Socket.IO Client
- **Backend:** Node.js, Express 5, MongoDB (Mongoose), Socket.IO, Cloudinary, JWT, bcryptjs, dotenv
- **Dev Tools:** ESLint, Nodemon

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (Atlas or local)
- Cloudinary account (for image uploads)

### Environment Variables

#### Server (`/server/.env`)

```
PORT=3300
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

#### Client (`/client/.env`)

```
MODE=development
VITE_API_URL=http://localhost:3300/api
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd chatt-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. **Seed the database (optional):**

   ```bash
   npm run seed --prefix server
   ```

### Running the App

#### Development

```bash
npm run dev
```

- Client: http://localhost:3000
- Server: http://localhost:3300

#### Production

```bash
npm run build
npm start
```

### Folder Structure

```
chatt-app/
  client/      # React frontend
  server/      # Express backend
```

### Scripts

- `npm run dev` - Run both client and server in development mode
- `npm run build` - Build the client for production
- `npm start` - Start the server (serves built client in production)
- `npm run seed --prefix server` - Seed the database with demo users

### Customization

- **Themes:** Change theme in Settings page (stored in localStorage)
- **Profile:** Update your profile picture in the Profile page
- **Messages:** Send text and images in chat

### License

[ISC](LICENSE)

---

**Author:** Nacho
