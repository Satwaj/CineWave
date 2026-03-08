<p align="center">
  <img src="Frontend/public/cinewave.svg" width="80" alt="CineWave Logo" />
</p>

<h1 align="center">CineWave</h1>
<p align="center"><strong>Your Cinematic Universe — Discover Movies, TV Shows & People</strong></p>

<p align="center">
  A full-stack movie & TV show discovery platform with a cinematic dark-themed UI,<br>
  premium animations, and a golden accent design system — built from scratch.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TMDB-API-01D277?logo=themoviedatabase&logoColor=white" alt="TMDB" />
</p>

---

## What is CineWave?

CineWave lets you explore trending movies, binge-worthy TV shows, and the people behind them — all in one place. Browse curated collections, watch trailers, save your favorites, and keep track of everything you've watched. Comes with a cinematic splash intro, smooth page animations, and a fully responsive golden-dark UI theme.

---

## Features

### Discovery
- **Trending & Popular** — Real-time trending movies and TV shows powered by TMDB
- **Genre Filtering** — Filter movies by genre from the homepage
- **Infinite Scroll** — Seamless pagination on Movies, TV Shows, and People pages
- **Search** — Instant debounced search across movies, TV shows, and people

### Content
- **Movie & TV Detail Pages** — Full backdrop hero, star ratings, genres, runtime, production companies
- **Watch Trailers** — In-app YouTube trailer playback via modal
- **People Directory** — Browse actors, directors, and crew with profile cards

### User Features
- **Authentication** — JWT-based signup & login with HTTP-only cookies
- **Favorites** — Save movies and shows to your personal collection
- **Watch History** — Automatically tracks every title you visit
- **Admin Dashboard** — Add/edit/delete movies, manage & ban users (admin role only)

### UI & Animations
- **Cinematic Splash Screen** — Film-reel logo entrance, letter-by-letter title reveal, wave SVG drawing, floating golden particles (plays once per session)
- **Custom SVG Logo** — Film reel + wave + play triangle, used as favicon, navbar icon, and footer branding
- **Scroll-Aware Navbar** — Transparent → glass-morphism with backdrop blur on scroll
- **Hero Banner** — Staggered content entrance, radial gold shimmer overlay, auto-rotating slides
- **Movie Cards** — Golden glow on hover, heart-pop favorite animation, staggered grid entrance
- **Page Transitions** — Slide-up headers, fade-in-scale content, staggered grid children
- **Skeleton Loaders** — Smooth 5-stop shimmer with fade-in entrance
- **Cinematic Detail Page** — Backdrop zoom reveal, poster slide-in, info slide-from-right
- **Golden Accent Theme** — `#f5c518` gold accents, dark `#0a0a1a` background, Inter font

---

## Tech Stack

| Layer       | Technology                                        |
|-------------|---------------------------------------------------|
| Frontend    | React 19, Vite 7, Redux Toolkit, React Router DOM |
| Backend     | Express.js 5, Node.js                             |
| Database    | MongoDB Atlas, Mongoose 9                         |
| Auth        | JWT (jsonwebtoken), bcryptjs, HTTP-only cookies    |
| External API| TMDB (The Movie Database)                         |
| Styling     | Custom CSS — animations, glass-morphism, keyframes |
| Icons       | react-icons (Feather + Font Awesome)               |

---

## Architecture

