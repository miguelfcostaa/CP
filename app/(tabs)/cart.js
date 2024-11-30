import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useCoin } from '@/contexts/CoinContext';
import CoinOverlay from '@/components/CoinOverlay';

export default function Cart() {
    const router = useRouter();

    const { cart, setIsAdded, setCartCount, removeFromCart, clearCart } = useCart();
    const { coins, setCoins } = useCoin();

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId); 
        setCartCount((prevCount) => prevCount - 1); 
        setIsAdded(false);
    };


    const handleClearCart = () => {
        setCartCount(0);
        clearCart(); 
    };

    const handleBuy = (total) => {
        setCoins(coins - total);
        handleClearCart();
        alert('Thank you for your purchase!');
        router.push('/shop');
    }

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <>
            <View style={styles.background}></View>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/shop')} >
                    <Image
                        source={require('@/assets/icons/goBack_icon.png')}
                        style={styles.goBack}
                    />
                </TouchableOpacity>

                <Text style={styles.title}> Cart </Text>
            </View>

            <View style={styles.coinContainer}>
                <CoinOverlay />
            </View>

            <View style={styles.box}>
                {cart.length === 0 ? (
                        <View style={styles.inputContainer}>
                            <Text style={styles.name}>Your cart is empty.</Text>
                        </View>
                ) : 
                (cart.map((item, index) => (
                    <View style={styles.flexBox} key={index}>
                        <View style={styles.inputContainer} >
                            <Text style={styles.name}> {item.name} </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.price}> {item.price} </Text>
                            <Image
                                source={require('@/assets/icons/coin-image.png')}
                                style={styles.coinImage}
                            />
                        </View>
                        <TouchableOpacity style={styles.removeContainer} onPress={() => handleRemoveFromCart(item.id)} >
                            <Image
                                source={require('@/assets/icons/remove_icon.png')}
                                style={styles.removeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                )))}
                <View style={styles.totalFlex}>
                    <Text style={styles.total}> Total: </Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.price}> {total} </Text>
                        <Image
                            source={require('@/assets/icons/coin-image.png')}
                            style={styles.coinImage}
                        />
                    </View>
                </View>

            </View>

            <View style={styles.buyButtonFlex}>
                <View style={styles.buyButton}>
                    <Button title='Buy' color={'white'} onPress={() => handleBuy(total)}/>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0067B0',
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        height: '17%',
        width: '100%',
        backgroundColor: '#007CCA',
        borderRadius: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        boxShadow: "0px -4px 13.2px 2px rgba(0, 0, 0, 0.25)",
        zIndex: 5,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '15%',
        marginRight: '35%',
    },
    goBack: {
        width: 48,
        height: 48,
        marginLeft: '5%',
        marginTop: '90%',
    },
    coinContainer: {
        backgroundColor: '#0074BB',
        borderRadius: 15,
        height: 'auto',
        width: '43%',
        marginLeft: '5%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        overflow: 'auto',
        
    },
    box: {
        width: '90%',
        height: '55%',
        margin: '5%',
        backgroundColor: '#0074BB',
        padding: 10,
        borderRadius: 10,
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    },
    inputContainer: {
        backgroundColor: '#007BC6',
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    price: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    coinImage: {
        width: 39,
        height: 39,
        alignSelf: 'center',
    },
    removeContainer: {
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    removeIcon: {
        width: 29,
        height: 29,
    },
    buyButtonFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buyButton: {
        justifyContent: 'center',
        width: 130,
        height: 40,
        backgroundColor: '#F90A0A',
        borderRadius: 15,
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    totalFlex: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: "auto",
        width: "100%",
    },
    total: {
        color: '#FFFFFF',
        fontSize: 24,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    totalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BC6',
        borderRadius: 10,
        width: "70%",
    },
    
});
