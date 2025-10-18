import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image
} from 'react-native';
import { Drawer } from 'expo-router/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Slot, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { AuthProvider, AuthContext } from '../context/index';

const DrawerHeader = ({ nameUser, pictureUser }) => (
  <View style={styles.drawerHeader}>
    {pictureUser ? (
      <Image
        source={{ uri: pictureUser }}
        style={styles.userAvatar}
        resizeMode='cover'
      />
    ) : (
      <Ionicons name='person-circle-outline' size={60} color='white' />
    )}
    <Text style={styles.drawerHeaderText}>{nameUser}</Text>
  </View>
);

const CustomDrawerContent = (props) => {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  const filteredState = {
    ...props.state,
    routes: props.state.routes.filter(
      (r) =>
        r.name !== 'index' &&
        r.name !== 'auth/login' &&
        r.name !== 'auth/register'
    ),
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#7B2FF7' }}>
      <DrawerHeader nameUser={user.name} pictureUser={user.picture}/>
      <DrawerContentScrollView {...props} state={filteredState}>
        <DrawerItemList {...props} state={filteredState} />
        <DrawerItem
          label='Sair'
          labelStyle={{ color: 'white', fontSize: 18 }}
          icon={({ color, size }) => (
            <Ionicons name='log-out-outline' size={size} color={color} />
          )}
          onPress={() => {
            logout();
            setTimeout(() => {
              router.replace('/auth/login');
            }, 100);
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const ProtectedDrawer = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7B2FF7',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.4)',
        drawerStyle: {
          backgroundColor: '#7B2FF7',
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 18,
          marginLeft: -10,
        },
        drawerItemStyle: {
          borderRadius: 10,
          marginVertical: 5,
          marginHorizontal: 10,
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        drawerActiveBackgroundColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <Drawer.Screen
        name='screens/incompleteTasksScreen'
        options={{
          title: 'Tarefas Pendentes',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='time-outline' size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name='screens/completeTasksScreen'
        options={{
          title: 'Tarefas Concluídas',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='checkmark-circle' size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name='screens/registerTaskScreen'
        options={{
          title: 'Cadastrar Tarefa',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='add-circle-outline' size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name='screens/updateTaskScreen'
        options={{
          title: 'Atualizar Tarefa',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name='add-circle-outline' size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name='index'
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name='auth/login'
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name='auth/register'
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer>
  );
};

const LayoutContent = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#7B2FF7' />
      </View>
    );
  }

  if (!userToken) {
    return <Slot name='auth/login' />;
  }

  return <ProtectedDrawer />;
};

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
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Toast: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7B2FF7',
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B2FF7',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default Layout;
