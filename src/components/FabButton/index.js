import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function FabButton({setVisible}) {
  function handleNavigateButton() {
    setVisible();
  }
  return (
    <TouchableOpacity
      style={styles.containerButton}
      activeOpacity={0.9}
      onPress={handleNavigateButton}>
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: '#2e54d4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '6%',
  },
  text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
