import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import { Text, StyleSheet, Button } from 'react-native';
import { getOrder } from '../components/api';
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




const QrScreen = () => {
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

       // console.log(typeof scanData[0].id_sucursal_orden)
        // console.log('entro parrafo scandata: ')
        //if (typeof scanData[0].id_sucursal_orden == 'undefined') {
          //if (typeof scanData[0].id_orden == 'undefined') {
            if (typeof scanData[0] == 'undefined'){
             //   if (scanData.message){   
            //    console.log('arreglo ' + scanData[0].message)
            //console.log('si')
            //if (sc == 1){alert("No existe pedido"); sc = 0; console.log('sc '+sc)}
           // alert("No existe pedido")

           //console.log('nsin peidod '+scanData.message)
          // console.log(scanData.message)
                if (typeof scanData.message != 'undefined'){alert(scanData.message)}
           // alert(scanData.message)
            return (
                <View>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
                    <Text style={styles.text}>No. Orden: </Text>
                    <Text style={styles.text}>Fecha de solicitud: </Text>
                    <Text style={styles.text}>Nombre Sucursal: </Text>
                    <Button title="Escanear de nuevo" onPress={() => setScanData(undefined)}>
                        Scan Again
                    </Button>
                </View>
            )
        } else {
            return (
                /*<View>
                    <Text style={styles.text}>No. Orden: {scanData.id_orden}</Text>
                    <Text style={styles.text}>Fecha de solicitud: {scanData.fecha_orden}</Text>
                    <Text style={styles.text}>Nombre Sucursal: {scanData.nombre_sucursal}</Text>
                    <Text style={styles.text}>Detalle Orden:</Text>
                    <FlatList style={{ width: '100%' }}
                        data={scanData}
                        keyExtractor={(item) => item.id + ''}
                        renderItem={({ item }) =>
                            <View style={styles.itemContainer}>
                                <Text style={styles.item}>{item.id_orden}</Text>
                                <Text style={styles.item}>{item.nombre_producto}</Text>
                                <Text style={styles.item}>{item.cantidad_producto}</Text>
                            </View>}
                    />
                    <Button color="green" title="Aceptar" onPress={() => setScanData(undefined)}>
                        Scan Again
                    </Button>
                    <Button color="red" title="Rechazar" onPress={() => setScanData(undefined)}>
                        Scan Again
                    </Button>
                    <Button title="Escanear de nuevo" onPress={() => setScanData(undefined)}>
                        Scan Again
                    </Button>
                </View>*/
                <View>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
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
                    <Button color="green" title="Aceptar" onPress={() => accept(scanData[0].id_orden)}>
                        Scan Again
                    </Button>
                    <Button color="red" title="Rechazar" onPress={() => deny(scanData[0].id_orden)}>
                        Scan Again
                    </Button>
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
                        // console.log(type);
                        //console.log(data);
                        const loadOrder = async () => {
                            const order = await getOrder(_data)
                            console.log('await order: ' + order.rows)
                            setScanData(order)
                    }
                        //console.log(typeof data);
                        let _data = JSON.parse(data);
                        //setScanData(_data);
                        //console.log('_data: ' + _data)
                        /*  async function loadOrder() {
                              const order = await getOrder(data)
                              setDataqr(order)
                            }*/
                       /* const loadOrder = async () => {
                            const order = await getOrder(_data)
                            console.log('await order: ' + order.rows)
                            //if (order.message != ' '){console.log(order.message); order.message = ' ';}
                            //console.log("ordermessage" + order.message)
                            // setDataqr(order)
                            //  if (typeof order.id_sucursal == 'undefined'){
                            // console.log('si')
                            //  alert(order.message)
                            //  }
                            //if (order.rows == 'undefined'){alert("No existe pedido")}
                           // console.log(sc)
                            //if (sc == 1){alert("No existe pedido"); sc = 0; console.log('sc '+sc)}
                            setScanData(order)
                        }*/
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

export default QrScreen;

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