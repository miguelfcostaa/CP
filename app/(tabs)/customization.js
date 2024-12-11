import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import { CustomItem, imageMap } from '@/components/CustomItem';
import { useCat } from '@/contexts/CatContext';

export default function Customization() {
    const router = useRouter();
    const { setColor } = useCat();

    const [itemsSkin, setItemsSkin] = useState([]);
    const [itemsClothing, setItemsClothing] = useState([]);
    const [itemsBow, setItemsBow] = useState([]);
    const [itemsGlasses, setItemsGlasses] = useState([]);
    const [itemsLocked, setItemsLocked] = useState([]);

    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                const itemsCollection = collection(db, 'customItems');
                let queryRef = query(itemsCollection, where("category", "!=", "skin"))
                let itemsSnapshot = await getDocs(queryRef);
                if (itemsSnapshot.empty) {
                    console.log("Não há items nestas categorias.");
                } else {
                    const item = itemsSnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
                    setItemsLocked(item)
                }

                queryRef = query(itemsCollection, where("category", "==", "skin"))
                itemsSnapshot = await getDocs(queryRef);
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

                queryRef = query(itemsCollection, where("category", "==", "bow"))
                itemsSnapshot = await getDocs(queryRef);
                if (itemsSnapshot.empty) {
                    console.log("Não há items da categoria 'bow'.");
                } else {
                    const item = itemsSnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
                    setItemsBow(item);
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

    useFocusEffect(
        React.useCallback(() => {
            const fetchLockedClothes = async () => {
                try {
                    const lockedClothes = await AsyncStorage.getItem("lockedClothes");
                    if (lockedClothes) {
                        setItemsLocked(JSON.parse(lockedClothes));
                    }
                } catch (error) {
                    console.error("Error fetching locked clothes:", error);
                }
            };

            fetchLockedClothes();
        }, [])
    );

    const addLock = async () => {
        try {
            await AsyncStorage.setItem("lockedClothes", JSON.stringify(itemsLocked));
        }
        catch (er) {
            console.error('Error saving data', er);
        }
    }
    const update = async (itemName, itemStored) => {
        try {
            log("a guardar: " + itemName)
            const current = await AsyncStorage.getItem(itemStored)
            log("guardado: " + current)
            if (itemName !== current && itemName) {
                setColor(itemName);
                console.log("cor: " + itemName)
                await AsyncStorage.setItem(itemStored, itemName);
            }
            else if (itemStored !== "catColor") {
                await AsyncStorage.removeItem(itemStored)
            }
            //await AsyncStorage.setItem(itemStored, itemName);
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const log = (info) => {
        console.log(info)
    }
    addLock()
    return (
        <View style={styles.background}>
            <>
                <Image
                    source={require('@/assets/images/background-customization.png')}
                    style={styles.backgroundImage}
                />
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
                                    key={item.id}
                                    style={[{ backgroundColor: item.name }, styles.color]}
                                    onPress={() => update(item.name, "catColor")}>
                                    <Image
                                        source={imageMap[item.name]}
                                        style={styles.clothing}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* Clothing */}
                    <Text style={styles.categoryTitle}>Clothing</Text>
                    <View style={styles.category}>


                        {itemsClothing.map((item) => {
                            return (
                                <View key={item.id}>
                                    {/* {itemsLocked.map((i) => { */}
                                        <TouchableOpacity
                                            onPress={() => update(item.name, "catClothing")}
                                            disabled={itemsLocked.some((lockedItem) => lockedItem.name === item.name)}
                                        >
                                            <Image
                                                source={imageMap[item.name]}
                                                style={styles.clothing}
                                            />
                                        </TouchableOpacity>
                                        {/* {log(item.name)} */}
                                        {itemsLocked.some((lockedItem) => lockedItem.name === item.name) && (
                                            <Image
                                                source={require("@/assets/images/lock-icon.png")}
                                                style={styles.lock}
                                            />
                                        )}
                           

                                    {/* })} */}
                                </View>
                            )
                        })}

                    </View>
                    {/* Bows */}
                    <Text style={styles.categoryTitle}>Bows</Text>
                    <View style={styles.category}>
                    {itemsBow.map((item) => {
                            return (
                                <View key={item.id}>
                                    {/* {itemsLocked.map((i) => { */}
                                        <TouchableOpacity
                                            onPress={() => update(item.name, "catBow")}
                                            disabled={itemsLocked.some((lockedItem) => lockedItem.name === item.name)}
                                        >
                                            <Image
                                                source={imageMap[item.name]}
                                                style={styles.bow}
                                            />
                                        </TouchableOpacity>
                                        {/* {log(item.name)} */}
                                        {itemsLocked.some((lockedItem) => lockedItem.name === item.name) && (
                                            <Image
                                                source={require("@/assets/images/lock-icon.png")}
                                                style={styles.lock}
                                            />
                                        )}
                           

                                    {/* })} */}
                                </View>
                            )
                        })}
                    </View>

                    {/* Glasses */}
                    <Text style={styles.categoryTitle}>Glasses</Text>
                    <View style={styles.category}>
                    {itemsGlasses.map((item) => {
                            return (
                                <View key={item.id}>
                                    {/* {itemsLocked.map((i) => { */}
                                        <TouchableOpacity
                                            onPress={() => update(item.name, "catGlasses")}
                                            disabled={itemsLocked.some((lockedItem) => lockedItem.name === item.name)}
                                        >
                                            <Image
                                                source={imageMap[item.name]}
                                                style={styles.bow}
                                            />
                                        </TouchableOpacity>
                                        {/* {log(item.name)} */}
                                        {itemsLocked.some((lockedItem) => lockedItem.name === item.name) && (
                                            <Image
                                                source={require("@/assets/images/lock-icon.png")}
                                                style={styles.lock}
                                            />
                                        )}
                           

                                    {/* })} */}
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
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
    },
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
        height: 90,
        width: "75%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 25,
    },
    color: {
        top: "22%",
        height: 40,
        width: 40,
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
    clothing: {
        top: "25%",
        height: 33,
        width: 77,
        margin: 5,
    },
    bow: {
        height: 75,
        width: 75,
        margin: 5,
    },
    lock: {
        height: 30,
        width: 30,
        position: "absolute",
        left: "65%",
    }

});