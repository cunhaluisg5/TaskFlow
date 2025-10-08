import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Logo from '../assets/images/taskflow.png';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    console.log('LOGIN');
  }

  const register = async () => {
    console.log('CADASTRAR');
  }

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
            d={`
              M0,80 
              Q${width / 2},160 ${width},80 
              L${width},0 
              L0,0 
              Z
            `}
            fill='#7B2FF7'
          />
        </Svg>

        <View style={styles.avatarCircle}>
          <Image
            source={Logo}
            style={styles.avatarInner}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.formContainer}>
        <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={(e) => setEmail(e)}/>
        <TextInput placeholder='Senha' secureTextEntry style={styles.input} value={password} onChangeText={(e) => setPassword(e)}/>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.formBottom}>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={register}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    fontWeight: 'bold',
  },
  signupLink: {
    color: '#7B2FF7',
    fontWeight: 'bold',
  },
  register: {
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  formBottom: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  }
});

export default Login;