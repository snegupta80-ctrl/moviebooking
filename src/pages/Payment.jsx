import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { movie, seats, total, date, time } = location.state || {};

  if (!movie) {
    return (
      <div className="payment-container empty">
        <p>No booking details found</p>
        <button className="btn-return" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="payment-container success-state animate-fade-in">
        <div className="success-glass-card">
          <CheckCircle2 size={64} className="success-icon" />
          <h2>Booking Confirmed!</h2>
          <p>Your tickets for <strong>{movie.title}</strong> have been booked successfully.</p>
          
          <div className="ticket-details">
            <div className="detail-row">
              <span className="label">Seats</span>
              <span className="value">{seats.join(', ')}</span>
            </div>
            <div className="detail-row">
              <span className="label">Time</span>
              <span className="value">{date}, {time}</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount Paid</span>
              <span className="value">${total}</span>
            </div>
          </div>

          <button className="btn-proceed glow-btn w-full mt-4" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container animate-fade-in">
      <div className="seat-header">
        <button className="back-btn-small" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="movie-summary-header">
          <h2>Checkout</h2>
        </div>
      </div>

      <div className="payment-content">
        <div className="order-summary glass-panel">
          <img src={movie.poster} alt={movie.title} className="summary-poster" />
          <div className="summary-details">
            <h3>{movie.title}</h3>
            <p className="summary-tags">{date} • {time}</p>
            <p className="seats-list">Seats: {seats.join(', ')}</p>
            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-price">${total}</span>
            </div>
          </div>
        </div>

        <form className="payment-form" onSubmit={handleCheckout}>
          <h3 className="form-title">Payment Method</h3>
          
          <div className="glass-input-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="John Doe" required defaultValue="Jane Doe" />
          </div>

          <div className="glass-input-group">
            <label>Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" required defaultValue="4242 4242 4242 4242" />
          </div>

          <div className="form-row">
            <div className="glass-input-group half">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required defaultValue="12/25" />
            </div>
            <div className="glass-input-group half">
              <label>CVV</label>
              <input type="password" placeholder="***" required defaultValue="123" />
            </div>
          </div>

          <button type="submit" className="btn-proceed glow-btn w-full mt-4 payment-submit">
            Pay ${total} Securely
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
