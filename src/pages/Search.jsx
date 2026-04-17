import { useState } from 'react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { movieData } from '../data/movies';
import MovieCard from '../components/MovieCard';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  
  const allMovies = [...movieData.trending, ...movieData.popular, ...movieData.bollywood];
  const filtered = query ? allMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase())) : allMovies;

  return (
    <div className="search-container animate-fade-in">
      <div className="search-header">
        <div className="search-glass-input">
          <SearchIcon size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search movies, series..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="filter-btn">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="categories-scroll horizontal-scroll">
        {['All', 'Action', 'Sci-Fi', 'Thriller', 'Comedy', 'Drama'].map(cat => (
          <div key={cat} className={`category-chip ${cat === 'All' ? 'active' : ''}`}>{cat}</div>
        ))}
      </div>

      <div className="results-grid">
        {filtered.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
