import { useState, useEffect } from 'react';

export default function TeacherDashboard() {
  // Standalone mock user
  const user = {
    name: "Prof. Sarah Jenkins",
    user_id: "T-9021",
    department: "Computer Science"
  };

  const [data, setData] = useState({ stats: {}, schedule: [], recentActivity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch for dashboard data
    const loadDashboard = () => {
      setLoading(true);
      setTimeout(() => {
        setData({
          stats: {
            totalStudents: 142,
            averageAttendance: 82,
            pendingAssessments: 3
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
        setLoading(false);
      }, 500);
    };

    loadDashboard();
  }, []);

  if (loading) return <div style={{ padding: '20px', color: '#64748b' }}>Loading dashboard...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: '#0f172a', margin: '0 0 5px 0' }}>Welcome, {user.name}</h1>
          <p style={{ color: '#64748b', margin: 0 }}>{user.department} | ID: {user.user_id}</p>
        </div>
        
        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Mark Attendance
          </button>
          <button style={{ padding: '10px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Upload Marks
          </button>
        </div>
      </div>
      
      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Students</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{data.stats.totalStudents}</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Avg. Attendance</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{data.stats.averageAttendance}%</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Pending Tasks</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{data.stats.pendingAssessments}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Today's Schedule */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Today's Schedule</h3>
            <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}>View Full Timetable</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <tbody>
              {data.schedule.map((cls) => (
                <tr key={cls.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px', width: '100px' }}>
                    <span style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
                      {cls.time}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#334155' }}>{cls.subject}</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{cls.type} • {cls.room}</p>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
                      Start Class
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity Log */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
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
  );
}