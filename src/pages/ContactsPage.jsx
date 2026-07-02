// src/pages/ContactsPage.jsx
import React, { useState, useEffect } from 'react';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔒 লোকাল স্টোরেজ থেকে সরাসরি 'userId' এবং 'token' বের করা হচ্ছে (App.jsx এর সাথে মিল রেখে)
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token') || null;
  
  // 📝 formData-তে email ফিল্ড সেটআপ
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'Family'
  });

  // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
  const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-backend.onrender.com';

  // 🔄 ১. ডাটাবেজ থেকে শুধু লগইন করা ইউজারের কন্টাক্ট ফেচ করা
  useEffect(() => {
    if (!userId || !token) {
      console.warn("⚠️ No user ID or Token found. Displaying empty contacts list.");
      setContacts([]); 
      return;
    }

    fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, /* 🚨 গেট রিকোয়েস্টেও টোকেন পাস করা হলো */
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with bad request");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else if (data && Array.isArray(data.data)) {
          setContacts(data.data);
        } else {
          setContacts([]);
        }
      })
      .catch((err) => {
        console.error("❌ Contacts load failed:", err);
        setContacts([]); 
      });
  }, [backendUrl, userId, token]);

  // 📝 ২. নতুন কন্টাক্ট সেভ করার ফাংশন
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (!userId || !token) {
      alert("🚨 Authentication Error: Please log in again to add contacts.");
      return;
    }

    // 🔒 বডির ডেটার সাথে ইউজারের আইডি মিক্স করা হলো
    const payload = { ...formData, userId: userId };

    fetch(`${backendUrl}/api/contacts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` /* 🚨 এই লাইনটি টোকেন অথেন্টিকেশন এরর ফিক্স করবে */
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save contact");
        return res.json();
      })
      .then((resData) => {
        // ব্যাকএন্ডের রেসপন্স অনুযায়ী ডাটা আপডেট করা
        if (resData.success) {
          // যদি ব্যাকএন্ড নতুন আপডেট করা লিস্ট পাঠায়
          if (Array.isArray(resData.data)) {
            setContacts(resData.data);
          } else {
            // অথবা ম্যানুয়ালি পেজ রিফ্রেশ করার জন্য কন্টাক্ট লিস্ট পুনরায় ফেচ করতে পারো
            window.location.reload(); 
          }
          alert("✅ Contact saved successfully!");
          setFormData({ name: '', phone: '', email: '', role: 'Family' });
          setShowModal(false);
        } else {
          alert(`🚨 Failed to save contact: ${resData.message || 'Unknown error'}`);
        }
      })
      .catch((err) => {
        console.error("❌ Error adding contact:", err);
        alert("🚨 Something went wrong while saving contact.");
      });
  };

  // 🗑️ ৩. ডাটাবেজ থেকে কন্টাক্ট মুছে ফেলার ফাংশন (Delete Function)
  const handleDelete = (id) => {
    if (!userId || !token) return;

    if (window.confirm("Are you sure you want to delete this contact from MySQL?")) {
      fetch(`${backendUrl}/api/contacts/${id}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, /* 🚨 ডিলিট করার সময়ও টোকেন ভেরিফিকেশন করা হলো */
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && Array.isArray(resData.data)) {
            setContacts(resData.data); 
            alert("🗑️ Contact deleted successfully!");
          } else {
            alert("🚨 Failed to delete contact from database.");
          }
        })
        .catch((err) => console.error("❌ Error deleting contact:", err));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#0f172a', margin: 0 }}>👥 Emergency Contacts Management</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
        >
          + Add New Contact
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '14px 16px', color: '#64748b', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '14px 16px', color: '#64748b', fontWeight: '600' }}>Phone Number</th>
              <th style={{ padding: '14px 16px', color: '#64748b', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '14px 16px', color: '#64748b', fontWeight: '600' }}>Relation</th>
              <th style={{ padding: '14px 16px', color: '#64748b', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(contacts) || contacts.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                  No emergency contacts found.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '500', color: '#1e293b' }}>{contact.name}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{contact.phone}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{contact.email || 'N/A'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>
                      {contact.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button 
                      onClick={() => handleDelete(contact.id)}
                      style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* মোডাল কোড */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '16px', width: '100%', maxWidth: '400px', margin: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>➕ Add Emergency Contact</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Full Name</label>
                <input type="text" placeholder="e.g. Mother" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Phone Number</label>
                <input type="text" placeholder="e.g. 017XXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="e.g. mom@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Relation Type</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', boxSizing: 'border-box' }}>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Authority / Helpline">Authority / Helpline</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 16px', border: '1px solid #cbd5e1', background: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', border: 'none', backgroundColor: '#10b981', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '600' }}>Save Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ContactsPage;