import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function ChatScreen() {
  const [mensagens, setMensagens] = useState([
    { id: '1', autor: 'Rilary', texto: 'Olá! Como posso ajudar?' },
  ]);
  const [novaMensagem, setNovaMensagem] = useState('');

  const enviarMensagem = () => {
    if (novaMensagem.trim() === '') return;

    // Adiciona a nova mensagem à lista
    const mensagem = {
      id: (mensagens.length + 1).toString(),
      autor: 'Você',
      texto: novaMensagem,
    };

    setMensagens((prevMensagens) => [...prevMensagens, mensagem]);
    setNovaMensagem(''); // Limpa o campo de entrada
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat com os Administradores</Text>

      {/* Lista de mensagens */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageAutor}>{item.autor}:</Text>
            <Text style={styles.messageText}>{item.texto}</Text>
          </View>
        )}
        style={styles.chatBox}
      />

      {/* Campo de entrada e botão de envio */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        value={novaMensagem}
        onChangeText={setNovaMensagem}
      />
      <Button title="Enviar" onPress={enviarMensagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  messageAutor: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageText: {
    fontSize: 14,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
