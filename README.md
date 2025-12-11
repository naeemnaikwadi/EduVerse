# EduVerse - AI-Powered Learning Platform

🧠 **EduVerse** is a modern, AI-powered learning management system designed for the future of education.

## ✨ Features

- 🎓 **Interactive Learning Paths** - Personalized AI-driven course progression
- 🎥 **Live Video Sessions** - Real-time video conferencing with LiveKit
- 📚 **Course Management** - Comprehensive course creation and management
- 📊 **Analytics Dashboard** - Real-time progress tracking and insights
- 🏫 **Classroom Management** - Organize students and manage course materials
- 📝 **Assignments & Quizzes** - Interactive assessments and assignments
- ☁️ **Cloud Storage** - Secure file uploads with Cloudinary
- 🔐 **Authentication** - Secure JWT-based authentication
- 📱 **Responsive Design** - Modern, mobile-friendly interface

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Redux Toolkit** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Cloudinary** - File storage
- **LiveKit** - Video conferencing

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting
- **LiveKit Cloud** - Video infrastructure

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB
- Git

### Clone Repository
```bash
git clone https://github.com/naeemnaikwadi/smart_dashboard.git
cd smart_dashboard
```

### Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Environment Setup

#### Client (.env)
```env
REACT_APP_LIVEKIT_URL=your_livekit_url
REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_API_KEY=your_firebase_key
# ... other Firebase config
```

#### Server (.env)
```env
PORT=4000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
LIVEKIT_URL=your_livekit_url
LIVEKIT_API_KEY=your_livekit_key
LIVEKIT_API_SECRET=your_livekit_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🚀 Running the Application

### Development Mode
```bash
# Start both client and server
npm start

# Or start individually:
# Start server
npm run start-server

# Start client
npm run start-client
```

### Production Build
```bash
# Build client
cd client
npm run build

# Start server
cd ../server
npm start
```

## 📁 Project Structure

```
eduverse-platform/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── services/         # Business logic
│   └── package.json
└── package.json          # Root package.json
```

## 🌐 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `client`
3. Add environment variables
4. Deploy

### Backend (Render)
1. Connect GitHub repository to Render
2. Set root directory to `server`
3. Add environment variables
4. Deploy

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Naeem Naikwadi**
- GitHub: [@naeemnaikwadi](https://github.com/naeemnaikwadi)

## 🙏 Acknowledgments

- LiveKit for video conferencing infrastructure
- Cloudinary for file storage solutions
- MongoDB Atlas for database hosting
- Vercel and Render for deployment platforms

---

**EduVerse** - Empowering the next generation of learners with AI-powered education! 🚀"# EduVerse" 
