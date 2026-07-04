// src/pages/SignupView.jsx
import React, { useState } from 'react';

function SignupView({ onSignupSuccess, onSwitchToLogin, onBackToHome }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!name || !phone || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields to create your account!");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("⚠️ Password must be at least 8 characters long!");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-backend.onrender.com';
      
      const response = await fetch(`${backendUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        alert(`🎉 Account registered successfully for ${name}!`);
        
        // 💾 টোকেন ও আইডি সেভ করা হলো
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.user.id);
        
        // 🔥🔥🔥 এখানে নতুন ৩টি লাইন যোগ করা হলো যা প্রোফাইল পেজে ডেটা পাঠাবে:
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhone', phone); 
        
        onSignupSuccess(name); 
      } else {
        alert(`❌ Signup Failed: ${resData.message || "Something went wrong."}`);
      }
    } catch (err) {
      console.error("❌ Signup Error:", err);
      alert("❌ Server connection failed! Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {/* 🔮 ব্যাকগ্রাউন্ডে প্রিমিয়াম শেপ দেওয়ার জন্য দুটি ডেকোরেティブ সার্কেল */}
      <div style={bgBlobLeft}></div>
      <div style={bgBlobRight}></div>

      <div style={containerStyle}>
        {/* 🛡️ BRAND LOGO */}
        <div style={logoStyle}>🛡️ Rescue<span style={{ color: '#00bfa5' }}>Her</span></div>
        <p style={subtitleStyle}>Join RescueHer and ensure your ultimate safety</p>

        <form onSubmit={handleSignup} style={formStyle}>
          {/* ১. নাম ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Full Name</label>
            <div style={inputWrapperStyle}>
              <span style={iconStyle}>👤</span>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                autoComplete="off"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>

          {/* ২. ইমেল ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputWrapperStyle}>
              <span style={iconStyle}>✉️</span>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                autoComplete="off" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>

          {/* ৩. ফোন ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Phone Number</label>
            <div style={inputWrapperStyle}>
              <span style={iconStyle}>📞</span>
              <input 
                type="tel" 
                placeholder="Enter your phone number" 
                autoComplete="off"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>

          {/* ৪. পাসওয়ার্ড ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <span style={iconStyle}>🔒</span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a password" 
                autoComplete="new-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ ...inputStyle, paddingRight: '45px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </button>
            </div>
          </div>

          {/* ৫. কনফার্ম পাসওয়ার্ড ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={inputWrapperStyle}>
              <span style={iconStyle}>🔒</span>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm your password" 
                autoComplete="new-password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                style={{ ...inputStyle, paddingRight: '45px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeButtonStyle}
              >
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </button>
            </div>
          </div>

          {/* TERMS AND PRIVACY CHECKBOX */}
          <div style={checkboxContainerStyle}>
            <input type="checkbox" id="terms" required style={{ cursor: 'pointer' }} />
            <label htmlFor="terms" style={checkboxLabelStyle}>
              I agree to the <span style={linkStyle}>Terms of Service</span> and <span style={linkStyle}>Privacy Policy</span>
            </label>
          </div>

          {/* REGISTER BUTTON */}
          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* OR DIVIDER */}
        <div style={orDividerContainer}>
          <div style={lineStyle}></div>
          <span style={orSpanStyle}>or</span>
          <div style={lineStyle}></div>
        </div>

        {/* SOCIAL SIGNUP BUTTONS (GOOGLE, FACEBOOK, APPLE) */}
        <div style={socialContainerStyle}>
          <button style={socialButtonStyle}>
            <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" style={socialIconStyle} /> Sign up with Google
          </button>
          <button style={socialButtonStyle}>
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={socialIconStyle} /> Sign up with Facebook
          </button>
          <button style={socialButtonStyle}>
            <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple" style={socialIconStyle} /> Sign up with Apple
          </button>
        </div>

        {/* SWITCH LAYOUT */}
        <div style={switchTextStyle}>
          Already have an account? <span onClick={onSwitchToLogin} style={loginLinkStyle}>Login</span>
        </div>

        <button onClick={onBackToHome} style={backButtonStyle}>← Back to Home</button>
      </div>
    </div>
  );
}

// 🎨 VetNova Inspired Full Page Background & Wrapper Styles
const pageWrapperStyle = {
  position: 'relative',
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)',
  overflowX: 'hidden',
  padding: '40px 20px',
  boxSizing: 'border-box'
};

const bgBlobLeft = {
  position: 'absolute',
  width: '400px',
  height: '400px',
  top: '-100px',
  left: '-150px',
  borderRadius: '50%',
  background: 'rgba(0, 191, 165, 0.06)', 
  filter: 'blur(80px)',
  zIndex: 0
};

const bgBlobRight = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  bottom: '-100px',
  right: '-150px',
  borderRadius: '50%',
  background: 'rgba(0, 191, 165, 0.08)',
  filter: 'blur(100px)',
  zIndex: 0
};

const containerStyle = { 
  position: 'relative',
  background: '#ffffff', 
  padding: '40px', 
  borderRadius: '28px', 
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.01)', 
  width: '100%', 
  maxWidth: '460px', 
  border: '1px solid #f1f5f9', 
  textAlign: 'center',
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  zIndex: 1
};

const logoStyle = { fontWeight: '800', fontSize: '28px', color: '#1e293b', marginBottom: '4px', letterSpacing: '-0.5px' };
const subtitleStyle = { color: '#64748b', fontWeight: '500', fontSize: '14px', marginBottom: '25px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '16px' };
const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' };

const inputWrapperStyle = { position: 'relative', display: 'flex', alignItems: 'center' };
const iconStyle = { position: 'absolute', left: '14px', color: '#94a3b8', fontSize: '14px' };
const inputStyle = { width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#ffffff', color: '#1e293b', transition: 'border-color 0.2s' };
const eyeButtonStyle = { position: 'absolute', right: '14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' };

const checkboxContainerStyle = { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', textAlign: 'left' };
const checkboxLabelStyle = { fontSize: '12px', color: '#64748b', cursor: 'pointer' };
const linkStyle = { color: '#00bfa5', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' };

const submitButtonStyle = { padding: '14px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(0, 191, 165, 0.2)', transition: 'background-color 0.2s' };

const orDividerContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' };
const lineStyle = { flex: 1, height: '1px', backgroundColor: '#e2e8f0' };
const orSpanStyle = { padding: '0 10px', color: '#94a3b8', fontSize: '14px' };

const socialContainerStyle = { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' };
const socialButtonStyle = { width: '100%', padding: '11px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '13px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'background-color 0.2s' };
const socialIconStyle = { width: '18px', height: '18px' };

const switchTextStyle = { marginTop: '15px', fontSize: '14px', color: '#64748b', fontWeight: '500' };
const loginLinkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer' };
const backButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', fontSize: '13px', marginTop: '16px', cursor: 'pointer', textDecoration: 'none', fontWeight: '500' };

export default SignupView;