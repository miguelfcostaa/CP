import { StyleSheet, View, Image, PanResponder } from 'react-native';
import React, { useState, useRef } from 'react';

export default function ShowerScreen() {
  const [position, setPosition] = useState({ x: 0, y: 650 });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, 
      onMoveShouldSetPanResponder: () => true,  
      onPanResponderMove: (e, gestureState) => {

        setPosition({
          x: gestureState.moveX, 
          y: gestureState.moveY, 
        });
      },
      onPanResponderRelease: () => {
        setPosition({ x: 0, y: 650 });
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/shower-background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.flex}>
        <Image
          source={require('@/assets/images/dirty-cat.png')}
          style={styles.cat}
        />
      </View>

      <Image
        source={require('@/assets/images/sponge.png')}
        style={[styles.sponge, { left: position.x, top: position.y }]}
        {...panResponder.panHandlers} 
      />
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
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  flex: {
    display: 'flex',
    marginTop: 300,
  },
  cat: {
    width: 255,
    height: 262,
  },
  sponge: {
    width: 100,
    height: 100,
    position: 'absolute', 
  },
});
