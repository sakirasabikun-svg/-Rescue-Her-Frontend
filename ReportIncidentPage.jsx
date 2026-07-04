// src/pages/ReportIncidentPage.jsx
import React, { useState } from 'react';

function ReportIncidentPage() {
  const [formData, setFormData] = useState({
    location: '',
    severity: 'Harassment/Eve teasing Spot', 
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location || !formData.severity || !formData.description) {
      alert("⚠️ Please fill out all fields before submitting!");
      return;
    }

    setSubmitting(true);

    try {
      // 🌐 .env বা Vercel সেটিংস থেকে ব্যাকঅ্যান্ডের আসল ইউআরএল ডায়নামিকালি নিবে
      const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-backend.onrender.com';

      const response = await fetch(`${backendUrl}/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: formData.location,
          severity: formData.severity,
          description: formData.description
        })
      });

      const resData = await response.json();

      if (resData.success) {
        alert("📝 Success! Your anonymous incident report has been securely logged.");
        setFormData({
          location: '',
          severity: 'Harassment/Eve teasing Spot',
          description: ''
        });
      } else {
        alert(`❌ Failed: ${resData.message}`);
      }
    } catch (err) {
      console.error("❌ Network Error (Report Incident Page):", err);
      alert("❌ Server connection failed! Please check if backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px 35px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      color: '#2d3748', 
      backgroundColor: '#f0fdf4', 
      minHeight: '100vh', 
      textAlign: 'left' 
    }}>
      
      {/* 🛡️ BRANDED HERO BANNER */}
      <div style={{ 
        background: '#ffffff', 
        padding: '30px 35px', 
        borderRadius: '20px', 
        marginBottom: '35px',
        boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e0f2fe',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', width: '200px', height: '200px', background: '#e0f2fe', filter: 'blur(50px)', top: '-40px', left: '-20px', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', width: '200px', height: '200px', background: '#ffedd5', filter: 'blur(50px)', bottom: '-40px', right: '-20px', opacity: 0.6 }}></div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: '600', fontSize: '15px' }}>
          🛡️ <span style={{ color: '#0f172a', fontWeight: '700' }}>RescueHer</span> | Anonymous Incident Reporting
        </div>

        <span style={{ fontSize: '10px', color: '#0284c7', display: 'inline-block', marginTop: '15px', fontWeight: '700', letterSpacing: '0.5px' }}>
          ✨ EMPOWERMENT MATRIX
        </span>
        <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 10px 0', color: '#0f172a', letterSpacing: '-0.5px' }}>
          Your Safety is Your Power.
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          Tactical intelligence beats reactive response every single time. Equip your daily routine with hardened situational awareness guidelines.
        </p>
      </div>

      {/* 🩵 SKY BLUE BLISS MAIN CONTAINER */}
      <div style={{ 
        backgroundColor: '#bae6fd', 
        padding: '35px', 
        borderRadius: '24px', 
        border: '1px solid #7dd3fc', 
        maxWidth: '650px',
        margin: '0 auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)'
      }}>
        <form onSubmit={handleReportSubmit}>
          
          {/* 📍 1. LOCATION INPUT */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0369a1', marginBottom: '8px', letterSpacing: '0.3px' }}>
              📍 Incident Location Area
            </label>
            <input 
              type="text" 
              placeholder="E.g., Sector 10 Road-5, Uttara" 
              value={formData.location}
              onFocus={() => setFocusedField('location')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                border: focusedField === 'location' ? '2px solid #fdba74' : '1px solid #93c5fd', 
                backgroundColor: '#ffffff',
                color: '#1e293b',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: focusedField === 'location' ? '0 0 0 4px rgba(253, 186, 116, 0.25)' : 'none',
                transition: 'all 0.2s ease-in-out'
              }} 
            />
          </div>

          {/* ⚠️ 2. SEVERITY DROPDOWN */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0369a1', marginBottom: '8px', letterSpacing: '0.3px' }}>
              ⚠️ Hazard Severity Type
            </label>
            <div style={{ position: 'relative' }}>
              <select 
                value={formData.severity}
                onFocus={() => setFocusedField('severity')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  border: focusedField === 'severity' ? '2px solid #fdba74' : '1px solid #93c5fd', 
                  backgroundColor: '#ffffff', 
                  color: '#1e293b',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  boxShadow: focusedField === 'severity' ? '0 0 0 4px rgba(253, 186, 116, 0.25)' : 'none',
                  transition: 'all 0.2s ease-in-out',
                  appearance: 'none',
                  WebkitAppearance: 'none'
                }}
              >
                <option value="Harassment/Eve teasing Spot">Harassment/Eve teasing Spot</option>
                <option value="Poor/Broken Street Lighting">Poor/Broken Street Lighting</option>
                <option value="No Police Patrol Area">No Police Patrol Area</option>
                <option value="Suspicious Activity Zone">Suspicious Activity Zone</option>
              </select>
              <span style={{ position: 'absolute', right: '16px', top: '14px', color: '#0369a1', pointerEvents: 'none', fontSize: '12px' }}>▼</span>
            </div>
          </div>

          {/* 📄 3. DESCRIPTION TEXTAREA */}
          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0369a1', marginBottom: '8px', letterSpacing: '0.3px' }}>
              📄 Describe Situation
            </label>
            <textarea 
              rows="4" 
              placeholder="Provide details anonymously to aid local community validation tracking..." 
              value={formData.description}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                borderRadius: '12px', 
                border: focusedField === 'description' ? '2px solid #fdba74' : '1px solid #93c5fd', 
                backgroundColor: '#ffffff',
                color: '#1e293b',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box', 
                resize: 'vertical',
                boxShadow: focusedField === 'description' ? '0 0 0 4px rgba(253, 186, 116, 0.25)' : 'none',
                transition: 'all 0.2s ease-in-out'
              }}
            ></textarea>
          </div>

          {/* 🍑 PEACH SORBET SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={submitting}
            style={{ 
              backgroundColor: submitting ? '#fed7aa' : '#f97316', 
              color: '#ffffff', 
              border: 'none', 
              padding: '14px 20px', 
              borderRadius: '14px', 
              fontWeight: '700', 
              fontSize: '15px',
              letterSpacing: '0.3px',
              cursor: submitting ? 'not-allowed' : 'pointer', 
              width: '100%',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)',
              transition: 'all 0.2s ease-in-out',
              transform: submitting ? 'none' : 'translateY(0)'
            }}
          >
            {submitting ? "🚀 Submitting Report..." : "🚀 File Anonymous Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIncidentPage;