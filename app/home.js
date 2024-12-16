import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const irParaChat = () => {
    router.navigate('/chat');
  };

  const irParaProfile = () => {
    router.navigate('/profile');
  };

  const friends = [
    { id: '1', name: 'Rilary', image: require('../assets/rilary.jpeg') },
    // { id: '2', name: 'Pedro', image: require('../assets/pedro.png') },
    // { id: '3', name: 'Daniel', image: require('../assets/daniel.png') },
    { id: '4', name: 'Wytalo', image: require('../assets/wytalo.jpg') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        <Text style={styles.welcomeText}>Olá Helysson,</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta</Text>
      </View>

      <View style={styles.goalContainer}>
        <Text style={styles.goalTitle}>Meta atual</Text>
        <Text style={styles.goalValue}>160 KWH/mês</Text>
      </View>

      <FlatList
        data={friends}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <Image source={item.image} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
          </View>
        )}
        style={styles.friendsList}
      />

      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Atividades recentes</Text>
        <Text style={styles.activityDetail}>Mensagem respondida</Text>
        <Text style={styles.activityFriend}>Rilary</Text>
      </View>

      <View>
        <Button title="Relatório" onPress={irParaProfile} />
        <View style={{ marginBottom: 10 }} />
        <Button title="Chat com Administradores" onPress={irParaChat} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
  },
  goalContainer: {
    backgroundColor: '#2ecc71',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  goalTitle: {
    color: '#fff',
    fontSize: 16,
  },
  goalValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  friendsList: {
    marginBottom: 20,
  },
  friendContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 14,
  },
  activityContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityDetail: {
    fontSize: 14,
    color: '#777',
  },
  activityFriend: {
    fontSize: 14,
    color: '#000',
  },
});
