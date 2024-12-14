import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Cat from '@/components/Cat';
import { useCat } from '@/contexts/CatContext';
import { useFish } from '@/contexts/FishContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { where, query } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { happiness, setHappiness, hungry, setHungry, isEating, setIsEating } = useCat();
  const { fish, setFish } = useFish();
  const [itemsLocked, setItemsLocked] = useState([]);

  const handleEating = () => {
    setFish(fish - 1);
    setIsEating(true);
    setTimeout(() => {
      setIsEating(false);
      setHungry(hungry + 20);
      setHappiness(happiness + 10);
    }, 3000);
  }

  useEffect(() => {
    const fetchLockedItems = async () => {
      try {
        const itemsCollection = collection(db, 'customItems');
        let queryRef = query(itemsCollection, where("category", "!=", "skin"))
        let itemsSnapshot = await getDocs(queryRef);
        if (itemsSnapshot.empty) {
          console.log("Não há items nestas categorias.");
        } else {
          const item = itemsSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          setItemsLocked(item)
          addLock(item)
          console.log("bloqueadas no home: " + item.map(i => i.name))
        }
      } catch (error) {
        console.error("Erro ao buscar itens da personalização:", error.message);
      }
    }
    const addLock = async (objs) => {
      try {

        await AsyncStorage.setItem("lockedClothes", JSON.stringify(objs));
      }
      catch (er) {
        console.error('Error saving data', er);
      }
    }
    fetchLockedItems()
  }, [])

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


      <Cat />
      {!isEating && fish > 0 ? (
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
  fish: {
    width: 93,
    height: 93,
    position: 'absolute',
    bottom: width * 0.8,
    right: 0,
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
