import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from '../service/index';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        try {
          const response = await api.post('auth/authenticate', {}, {
            headers: {
              Authorization: `${token}`,
            },
          });

          const userData = response.data.user || response.data;

          if (userData?.name) {
            setUser({ name: userData.name, picture: userData.picture || null });
            setUserToken(token);
          } else {
            setUser(null);
            setUserToken(null);
          }
        } catch (error) {
          setUser(null);
          setUserToken(null);
        }
      }
      setLoading(false);
    };

    loadToken();
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync('authToken', token);
    setUserToken(token);

    try {
      const response = await api.post('auth/authenticate', {}, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      const userData = response.data.user || response.data;

      if (userData?.name) {
        setUser({
          name: userData.name,
          picture: userData.picture || null,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading, setLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};