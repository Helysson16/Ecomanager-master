import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig'; // Importe a configuração do Firebase
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const [consumptionData, setConsumptionData] = useState({
    Jan: '',
    Fev: '',
    Mar: '',
    Abr: '',
    Mai: '',
    Jun: '',
    Jul: '',
    Ago: '',
    Set: '',
    Out: '',
    Nov: '',
    Dez: ''
  });
  
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [newConsumption, setNewConsumption] = useState('');

  // Função para atualizar o consumo no Firestore
  const updateConsumption = async () => {
    if (newConsumption) {
      const docRef = doc(db, 'consumptions', 'user1'); // 'user1' é um ID de exemplo
      await setDoc(docRef, {
        [selectedMonth]: newConsumption, // Atualiza o consumo do mês selecionado
      }, { merge: true });
      setConsumptionData(prevData => ({
        ...prevData,
        [selectedMonth]: newConsumption, // Atualiza o estado local
      }));
      setNewConsumption('');
    }
  };

  // Função para remover o consumo do Firestore
  const removeConsumption = async () => {
    const docRef = doc(db, 'consumptions', 'user1');
    await setDoc(docRef, {
      [selectedMonth]: '', // Remove o consumo do mês selecionado
    }, { merge: true });
    setConsumptionData(prevData => ({
      ...prevData,
      [selectedMonth]: '', // Atualiza o estado local
    }));
    setNewConsumption('');
  };

  // Função para carregar os dados do Firestore ao iniciar
  const loadConsumptionData = async () => {
    const docRef = doc(db, 'consumptions', 'user1'); // 'user1' é o ID de exemplo
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setConsumptionData(docSnap.data());
    }
  };

  useEffect(() => {
    loadConsumptionData(); // Carrega os dados quando o componente é montado
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Helysson Daniel</Text>
        </View>
      </View>

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

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Selecione o Mês</Text>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={itemValue => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          {months.map(month => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
      </View>

      <View style={styles.consumptionContainer}>
        <Text style={styles.consumptionLabel}>Consumo de {selectedMonth}</Text>
        <Text style={styles.consumptionValue}>
          {consumptionData[selectedMonth] ? `${consumptionData[selectedMonth]} kwh` : 'Não registrado'}
        </Text>
      </View>

      <View style={styles.updateContainer}>
        <TextInput
          style={styles.input}
          placeholder="Novo Consumo (ex: 160,5)"
          keyboardType="numeric"
          value={newConsumption}
          onChangeText={setNewConsumption}
        />
        <TouchableOpacity style={styles.button} onPress={updateConsumption}>
          <Text style={styles.buttonText}>Atualizar Consumo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeConsumption}>
          <Text style={styles.buttonText}>Remover Consumo</Text>
        </TouchableOpacity>
      </View>
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
  pickerContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    color: '#555',
  },
  picker: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
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
  updateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },});
