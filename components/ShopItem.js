import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const imageMap = {
    "cat-food": require('@/assets/images/cat-food.png'),
    "water": require('@/assets/images/water.png'),
    "cat-bed": require('@/assets/images/cat-bed.png'),
    "cat-bed-deluxe": require('@/assets/images/cat-bed-deluxe.png'),
    "red-shirt-cat": require('@/assets/images/red-shirt-cat.png'),
};

const ShopItem = ({ image, name, price }) => {
    return (
        <View style={styles.container}>

            <Image
                source={imageMap[image]}
                style={styles.shopImage}
            />

            <Text style={styles.title}> {name} </Text>

            <View style={styles.priceFlex}>
                <Text style={styles.price}> {price} </Text> 

                <Image
                source={require('@/assets/icons/coin-image.png')}
                style={styles.coinImage}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 227,
        width: 160,
        borderRadius: 10,
    },
    shopImage: {
        width: 147,
        height: 147,
        margin: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'regular',
        marginBottom: 5,
        font: 'Geologica',
    },
    priceFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    price: {
        font: 'Geologica',
        color: '#FFD700',

        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    coinImage: {
        width: 37,
        height: 37,
        marginBottom: 16,
    },
});

export default ShopItem;

