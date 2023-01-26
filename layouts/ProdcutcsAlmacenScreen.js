import React, { useState, useCallback, useEffect } from "react";
import SelectList from 'react-native-dropdown-select-list'
import { getAllProducts, putSendOrder, putSendDetailOrder } from "../components/api";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    FlatList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from "../components/context";
import react from "react";
import { set } from "react-hook-form";
import { getProduct } from '../components/api';



//import { useForm, Controller } from 'react-hook-form';
//import DropDownPicker from 'react-native-dropdown-picker';
//const { handleSubmit, control } = useForm();

const SolicitudSucursalScreen = ({ navigation }) => {
    //item = {nombre: ''};
    //const [items, setItems] = useState([]);
    const [orden, setOrden] = useState({});
    const [product, setProduct] = useState({});
    const [detailProduct, setDetailProduct] = useState({});
    const [selected, setSelected] = React.useState("");
    const [allProducts, setAllProducts] = useState([{}]);
    const loadAllProducts = async () => {
        const productsData = await getAllProducts()
        //console.log(productsData)
        setAllProducts(productsData)
        //console.log('asd'+allProducts)
        let newArray = productsData.map((item) => {
            //console.log(allProducts)
            return ({ key: item.id_producto, value: item.nombre_producto })
        })
        //console.log(newArray)
        setAllProducts(newArray)
        //console.log(allProducts)
    }
    useEffect(() => {
        loadAllProducts()
    }, [])
    const dataa = [
        { key: '1', value: 'Jammu & Kashmir' },
        { key: '2', value: 'Gujrat' },
        { key: '3', value: 'Maharashtra' },
        { key: '4', value: 'Goa' },
    ];

    const [items, setItems] = useState([]);

    const [data, setData] = React.useState({
        selectid: '',
        cantidad: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    //const [pedido, setPedido] = useState([]);
    let datos = [{}];
    /*const { colors } = useTheme();*/

    const { signIn } = React.useContext(AuthContext);
    const { currentId } = React.useContext(AuthContext);


    const textInputChange = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                cantidad: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                cantidad: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const textInputidChange = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                selectid: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                selectid: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const selectedProduct = (datail) => {

        
        setProduct(datail)
        
        setDetailProduct(null)
        

    }

    const addProduct = (detailProduct) => {

        setItems([...items, {
            ide: items.length,
            idProducto: product.key,
            nombreProducto: product.value,
            producto: detailProduct,
            sucursal: currentId(),
        }])


    }
    const sendOrder = async () => {

        if (product.key != null){
            try {
                const pro = await getProduct(product.key)
    
                setDetailProduct(pro)
    
            } catch (error) {
                console.error('Unable to parse string: ', error);
            }
           // console.log(detailProduct)
        }
        else {
            alert("Seleccione un producto")
        }
    }



    return (



        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                animation="fadeInDown"
                style={[styles.footer, /*{ backgroundColor: colors.background }*/]}
            >

                <Text style={[styles.text_footer, /*{ color: colors.text }*/]}>Producto</Text>
                
                <SelectList
                    onSelect={() => selectedProduct(allProducts[selected - 1])}
                    //onPress={()=>loadAllProducts()}
                    onChangeText={(val) => textInputidChange(val)}
                    setSelected={setSelected}
                    data={allProducts}
                    arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                    searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                    search={true}
                    boxStyles={{ borderRadius: 0 }} //override default styles
                //defaultOption={{ key: '1', value: 'Jammu & Kashmir' }}   //default selected option
                />
                
                <FlatList style={{ width: '100%' }}
                    data={detailProduct}
                    numColumns={1}
                    keyExtractor={(item) => item.ide + ''}
                    renderItem={({ item }) =>
                        <View style={styles.textDetalle}>
                            <Text style={styles.itemDetalle}>Detalle Producto</Text>
                            <Text style={styles.itemDetalle}><FontAwesome name="cube" size={20} />Código: {item.id_producto}</Text>
                            <Text style={styles.itemDetalle}><FontAwesome name="cube" size={20} />Producto: {item.nombre_producto}</Text>
                            <Text style={styles.itemDetalle}><FontAwesome name="cube" size={20} />Stock disponible: {item.stock_product}</Text>
                            <Text style={styles.itemDetalle}><FontAwesome name="cube" size={20} />Fecha última actualización stock: {item.fecha_actualizacion_stock}</Text>
                        </View>
                    }
                />

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => navigation.navigate('AddProductAlmacenScreen')}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.searchButton}
                        >
                            <Text style={/*[*/styles.textSearchButton/*,{ color:'#fff' }*//*]*/}>
                                <FontAwesome
                                    name="plus-circle"
                                    /*color={colors.text}*/
                                    size={20}
                                />Agregar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => { sendOrder() }}
                    >
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.searchButton}
                        >
                            <Text style={/*[*/styles.textSearchButton/*,{ color:'#fff' }*//*]*/}>
                                <FontAwesome
                                    name="search"
                                    /*color={colors.text}*/
                                    size={20}
                                />Buscar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => { sendOrder() }}
                    >
                        <LinearGradient
                            colors={['#FFD400', '#FFDD3C', '#FFEA61']}
                            style={styles.searchButton}
                        >
                            <Text style={/*[*/styles.textSearchButton/*,{ color:'#fff' }*//*]*/}>
                                <FontAwesome
                                    name="info-circle"
                                    /*color={colors.text}*/
                                    size={20}
                                />Actualizar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => { loadAllProducts() }}
                    >
                        <LinearGradient
                            colors={['#FFD400', '#FFDD3C', '#FFEA61']}
                            style={styles.searchButton}
                        >
                            <Text style={/*[*/styles.textSearchButton/*,{ color:'#fff' }*//*]*/}>
                                <FontAwesome
                                    name="info-circle"
                                    /*color={colors.text}*/
                                    size={20}
                                />Listar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </View>
    );
}

export default SolicitudSucursalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        //alignItems: 'center',
        marginTop: 50,
        //flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    searchButton: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSearchButton: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    dropdownCompany: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    textDetalle: {
        flex: 1,
        //flexDirection: 'row',
        marginTop: 35,
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      itemDetalle:{
        padding: 10, 
        //paddingTop: 10, 
        backgroundColor: '#fff', 
        
      },
});