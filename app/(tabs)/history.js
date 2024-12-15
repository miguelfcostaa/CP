import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions,TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HistoryScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/background-history.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.imageWrapper}>
        <View style={styles.blueBackground} />
        <Image
          source={require('@/assets/images/cat-image.png')} 
          style={styles.catImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Our company works in helping cats that are in the streets and in this application you can help them! 
          Here you can have a digital cat where you can treat him and buy some food that is gonna turn to money to help our company.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => router.push('/history2')} 
      >
        <Image
          source={require('@/assets/icons/next.png')} 
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
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
    ...StyleSheet.absoluteFillObject,
  },
  imageWrapper: {
    position: 'absolute',
    top: height * 0.2,
    alignItems: 'center',
  },
  blueBackground: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: '#54BEFF',
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: 1,
    borderRadius: 5,
    transform: [{ rotate: '8deg' }]
  },
  catImage: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
    zIndex: 2,
  },
  textContainer: {
    position: 'absolute',
    bottom: height * 0.1,
    width: width * 0.8,
    backgroundColor: '#4EBEFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  arrowButton: {
    position: 'absolute',
    bottom: height * 0.37, 
    right: width * 0.0001, 
    padding: 10,
    elevation: 5, 
  },
  arrowIcon: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
  },
});