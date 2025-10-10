import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Slot, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { AuthProvider, AuthContext } from '../context/index';

const ProtectedDrawer = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Drawer
      screenListeners={{
        drawerItemPress: (e) => {
          if (e.target?.includes('auth/login')) {
            e.preventDefault();
            logout();
            router.replace('/auth/login');
          }
        },
      }}
    >
      <Drawer.Screen
        name='screens/home'
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='home-outline' size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='auth/login'
        options={{
          title: 'Sair',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='log-out-outline' size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const LayoutContent = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.Container}>
        <ActivityIndicator size='large' color='#7B2FF7' />
      </View>
    );
  }
  
  if (!userToken) {
    return <Slot name='auth/login' />;
  }

  return <ProtectedDrawer />;
}

const Layout = () => {
  return (
    <AuthProvider>
      <LayoutContent />
      <Toast
        position='top'
        visibilityTime={3000}
        topOffset={60}
        text1Style={styles.Toast}
      />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Toast: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7B2FF7'
  }
});

export default Layout;