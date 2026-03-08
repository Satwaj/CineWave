# CineWave — Your Cinematic Universe

A full-stack movie & TV show discovery platform with a cinematic dark-themed UI, built from scratch by **Satwaj Bachhav**.

## What is CineWave?

CineWave lets you explore trending movies, binge-worthy TV shows, and the people behind them — all in one place. Browse curated collections, watch trailers, save favorites, and keep track of everything you've watched.

## Features

- **Trending & Popular** — Real-time trending movies and TV shows powered by TMDB
- **Search** — Instant search across movies, TV shows, and people
- **Movie & TV Detail Pages** — Backdrop hero, ratings, genres, trailers, production info
- **Watch Trailers** — In-app YouTube trailer playback
- **Favorites** — Save movies and shows to your personal collection
- **Watch History** — Automatically tracks every title you visit
- **Genre Filtering** — Filter content by genre on the homepage
- **People Directory** — Browse actors, directors, and crew
- **Admin Dashboard** — Manage movies and users (admin role)
- **Authentication** — JWT-based signup/login with secure cookies
- **Cinematic Splash Screen** — Film-reel animated intro on first visit
- **Responsive** — Fully responsive from mobile to ultrawide

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, Redux Toolkit, React Router |
| Backend | Express.js 5, Node.js |
| Database | MongoDB Atlas, Mongoose 9 |
| Auth | JWT, bcryptjs, HTTP-only cookies |
| API | TMDB (The Movie Database) |
| Styling | Custom CSS with animations, glass-morphism, golden accent theme |

## Architecture

```
Frontend (React SPA)
  └─ Pages → Components → Services → Store (Redux)

Backend (Express REST API)
  └─ Routes → Controllers → Models → Database (MongoDB)
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Backend
```bash
cd Backend
npm install
npm start
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

> Both Backend and Frontend read from a single `.env` file at the project root. See `../.env.example` for the template.

Open [http://localhost:5173](http://localhost:5173) and enjoy.

## Author

**Satwaj Bachhav** — Full-Stack Developer
