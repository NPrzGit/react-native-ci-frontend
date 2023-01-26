import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

//screens
import RepartidorScreen from "../layouts/RepartidorScreen";
import QrRepartidorScreen from "../layouts/QrRepartidorScreen";
import { AuthContext } from "../components/context";
import SolicitudSucursalScreen from "../layouts/SolicitudSucursalScreen";
import DetalleOrdenSucursalScreen from "../layouts/DetalleOrdenSucursalScreen";


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
                name="Pedidos En Tránsito"
                component={DetailsStackScreen}
                tapOnTabNavigator = {() =>
                    tconsole.log('oresss')
                  }
                options={({ navigation }) => ({
                    tabBarLabel: 'Pedidos En Tránsito',
                    tabBarIcon: ({ color }) => (
                        <Icon name="archive-sharp" color={color} size={32} />
                    ),
                    tabBarActiveTintColor: '#fff',
                    tabBarBadge: 3,
                    tabBarActiveBackgroundColor: '#009387',
                    /*     headerRight: () => (
                             <TouchableOpacity onPress={() => navigation.navigate("SolicitudSucursalScreen")}>
                                 <Text>Nuevo</Text>
                             </TouchableOpacity>
                         )*/
                })}
            />

            <Tab.Screen
                name="Lector QR"
                component={QrStackScreen}
                options={{
                    tabBarLabel: 'Lector QR',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-qr-code-sharp" color={color} size={26} />
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
        <DetailsStack.Screen name="RepartidorScreen" component={RepartidorScreen} options={({ navigation }) => ({
            title: 'Pedidos En Tránsito',
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
        <DetailsStack.Screen name="DetalleOrdenSucursalScreen" component={DetalleOrdenSucursalScreen} options={{
            title: 'Detalle Orden Sucursal',
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
        <DetailsStack.Screen name="QrRepartidorScreen" component={QrRepartidorScreen} options={({ navigation }) => ({
            title: 'Lector QR',
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
