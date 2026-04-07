import { useState, useEffect } from 'react';
import { fetchTeachers, createTeacher, deleteTeacher } from '../api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ kpis: {}, alerts: [] });
  
  // Real Database State for Teachers
  const [teachers, setTeachers] = useState([]);
  const [dbError, setDbError] = useState(null);
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', user_id: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- LIFECYCLE: FETCH REAL DATA + MOCK VISUALS ---
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        // Load real teachers from MySQL
        const dbTeachers = await fetchTeachers();
        setTeachers(dbTeachers);

        // Populate visual dashboard elements
        setData({
          kpis: {
            totalStudents: 3420, // Mock for now
            totalTeachers: dbTeachers.length, // Live from DB
            activeSubjects: 86,
            feeDefaults: 42
          },
          alerts: [
            { id: 1, type: "Warning", message: "High server load detected during result publication.", time: "10 mins ago" },
            { id: 2, type: "Info", message: "Database backup completed successfully.", time: "2 hours ago" }
          ]
        });
      } catch (err) {
        setDbError("Could not connect to database. Ensure FastAPI is running.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  // --- CRUD HANDLERS (REAL DATABASE) ---
  const handleOpenModal = () => {
    setFormData({ name: '', user_id: '' });
    setDbError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDbError(null);

    try {
      const newTeacher = await createTeacher({ name: formData.name, user_id: formData.user_id });
      setTeachers([...teachers, newTeacher]);
      setData(prev => ({...prev, kpis: {...prev.kpis, totalTeachers: teachers.length + 1}}));
      handleCloseModal();
    } catch (err) {
      setDbError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTeacher = async (id, name) => {
    if (window.confirm(`WARNING: Are you sure you want to permanently remove ${name} from the system?`)) {
      try {
        await deleteTeacher(id);
        setTeachers(teachers.filter(t => t.id !== id));
        setData(prev => ({...prev, kpis: {...prev.kpis, totalTeachers: teachers.length - 1}}));
      } catch (err) {
        alert("Failed to delete teacher from database.");
      }
    }
  };

  if (loading) return <div style={{ padding: '20px', color: '#64748b' }}>Syncing with command center...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', position: 'relative' }}>
      
      <style>{`
        .tab-btn { padding: 10px 20px; font-weight: 600; cursor: pointer; border: none; background: transparent; color: #64748b; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab-btn:hover { color: #0f172a; }
        .tab-btn.active { color: #3b82f6; border-bottom: 2px solid #3b82f6; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); display: flex; justify-content: center; align-items: center; z-index: 50; padding: 20px; }
        .modal-content { background: #fff; padding: 30px; border-radius: 8px; width: 100%; maxWidth: 400px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
        .form-input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 5px; box-sizing: border-box; font-family: inherit; }
        .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-top: 15px; }
      `}</style>

      {/* Header */}
      <div>
        <h1 style={{ color: '#0f172a', margin: '0 0 15px 0' }}>System Administrator</h1>
        {dbError && !isModalOpen && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{dbError}</div>}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '10px' }}>
          <button onClick={() => setActiveTab('overview')} className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}>System Overview</button>
          <button onClick={() => setActiveTab('teachers')} className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}>Manage Faculty</button>
        </div>
      </div>

      {/* TAB 1: SYSTEM OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Students</h3>
              <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.kpis.totalStudents.toLocaleString()}</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Faculty</h3>
              <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.kpis.totalTeachers}</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #f59e0b' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Active Subjects</h3>
              <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.kpis.activeSubjects}</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>System Health & Alerts</h3>
            </div>
            <div style={{ padding: '0 20px' }}>
              {data.alerts.map((alert) => (
                <div key={alert.id} style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', marginTop: '5px', backgroundColor: alert.type === 'Warning' ? '#f59e0b' : '#3b82f6' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ color: '#334155', fontSize: '0.95rem' }}>{alert.type}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{alert.time}</span>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.4' }}>{alert.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE DATABASE CRUD (FACULTY) */}
      {activeTab === 'teachers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>Faculty Database Roster</h2>
            <button onClick={handleOpenModal} style={{ padding: '10px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              + Add New Teacher
            </button>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.9rem' }}>
                  <th style={{ padding: '15px 20px' }}>Database ID</th>
                  <th style={{ padding: '15px 20px' }}>Employee ID</th>
                  <th style={{ padding: '15px 20px' }}>Full Name</th>
                  <th style={{ padding: '15px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px 20px', color: '#94a3b8', fontSize: '0.9rem' }}>#{teacher.id}</td>
                    <td style={{ padding: '15px 20px', fontWeight: '600', color: '#334155' }}>{teacher.user_id}</td>
                    <td style={{ padding: '15px 20px', color: '#0f172a' }}>{teacher.name}</td>
                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                      <button onClick={() => handleDeleteTeacher(teacher.id, teacher.name)} style={{ padding: '6px 12px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
                {teachers.length === 0 && (
                  <tr><td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No faculty members in database.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD TEACHER MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Register New Faculty</h2>
            {dbError && <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '0.9rem', fontWeight: '500' }}>{dbError}</div>}
            
            <form onSubmit={handleSaveTeacher}>
              <label className="form-label">Full Name</label>
              <input type="text" required className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dr. Robert Vance" />

              <label className="form-label">Employee ID</label>
              <input type="text" required className="form-input" value={formData.user_id} onChange={(e) => setFormData({...formData, user_id: e.target.value})} placeholder="e.g. T-8834" />

              <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button type="button" onClick={handleCloseModal} style={{ flex: 1, padding: '12px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Registering...' : 'Add to Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}