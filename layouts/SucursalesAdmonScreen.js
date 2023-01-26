import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { getAllSucursales, atendOrder } from '../components/api';
import { useNavigation } from "@react-navigation/native";
import DetalleOrdenSucursalScreen from "./DetalleOrdenSucursalScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SucursalesAdmonScreen = () => {
  // const { currentSign } = React.useContext(AuthContext);

  const [allSucursales, setAllSucursales] = useState([]);
   
  const loadAllSucursales = async () => {
    const data = await getAllSucursales()
    setAllSucursales(data)
  }
  useEffect(() => {
    loadAllSucursales()
  }, [])

  const handleAtend = async (id) => {
    console.log('configuracion')
    //await atendOrder(id)
    //loadAllSucursales()
  }
  const [refresing, setRefresing] = useState(false)
  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadAllSucursales();
    setRefresing(false);
  })
  const navigation = useNavigation();
  if (allSucursales.message){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />
        <Text>{allSucursales.message}</Text>
        <FlatList style={{ width: '100%' }}
          data={allSucursales}
          keyExtractor={(item) => item.id_sucursal + ''}
          renderItem={({ item }) =>
            <View style={styles.itemContainer}>
              <Text style={styles.item}>Nombre: {item.message}</Text>
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
            data={allSucursales}
            keyExtractor={(item) => item.id_sucursal + ''}
            renderItem={({ item }) =>
              <View style={styles.itemContainer}>
                <TouchableOpacity>
                <Text style={styles.item}>Nombre: {item.nombre_sucursal}</Text>
                <Text style={styles.item}>Dirección: {item.direccion_sucursal}</Text>
                <Text style={styles.item}>Teléfono: {item.telefono_sucursal}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.accept} onPress={()=>handleAtend(item.id_sucursal)}> 
                <FontAwesome
                        name="cog"
                        /*color={colors.text}*/
                        size={40}
                    />
                    <Text>Actualizar</Text>
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

export default SucursalesAdmonScreen;


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


