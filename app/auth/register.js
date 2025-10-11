import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

import api from '../../service/index';
import Logo from '../../assets/images/taskflow.png';

const { width, height } = Dimensions.get('window');

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
      });
      return;
    }

    try {
      await api.post('auth/register', { name, email, password });

      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso!',
      });

      goToLogin()
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar usuário!',
      });
    }
  };

  const goToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg
          height={160}
          width={width}
          viewBox={`0 0 ${width} 160`}
          style={styles.curve}
        >
          <Path
            d={`M0,80 Q${width / 2},160 ${width},80 L${width},0 L0,0 Z`}
            fill='#7B2FF7'
          />
        </Svg>

        <View style={styles.avatarCircle}>
          <Image source={Logo} style={styles.avatarInner} resizeMode='contain' />
        </View>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder='Nome completo'
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />
        <TextInput
          placeholder='Senha'
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.formBottom}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#7B2FF7',
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  curve: {
    position: 'absolute',
    bottom: 0,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
  },
  avatarInner: {
    width: 140,
    height: 140,
    borderRadius: 30,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7B2FF7',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#7B2FF7',
    fontWeight: 'bold',
  },
  formBottom: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
});

export default Register;
