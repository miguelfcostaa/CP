import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen() {

  const [color, setColor] = useState()

  const catColor = async () => {
    try {
      setColor(await AsyncStorage.getItem('catColor'))
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const color = catColor();
      console.log("COR: " + color);
    }, []) // Runs every time the screen gains focus
  );

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
        <Text>{color}</Text>
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
