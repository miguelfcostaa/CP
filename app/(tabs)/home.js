import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Header from '@/components/Header';

export default function HomeScreen() {


  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.header}>
        <Header />
      </View>

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
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    margin: 10,
  },
  flex: {
    alignSelf: 'center',
    marginTop: 250,
  },
  cat: {
    width: 255,
    height: 262,
  },


});
