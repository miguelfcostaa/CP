import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '@/contexts/CartContext';

const AddToCart = ({ item, isAdded }) => { 
    const { addToCart, removeFromCart, quantities, handleQuantityChange } = useCart();

    const quantity = quantities[item.id] || 0;

    const handleIncrease = () => {
        if (quantity >= 10) {
            alert('You can only add up to 10 items to your cart.');
            return;
        }
        else { 
            addToCart(item); 
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            handleQuantityChange(item.id, quantity - 1); 
        } else {
            removeFromCart(item.id); 
        }
    };

    return (
       <>
            {isAdded && quantity > 0 ? (
                <View style={styles.container_added}>
                    <TouchableOpacity onPress={handleDecrease} style={styles.buttonSub}>
                        <Image source={require('@/assets/icons/sub_icon.png')} style={styles.sub} />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{quantity}</Text>

                    <TouchableOpacity onPress={handleIncrease} style={styles.buttonPlus}>
                        <Image source={require('@/assets/icons/plus_icon.png')} style={styles.plus} />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={handleIncrease} style={styles.container}>
                    <Text style={styles.text}>ADD TO CART</Text>
                    <Image source={require('@/assets/icons/cart_icon.png')} style={styles.image} />
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#10CC1D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        gap: 10,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    image: {
        width: 17,
        height: 17,
    },
    container_added: {
        borderRadius: 10,
        width: 160,
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        gap: 25,
        backgroundColor: '#9D9D9D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonPlus: {
        backgroundColor: '#10CC1D',
        width: 30,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSub: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sub: {
        height: 33,
        width: 33,
    },
    plus: {
        height: 24,
        width: 24,
    },
});

export default AddToCart;
