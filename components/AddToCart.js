import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '@/contexts/CartContext';

const AddToCart = ({ item }) => { 
    const { addToCart, removeFromCart, quantities, handleQuantityChange } = useCart();
    const [customItemAdded, setCustomItemAdded] = useState(false);

    const quantity = quantities[item.id] || 0;
    const isAdded = quantity > 0;

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

    const handleAddCustomItem = () => {
        setCustomItemAdded(true);
        addToCart(item, 1); 
    };

    const handleRemoveCustomItem = () => {
        setCustomItemAdded(false);
        removeFromCart(item.id);
    }

    return (
       <>
            {item.isCustom && !customItemAdded ? (
                <TouchableOpacity onPress={handleAddCustomItem} style={styles.container}>
                    <Text style={styles.text}>ADD TO CART</Text>
                    <Image source={require('@/assets/icons/cart_icon.png')} style={styles.image} />
                </TouchableOpacity>

            ) : customItemAdded ? (
                <TouchableOpacity onPress={handleRemoveCustomItem} style={styles.container_added} >
                    <Image source={require('@/assets/icons/check_icon.png')} style={styles.icon_added} />
                </TouchableOpacity>
            ) : isAdded ? (
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
    disabledButton: {
        backgroundColor: '#9D9D9D', 
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
    icon_added: {
        width: 20,
        height: 20,
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
