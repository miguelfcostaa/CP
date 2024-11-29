import React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();

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
