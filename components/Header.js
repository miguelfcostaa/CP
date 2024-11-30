import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useCoin } from '@/contexts/CoinContext';
import CoinOverlay from '@/components/CoinOverlay';

const Header = () => {

    const foodPercentage = 55;
    const happyPercentage = 75;
    const { coins } = useCoin();
    return (
        <>
            <View style={styles.container}>
                
                <View style={styles.happyOverlay}>
                    <Image
                        source={require('@/assets/icons/happy-overlay.png')}
                        style={styles.happyIcon}
                    />

                    <View style={styles.happyProgress}>
                        <View style={{...styles.happyProgressBox, width : `${happyPercentage}%` }} />
                    </View>
                </View>

                <View style={styles.foodOverlay}>
                    <Image
                        source={require('@/assets/icons/food-overlay.png')}
                        style={styles.foodIcon}
                    />

                    <View style={styles.foodProgress}>
                        <View style={{...styles.foodProgressBox, width : `${foodPercentage}%` }} />
                    </View>
                </View>

                <Image
                    source={require('@/assets/icons/settings_button.png')}
                    style={styles.settings}
                />
            </View>
            <View style={styles.coinContainer}>
                
                <CoinOverlay />

            </View>
        </>
        
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    settings: {
        width: 56,
        height: 56,
    },
    coinContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
    },
    coinOverlay: {
        width: 151,
        height: 55,
    },
    coins: {
        position: 'absolute',
        top: 7,
        left: 50,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
    },
    happyOverlay: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 100,
    },
    happyIcon: {
        width: 55,
        height: 55,
        zIndex: 3,
    },
    happyProgress: {
        zIndex: 0,
        width: 120,
        height: 44,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#AD5100',
        position: 'absolute',
        left: 25,
        zIndex: 0,
        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.3)',
    },
    happyProgressBox: {
        height: 40,
        backgroundColor: '#F67300',
        borderRadius: 20,
        position: 'absolute',
        alignSelf: 'flex-start',
        zIndex: 1,
    },
    foodOverlay: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 100,
    },
    foodIcon: {
        width: 55,
        height: 55,
        zIndex: 3,
    },
    foodProgress: {
        zIndex: 0,
        width: 120,
        height: 44,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#00A75C',
        position: 'absolute',
        left: 25,
        zIndex: 0,
        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.3)',
    },
    foodProgressBox: {
        height: 40,
        backgroundColor: '#2DDA8C',
        borderRadius: 20,
        position: 'absolute',
        alignSelf: 'flex-start',
        zIndex: 1,
    },
});


export default Header;