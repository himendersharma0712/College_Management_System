import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function PortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Standalone mock user since AuthContext was removed
  const user = {
    name: "Test Student",
    role: "student",
    avatar: "TS" // Initials for the profile picture
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Navigation config with inline SVGs for premium icons
  const navItems = [
    { 
      name: 'Dashboard', 
      path: `/${user.role}`, 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      name: 'My Profile', 
      path: `/${user.role}/profile`, 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
    },
    { 
      name: 'Settings', 
      path: `/${user.role}/settings`, 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' 
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', margin: 0 }}>
      
      {/* Injected CSS for Sidebar Hover States and Scrollbars. 
        This is how you get premium UI without external CSS files.
      */}
      <style>{`
        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        .nav-link:hover {
          background-color: #1e293b;
          color: #f8fafc;
        }
        .nav-link.active {
          background-color: #3b82f6;
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          background-color: #1e293b;
          color: #f87171;
          border: 1px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .logout-btn:hover {
          background-color: #7f1d1d;
          color: #fca5a5;
        }
        /* Custom Webkit scrollbar for a clean look inside the layout */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* Modern Dark Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>

        {/* Logo Area */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ width: '42px', height: '42px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.4rem', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }}>
            C
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem', letterSpacing: '0.5px' }}>CampusPro</h2>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
              {user.role} Portal
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '16px' }}>
            Main Menu
          </div>

          {navItems.map((item) => {
            // Determine if the current route matches the link
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === `/${user.role}`);
            
            return (
              <Link key={item.name} to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}></path>
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout Bottom Section */}
        <div style={{ padding: '20px 16px', backgroundColor: '#020617', borderTop: '1px solid #1e293b' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '0 8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#334155', border: '2px solid #475569', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f8fafc', fontWeight: 'bold', fontSize: '1rem' }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ margin: 0, color: '#f8fafc', fontSize: '0.95rem', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user.name}
              </p>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>
                ID: 12345
              </p>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign Out
          </button>

        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ backgroundColor: '#ffffff', padding: '16px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.25rem', fontWeight: '600' }}>
            {location.pathname.includes('profile') ? 'My Profile' :
             location.pathname.includes('settings') ? 'System Settings' : 'Dashboard Overview'}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Notification Bell Icon */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <span style={{ color: '#94a3b8' }}>|</span>
            <span style={{ color: '#475569', fontSize: '0.9rem', fontWeight: '500' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, backgroundColor: '#f1f5f9' }}>
          <Outlet />
        </div>

      </main>

    </div>
  );
}