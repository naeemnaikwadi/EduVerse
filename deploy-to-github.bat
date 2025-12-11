@echo off
echo 🚀 Deploying EduVerse to GitHub...
echo.

REM Navigate to project root
cd /d "D:\smart-learning dashboard"

REM Initialize git if not already done
git init

REM Set main branch
git branch -M main

REM Add remote repository
git remote add origin https://github.com/naeemnaikwadi/EduVerse.git

REM Add all files
echo 📁 Adding all files...
git add .

REM Commit with detailed message
echo 💾 Committing changes...
git commit -m "🚀 Initial commit: EduVerse AI-Powered Learning Platform

✨ Complete Learning Management System featuring:
- 🧠 AI-powered personalized learning paths  
- 🎥 Live video sessions with LiveKit integration
- 📚 Comprehensive course and classroom management
- 📊 Real-time analytics and progress tracking
- 📝 Interactive assignments and quizzes
- ☁️ Cloud file storage with Cloudinary
- 🔐 Secure JWT authentication
- 📱 Modern responsive design with Tailwind CSS

🛠️ Tech Stack:
- Frontend: React 18, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express, MongoDB, Mongoose  
- Video: LiveKit Cloud
- Storage: Cloudinary
- Deployment: Vercel + Render ready

🎯 Production Ready:
- Socket.IO removed for deployment compatibility
- Vercel optimized (no PWA, no service workers)
- Environment-based configuration
- Clean build system
- Comprehensive documentation"

REM Push to GitHub
echo 🌐 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Successfully deployed EduVerse to GitHub!
echo 🔗 Repository: https://github.com/naeemnaikwadi/EduVerse
echo.
pause