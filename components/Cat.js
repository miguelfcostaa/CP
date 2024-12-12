import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, PanResponder } from 'react-native';
import { useCat } from '@/contexts/CatContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageClothesMap } from '@/components/CustomItem';


const imageMap = {
    "very-happy-cat-default": require('@/assets/images/very-happy-cat-default.png'),
    "happy-cat-default": require('@/assets/images/happy-cat-default.png'),
    "normal-cat- default": require('@/assets/images/normal-cat-default.png'),
    "sad-cat-default": require('@/assets/images/sad-cat-default.png'),
    "cat-eating-default": require('@/assets/gifs/cat-eating-default.gif'),

    "very-happy-cat-orange": require('@/assets/images/very-happy-cat-orange.png'),
    "happy-cat-orange": require('@/assets/images/happy-cat-orange.png'),
    "normal-cat-orange": require('@/assets/images/normal-cat-orange.png'),
    "sad-cat-orange": require('@/assets/images/sad-cat-orange.png'),
    "cat-eating-orange": require('@/assets/gifs/cat-eating-orange.gif'),

    "very-happy-cat-brown": require('@/assets/images/very-happy-cat-brown.png'),
    "happy-cat-brown": require('@/assets/images/happy-cat-brown.png'),
    "normal-cat-brown": require('@/assets/images/normal-cat-brown.png'),
    "sad-cat-brown": require('@/assets/images/sad-cat-brown.png'),
    "cat-eating-brown": require('@/assets/gifs/cat-eating-brown.gif'),

    "very-happy-cat-white": require('@/assets/images/very-happy-cat-white.png'),
    "happy-cat-white": require('@/assets/images/happy-cat-white.png'),
    "normal-cat-white": require('@/assets/images/normal-cat-white.png'),
    "sad-cat-white": require('@/assets/images/sad-cat-white.png'),
    "cat-eating-white": require('@/assets/gifs/cat-eating-white.gif'),

    "dirty-very-happy-cat-default": require('@/assets/images/dirty-very-happy-cat-default.png'),
    "dirty-happy-cat-default": require('@/assets/images/dirty-happy-cat-default.png'),
    "dirty-normal-cat-default": require('@/assets/images/dirty-normal-cat-default.png'),
    "dirty-sad-cat-default": require('@/assets/images/dirty-sad-cat-default.png'),

    "dirty-very-happy-cat-orange": require('@/assets/images/dirty-very-happy-cat-orange.png'),
    "dirty-happy-cat-orange": require('@/assets/images/dirty-happy-cat-orange.png'),
    "dirty-normal-cat-orange": require('@/assets/images/dirty-normal-cat-orange.png'),
    "dirty-sad-cat-orange": require('@/assets/images/dirty-sad-cat-orange.png'),

    "dirty-very-happy-cat-brown": require('@/assets/images/dirty-very-happy-cat-brown.png'),
    "dirty-happy-cat-brown": require('@/assets/images/dirty-happy-cat-brown.png'),
    "dirty-normal-cat-brown": require('@/assets/images/dirty-normal-cat-brown.png'),
    "dirty-sad-cat-brown": require('@/assets/images/dirty-sad-cat-brown.png'),

    "dirty-very-happy-cat-white": require('@/assets/images/dirty-very-happy-cat-white.png'),
    "dirty-happy-cat-white": require('@/assets/images/dirty-happy-cat-white.png'),
    "dirty-normal-cat-white": require('@/assets/images/dirty-normal-cat-white.png'),
    "dirty-sad-cat-white": require('@/assets/images/dirty-sad-cat-white.png'),

    "cat-happy-1": require('@/assets/gifs/cat-happy-1.png'),
    "cat-happy-2": require('@/assets/gifs/cat-happy-2.png'),
    "cat-happy-3": require('@/assets/gifs/cat-happy-3.png'),
    "cat-happy-4": require('@/assets/gifs/cat-happy-4.png'),
    "cat-happy-5": require('@/assets/gifs/cat-happy-5.png'),
    
    "dirty-cat-eating-default": require('@/assets/gifs/dirty-cat-eating-default.gif'),
    "dirty-cat-eating-orange": require('@/assets/gifs/dirty-cat-eating-orange.gif'),
    "dirty-cat-eating-brown": require('@/assets/gifs/dirty-cat-eating-brown.gif'),
    "dirty-cat-eating-white": require('@/assets/gifs/dirty-cat-eating-white.gif'),

    "dirty-touch-cat-default": require('@/assets/images/dirty-touch-cat-default.png'),
    "dirty-touch-cat-orange": require('@/assets/images/dirty-touch-cat-orange.png'),
    "dirty-touch-cat-brown": require('@/assets/images/dirty-touch-cat-brown.png'),
    "dirty-touch-cat-white": require('@/assets/images/dirty-touch-cat-white.png'),

    "touch-cat-default": require('@/assets/images/touch-cat-default.png'),
    "touch-cat-orange": require('@/assets/images/touch-cat-orange.png'),
    "touch-cat-brown": require('@/assets/images/touch-cat-brown.png'),
    "touch-cat-white": require('@/assets/images/touch-cat-white.png'),


};

