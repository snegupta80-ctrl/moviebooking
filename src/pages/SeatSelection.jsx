import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getMovieById } from '../data/movies';
import './SeatSelection.css';

const ROWS = 8;
const COLS = 6;
const SEAT_PRICE = 15;
const DATES = ["Today, 17 Apr", "Tomorrow, 18 Apr", "Sun, 19 Apr", "Mon, 20 Apr"];
const TIMES = ["10:30 AM", "12:15 PM", "4:45 PM", "8:30 PM", "11:00 PM"];

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);
  
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState(TIMES[3]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Re-roll booked seats when Time/Date changes to simulate different showtimes
  useEffect(() => {
    const initialBooked = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() < 0.3) {
          initialBooked.push(`${r}-${c}`);
        }
      }
    }
    setBookedSeats(initialBooked);
    setSelectedSeats([]); // clear selections on time change
  }, [selectedDate, selectedTime]);

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
    navigate('/book/payment', { 
      state: { 
        movie, 
        seats: selectedSeats, 
        total: selectedSeats.length * SEAT_PRICE,
        date: selectedDate,
        time: selectedTime
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
          <span>{selectedDate} • {selectedTime}</span>
        </div>
      </div>

      <div className="datetime-selector">
        <div className="scroll-chips date-scroll">
          {DATES.map(d => (
            <div key={d} className={`dt-chip ${selectedDate === d ? 'active' : ''}`} onClick={() => setSelectedDate(d)}>
              {d.split(', ')[0]}<br/><span>{d.split(', ')[1]}</span>
            </div>
          ))}
        </div>
        <div className="scroll-chips time-scroll">
          {TIMES.map(t => (
            <div key={t} className={`dt-chip ${selectedTime === t ? 'active' : ''}`} onClick={() => setSelectedTime(t)}>
              {t}
            </div>
          ))}
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
            <span className="label">Selected</span>
            <span className="value">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '0'}</span>
          </div>
          <div className="price-info text-right">
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
