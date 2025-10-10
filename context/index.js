import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from '../service/index';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('authToken');
      if (token){
        try{
          await api.post('auth/authenticate', {}, {
            headers: {
              'Authorization': `${token}`
            }
          });
          setUserToken(token);
        }catch(error){
          setLoading(false);
        }
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync('authToken', token);
    setUserToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};