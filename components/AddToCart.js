import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AddToCart = () => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
    };

    const handleRemoveFromCart = () => {
        setIsAdded(false);
    };

    if (isAdded) {
        return (
            <TouchableOpacity onPress={handleRemoveFromCart}>
                <View style={styles.container_added} >
                    <Image
                        source={require('../assets/icons/Check_icon.png')}
                        style={styles.icon_added}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.touchable} onPress={handleAddToCart}>
            <View style={styles.container} >
                <Text style={styles.text} >ADD TO CART</Text>
                <Image source={require('@/assets/icons/cart_icon.png')} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 35,
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingRight: 10,
    },
    image: {
        width: 17,
        height: 17,
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_added: {
        borderRadius: 10,
        width: 160,
        height: 35,
        backgroundColor: '#9D9D9D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_added: {
        width: 17,
        height: 17,
    },
});

export default AddToCart;