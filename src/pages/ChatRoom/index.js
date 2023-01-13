import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import FabButton from '../../components/FabButton';

export default function ChatRoom() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function handleLogout() {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn');
      })
      .catch(() => {
        console.log('Não possui nenhum usuario');
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcon
              name="logout"
              size={28}
              color="#fff"
              style={{marginTop: 5}}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FabButton setVisible={() => setModalVisible(true)} />
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
