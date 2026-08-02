import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

export function Header() {
  const { searchQuery, setSearchQuery, openReportModal } = useAppContext();
  const navigate = useNavigate();

  return (
    <header className="site">
      <div className="container site-bar">
        <div className="logo" onClick={() => navigate('/')}>
          <svg className="leaf" viewBox="0 0 24 24" fill="none" stroke="#2AB9C3" strokeWidth="2">
            <path d="M5 21c9 0 14-5 14-14 0-1 0-2-1-3-6 0-13 4-13 13 0 1 0 3 0 4Z" />
            <path d="M5 21c3-8 7-11 12-13" />
          </svg>
          Fieldin <span style={{ fontWeight: 400, opacity: 0.75, fontSize: 14 }}>Self Install Portal</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
            Home
          </NavLink>
          <NavLink to="/machinery" className={({ isActive }) => isActive ? 'active' : ''}>
            Machinery Documentation
          </NavLink>
          <NavLink to="/hardware" className={({ isActive }) => isActive ? 'active' : ''}>
            Hardware Catalog
          </NavLink>
        </div>

        <div className="site-search">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search brand or model (e.g. Kubota, 8R 410)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="btn btn-outline" onClick={openReportModal}>
          Need Help?
        </button>
      </div>
    </header>
  );
}
