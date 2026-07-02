// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage'; 
import DashboardPage from './pages/DashboardPage';
import SOSPage from './pages/SOSPage';
import ContactsPage from './pages/ContactsPage';
import LiveLocationPage from './pages/LiveLocationPage';
import SafetyTipsPage from './pages/SafetyTipsPage';
import ReportIncidentPage from './pages/ReportIncidentPage';
import AlertHistoryPage from './pages/AlertHistoryPage';
import AboutPage from './pages/AboutPage'; 
import SettingsPage from './pages/SettingsPage';
import ProfileView from './pages/ProfileView'; // 📸 প্রোফাইল ভিউ ইমপোর্ট করা হলো

function App() {
  // 🔐 শুরুতে চেক করবে ব্রাউজারে 'token' বা ইউজার ডেটা আছে কি না
  const [activePage, setActivePage] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? 'Dashboard' : 'Landing';
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'User';
  });
  
  // 👤 ইউজারের ছবি লোকাল স্টোরেজ বা স্টেট থেকে রিয়েল-টাইমে ট্র্যাক করার জন্য ব্যাকআপসহ ইনিশিয়াল স্টেট
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('profilePic') || '';
  }); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🧠 ইউজার লগইন অবস্থায় আছে কি না তা 'token' দিয়ে ট্র্যাক করা হচ্ছে
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  // 🛠️ ব্রাউজারের লোকাল স্টোরেজ এবং এপিআই থেকে ইউজারের প্রোফাইল পিকচার আপডেট করা
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-backend.onrender.com';
    
    // পেজ চেঞ্জ হলে লোকাল স্টোরেজে নতুন কোনো ইমেজ সেভ হয়েছে কি না তা ইনস্ট্যান্ট চেক করবে
    const localPic = localStorage.getItem('profilePic');
    if (localPic) {
      setUserAvatar(localPic);
    }

    if (savedToken) {
      setIsLoggedIn(true);
      if (savedName) setUserName(savedName);

      // ব্যাকঅ্যান্ড থেকে কারেন্ট ইউজারের ছবি নিয়ে আসা (ন্যাভবারে দেখানোর জন্য)
      if (userId) {
        fetch(`${backendUrl}/api/profile/${userId}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.profile_pic) {
              const fullImgUrl = `${backendUrl}${data.profile_pic}`;
              setUserAvatar(fullImgUrl);
              localStorage.setItem('profilePic', fullImgUrl); // লোকাল স্টোরেজেও সিঙ্ক করে রাখা হলো
            }
          })
          .catch(err => console.error("Error syncing profile pic to navbar:", err));
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [activePage]); // পেজ চেঞ্জ বা রিফ্রেশ হওয়ার সাথে সাথে সিঙ্ক হবে

  // 🔄 প্রোফাইল পেজে ছবি সেভ করার সাথে সাথে ওপরের বাবল আপডেট করার জন্য ইভেন্ট লিসেনার
  useEffect(() => {
    const handleProfileUpdate = () => {
      const updatedPic = localStorage.getItem('profilePic');
      if (updatedPic) {
        setUserAvatar(updatedPic);
      }
    };

    window.addEventListener('profileLocalStorageUpdate', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate); // অন্য ট্যাব বা উইন্ডোর সুরক্ষার জন্য

    return () => {
      window.removeEventListener('profileLocalStorageUpdate', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const handleExplore = (loggedInName) => {
    if (loggedInName) {
      setUserName(loggedInName);
      localStorage.setItem('userName', loggedInName);
    }
    setIsLoggedIn(true);
    setActivePage('Dashboard');
  };

  // 🔀 পেজ রেন্ডর লজিক
  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage userName={userName} setActiveView={setActivePage} />;
      case 'SOS Alert':
        return <SOSPage />;
      case 'Contacts':
        return <ContactsPage />;
      case 'Live Location':
        return <LiveLocationPage />;
      case 'Safety Tips':
        return <SafetyTipsPage />;
      case 'Report Incident':
        return <ReportIncidentPage />;
      case 'Alert History':
        return <AlertHistoryPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'About Us':
        return <AboutPage />; 
      case 'Profile': 
        return <ProfileView onLogout={handleActualLogout} setActiveView={setActivePage} />;
      default:
        return (
          <div style={{ padding: '20px', color: '#64748b' }}>
            <h3>🚧 {activePage} Page is under development.</h3>
          </div>
        );
    }
  };

  // 🧹 সম্পূর্ণ লগআউট প্রসেস সেন্ট্রালাইজড করা হলো
  const handleActualLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('profilePic'); // লগআউট করলে ইমেজ মেমোরি ক্লিন করবে
    setIsLoggedIn(false);
    setUserAvatar('');
    setActivePage('Landing');
  };

  // ল্যান্ডিং পেজ রেন্ডর
  if (activePage === 'Landing') {
    return (
      <LandingPage 
        onExplore={handleExplore} 
        isLoggedIn={isLoggedIn} 
        setActiveView={setActivePage} 
      />
    );
  }

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>

          <div className="logo-section">
            <h2 style={{ cursor: 'pointer' }} onClick={() => { setActivePage('Dashboard'); setIsSidebarOpen(false); }}>🛡️ RescueHer</h2>
            <p>Women Safety Alert System</p>
          </div>
          
          <nav className="nav-links">
            <div className={`nav-item ${activePage === 'Dashboard' ? 'active' : ''}`} onClick={() => { setActivePage('Dashboard'); setIsSidebarOpen(false); }}>📋 Dashboard</div>
            <div className={`nav-item ${activePage === 'Profile' ? 'active' : ''}`} onClick={() => { setActivePage('Profile'); setIsSidebarOpen(false); }}>👤 My Profile</div>
            <div className={`nav-item ${activePage === 'SOS Alert' ? 'active' : ''}`} onClick={() => { setActivePage('SOS Alert'); setIsSidebarOpen(false); }}>🚨 SOS Alert</div>
            <div className={`nav-item ${activePage === 'Contacts' ? 'active' : ''}`} onClick={() => { setActivePage('Contacts'); setIsSidebarOpen(false); }}>👥 Contacts</div>
            <div className={`nav-item ${activePage === 'Live Location' ? 'active' : ''}`} onClick={() => { setActivePage('Live Location'); setIsSidebarOpen(false); }}>📍 Live Location</div>
            <div className={`nav-item ${activePage === 'Safety Tips' ? 'active' : ''}`} onClick={() => { setActivePage('Safety Tips'); setIsSidebarOpen(false); }}>🛡️ Safety Tips</div>
            <div className={`nav-item ${activePage === 'Report Incident' ? 'active' : ''}`} onClick={() => { setActivePage('Report Incident'); setIsSidebarOpen(false); }}>📝 Report Incident</div>
            <div className={`nav-item ${activePage === 'Alert History' ? 'active' : ''}`} onClick={() => { setActivePage('Alert History'); setIsSidebarOpen(false); }}>⏳ Alert History</div>
            <div className={`nav-item ${activePage === 'Settings' ? 'active' : ''}`} onClick={() => { setActivePage('Settings'); setIsSidebarOpen(false); }}>⚙️ Settings</div>
            <div className={`nav-item ${activePage === 'About Us' ? 'active' : ''}`} onClick={() => { setActivePage('About Us'); setIsSidebarOpen(false); }}>ℹ️ About Us</div>
          </nav>
        </div>

        <div className="emergency-helpline-card">
          <p>Emergency Helpline</p>
          <h3>📞 999</h3>
          <p style={{ fontSize: '10px', marginTop: '4px' }}>Police Helpline</p>
        </div>
      </aside>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* MAIN CONTENT AREA */}
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* TOP NAVBAR (STICKY & REDESIGNED WITH LOGO & HOME) */}
        <header className="top-navbar" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 9999, /* 🚨 ম্যাপের ওপর ওভারল্যাপিং প্রবলেম ফিক্স করার জন্য zIndex বাড়ানো হলো */
          background: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          padding: '12px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            
            {/* 🛡️ ব্র্যান্ড লোগো ও হোম ডাইরেকশন বাটন */}
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setActivePage('Landing')} /* 🏠 ড্যাশবোর্ডের বদলে ল্যান্ডিং পেজে যাওয়ার ডাইরেকশন সেট করা হলো */
            >
              <span style={{ fontSize: '22px' }}>🛡️</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.3px' }}>RescueHer</span>
            </div>

            {/* 🏠 প্রিমিয়াম হোম টেক্সট লিংক (ল্যান্ডিং পেজে ব্যাক করার অ্যাকশন সহ) */}
            <span 
              onClick={() => setActivePage('Landing')} /* 🏠 ক্লিক করলে সরাসরি মেইন ল্যান্ডিং পেজে নিয়ে যাবে */
              style={{ 
                fontSize: '13px', 
                fontWeight: '600', 
                color: '#64748b',
                cursor: 'pointer',
                marginLeft: '12px',
                padding: '4px 8px',
                borderRadius: '6px',
                background: 'transparent',
                transition: 'all 0.2s'
              }}
            >
              Home
            </span>
          </div>

          {/* ডান পাশে স্বাগতম মেসেজ, ডায়নামিক নাম এবং প্রোফাইল আইকন */}
          <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span 
              style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                cursor: 'pointer', 
                color: activePage === 'Profile' ? '#00bfa5' : 'inherit' 
              }} 
              onClick={() => setActivePage('Profile')}
            >
              Welcome back, <strong style={{ color: activePage === 'Profile' ? '#00bfa5' : '#1e293b' }}>{userName}</strong> 
            </span>
            
            {/* ডায়নামিক অবতার অবজেক্ট */}
            <div 
              className="avatar" 
              onClick={() => setActivePage('Profile')}
              style={{ 
                backgroundImage: userAvatar ? `url(${userAvatar})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: userAvatar ? 'transparent' : '#00bfa5', 
                width: '34px', 
                height: '34px', 
                borderRadius: '50%',
                cursor: 'pointer',
                border: activePage === 'Profile' ? '2px solid #00bfa5' : '2px solid transparent',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {!userAvatar && userName.charAt(0).toUpperCase()}
            </div>
            
            <button 
              onClick={handleActualLogout}
              style={{ padding: '6px 12px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontWeight: '500', color: '#475569', cursor: 'pointer', marginLeft: '5px', transition: 'all 0.2s' }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* DYNAMIC CONTENT AREA & PROFESSIONAL FOOTER CONTAINER */}
        <div className="dashboard-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px' }}>
          <div style={{ flex: 1 }}>
            {renderPage()}
          </div>

          {/* ⚓ PREMIUM & MODERN MULTI-COLUMN FOOTER */}
          <footer style={{
            marginTop: '50px',
            padding: '40px 30px 20px 30px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
            borderRadius: '24px', 
            boxShadow: '0 -15px 35px -5px rgba(15, 23, 42, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            
            {/* ফোটার টপ গ্রিড লেআউট */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '30px'
            }}>
              
              {/* কলাম ১: ব্র্যান্ড এবং মিশন */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🛡️ RescueHer
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  Our mission is to empower women and ensure maximum security through robust automated monitoring and swift emergency networks.
                </p>
              </div>

              {/* কলাম ২: এমার্জেন্সি কন্ট্যাক্টস */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#38bdf8', letterSpacing: '0.5px' }}>EMERGENCY HOTLINES</h4>
                <div style={{ fontSize: '13px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span>🚨 National Emergency: <strong style={{ color: '#ef4444' }}>999</strong></span>
                  <span>👩‍💼 Women Helpline: <strong style={{ color: '#00bfa5' }}>109</strong></span>
                  <span>📞 Cyber Crime Team: <strong>01711-xxxxxx</strong></span>
                </div>
              </div>

              {/* কলাম ৩: কুইক লিংকস */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#38bdf8', letterSpacing: '0.5px' }}>QUICK LINKS</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <span onClick={() => setActivePage('Dashboard')} style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }}>📋 System Dashboard</span>
                  <span onClick={() => setActivePage('Safety Tips')} style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }}>🛡️ Safety Guidelines</span>
                  <span onClick={() => setActivePage('About Us')} style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }}>ℹ️ Our Team</span>
                </div>
              </div>

              {/* কলাম ৪: সেফটি স্টেটমেন্টカード */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.04)', 
                padding: '16px', 
                borderRadius: '16px', 
                borderLeft: '4px solid #00bfa5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#f8fafc', fontStyle: 'italic' }}>
                  "You are Strong. Brave. Not Alone."
                </h5>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
                  We work around the clock with secure inner circles and dispatch teams to safeguard your commute.
                </p>
              </div>
            </div>

            {/* ফোটার বটম কপিরাইট সেকশন */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '12px',
              fontSize: '12px',
              color: '#64748b'
            }}>
              <span>&copy; {new Date().getFullYear()} RescueHer Network. All rights reserved.</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
                <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;