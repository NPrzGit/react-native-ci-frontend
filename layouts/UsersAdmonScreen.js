import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { getAllUsers, atendOrder } from '../components/api';
import { useNavigation } from "@react-navigation/native";
import DetalleOrdenSucursalScreen from "./DetalleOrdenSucursalScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UsersAdmonScreen = () => {
  // const { currentSign } = React.useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);
   
  const loadAllUsers = async () => {
    const data = await getAllUsers()
    setAllUsers(data)
  }
  useEffect(() => {
    loadAllUsers()
  }, [])

  const handleAtend = async (id) => {
    console.log('configuracion')
    //await atendOrder(id)
    //loadAllSucursales()
  }
  const [refresing, setRefresing] = useState(false)
  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadAllUsers();
    setRefresing(false);
  })
  const navigation = useNavigation();
  if (allUsers.message){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />
        <Text>{allUsers.message}</Text>
        <FlatList style={{ width: '100%' }}
          data={allUsers}
          keyExtractor={(item) => item.id_sucursal + ''}
          renderItem={({ item }) =>
            <View style={styles.itemContainer}>
              <Text style={styles.item}>Usuarios: {item.message}</Text>
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
            data={allUsers}
            keyExtractor={(item) => item.id_sucursal + ''}
            renderItem={({ item }) =>
              <View style={styles.itemContainer}>
                <TouchableOpacity>
                <Text style={styles.item}>Sucursal: {item.nombre_sucursal}</Text> 
                <Text style={styles.item}>Usuario: {item.usuario_sucursal}</Text>
                <Text style={styles.item}>Tipo Usuario: {item.descripcion}</Text>
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

export default UsersAdmonScreen;


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


