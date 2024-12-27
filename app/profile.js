import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];

  const [consumptionData, setConsumptionData] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [newConsumption, setNewConsumption] = useState('');

  // Atualiza os meses selecionados
  const toggleMonthSelection = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  // Atualizar consumo de múltiplos meses
  const updateConsumption = async () => {
    if (newConsumption && selectedMonths.length > 0) {
      const updates = selectedMonths.reduce((acc, month) => {
        acc[month] = newConsumption;
        return acc;
      }, {});

      const docRef = doc(db, 'consumptions', 'user1');
      await setDoc(docRef, updates, { merge: true });

      setConsumptionData((prevData) => ({ ...prevData, ...updates }));
      setNewConsumption('');
      setSelectedMonths([]);
    }
  };

  // Remover consumo de múltiplos meses
  const removeConsumption = async () => {
    if (selectedMonths.length > 0) {
      const updates = selectedMonths.reduce((acc, month) => {
        acc[month] = '';
        return acc;
      }, {});

      const docRef = doc(db, 'consumptions', 'user1');
      await setDoc(docRef, updates, { merge: true });

      setConsumptionData((prevData) =>
        selectedMonths.reduce((data, month) => {
          data[month] = '';
          return data;
        }, { ...prevData })
      );
      setSelectedMonths([]);
    }
  };

  const loadConsumptionData = async () => {
    const docRef = doc(db, 'consumptions', 'user1');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setConsumptionData(docSnap.data());
    }
  };

  useEffect(() => {
    loadConsumptionData();
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

      <FlatList
        data={months}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.monthItem,
              selectedMonths.includes(item) && styles.selectedMonth,
            ]}
            onPress={() => toggleMonthSelection(item)}
          >
            <Text style={styles.monthText}>{item}</Text>
            <Text style={styles.monthConsumption}>
              {consumptionData[item] ? `${consumptionData[item]} kWh` : 'Não registrado'}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.updateContainer}>
        <TextInput
          style={styles.input}
          placeholder="Novo Consumo (ex: 160,5)"
          keyboardType="numeric"
          value={newConsumption}
          onChangeText={setNewConsumption}
        />
        <TouchableOpacity style={styles.button} onPress={updateConsumption}>
          <Text style={styles.buttonText}>Atualizar Seleção</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeConsumption}>
          <Text style={styles.buttonText}>Remover Seleção</Text>
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
  },
  monthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedMonth: {
    backgroundColor: '#e0f7fa',
  },
  monthText: {
    fontSize: 16,
    color: '#555',
  },
  monthConsumption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
