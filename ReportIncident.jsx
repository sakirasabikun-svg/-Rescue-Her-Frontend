// src/components/ReportIncident.jsx
import React, { useState } from 'react';

function ReportIncident() {
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    // Payload object compilation
    const reportData = { location, severity, description };

    // Fetch call triggering backend POST pipeline
    fetch('https://rescue-her-backend.onrender.com/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setStatusMessage('✅ Success! Incident logged securely and anonymously.');
          // Resetting form fields
          setLocation('');
          setDescription('');
          setSeverity('Medium');
        } else {
          setStatusMessage('❌ Failed: ' + data.message);
        }
      })
      .catch((err) => {
        console.error("Pipeline post action mismatch execution control:", err);
        setLoading(false);
        setStatusMessage('❌ Error connecting to central security hub node.');
      });
  };

  return (
    <div className="grid-card" style={{ padding: '20px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0' }}>
      <div className="card-title-bar" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0b1e33' }}>📝 Report Anonymous Incident</span>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>📍 Area/Location</label>
          <input 
            type="text" 
            placeholder="e.g., Dhanmondi Lake, Road 27" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>⚠️ Danger Severity Level</label>
          <select 
            value={severity} 
            onChange={(e) => setSeverity(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', background: '#fff' }}
          >
            <option value="Low">🟢 Low (Suspicious Activity)</option>
            <option value="Medium">🟡 Medium (Harassment / Eve Teasing)</option>
            <option value="High">🔴 High (Physical Assault / Severe Risk)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>💬 Description (Optional)</label>
          <textarea 
            placeholder="Describe the situation briefly..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', resize: 'none' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '6px', 
            background: loading ? '#94a3b8' : '#dc2626', 
            color: '#fff', 
            border: 'none', 
            padding: '10px', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            fontSize: '12px',
            transition: 'background 0.2s'
          }}
        >
          {loading ? 'Transmitting logs...' : '🚨 Broadcast Secure Report'}
        </button>
      </form>

      {statusMessage && (
        <p style={{ marginTop: '12px', fontSize: '11px', fontWeight: '600', color: statusMessage.includes('✅') ? '#059669' : '#dc2626', textAlign: 'center' }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default ReportIncident;