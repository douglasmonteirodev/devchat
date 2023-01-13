import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ModalNewRoom({setVisible}) {
  const [roomName, setRoomName] = useState('');

  const user = auth().currentUser.toJSON();
  function handleButtonCreate() {
    if (roomName === '') {
      return;
    }

    createRoom();
  }

  function createRoom() {
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado. Bem vindo(a)!`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(docRef => {
        docRef
          .collection('MESSAGES')
          .add({
            text: `Grupo ${roomName} criado. Bem vindo(a)!`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setVisible();
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal}></View>
      </TouchableWithoutFeedback>

      <View style={styles.content}>
        <Text style={styles.title}>Criar novo grupo?</Text>
        <TextInput
          value={roomName}
          onChangeText={setRoomName}
          placeholder="Nome para sua sala"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={handleButtonCreate}>
          <Text style={styles.buttonText}>Criar sala</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={setVisible} style={styles.backButton}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34, 34, 34, 0.4)',
  },
  modal: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  title: {
    marginTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#000',
  },
  input: {
    borderRadius: 4,
    height: 45,
    backgroundColor: '#DDD',
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonCreate: {
    borderRadius: 4,
    backgroundColor: '#2E54D4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
  },
  backButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
