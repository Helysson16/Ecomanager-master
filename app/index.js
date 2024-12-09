import React from 'react';
import { View, Text, Image, StyleSheet, Button} from 'react-native';
import { useRouter } from "expo-router"

const IntroScreen = ({ }) => {
  const router = useRouter()

  const irParaLogin = () => {
    router.navigate("/login")
  }
  const irPararegistrar = () => {
    router.navigate("/register")
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>EcoManager</Text>
      <Text style={styles.subtitle}>Economize energia</Text>

      <View style={styles.buttons}>
        <Button title="login" onPress={irParaLogin}></Button>
        <Button title="Registrar" onPress={irPararegistrar}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    backgroundColor: "#39CB3F",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default IntroScreen;
