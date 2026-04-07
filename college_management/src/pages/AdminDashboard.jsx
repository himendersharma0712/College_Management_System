import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  // Standalone mock admin user
  const user = {
    name: "System Administrator",
    user_id: "ADMIN-001",
    role: "Super Admin"
  };

  const [data, setData] = useState({ kpis: {}, users: [], alerts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch for admin analytics
    const loadDashboard = () => {
      setLoading(true);
      setTimeout(() => {
        setData({
          kpis: {
            totalStudents: 3420,
            totalTeachers: 145,
            activeSubjects: 86,
            feeDefaults: 42
          },
          users: [
            { id: "T-9021", name: "Prof. Sarah Jenkins", role: "Teacher", department: "Computer Science", status: "Active" },
            { id: "S-1042", name: "Alex Mercer", role: "Student", department: "Mechanical", status: "Active" },
            { id: "T-8834", name: "Dr. Robert Vance", role: "Teacher", department: "Physics", status: "Inactive" },
            { id: "S-3391", name: "Maya Lin", role: "Student", department: "Computer Science", status: "Active" }
          ],
          alerts: [
            { id: 1, type: "Warning", message: "High server load detected during result publication.", time: "10 mins ago" },
            { id: 2, type: "Info", message: "Database backup completed successfully.", time: "2 hours ago" },
            { id: 3, type: "Critical", message: "Failed login attempts exceeded for ID: ADMIN-004", time: "5 hours ago" }
          ]
        });
        setLoading(false);
      }, 500);
    };

    loadDashboard();
  }, []);

  if (loading) return <div style={{ padding: '20px', color: '#64748b' }}>Loading control center...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: '#0f172a', margin: '0 0 5px 0' }}>{user.name}</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Role: {user.role} | ID: {user.user_id}</p>
        </div>
        
        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            Add New User
          </button>
          <button style={{ padding: '10px 16px', backgroundColor: '#475569', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            System Settings
          </button>
        </div>
      </div>
      
      {/* College-Wide KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Students</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{data.kpis.totalStudents.toLocaleString()}</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Faculty</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{data.kpis.totalTeachers}</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Active Subjects</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{data.kpis.activeSubjects}</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Fee Defaults</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#ef4444' }}>{data.kpis.feeDefaults}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* User Management Table */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>User Role Management</h3>
            <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}>View All Directory</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.9rem' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Name / ID</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Role</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 20px' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#334155' }}>{u.name}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{u.id} • {u.department}</p>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ backgroundColor: u.role === 'Teacher' ? '#dcfce7' : '#e0e7ff', color: u.role === 'Teacher' ? '#166534' : '#3730a3', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ color: u.status === 'Active' ? '#10b981' : '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <button style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts / Logs */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>System Health & Alerts</h3>
          </div>
          <div style={{ padding: '0 20px' }}>
            {data.alerts.map((alert) => (
              <div key={alert.id} style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  backgroundColor: alert.type === 'Critical' ? '#ef4444' : alert.type === 'Warning' ? '#f59e0b' : '#3b82f6' 
                }} />
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
    </div>
  );
}