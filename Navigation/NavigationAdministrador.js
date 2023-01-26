import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

//screens
import { AuthContext } from "../components/context";
import DetalleOrdenSucursalScreen from "../layouts/DetalleOrdenSucursalScreen";
import AlmacenScreen from "../layouts/AlmacenScreen";
import QrProductoScreen from "../layouts/QrProductoScreen";
import ProductsAlmacenScreen from "../layouts/ProdcutcsAlmacenScreen";
import AddProductAlmacenScreen from "../layouts/AddProductAlmacenScreen";
import AdministrativaScreen from "../layouts/AdministrativaScreen";
import SucursalesAdmonScreen from "../layouts/SucursalesAdmonScreen";
import ProductStockAdmonScreen from "../layouts/ProductStockAdmonScreen";
import UsersAdmonScreen from "../layouts/UsersAdmonScreen";
import QrAdmonScreen from "../layouts/QrAdmonScreen";

const Tab = createBottomTabNavigator();
const DetailsStack = createStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="MenuSucursales"
            screenOptions={{
                headerShown: false
                /*       headerStyle: {
                           backgroundColor: '#009387',
                       },
                       headerTintColor: '#fff',
                       headerTitleStyle: {
                           fontWeight: 'bold'
                       }*/
            }}

        >
            <Tab.Screen
                name="Menu Principal"
                component={DetailsStackScreen}
                options={({ navigation }) => ({
                    tabBarLabel: 'Menu Principal',
                    tabBarIcon: ({ color }) => (
                        <Icon name="grid-sharp" color={color} size={32} />
                    ),
                    tabBarActiveTintColor: '#fff',
                    //tabBarBadge: 3,
                    tabBarActiveBackgroundColor: '#009387',
                    /*     headerRight: () => (
                             <TouchableOpacity onPress={() => navigation.navigate("SolicitudSucursalScreen")}>
                                 <Text>Nuevo</Text>
                             </TouchableOpacity>
                         )*/
                })}
            />

            <Tab.Screen
                name="Lector QR Administrativo"
                component={QrStackScreen}
                options={{
                    tabBarLabel: 'Lector QR Administrativo',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-qr-code-sharp" color={color} size={26} />
                    ),
                    tabBarActiveTintColor: '#fff',
                    tabBarActiveBackgroundColor: '#009387',
                }}
            />

            <Tab.Screen
                name="Productos"
                component={ProductsAlmacenStackScreen}
                options={{
                    tabBarLabel: 'Productos',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="file-tray-stacked-sharp" color={color} size={26} />
                    ),
                    tabBarActiveTintColor: '#fff',
                    tabBarActiveBackgroundColor: '#009387',
                }}
            />

        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}



function DetailsStackScreen() {
    const { signOut } = React.useContext(AuthContext);
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <DetailsStack.Screen name="AdministrativaScreen" component={AdministrativaScreen} options={({ navigation }) => ({
                title: 'Menu Principal',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerRight: () => (

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { signOut(); }}>
                            <Text style={styles.exitbutton}>Salir</Text>
                        </TouchableOpacity>
                    </View>
                )

            })} />
            <DetailsStack.Screen name="SucursalesAdmonScreen" component={SucursalesAdmonScreen} options={{
                title: 'Sucursales',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }} />
            <DetailsStack.Screen name="ProductStockAdmonScreen" component={ProductStockAdmonScreen} options={{
                title: 'Productos y Stocks',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }} />
            <DetailsStack.Screen name="UsersAdmonScreen" component={UsersAdmonScreen} options={{
                title: 'Usuarios',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }} />
        </DetailsStack.Navigator>
    )
};

function QrStackScreen() {
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <DetailsStack.Screen name="QrAdmonScreen" component={QrAdmonScreen} options={({ navigation }) => ({
                title: 'Lector QR Administrativo',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                /*   headerRight: () => (
       
                       <View style={{ flexDirection: 'row' }}>
                           <TouchableOpacity onPress={() => navigation.navigate("SolicitudSucursalScreen")}>
                               <Text style={styles.addbutton}>Nuevo</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { signOut(); }}>
                               <Text style={styles.exitbutton}>Salir</Text>
                           </TouchableOpacity>
                       </View>
                   )*/

            })} />
        </DetailsStack.Navigator>
    )
};

function ProductsAlmacenStackScreen() {
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <DetailsStack.Screen name="ProductsAlmacenScreen" component={ProductsAlmacenScreen} options={({ navigation }) => ({
                title: 'Productos',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                /*   headerRight: () => (
       
                       <View style={{ flexDirection: 'row' }}>
                           <TouchableOpacity onPress={() => navigation.navigate("SolicitudSucursalScreen")}>
                               <Text style={styles.addbutton}>Nuevo</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { signOut(); }}>
                               <Text style={styles.exitbutton}>Salir</Text>
                           </TouchableOpacity>
                       </View>
                   )*/

            })} />
            <DetailsStack.Screen name="AddProductAlmacenScreen" component={AddProductAlmacenScreen} options={({ navigation }) => ({
                title: 'Agregar Productos',
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                /*   headerRight: () => (
       
                       <View style={{ flexDirection: 'row' }}>
                           <TouchableOpacity onPress={() => navigation.navigate("SolicitudSucursalScreen")}>
                               <Text style={styles.addbutton}>Nuevo</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { signOut(); }}>
                               <Text style={styles.exitbutton}>Salir</Text>
                           </TouchableOpacity>
                       </View>
                   )*/

            })} />
        </DetailsStack.Navigator>
    )
};



const styles = StyleSheet.create({
    addbutton: {
        color: '#ffffff',
        fontSize: 15,
        backgroundColor: '#818181',
        paddingRight: 15,
        paddingLeft: 15,
        padding: 10,
        alignItems: 'center',
        borderRadius: 28,
        marginRight: 15,
        /*      color: '#ffffff',
              marginRight: 20,
              fontSize: 15,
              borderRadius: 38,
              backgroundColor: '#818181',*/
        /*     textAlign: 'center',
             color: '#ffffff',
             fontSize: 15,
             marginRight: 20,
             border: '1px solid blue',
             borderRadius: '2px',*/
    },
    exitbutton: {
        color: '#ffffff',
        fontSize: 15,
        backgroundColor: 'red',
        paddingRight: 15,
        paddingLeft: 15,
        padding: 10,
        alignItems: 'center',
        borderRadius: 28,
        marginRight: 20,
        /*      color: '#ffffff',
              marginRight: 20,
              fontSize: 15,
              borderRadius: 38,
              backgroundColor: '#818181',*/
        /*     textAlign: 'center',
             color: '#ffffff',
             fontSize: 15,
             marginRight: 20,
             border: '1px solid blue',
             borderRadius: '2px',*/
    },
});
