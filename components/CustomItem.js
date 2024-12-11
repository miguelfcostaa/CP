import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const imageMap = {
    "GreenShirt": require('@/assets/images/Customization/Green_Shirt.png'),
    "BlueShirt": require('@/assets/images/Customization/Blue_Shirt.png'),
    "RedShirt": require('@/assets/images/Customization/Red_Shirt.png'),
    "PinkBow": require('@/assets/images/Customization/Pink_Bow.png'),
    "BlueBow": require('@/assets/images/Customization/Blue_Bow.png'),
    "YellowBow": require('@/assets/images/Customization/Yellow_Bow.png'),
    "RoundGlasses": require('@/assets/images/Customization/Round_Glasses.png'),
    "BlackSunglasses": require('@/assets/images/Customization/Black_Sunglasses.png'),
    "YellowSunglasses": require('@/assets/images/Customization/Yellow_Sunglasses.png'),
};

const CustomItem = ({ image }) => {
    return (
        <Image
            source={imageMap[image]}
            style={styles.img}
        />
    );
};

const styles = StyleSheet.create({
    img: {
        height: 40,
        width:71,
        margin: 5,
    },
});

export default CustomItem;