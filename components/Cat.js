import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useCat } from '@/contexts/CatContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomItem, imageClothesMap } from '@/components/CustomItem';

const imageMap = {
    "happy-cat": require('@/assets/images/happy-cat.png'),
    "normal-cat": require('@/assets/images/normal-cat.png'),
    "sad-cat": require('@/assets/images/sad-cat.png'),
    "dirty-cat": require('@/assets/images/dirty-cat.png'),
    "cat-eating": require('@/assets/gifs/cat-eating.gif'),
    "very-happy-cat": require('@/assets/images/very-happy-cat.png'),
    "cat-happy-1": require('@/assets/gifs/cat-happy-1.png'),
    "cat-happy-2": require('@/assets/gifs/cat-happy-2.png'),
    "cat-happy-3": require('@/assets/gifs/cat-happy-3.png'),
    "cat-happy-4": require('@/assets/gifs/cat-happy-4.png'),
    "cat-happy-5": require('@/assets/gifs/cat-happy-5.png'),
    "dirty-cat-eating": require('@/assets/gifs/dirty-cat-eating.gif'),
    "cat-brown": require('@/assets/images/cat-brown.png'),
    "cat-white": require('@/assets/images/cat-white.png'),
    "cat-orange": require('@/assets/images/cat-orange.png'),
};

const Cat = () => {
    const { happiness, isDirty, isEating } = useCat();
    const [displayImage, setDisplayImage] = useState("");

    const [color, setColor] = useState()
    const [clothing, setClothing] = useState()
    const [bow, setBow] = useState()
    const [glasses, setGlasses] = useState()
    const [locked, setLocked] = useState([])

    const catCustomizaton = async () => {
        try {
            const current = await AsyncStorage.getItem('catColor')
            if (current === undefined) setColor("white")
            else setColor(current)
            console.log("cor no home: " + current)
            setClothing(await AsyncStorage.getItem('catClothing'))
            setBow(await AsyncStorage.getItem('catBow'))
            setGlasses(await AsyncStorage.getItem('catGlasses'))
            //await AsyncStorage.setItem('catGlasses', "")
            setLocked(JSON.parse(await AsyncStorage.getItem('lockedClothes')))
        } catch (error) {
            console.error('Error retrieving data', error);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            catCustomizaton()
        }, [])
    );

    useEffect(() => {
        console.log("cor selecionada: " + color);

        if (color === "white") {
            setDisplayImage("cat-white");
            if (happiness >= 100) {
                const frames = [
                    "cat-happy-1",
                    "cat-happy-2",
                    "cat-happy-3",
                    "cat-happy-4",
                    "cat-happy-5",
                    "very-happy-cat",
                ];

                let frameIndex = 0;
                const interval = setInterval(() => {
                    setDisplayImage(frames[frameIndex]);
                    frameIndex++;
                    if (frameIndex === frames.length) {
                        clearInterval(interval);
                    }
                }, 500);

                return () => clearInterval(interval);
            } 
            else if (happiness >= 75) {
                setDisplayImage("happy-cat");
            } 
            else if (happiness >= 50) {
                setDisplayImage("normal-cat");
            } 
            else {
                setDisplayImage("sad-cat");
            }

        }
        if (isDirty && isEating) { setDisplayImage("dirty-cat-eating"); }
        else if (isDirty) { setDisplayImage("dirty-cat"); }
        else if (isEating) { setDisplayImage("cat-eating"); }
        else if (color === "brown") { setDisplayImage("cat-brown"); }
        else if (color === "orange") { setDisplayImage("cat-orange"); }


    }, [happiness, isDirty, isEating, color]);

    return (
        <View style={styles.container}>
            <Image
                source={imageMap[displayImage]}
                style={styles.cat}
            />
            <Image
                source={require('@/assets/images/sofa.png')}
                style={styles.sofa}
            />

            {/* clothing */}
        {clothing && (
          <Image
            source={imageClothesMap[clothing]}
            style={styles.clothing}
          />
        )}
        {/* bow */}
        {bow && (
          <Image
            source={imageClothesMap[bow]}
            style={styles.bow}
          />
        )}
        {glasses && (
          <Image
            source={imageClothesMap[glasses]}
            style={styles.glasses}
          />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    cat: {
        width: 255,
        height: 262,
        position: 'absolute',
        bottom: 80,
        zIndex: 1,
    },
    sofa: {
        width: 243,
        height: 126,
        position: 'absolute',
        bottom: 60,
        zIndex: 0,
    },
    clothing: {
        width: 150,
        height: 60,
        position: "absolute",
        bottom: 113,
        left: 139,
        zIndex: 1,
      },
      bow: {
        width: 50,
        height: 50,
        position: "absolute",
        zIndex: 1,
        bottom: 250,
      },
      glasses: {
        width: 190,
        height: 150,
        position: "absolute",
        zIndex: 1,
        bottom: 150,
        left: 120,
      },
});

export default Cat;