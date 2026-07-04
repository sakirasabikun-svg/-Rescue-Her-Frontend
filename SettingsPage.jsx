// src/pages/SettingsPage.jsx
import React, { useState } from 'react';

function SettingsPage() {
  // ১. স্লাইডার এবং টাইমার স্টেট
  const [radius, setRadius] = useState(2); // ডিফল্ট ২ কিমি
  const [countdown, setCountdown] = useState(3); // ডিফল্ট ৩ সেকেন্ড

  // ২. আইওএস স্টাইল সুইচের স্টেটসমূহ
  const [emailAlert, setEmailAlert] = useState(true);
  const [liveTracking, setLiveTracking] = useState(true);
  const [fakeBattery, setFakeBattery] = useState(false);

  // ৩. ডুপ্লিকেট পিন স্টেট
  const [duressPin, setDuressPin] = useState('1234');
  const [isPinSaved, setIsPinSaved] = useState(false);

  const handleSavePin = (e) => {
    e.preventDefault();
    if (duressPin.length !== 4) {
      alert("⚠️ Duress PIN must be exactly 4 digits!");
      return;
    }
    setIsPinSaved(true);
    setTimeout(() => setIsPinSaved(false), 2000); // ২ সেকেন্ড পর সাকসেস মেসেজ হাইড হবে
  };

  // টগল সুইচের কমন স্টাইল মেথড
  const toggleSwitchStyle = (isActive) => ({
    width: '46px',
    height: '24px',
    backgroundColor: isActive ? '#22c55e' : '#cbd5e1',
    borderRadius: '100px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: 'none',
    outline: 'none'
  });

  const toggleCircleStyle = (isActive) => ({
    width: '18px',
    height: '18px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '3px',
    left: isActive ? '25px' : '3px',
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '100vh', textAlign: 'left' }}>
      
      {/* HEADER TITLE */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>⚙️ Central System Settings</h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Configure real-time safety thresholds, automated triggers, and telemetry node parameters.</p>
      </div>

      {/* GRID CONTAINER USING FLEXBOX */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
        
        {/* CARD 1: EMERGENCY RADIUS & TRIGGERS */}
        <div style={{ flex: '1 1 calc(50% - 25px)', minWidth: '320px', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Mesh Radius & Triggers
          </h3>
          
          {/* স্লাইডার উইজেট */}
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Geo-fence Safety Radius</label>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#ef4444', backgroundColor: '#fef2f2', padding: '2px 8px', borderRadius: '6px' }}>{radius} KM</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={radius} 
              onChange={(e) => setRadius(e.target.value)}
              style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '4px' }}>Defines the tracking matrix threshold for immediate local node alerts.</span>
          </div>

          {/* কাউন্টডাউন ড্রপডাউন */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>SOS Trigger Countdown</label>
            <select 
              value={countdown} 
              onChange={(e) => setCountdown(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff', cursor: 'pointer' }}
            >
              <option value="0">Instant (No Delay)</option>
              <option value="3">3 Seconds Buffer (Recommended)</option>
              <option value="5">5 Seconds Buffer</option>
              <option value="10">10 Seconds Buffer</option>
            </select>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '4px' }}>Grace period to cancel accidental SOS triggers before network broadcast.</span>
          </div>
        </div>

        {/* CARD 2: RE-ENGINEERED IOS SWITCHES */}
        <div style={{ flex: '1 1 calc(50% - 25px)', minWidth: '320px', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>🔔 Telemetry & Notification Nodes</h3>
          
          {/* সুইজার ১ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block' }}>Automated Email Broadcasts</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Routes real-time alert maps directly to saved trusted nodes via Nodemailer.</span>
            </div>
            <button style={toggleSwitchStyle(emailAlert)} onClick={() => setEmailAlert(!emailAlert)}>
              <span style={toggleCircleStyle(emailAlert)}></span>
            </button>
          </div>

          {/* সুইজার ২ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block' }}>Background Location Streaming</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Maintains server sync mapping even when the browser client is minimized.</span>
            </div>
            <button style={toggleSwitchStyle(liveTracking)} onClick={() => setLiveTracking(!liveTracking)}>
              <span style={toggleCircleStyle(liveTracking)}></span>
            </button>
          </div>

          {/* সুইজার ৩ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block' }}>🪫 Fake Low-Battery Cloaking</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Simulates fake critical levels to throw off threat actors inspecting device logs.</span>
            </div>
            <button style={toggleSwitchStyle(fakeBattery)} onClick={() => setFakeBattery(!fakeBattery)}>
              <span style={toggleCircleStyle(fakeBattery)}></span>
            </button>
          </div>
        </div>

        {/* CARD 3: HIGH-TECH DURESS PIN CONFIGURATOR */}
        <div style={{ flex: '1 1 100%', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '5px' }}>
          <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>🔒 Advanced Duress Stealth Protocol</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>If a threat actor forces you to unlock or compromise this safety dashboard, typing this alternative PIN will boot into a fake system cluster while silently transmitting silent emergency distress pings.</p>
          </div>

          <form onSubmit={handleSavePin} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', marginTop: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Configure 4-Digit Duress PIN</label>
              <input 
                type="password" 
                maxLength="4"
                placeholder="••••"
                value={duressPin}
                onChange={(e) => setDuressPin(e.target.value.replace(/\D/g, ''))} // শুধু নাম্বার ইনপুট নিবে
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', letterSpacing: '4px', boxSizing: 'border-box' }}
              />
            </div>
            <button 
              type="submit" 
              style={{ padding: '11px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
            >
              Update Duress Matrix
            </button>
          </form>

          {isPinSaved && (
            <p style={{ color: '#059669', fontSize: '12px', fontWeight: '600', marginTop: '10px', marginValues: '0' }}>
              ✅ Duress sequence updated successfully! Operational node masking active.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;