import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useCoin } from '@/contexts/CoinContext';

const CoinOverlay = () => {
    
    const { coins } = useCoin();

    return (
        <View style={styles.coinOverlay}>
            <Image
                source={require('@/assets/icons/coin-image.png')}
                style={styles.coinIcon}
            />

            <View style={styles.coinProgress}>
                <Text style={styles.coinText}> {coins} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    coinOverlay: {
        display: 'flex',
        flexDirection: 'row',
    },
    coinIcon: {
        width: 54,
        height: 54,
        zIndex: 3,
    },
    coinProgress: {
        zIndex: 0,
        width: 120,
        height: 44,
        backgroundColor: '#2E4464',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#223249',
        position: 'absolute',
        left: 25,
        zIndex: 0,
        justifyContent: 'center',
        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.3)',
    },
    coinText: {
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        marginRight: 15,
    },
});

export default CoinOverlay;
