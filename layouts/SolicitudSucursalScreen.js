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



//import { useForm, Controller } from 'react-hook-form';
//import DropDownPicker from 'react-native-dropdown-picker';
//const { handleSubmit, control } = useForm();

const SolicitudSucursalScreen = ({ navigation }) => {
    //item = {nombre: ''};
    //const [items, setItems] = useState([]);
    const [orden, setOrden] = useState({});
    const [product, setProduct] = useState({});
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

        //setProduct(null)
        setProduct(datail)
        //console.log(product.key)
    }

    const addProduct = (detailProduct) => {
        //console.log(selected.row)
        setItems([...items, {
            ide: items.length,
            idProducto: product.key,
            nombreProducto: product.value,
            producto: detailProduct,
            sucursal: currentId(),
        }])


    }
    const sendOrder = async (items2) => {
        //console.log('primer dato')
        //console.log(items2[0].idProducto)
        //console.log(product.key)
        //console.log(data.selectid.length)
        //console.log(data.cantidad.length)
        //console.log("itesm2")
        //console.log(items2[0].idProducto)
        //console.log(items2.length)
        if (product.key != 0 && data.cantidad.length != 0 && items2.length != 0)

            try {
                const ordenGenerada = await putSendOrder(items2[0])
                //console.log(items2[0].idProducto,items2[0].producto,items2[0].sucursal)
                //console.log(ordenGenerada)
                //let noOrden = ordenGenerada
                //console.log(ordenGenerada)
                //setOrden('')
                //setOrden(ordenGenerada)

                try {
                    let newArray2 = items.map(async (item) => {
                        //console.log('pass')
                        //console.log(ordenGenerada)
                        return await putSendDetailOrder({
                            idOrden: ordenGenerada,
                            idProducto: item.idProducto,
                            //ide: item.ide,
                            //nombreProducto: item.nombreProducto,
                            cantidad: item.producto,
                            sucursal: item.sucursal
                        })
                    })
                    //console.log('realizada')
                    alert("Orden Realizada con Exito!")
                } catch (error) {
                    console.log(error)
                }

            } catch (error) {
                console.log(error)
            }
        else {
            alert("Datos Incompletos")
        }
        //console.log(userName)






        // await putSendOrder(items)
        /*setItems([...items, {
            ide: items.length,
            producto: userName,
        }])*/
        //datos.push(items)
        //console.log(items[0].producto)
        //datos = items
        //console.log(datos)


        /*for (let i = 0; i > items.length; i++){
          console.log('producto ' + items[i])
        }*/



        //let it = data.username
        //setItems([...items, userName]);
        //setItems(items.push(data.username));
        //console.log(items)
        //datos.concat(items)
        //console.log(datos)
        //items.map(item => console.log({items}))
        //datos.push([data.username, data.password])
        //console.log(datos.length)
        //console.log(datos)
        //setPedido(datos)
        //console.log(pedido)
        /* if (data.username.length == 0 || data.password.length == 0) {
             Alert.alert('Datos Incorrectos!', 'El campo de usuario y/o contraseña no pueden estar vacios.', [
                 { text: 'Okay' }
             ]);
             return;
         } else
             if (data.username.length < 4 || data.password.length < 8) {
                 Alert.alert('Datos Incorrectos!', 'Verifique campo!', [
                     { text: 'Okay' }
                 ]);
                 return;
             }
         signIn(userName, password);*/

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
                    onChangeText={(val) => textInputidChange(val)}
                    //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    //onSelect={() => console.log(selected)}
                    setSelected={setSelected}
                    //onChangeText={(p) => console.log(p)}
                    //setValue={() => console.log(allProducts.value)}
                    //onChangeItem={(data) => console.log(data.key, data.value)}
                    data={allProducts}
                    arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                    searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                    search={true}
                    boxStyles={{ borderRadius: 0 }} //override default styles
                //defaultOption={{ key: '1', value: 'Jammu & Kashmir' }}   //default selected option
                />

                <Text style={[styles.text_footer, /*{ color: colors.text }*/]}>Cantidad</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="cube"
                        /*color={colors.text}*/
                        size={20}
                    />
                    <TextInput
                        placeholder="Cantidad"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, /*{ color: colors.text }*/]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >

                        </Animatable.View>
                        : null}
                    <TouchableOpacity onPress={() => { addProduct(data.cantidad) }}>
                        <FontAwesome
                            name="plus-circle"
                            color={'green'}
                            /*color={colors.text}*/
                            size={38}
                        />
                    </TouchableOpacity>
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Recuerde que ningún campo puede estar vacío.</Text>
                    </Animatable.View>
                }

                <FlatList style={{ width: '100%' }}
                    data={items}
                    numColumns={1}
                    keyExtractor={(item) => item.ide + ''}
                    renderItem={({ item }) =>
                        <View style={styles.textDetalle}>
                            <Text style={styles.itemDetalle}>Código: {item.idProducto} Producto: {item.nombreProducto} Cantidad: {item.producto}</Text>
                        </View>
                    }
                />

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { sendOrder(items) }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={/*[*/styles.textSign/*,{ color:'#fff' }*//*]*/}>Realizar Solicitud</Text>
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
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    dropdownCompany: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
});