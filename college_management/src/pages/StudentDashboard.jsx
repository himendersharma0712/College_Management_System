import { useState, useEffect } from 'react';

export default function StudentDashboard() {
  // Standalone mock user since AuthContext is removed
  const user = {
    name: "Test Student",
    user_id: "12345"
  };

  const [data, setData] = useState({ attendance: [], marks: [], subjects: [], announcements: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating an API call with a brief timeout
    const loadDashboard = () => {
      try {
        setLoading(true);
        
        // Mock data to populate the UI
        setData({
          attendance: [
            { subject: "Operating Systems", total: 40, attended: 35 },
            { subject: "Computer Networks", total: 35, attended: 28 },
            { subject: "Algorithms", total: 45, attended: 42 }
          ],
          marks: [
            { subject: "Operating Systems", exam: "Mid-Term", score: 85, max: 100 },
            { subject: "Computer Networks", exam: "Mid-Term", score: 78, max: 100 },
            { subject: "Algorithms", exam: "Mid-Term", score: 92, max: 100 }
          ],
          announcements: [
            { id: 1, title: "Lab schedule updated", date: "2026-04-10" },
            { id: 2, title: "Fee submission deadline", date: "2026-04-15" }
          ]
        });
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading your portal...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  // Calculate overall attendance percentages
  const totalClasses = data.attendance.reduce((sum, item) => sum + item.total, 0);
  const attendedClasses = data.attendance.reduce((sum, item) => sum + item.attended, 0);
  const overallAttendance = totalClasses === 0 ? 0 : Math.round((attendedClasses / totalClasses) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Section */}
      <div>
        <h1 style={{ color: '#0f172a', margin: '0 0 5px 0' }}>Welcome back, {user.name}</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Roll Number: {user.user_id}</p>
      </div>
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '1rem', fontWeight: '500' }}>Overall Attendance</h3>
          <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold', color: overallAttendance < 75 ? '#ef4444' : '#10b981' }}>
            {overallAttendance}%
          </p>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>University requirement: 75%</span>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '1rem', fontWeight: '500' }}>Recent Announcements</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '0.95rem' }}>
            {data.announcements.map(ann => (
              <li key={ann.id} style={{ marginBottom: '8px' }}>
                <strong>{ann.title}</strong> <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>({ann.date})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tables Section Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Subject-Wise Attendance Table */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Subject-Wise Attendance</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.9rem' }}>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Subject</th>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Attended / Total</th>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.attendance.map((item, index) => {
                const percent = Math.round((item.attended / item.total) * 100);
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 20px', color: '#334155' }}>{item.subject}</td>
                    <td style={{ padding: '12px 20px', color: '#64748b' }}>{item.attended} / {item.total}</td>
                    <td style={{ padding: '12px 20px', fontWeight: '500', color: percent < 75 ? '#ef4444' : '#10b981' }}>
                      {percent}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Examination Results Table */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Examination Results</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.9rem' }}>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Subject</th>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Exam</th>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.marks.map((mark, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 20px', color: '#334155' }}>{mark.subject}</td>
                  <td style={{ padding: '12px 20px', color: '#64748b' }}>{mark.exam}</td>
                  <td style={{ padding: '12px 20px', fontWeight: '500', color: '#0f172a' }}>
                    {mark.score} / {mark.max}
                  </td>
                </tr>
              ))}
              {data.marks.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                    No results published yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}