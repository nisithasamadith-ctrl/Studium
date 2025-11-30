# Studium 📚

A cross-platform mobile application for university students combining an AI-powered study planner, gamified focus system, and study tools.

## Features

- 🔐 **Firebase Authentication**: Secure user accounts
- ✅ **Task Management**: Create and track study tasks
- 🍅 **Focus Timer**: Pomodoro-style timer with forest gamification
- 🌲 **Forest Growth**: Grow trees based on focus time
- 🤝 **Social Leaderboard**: Compete with friends
- 🤖 **AI Study Tools**: OpenAI-powered planning and summarization
- 🌙 **Dark Mode**: Beautiful light and dark themes
- 📅 **Calendar View**: Visualize tasks by date
- 📊 **Statistics**: Track your focus trends

## Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- React Navigation
- React Native Calendars
- React Native Chart Kit

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- Firebase Admin SDK
- OpenAI API

### DevOps
- Docker & Docker Compose
- Jest (Unit Testing)
- ESLint + Prettier
- GitHub Actions CI/CD

## Project Structure

```
studium/
├── client/          # React Native mobile app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # App screens
│   │   ├── navigation/    # Navigation setup
│   │   ├── services/      # API & notifications
│   │   ├── contexts/      # React contexts (Theme)
│   │   └── theme/         # Design system
│   └── package.json
├── server/          # Node.js backend
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth middleware
│   │   ├── lib/           # Prisma, Firebase
│   │   └── tests/         # Jest tests
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- OpenAI API Key
- Firebase Project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Studium.git
   cd Studium
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   Create `server/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/studium"
   OPENAI_API_KEY="your_openai_api_key"
   GOOGLE_APPLICATION_CREDENTIALS="path/to/firebase-service-account.json"
   ```

4. **Setup Database**
   ```bash
   npx prisma db push
   ```

5. **Start Backend**
   ```bash
   npm run dev
   ```

6. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

7. **Configure Firebase**
   
   Update `client/src/config/firebase.ts` with your Firebase config

8. **Start Mobile App**
   ```bash
   npx expo start
   ```

## Docker Deployment

```bash
docker-compose up --build
```

## Testing

```bash
cd server
npm test
```

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy (Railway)
1. Connect GitHub repository to Railway
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically

## Development Workflow

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Type Checking**: `npx tsc --noEmit`

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT License - feel free to use this for your own projects.

## Acknowledgments

- Built with ❤️ for university students
- Powered by OpenAI, Firebase, and Expo

---

**Made by [Your Name]** | [LinkedIn](https://linkedin.com/in/yourprofile)
