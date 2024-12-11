import React from 'react';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

  const router = useRouter();

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
          source={require('@/assets/images/happy-cat.png')}
          style={styles.cat}
        />
      </View>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => router.push('/history')}>
        <Image
          source={require('@/assets/icons/question-mark.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
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
  roundButton: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.2) / 2,
    backgroundColor: '#54BEFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.18,
    right: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
},
    icon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
},

});