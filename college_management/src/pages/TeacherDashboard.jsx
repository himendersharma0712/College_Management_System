import { useState, useEffect } from 'react';
import { fetchStudents, createStudent, deleteStudent } from '../api';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ stats: {}, schedule: [], recentActivity: [] });
  
  // Real Database State
  const [students, setStudents] = useState([]);
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
        // Load real students from MySQL via FastAPI
        const dbStudents = await fetchStudents();
        setStudents(dbStudents);

        // Populate visual dashboard elements
        setData({
          stats: { 
            totalStudents: dbStudents.length, // Live from DB
            averageAttendance: 82,            // Mock
            pendingAssessments: 3             // Mock
          },
          schedule: [
            { id: 1, time: "09:00 AM", subject: "Operating Systems", room: "Lab 3", type: "Practical" },
            { id: 2, time: "11:30 AM", subject: "Computer Networks", room: "Room 402", type: "Lecture" },
            { id: 3, time: "02:00 PM", subject: "Algorithms", room: "Room 405", type: "Lecture" }
          ],
          recentActivity: [
            { id: 1, action: "Attendance Marked", details: "Operating Systems - CSE Batch A", time: "2 hours ago" },
            { id: 2, action: "Marks Uploaded", details: "Mid-Term: Computer Networks", time: "Yesterday" },
            { id: 3, action: "Announcement Posted", details: "Lab submission deadline extended", time: "2 days ago" }
          ]
        });
      } catch (err) {
        setDbError("Could not connect to database. Is XAMPP and FastAPI running?");
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

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDbError(null);

    try {
      const newStudent = await createStudent({ name: formData.name, user_id: formData.user_id });
      setStudents([...students, newStudent]);
      setData(prev => ({...prev, stats: {...prev.stats, totalStudents: students.length + 1}}));
      handleCloseModal();
    } catch (err) {
      setDbError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently remove ${name}?`)) {
      try {
        await deleteStudent(id);
        setStudents(students.filter(s => s.id !== id));
        setData(prev => ({...prev, stats: {...prev.stats, totalStudents: students.length - 1}}));
      } catch (err) {
        alert("Failed to delete student from database.");
      }
    }
  };

  if (loading) return <div style={{ padding: '20px', color: '#64748b' }}>Syncing with database...</div>;

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
        <h1 style={{ color: '#0f172a', margin: '0 0 15px 0' }}>Teacher Dashboard</h1>
        {dbError && !isModalOpen && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{dbError}</div>}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '10px' }}>
          <button onClick={() => setActiveTab('overview')} className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}>Overview</button>
          <button onClick={() => setActiveTab('students')} className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}>Manage Students</button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW (Full Visuals Restored) */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* KPI Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Enrolled</h3>
              <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.stats.totalStudents}</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Avg. Attendance</h3>
              <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.stats.averageAttendance}%</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #f59e0b' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Pending Tasks</h3>
              <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.stats.pendingAssessments}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            
            {/* Today's Schedule */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '15px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Today's Schedule</h3>
                <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}>View Full</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <tbody>
                  {data.schedule.map((cls) => (
                    <tr key={cls.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 20px', width: '100px' }}>
                        <span style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>{cls.time}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#334155' }}>{cls.subject}</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{cls.type} • {cls.room}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Activity Log */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Recent Activity</h3>
              </div>
              <div style={{ padding: '0 20px' }}>
                {data.recentActivity.map((log) => (
                  <div key={log.id} style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: '#334155', fontSize: '0.95rem' }}>{log.action}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{log.time}</span>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{log.details}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: LIVE DATABASE CRUD */}
      {activeTab === 'students' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>Live Database Roster</h2>
            <button onClick={handleOpenModal} style={{ padding: '10px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              + Add New Student
            </button>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.9rem' }}>
                  <th style={{ padding: '15px 20px' }}>Database ID</th>
                  <th style={{ padding: '15px 20px' }}>Roll Number</th>
                  <th style={{ padding: '15px 20px' }}>Full Name</th>
                  <th style={{ padding: '15px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px 20px', color: '#94a3b8', fontSize: '0.9rem' }}>#{student.id}</td>
                    <td style={{ padding: '15px 20px', fontWeight: '600', color: '#334155' }}>{student.user_id}</td>
                    <td style={{ padding: '15px 20px', color: '#0f172a' }}>{student.name}</td>
                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                      <button onClick={() => handleDeleteStudent(student.id, student.name)} style={{ padding: '6px 12px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr><td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No students in database.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Add New Student</h2>
            {dbError && <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '0.9rem', fontWeight: '500' }}>{dbError}</div>}
            
            <form onSubmit={handleSaveStudent}>
              <label className="form-label">Full Name</label>
              <input type="text" required className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Himender Sharma" />

              <label className="form-label">Roll Number</label>
              <input type="text" required className="form-input" value={formData.user_id} onChange={(e) => setFormData({...formData, user_id: e.target.value})} placeholder="e.g. S-1001" />

              <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button type="button" onClick={handleCloseModal} style={{ flex: 1, padding: '12px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Saving...' : 'Create in DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}