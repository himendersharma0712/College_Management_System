export default function StudentDashboard() {
  return (
    <div>
      <h1 style={{ color: '#0f172a', margin: '0 0 20px 0' }}>Welcome, Student</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        {/* Placeholder Card 1 */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>Attendance</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: '#3b82f6' }}>85%</p>
        </div>

        {/* Placeholder Card 2 */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>Recent Marks</h3>
          <p style={{ margin: 0, color: '#64748b' }}>Data table goes here...</p>
        </div>

      </div>
    </div>
  );
}