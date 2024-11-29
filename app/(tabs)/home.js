import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function HomeScreen() {


  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.flex}>
        <Image
          source={require('@/assets/images/dirty-cat.png')}
          style={styles.cat}
        />
      </View>
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
  flex: {
    display: 'flex',
    marginTop: 300,
  },
  cat: {
    width: 255,
    height: 262,
  },


});
