import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';
import { CartProvider } from '@/contexts/CartContext';
import { CoinProvider } from '@/contexts/CoinContext';

export default function TabLayout() {

  return (
    <CartProvider>
    <CoinProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#098AC8',
          height: "10%",
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('@/assets/icons/home_button_focused.png')}
                  style={styles.icon}
                />
              );
            } else {
              return (
                <Image
                  source={require('@/assets/icons/home_button.png')}
                  style={styles.icon}
                />
              );
            }
          },
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('@/assets/icons/shop_button_focused.png')}
                  style={styles.icon}
                />
              );
            } else {
              return (
                <Image
                  source={require('@/assets/icons/shop_button.png')}
                  style={styles.icon}
                />
              );
            }
          },
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('@/assets/icons/friends_button_focused.png')}
                  style={styles.icon}
                />
              );
            } else {
              return (
                <Image
                  source={require('@/assets/icons/friends_button.png')}
                  style={styles.icon}
                />
              );
            }
          },
        }}
      />
      <Tabs.Screen
        name="shower"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('@/assets/icons/shower_button_focused.png')}
                  style={styles.icon}
                />
              );
            } else {
              return (
                <Image
                  source={require('@/assets/icons/shower_button.png')}
                  style={styles.icon}
                />
              );
            }
          },
        }}
      />
      <Tabs.Screen
        name="customization"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('@/assets/icons/customization_button_focused.png')}
                  style={styles.icon}
                />
              );
            } else {
              return (
                <Image
                  source={require('@/assets/icons/customization_button.png')}
                  style={styles.icon}
                />
              );
            }
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          href: null, 
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null, 
          tabBarStyle: { display: "none" }
        }}
      />
    </Tabs>
    </CoinProvider>
    </CartProvider>
  );
}

const styles = {
  backgroundIcon: {

  },
  icon: {
    width: 77,
    height: 77,
  },
};