const Cat = () => {
    const { happiness, setHappiness, isDirty, isEating } = useCat();
    const [displayImage, setDisplayImage] = useState("");
    const [dragDistance, setDragDistance] = useState(0);
    const [animationPlayed, setAnimationPlayed] = useState(false);

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
        const deleteAsyncItems = async () => {
            await AsyncStorage.removeItem('catColor')
            await AsyncStorage.removeItem('catClothing')
            await AsyncStorage.removeItem('catBow')
            await AsyncStorage.removeItem('catGlasses')
        }
        deleteAsyncItems()
        catCustomizaton()
    }, [])    


    function catColor() {
        if (color === "default") {
            if (isDirty) {
                if (isEating) { setDisplayImage("dirty-cat-eating-default"); }
                else if (happiness >= 100) {
                    setDisplayImage("dirty-very-happy-cat-default");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("dirty-happy-cat-default");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("dirty-normal-cat-default");
                } 
                else {
                    setDisplayImage("dirty-sad-cat-default");
                }
            }
            else {
                if (isEating) { setDisplayImage("cat-eating-default"); }
                else if (happiness >= 100) {
                    setDisplayImage("very-happy-cat-default");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("happy-cat-default");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("normal-cat-default");
                } 
                else {
                    setDisplayImage("sad-cat-default");
                }
            }
        }

        if (color === "orange") {
            if (isDirty) {
                if (isEating) { setDisplayImage("dirty-cat-eating-orange"); }
                else if (happiness >= 100) {
                    setDisplayImage("dirty-very-happy-cat-orange");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("dirty-happy-cat-orange");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("dirty-normal-cat-orange");
                } 
                else {
                    setDisplayImage("dirty-sad-cat-orange");
                }
            }
            else {
                if (isEating) { setDisplayImage("cat-eating-orange"); }
                else if (happiness >= 100) {
                    setDisplayImage("very-happy-cat-orange");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("happy-cat-orange");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("normal-cat-orange");
                } 
                else {
                    setDisplayImage("sad-cat-orange");
                }
            }
        }

        if (color === "brown") {
            if (isDirty) {
                if (isEating) { setDisplayImage("dirty-cat-eating-brown"); }
                else if (happiness >= 100 && !animationPlayed) {
                    setDisplayImage("dirty-very-happy-cat-brown");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("dirty-happy-cat-brown");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("dirty-normal-cat-brown");
                } 
                else {
                    setDisplayImage("dirty-sad-cat-brown");
                }
            }
            else {
                if (isEating) { setDisplayImage("cat-eating-brown"); }
                else if (happiness >= 100) {
                    setDisplayImage("very-happy-cat-brown");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("happy-cat-brown");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("normal-cat-brown");
                } 
                else {
                    setDisplayImage("sad-cat-brown");
                }
            }
        }

        if (color === "white") {
            if (isDirty) {
                if (isEating) { setDisplayImage("dirty-cat-eating-white"); }
                else if (happiness >= 100) {
                    setDisplayImage("dirty-very-happy-cat-white");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("dirty-happy-cat-white");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("dirty-normal-cat-white");
                } 
                else {
                    setDisplayImage("dirty-sad-cat-white");
                }
            }
            else {
                if (isEating) { setDisplayImage("cat-eating-white"); }
                else if (happiness >= 100) {
                    setDisplayImage("very-happy-cat-white");
                }  
                else if (happiness >= 75) {
                    setDisplayImage("happy-cat-white");
                } 
                else if (happiness >= 50) {
                    setDisplayImage("normal-cat-white");
                } 
                else {
                    setDisplayImage("sad-cat-white");
                }
            }
        }
    }

    useEffect(() => {

        catColor()
              
    }, [happiness, isDirty, isEating, color]);


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (color === "default") {
                if (isDirty) {
                    setDisplayImage("dirty-touch-cat-default");
                }
                else {
                    setDisplayImage("touch-cat-default");
                }
            }
            else if (color === "brown") {
                if (isDirty) {
                    setDisplayImage("dirty-touch-cat-brown");
                }
                else {
                    setDisplayImage("touch-cat-brown");
                }
            }
            else if (color === "orange") {
                if (isDirty) {
                    setDisplayImage("dirty-touch-cat-orange");
                }
                else {
                    setDisplayImage("touch-cat-orange");
                }
            }
            else if (color === "white") {
                if (isDirty) {
                    setDisplayImage("dirty-touch-cat-white");
                }
                else {
                    setDisplayImage("touch-cat-white");
                }
            }
            setDragDistance(prev => prev + Math.abs(gestureState.dx));
            if (dragDistance > 500) {
                setHappiness(prev => Math.min(prev + 5, 100));
                setDragDistance(0); 
            }
        },
        onPanResponderRelease: () => {
            setDragDistance(0);
            catColor()
        },
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
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
        alignSelf:"center",
        bottom: 115,
        zIndex: 2,
    },
    bow: {
        width: 50,
        height: 50,
        position: "absolute",
        alignSelf:"center",
        bottom: 250,
        zIndex: 2,
    },
    glasses: {
        width: 170,
        height: 140,
        position: "absolute",
        alignSelf:"center",
        bottom: 155,
        zIndex: 2,
    },
});

export default Cat;