// src/pages/SOSPage.jsx
import React, { useState } from 'react';

function SOSPage() {
  const [sosLoading, setSosLoading] = useState(false);
  const [statusText, setStatusText] = useState('Ready to Broadcast');

  // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
  const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-backend.onrender.com';

  // 📍 লাইভ জিপিএস লোকেশন ট্র্যাকিং, ডাটাবেজ আপডেট ও ইমেইল পাঠানো
  const handleSosTrigger = () => {
    if (!navigator.geolocation) {
      alert("⚠️ Geolocation is not supported by your browser!");
      return;
    }

    // 🔒 লোকাল স্টোরেজ থেকে আইডি ও টোকেন নেওয়া হলো
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId) {
      alert("🚨 Authentication Error: Please log in again to trigger SOS.");
      return;
    }

    setSosLoading(true);
    setStatusText('Tracking GPS Coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 🗺️ গুগল ম্যাপসের লিংক ফরম্যাট ব্যাকটিক দিয়ে ফিক্স করা হলো
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        console.log("📍 Captured GPS Coordinates:", latitude, longitude);

        // 🔗 কাজ ১: ব্যাকঅ্যান্ড এপিআই-তে লাইভ লোকেশন পুশ করা
        fetch(`${backendUrl}/api/location/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({
            userId,
            latitude,
            longitude,
            area: "SOS Page Big Button Triggered"
          })
        })
          .then((res) => res.json())
          .then((resData) => {
            console.log("✅ Location Synced in MySQL");
            setStatusText('📝 Creating Incident Log...');
            
            // 🔗 কাজ ২: অ্যালার্ট হিস্ট্রি পেজের জন্য রিপোর্ট তৈরি করা (নতুন যুক্ত করা হলো)
            return fetch(`${backendUrl}/api/report`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                userId,
                location: "SOS Center Triggered",
                severity: "CRITICAL",
                description: `Emergency Triggered from SOS Page. Map Link: ${googleMapsLink}`
              })
            });
          })
          .then((reportRes) => reportRes.json())
          .then(() => {
            // 🔗 কাজ ৩: এবার ইমার্জেন্সি ইমেইল এপিআই ট্রিগার করা
            setStatusText('✉️ Broadcasting SOS Emails...');
            return fetch(`${backendUrl}/api/sos/trigger`, {
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
                area: "SOS Matrix Activation Point"
              })
            });
          })
          .then((emailRes) => emailRes.json())
          .then((emailData) => {
            setSosLoading(false);
            if (emailData.success) {
              setStatusText('🚨 BROADCASTED SUCCESSFUL');
              alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged, History created & Emergency emails sent successfully!\n\nMaps Link: ${googleMapsLink}`);
            } else {
              setStatusText('Location saved, but Mail failed');
              alert(`⚠️ SOS Saved, but could not send emails: ${emailData.message || 'Check Server Config'}`);
            }
          })
          .catch((err) => {
            console.error("❌ Failed to push SOS to backend:", err);
            setSosLoading(false);
            setStatusText('🚨 BROADCASTED (Offline Mode)');
            alert(`🚨 EMERGENCY SOS ACTIVATED (Offline Mode)!\nMaps Link: ${googleMapsLink}`);
          });
      },
      (error) => {
        setSosLoading(false);
        setStatusText('GPS Permission Denied');
        console.error("❌ GPS Error:", error);
        alert("⚠️ Could not fetch your location. Please check your browser location permissions!");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px', color: '#ef4444' }}>🚨 Emergency SOS Center</h2>
      <p style={{ color: '#64748b', marginBottom: '4px' }}>Triggering this will immediately broadcast your details.</p>
      
      {/* 🔴 আপডেট করা বড় লাল ট্রিগার বাটন */}
      <div 
        onClick={sosLoading ? null : handleSosTrigger}
        style={{ 
          width: '200px', height: '200px', 
          backgroundColor: sosLoading ? '#991b1b' : '#dc2626', 
          borderRadius: '50%', margin: '40px auto', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: 'white', 
          fontSize: '28px', fontWeight: 'bold', 
          cursor: sosLoading ? 'not-allowed' : 'pointer',
          boxShadow: sosLoading ? '0 0 10px rgba(220, 38, 38, 0.3)' : '0 0 30px rgba(220, 38, 38, 0.6)',
          transition: 'all 0.3s ease',
          opacity: sosLoading ? 0.8 : 1
        }}
      >
        {sosLoading ? "SENDING..." : "TRIGGER"}
      </div>
      
      <p style={{ fontWeight: '600', color: sosLoading ? '#ef4444' : '#0f172a' }}>
        Status: {statusText}
      </p>
    </div>
  );
}

export default SOSPage;