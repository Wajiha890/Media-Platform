import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login/index';
import Signup from './pages/Signup/index';
import CreatorDashboard from './pages/CreatorDashboard/index';
import ConsumerDashboard from './pages/ConsumerDashboard/index';
import Explore from './pages/ConsumerDashboard/Explore';
import Activity from './pages/ConsumerDashboard/Activity';
import Profile from './pages/ConsumerDashboard/Profile';
import CreatorProfile from './pages/CreatorDashboard/Profile';
import MyPosts from './pages/CreatorDashboard/MyPosts';

function AppRoutes() {
  const { isAuthenticated, role } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={`/${role}`} />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Consumer Routes */}
      <Route path="/consumer" element={isAuthenticated && role === 'consumer' ? <ConsumerDashboard /> : <Navigate to="/login" />} />
      <Route path="/consumer/explore" element={isAuthenticated && role === 'consumer' ? <Explore /> : <Navigate to="/login" />} />
      <Route path="/consumer/activity" element={isAuthenticated && role === 'consumer' ? <Activity /> : <Navigate to="/login" />} />
      <Route path="/consumer/profile" element={isAuthenticated && role === 'consumer' ? <Profile /> : <Navigate to="/login" />} />
      
      {/* Creator Routes */}
      <Route path="/creator" element={isAuthenticated && role === 'creator' ? <CreatorDashboard /> : <Navigate to="/login" />} />
      <Route path="/creator/profile" element={isAuthenticated && role === 'creator' ? <CreatorProfile /> : <Navigate to="/login" />} />
      <Route path="/creator/my-posts" element={isAuthenticated && role === 'creator' ? <MyPosts /> : <Navigate to="/login" />} />
      
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;