import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

export default function ProfileScreen() {
  const months = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  const currentConsumption = '152,1 kwh';

  return (
    <View style={styles.container}>
      {/* Parte superior com imagem de perfil e nome */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Helysson Daniel</Text>
        </View>
      </View>

      {/* Informações como Nome, Cep e Email */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Nome: <Text style={styles.boldText}>Helysson Daniel</Text>
          </Text>
          <Text style={styles.infoText}>
            Cep: <Text style={styles.boldText}>57072-521</Text>
          </Text>
          <Text style={styles.infoText}>
            Email: <Text style={styles.boldText}>helyssondaniel@gmail.com</Text>
          </Text>
        </View>
      </View>

      {/* Lista de meses */}
      <FlatList
        data={months}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.monthItem}>
            <Text style={styles.monthText}>{item}</Text>
          </View>
        )}
        style={styles.monthsList}
      />

      {/* Consumo atual */}
      <View style={styles.consumptionContainer}>
        <Text style={styles.consumptionLabel}>Consumo Atual</Text>
        <Text style={styles.consumptionValue}>{currentConsumption}</Text>
      </View>

      {/* Rodapé com ícones placeholders (comentado, mas agora com visibilidade aprimorada) */}
      {/* 
      <View style={styles.footer}>
        <View style={styles.iconPlaceholder}></View>
        <View style={styles.iconPlaceholder}></View>
        <View style={styles.iconPlaceholder}></View>
      </View> 
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#32CD32',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  monthsList: {
    marginBottom: 20,
    paddingVertical: 5,
  },
  monthItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: '#4caf50',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  consumptionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  consumptionLabel: {
    fontSize: 16,
    color: '#555',
  },
  consumptionValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
});
