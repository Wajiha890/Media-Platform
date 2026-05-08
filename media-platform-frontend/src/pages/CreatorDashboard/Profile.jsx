import React from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../contexts/AuthContext';

const CreatorProfile = () => {
  const { user } = useAuth();
  
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Creator Profile Page</h2>
        <p>Welcome {user?.username}!</p>
      </div>
    </div>
  );
};

export default CreatorProfile;