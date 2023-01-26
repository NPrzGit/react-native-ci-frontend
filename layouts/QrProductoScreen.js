import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import { Text, StyleSheet, Button } from 'react-native';
import { getProduct } from '../components/api';
import { acceptOrder } from '../components/api';
import { denyOrder } from '../components/api';
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




const QrProductoScreen = () => {
    const [loading, setLoading] = useState(true);
    const [scanData, setScanData] = useState([]);
    const [dataqr, setDataqr] = useState({});
    const [permission, setPermission] = useState(true);
    const { currentId } = React.useContext(AuthContext);
    let sc = 0;
    /* const loadOrder = async () => {
         const order = await getOrder(scanData)
         setDataqr(order)
         console.log('entro load ' + dataqr)
       }*/

    useEffect(() => {
        requestCameraPermission();
    }, []);


    /*const loadOrder = async () => {
        const order = await getOrder(_data)
        console.log('await order: ' + order.rows)
        setScanData(order)
}*/


    const accept = async () => {
        let noOrden = JSON.parse(scanData[0].id_orden);
            //console.log(noOrden)
            try {
                await acceptOrder(noOrden)
                alert("Orden Aceptada")
                setScanData([])
                //console.log('entro ' + noOrden)
                //await response.json();
            } catch (error) {
                console.log(error)
            }
            
            //console.log('accept')
    }
    const deny = async () => {
        let noOrden = JSON.parse(scanData[0].id_orden);
            //console.log(noOrden)
            try {
                await denyOrder(noOrden)
                alert("Orden Rechazada")
                setScanData([])
                //console.log('deny')
                //setScanData(undefined)
            } catch (error) {
                console.log(error)
            }
            
            //console.log('accept')
    }

    const requestCameraPermission = async () => {
        try {
            const { status, granted } = await BarCodeScanner.requestPermissionsAsync();
            console.log(`Status: ${status}, Granted: ${granted}`);

            if (status === 'granted') {
                console.log('Access granted');
                setPermission(true);
            } else {
                setPermission(false);
            }
        } catch (error) {
            console.error(error);
            setPermission(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Text>Requesting permission ...</Text>;

    if (scanData) {


            if (typeof scanData[0] == 'undefined'){

                if (typeof scanData.message != 'undefined'){alert(scanData.message)}

            return (
                <View>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
                    <Text style={styles.text}>Producto: </Text>
                    <Button title="Escanear de nuevo" onPress={() => setScanData(undefined)}>
                        Scan Again
                    </Button>
                </View>
            )
        } else {
            return (
                <View>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
                    <Text style={styles.text}>Detalle Producto:</Text>
                    <Text style={styles.text}>Código Producto: {scanData[0].id_producto}</Text>
                    <Text style={styles.text}>Producto: {scanData[0].nombre_producto}</Text>
                    <Text style={styles.text}>Stock Actual: {scanData[0].stock_product}</Text>
                    <Text style={styles.text}>Fecha de última actualizacion del stock: {scanData[0].fecha_actualizacion_stock}</Text>
                    <Button title="Escanear de nuevo" onPress={() => setScanData(undefined)}>
                        Scan Again
                    </Button>
                </View>
            )
        }

    }

    if (permission) {
        return (
            <BarCodeScanner
                style={[styles.container]}
                onBarCodeScanned={({ type, data }) => {
                    try {
                        const loadOrder = async () => {
                            const order = await getProduct(_data)
                            //console.log('await order: ' + order.rows)
                            setScanData(order)
                    }

                        let _data = JSON.parse(data);

                       loadOrder();
                       //console.log('order '+ order)
                    } catch (error) {
                        console.error('Unable to parse string: ', error);
                    }
                }}
            >
                <Text style={styles.text}>Scan the QR code.</Text>
            </BarCodeScanner>
        );
    } else {
        return <Text style={styles.textError}>Permission rejected.</Text>;
    }
}

export default QrProductoScreen;

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
        //backgroundColor: '#009387',
        //padding: 20,
        /*marginVertical: 8,
        //borderRadius: 12,
        marginTop: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'*/
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      itemDetalle:{
        padding: 10, 
        paddingTop: 10, 
        backgroundColor: '#fff', 
        marginTop: 15,
      },
});