```
CineWave/
├── Backend/          ← Express REST API (4-layer)
│   ├── server.js             Entry point, connects DB & starts server
│   └── src/
│       ├── app.js            Express app setup, middleware, route mounting
│       ├── config/
│       │   └── database.js   MongoDB/Mongoose connection
│       ├── controllers/      Business logic
│       │   ├── authController.js
│       │   ├── movieController.js
│       │   ├── favoriteController.js
│       │   ├── watchHistoryController.js
│       │   └── adminController.js
│       ├── middleware/        Auth & admin guards
│       │   ├── authMiddleware.js
│       │   └── adminMiddleware.js
│       ├── models/           Mongoose schemas
│       │   ├── User.js
│       │   ├── Movie.js
│       │   ├── Favorite.js
│       │   └── WatchHistory.js
│       ├── routes/           API route definitions
│       │   ├── authRoutes.js
│       │   ├── movieRoutes.js
│       │   ├── favoriteRoutes.js
│       │   ├── watchHistoryRoutes.js
│       │   └── adminRoutes.js
│       └── utils/
│           └── generateToken.js
│
└── Frontend/         ← React SPA (4-layer)
    ├── index.html            HTML shell with SEO meta tags
    ├── vite.config.js        Vite configuration
    ├── public/
    │   └── cinewave.svg      Custom SVG favicon
    └── src/
        ├── main.jsx          App entry — Redux Provider + React root
        ├── App.jsx           Router, splash screen, layout
        ├── index.css         Global styles, CSS variables, animation utilities
        ├── App.css           Layout styles
        ├── components/       Reusable UI components
        │   ├── Footer/           Site footer with golden accent
        │   ├── GenreFilter/      Horizontal genre chip bar
        │   ├── HeroBanner/       Auto-rotating hero with staggered entrance
        │   ├── Loader/           Film-reel spinner + skeleton shimmer
        │   ├── Logo/             Custom SVG logo component
        │   ├── MovieCard/        Poster card with glow & favorite toggle
        │   ├── MovieRow/         Horizontal movie grid section
        │   ├── Navbar/           Scroll-aware glass-morphism navbar
        │   ├── ProtectedRoute/   Auth & admin route guard
        │   ├── SplashScreen/     Cinematic intro animation
        │   └── TrailerModal/     YouTube trailer overlay
        ├── pages/            Page-level views
        │   ├── Home/             Hero + genre filter + movie rows
        │   ├── Movies/           All movies with infinite scroll
        │   ├── TvShows/          All TV shows with infinite scroll
        │   ├── People/           People directory
        │   ├── MovieDetail/      Full movie/TV detail page
        │   ├── Search/           Multi-type search results
        │   ├── Auth/             Login & Signup forms
        │   ├── Favorites/        User's saved favorites
        │   ├── WatchHistory/     Recently visited titles
        │   └── Admin/            Admin dashboard (movies + users)
        ├── services/         API layer
        │   ├── api.js            Axios instance with interceptors
        │   └── tmdbService.js    TMDB API wrapper
        ├── store/            Redux state management
        │   ├── store.js          Store configuration
        │   └── slices/
        │       ├── authSlice.js
        │       ├── movieSlice.js
        │       ├── favoriteSlice.js
        │       └── searchSlice.js
        ├── hooks/            Custom React hooks
        │   ├── useDebounce.js
        │   └── useInfiniteScroll.js
        └── utils/
            └── constants.js      TMDB image URLs, placeholders
```

---

## API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint    | Description            |
|--------|-------------|------------------------|
| POST   | `/signup`   | Create new account     |
| POST   | `/login`    | Login & get JWT cookie |
| POST   | `/logout`   | Clear auth cookie      |
| GET    | `/me`       | Get current user       |

### Movies (`/api/movies`)
| Method | Endpoint            | Description                   |
|--------|---------------------|-------------------------------|
| GET    | `/trending`         | Trending movies (TMDB)        |
| GET    | `/popular`          | Popular movies (TMDB)         |
| GET    | `/popular-tv`       | Popular TV shows (TMDB)       |
| GET    | `/genre/:genreId`   | Movies by genre (TMDB)        |
| GET    | `/search`           | Multi-search (TMDB)           |
| GET    | `/detail/:id`       | Movie/TV detail (TMDB)        |
| GET    | `/videos/:id`       | Movie/TV videos (TMDB)        |
| GET    | `/people`           | Popular people (TMDB)         |
| GET    | `/`                 | All custom movies from DB     |

### Favorites (`/api/favorites`) — Auth required
| Method | Endpoint   | Description           |
|--------|------------|-----------------------|
| GET    | `/`        | Get user's favorites  |
| POST   | `/`        | Add to favorites      |
| DELETE | `/:tmdbId` | Remove from favorites |

