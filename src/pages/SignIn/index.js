import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false); // false = login | true = cadastro

  function handleLogin() {
    if (type) {
      // Cadastrar um usuário
      if (name === '' || email === '' || password === '') {
        //alert('Por favor, preencha todos os campos.');
        return;
      }
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          user.user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              navigation.goBack();
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('Email já em uso');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('Email invalido');
          }
        });
    } else {
      //Logar um usuário
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.goBack())
        .catch(() => {
          if (error.code === 'auth/invalid-email') {
            console.log('Email invalido');
          }
        });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>DevChat</Text>
      <Text style={{marginBottom: 20}}>Ajude, colobore, faça networking!</Text>
      {type && (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Qual o seu nome?"
          placeholderTextColor="#99999b"
        />
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        placeholderTextColor="#99999b"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="***********"
        placeholderTextColor="#99999b"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: type ? '#f53754' : '#57dd86',
          },
        ]}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>{type ? 'Cadastrar' : 'Acessar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setType(!type)}>
        <Text>
          {type
            ? 'Ja possuo uma conta! Acessar'
            : 'Não possui uma conta? Cadastra-se'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginTop: Platform.OS === 'android' ? 80 : 100,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    color: '#121212',
    backgroundColor: '#ebebeb',
    width: '90%',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50,
  },
  button: {
    width: '90%',
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
