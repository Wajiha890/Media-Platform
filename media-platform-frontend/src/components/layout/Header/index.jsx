import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusSquare, Heart, User, LogOut, Compass } from 'lucide-react';

const Header = () => {
  const { user, logout, isCreator } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'white',
      borderBottom: '1px solid #dbdbdb',
      padding: '0 20px'
    }}>
      <div style={{
        maxWidth: '975px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => navigate(isCreator ? '/creator' : '/consumer')}
          style={{ cursor: 'pointer' }}
        >
          <h1 style={{
            fontFamily: 'cursive',
            fontSize: '24px',
            margin: 0,
            color: '#262626'
          }}>
            MediaPlatform
          </h1>
        </div>

        {/* Icons - No Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <button 
            onClick={() => navigate(isCreator ? '/creator' : '/consumer')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <Home size={24} />
          </button>
          
          {!isCreator && (
            <button 
              onClick={() => navigate('/consumer/explore')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              <Compass size={24} />
            </button>
          )}
          
          {isCreator && (
            <button 
              onClick={() => navigate('/creator')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              <PlusSquare size={24} />
            </button>
          )}
          
          <button 
            onClick={() => navigate(isCreator ? '/creator/activity' : '/consumer/activity')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <Heart size={24} />
          </button>
          
          <button 
            onClick={() => navigate(isCreator ? '/creator/profile' : '/consumer/profile')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <User size={24} />
          </button>
          
          <button 
            onClick={logout} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#ed4956' }}
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;