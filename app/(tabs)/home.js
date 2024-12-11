import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { CustomItem, imageMap } from '@/components/CustomItem';


export default function HomeScreen() {

  const [color, setColor] = useState()
  const [clothing, setClothing] = useState()
  const [bow, setBow] = useState()
  const [glasses, setGlasses] = useState()
  const [locked, setLocked] = useState([])


  const catCustomizaton = async () => {
    try {
      
      const current = await AsyncStorage.getItem('catColor')
      if (current === null) setColor("white")
      else setColor(current)
      setClothing(await AsyncStorage.getItem('catClothing'))
      setBow(await AsyncStorage.getItem('catBow'))
      setGlasses(await AsyncStorage.getItem('catGlasses'))
      //await AsyncStorage.setItem('lockedClothes', [])
      setLocked(await AsyncStorage.getItem('lockedClothes'))
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  const log = (info) => {
    console.log(info)
}

  useFocusEffect(
    React.useCallback(() => {
      catCustomizaton()
      log("locked: " + locked)
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
        {/* color */}
        {color == "white" && (
          <Image
            source={require('@/assets/images/cat-white.png')}
            style={styles.cat}
          />
        )}
        {color == "brown" && (
          <Image
            source={require('@/assets/images/cat-brown.png')}
            style={styles.cat}
          />
        )}
        {color == "orange" && (
          <Image
            source={require('@/assets/images/cat-orange.png')}
            style={styles.cat}
          />
        )}
        {/* clothing */}
        {clothing && (
          <Image
            source={imageMap[clothing]}
            style={styles.clothing}
          />
        )}
        {/* bow */}
        {bow && (
          <Image
            source={imageMap[bow]}
            style={styles.bow}
          />
        )}
        {glasses && (
          <Image
            source={imageMap[glasses]}
            style={styles.glasses}
          />
        )}
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
  clothing: {
    width: 150,
    height: 60,
    position: "absolute",
    left: "13%",
    top: "64%"
  },
  bow: {
    width: 50,
    height: 50,
    position: "absolute",
    left: "28%",
    top: "20%",
  },
  glasses: {
    width: 180,
    height: 150,
    position: "absolute",
    left: "9.5%",
    top: "16%",
  }

});
