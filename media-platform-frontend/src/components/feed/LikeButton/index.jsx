import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const LikeButton = ({ isLiked, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px'
      }}
    >
      <Heart
        size={24}
        fill={isLiked ? '#ed4956' : 'none'}
        color={isLiked ? '#ed4956' : '#262626'}
      />
    </motion.button>
  );
};