import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const App = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "aliciiaamorim2612@gmail.com", "amorinha1912x");
      setUser(userCredential.user);
      console.log(userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      Alert.alert("Erro de Login", errorMessage);
    }
  };

  const handleLogoff = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert("Logout", "Você saiu com sucesso!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível realizar o logout.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./img/Captura de tela de 2024-04-15 07-29-41.png')}
          style={styles.logo}
        />
        <Text style={styles.greeting}>
          {user ? `Olá ${user.email}, Bem-vindo de volta` : 'Olá, faça login'}
        </Text>
        {user && <Text style={styles.goal}>Meta atual: 160KWH/mês</Text>}
      </View>

      {!user ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Digite seu login"
            onChangeText={setLogin}
            value={login}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={setSenha}
            value={senha}
          />

          <Button title="Enviar" onPress={handleLogin} />
        </>
      ) : (
        <Button title="Logoff" onPress={handleLogoff} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    // width: 100, // Ajusta a largura conforme necessário
    // height: 100, // Ajusta a altura conforme necessário
    // marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  goal: {
    fontSize: 16,
    color: 'green',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default App;
