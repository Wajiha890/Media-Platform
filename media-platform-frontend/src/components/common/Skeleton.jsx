import React from 'react';

export const Skeleton = ({ type = 'post', count = 1 }) => {
  if (type === 'post') {
    return (
      <div style={{ background: 'white', borderRadius: '8px', marginBottom: '24px', border: '1px solid #dbdbdb', overflow: 'hidden' }}>
        {/* Header Skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '12px' }}>
          <div className="skeleton" style={{ width: '42px', height: '42px', borderRadius: '50%' }}></div>
          <div>
            <div className="skeleton" style={{ width: '120px', height: '14px', marginBottom: '8px' }}></div>
            <div className="skeleton" style={{ width: '80px', height: '12px' }}></div>
          </div>
        </div>
        {/* Image Skeleton */}
        <div className="skeleton" style={{ width: '100%', height: '400px' }}></div>
        {/* Actions Skeleton */}
        <div style={{ padding: '12px 16px' }}>
          <div className="skeleton" style={{ width: '80px', height: '20px', marginBottom: '12px' }}></div>
          <div className="skeleton" style={{ width: '200px', height: '14px' }}></div>
        </div>
      </div>
    );
  }
  
  return null;
};