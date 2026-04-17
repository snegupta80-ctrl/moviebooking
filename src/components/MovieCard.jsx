import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import './MovieCard.css';

function MovieCard({ movie, size = "normal" }) {
  const className = `movie-card ${size === "large" ? "large" : ""}`;
  
  return (
    <Link to={`/movie/${movie.id}`} className={className}>
      <div className="poster-container">
        <img src={movie.poster} alt={movie.title} className="poster-img" />
        <div className="rating-badge">
          <Star size={12} fill="#FACC15" color="#FACC15" />
          <span>{movie.rating}</span>
        </div>
      </div>
      <div className="movie-info">
        <h4 className="movie-title">{movie.title}</h4>
        <span className="movie-genre">{movie.genre}</span>
      </div>
    </Link>
  );
}

export default MovieCard;
