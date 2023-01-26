import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { addProduct } from "../components/api";
//import { useTheme } from 'react-native-paper';
//import * as Colors from './styles/colores';

import { AuthContext } from '../components/context';

//import Users from '../model/users';

const AddProductAlmacenScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        nombre: '',
        precio: '',
        stock: '',
        check_textNombreChange: false,
        check_textPrecioChange: false,
        check_textStockChange: false,
        secureTextEntry: true,
        isValidNombre: true,
        isValidPrecio: true,
        isValidStock: true,
    });

    const [product, setProduct] = useState({});
    /*const { colors } = useTheme();*/

    const { signIn } = React.useContext(AuthContext);

    const textNombreChange = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                nombre: val,
                check_textNombreChange: true,
                isValidNombre: true
            });
        } else {
            setData({
                ...data,
                nombre: val,
                check_textNombreChange: false,
                isValidNombre: false
            });
        }
    }

    const textPrecioChange = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                precio: val,
                check_textPrecioChange: true,
                isValidPrecio: true
            });
        } else {
            setData({
                ...data,
                precio: val,
                check_textPrecioChange: false,
                isValidPrecio: false
            });
        }
    }

    const textStockChange = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                stock: val,
                check_textStockChange: true,
                isValidStock: true
            });
        } else {
            setData({
                ...data,
                stock: val,
                check_textStockChange: false,
                isValidStock: false
            });
        }
    }

    const handleValidNombre = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                isValidNombre: true
            });
        } else {
            setData({
                ...data,
                isValidNombre: false
            });
        }
    }

    const handleValidPrecio = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                isValidPrecio: true
            });
        } else {
            setData({
                ...data,
                isValidPrecio: false
            });
        }
    }

    const handleValidStock = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                isValidStock: true
            });
        } else {
            setData({
                ...data,
                isValidStock: false
            });
        }
    }

    const handleAddProduct = async (data3) => {
        
        setProduct({
            nombre: data3.nombre,
            precio: data3.precio,
            stock: data3.stock,
        })
        //console.log(product)
        try {
            return await addProduct({
                nombre: product.nombre,
                precio: product.precio,
                stock: product.stock,
            })
            //alert("Orden Realizada con Exito!")
        } catch (error) {
            console.log(error)
        }
    }

    const loginHandle = async (data2) => {

        /*const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );*/
         console.log(data2)
        if ( data2.nombre.length == 0 || data2.precio.length == 0 || data2.stock.length == 0) {
            Alert.alert('Datos Incorrectos!', 'Uno o más campos estan vacios.', [
                {text: 'Okay'}
            ]);
            return;
        }else{
            try {
               await addProduct({
                nombre: data2.nombre,
                precio: data2.precio,
                stock: data2.stock,
            });
            alert("Producto agregado exitosamente!")
        } catch (error) {
            console.log(error)
        }
        }
        
        /*else
        if( data.username.length < 4 || data.password.length < 8 ) {
            Alert.alert('Datos Incorrectos!', 'Verifique campo!', [
                {text: 'Okay'}
            ]);
            return;
        }*//*else{
            Alert.alert('Okay!', 'Okay!', [
                {text: 'Okay'}]);
            
        }*/
           // signIn(userName, password);
          // console.log(data.nombre)
           
         /*  setProduct({
            nombre: data.nombre,
            precio: data.precio,
            stock: data.stock,
        })*/
       // handleAddProduct(data);
        /*signIn(foundUser);
        const foundUser = () => {
            let user = userName;
            let pass = password;
            return user && pass;
        };*/
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
           
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, /*{ backgroundColor: colors.background }*/]}
            >
                <Text style={[styles.text_footer, { /*color: colors.text,*/ }]}>Agregar Producto</Text>
                <Text style={[styles.text_footer, { /*color: colors.text,*/ marginTop: 35 }]}>Nombre Producto</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="font"
                        /*color={colors.text}*/
                        size={20}
                    />
                    <TextInput
                        placeholder="Nombre Producto"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, /*{ color: colors.text }*/]}
                        autoCapitalize="none"
                        onChangeText={(val) => textNombreChange(val)}
                        onEndEditing={(e) => handleValidNombre(e.nativeEvent.text)}
                    />
                    {data.check_textNombreChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidNombre ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Campo vacío.</Text>
                    </Animatable.View>
                }




<Text style={[styles.text_footer, { /*color: colors.text,*/ marginTop: 35 }]}>Precio Producto</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="money"
                        /*color={colors.text}*/
                        size={20}
                    />
                    <TextInput
                        placeholder="Precio Producto"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, /*{ color: colors.text }*/]}
                        autoCapitalize="none"
                        onChangeText={(val) => textPrecioChange(val)}
                        onEndEditing={(e) => handleValidPrecio(e.nativeEvent.text)}
                    />
                    {data.check_textPrecioChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidPrecio ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Campo vacío.</Text>
                    </Animatable.View>
                }





<Text style={[styles.text_footer, { /*color: colors.text,*/ marginTop: 35 }]}>Stock Producto</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="archive"
                        /*color={colors.text}*/
                        size={20}
                    />
                    <TextInput
                        placeholder="Stock Producto"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, /*{ color: colors.text }*/]}
                        autoCapitalize="none"
                        onChangeText={(val) => textStockChange(val)}
                        onEndEditing={(e) => handleValidStock(e.nativeEvent.text)}
                    />
                    {data.check_textStockChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidStock ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Campo vacío.</Text>
                    </Animatable.View>
                }





                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data) }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={/*[*/styles.textSign/*,{ color:'#fff' }*//*]*/}>Agregar Producto</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>

    );
};

export default AddProductAlmacenScreen;

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
       // borderTopLeftRadius: 30,
       // borderTopRightRadius: 30,
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
    }
});