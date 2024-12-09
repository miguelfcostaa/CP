import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const imageMap = {
    "BlackSunglasses": require('@/assets/images/Customization/Black_Sunglasses.png'),
    "GreenShirt": require('@/assets/images/Customization/Green_Shirt.png'),
    "CuteShirt": require('@/assets/images/Customization/Cute_Shirt.png'),
    "PinkBow": require('@/assets/images/Customization/Pink_Bow.png'),
    "PinkShirt": require('@/assets/images/Customization/Pink_Shirt.png'),
    "RoundGlasses": require('@/assets/images/Customization/Round_Glasses.png'),
    "BlueBow": require('@/assets/images/Customization/Blue_Bow.png'),
    "YellowBow": require('@/assets/images/Customization/Yellow_Bow.png'),
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