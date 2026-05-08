import React from 'react';
import Header from '../../components/layout/Header';

const MyPosts = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>My Posts Page</h2>
        <p>Manage your videos here!</p>
      </div>
    </div>
  );
};

export default MyPosts;