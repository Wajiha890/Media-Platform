import React, { useState } from 'react';

export const ImageOptimized = ({ src, alt, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isLoading && (
        <div style={{
          width: '100%',
          height: '300px',
          background: '#efefef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Loading...
        </div>
      )}
      <img
        src={src || 'https://via.placeholder.com/600x400?text=No+Image'}
        alt={alt || 'Post image'}
        className={className}
        style={{
          width: '100%',
          maxHeight: '750px',
          objectFit: 'contain',
          display: isLoading ? 'none' : 'block',
          ...style
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};