import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    TouchableWithoutFeedback,
    Button,
    ScrollView
} from 'react-native';
import ShopItem from '@/components/ShopItem';
import AddToCart from '@/components/AddToCart';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CoinOverlay from '@/components/CoinOverlay';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useCart } from '@/contexts/CartContext';
import { where, query } from 'firebase/firestore';


export default function Customization() {

    const router = useRouter();
    const [itemsSkin, setItemsSkin] = useState([]);
    const [itemsClothing, setItemsClothing] = useState([]);
    const [itemsTies, setItemsTies] = useState([]);
    const [itemsGlasses, setItemsGlasses] = useState([]);

    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                const itemsCollection = collection(db, 'customItems');
                let queryRef = query(itemsCollection, where("category", "==", "skin"))
                let itemsSnapshot = await getDocs(queryRef);
                if (itemsSnapshot.empty) {
                    console.log("Não há items da categoria 'skin'.");
                } else {
                    const item = itemsSnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
                    setItemsSkin(item);
                    console.log(item)
                }

                queryRef = query(itemsCollection, where("category", "==", "clothing"))
                itemsSnapshot = await getDocs(queryRef);
                if (itemsSnapshot.empty) {
                    console.log("Não há items da categoria 'clothing'.");
                } else {
                    const item = itemsSnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
                    setItemsClothing(item);
                }

                queryRef = query(itemsCollection, where("category", "==", "ties"))
                itemsSnapshot = await getDocs(queryRef);
                if (itemsSnapshot.empty) {
                    console.log("Não há items da categoria 'ties'.");
                } else {
                    const item = itemsSnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
                    setItemsTies(item);
                }

                queryRef = query(itemsCollection, where("category", "==", "glasses"))
                itemsSnapshot = await getDocs(queryRef);
                if (itemsSnapshot.empty) {
                    console.log("Não há items da categoria 'glasses'.");
                } else {
                    const item = itemsSnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
                    setItemsClothing(item);
                }

            } catch (error) {
                console.error("Erro ao buscar itens da personalização:", error.message);
            }
        };
        fetchShopItems();

    }, []);

    const log = (info) =>{
        console.log(info)
    }

const white = "white";
    return (
        <View style={styles.background}>
            <>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/home')} >
                        <Image
                            source={require('@/assets/icons/goBack_icon.png')}
                            style={styles.goBack}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Customization</Text>
                </View>

                {/* Categories */}
                <View style={styles.container}>
                    <View style={styles.category}>
                        {itemsSkin.map((item) => {
                            return (
                                <View style={[{ backgroundColor: item.name }, styles.color]}>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0067B0',
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
    goBack: {
        width: 48,
        height: 48,
        marginLeft: '5%',
        marginTop: '90%',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        right: "20%",
        marginTop: '15%',
    },
    container: {
        padding: 5,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    category: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        height: 50,
        width: "75%",
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        position: "absolute",
        padding:10
    },
    color: {
        height: 30,
        width: 30,
        marginLeft: 10,
        borderWidth: 1.5,
        borderRadius:"100%",
    }
});