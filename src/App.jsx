import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import BottomNav from './components/BottomNav';

import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';

function AppContent() {
  return (
    <>
      <div style={{ flex: 1, paddingBottom: 100 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/seats/:id" element={<SeatSelection />} />
          <Route path="/book/payment" element={<Payment />} />
        </Routes>
      </div>
      <BottomNav />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
