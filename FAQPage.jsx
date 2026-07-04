// src/pages/FAQPage.jsx
import React, { useState } from 'react';

function FAQPage({ onBackToHome }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the Instant SOS button work?",
      answer: "When you press the SOS button, RescueHer instantly captures your background telemetry (live GPS coordinates) and triggers an encrypted data packet bypass. This simultaneously sends emergency alerts to your pre-configured Guardian Nodes without any intermediate server processing delay."
    },
    {
      question: "Will RescueHer track my location all the time?",
      answer: "Absolutely not. We believe in total data privacy. Your location parameters are only processed locally inside your active session window when you explicitly engage a security tracking layer or trigger an SOS signal."
    },
    {
      question: "What is a Guardian Node?",
      answer: "A Guardian Node is a trusted contact (friend, family, or emergency service endpoint) that you securely configure inside your Security Hub dashboard. They receive instant real-time alerts and live-tracking map vectors whenever you trigger an incident report."
    },
    {
      question: "Does it require a continuous internet connection?",
      answer: "For real-time map synchronization and instant e-mail/API alerts, an active data stream is ideal. However, the system is designed to compress telemetry data packets tightly so they can pipe through even under weak cellular network signals."
    },
    {
      question: "Are my incident records securely encrypted?",
      answer: "Yes, fully. All logs, active endpoints, and threat intelligence streams are encrypted with industry-standard AES-256 protocols and guarded by strict JSON Web Token (JWT) layers, making it entirely private to you and authorized peers."
    }
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#fcfcfb', minHeight: '100vh', color: '#093325', padding: '60px 6%', position: 'relative', overflowX: 'hidden' }}>
      
      {/* BACKGROUND MESH GLOW */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)', pointerEvents: 'none'
      }}></div>

      {/* BACK NAVIGATION */}
      <div 
        onClick={onBackToHome}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#10b981', fontWeight: '600', fontSize: '15px', marginBottom: '40px', transition: 'transform 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
      >
        <span>←</span> Back to Home
      </div>

      {/* 🚀 HEADER WITH FLEX LAYOUT & VISUAL EMBLEM */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', marginBottom: '60px', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '650px' }}>
          <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SUPPORT PLATFORM</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#093325', letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: '1.2' }}>Frequently Asked <br />Questions Matrix</h1>
          <p style={{ fontSize: '16px', color: '#5c726a', lineHeight: '1.6' }}>
            Have questions about security node synchronization, telemetry logging, or system uptime? Explore our technical knowledge layer below.
          </p>
        </div>
        
        {/* RIGHT SIDE ABSTRACT IMAGE/ICON EMBLUM */}
        <div style={{
          background: '#eef5f2', width: '140px', height: '140px', borderRadius: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px',
          boxShadow: 'inset 0 0 20px rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.15)'
        }}>
          💡
        </div>
      </div>

      {/* 🌟 NEW: VISUAL QUICK HELP CARDS GRID */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px', marginBottom: '70px'
      }}>
        {/* CARD 1: EMERGENCY */}
        <div style={supportCardStyle}>
          <div style={{ ...iconContainerStyle, background: '#fee2e2', color: '#ef4444' }}>🚨</div>
          <h3 style={cardTitleStyle}>Emergency SOS</h3>
          <p style={cardDescStyle}>Learn about zero-latency matrix bypassing and hardware panic synchronization updates.</p>
          <span style={cardLinkStyle}>View Protocol →</span>
        </div>

        {/* CARD 2: PRIVACY */}
        <div style={supportCardStyle}>
          <div style={{ ...iconContainerStyle, background: '#d1fae5', color: '#10b981' }}>🔒</div>
          <h3 style={cardTitleStyle}>Data Sovereignty</h3>
          <p style={cardDescStyle}>Understand how local state memory structures process node coordinates privately.</p>
          <span style={cardLinkStyle}>Privacy Specs →</span>
        </div>

        {/* CARD 3: SYSTEM STATUS */}
        <div style={supportCardStyle}>
          <div style={{ ...iconContainerStyle, background: '#e0f2fe', color: '#0284c7' }}>🛰️</div>
          <h3 style={cardTitleStyle}>Telemetry Sync</h3>
          <p style={cardDescStyle}>Configuring your continuous civilian Guardian nodes network map endpoints smoothly.</p>
          <span style={cardLinkStyle}>Network Health →</span>
        </div>
      </div>

      {/* --- SECTION DIVIDER --- */}
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#093325', marginBottom: '32px', letterSpacing: '-0.5px' }}>Detailed Core Diagnostics</h2>

      {/* FAQ ACCORDION LIST */}
      <div style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              style={{
                background: '#ffffff',
                border: isOpen ? '1px solid #10b981' : '1px solid #e8ece9',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                boxShadow: isOpen ? '0 10px 25px rgba(16, 185, 129, 0.05)' : 'none'
              }}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#093325', margin: 0 }}>
                  {faq.question}
                </h3>
                <span style={{ 
                  fontSize: '20px', 
                  color: isOpen ? '#10b981' : '#5c726a',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  fontWeight: '300'
                }}>
                  ＋
                </span>
              </div>

              {/* Answer Row (Collapsible) */}
              <div style={{
                maxHeight: isOpen ? '200px' : '0',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                marginTop: isOpen ? '16px' : '0'
              }}>
                <p style={{ fontSize: '14.5px', color: '#5c726a', lineHeight: '1.6', margin: 0, paddingTop: '4px', borderTop: '1px solid #f0f4f1' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// 🎨 NEW COMPONENT STYLES
const supportCardStyle = {
  background: '#ffffff',
  border: '1px solid #e8ece9',
  borderRadius: '24px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer'
};

const iconContainerStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  marginBottom: '24px'
};

const cardTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#093325',
  margin: '0 0 10px 0'
};

const cardDescStyle = {
  fontSize: '13.5px',
  color: '#5c726a',
  lineHeight: '1.5',
  margin: '0 0 20px 0',
  flexGrow: 1
};

const cardLinkStyle = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#10b981',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

export default FAQPage;