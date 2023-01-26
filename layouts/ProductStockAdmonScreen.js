import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { getAllProductsStock, atendOrder } from '../components/api';
import { useNavigation } from "@react-navigation/native";
import DetalleOrdenSucursalScreen from "./DetalleOrdenSucursalScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductStockAdmonScreen = () => {
    // const { currentSign } = React.useContext(AuthContext);

    const [allProductStock, setAllProductStock] = useState([]);

    const loadAllProductStock = async () => {
        const data = await getAllProductsStock()
        setAllProductStock(data)
    }
    useEffect(() => {
        loadAllProductStock()
    }, [])

    const handleAtend = async (id) => {
        await atendOrder(id)
        loadAllProductStock()
    }
    const [refresing, setRefresing] = useState(false)
    const onRefresh = React.useCallback(async () => {
        setRefresing(true);
        await loadAllProductStock();
        setRefresing(false);
    })
    const navigation = useNavigation();
    if (allProductStock.message) {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <Text>{allProductStock.message}</Text>
                <FlatList style={{ width: '100%' }}
                    data={allProductStock}
                    keyExtractor={(item) => item.id_producto + ''}
                    renderItem={({ item }) =>
                        <View style={styles.itemContainer}>
                            <Text style={styles.item}>Productos: {item.message}</Text>
                        </View>}
                    refreshControl={
                        <RefreshControl
                            colors={["#78e08f"]}
                            refreshing={refresing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer2}>
                            <View style={{ width: 35 }}>
                                <Text style={styles.item2}>Id</Text>
                            </View>
                            <View style={{ width: 85 }}>
                                <Text style={styles.item2}>Producto</Text>
                            </View>
                            <View style={{ width: 55 }}>
                                <Text style={styles.item2}>Stock</Text>
                            </View>
                            <View style={{ width: 55 }}>
                                <Text style={styles.item2}>Precio</Text>
                            </View>
                            <View style={{ width: 110 }}>
                                <Text style={styles.item2}>      Última Actualización</Text>
                            </View>
                        </View>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <FlatList style={{ width: '100%' }}
                    data={allProductStock}
                    numColumns={1}
                    keyExtractor={(item) => item.id_producto + ''}
                    renderItem={({ item }) =>
                        <View style={styles.itemContainer}>
                            <View style={{ width: 20 }}>
                                <Text style={styles.item}>{item.id_producto}</Text>
                            </View>
                            <View style={{ width: 80 }}>
                                <Text style={styles.item}>{item.nombre_producto}</Text>
                            </View>
                            <View style={{ width: 50 }}>
                                <Text style={styles.item}>{item.stock_product}</Text>
                            </View>
                            <View style={{ width: 50 }}>
                                <Text style={styles.item}>{item.precio_producto}</Text>
                            </View>
                            <View style={{ width: 100 }}>
                                <Text style={styles.item}>{item.fecha_actualizacion_stock}</Text>
                            </View>
                        </View>}
                    refreshControl={
                        <RefreshControl
                            colors={["#78e08f"]}
                            refreshing={refresing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        );
    }
};

export default ProductStockAdmonScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        //padding: 20,
    },
    itemContainer: {
        backgroundColor: '#009387',
        padding: 20,
        marginVertical: 2,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemContainer2: {
        backgroundColor: '#009387',
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        color: '#ffffff',
    },
    item2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    accept: {
        alignItems: 'center',
    },
});


