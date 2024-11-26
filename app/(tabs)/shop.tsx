import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Button
} from 'react-native';
import ShopItem from '@/components/ShopItem';
import AddToCart from '@/components/AddToCart';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useRouter } from 'expo-router';


export default function ShopScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-200)).current; 
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  const toggleDrawer = () => {
    if (drawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonAnimation, {
        toValue: -200, 
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: -200,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => setDrawerOpen(false));
  };

  return (
    <View style={styles.container}>
      {/* Fundo */}
      <View style={styles.background}></View>

      {/* Botão de Filtro */}
      <Animated.View
        style={[
          styles.filterContainer,
          { transform: [{ translateX: buttonAnimation }] },
        ]}
      >
        <TouchableOpacity onPress={toggleDrawer}>
          <Image
            source={require('@/assets/icons/filter_icon.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} >
          <Image
            source={require('@/assets/icons/goBack_icon.png')}
            style={styles.goBack}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Shop</Text>
        <TouchableOpacity onPress={() => router.push('/cart')} >
          <Image
            source={require('@/assets/icons/cart_icon_items.png')}
            style={styles.cartItems}
          />
        </TouchableOpacity>
        <Text style={styles.numberCartItems}>0</Text>
      </View>

      {/* Itens da loja */}
      <View style={styles.shopContainer}>
        <View style={styles.shopItemFlex}>
          <ShopItem image={"cat-food"} name={"Cat food"} price={"5"} />
          <AddToCart />
        </View>
        <View style={styles.shopItemFlex}>
          <ShopItem image={"water"} name={"Water"} price={"2"} />
          <AddToCart />
        </View>
        <View style={styles.shopItemFlex}>
          <ShopItem image={"cat-bed"} name={"Cat Bed"} price={"15"} />
          <AddToCart />
        </View>
        <View style={styles.shopItemFlex}>
          <ShopItem image={"cat-bed-deluxe"} name={"Cat Bed Deluxe"} price={"18"} />
          <AddToCart />
        </View>
      </View>

      {/* Drawer */}
      {drawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.drawer, { right: drawerAnimation }]}>
              <Image
                source={require('@/assets/icons/coin-overlay.png')}
                style={styles.coinOverlay}
              />
              <Text style={styles.coinText}> 223 </Text>

              <Text style={styles.drawerTitle}> Filters: </Text>

              <View style={styles.drawerItemFlex}>
                <BouncyCheckbox 
                  fillColor='#1ED73A'
                  unFillColor='#3390C9'
                  iconStyle={{ borderRadius: 8 }}
                  onPress={(isChecked: boolean) => {}} 
                  size={25}
                  text="Food"
                  textStyle={{color: '#fff', fontSize: 20}}
                  style={{ flexDirection: 'row-reverse', marginRight: 10, marginLeft: -10 }}
                  innerIconStyle={{ borderRadius: 8, borderWidth: 2, borderColor: '#fff' }}
                />  
                <BouncyCheckbox 
                  fillColor='#1ED73A'
                  unFillColor='#3390C9'
                  iconStyle={{ borderRadius: 8 }}
                  onPress={(isChecked: boolean) => {}} 
                  size={25}
                  text="Cosmetics"
                  textStyle={{color: '#fff', fontSize: 20}}
                  style={{ flexDirection: 'row-reverse', marginRight: 10, marginLeft: -10 }}
                  innerIconStyle={{ borderRadius: 8, borderWidth: 2, borderColor: '#fff' }}
                />  
                <View style={styles.submitButton}>
                  <Button
                    title="Apply"
                    color={'#fff'}
                    onPress={() => {}}
                  />
                </View>
              </View>

            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0067B0',
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    height: '17%',
    width: '100%',
    backgroundColor: '#007CCA',
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxShadow: "0px -4px 13.2px 2px rgba(0, 0, 0, 0.25)",
    zIndex: 5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '15%',
  },
  goBack: {
    width: 48,
    height: 48,
    marginLeft: '5%',
    marginTop: '90%',
  },
  cartItems: {
    width: 48,
    height: 48,
    marginRight: '5%',
    marginTop: '90%',
  },
  numberCartItems: {
    position: 'absolute',
    width: 48,
    height: 48,
    left: 355,
    top: 62,
    color: '#FFFFFF',
  },
  shopContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '5%',
    gap: 25,
    zIndex: 1,
  },
  shopItemFlex: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  filterContainer: {
    width: 86,
    height: 54,
    position: 'absolute',
    right: -30,
    top: 200,
    backgroundColor: '#0074BB',
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 12,
    boxShadow: '1px 4px 9.4px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 3,
  },
  filterIcon: {
    width: 38,
    height: 35,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 4,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: '#0074BB',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 150,
    zIndex: 5,
  },
  drawerTitle: {
    fontSize: 24,
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  drawerItem: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    color: 'red',
    fontSize: 18,
  },
  coinText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gasoek One',	
    color: '#fff',  
    marginTop: 20,
    position: 'absolute',
    top: 145,
    right: 60,
  },
  coinOverlay: {
    width: 151,
    height: 51,
    marginBottom: 30,
  },
  drawerItemFlex: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  submitButton: {
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: '#004168',
    borderRadius: 15,
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

