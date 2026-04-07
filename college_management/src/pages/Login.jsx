import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e, role) => {
    e.preventDefault();
    // Later: Swap this out for actual FastAPI authentication
    navigate(`/${role}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#0f172a', marginBottom: '30px' }}>College System Login</h2>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#475569', fontSize: '0.9rem' }}>User ID</label>
            <input type="text" placeholder="Enter your ID" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#475569', fontSize: '0.9rem' }}>Password</label>
            <input type="password" placeholder="Enter your password" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={(e) => handleLogin(e, 'student')} style={{ flex: 1, padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Student</button>
            <button onClick={(e) => handleLogin(e, 'teacher')} style={{ flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Teacher</button>
            <button onClick={(e) => handleLogin(e, 'admin')} style={{ flex: 1, padding: '10px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Admin</button>
          </div>
        </form>
      </div>

    </div>
  );
}