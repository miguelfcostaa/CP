import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const AddToCart = ({ onAddToCart, onRemoveFromCart, isAdded  }) => { 

    const handleAddToCart = () => {
        if (onAddToCart) onAddToCart(); 
    };

    const handleRemoveFromCart = () => {
        if (onRemoveFromCart) onRemoveFromCart(); 
    };

    return (
        <TouchableOpacity onPress={isAdded ? handleRemoveFromCart : handleAddToCart}>
            <View style={isAdded ? styles.container_added : styles.container}>
                {isAdded ? (
                    <Image source={require('@/assets/icons/check_icon.png')} style={styles.icon_added} />
                ) : (
                    <>
                        <Text style={styles.text}>ADD TO CART</Text>
                        <Image source={require('@/assets/icons/cart_icon.png')} style={styles.image} />
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 35,
        flexDirection: 'row',
        backgroundColor: '#10CC1D',
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