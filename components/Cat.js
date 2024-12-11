import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
//import { useCat } from '@/contexts/CatContext';

const imageMap = {
    // "happy-cat": require('@/assets/images/happy-cat.png'),
    // "normal-cat": require('@/assets/images/normal-cat.png'),
    // "sad-cat": require('@/assets/images/sad-cat.png'),
    // "dirty-cat": require('@/assets/images/dirty-cat.png'),
    // "cat-eating": require('@/assets/gifs/cat-eating.gif'),
    // "very-happy-cat": require('@/assets/images/very-happy-cat.png'),   
    // "cat-happy-1": require('@/assets/gifs/cat-happy-1.png'),
    // "cat-happy-2": require('@/assets/gifs/cat-happy-2.png'),
    // "cat-happy-3": require('@/assets/gifs/cat-happy-3.png'),
    // "cat-happy-4": require('@/assets/gifs/cat-happy-4.png'),
    // "cat-happy-5": require('@/assets/gifs/cat-happy-5.png'), 

    "brown":require('@/assets/images/cat-brown.png'), 
    "white":require('@/assets/images/cat-white.png'), 
    "orange":require('@/assets/images/cat-orange.png'), 
};

const Cat = ({cor}) => {
    //const { happiness, dirty, isEating } = useCat();
    const [displayImage, setDisplayImage] = useState("");

    useEffect(() => {
        // if (happiness >= 100) {
        //     const frames = [
        //         "cat-happy-1",
        //         "cat-happy-2",
        //         "cat-happy-3",
        //         "cat-happy-4",
        //         "cat-happy-5",
        //         "very-happy-cat",
        //     ];
            
        //     let frameIndex = 0;
        //     const interval = setInterval(() => {
        //         setDisplayImage(frames[frameIndex]);
        //         frameIndex++;
        //         if (frameIndex === frames.length) {
        //             clearInterval(interval);
        //         }
        //     }, 500);

        //     return () => clearInterval(interval);
        // } 
        // else if (happiness >= 75) {
        //     setDisplayImage("happy-cat");
        // } 
        // else if (happiness >= 50) {
        //     setDisplayImage("normal-cat");
        // } 
        // else {
        //     setDisplayImage("sad-cat");
        // }

        // if (isEating) { setDisplayImage("cat-eating"); }
        // if (dirty) { setDisplayImage("dirty-cat"); }
        //setDisplayImage(cor)

    }//, [happiness, dirty, isEating]); 
    )
    return (
        <View style={styles.container}>
            <Image  
                source={imageMap[cor]}
                style={styles.cat}
            />
            {/* <Image
                source={require('@/assets/images/sofa.png')}
                style={styles.sofa}
            /> */}
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
});

export default Cat;