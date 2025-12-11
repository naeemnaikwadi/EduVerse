# Deployment Guide - EduVerse Platform

✅ **Status**: All issues resolved and ready for deployment!

This guide covers deploying the EduVerse AI-Powered Learning Platform to Vercel (frontend) and Render (backend).

## Prerequisites

- LiveKit Cloud account (already configured)
- MongoDB Atlas database (already configured)
- Cloudinary account (already configured)
- Firebase project (already configured)

## Frontend Deployment (Vercel)

### 1. Prepare for Deployment

The frontend is already configured with environment-based URLs:
- API calls use `process.env.REACT_APP_API_URL`
- LiveKit uses `process.env.REACT_APP_LIVEKIT_URL`
- No dynamic imports (Vercel compatible)

### 2. Deploy to Vercel

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Set Root Directory**: Set to `client` folder
3. **Important**: PWA features removed for Vercel compatibility
4. **Configure Environment Variables** in Vercel dashboard:

```
REACT_APP_LIVEKIT_URL=wss://smart-dashboard-baxvi8fk.livekit.cloud
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_FIREBASE_API_KEY=AIzaSyAACdA81QFc1itN2J4YfFUlajw3Vu6zLAg
REACT_APP_FIREBASE_AUTH_DOMAIN=smartdashboard-881a2.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=smartdashboard-881a2
REACT_APP_FIREBASE_STORAGE_BUCKET=smartdashboard-881a2.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=824753981689
REACT_APP_FIREBASE_APP_ID=1:824753981689:web:96f13cd45806217283ba28
REACT_APP_FIREBASE_MEASUREMENT_ID=G-VMT21T3EZR
```

5. **Build Settings**: 
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Node.js Version: 18.x (recommended)

6. **Vercel Optimizations**:
   - No service workers (removed for compatibility)
   - No PWA features (Vercel limitation)
   - Static file optimization enabled

## Backend Deployment (Render)

### 1. Prepare for Deployment

The backend is configured for production with:
- Environment-based CORS configuration
- Socket.IO CORS settings
- MongoDB connection without deprecated options

### 2. Deploy to Render

1. **Create Web Service**: Connect your GitHub repository
2. **Set Root Directory**: Set to `server` folder
3. **Configure Build & Start**:
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables** in Render dashboard:

```
NODE_ENV=production
PORT=4000
CLIENT_URL=https://your-frontend-domain.vercel.app
MONGO_URI=mongodb+srv://naikwadinaeem32_db:Project%4002@projects.4o0mnzj.mongodb.net/smart-dashboard?retryWrites=true&w=majority&appName=miniproject
JWT_SECRET=supersecret123
LIVEKIT_URL=wss://smart-dashboard-baxvi8fk.livekit.cloud
LIVEKIT_API_KEY=APIhipPufApqPQK
LIVEKIT_API_SECRET=qE7bb5fe9eVkKQaaZ58SM0QDPBJgcUoPPhREhhejix4B
CLOUDINARY_CLOUD_NAME=doglr9qsr
CLOUDINARY_API_KEY=887485676163634
CLOUDINARY_API_SECRET=6X1WfjDDCYZw_GI9C7yjPmjoT6g
```

### 3. Update Frontend URL

After deploying backend to Render:
1. Copy the Render service URL
2. Update `REACT_APP_API_URL` in Vercel environment variables
3. Update `CLIENT_URL` in Render environment variables with your Vercel URL

## Socket.IO Removed

**Socket.IO has been completely removed** from the project for better deployment compatibility:

**Removed Features:**
- Real-time chat in live sessions
- Live polls and reactions  
- Real-time notifications
- Hand raising in live sessions

**All Core Features Still Work:**
- ✅ User authentication
- ✅ Course management
- ✅ LiveKit video sessions (real-time video/audio)
- ✅ File uploads
- ✅ All CRUD operations
- ✅ Learning paths and assignments
- ✅ Progress tracking

**Benefits of Removal:**
- ✅ Works on ALL free hosting tiers
- ✅ No WebSocket connection issues
- ✅ Simplified deployment
- ✅ Better reliability
- ✅ Faster loading times

## Post-Deployment Steps

1. **Test All Features**:
   - User authentication
   - Live sessions (LiveKit)
   - Real-time features (Socket.IO)
   - File uploads (Cloudinary)

2. **Update CORS Origins**:
   - Replace placeholder URLs with actual deployment URLs
   - Update both frontend and backend CORS configurations

3. **Monitor Performance**:
   - Check Render logs for any issues
   - Monitor Vercel deployment logs
   - Test LiveKit cloud connectivity

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure all URLs in CORS configuration match your deployed domains
2. **Socket.IO Connection Issues**: Check Render logs and consider upgrading plan
3. **Environment Variables**: Verify all environment variables are set correctly
4. **Build Failures**: Check for any missing dependencies or build errors

### Logs Access:
- **Vercel**: Check deployment logs in Vercel dashboard
- **Render**: Access logs from Render service dashboard
- **LiveKit**: Monitor LiveKit cloud dashboard for session issues

## Alternative Deployment Options

If Render's free tier limitations are problematic:
- **Railway**: Better Socket.IO support, similar pricing
- **Heroku**: Reliable but more expensive
- **DigitalOcean App Platform**: Good performance, competitive pricing
- **AWS/GCP**: More complex but highly scalable

## Security Notes

- All sensitive credentials are in environment variables
- CORS is configured for specific domains only
- JWT secrets should be strong and unique
- Consider implementing rate limiting for production