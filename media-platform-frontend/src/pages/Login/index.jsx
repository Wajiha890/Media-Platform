import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('Login form submitted with:', email);
    
    const result = await login(email, password);
    
    console.log('Login result:', result);
    
    if (result.success) {
      console.log('Login successful, redirecting to:', result.role);
      navigate(`/${result.role}`);
    } else {
      setError('Invalid email. Use creator@example.com or consumer@example.com');
    }
    
    setLoading(false);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafafa',
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
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=800&fit=crop"
              alt="Friends hanging out"
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
                See everyday moments from your <strong>close friends.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div style={{
          flex: 1,
          padding: '50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'white'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
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
              marginTop: '10px',
              fontSize: '14px'
            }}>
              Sign in to continue
            </p>
          </div>
          
          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#ed4956',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              border: '1px solid #ed4956'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{
              marginBottom: '12px'
            }}>
              <input
                type="text"
                placeholder="Phone number, username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  background: '#fafafa'
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
            
            <div style={{
              marginBottom: '15px',
              position: 'relative'
            }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px',
                  paddingRight: '40px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  background: '#fafafa'
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
              {password && (
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
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                background: loading ? '#b2dffc' : '#0095f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '20px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = '#1877f2';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = '#0095f6';
                }
              }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#dbdbdb' }}></div>
            <span style={{ padding: '0 18px', color: '#8e8e8e', fontSize: '13px', fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#dbdbdb' }}></div>
          </div>
          
          {/* Forgot Password Link */}
          <div style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}>
            <a 
              href="#"
              onClick={handleForgotPassword}
              style={{
                color: '#00376b',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              Forgot password?
            </a>
          </div>
          
          {/* Create Account Link - UPDATED with working navigation */}
          <div style={{
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid #dbdbdb'
          }}>
            <p style={{
              margin: 0,
              color: '#262626',
              fontSize: '14px'
            }}>
              Don't have an account?{' '}
              <a 
                href="#"
                onClick={handleSignup}
                style={{
                  color: '#0095f6',
                  textDecoration: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sign up
              </a>
            </p>
          </div>
          
          {/* Demo Credentials */}
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '12px',
            color: '#8e8e8e'
          }}>
            Demo: creator@example.com or consumer@example.com
          </p>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowForgotPassword(false)}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{marginTop: 0, color: '#262626'}}>Reset Password</h3>
            <p style={{color: '#8e8e8e'}}>Password reset link has been sent to your email address.</p>
            <button onClick={() => setShowForgotPassword(false)} style={{
              padding: '8px 16px',
              background: '#0095f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600
            }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;