import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { getAllOrdersAlmacen, atendOrder } from '../components/api';
import { useNavigation } from "@react-navigation/native";
import DetalleOrdenSucursalScreen from "./DetalleOrdenSucursalScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AlmacenScreen = () => {
  // const { currentSign } = React.useContext(AuthContext);

  const [allOrders, setAllOrders] = useState([]);
   
  const loadAllOrders = async () => {
    const data = await getAllOrdersAlmacen()
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
            keyExtractor={(item) => item.id_orden + ''}
            renderItem={({ item }) =>
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('DetalleOrdenSucursalScreen',{id: item.id_orden})}>
                <Text style={styles.item}>No. Orden: {item.id_orden}</Text>
                <Text style={styles.item}>Fecha solicitud: {item.fecha_orden}</Text>
                <Text style={styles.item}>Destino sucursal: {item.nombre_sucursal}</Text>
                <Text style={styles.item}>Estado Orden: {item.estado}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.accept} onPress={()=>handleAtend(item.id_orden)}> 
                <FontAwesome
                        name="check-circle"
                        /*color={colors.text}*/
                        size={40}
                    />
                    <Text>Atendido</Text>
                </TouchableOpacity>
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

export default AlmacenScreen;


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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    color: '#ffffff',
  },
  accept: {
    alignItems: 'center',
  },
});


