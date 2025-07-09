// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get('/api/me');
        setUser(data);
      } catch (err) {
         const msg = err.response?.data?.error || 'Failed to load user';
        setError(msg);
         // Clear any stale token
        localStorage.removeItem('token');
        // Redirect to login
        navigate('/login',  { replace: true, state: { message: msg } });
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be inside UserProvider');
  return ctx;
}
