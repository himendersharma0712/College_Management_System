import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function PortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Dynamically determine the role from the URL (e.g., "/teacher/profile" -> "teacher")
  const currentPath = location.pathname;
  const activeRole = currentPath.split('/')[1] || 'student'; // Defaults to student

  // 2. Dynamic Mock Users based on the active role
  const mockUsers = {
    student: { name: "Test Student", id: "S-12345", avatar: "TS", roleDisplay: "Student" },
    teacher: { name: "Prof. Sarah Jenkins", id: "T-9021", avatar: "SJ", roleDisplay: "Teacher" },
    admin: { name: "System Admin", id: "ADMIN-001", avatar: "SA", roleDisplay: "Super Admin" }
  };
  const user = mockUsers[activeRole] || mockUsers.student;

  // 3. Dynamic Navigation Links based on the active role
  const navConfigs = {
    student: [
      { name: 'Dashboard', path: '/student', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'My Profile', path: '/student/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { name: 'Academics', path: '/student/academics', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
    ],
    teacher: [
      { name: 'Dashboard', path: '/teacher', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'My Classes', path: '/teacher/classes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: 'Assignments', path: '/teacher/assignments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
    ],
    admin: [
      { name: 'Control Center', path: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
      { name: 'User Directory', path: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
      { name: 'System Settings', path: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
    ]
  };
  const currentNav = navConfigs[activeRole] || navConfigs.student;

  const handleLogout = () => navigate('/');

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', margin: 0 }}>
      
      <style>{`
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #94a3b8; text-decoration: none; border-radius: 8px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover { background-color: #1e293b; color: #f8fafc; }
        .nav-link.active { background-color: #3b82f6; color: #ffffff; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3); }
        .logout-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px; background-color: #1e293b; color: #f87171; border: 1px solid transparent; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; font-weight: 600; font-size: 0.95rem; }
        .logout-btn:hover { background-color: #7f1d1d; color: #fca5a5; }
        .role-switcher-btn { padding: 6px 12px; border-radius: 4px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-size: 0.85rem; font-weight: 600; color: #475569; transition: all 0.2s; }
        .role-switcher-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
        .role-switcher-btn.active { background: #e0e7ff; color: #4f46e5; border-color: #4f46e5; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ width: '42px', height: '42px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.4rem', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }}>
            C
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem', letterSpacing: '0.5px' }}>CampusPro</h2>
            <span style={{ color: '#3b82f6', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              {activeRole} Portal
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '16px' }}>Main Menu</div>
          {currentNav.map((item) => {
            const isActive = currentPath === item.path || (currentPath === '/' && item.path === `/${activeRole}`);
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

        {/* User Profile */}
        <div style={{ padding: '20px 16px', backgroundColor: '#020617', borderTop: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '0 8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#334155', border: '2px solid #475569', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f8fafc', fontWeight: 'bold', fontSize: '1rem' }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ margin: 0, color: '#f8fafc', fontSize: '0.95rem', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</p>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>{user.roleDisplay}</p>
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
        
        {/* Top Header with Role Switcher for Testing */}
        <header style={{ backgroundColor: '#ffffff', padding: '16px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Test View As:</span>
            <button onClick={() => navigate('/student')} className={`role-switcher-btn ${activeRole === 'student' ? 'active' : ''}`}>Student</button>
            <button onClick={() => navigate('/teacher')} className={`role-switcher-btn ${activeRole === 'teacher' ? 'active' : ''}`}>Teacher</button>
            <button onClick={() => navigate('/admin')} className={`role-switcher-btn ${activeRole === 'admin' ? 'active' : ''}`}>Admin</button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
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