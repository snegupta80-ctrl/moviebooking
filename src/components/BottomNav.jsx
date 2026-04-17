import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, User } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="glass-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={24} />
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Compass size={24} />
      </NavLink>
      <NavLink to="/saved" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Bookmark size={24} />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={24} />
      </NavLink>
    </nav>
  );
}

export default BottomNav;