### Watch History (`/api/watch-history`) — Auth required
| Method | Endpoint | Description           |
|--------|----------|-----------------------|
| GET    | `/`      | Get watch history     |
| POST   | `/`      | Add/update entry      |
| DELETE | `/`      | Clear all history     |

### Admin (`/api/admin`) — Admin role required
| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | `/users`          | List all users    |
| PUT    | `/users/:id/ban`  | Ban/unban user    |
| DELETE | `/users/:id`      | Delete user       |
| POST   | `/movies`         | Add custom movie  |
| PUT    | `/movies/:id`     | Update movie      |
| DELETE | `/movies/:id`     | Delete movie      |

---

## Getting Started

### Prerequisites
- **Node.js** 18+
- **MongoDB** — Atlas cluster or local instance
- **TMDB API Key** — [Get one here](https://www.themoviedb.org/settings/api)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/CineWave.git
cd CineWave
```

### 2. Environment variables

Copy the root example and fill in your values:
```bash
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/cinewave
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
TMDB_API_KEY=your_tmdb_api_key
VITE_API_URL=http://localhost:5000/api
VITE_TMDB_API_KEY=your_tmdb_api_key
```

> A single `.env` at the project root is shared by both Backend and Frontend.

### 3. Backend setup
```bash
cd Backend
npm install
npm run dev
```

### 4. Frontend setup
```bash
cd Frontend
npm install
npm run dev
```

### 5. Open the app
Visit [http://localhost:5173](http://localhost:5173) — the cinematic splash screen will greet you.

---

## Deploy on Render (Free Tier)

CineWave is configured as a **single Render Web Service** — Express serves both the API and the React build, so you only pay for one service.

### Quick steps

1. Push your repo to GitHub.
2. Go to [render.com](https://render.com) → **New Web Service** → connect your repo.
3. Set the **Root Directory** to `.` (the project root).
4. Fill in:
   | Setting          | Value |
   |------------------|-------|
   | **Runtime**      | Node  |
   | **Build Command**| `cd Frontend && npm install && npm run build && cd ../Backend && npm install` |
   | **Start Command**| `cd Backend && node server.js` |
5. Add **Environment Variables** in the Render dashboard:
   | Key                | Value                         |
   |--------------------|-------------------------------|
   | `NODE_ENV`         | `production`                  |
   | `MONGO_URI`        | your MongoDB Atlas connection string |
   | `JWT_SECRET`       | a random 64-char secret       |
   | `TMDB_API_KEY`     | your TMDB API key             |
   | `VITE_TMDB_API_KEY`| same TMDB API key             |
6. Click **Deploy**. Render will build the frontend, install the backend, and start serving everything on one URL.

> A [render.yaml](render.yaml) blueprint is also included — you can use "New Blueprint Instance" to deploy with one click.

---

## Design System

| Token              | Value                          |
|--------------------|--------------------------------|
| Background         | `#0a0a1a`                      |
| Gold Accent        | `#f5c518`                      |
| Text Primary       | `#f1f5f9`                      |
| Text Secondary     | `#64748b`                      |
| Font               | Inter (system fallback)        |
| Border Radius      | `12–16px`                      |
| Navbar             | Glass-morphism on scroll       |
| Easing (smooth)    | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Easing (spring)    | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## Scripts

### Backend
| Command        | Description                 |
|----------------|-----------------------------|
| `npm run dev`  | Start with nodemon (hot reload) |
| `npm start`    | Start production server     |

### Frontend
| Command          | Description              |
|------------------|--------------------------|
| `npm run dev`    | Start Vite dev server    |
| `npm run build`  | Production build         |
| `npm run preview`| Preview production build |
| `npm run lint`   | Run ESLint               |

---

## Author

**Satwaj Bachhav** — Full-Stack Developer

---

<p align="center">
  Made with ❤️ and a lot of CSS animations
</p>
