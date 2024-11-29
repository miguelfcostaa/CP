import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function HomeScreen() {


  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/background.png')}
        style={styles.backgroundImage}
      />



    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
  },

});
