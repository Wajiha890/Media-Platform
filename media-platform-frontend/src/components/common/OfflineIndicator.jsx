import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Optional: Show toast when back online
      console.log('Back online');
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      console.log('You are offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#ed4956',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 2000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontSize: '14px',
      fontWeight: '500',
      animation: 'slideUp 0.3s ease'
    }}>
      <WifiOff size={18} />
      <span>No internet connection. Please check your network.</span>
    </div>
  );
};

export default OfflineIndicator;