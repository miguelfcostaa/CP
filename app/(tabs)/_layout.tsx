import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#098AC8',
          height: "10%",
        },
      }}>
      <Tabs.Screen
        
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <>
              <Image
                source={require('@/assets/icons/home_button.png')}
                style={styles.icon}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <>
              <Image
                source={require('@/assets/icons/shop_button.png')}
                style={styles.icon}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <>
              <Image
                source={require('@/assets/icons/friends_button.png')}
                style={styles.icon}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="shower"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <>
              <Image
                source={require('@/assets/icons/shower_button.png')}
                style={styles.icon}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          href: null, 
        }}
      />
    </Tabs>
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
