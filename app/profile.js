import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, Picker } from 'react-native';

export default function ProfileScreen() {
  const months = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  
  // Estado para os dados
  const [profile, setProfile] = useState({
    name: 'Helysson Daniel',
    cep: '57072-521',
    email: 'helyssondaniel@gmail.com'
  });

  const [currentConsumption, setCurrentConsumption] = useState('152,1 kwh');
  
  const [newName, setNewName] = useState(profile.name);
  const [newCep, setNewCep] = useState(profile.cep);
  const [newEmail, setNewEmail] = useState(profile.email);
  const [newConsumption, setNewConsumption] = useState(currentConsumption);

  const [selectedMonth, setSelectedMonth] = useState('Dez');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [calculatedValue, setCalculatedValue] = useState(0);

  // Função para editar o perfil
  const updateProfile = () => {
    setProfile({
      name: newName,
      cep: newCep,
      email: newEmail,
    });
  };

  // Função para editar o consumo
  const updateConsumption = () => {
    setCurrentConsumption(newConsumption);
  };

  // Função para resetar o perfil
  const resetProfile = () => {
    setProfile({
      name: 'Helysson Daniel',
      cep: '57072-521',
      email: 'helyssondaniel@gmail.com',
    });
    setCurrentConsumption('152,1 kwh');
  };

  // Função para calcular o valor a ser pago
  const calculatePayment = () => {
    const consumption = parseFloat(newConsumption.replace(',', '.')); // converte de "152,1 kwh" para 152.1
    const rate = 0.80; // Tarifa de R$ 0,80 por kWh
    const value = consumption * rate;
    setCalculatedValue(value.toFixed(2)); // Atualiza o valor calculado
  };

  return (
    <View style={styles.container}>
      {/* Parte superior com imagem de perfil e nome */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{profile.name}</Text>
        </View>
      </View>

      {/* Editar informações do perfil */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={newCep}
            onChangeText={setNewCep}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newEmail}
            onChangeText={setNewEmail}
          />
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Atualizar Perfil</Text>
          </TouchableOpacity>
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

      {/* Seleção do Mês e Ano */}
      <View style={styles.selectionContainer}>
        <Text style={styles.label}>Selecione o Mês e Ano</Text>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {[2024, 2025, 2026].map((year, index) => (
            <Picker.Item key={index} label={`${year}`} value={`${year}`} />
          ))}
        </Picker>
      </View>

      {/* Consumo atual */}
      <View style={styles.consumptionContainer}>
        <Text style={styles.consumptionLabel}>Consumo Atual (kWh)</Text>
        <TextInput
          style={styles.input}
          value={newConsumption}
          onChangeText={setNewConsumption}
          placeholder="Consumo"
        />
        <TouchableOpacity style={styles.button} onPress={updateConsumption}>
          <Text style={styles.buttonText}>Atualizar Consumo</Text>
        </TouchableOpacity>
      </View>

      {/* Calcular valor a ser pago */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculatePayment}>
        <Text style={styles.buttonText}>Calcular Valor a Ser Pago</Text>
      </TouchableOpacity>

      {/* Exibição do valor calculado */}
      {calculatedValue > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Valor a ser pago para {selectedMonth}/{selectedYear}: R$ {calculatedValue}
          </Text>
        </View>
      )}

      {/* Botão para resetar */}
      <TouchableOpacity style={styles.resetButton} onPress={resetProfile}>
        <Text style={styles.resetButtonText}>Resetar Perfil</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  selectionContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  consumptionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  consumptionLabel: {
    fontSize: 16,
    color: '#555',
  },
  calculateButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
