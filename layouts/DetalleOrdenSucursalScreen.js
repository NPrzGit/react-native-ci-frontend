import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import { Text, StyleSheet, Button } from 'react-native';
import { getOrder } from '../components/api';
import { AuthContext } from "../components/context";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Button,
    FlatList
} from 'react-native';


const DetalleOrdenSucursalScreen = ({ navigation, route }) => {
    const [scanData, setScanData] = useState([]);
    const [detail, setDetail] = useState(false);
    const [prueba, setPrueba] = useState([]);

    const loadOrder = async () => {
        console.log(route.params.id)
        const order = await getOrder(route.params.id)
        setScanData(order)
        setDetail(true);
        setPrueba('asd')
    setPrueba('bsd')

    }
    useEffect(() => {
        loadOrder();
    }, [])
    
    
    
    //loadOrder();
    if (detail) {
       // console.log('hgkjhgkj'+prueba.row)
        return (
            <View>
                <Text style={styles.text}>No. Orden: {scanData[0].id_orden}</Text>
                <Text style={styles.text}>Fecha de solicitud: {scanData[0].fecha_orden}</Text>
                <Text style={styles.text}>Nombre Sucursal: {scanData[0].nombre_sucursal}</Text>
                <Text style={styles.text}>Detalle Orden:</Text>
                <Text style={styles.text}>Producto        Cantidad</Text>
                <FlatList style={{ width: '100%' }}
                    data={scanData}
                    numColumns={1}
                    keyExtractor={(item) => item.id_producto_detalle + ''}
                    renderItem={({ item }) =>
                        <View style={styles.textDetalle}>
                            <Text style={styles.itemDetalle}>{item.nombre_producto}</Text>
                            <Text style={styles.itemDetalle}>{item.cantidad_producto}</Text>
                        </View>
                    }
                />
            </View>
        )
    }
    return (
        <View>
            <Text>Esperando detalle...</Text>
        </View>
    )


}



export default DetalleOrdenSucursalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginTop: 15,
        backgroundColor: 'white'
    },
    textError: {
        color: 'red'
    },
    textDetalle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    itemDetalle: {
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        marginTop: 15,
    },
});