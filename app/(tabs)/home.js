import React from 'react';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Header from '@/components/Header';
import Cat from '@/components/Cat';
import { useCat } from '@/contexts/CatContext';
import { useFish } from '@/contexts/FishContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { happiness, setHappiness, hungry, setHungry, isEating, setIsEating } = useCat();
  const { fish, setFish } = useFish();

  const handleEating = () => {
    setFish(fish - 1);
    setIsEating(true);
    setTimeout(() => {
      setIsEating(false);
      setHungry(hungry + 20);
      setHappiness(happiness + 10);
    }, 3000);      
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.header}>
        <Header />
      </View>

      <Cat />
      { !isEating && fish > 0 ? (
        <TouchableOpacity onPress={() => handleEating()}>
          <Image
            source={require('@/assets/images/fish-icon.png')}
            style={styles.fish}
          /> 
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleEating()} disabled>
          <Image
            source={require('@/assets/images/fish-icon.png')}
            style={[styles.fish, { opacity: 0.5 }]}
          /> 
        </TouchableOpacity>
      )}
      <Text style={styles.numberFish}> x{fish} </Text>

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
  fish: {
    width: 93,
    height: 93,
    position: 'absolute',
    bottom: width * 0.8,
    right: 0,
  },
  numberFish: {
    position: 'absolute',
    bottom: width * 0.82,
    right: 10,
    fontSize: 18,
    fontFamily: 'Inter',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,

  },

});
