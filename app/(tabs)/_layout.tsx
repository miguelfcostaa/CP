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
          height: 105,
          padding: 30,
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
