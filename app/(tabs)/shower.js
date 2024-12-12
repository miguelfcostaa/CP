import { Dimensions } from "react-native";
import { StyleSheet, View, Image, PanResponder, Text} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Cat from "@/components/Cat";
import { useCat } from "@/contexts/CatContext";

const imageMap = {
  "shower-1": require("@/assets/gifs/shower-1.png"),
  "shower-2": require("@/assets/gifs/shower-2.png"),
  "shower-3": require("@/assets/gifs/shower-3.png"),
  "shower-4": require("@/assets/gifs/shower-4.png"),
};

export default function ShowerScreen() {

  const { isDirty, setIsDirty, setHappiness } = useCat();
  const [hasFoamBeenAdded, setHasFoamBeenAdded] = useState(false);
  const [spongePosition, setSpongePosition] = useState({ x: 0, y: 650 });
  const [foamCount, setFoamCount] = useState(0);
  const [showerPosition, setShowerPosition] = useState({ x: 265, y: 400 });
  const [foamPositions, setFoamPositions] = useState([]);
  const [showerActive, setShowerActive] = useState(false);
  const [displayImage, setDisplayImage] = useState("shower-1");
  const [showerProgress, setShowerProgress] = useState(0);
  const [isShowerFinished, setIsShowerFinished] = useState(false);

  const canAddFoamRef = useRef(true);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const catBounds = {
    x: (screenWidth - 255) / 2,
    y: screenHeight - 80 - 262,
    width: 195,
    height: 132,
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
          addFoam(touchX, touchY); 
          canAddFoamRef.current = false;
  
          setTimeout(() => {
            canAddFoamRef.current = true;
          }, 100);
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

        setFoamPositions((prev) =>
          prev.filter((foam) => !isTouchingFoam(touchX, touchY, foam.x, foam.y))
        );
      },
      onPanResponderRelease: () => {
        setShowerActive(false);
        setShowerPosition({ x: 265, y: 400 });
      },
    })
  ).current;

  const isTouchingFoam = (showerX, showerY, foamX, foamY) => {
    const showerWidth = 178;
    const showerHeight = 150;
    const foamWidth = 80;
    const foamHeight = 80;
  
    return (
      showerX < foamX + foamWidth &&
      showerX + showerWidth > foamX &&
      showerY < foamY + foamHeight &&
      showerY + showerHeight > foamY
    );
  };

  useEffect(() => {
    if (showerActive) {
      const frames = ["shower-1", "shower-2", "shower-3", "shower-4"];
      let frameIndex = 0;
  
      const interval = setInterval(() => {
        setDisplayImage(frames[frameIndex]);
        frameIndex = (frameIndex + 1) % frames.length;
      }, 100);
  
      return () => clearInterval(interval);
    }
  
    let foamProgress = 0;
    if (isShowerFinished) {
      foamProgress = foamCount * 5;
    }
    else {
      foamProgress = Math.min(foamCount * 5, 90);
    }

    let waterProgress = 0;
    if (foamPositions.length === 0 && hasFoamBeenAdded) {
      waterProgress = 10;
    }

    const totalProgress = Math.min(foamProgress + waterProgress, 100);
    setShowerProgress(totalProgress);

    if (isDirty) {
      setShowerProgress(0);
      setIsShowerFinished(false);
    }
    else {
      setShowerProgress(100);
    }
  
    if (showerProgress === 100) {
      setIsDirty(false); 
      setHappiness((prev) => Math.min(prev + 20, 100));
      setIsShowerFinished(true);
    }

  }, [showerActive, foamCount, isDirty, showerProgress, foamPositions, hasFoamBeenAdded]);

  const addFoam = (touchX, touchY) => {
    if (!isShowerFinished) { 
      setFoamPositions((prev) => [...prev, { x: touchX, y: touchY }]);
      setHasFoamBeenAdded(true);
      setFoamCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/shower-background.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.showerProgressContainer}>
        <View style={styles.showerProgress}>
          <View style={{...styles.showerProgressBox, width : `${Math.min(showerProgress, 100)}%` }}>
            <Text style={styles.showerProgressText}> {Math.round(showerProgress)}% </Text>
          </View>          
        </View>
      </View>


      <Cat style={{ zIndex: 0 }} />

      {foamPositions.map((foam, index) => (
        <Image
          key={index}
          source={require("@/assets/images/foam.png")}
          style={[styles.foam, { left: foam.x, top: foam.y }]}
        />
      ))}

      <Image
        source={require("@/assets/images/sponge.png")}
        style={[
          styles.sponge,
          { left: spongePosition.x, top: spongePosition.y },
        ]}
        {...spongePanResponder.panHandlers}
      />
      {!showerActive ? (
        <Image
          source={require("@/assets/images/shower.png")}
          style={[
            styles.shower,
            { left: showerPosition.x, top: showerPosition.y },
          ]}
          {...showerPanResponder.panHandlers}
        />
      ) : (
        <Image
          source={imageMap[displayImage]}
          style={[
            styles.shower,
            { left: showerPosition.x, top: showerPosition.y },
          ]}
          {...showerPanResponder.panHandlers}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    margin: 10,
  },
  sponge: {
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 3,
  },
  shower: {
    width: 178,
    height: 150,
    position: "absolute",
    zIndex: 2,
  },
  foam: {
    width: 80,
    height: 80,
    position: "absolute",
    zIndex: 3,
  },
  showerProgressContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 120,
    zIndex: 2,
  },
  showerProgressText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter",
    fontWeight: "bold",
    paddingTop: 7,
    paddingRight: 10,
    textAlign: "right",
  },
  showerProgress: {
    zIndex: 0,
    width: 220,
    height: 44,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 21,
    borderColor: '#3058A3',
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.3)',
  },
  showerProgressBox: {
    height: 40,
    width: '50%',
    backgroundColor: '#2290EA',
    borderRadius: 19,
    zIndex: 4,
  },

});