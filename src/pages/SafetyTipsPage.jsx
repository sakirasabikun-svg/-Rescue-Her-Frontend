// src/pages/SafetyTipsPage.jsx
import React, { useState } from 'react';

function SafetyTipsPage() {
  const tips = [
    { 
      id: 1, 
      title: 'Strategic Situational Awareness', 
      desc: 'Avoid poorly lit streets or unfamiliar shortcuts. Keep your phone handy in your pocket, but do not look down at the screen while walking—keep your chin up and eyes on your surroundings.', 
      gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', // Soft Ice Blue
      border: '#60a5fa',
      textColor: '#0369a1',
      tag: '🏃‍♀️ Commute' 
    },
    { 
      id: 2, 
      title: 'Digital Tripwire Triggers', 
      desc: 'Pre-set speed dials for localized emergency response nodes. Keep the RescueHer SOS active dashboard running in the background whenever boarding transit or entering isolated zones.', 
      gradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', // Pastel Lavender
      border: '#c084fc',
      textColor: '#6d28d9',
      tag: '📞 Device Setup' 
    },
    { 
      id: 3, 
      title: 'Ride-Sharing Verification Protocol', 
      desc: 'Always match the vehicle registration matrix and driver profile before boarding. Never get into a car if the child lock is active, and immediately stream your live link to trusted nodes.', 
      gradient: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)', // Blossom Pink
      border: '#fb7185',
      textColor: '#be123c',
      tag: '🚗 Transit' 
    },
    { 
      id: 4, 
      title: 'Empowering Biological Radar', 
      desc: 'Your subconscious notices threats before your conscious mind does. If an environment, individual, or silent intuition feels off, withdraw immediately without worrying about politeness.', 
      gradient: 'linear-gradient(135deg, #e6fcf5 0%, #c3fae8 100%)', // Mint Green
      border: '#20c997',
      textColor: '#0ca678',
      tag: '🧠 Intuition' 
    }
  ];

  const selfDefenseMoves = [
    { move: 'Palm Strike', target: 'Nose / Chin', desc: 'Use the heel of your palm striking upward to disorient the threat.' },
    { move: 'The Shin Kick', target: 'Knee / Groin', desc: 'A swift, low kick using your shin bone maximizes impact and maintains balance.' },
    { move: 'Voice Projection', target: 'Auditory Shock', desc: 'Shouting "FIRE" or "STOP" rather than screaming draws immediate public response.' }
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ 
      padding: '40px 35px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      color: '#2b2d42', 
      backgroundColor: '#fefce8', // 💛 হালকা শ্যাম্পেন ইয়েলো ব্যাকগ্রাউন্ড
      minHeight: '100vh', 
      textAlign: 'left' 
    }}>
      
      {/* 🛡️ RescueHer BRANDED HERO BANNER */}
      <div style={{ 
        background: '#ffffff', 
        padding: '30px 35px', 
        borderRadius: '20px', 
        marginBottom: '35px',
        boxShadow: '0 10px 25px -5px rgba(234, 179, 8, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #fef08a',
        textAlign: 'center'
      }}>
        {/* ব্যাকগ্রাউন্ড গ্লো রিফ্লেকশন */}
        <div style={{ position: 'absolute', width: '200px', height: '200px', background: '#ffe4e6', filter: 'blur(50px)', top: '-40px', left: '-20px', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', width: '200px', height: '200px', background: '#e6fcf5', filter: 'blur(50px)', bottom: '-40px', right: '-20px', opacity: 0.6 }}></div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: '600', fontSize: '15px' }}>
          🛡️ <span style={{ color: '#0f172a', fontWeight: '700' }}>RescueHer</span> | Women Safety Alert System
        </div>

        <span style={{ fontSize: '10px', color: '#b45309', display: 'inline-block', marginTop: '15px', fontWeight: '700', letterSpacing: '0.5px' }}>
          ✨ EMPOWERMENT MATRIX
        </span>
        <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 10px 0', color: '#0f172a', letterSpacing: '-0.5px' }}>
          Your Safety is Your Power.
        </h2>
        <p style={{ fontSize: '14px', color: '#4a4e69', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          Tactical intelligence beats reactive response every single time. Equip your daily routine with hardened situational awareness guidelines.
        </p>
      </div>

      {/* SECTION HEADER */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          🛡️ Tactical Safety Protocols
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
          Hover over the coloured matrix nodes to expand your perimeter knowledge.
        </p>
      </div>

      {/* 🚀 EYE-SOOTHING COLOURED GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginBottom: '40px' }}>
        {tips.map((tip) => {
          const isHovered = hoveredCard === tip.id;
          return (
            <div 
              key={tip.id}
              onMouseEnter={() => setHoveredCard(tip.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ 
                background: tip.gradient, 
                padding: '28px 24px', 
                borderRadius: '18px', 
                boxShadow: isHovered ? '0 15px 25px -5px rgba(0, 0, 0, 0.08)' : '0 4px 12px rgba(0, 0, 0, 0.03)', 
                border: `1px solid ${tip.border}`,
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                {tip.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#4a4e69', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                {tip.desc}
              </p>

              {/* বটম ক্যাটাগরি ব্যাজ */}
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '600', 
                backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                color: tip.textColor, 
                padding: '5px 12px', 
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.02)'
              }}>
                {tip.tag}
              </span>
            </div>
          );
        })}
      </div>

      {/* ⚡ TWO-COLUMN MATTE INTERFACES */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
        
        {/* CRISIS ESCALATION CARD */}
        <div style={{ 
          flex: '1 1 calc(50% - 25px)', 
          minWidth: '320px', 
          backgroundColor: '#ffffff', 
          border: '1px solid #fef08a', 
          borderRadius: '18px', 
          padding: '26px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)' 
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#dc2626' }}>🚨</span> Crisis Escalation Matrix
          </h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px 0' }}>If encountering active hostility or immediate pursuit trackers:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', backgroundColor: '#fff5f5', borderRadius: '12px', border: '1px solid #fed7d7' }}>
              <b style={{ color: '#ef4444', fontSize: '13px' }}>01.</b>
              <p style={{ margin: 0, fontSize: '12px', color: '#991b1b', fontWeight: '500', textAlign: 'left' }}>Double tap power key to force route live location tracking variables to your network cluster.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fef3c7' }}>
              <b style={{ color: '#d97706', fontSize: '13px' }}>02.</b>
              <p style={{ margin: 0, fontSize: '12px', color: '#92400e', fontWeight: '500', textAlign: 'left' }}>Break vector towards public operational zones (Banks, Supermarkets, Fuel Stations with CCTV grids).</p>
            </div>
          </div>
        </div>

        {/* PHYSICAL COUNTERSTRATAGEM CARD */}
        <div style={{ 
          flex: '1 1 calc(50% - 25px)', 
          minWidth: '320px', 
          backgroundColor: '#ffffff', 
          border: '1px solid #fef08a', 
          borderRadius: '18px', 
          padding: '26px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)' 
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#4f46e5' }}>🥋</span> Physical Counterstratagem (Self-Defense)
          </h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 15px 0' }}>High-efficiency kinetic disablement tactics:</p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '8px 4px', color: '#475569', fontWeight: '600' }}>Kinetic Action</th>
                <th style={{ padding: '8px 4px', color: '#475569', fontWeight: '600' }}>Primary Target</th>
                <th style={{ padding: '8px 4px', color: '#475569', fontWeight: '600' }}>Strategic Effect</th>
              </tr>
            </thead>
            <tbody>
              {selfDefenseMoves.map((move, index) => (
                <tr key={index} style={{ borderBottom: index !== selfDefenseMoves.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '12px 4px', fontWeight: '600', color: '#334155' }}>{move.move}</td>
                  <td style={{ padding: '12px 4px', color: '#dc2626', fontWeight: '600' }}>{move.target}</td>
                  <td style={{ padding: '12px 4px', color: '#64748b', textAlign: 'left' }}>{move.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default SafetyTipsPage;