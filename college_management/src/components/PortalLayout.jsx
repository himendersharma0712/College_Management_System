import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function PortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine role based on URL for dynamic UI updates
  const currentRole = location.pathname.split('/')[1] || 'portal';

  const handleLogout = () => {
    // Later: Add logic here to clear tokens/session state
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f4f6f8', margin: 0 }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#1e293b', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #334155', textTransform: 'capitalize' }}>
          {currentRole} Portal
        </div>
        
        <nav style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Dynamic Links based on role could go here. For now, universal dashboard links: */}
          <Link to={`/${currentRole}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard Home</Link>
          <Link to={`/${currentRole}/profile`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>Profile</Link>
          <Link to={`/${currentRole}/settings`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>Settings</Link>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #334155' }}>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ backgroundColor: '#fff', padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ color: '#64748b' }}>Logged in as: User</span>
        </header>

        {/* Dynamic Page Content */}
        <div style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
          <Outlet /> {/* This is where Student/Teacher/Admin components render */}
        </div>
      </main>

    </div>
  );
}