import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, PanResponder } from 'react-native';
import { useCat } from '@/contexts/CatContext';


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
};

const Cat = () => {
    const { happiness, setHappiness, isDirty, isEating } = useCat();
    const [displayImage, setDisplayImage] = useState("");
    const [dragDistance, setDragDistance] = useState(0);
    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        if (isDirty && isEating) { setDisplayImage("dirty-cat-eating"); }
        else if (isDirty) { setDisplayImage("dirty-cat"); }
        else if (isEating) { setDisplayImage("cat-eating"); }
        else {
            if (happiness >= 100 && !animationPlayed) {
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
                        setAnimationPlayed(true); // Marcar como exibido
                        setDisplayImage("very-happy-cat");
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
    }, [happiness, isDirty, isEating]); 


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            setDragDistance(prev => prev + Math.abs(gestureState.dx));
            if (dragDistance > 500) {
                setHappiness(prev => Math.min(prev + 5, 100));
                setDragDistance(0); 
            }
        },
        onPanResponderRelease: () => {
            setDragDistance(0);
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