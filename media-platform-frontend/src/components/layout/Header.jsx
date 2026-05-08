import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout, isCreator } = useAuth();
  const navigate = useNavigate();

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
        <h1 
          onClick={() => navigate(isCreator ? '/creator' : '/consumer')}
          style={{ 
            cursor: 'pointer', 
            fontSize: '24px',
            fontFamily: 'cursive',
            margin: 0
          }}
        >
          MediaPlatform
        </h1>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#efefef',
          borderRadius: '8px',
          padding: '7px 12px',
          width: '268px'
        }}>
          <Search size={16} color="#8e8e8e" />
          <input
            type="text"
            placeholder="Search"
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              width: '100%',
              marginLeft: '6px'
            }}
          />
        </div>

        {/* Navigation Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <button 
            onClick={() => navigate(isCreator ? '/creator' : '/consumer')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Home size={24} />
          </button>
          
          <button 
            onClick={() => navigate('/consumer/explore')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Search size={24} />
          </button>
          
          {isCreator && (
            <button 
              onClick={() => navigate('/creator/upload')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <PlusSquare size={24} />
            </button>
          )}
          
          <button 
            onClick={() => navigate(isCreator ? '/creator/profile' : '/consumer/profile')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Heart size={24} />
          </button>
          
          <button 
            onClick={logout} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={24} color="#ed4956" />
          </button>
          
          {/* Avatar */}
          <div style={{ 
            width: '28px', 
            height: '28px', 
            borderRadius: '50%', 
            background: '#efefef',
            cursor: 'pointer',
            overflow: 'hidden'
          }}>
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0095f6&color=fff`} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;