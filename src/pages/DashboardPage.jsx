// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react'; 
import heroBgImage from '../assets/hero-bg.png'; 
import ReportIncident from './ReportIncident.jsx'; 
import LiveLocationPage from './LiveLocationPage.jsx'; 

function DashboardPage({ setActiveView }) {
  const [contacts, setContacts] = useState([]); // ডিফল্ট খালি অ্যারে
  const [loading, setLoading] = useState(true);
  
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [sosLoading, setSosLoading] = useState(false); 

  // 🖼️ প্রোফাইল পিকচার গ্লোবাল সিঙ্ক ট্র্যাকিং ট্রিক
  useEffect(() => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
      console.log("📸 Dashboard Syncing Profile Pic to Global State...");
    }
  }, []);

  // 👥 কন্টাক্ট লিস্ট ফেচ করা (সুরক্ষিত করা হয়েছে)
  const fetchContacts = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`https://rescue-her-backend.onrender.com/api/contacts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else if (data && Array.isArray(data.data)) {
          setContacts(data.data);
        } else {
          setContacts([]);
        }
        setLoading(false); 
      })
      .catch((err) => {
        console.error("❌ Backend connection failed (Contacts):", err);
        setContacts([]);
        setLoading(false);
      });
  };

  // ⏳ ইনসিডেন্ট রিপোর্ট নিয়ে আসা
  const fetchUserReports = () => {
    const userId = localStorage.getItem('userId'); 
    if (!userId) {
      setReportsLoading(false);
      return;
    }

    fetch(`https://rescue-her-backend.onrender.com/api/reports?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setReports(Array.isArray(data) ? data : []);
        setReportsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch alert history:", err);
        setReports([]);
        setReportsLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
    fetchUserReports(); 
  }, []);

  // 📍 SOS বাটন ট্রিগার (সম্পূর্ণ আপডেট ও সুরক্ষতি করা হয়েছে)
  const handleSosTrigger = () => {
    if (!navigator.geolocation) {
      alert("⚠️ Geolocation is not supported by your browser!");
      return;
    }

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // JWT নিরাপত্তা টোকেন নেওয়া হলো

    if (!userId) {
      alert("🚨 Authentication Error: User session not found. Please log in again.");
      return;
    }

    setSosLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 🗺️ গুগল ম্যাপসের লিংক ফরম্যাট ফিক্স করা হলো স্ট্রিং ইন্টারপোলেশন দিয়ে
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        console.log("📍 Captured GPS Coordinates:", latitude, longitude);

        // ১. লাইভ জিপিএস নোড আপডেট করা হচ্ছে
        fetch('https://rescue-her-backend.onrender.com/api/location/update', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({
            userId,
            latitude,
            longitude,
            area: "Live SOS Location Triggered"
          })
        })
          .then((res) => res.json())
          .then((resData) => {
            // ২. লোকাল ডাটাবেজে ইনসিডেন্ট লগ সেভ করা হচ্ছে
            return fetch('https://rescue-her-backend.onrender.com/api/report', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                userId,
                location: "GPS Coordinates Triggered",
                severity: "CRITICAL",
                description: `SOS Button Pressed. Map Link: ${googleMapsLink}`
              })
            });
          })
          .then((reportRes) => reportRes.json())
          .then(() => {
            console.log("📨 Triggering Emergency Emails via Backend...");
            // ৩. মেইন নোডমেইলার ইমেইল সার্ভিস কল করা হচ্ছে
            return fetch('https://rescue-her-backend.onrender.com/api/sos/trigger', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                userId, 
                latitude,
                longitude,
                mapLink: googleMapsLink,
                area: "Dashboard Security Hub"
              })
            });
          })
          .then((emailRes) => emailRes.json())
          .then((emailData) => {
            setSosLoading(false);
            if (emailData.success) {
              alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged, History created & Emergency emails sent successfully!\n\nMaps Link: ${googleMapsLink}`);
            } else {
              alert(`⚠️ SOS Saved, but mail system returned an error: ${emailData.message || 'Check Server Logs'}`);
            }
            fetchUserReports(); // অ্যালার্ট হিস্ট্রি সাথে সাথে রিলোড হবে
          })
          .catch((err) => {
            console.error("❌ Failed to complete SOS chain:", err);
            setSosLoading(false);
            alert(`🚨 EMERGENCY SOS ACTIVATED (Offline Mode)!\nMaps Link: ${googleMapsLink}`);
          });
      },
      (error) => {
        setSosLoading(false);
        alert("⚠️ Could not fetch your location. Please check browser location permissions!");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <>
      {/* PREMIUM HERO GRID */}
      <div className="hero-grid" style={{ 
        backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.98) 100%), url(${heroBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        padding: '30px',
        borderRadius: '20px',
        marginBottom: '25px'
      }}>
        <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div className="hero-left" style={{ maxWidth: '400px' }}>
            <h1 style={{ fontSize: '34px', fontWeight: '800', color: '#0b1e33', lineHeight: '1.2', margin: 0 }}>
              Your Safety,<br />
              <span style={{ color: '#0284c7' }}>Our Priority</span>
            </h1>
            <p style={{ color: '#475569', marginTop: '12px', fontSize: '13px', fontWeight: '500', lineHeight: '1.5' }}>
              Press the SOS button in an emergency. The system will track your location and instantly dispatch alert notifications to your inner networks.
            </p>
          </div>
          <div className="sos-box" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="sos-button" 
                 onClick={sosLoading ? null : handleSosTrigger} 
                 style={{ 
                   cursor: sosLoading ? 'not-allowed' : 'pointer', 
                   transform: 'scale(0.9)', 
                   margin: '0',
                   opacity: sosLoading ? 0.7 : 1,
                   background: 'radial-gradient(circle, #f97316 0%, #ea580c 100%)',
                   boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)'
                 }}>
              <span>{sosLoading ? "..." : "SOS"}</span>
              <small>{sosLoading ? "Tracking..." : "Press for Help"}</small>
            </div>
            <div className="status-indicator" style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: '#0369a1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
              System Active
            </div>
          </div>
        </div>
        <div style={{ minHeight: '200px' }}></div>
      </div>

      {/* CLEAN & MODERN DYNAMIC QUICK CONTACTS PANEL */}
      <div className="quick-contacts-card" style={{ padding: '24px', borderRadius: '20px', background: '#f0f9ff', border: '1px solid #e0f2fe', boxShadow: '0 4px 12px rgba(3, 105, 161, 0.03)' }}>
        <div className="card-header" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontWeight: '700', color: '#0f172a', margin: 0, fontSize: '16px' }}>👥 Trusted Quick Contacts</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>Live synced from your primary contact directory</p>
          </div>
          <button 
            onClick={() => setActiveView('Contacts')}
            style={{ padding: '6px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#0284c7', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            ⚙️ Manage Contacts
          </button>
        </div>

        {loading ? (
          <p style={{ padding: '10px', fontSize: '13px', color: '#0369a1', margin: 0, fontStyle: 'italic' }}>⏳ Syncing encrypted communication networks...</p>
        ) : (!contacts || contacts.length === 0) ? (
          <div style={{ padding: '30px 10px', textAlign: 'center', background: '#ffffff', borderRadius: '14px', border: '1px dashed #cbd5e1' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
              ⚠️ No emergency networks configured yet.
            </p>
            <span 
              onClick={() => setActiveView('Contacts')} 
              style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', color: '#0284c7', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Click here to add trusted guardians
            </span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {Array.isArray(contacts) && contacts.map((person) => (
              <div className="contact-item" key={person.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e0f2fe',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div className="contact-avatar" style={{ 
                  backgroundColor: '#e0f2fe', 
                  color: '#0369a1',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  marginRight: '12px',
                  flexShrink: 0,
                  fontSize: '14px'
                }}>
                  {person.name ? person.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                    {person.name} <span style={{ fontSize: '10px', color: '#0284c7', fontWeight: '600', marginLeft: '4px', background: '#f0f9ff', padding: '1px 6px', borderRadius: '4px' }}>{person.role}</span>
                  </h5>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.2px' }}>📞 {person.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM CARDS GRID */}
      <div className="bottom-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '25px' }}>
        <LiveLocationPage />

        <div className="grid-card" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column' }}>
          <div className="card-title-bar" style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '12px', fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>
            <span>🛡️ Safety Tips & Guidelines</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1, textAlign: 'left' }}>
            <div style={{ fontSize: '12px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #0284c7' }}>
              🚶‍♀️ <strong>Isolated Routes:</strong> Avoid dark routes. Keep your phone in hand but stay aware.
            </div>
            <div style={{ fontSize: '12px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
              📱 <strong>Speed Dials:</strong> Memorize quick emergency hotkeys and speed dials (999).
            </div>
            <div style={{ fontSize: '12px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #f97316' }}>
              🚗 <strong>Ride Verification:</strong> Verify the license plates and driver profile beforehand.
            </div>
          </div>
        </div>
        
        <ReportIncident />
        
        <div className="grid-card" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column' }}>
          <div className="card-title-bar" style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '12px', fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>
            <span>⏳ Your Live Alert History</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
            {reportsLoading ? (
              <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center' }}>Syncing history nodes...</p>
            ) : (!reports || reports.length === 0) ? (
              <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic', padding: '20px 0' }}>
                ☘️ Secure Matrix Cleared. No incidents logged.
              </p>
            ) : (
              Array.isArray(reports) && reports.map((report) => {
                const isCritical = report.severity === 'CRITICAL' || report.severity === 'High';
                const bgStyle = isCritical ? '#fff5f5' : '#f0fdf4';
                const borderStyle = isCritical ? '#fee2e2' : '#d1fae5';
                const accentColor = isCritical ? '#ef4444' : '#22c55e';
                const textColor = isCritical ? '#991b1b' : '#166534';

                return (
                  <div key={report.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '10px 14px', 
                    backgroundColor: bgStyle, 
                    borderRadius: '10px', 
                    border: `1px solid ${borderStyle}`, 
                    borderLeft: `4px solid ${accentColor}`,
                    textAlign: 'left'
                  }}>
                    <div style={{ maxWidth: '75%' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: textColor, display: 'block' }}>
                        {report.location}
                      </span>
                      <span style={{ fontSize: '11px', color: '#475569', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {report.description}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>
                        {report.timestamp}
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: '9px', 
                      backgroundColor: accentColor, 
                      color: 'white', 
                      padding: '3px 8px', 
                      borderRadius: '6px', 
                      fontWeight: '700' 
                    }}>
                      {report.severity ? report.severity.toUpperCase() : 'INFO'}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default DashboardPage;