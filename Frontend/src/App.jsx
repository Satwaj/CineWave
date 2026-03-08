import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "./store/slices/favoriteSlice";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SplashScreen from "./components/SplashScreen/SplashScreen";

// Pages
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TvShows from "./pages/TvShows/TvShows";
import People from "./pages/People/People";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Search from "./pages/Search/Search";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Favorites from "./pages/Favorites/Favorites";
import WatchHistory from "./pages/WatchHistory/WatchHistory";
import Admin from "./pages/Admin/Admin";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("cinewave_visited");
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user]);

  const handleSplashFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem("cinewave_visited", "1");
  };

  return (
    <Router>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/people" element={<People />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/tv/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/watch-history"
              element={
                <ProtectedRoute>
                  <WatchHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
