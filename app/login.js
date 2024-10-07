import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { router, useRouter } from "expo-router";


const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  

  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, login, senha);
      console.log('Usuário logado:', userCredential.user);
      router.navigate('home');
    } catch (error) {
      console.error(error.message);
      alert('Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo de volta</Text>
      <TextInput
        style={styles.input}
        placeholder="Email ou Telefone"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
