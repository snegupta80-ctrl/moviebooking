import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getMovieById } from '../data/movies';
import './SeatSelection.css';

const ROWS = 8;
const COLS = 6;
const SEAT_PRICE = 15;

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Randomly assign some booked seats for demo purposes
    const initialBooked = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() < 0.3) {
          initialBooked.push(`${r}-${c}`);
        }
      }
    }
    setBookedSeats(initialBooked);
  }, []);

  if (!movie) return null;

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const proceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    // navigate to payment and pass data via state
    navigate('/book/payment', { 
      state: { 
        movie, 
        seats: selectedSeats, 
        total: selectedSeats.length * SEAT_PRICE 
      } 
    });
  };

  return (
    <div className="seat-selection-container animate-fade-in">
      <div className="seat-header">
        <button className="back-btn-small" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="movie-summary-header">
          <h2>{movie.title}</h2>
          <span>Today, 8:30 PM • English 3D</span>
        </div>
      </div>

      <div className="theater-screen-container">
        <div className="theater-screen"></div>
        <div className="screen-glow"></div>
        <span className="screen-text">SCREEN</span>
      </div>

      <div className="seats-container">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {Array.from({ length: COLS }).map((_, colIndex) => {
              const seatId = `${rowIndex}-${colIndex}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);
              
              let seatClass = 'seat';
              if (isBooked) seatClass += ' booked';
              else if (isSelected) seatClass += ' selected';
              else seatClass += ' available';

              return (
                <div 
                  key={seatId} 
                  className={seatClass}
                  onClick={() => toggleSeat(seatId)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat available legend-icon"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected legend-icon"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked legend-icon"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className={`bottom-booking-bar ${selectedSeats.length > 0 ? 'visible' : ''}`}>
        <div className="booking-info">
          <div className="seats-info">
            <span className="label">Selected Seats</span>
            <span className="value">{selectedSeats.length}</span>
          </div>
          <div className="price-info">
            <span className="label">Total Price</span>
            <span className="value">${selectedSeats.length * SEAT_PRICE}</span>
          </div>
        </div>
        <button className="btn-proceed glow-btn" onClick={proceedToPayment}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
