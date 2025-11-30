# Studium Deployment Guide

## Overview
This guide covers deploying the Studium backend and distributing the mobile app.

---

## Backend Deployment Options

### Option 1: Railway (Recommended - Easiest)
**Pros**: Free tier, automatic deployments, built-in PostgreSQL
**Cons**: Limited free hours

**Steps**:
1. Create account at [railway.app](https://railway.app)
2. Install Railway CLI: `npm install -g @railway/cli`
3. Login: `railway login`
4. Initialize: `railway init`
5. Add PostgreSQL: `railway add postgresql`
6. Deploy: `railway up`
7. Set environment variables in Railway dashboard:
   - `OPENAI_API_KEY`
   - `GOOGLE_APPLICATION_CREDENTIALS` (base64 encoded)

### Option 2: Render
**Pros**: Free tier, easy setup, PostgreSQL included
**Cons**: Free tier sleeps after inactivity

**Steps**:
1. Create account at [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Set build command: `cd server && npm install && npm run build`
5. Set start command: `cd server && npm start`
6. Add PostgreSQL database
7. Set environment variables

### Option 3: Docker + Cloud Platform (AWS/GCP/Azure)
**Pros**: Full control, scalable
**Cons**: More complex, may cost more

**Steps**:
1. Build Docker image: `docker build -t studium-server ./server`
2. Push to container registry (Docker Hub, ECR, GCR)
3. Deploy to cloud run service
4. Configure PostgreSQL (RDS, Cloud SQL, etc.)

---

## Mobile App Distribution

### Option A: Local Testing (Immediate)
**Best for**: Testing before official release

**Steps**:
1. Update API URL in `client/src/services/api.ts`:
   ```typescript
   const API_URL = 'https://your-backend-url.railway.app';
   ```
2. Run on device:
   ```bash
   cd client
   npx expo start
   ```
3. Scan QR code with Expo Go app

### Option B: Internal Testing (TestFlight/Play Store)
**Best for**: Beta testing with users

**iOS (TestFlight)**:
1. Enroll in Apple Developer Program ($99/year)
2. Configure `app.json` with bundleIdentifier
3. Build: `npx eas build --platform ios`
4. Submit to TestFlight: `npx eas submit --platform ios`

**Android (Internal Testing)**:
1. Create Google Play Console account ($25 one-time)
2. Build APK: `npx eas build --platform android`
3. Upload to Play Console → Internal Testing

### Option C: Full Production Release
**Best for**: Public launch

Requires:
- App Store listing preparation
- Privacy policy
- Terms of service
- App screenshots and description
- Full testing and QA

---

## Pre-Deployment Checklist

### Backend
- [ ] Set all environment variables
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Test all API endpoints
- [ ] Enable CORS for your mobile app domain
- [ ] Set up monitoring/logging

### Mobile App
- [ ] Update API base URL
- [ ] Add Firebase configuration (production project)
- [ ] Test on physical devices
- [ ] Prepare app icons and splash screens
- [ ] Review permissions requested

### Security
- [ ] Use production Firebase project (not dev)
- [ ] Rotate any exposed API keys
- [ ] Enable rate limiting on backend
- [ ] Set up SSL/HTTPS (automatic on Railway/Render)

---

## Quick Start: MVP Deployment

For fastest deployment to start testing:

1. **Backend → Railway** (5 minutes):
   ```bash
   cd server
   npm install -g @railway/cli
   railway login
   railway init
   railway add postgresql
   railway up
   ```

2. **Set Environment Variables** in Railway dashboard:
   - `DATABASE_URL` (auto-set)
   - `OPENAI_API_KEY=your_key`
   - `NODE_ENV=production`

3. **Run Migrations**:
   ```bash
   railway run npx prisma migrate deploy
   ```

4. **Mobile App → Update API URL**:
   Edit `client/src/services/api.ts`:
   ```typescript
   const API_URL = 'https://your-project.up.railway.app';
   ```

5. **Test Locally**:
   ```bash
   cd client
   npx expo start
   ```

---

## Post-Deployment

### Monitoring
- Railway/Render provide built-in logs
- Set up error tracking (Sentry)
- Monitor database usage

### Updates
**Backend**: Push to GitHub → Auto-deploy (if configured)
**Mobile**: Expo OTA updates for JS changes, rebuild for native changes

### Database Backups
- Railway/Render: Automatic backups on paid tiers
- Manual: `pg_dump` your database regularly

---

## Troubleshooting

**Backend won't start**:
- Check logs in platform dashboard
- Verify environment variables
- Ensure PostgreSQL is connected

**Mobile app can't connect**:
- Verify API_URL is correct
- Check CORS settings on backend
- Ensure backend is running

**Build fails**:
- Clear node_modules and reinstall
- Check Node version compatibility
- Review error logs carefully

---

## Next Steps After Deployment

1. ✅ Test all features end-to-end
2. ✅ Invite beta testers
3. ✅ Gather feedback
4. ✅ Iterate and improve
5. ✅ Prepare for broader launch

**Your Studium app is ready to go live!** 🚀
