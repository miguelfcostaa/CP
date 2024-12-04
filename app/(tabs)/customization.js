import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { where, query } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomItem from '@/components/CustomItem';

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
                    setItemsGlasses(item);
                }

            } catch (error) {
                console.error("Erro ao buscar itens da personalização:", error.message);
            }
        };
        fetchShopItems();

    }, []);

    const updateColor = async (color) => {
        try {
            await AsyncStorage.setItem('catColor', color);
        } catch (error) {
            console.error('Error saving data', error);
        }
        log(color)
    };

    const log = (info) => {
        console.log(info)
    }

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
                    {/* Skin */}
                    <Text style={styles.categoryTitle}>Skin</Text>
                    <View style={styles.category}>
                        {itemsSkin.map((item) => {
                            return (
                                <TouchableOpacity
                                    style={[{ backgroundColor: item.name }, styles.color]}
                                    onPress={() => updateColor(item.name)}>

                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* Clothing */}
                    <Text style={styles.categoryTitle}>Clothing</Text>
                    <View style={styles.category}>
                        {itemsClothing.map((item) => {
                            return ( 
                                <TouchableOpacity>
                                    <CustomItem image={item.name}></CustomItem>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* Ties */}
                    <Text style={styles.categoryTitle}>Ties</Text>
                    <View style={styles.category}>
                        {itemsTies.map((item) => {
                            return (
                                <TouchableOpacity>
                                    <CustomItem image={item.name}></CustomItem>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* Glasses */}
                    <Text style={styles.categoryTitle}>Glasses</Text>
                    <View style={styles.category}>
                        {itemsGlasses.map((item) => {
                            return (
                                <TouchableOpacity>
                                    <CustomItem image={item.name}></CustomItem>
                                </TouchableOpacity>
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
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '5%',
        zIndex: 1,
    },
    category: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 5,
        height: "auto",
        width: "75%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 25,
    },
    color: {
        height: 30,
        width: 30,
        marginLeft: 10,
        borderWidth: 1.5,
        borderRadius: "100%",
    },
    categoryTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        width: "75%",
    }, 
    itemImage:{
        height: 50,
        width:50,
        marginLeft: 10,
        borderWidth:1.5
    }
});