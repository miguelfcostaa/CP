import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Button,
  ScrollView
} from 'react-native';
import ShopItem from '@/components/ShopItem';
import AddToCart from '@/components/AddToCart';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 
import { useCart } from '@/contexts/CartContext';
import { query, where } from 'firebase/firestore';


export default function ShopScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { cart, cartCount, setIsAdded, setCartCount, addToCart, removeFromCart, findItemInCart } = useCart();
  const router = useRouter();

  const drawerAnimation = useRef(new Animated.Value(-200)).current; 
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const itemsCollection = collection(db, 'shopItems');
        const itemsSnapshot = await getDocs(itemsCollection);
        if (itemsSnapshot.empty) {
          console.log("A coleção 'shopItems' está vazia.");
        } else {
          const itemsList = itemsSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }; 
          });
          setShopItems(itemsList);
        }
      } catch (error) {
        console.error("Erro ao buscar itens da loja:", error.message);
      }
    };
    

    fetchShopItems();

  }, []);

  const handleAddToCart = (item) => {
    if (!findItemInCart(item.id)) {
      addToCart(item);
      setCartCount(cartCount + 1);  
      setIsAdded(true);
    }
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id); 
    setCartCount(cartCount - 1); 
    setIsAdded(false);
  };

  const isItemInCart = (itemId) => {
    return !!findItemInCart(itemId);
  };
  
  const handleGoToCart = () => {
    router.push({
      pathname: '/cart',
    });
  };

  const handleFilterItems = async (category, isChecked) => {
    let updatedCategories;
  
    if (isChecked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter(c => c !== category);
    }
  
    setSelectedCategories(updatedCategories);
  
    if (updatedCategories.length > 0) {
      try {
        const itemsCollection = collection(db, 'shopItems');
        
        const queryRef = query(itemsCollection, where('category', 'in', updatedCategories));
        
        const itemsSnapshot = await getDocs(queryRef);
  
        const filteredItems = itemsSnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
  
        setShopItems(filteredItems);
      } catch (error) {
        console.error("Erro ao buscar itens da loja:", error.message);
      }
    } else {
      try {
        const itemsCollection = collection(db, 'shopItems');
        const itemsSnapshot = await getDocs(itemsCollection);
  
        const itemsList = itemsSnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
  
        setShopItems(itemsList);
      } catch (error) {
        console.error("Erro ao buscar itens da loja:", error.message);
      }
    }
  };

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
        <TouchableOpacity onPress={() => router.push('/home')} >
        <Image
          source={require('@/assets/icons/goBack_icon.png')}
          style={styles.goBack}
        />
        </TouchableOpacity>

        <Text style={styles.title}>Shop</Text>
        <TouchableOpacity onPress={handleGoToCart}>
          <Image
            source={require('@/assets/icons/cart_icon_items.png')}
            style={styles.cartItems}
          />
        </TouchableOpacity>
        <Text style={styles.numberCartItems}> {cartCount} </Text>
      </View>

      {/* Itens da loja */} 
      <ScrollView>
        <View style={styles.shopContainer}>
          {shopItems.map((item) => (
              <View key={item.id} style={styles.shopItemFlex}>
                  <ShopItem image={item.image} name={item.name} price={item.price} />
                  <AddToCart 
                    onAddToCart={() => handleAddToCart(item)} 
                    onRemoveFromCart={() => handleRemoveFromCart(item)} // A mesma função pode ser usada para adicionar e remover
                    isAdded={isItemInCart(item.id)}
                  />
              </View>
          ))}
        </View>
      </ScrollView>

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
                  onPress={(isChecked) => {handleFilterItems('food', isChecked)}} 
                  size={25}
                  text="Food"
                  textStyle={{color: '#fff', fontSize: 20}}
                  style={{ flexDirection: 'row-reverse', marginRight: 10, marginLeft: -10 }}
                  innerIconStyle={{ borderRadius: 8, borderWidth: 2, borderColor: '#fff' }}
                  isChecked={selectedCategories.includes('food')}
                  onChange={(isChecked) => {handleFilterItems('food', isChecked)}}
                />  
                <BouncyCheckbox 
                  fillColor='#1ED73A'
                  unFillColor='#3390C9'
                  iconStyle={{ borderRadius: 8 }}
                  onPress={(isChecked) => {handleFilterItems('cosmetics', isChecked)}} 
                  size={25}
                  text="Cosmetics"
                  textStyle={{color: '#fff', fontSize: 20}}
                  style={{ flexDirection: 'row-reverse', marginRight: 10, marginLeft: -10 }}
                  innerIconStyle={{ borderRadius: 8, borderWidth: 2, borderColor: '#fff' }}
                  isChecked={selectedCategories.includes('cosmetics')}
                />  
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
    left: 352,
    top: 63,
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
});

