import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>EcoManager</Text>
      <Text style={styles.subtitle}>Economize energia</Text>
      <View style={styles.buttons}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
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
    width: 100,
    height: 100,
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
