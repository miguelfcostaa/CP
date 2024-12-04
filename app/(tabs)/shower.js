import { Dimensions } from 'react-native';
import { StyleSheet, View, Image, PanResponder } from 'react-native';
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Cat from '@/components/Cat';

export default function ShowerScreen() {
  const [spongePosition, setSpongePosition] = useState({ x: 0, y: 650 });
  const [showerPosition, setShowerPosition] = useState({ x: 265, y: 400 });
  const [foamPositions, setFoamPositions] = useState([]);
  const [showerActive, setShowerActive] = useState(false); 

  const canAddFoamRef = useRef(true); 

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const catBounds = {
    x: (screenWidth - 255) / 2,
    y: screenHeight - 80 - 262 + 30,
    width: 255,
    height: 212,
  };

  const isTouchingCat = (x, y) => {
    return (
      x > catBounds.x &&
      x < catBounds.x + catBounds.width &&
      y > catBounds.y &&
      y < catBounds.y + catBounds.height
    );
  };

  const spongePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const touchX = gestureState.moveX;
        const touchY = gestureState.moveY;

        setSpongePosition({ x: touchX, y: touchY });

        if (isTouchingCat(touchX, touchY) && canAddFoamRef.current) {
          setFoamPositions((prev) => [
            ...prev,
            { x: touchX - 25, y: touchY - 25 },
          ]);
          canAddFoamRef.current = false;

          setTimeout(() => {
            canAddFoamRef.current = true;
          }, 300);
        }
      },
      onPanResponderRelease: () => {
        setSpongePosition({ x: 0, y: 650 });
      },
    })
  ).current;

  const showerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setShowerActive(true); 
      },
      onPanResponderMove: (e, gestureState) => {
        const touchX = gestureState.moveX;
        const touchY = gestureState.moveY;
  
        setShowerPosition({ x: touchX, y: touchY });
        if (!showerActive) setShowerActive(true); 
      },
      onPanResponderRelease: () => {
        setShowerActive(false); 
        setShowerPosition({ x: 265, y: 400 });
      },
    })
  ).current;
  

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/shower-background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.header}>
        <Header />
      </View>

      <Cat style={{ zIndex: 0 }} />

      {foamPositions.map((foam, index) => (
        <Image
          key={index}
          source={require('@/assets/images/foam.png')}
          style={[styles.foam, { left: foam.x, top: foam.y }]}
        />
      ))}

      <Image
        source={require('@/assets/images/sponge.png')}
        style={[styles.sponge, { left: spongePosition.x, top: spongePosition.y }]}
        {...spongePanResponder.panHandlers}
      />

      <Image
        source={
          showerActive
            ? require('@/assets/gifs/shower.gif') 
            : require('@/assets/images/shower.png')
        }
        style={[styles.shower, { left: showerPosition.x, top: showerPosition.y }]}
        {...showerPanResponder.panHandlers}
      />
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
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    margin: 10,
  },
  sponge: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 3,
  },
  shower: {
    width: 178,
    height: 150,
    position: 'absolute',
    zIndex: 2,
  },
  foam: {
    width: 80,
    height: 80,
    position: 'absolute',
    zIndex: 3,
  },
});
