// src/pages/FeaturesPage.jsx
import React from 'react';

function FeaturesPage({ onBackToHome }) {
  // আনস্প্ল্যাশ থেকে হাই-কোয়ালিটি সেফটি ও টেকনোলজি রিলেটেড ইমেজ ইউআরএল
  const images = {
    sos: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80", // Security/Emergency Tech
    tracking: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80", // Cyber/Map Data Grid
    logging: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"   // Encryption/Digital Log
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#fcfcfb', minHeight: '100vh', color: '#093325' }}>
      
      {/* 🧭 MINI HEADER / NAVIGATION */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 6%', background: '#ffffff', borderBottom: '1px solid rgba(9, 51, 37, 0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={onBackToHome} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: '#093325', letterSpacing: '-0.5px', cursor: 'pointer' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
        </div>
        <button 
          onClick={onBackToHome}
          style={{ padding: '10px 24px', background: 'transparent', color: '#093325', border: '1px solid #093325', borderRadius: '50px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Back to Home
        </button>
      </nav>

      {/* 🎯 HERO TITLE */}
      <section style={{ padding: '60px 6% 40px 6%', textAlign: 'center' }}>
        <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SYSTEM ARCHITECTURE</span>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#093325', letterSpacing: '-1.5px', margin: '0 auto 20px auto', maxWidth: '600px', lineHeight: '1.2' }}>
          Advanced Security Features Engineered For You
        </h1>
        <p style={{ fontSize: '16px', color: '#5c726a', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore the core defensive modules operating seamlessly inside the RescueHer secure matrix framework.
        </p>
      </section>

      {/* 📦 DETAILED FEATURES SECTION */}
      <section style={{ padding: '40px 6% 100px 6%', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* FEATURE 1: INSTANT SOS */}
        <div style={featureRowStyle}>
          <div style={featureContentStyle}>
            <div style={badgeStyle}>MODULE 01</div>
            <h2 style={featureTitleStyle}>Instant SOS Broadcast Node</h2>
            <p style={featureDescStyle}>
              Trigger an immediate, high-priority alarm with a single interaction. The system automatically bypasses browser background delays to process telemetry packets, instantly fetching high-accuracy GPS grids.
            </p>
            <ul style={featureListStyle}>
              <li>⚡ One-tap critical hardware routing layer</li>
              <li>✉️ Simultaneous multi-peer emergency email pipeline</li>
              <li>🔒 Securely managed token authentication state</li>
            </ul>
          </div>
          <div style={featureImageWrapper}>
            <img src={images.sos} alt="Instant SOS Node" style={imageStyle} />
          </div>
        </div>

        {/* FEATURE 2: LIVE TRACK GRID (REVERSED LAYOUT) */}
        <div style={{ ...featureRowStyle, flexDirection: 'row-reverse' }}>
          <div style={featureContentStyle}>
            <div style={{ ...badgeStyle, background: '#e0f2fe', color: '#0284c7' }}>MODULE 02</div>
            <h2 style={featureTitleStyle}>Live Telemetry Tracking Grid</h2>
            <p style={featureDescStyle}>
              Keep your trusted guardians updated with active location parameters. Leveraging integrated digital cartography layers, the application streams accurate coordinates without heavy network resource draining.
            </p>
            <ul style={featureListStyle}>
              <li>📍 Precision coordinates gathering loop</li>
              <li>🗺️ Clean, accessible OpenStreetMap or Map link outputs</li>
              <li>🔋 Optimized client-to-server data synchronization</li>
            </ul>
          </div>
          <div style={featureImageWrapper}>
            <img src={images.tracking} alt="Live Track Grid" style={imageStyle} />
          </div>
        </div>

        {/* FEATURE 3: HAZARD LOGGING */}
        <div style={featureRowStyle}>
          <div style={featureContentStyle}>
            <div style={{ ...badgeStyle, background: '#f4f6f4', color: '#093325' }}>MODULE 03</div>
            <h2 style={featureTitleStyle}>Incident History & Hazard Logs</h2>
            <p style={featureDescStyle}>
              Every active defense trigger writes a secure, permanent historical log into the decentralized relational system layer. This provides real-time event logging, helpful for threat mapping and legal audit compilation.
            </p>
            <ul style={featureListStyle}>
              <li>📝 Automatic database incident logging pipelines</li>
              <li>📊 Structured severity mapping (Critical, Alert, Normal)</li>
              <li>🛡️ Encrypted user identifiers ensuring high data privacy</li>
            </ul>
          </div>
          <div style={featureImageWrapper}>
            <img src={images.logging} alt="Intel Hazard Logging" style={imageStyle} />
          </div>
        </div>

      </section>

      {/* 🏢 CORPORATE FOOTER */}
      <footer style={{ padding: '80px 6% 40px 6%', background: '#ffffff', borderTop: '1px solid #e8ece9' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '40px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '26px', color: '#093325', letterSpacing: '-0.5px', marginBottom: '16px' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
            </div>
            <p style={{ color: '#5c726a', fontSize: '14px', maxWidth: '280px', lineHeight: '1.6' }}>Next-gen civilian defense orchestration layer provisioning advanced smart protection loops.</p>
          </div>
          <div>
            <h4 style={footerHeadingStyle}>Platform</h4>
            <p style={footerLinkStyle}>Security Grid</p>
            <p style={footerLinkStyle}>Node Sync</p>
            <p style={footerLinkStyle}>Encryption</p>
          </div>
          <div>
            <h4 style={footerHeadingStyle}>Resources</h4>
            <p style={footerLinkStyle}>Crisis Hotline</p>
            <p style={footerLinkStyle}>Community Hub</p>
            <p style={footerLinkStyle}>Privacy Protocols</p>
          </div>
          <div>
            <h4 style={footerHeadingStyle}>Organization</h4>
            <p style={footerLinkStyle}>About System</p>
            <p style={footerLinkStyle}>Sovereignty</p>
            <p style={footerLinkStyle}>Contact Portal</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: '1px solid #e8ece9', fontSize: '13px', color: '#5c726a' }}>
          <p>© 2026 RescueHer Secure Matrix Network. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '28px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Disclosures</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// 🎨 INLINE STYLES FOR FEATURES PAGE
const featureRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  alignItems: 'center'
};

const featureContentStyle = {
  textAlign: 'left'
};

const badgeStyle = {
  padding: '6px 14px',
  background: '#fee2e2',
  color: '#ef4444',
  borderRadius: '50px',
  fontSize: '11px',
  fontWeight: '700',
  display: 'inline-block',
  marginBottom: '20px',
  letterSpacing: '0.5px'
};

const featureTitleStyle = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#093325',
  margin: '0 0 18px 0',
  letterSpacing: '-0.8px'
};

const featureDescStyle = {
  fontSize: '15px',
  color: '#5c726a',
  lineHeight: '1.65',
  margin: '0 0 24px 0'
};

const featureListStyle = {
  paddingLeft: '20px',
  margin: 0,
  fontSize: '14.5px',
  color: '#093325',
  lineHeight: '2',
  fontWeight: '600',
  listStyleType: 'square'
};

const featureImageWrapper = {
  width: '100%',
  height: '340px',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 12px 30px rgba(9, 51, 37, 0.06)'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const footerHeadingStyle = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#093325',
  margin: '0 0 20px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const footerLinkStyle = {
  fontSize: '14px',
  color: '#5c726a',
  margin: '0 0 12px 0',
  cursor: 'pointer'
};

export default FeaturesPage;