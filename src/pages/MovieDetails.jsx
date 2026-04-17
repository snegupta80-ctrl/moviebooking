import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Plus, Star, Clock } from 'lucide-react';
import { getMovieById } from '../data/movies';
import './MovieDetails.css';
import { useEffect } from 'react';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  if (!movie) return <div className="text-white p-4">Movie not found</div>;

  return (
    <div className="details-container animate-fade-in">
      <div className="details-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="details-background">
          <img src={movie.poster} alt={movie.title} />
          <div className="details-overlay"></div>
        </div>
      </div>

      <div className="details-content">
        <div className="title-row">
          <h1 className="details-title">{movie.title}</h1>
        </div>
        
        <div className="meta-tags">
          <span className="tag"><Star size={14} fill="#FACC15" color="#FACC15" /> {movie.rating}</span>
          <span className="tag">{movie.genre}</span>
          <span className="tag"><Clock size={14} /> {movie.duration}</span>
        </div>

        <div className="action-buttons">
          <button className="btn-play glow-btn primary" onClick={() => navigate(`/book/seats/${movie.id}`)}>
            Book Tickets
          </button>
          <button className="btn-icon secondary">
            <Plus size={24} />
          </button>
        </div>

        <div className="synopsis">
          <h3>Synopsis</h3>
          <p>{movie.description}</p>
        </div>

        {movie.cast && movie.cast.length > 0 && (
          <div className="cast-section">
            <h3>Top Cast</h3>
            <div className="cast-scroll horizontal-scroll">
              {movie.cast.map((avatar, idx) => (
                <div key={idx} className="cast-avatar">
                  <img src={avatar} alt="Cast" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
