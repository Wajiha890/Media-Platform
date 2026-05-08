import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState('consumer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        role: role,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setSuccess('Account created successfully! Please login.');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1000px',
        width: '100%',
        background: 'white',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        {/* Left Side - Image Section */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px',
          background: '#fff'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=800&fit=crop"
              alt="Welcome to our community"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <div style={{
              textAlign: 'center',
              marginTop: '24px',
              color: '#262626',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              <p style={{
                fontSize: '18px',
                fontWeight: '400',
                margin: 0,
                lineHeight: 1.4,
                color: '#4a4a4a'
              }}>
                Join our community and <strong>share your stories!</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div style={{
          flex: 1,
          padding: '40px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'white'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{ 
              margin: 0,
              fontSize: '32px',
              fontWeight: '600',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#262626'
            }}>
              MediaPlatform
            </h1>
            <p style={{
              color: '#8e8e8e',
              marginTop: '8px',
              fontSize: '14px'
            }}>
              Sign up to see photos and videos from your friends
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fef0f0',
              color: '#ed4956',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '16px',
              textAlign: 'center',
              fontSize: '13px',
              border: '1px solid #ed4956'
            }}>
              {error}
            </div>
          )}
          
          {/* Success Message */}
          {success && (
            <div style={{
              backgroundColor: '#e8f5e9',
              color: '#10b981',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '16px',
              textAlign: 'center',
              fontSize: '13px',
              border: '1px solid #10b981'
            }}>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: '#fafafa',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a8a8a8';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dbdbdb';
                  e.target.style.background = '#fafafa';
                }}
                required
                disabled={loading}
              />
            </div>
            
            {/* Username */}
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: '#fafafa',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a8a8a8';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dbdbdb';
                  e.target.style.background = '#fafafa';
                }}
                required
                disabled={loading}
              />
            </div>
            
            {/* Email */}
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: '#fafafa',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a8a8a8';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dbdbdb';
                  e.target.style.background = '#fafafa';
                }}
                required
                disabled={loading}
              />
            </div>
            
            {/* Password */}
            <div style={{ marginBottom: '10px', position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  paddingRight: '40px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: '#fafafa',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a8a8a8';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dbdbdb';
                  e.target.style.background = '#fafafa';
                }}
                required
                disabled={loading}
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8e8e8e'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            
            {/* Confirm Password */}
            <div style={{ marginBottom: '15px', position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  paddingRight: '40px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: '#fafafa',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a8a8a8';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dbdbdb';
                  e.target.style.background = '#fafafa';
                }}
                required
                disabled={loading}
              />
              {formData.confirmPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8e8e8e'
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            
            {/* Role Selection */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#262626',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                I want to sign up as:
              </label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="role"
                    value="consumer"
                    checked={role === 'consumer'}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                  />
                  <span style={{ fontSize: '14px' }}>🚀 Consumer</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="role"
                    value="creator"
                    checked={role === 'creator'}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                  />
                  <span style={{ fontSize: '14px' }}>🎬 Creator</span>
                </label>
              </div>
            </div>
            
            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                background: loading ? '#b2dffc' : '#0095f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '16px',
                transition: 'background 0.2s ease'
              }}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          
          {/* Terms */}
          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            color: '#8e8e8e',
            marginBottom: '16px'
          }}>
            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
          </div>
          
          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#dbdbdb' }}></div>
            <span style={{ padding: '0 18px', color: '#8e8e8e', fontSize: '13px', fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#dbdbdb' }}></div>
          </div>
          
          {/* Login Link */}
          <div style={{
            textAlign: 'center',
            paddingTop: '10px'
          }}>
            <p style={{
              margin: 0,
              color: '#262626',
              fontSize: '14px'
            }}>
              Already have an account?{' '}
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
                style={{
                  color: '#0095f6',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;