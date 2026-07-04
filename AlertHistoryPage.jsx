// src/pages/AlertHistoryPage.js
import React, { useState, useEffect } from 'react';

function AlertHistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔒 লোকাল স্টোরেজ থেকে আইডি ও টোকেন তুলে নেওয়া হলো
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError("Authentication missing. Please log in again.");
      setLoading(false);
      return;
    }

    // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
    const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-backend.onrender.com';

    const fetchAlertHistory = async () => {
      try {
        // 🚨 কুয়েরি প্যারামিটারে userId এবং হেডারে Authorization টোকেন পাস করা হলো
        const response = await fetch(`${backendUrl}/api/reports?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch logs from database');
        }
        
        const data = await response.json();
        
        // ব্যাকঅ্যান্ড যদি { success: true, data: [...] } আকারে পাঠায় বা ডিরেক্ট অ্যারে পাঠায়, দুইটাই হ্যান্ডেল করা হলো
        if (Array.isArray(data)) {
          setHistoryData(data);
        } else if (data && Array.isArray(data.data)) {
          setHistoryData(data.data);
        } else {
          setHistoryData([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlertHistory();
  }, []);

  // 🕒 টাইম ফরম্যাট করার সুন্দর ফাংশন
  const formatTime = (isoString) => {
    if (!isoString) return "Unknown Time";
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return <div style={{ padding: '20px', color: '#64748b' }}>⏳ Fetching live incident logs from MySQL database...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: '#ef4444' }}>❌ Error: {error}. Please ensure your backend server is running.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '6px', color: '#0f172a' }}>⏳ Emergency Alert Logs History</h2>
      <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '14px' }}>Chronological records of all SOS triggers and communication streams broadcasted from your profile.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {historyData.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '10px' }}>
            📭 No emergency records found in the database yet.
          </div>
        ) : (
          historyData.map((log) => (
            <div key={log.id} style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ color: log.severity === 'Critical' ? '#ef4444' : '#3b82f6', fontSize: '15px', fontWeight: '600' }}>
                  🚨 {log.severity || 'SOS'} Alert: {log.description || 'No Description'}
                </h4>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  📅 {log.created_at ? formatTime(log.created_at) : (log.timestamp || 'Just now')} | 📍 {log.location || log.area || 'Unknown Location'}
                </p>
              </div>
              <span style={{ 
                backgroundColor: log.severity === 'Critical' ? '#fee2e2' : '#e0f2fe',
                color: log.severity === 'Critical' ? '#ef4444' : '#0369a1',
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
              }}>
                {log.severity || 'Active'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertHistoryPage;