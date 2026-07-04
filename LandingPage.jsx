

// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import LoginView from './LoginView';
import SignupView from './SignupView';
import FeaturesPage from './FeaturesPage'; 
// 1. নতুন FAQPage ইমপোর্ট করা হলো
import FAQPage from './FAQPage'; 

function LandingPage({ onExplore, isLoggedIn, setActiveView }) {
  const [authView, setAuthView] = useState('none'); 
  const [showSplash, setShowSplash] = useState(true); 
  const [fadeSplash, setFadeSplash] = useState(false);
  
  // 2. সাব-ভিউ স্টেটে 'faq' ও হ্যান্ডেল করবে এখন
  const [currentSubView, setCurrentSubView] = useState('home'); 

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeSplash(true);
    }, 1800);

    const clearSplashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(clearSplashTimeout);
    };
  }, []);

  // লগইন বা সাইনআপ ভিউ হ্যান্ডেলিং
  if (authView === 'login' || authView === 'signup') {
    return (
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: '#fcfcfb',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '40px 20px'
      }}>
        {authView === 'login' ? (
          <LoginView 
            onLoginSuccess={(userName) => onExplore(userName)}
            onSwitchToSignup={() => setAuthView('signup')}
            onBackToHome={() => setAuthView('none')}
          />
        ) : (
          <SignupView 
            onLoginSuccess={(userName) => onExplore(userName)}
            onSwitchToLogin={() => setAuthView('login')}
            onBackToHome={() => setAuthView('none')}
          />
        )}
      </div>
    );
  }

  // 3. যদি ইউজার Features এ ক্লিক করে
  if (currentSubView === 'features') {
    return <FeaturesPage onBackToHome={() => setCurrentSubView('home')} />;
  }

  // 4. যদি ইউজার FAQ এ ক্লিক করে, তবে আলাদা FAQ পেজ রিটার্ন করবে
  if (currentSubView === 'faq') {
    return <FAQPage onBackToHome={() => setCurrentSubView('home')} />;
  }

  return (
    <div style={{ 
      fontFamily: "'Plus Jakarta Sans', sans-serif", 
      background: '#f3faf7', // 🟢 স্ক্রিনশটের মতো সুন্দর সফট মিন্ট-গ্রিন ব্যাকগ্রাউন্ড
      minHeight: '100vh', 
      color: '#093325', 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      {/* 🟢 বাম পাশের প্রিমিয়াম সফট সার্কেল গ্লোব (রেফারেন্স স্ক্রিনশটের মতো) */}
      <div style={{
        position: 'absolute',
        width: '450px',
        height: '450px',
        left: '-150px',
        top: '-100px',
        background: '#cbf2ec',
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.7,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* 🟢 ডান পাশের প্রিমিয়াম সফট সার্কেল গ্লোব */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        right: '-180px',
        top: '100px',
        background: '#ccf5ea',
        borderRadius: '50%',
        filter: 'blur(70px)',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* 🌟 SPLASH SCREEN ANIMATION */}
      {showSplash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#fcfcfb', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          opacity: fadeSplash ? 0 : 1,
          transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: fadeSplash ? 'none' : 'all'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            color: '#093325',
            letterSpacing: '-1.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'asconeReveal 1.2s ease-out forwards'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Rescue<span style={{ color: '#10b981', fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif' }}>Her</span>
          </h1>
          <style>{`
            @keyframes asconeReveal {
              0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
            }
          `}</style>
        </div>
      )}

      {/* 🧭 PREMIUM NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 6%', background: 'rgba(243, 250, 247, 0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(9, 51, 37, 0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: '#093325', letterSpacing: '-0.5px', cursor: 'pointer' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <span 
              onClick={() => setCurrentSubView('features')} 
              style={{ cursor: 'pointer', color: '#5c726a', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#10b981'}
              onMouseLeave={(e) => e.target.style.color = '#5c726a'}
            >
              Features
            </span>
            <a href="#network" style={{ textDecoration: 'none', color: '#5c726a', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = '#5c726a'}>Network Matrix</a>
            
            <span 
              onClick={() => setCurrentSubView('faq')} 
              style={{ cursor: 'pointer', color: '#5c726a', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#10b981'}
              onMouseLeave={(e) => e.target.style.color = '#5c726a'}
            >
              FAQ
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => {
              if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); }
            }}
            style={{
              padding: '12px 28px',
              background: '#093325',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(9, 51, 37, 0.12)'
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-1px)'; e.target.style.background = '#0e4634'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.background = '#093325'; }}
          >
            {isLoggedIn ? "Launch Security Hub" : "Sign In"}
          </button>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section style={{ padding: '80px 6% 120px 6%', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'left', animation: 'contentFadeIn 1s ease-out 2.2s both' }}>
          <div style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.08)', color: '#093325', borderRadius: '50px', border: '1px solid rgba(16, 185, 129, 0.15)', fontSize: '12px', fontWeight: '700', display: 'inline-block', marginBottom: '24px', letterSpacing: '0.5px' }}>
            🛡️ SECURE CIVILIAN GRID OPERATIONAL
          </div>
          <h1 style={{ fontSize: '68px', fontWeight: '800', color: '#093325', lineHeight: '1.1', letterSpacing: '-2.5px', margin: '0 0 32px 0' }}>
            Change the way <br />you use your <br /><span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981', borderBottom: '3px wavy #a7f3d0', paddingBottom: '4px' }}>security.</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#5c726a', maxWidth: '460px', lineHeight: '1.6', margin: '0 0 44px 0' }}>
            From your everyday travel, to emergency matrix triggers. RescueHer ecosystem syncs encrypted telemetry layers to guard you instantly.
          </p>
          
          <button 
            onClick={() => {
              if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); }
            }}
            style={{ padding: '18px 38px', background: '#093325', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 8px 24px rgba(9, 51, 37, 0.2)' }}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 28px rgba(9, 51, 37, 0.3)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(9, 51, 37, 0.2)'; }}
          >
            {isLoggedIn ? "Access Dashboard" : "Get Started Now"}
          </button>
        </div>

        {/* RIGHT INTERACTIVE GRAPHIC */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', animation: 'contentFadeIn 1.2s ease-out 2.4s both' }}>
          
          {/* 🔴 ACTIVE NODES CARD WITH OVERLAY IMAGE */}
          <div style={{ 
            position: 'relative',
            backgroundImage: "url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '28px', 
            padding: '36px', 
            minHeight: '320px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            gridRow: 'span 2',
            border: '1px solid rgba(9, 51, 37, 0.12)',
            boxShadow: '0 20px 40px rgba(9, 51, 37, 0.04)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 30px 50px rgba(9, 51, 37, 0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(9, 51, 37, 0.04)'; }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to bottom, rgba(9,51,37,0.2), rgba(9,51,37,0.85))', zIndex: 1
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '20px' }}>
                🛡️
              </div>
            </div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Active Nodes</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#eef5f2', lineHeight: '1.4', fontWeight: '500' }}>Real-time satellite matrix sync layer active.</p>
            </div>
          </div>
          
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(9, 51, 37, 0.05)', boxShadow: '0 10px 25px rgba(9, 51, 37, 0.02)' }}>
            <h2 style={{ fontSize: '52px', margin: 0, fontWeight: '800', color: '#093325', tracking: '-1px' }}>99.9%</h2>
            <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#5c726a', fontWeight: '500' }}>Signal Uptime Matrix</p>
          </div>

          <div style={{ background: '#093325', color: '#fff', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 12px 24px rgba(9, 51, 37, 0.12)' }}>
            <h3 style={{ fontSize: '26px', margin: '0 0 6px 0', fontWeight: '700' }}>24/7</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#a2b7b0', lineHeight: '1.4' }}>Direct emergency pipeline protocol built.</p>
          </div>
        </div>
      </section>

      {styleTag}

      {/* CARDS SECTION */}
      <section style={{ padding: '100px 6%', background: '#ffffff', borderTop: '1px solid #eef5f2', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '50px', marginBottom: '70px' }}>
          <div>
            <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', color: '#5c726a', letterSpacing: '1px' }}>Values</span>
            <h2 style={{ fontSize: '38px', fontWeight: '800', margin: '12px 0 0 0', lineHeight: '1.2' }}>Absolute Defense, Well-Spent Intel</h2>
          </div>
          <p style={{ color: '#5c726a', fontSize: '16px', lineHeight: '1.6', margin: 0, alignSelf: 'end' }}>
            We engineered a completely friction-free layout structure. No heavy data tracking, just pure peer-to-peer civilian protection matrices operating safely within optimized local memory parameters.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          <div style={minimalCardStyle}>
            <div style={iconBoxStyle}>🚨</div>
            <h3 style={cardTitleStyle}>Instant SOS Node</h3>
            <p style={cardDescStyle}>One-click hardware loop bypass broadcasting encrypted metadata layers directly to pre-configured security pipelines.</p>
            <div style={arrowBtnStyle}>➔</div>
          </div>

          <div style={minimalCardStyle}>
            <div style={iconBoxStyle}>📍</div>
            <h3 style={cardTitleStyle}>Live Track Grid</h3>
            <p style={cardDescStyle}>Synchronized OpenStreetMap telemetry routing engines updating verified civilian peers securely using minimal stream protocols.</p>
            <div style={arrowBtnStyle}>➔</div>
          </div>

          <div style={{ ...minimalCardStyle, borderRadius: '0px 80px 24px 24px', background: '#f4f6f4', border: '1px solid transparent' }}>
            <div style={{ ...iconBoxStyle, background: '#093325', color: '#fff' }}>📝</div>
            <h3 style={cardTitleStyle}>Intel Threat Logging</h3>
            <p style={cardDescStyle}>Anonymous distributed incident compiling architecture allowing node clusters to register localized threat grids safely.</p>
            <div style={{ ...arrowBtnStyle, background: '#093325', color: '#fff', border: 'none' }}>➔</div>
          </div>
        </div>
      </section>

      {/* 🌐 NETWORK MATRIX SECTION */}
      <section id="network" style={{ padding: '100px 6%', background: '#f4f6f4', borderTop: '1px solid #e8ece9', textAlign: 'center', scrollMarginTop: '80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>DECENTRALIZED PROTECTION</span>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#093325', letterSpacing: '-1px', margin: '0 0 16px 0' }}>The Live Response Network Matrix</h2>
          <p style={{ fontSize: '16px', color: '#5c726a', lineHeight: '1.6' }}>
            RescueHer operates via decentralized node synchronization. When an alert triggers, your telemetry pulses through a multi-layered verification grid to ensure zero latency communication.
          </p>
        </div>

        <div style={{ 
          background: '#093325', 
          borderRadius: '28px', 
          padding: '50px 40px', 
          color: '#fff', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '30px',
          boxShadow: '0 20px 40px rgba(9, 51, 37, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px', opacity: 0.6, pointerEvents: 'none'
          }}></div>

          <div style={matrixCardStyle}>
            <div style={matrixIconStyle}>🌐</div>
            <h3 style={matrixTitleStyle}>01. Guardian Node</h3>
            <p style={matrixDescStyle}>Your trusted primary contacts act as high-priority mesh networks, receiving instant P2P data packets directly from your active session.</p>
            <div style={matrixStatusStyle}>
              <span style={pulseDotStyle}></span>
              <span style={{ color: '#a2b7b0' }}>Live Synced</span>
            </div>
          </div>

          <div style={matrixCardStyle}>
            <div style={matrixIconStyle}>🛰️</div>
            <h3 style={matrixTitleStyle}>02. Telemetry Grid</h3>
            <p style={matrixDescStyle}>High-accuracy W3C Geolocation standard parameters running background loops to bypass cellular network congestion during critical spikes.</p>
            <div style={matrixStatusStyle}>
              <span style={pulseDotStyle}></span>
              <span style={{ color: '#a2b7b0' }}>99.9% Telemetry Uptime</span>
            </div>
          </div>

          <div style={matrixCardStyle}>
            <div style={matrixIconStyle}>🔒</div>
            <h3 style={matrixTitleStyle}>03. Encrypted Relays</h3>
            <p style={matrixDescStyle}>All incident details, map endpoints, and emergency broadcast vectors are securely piped via JSON Web Token (JWT) verification layers.</p>
            <div style={matrixStatusStyle}>
              <span style={{ ...pulseDotStyle, backgroundColor: '#38bdf8' }}></span>
              <span style={{ color: '#a2b7b0' }}>AES-256 Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '80px 6% 60px 6%', background: '#ffffff', position: 'relative', zIndex: 1 }}>
        <div style={{ background: '#093325', color: '#fff', borderRadius: '24px', padding: '80px 60px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div>
            <h2 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.2', letterSpacing: '-1px' }}>Change the way you <br />use your safety armor.</h2>
            <p style={{ color: '#a2b7b0', fontSize: '15px', margin: '0 0 36px 0', maxWidth: '460px', lineHeight: '1.5' }}>Join thousands of verified active nodes who trust RescueHer safety system ecosystem for fast, fully private and resilient decentralized assistance.</p>
            <button 
              onClick={() => {
                if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); }
              }}
              style={{ padding: '16px 36px', background: '#fff', color: '#093325', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            >
              Get Started Now
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '130px', opacity: 0.12, userSelect: 'none' }}>
            🛡️
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 6% 40px 6%', background: '#fcfcfb', borderTop: '1px solid #e8ece9', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '40px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '26px', color: '#093325', letterSpacing: '-0.5px', marginBottom: '16px' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
            </div>
            <p style={{ color: '#5c726a', fontSize: '14px', maxWidth: '280px', lineHeight: '1.6' }}>Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.</p>
          </div>
          <div>
            <h4 style={footerHeadingStyle}>Account</h4>
            <p style={footerLinkStyle}>Security Grid</p>
            <p style={footerLinkStyle}>Node Sync</p>
            <p style={footerLinkStyle}>Encryption</p>
          </div>
          <div>
            <h4 style={footerHeadingStyle}>Help</h4>
            <p style={footerLinkStyle}>Crisis Hotline</p>
            <p style={footerLinkStyle}>Community Hub</p>
            <p style={footerLinkStyle}>Privacy Framework</p>
          </div>
          <div>
            <h4 style={footerHeadingStyle}>Project</h4>
            <p style={footerLinkStyle}>About Architecture</p>
            <p style={footerLinkStyle}>Sovereignty</p>
            <p style={footerLinkStyle}>Contact Endpoint</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: '1px solid #e8ece9', fontSize: '13px', color: '#5c726a' }}>
          <p>© 2026 RescueHer Secure Matrix Network. Built for safety.</p>
          <div style={{ display: 'flex', gap: '28px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Matrix</span>
            <span style={{ cursor: 'pointer' }}>Disclosures</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// STYLES
const minimalCardStyle = {
  padding: '44px 40px',
  background: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #e8ece9',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  boxShadow: '0 4px 20px rgba(9, 51, 37, 0.02)'
};

const iconBoxStyle = {
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  background: '#f4f6f4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  marginBottom: '36px',
  color: '#093325'
};

const cardTitleStyle = {
  fontSize: '22px',
  fontWeight: '700',
  color: '#093325',
  margin: '0 0 14px 0',
  letterSpacing: '-0.3px'
};

const cardDescStyle = {
  fontSize: '14px',
  color: '#5c726a',
  lineHeight: '1.6',
  margin: '0 0 32px 0'
};

const arrowBtnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid #e8ece9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  cursor: 'pointer',
  color: '#093325',
  transition: 'all 0.2s ease'
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

const matrixCardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '20px',
  padding: '32px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: 2,
  backdropFilter: 'blur(10px)'
};

const matrixIconStyle = {
  fontSize: '28px',
  marginBottom: '20px'
};

const matrixTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#ffffff',
  margin: '0 0 12px 0'
};

const matrixDescStyle = {
  fontSize: '13.5px',
  color: '#a2b7b0',
  lineHeight: '1.6',
  margin: '0 0 24px 0'
};

const matrixStatusStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const pulseDotStyle = {
  width: '6px',
  height: '6px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  display: 'inline-block',
  boxShadow: '0 0 8px #10b981'
};

const styleTag = (
  <style>{`
    @keyframes contentFadeIn {
      0% { opacity: 0; transform: translateY(25px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

export default LandingPage;