import { useState, useEffect } from "react";
import { ToastContainer } from "./components/Toast/Toast";
import Button from "./components/Button/Button";
import Text from "./components/Text/Text";
import Page from "./components/Page/Page";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { movieService } from "./services/movieService";
import { IMAGE_BASE_URL } from "./config";

function App() {
  const [movieState, setMovieState] = useState({
    movies: [],
    searchQuery: "",
    loading: false,
    selectedMovie: null
  });

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      setMovieState(prev => ({ ...prev, loading: true }));
      const data = await movieService.getTrendingMovies();
      setMovieState(prev => ({
        ...prev,
        movies: data.results,
        loading: false
      }));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      setMovieState(prev => ({ ...prev, loading: false }));
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      fetchTrendingMovies();
      return;
    }

    try {
      setMovieState(prev => ({ ...prev, loading: true }));
      const data = await movieService.searchMovies(query);
      setMovieState(prev => ({
        ...prev,
        movies: data.results,
        loading: false
      }));
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovieState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setMovieState(prev => ({ ...prev, searchQuery: query }));
    searchMovies(query);
  };

  const handleSeeMore = async (movieId) => {
    try {
      const data = await movieService.getMovieDetails(movieId);
      setMovieState(prev => ({
        ...prev,
        selectedMovie: data
      }));
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const closeModal = () => {
    setMovieState(prev => ({
      ...prev,
      selectedMovie: null
    }));
  };

  const handleModalClick = (e) => {
    // Close modal if clicking the overlay (outside the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Page>
      <ToastContainer>
        <Header title="Movie Browser" />
        <Text variant="header">Movie Browser</Text>
        
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={movieState.searchQuery}
            onChange={handleSearch}
            placeholder="Search for movies..."
            style={{
              padding: "8px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "300px"
            }}
          />
        </div>

        <div>
          {movieState.loading ? (
            <Text variant="body">Loading...</Text>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              padding: "20px 0"
            }}>
              {movieState.movies.map(movie => (
                <div key={movie.id} style={{ 
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <img 
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <Text variant="body" style={{ 
                      fontWeight: "bold",
                      marginBottom: "5px"
                    }}>
                      {movie.title}
                    </Text>
                    <Text variant="caption" style={{ color: "#666" }}>
                      {new Date(movie.release_date).getFullYear()}
                    </Text>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      marginTop: "5px",
                      justifyContent: "space-between"
                    }}>
                      <span style={{ 
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}>
                        {movie.vote_average.toFixed(1)} ⭐
                      </span>
                      <Button 
                        variant="primary"
                        onClick={() => handleSeeMore(movie.id)}
                        style={{ padding: "4px 8px", fontSize: "12px" }}
                      >
                        See More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Movie Details Modal */}
        {movieState.selectedMovie && (
          <div 
            onClick={handleModalClick}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }}
          >
            <div style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "800px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative"
            }}>
              <button 
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#666",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
              >
                ×
              </button>
              
              <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <img 
                  src={`${IMAGE_BASE_URL}${movieState.selectedMovie.poster_path}`}
                  alt={movieState.selectedMovie.title}
                  style={{
                    width: "300px",
                    height: "450px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Text variant="header" style={{ marginBottom: "10px" }}>
                    {movieState.selectedMovie.title}
                  </Text>
                  <div style={{ marginBottom: "15px" }}>
                    <Text variant="body" style={{ fontWeight: "bold" }}>Overview:</Text>
                    <Text variant="body">{movieState.selectedMovie.overview}</Text>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Text variant="body" style={{ fontWeight: "bold" }}>Release Date:</Text>
                    <Text variant="body">{movieState.selectedMovie.release_date}</Text>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Text variant="body" style={{ fontWeight: "bold" }}>Runtime:</Text>
                    <Text variant="body">{movieState.selectedMovie.runtime} minutes</Text>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Text variant="body" style={{ fontWeight: "bold" }}>Rating:</Text>
                    <Text variant="body">{movieState.selectedMovie.vote_average.toFixed(1)} ⭐</Text>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Text variant="body" style={{ fontWeight: "bold" }}>Genres:</Text>
                    <Text variant="body">
                      {movieState.selectedMovie.genres?.map(genre => genre.name).join(", ")}
                    </Text>
                  </div>
                  <div>
                    <Text variant="body" style={{ fontWeight: "bold" }}>Budget:</Text>
                    <Text variant="body">
                      ${movieState.selectedMovie.budget?.toLocaleString()}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </ToastContainer>
    </Page>
  );
}

export default App;
