import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { getAllOrdersAlmacen, atendOrder } from '../components/api';
import { useNavigation } from "@react-navigation/native";
import DetalleOrdenSucursalScreen from "./DetalleOrdenSucursalScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SucursalesAdmonScreen from "./SucursalesAdmonScreen";

const AdministrativaScreen = () => {
  // const { currentSign } = React.useContext(AuthContext);

  const [allOrders, setAllOrders] = useState([]);
   
  const loadAllOrders = async () => {
    //const data = await getAllOrdersAlmacen()
    const data = [
      { opt: '1', opcion: 'Sucursales' },
      { opt: '2', opcion: 'Productos y Stock' },
      { opt: '3', opcion: 'Usuarios' },
      { opt: '4', opcion: 'Pedidos' },
  ];
    setAllOrders(data)
  }
  useEffect(() => {
    loadAllOrders()
  }, [])

  const handleAtend = async (id) => {
    await atendOrder(id)
    loadAllOrders()
  }
  const [refresing, setRefresing] = useState(false)
  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadAllOrders();
    setRefresing(false);
  })
  const navigation = useNavigation();
  if (allOrders.message){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />
        <Text>{allOrders.message}</Text>
        <FlatList style={{ width: '100%' }}
          data={allOrders}
          keyExtractor={(item) => item.id_orden + ''}
          renderItem={({ item }) =>
            <View style={styles.itemContainer}>
              <Text style={styles.item}>No. Orden: {item.message}</Text>
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
  }else{
    return (
        <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content" />
          <FlatList style={{ width: '100%' }}
            data={allOrders}
            keyExtractor={(item) => item.opt + ''}
            renderItem={({ item }) =>
            <TouchableOpacity onPress={() => 
              {item.opt == 1 ? (
                        navigation.navigate('SucursalesAdmonScreen')
                        )      
                        : item.opt == 2 ? (        
                         navigation.navigate('ProductStockAdmonScreen')
                        )
                        : item.opt == 3 ? (        
                          navigation.navigate('UsersAdmonScreen')
                         )
                         : item.opt == 4 ? (        
                          console.log('cuatro')
                         )
                         :
                          alert('Opción invalida')
                        }
                      
                      }>
            
                        
                        
              <View style={styles.itemContainer}>
                <Text style={styles.item}>{item.opcion}</Text>
              </View>
              </TouchableOpacity>}
              
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

export default AdministrativaScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#009387',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  item: {
    color: '#ffffff',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  accept: {
    alignItems: 'center',
  },
});


