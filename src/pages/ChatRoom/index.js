import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/Modal/Index';
import firestore from '@react-native-firebase/firestore';
import ChatList from './../../components/ChatList/index';

export default function ChatRoom() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then(snapshot => {
          const threads = snapshot.docs.map(doc => {
            return {
              _id: doc.id,
              name: '',
              lastMessage: {
                text: '',
              },
              ...doc.data(),
            };
          });
          if (isActive) {
            setThreads(threads);
            setLoading(false);
          }
        });
    }

    getChats();
    return () => {
      isActive = false;
    };
  }, [isFocused, updateScreen]);

  function handleLogout() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
      .catch(() => {
        console.log('Não possui nenhum usuario');
      });
  }

  function deleteRoom(ownerId, idRoom) {
    //checando se quem ta tentando deletar é dono da sala
    if (ownerId !== user?.uid) {
      return;
    }

    Alert.alert('Atenção!', 'Você tem certeza que deseja deletar essa sala?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => handleDeleteRoom(idRoom),
      },
    ]);
  }

  async function handleDeleteRoom(idRoom) {
    await firestore().collection('MESSAGE_THREADS').doc(idRoom).delete();
    setUpdateScreen(!updateScreen);
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#555" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          <TouchableOpacity onPress={handleLogout}>
            {user && <MaterialIcon name="logout" size={28} color="#fff" />}
          </TouchableOpacity>

          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ChatList
            data={item}
            deleteRoom={() => deleteRoom(item.owner, item._id)}
            userStatus={user}
          />
        )}
      />

      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom
          setVisible={() => setModalVisible(false)}
          updateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2e54d4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 15,
  },
});
