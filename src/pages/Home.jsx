import { Play as PlayIcon, Search } from 'lucide-react';
import { movieData } from '../data/movies';
import MovieCard from '../components/MovieCard';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const { hero, trending, popular, bollywood } = movieData;
  const navigate = useNavigate();

  return (
    <div className="home-container animate-fade-in">
      {/* Quick Search Header */}
      <div className="home-quick-search" onClick={() => navigate('/search')}>
        <div className="search-glass-input home-search">
          <Search size={20} color="var(--text-secondary)" />
          <span>Search movies, theaters...</span>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-background">
          <img src={hero.poster} alt={hero.title} />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <span className="hero-genre">{hero.genre}</span>
          <h1 className="hero-title">{hero.title}</h1>
          <div className="hero-actions">
            <Link to={`/movie/${hero.id}`} className="play-btn glow-btn">
              <PlayIcon size={20} fill="currentColor" /> Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
        </div>
        <div className="horizontal-scroll">
          {trending.map(movie => (
            <div key={movie.id} className="scroll-item">
              <MovieCard movie={movie} size="large" />
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Bollywood Hits</h2>
        </div>
        <div className="horizontal-scroll">
          {bollywood.map(movie => (
            <div key={movie.id} className="scroll-item">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Popular</h2>
        </div>
        <div className="horizontal-scroll">
          {popular.map(movie => (
            <div key={movie.id} className="scroll-item">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
