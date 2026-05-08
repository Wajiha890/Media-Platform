import React from 'react';
import Header from '../../components/layout/Header';

const Activity = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Activity Page</h2>
        <p>See your notifications here!</p>
      </div>
    </div>
  );
};

export default Activity;