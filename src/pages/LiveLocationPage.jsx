// src/pages/LiveLocationPage.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LiveLocationPage() {
  const [locationData, setLocationData] = useState({ 
    area: 'Loading Location...', 
    latitude: 23.8103, 
    longitude: 90.4125, 
    updatedAt: 'Just now' 
  });
  const [syncing, setSyncing] = useState(false);

  // 🔄 ব্যাকঅ্যান্ড থেকে কারেন্ট ডাটা টানার মেইন ফাংশন
  const fetchCurrentLocation = () => {
    fetch('https://rescue-her-backend.onrender.com/api/location')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.area) {
          // শুধু তখনই স্টেট আপডেট হবে যখন ডাটা আসলেই চেঞ্জ হবে (অপ্রয়োজনীয় রিল্যান্ডারিং এড়াতে)
          setLocationData(prev => {
            if (prev.latitude !== data.latitude || prev.longitude !== data.longitude || prev.area !== data.area) {
              return {
                area: data.area,
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                updatedAt: data.updated_at || data.updatedAt || 'Just now'
              };
            }
            return prev;
          });
        }
      })
      .catch((err) => console.error("❌ Real-time sync failed:", err));
  };

  // 📍 নতুন ফিচার: প্রতি ৩ সেকেন্ড পর পর ডাটাবেজ থেকে অটো-ফেচ করা (Short Polling)
  useEffect(() => {
    // পেজ লোড হওয়ার সাথে সাথে প্রথমবার কল হবে
    fetchCurrentLocation();

    // প্রতি ৩০০০ মিলিমেকেন্ড (৩ সেকেন্ড) পর পর ব্যাকঅ্যান্ডে রিকোয়েস্ট পাঠাবে
    const intervalId = setInterval(() => {
      fetchCurrentLocation();
    }, 3000);

    // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভালটি বন্ধ করে মেমোরি ফ্রি করবে
    return () => clearInterval(intervalId);
  }, []);

  // 🌍 এলাকার নাম বের করে ফ্রন্টএন্ড এবং ব্যাকএন্ডে পুশ করার মেইন ফাংশন
  const handleLocationUpdate = async (lat, lng) => {
    setSyncing(true);
    const fallbackAreaName = `📍 Pinned Node (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: {
          'Accept-Language': 'bn, en'
        }
      });
      
      if (!response.ok) throw new Error("API Network Response Error");
      const geoData = await response.json();
      
      const address = geoData?.address || {};
      const displayName = address.suburb || address.neighborhood || address.road || address.town || address.village || address.city_district || address.city;
      const district = address.county || address.state || "";
      
      const fullReadableArea = displayName 
        ? (district ? `${displayName}, ${district}` : displayName)
        : fallbackAreaName;

      try {
        const backendRes = await fetch('https://rescue-her-backend.onrender.com/api/location/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: lat, longitude: lng, area: fullReadableArea })
        });
        const backendData = await backendRes.json();

        if (backendData.success) {
          setLocationData({
            area: backendData.data.area,
            latitude: Number(backendData.data.latitude),
            longitude: Number(backendData.data.longitude),
            updatedAt: backendData.data.updatedAt
          });
        } else {
          setLocationData({ area: fullReadableArea, latitude: lat, longitude: lng, updatedAt: 'Just now' });
        }
      } catch (backendErr) {
        setLocationData({ area: fullReadableArea, latitude: lat, longitude: lng, updatedAt: 'Just now (Offline Mode)' });
      }

    } catch (error) {
      console.error("❌ Geocoding API Limit Hit:", error);
      setLocationData({ area: fallbackAreaName, latitude: lat, longitude: lng, updatedAt: 'Just now' });
    } finally {
      setSyncing(false);
    }
  };

  // 🎯 ম্যাপের ভেতর ইন-লাইন ক্লিক ইভেন্ট ও ম্যাপ সেন্টারিং হ্যান্ডলার
  function MapEventsComponent() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        map.panTo(e.latlng);
        handleLocationUpdate(lat, lng);
      },
    });
    
    useEffect(() => {
      map.setView([locationData.latitude, locationData.longitude], map.getZoom());
    }, [locationData.latitude, locationData.longitude, map]);

    return null;
  }

  const triggerGPSUpdate = () => {
    if (!navigator.geolocation) {
      alert("⚠️ Geolocation is not supported by your browser");
      return;
    }

    setSyncing(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleLocationUpdate(latitude, longitude);
      },
      (error) => {
        console.error(error);
        alert("🚨 Could not fetch real GPS. Please check browser permission.");
        setSyncing(false);
      }
    );
  };

  const currentPosition = [locationData.latitude, locationData.longitude];

  return (
    <div className="grid-card" style={{ 
      padding: '24px', 
      borderRadius: '16px', 
      background: '#ffffff', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div className="card-title-bar" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📍 Live Location Tracking
          </span>
          {/* রিয়েল-টাইম লাইভ পালস ইন্ডিকেটর */}
          <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>
            <span className="pulse-dot" style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
            Live Sync
          </span>
        </div>
        
        {/* 🗺️ ম্যাপ বক্স */}
        <div style={{ 
          height: '210px', 
          width: '100%', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          marginBottom: '14px', 
          border: '1px solid #e2e8f0', 
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
          zIndex: 0 
        }}>
          <MapContainer center={currentPosition} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Marker position={currentPosition}>
              <Popup>
                <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
                  <strong style={{ color: '#059669' }}>📍 Victim Current Node</strong><br />
                  <span style={{ fontSize: '12px', color: '#475569' }}>{locationData.area}</span>
                </div>
              </Popup>
            </Marker>
            
            <MapEventsComponent /> 
          </MapContainer>
        </div>

        <div style={{ padding: '0 4px' }}>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '4px', lineHeight: '1.3' }}>
            {locationData.area}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>
            <span>Lat: {locationData.latitude.toFixed(4)} • Lon: {locationData.longitude.toFixed(4)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', background: syncing ? '#ef4444' : '#3b82f6', borderRadius: '50%', display: 'inline-block' }}></span>
              Updated: {locationData.updatedAt}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={triggerGPSUpdate}
        disabled={syncing}
        style={{
          width: '100%',
          padding: '12px',
          background: syncing ? '#94a3b8' : '#059669',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: '700',
          cursor: syncing ? 'not-allowed' : 'pointer',
          boxShadow: syncing ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.2)',
          transition: 'all 0.2s ease'
        }}
      >
        {syncing ? "📡 Mapping GPS Node..." : "🔄 Ping Live GPS Node"}
      </button>
    </div>
  );
}

export default LiveLocationPage;