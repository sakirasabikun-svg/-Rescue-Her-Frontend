// src/pages/ProfileView.jsx
import React, { useState, useEffect } from 'react';

function ProfileView({ onLogout }) {
  // 👤 ইউজার ইনফো স্টেট (সাইনআপ/লগইন থেকে ডেটা আনা)
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('userName') || 'User Name',
    email: localStorage.getItem('userEmail') || 'kotha@gmail.com',
    phone: localStorage.getItem('userPhone') || '01841558033',
  });

  // 📝 ফর্ম স্টেট
  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  
  // 🖼️ প্রোфাইল পিকচার স্টেট (ডিফল্ট ইমেজসহ)
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem('profilePic') || 'https://img.icons8.com/illustrations/96/office-worker.png'
  );

  // 🎒 হবির লিস্ট অপশনস
  const hobbyOptions = ['Reading', 'Traveling', 'Martial Arts', 'Gaming', 'Fitness', 'Coding', 'Music', 'Volunteering'];

  // 📸 পিসি থেকে ইমেজ আপলোড হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePic(base64Image);
        localStorage.setItem('profilePic', base64Image); // লোকাল স্টোরেজে সেভ যাতে রিফ্রেশে না যায়
        
        // 🚀 ম্যাজিক লাইন: App.jsx-এর ন্যাভবার বাবলকে সাথে সাথে আপডেট করার জন্য কাস্টম ইভেন্ট ট্রিগার
        window.dispatchEvent(new Event('profileLocalStorageUpdate'));
        
        alert('✅ Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // 🎯 হবি সিলেক্ট/ডিসেলেক্ট লজিক
  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  // 💾 প্রোফাইল সেভ হ্যান্ডলার
  const handleSaveProfile = () => {
    // এখানে চাইলে ব্যাকঅ্যান্ড এপিআই কল (fetch) করতে পারো
    const profileData = { bloodGroup, dob, selectedHobbies };
    localStorage.setItem('additionalProfile', JSON.stringify(profileData));
    
    // সেভ করার সময়েও সেফটি হিসেবে ইভেন্টটি আরেকবার ফায়ার করে রাখা ভালো
    window.dispatchEvent(new Event('profileLocalStorageUpdate'));
    
    alert('🎉 Profile settings saved successfully!');
  };

  // পৃষ্ঠা লোড হলে আগের সেভ করা ডেটা ফিরিয়ে আনা
  useEffect(() => {
    const savedData = localStorage.getItem('additionalProfile');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.bloodGroup) setBloodGroup(parsed.bloodGroup);
      if (parsed.dob) setDob(parsed.dob);
      if (parsed.selectedHobbies) setSelectedHobbies(parsed.selectedHobbies);
    }
    
    // যদি লোকাল স্টোরেজে আগে থেকে কোনো প্রোফাইল পিকচার থাকে, সেটা স্টেটে নিয়ে আসা
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  return (
    <div style={dashboardWrapper}>
      {/* 🟢 বাম পাশের প্রোফাইল কার্ড */}
      <div style={leftColumn}>
        <div style={avatarContainer}>
          <div style={imageWrapper}>
            <img src={profilePic} alt="Profile" style={avatarStyle} />
            <label style={cameraBadgeStyle}>
              📷
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>
          <h2 style={userNameStyle}>{userInfo.name}</h2>
          <span style={badgeStyle}>🛡️ Verified Safety Member</span>
        </div>

        {/* BASIC CREDENTIALS */}
        <div style={sectionCard}>
          <h3 style={sectionTitleStyle}>BASIC CREDENTIALS</h3>
          <div style={infoRow}>
            <span style={infoLabel}>✉️ Email</span>
            <span style={infoValue}>{userInfo.email}</span>
          </div>
          <div style={infoRow}>
            <span style={infoLabel}>📞 Phone</span>
            <span style={infoValue}>{userInfo.phone}</span>
          </div>
        </div>

        {/* PERSONAL DETAILS FORM */}
        <div style={sectionCard}>
          <h3 style={sectionTitleStyle}>PERSONAL DETAILS</h3>
          
          {/* 🩸 ব্লাড গ্রুপ ড্রপডাউন */}
          <div style={inputGroup}>
            <label style={formLabel}><span style={{ color: '#ef4444' }}>🩸</span> Blood Group</label>
            <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} style={selectStyle}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* 📅 ডেট অফ বার্থ ক্যালেন্ডার */}
          <div style={inputGroup}>
            <label style={formLabel}>📅 Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={inputStyle} />
          </div>

          {/* 🎨 হবি সিলেকশন ব্যাজ */}
          <div style={inputGroup}>
            <label style={formLabel}>🎨 Hobbies</label>
            <div style={hobbyContainer}>
              {hobbyOptions.map((hobby) => {
                const isSelected = selectedHobbies.includes(hobby);
                return (
                  <span
                    key={hobby}
                    onClick={() => toggleHobby(hobby)}
                    style={{
                      ...hobbyBadge,
                      backgroundColor: isSelected ? '#00bfa5' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569',
                      border: isSelected ? '1px solid #00bfa5' : '1px solid #e2e8f0',
                    }}
                  >
                    {hobby}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={actionRow}>
          <button onClick={handleSaveProfile} style={saveButtonStyle}>💾 Save Profile</button>
          <button onClick={onLogout} style={logoutButtonStyle}>🔒 Logout</button>
        </div>
      </div>

      {/* 🔵 ডান পাশের কলাম (সিকিউরিটি সার্কেল এবং সেফটি ইলাস্ট্রেশন ব্যানার) */}
      <div style={rightColumn}>
        {/* TRUSTED SECURITY CIRCLE */}
        <div style={rightSectionCard}>
          <div style={circleHeader}>
            <h3 style={circleTitle}><span style={{ marginRight: '8px' }}>👥</span> Trusted Security Circle</h3>
            <span style={manageLink}>Manage</span>
          </div>
          <p style={circleSubtitle}>No trusted contacts synced to profile card.</p>
          <button style={configureButton}>Configure Circle Now</button>
        </div>

        {/* 🛡️ নতুন প্রিমিয়াম সেফটি ইলাস্ট্রেশন ব্যানার (খালি জায়গা পূরণ করার জন্য) */}
        <div style={safetyBannerCard}>
          <img 
            src="https://img.icons8.com/illustrations/external-pack-avanti-v_avanti/512/external-cyber-security-big-data-security-pack-avanti-v_avanti.png" 
            alt="Safety Network" 
            style={bannerImageStyle} 
          />
          <h4 style={bannerTitle}>Your Safety is Our Priority</h4>
          <p style={bannerText}>
            RescueHer continuous monitoring system helps keep you connected with your inner safety circle and local emergency dispatch networks 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}

// 🎨 VetNova Inspired Premium Layout Styles
const dashboardWrapper = { display: 'flex', gap: '30px', maxWidth: '1100px', margin: '40px auto', padding: '0 20px', fontFamily: "'Segoe UI', Roboto, sans-serif", alignItems: 'flex-start' };
const leftColumn = { flex: '1', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '450px' };
const rightColumn = { flex: '1.2', display: 'flex', flexDirection: 'column', gap: '20px' };

// বাম পাশের কন্টেন্ট স্টাইলস
const avatarContainer = { background: '#ffffff', padding: '30px 20px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', textAlign: 'center' };
const imageWrapper = { position: 'relative', width: '110px', height: '110px', margin: '0 auto 15px auto' };
const avatarStyle = { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #00bfa5', padding: '3px' };
const cameraBadgeStyle = { position: 'absolute', bottom: '0', right: '0', background: '#00bfa5', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,191,165,0.3)' };
const userNameStyle = { fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0', textTransform: 'capitalize' };
const badgeStyle = { display: 'inline-block', padding: '6px 14px', background: '#e6fcf5', color: '#00bfa5', borderRadius: '20px', fontSize: '12px', fontWeight: '600' };

const sectionCard = { background: '#ffffff', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' };
const sectionTitleStyle = { fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '16px', marginTop: '0' };

const infoRow = { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f8fafc' };
const infoLabel = { color: '#64748b', fontSize: '14px', fontWeight: '500' };
const infoValue = { color: '#1e293b', fontSize: '14px', fontWeight: '600' };

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' };
const formLabel = { fontSize: '13px', fontWeight: '600', color: '#475569' };
const inputStyle = { padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#1e293b', fontFamily: 'inherit' };
const selectStyle = { ...inputStyle, cursor: 'pointer' };

const hobbyContainer = { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' };
const hobbyBadge = { padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' };

const actionRow = { display: 'flex', gap: '12px' };
const saveButtonStyle = { flex: 2, padding: '12px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,191,165,0.2)' };
const logoutButtonStyle = { flex: 1, padding: '12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239,68,68,0.15)' };

// ডান পাশের কন্টেন্ট স্টাইলস
const rightSectionCard = { background: '#ffffff', padding: '28px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', textAlign: 'center' };
const circleHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' };
const circleTitle = { fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0' };
const manageLink = { fontSize: '13px', color: '#00bfa5', fontWeight: '600', cursor: 'pointer' };
const circleSubtitle = { color: '#94a3b8', fontSize: '14px', marginBottom: '20px' };
const configureButton = { padding: '10px 20px', background: '#ffffff', color: '#00bfa5', border: '1px solid #00bfa5', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' };

// 🛡️ নতুন প্রিমিয়াম সেফটি ব্যানার ডিজাইন স্টাইলস
const safetyBannerCard = { background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
const bannerImageStyle = { width: '220px', height: 'auto', marginBottom: '15px' };
const bannerTitle = { fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' };
const bannerText = { fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0', maxWidth: '380px' };

export default ProfileView;