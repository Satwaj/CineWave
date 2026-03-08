import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiFilm,
  FiShield,
} from "react-icons/fi";
import api from "../../services/api";
import "./Admin.css";

const Admin = () => {
  const [tab, setTab] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [form, setForm] = useState({
    title: "",
    posterUrl: "",
    description: "",
    tmdbId: "",
    releaseDate: "",
    trailerUrl: "",
    genre: "",
    category: "movie",
    rating: "",
  });

  useEffect(() => {
    fetchMovies();
    fetchUsers();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await api.get("/movies");
      setMovies(data.movies || []);
    } catch {
      setMovies([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    } catch {
      setUsers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      genre: form.genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      rating: Number(form.rating) || 0,
    };

    try {
      if (editMovie) {
        await api.put(`/admin/movies/${editMovie._id}`, payload);
      } else {
        await api.post("/admin/movies", payload);
      }
      fetchMovies();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save movie");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    await api.delete(`/admin/movies/${id}`);
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setForm({
      title: movie.title,
      posterUrl: movie.posterUrl,
      description: movie.description,
      tmdbId: movie.tmdbId,
      releaseDate: movie.releaseDate,
      trailerUrl: movie.trailerUrl,
      genre: movie.genre?.join(", ") || "",
      category: movie.category,
      rating: String(movie.rating || ""),
    });
    setShowForm(true);
  };

  const handleBan = async (id) => {
    await api.put(`/admin/users/${id}/ban`);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const resetForm = () => {
    setEditMovie(null);
    setShowForm(false);
    setForm({
      title: "",
      posterUrl: "",
      description: "",
      tmdbId: "",
      releaseDate: "",
      trailerUrl: "",
      genre: "",
      category: "movie",
      rating: "",
    });
  };

  return (
    <div className="admin">
      <div className="admin__header page-enter">
        <h1>
          <FiShield /> Admin Dashboard
        </h1>
      </div>

      <div className="admin__tabs">
        <button
          className={`admin__tab ${tab === "movies" ? "admin__tab--active" : ""}`}
          onClick={() => setTab("movies")}
        >
          <FiFilm /> Movies ({movies.length})
        </button>
        <button
          className={`admin__tab ${tab === "users" ? "admin__tab--active" : ""}`}
          onClick={() => setTab("users")}
        >
          <FiUsers /> Users ({users.length})
        </button>
      </div>

      {tab === "movies" && (
        <div className="admin__section">
          <button
            className="admin__add-btn"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <FiPlus /> Add Movie
          </button>

          {showForm && (
            <form className="admin__form" onSubmit={handleSubmit}>
              <h3>{editMovie ? "Edit Movie" : "Add New Movie"}</h3>
              <div className="admin__form-grid">
                <input
                  placeholder="Movie Title *"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <input
                  placeholder="Poster Image URL"
                  value={form.posterUrl}
                  onChange={(e) =>
                    setForm({ ...form, posterUrl: e.target.value })
                  }
                />
                <input
                  placeholder="TMDB ID"
                  value={form.tmdbId}
                  onChange={(e) => setForm({ ...form, tmdbId: e.target.value })}
                />
                <input
                  placeholder="Release Date (YYYY-MM-DD)"
                  value={form.releaseDate}
                  onChange={(e) =>
                    setForm({ ...form, releaseDate: e.target.value })
                  }
                />
                <input
                  placeholder="Trailer YouTube URL"
                  value={form.trailerUrl}
                  onChange={(e) =>
                    setForm({ ...form, trailerUrl: e.target.value })
                  }
                />
                <input
                  placeholder="Genres (comma-separated)"
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                />
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="movie">Movie</option>
                  <option value="tvshow">TV Show</option>
                </select>
                <input
                  type="number"
                  placeholder="Rating (0-10)"
                  min="0"
                  max="10"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <div className="admin__form-actions">
                <button type="submit" className="admin__save-btn">
                  {editMovie ? "Update" : "Add"} Movie
                </button>
                <button
                  type="button"
                  className="admin__cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="admin__table">
            <div className="admin__table-header">
              <span>Title</span>
              <span>Category</span>
              <span>Rating</span>
              <span>Actions</span>
            </div>
            {movies.map((movie) => (
              <div key={movie._id} className="admin__table-row">
                <span>{movie.title}</span>
                <span className="admin__badge">{movie.category}</span>
                <span>{movie.rating || "N/A"}</span>
                <span className="admin__actions">
                  <button onClick={() => handleEdit(movie)} title="Edit">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    title="Delete"
                    className="admin__delete-btn"
                  >
                    <FiTrash2 />
                  </button>
                </span>
              </div>
            ))}
            {movies.length === 0 && (
              <p className="admin__empty">No movies added yet</p>
            )}
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="admin__section">
          <div className="admin__table">
            <div className="admin__table-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {users.map((u) => (
              <div key={u._id} className="admin__table-row">
                <span>{u.name}</span>
                <span>{u.email}</span>
                <span className="admin__badge">{u.role}</span>
                <span
                  className={
                    u.isBanned
                      ? "admin__status--banned"
                      : "admin__status--active"
                  }
                >
                  {u.isBanned ? "Banned" : "Active"}
                </span>
                <span className="admin__actions">
                  {u.role !== "admin" && (
                    <>
                      <button onClick={() => handleBan(u._id)}>
                        {u.isBanned ? "Unban" : "Ban"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="admin__delete-btn"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </span>
              </div>
            ))}
            {users.length === 0 && (
              <p className="admin__empty">No users found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
