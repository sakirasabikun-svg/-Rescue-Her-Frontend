// src/pages/AboutPage.jsx
import React, { useState } from 'react';

function AboutPage() {
  // FAQ সেকশনের স্টেট টগল করার জন্য
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // ১. কোর ফিচার ডাটা অ্যারো
  const coreFeatures = [
    { icon: '🚨', title: 'Instant SOS Echo', desc: 'One-click immediate distress broadcast routing live GPS telemetry to secure servers.' },
    { icon: '📍', title: 'Geospatial Mesh', desc: 'Real-time positioning powered by Leaflet and high-accuracy browser geolocation APIs.' },
    { icon: '📝', title: 'Anonymous Telemetry', desc: 'Identity-protected hotspot logging to safely crowdsource unsafe city zones.' },
    { icon: '🔒', title: 'End-to-End Privacy', desc: 'Secured database masking protecting user parameters during non-emergency states.' }
  ];

  // ২. ন্যাশনাল হেল্পলাইন ডাটা
  const helplines = [
    { title: 'National Emergency', phone: '999', bg: '#fee2e2', color: '#dc2626' },
    { title: 'Women & Children Helpline', phone: '109', bg: '#eff6ff', color: '#2563eb' },
    { title: 'Human Rights Alert', phone: '1072', bg: '#ecfdf5', color: '#059669' }
  ];

  // ৩. FAQ ডাটা
  const faqs = [
    { q: "How does the Live Tracking Sync mechanism operate?", a: "When SOS is triggered, the architecture uses aggressive short-polling to continuously map GPS nodes to the database without requiring standard UI page refreshes." },
    { q: "Is the Incident Reporting pipeline fully confidential?", a: "Yes. The backend architecture strips away authorization headers and user tokens, storing only the telemetry metadata to construct crime hotspot matrices." },
    { q: "Can I manage emergency nodes dynamically?", a: "Absolutely. The unified control dashboard allows instant insertion, update, and real-time deletion parameters for emergency contacts." }
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ✨ HERO MISSION SECTION */}
      <div style={{ 
        textAlign: 'center', 
        padding: '50px 20px', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: '24px', 
        color: 'white',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>Empowering Safety Through Real-Time Tech</h1>
        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          A next-generation premium safety ecosystem utilizing advanced geospatial telemetry and cryptographic data masking to build a decentralized network of protection.
        </p>
      </div>

      {/* 🧩 CORE ARCHITECTURE (FLEXBOX GRID CARDS) */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#0f172a', textAlign: 'left' }}>🛡️ Application Core Pillars</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
        {coreFeatures.map((item, idx) => (
          <div 
            key={idx}
            className="about-card"
            style={{ 
              flex: '1 1 calc(25% - 20px)',
              minWidth: '250px',
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '14px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🧭 INTERACTIVE WORKFLOW TIMELINE */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#0f172a', textAlign: 'left' }}>⚡ Execution Lifecycle Pipeline</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        {[
          { step: '01', title: 'Trigger Event', desc: 'User initiates critical breach signal via dashboard/SOS hardware button maps.' },
          { step: '02', title: 'Fetch Telemetry', desc: 'Hardware geolocation sensors aggressively capture spatial coordinates.' },
          { step: '03', title: 'Database Sync', desc: 'REST architecture pushes secure records downstream to MySQL nodes.' },
          { step: '04', title: 'Alert Broadcast', desc: 'Nodemailer and emergency networks deploy immediate multi-channel notifications.' }
        ].map((time, idx) => (
          <div key={idx} style={{ flex: '1 1 calc(25% - 15px)', minWidth: '220px', textAlign: 'left', padding: '10px' }}>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#ef4444', display: 'block', marginBottom: '4px' }}>{time.step}</span>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>{time.title}</h4>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{time.desc}</p>
          </div>
        ))}
      </div>

      {/* 📞 NATIONAL HELPLINE DIRECTORY & FAQs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        
        {/* বাম পাশে: হেল্পলাইন ডিরেক্টরি */}
        <div style={{ flex: '1 1 calc(40% - 30px)', minWidth: '300px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>📞 Crisis Command Directory</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {helplines.map((help, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: help.bg, borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{help.title}</span>
                <a href={`tel:${help.phone}`} style={{ textDecoration: 'none', backgroundColor: help.color, color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  📞 Call {help.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ডান পাশে: প্রফেশনাল FAQ অ্যাকোর্ডিয়ন */}
        <div style={{ flex: '1 1 calc(60% - 30px)', minWidth: '350px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>💬 System Intelligence FAQs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(idx)}
                  style={{ width: '100%', padding: '16px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '600', fontSize: '14px', color: '#0f172a' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '16px', transition: 'transform 0.2s', transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>🔽</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 20px 16px 20px', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🛠️ TECH STACK MATRIX */}
      <div style={{ marginTop: '50px', borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '24px' }}>System Architecture Tech Stack Matrix</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '12px', paddingBottom: '20px' }}>
          {['React 18', 'Node.js', 'Express', 'MySQL Server', 'OpenStreetMap API', 'Leaflet Engine'].map((tech, idx) => (
            <span key={idx} style={{ padding: '4px 12px', backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>{tech}</span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AboutPage;