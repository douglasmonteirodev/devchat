import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function ChatMesssage({data}) {
  const user = auth().currentUser.toJSON();

  const isMyMsg = useMemo(() => {
    return data?.user?._id === user.uid;
  }, [data]);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMsg ? '#dcf8c5' : '#fff',
            marginLeft: isMyMsg ? 50 : 0,
            marginRight: isMyMsg ? 0 : 50,
          },
        ]}>
        {!isMyMsg && <Text style={styles.name}>{data?.user?.displayName}</Text>}

        <Text style={styles.message}>{data.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: '#f53745',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: '#000',
  },
});
