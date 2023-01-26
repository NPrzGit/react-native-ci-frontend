import React, { useEffect, useState } from 'react';
import HomeStackScreen from './Navigation/LoginStackScreen';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import HomeTabScreen from './layouts/HomeTabScreen';
import { View, Text, StyleSheet } from 'react-native-animatable';
import Navigation from './Navigation/Navigation';
import NavigationAlmacen from './Navigation/NavigationAlmacen';
import NavigationRepartidor from './Navigation/NavigationRepartidor';
import NavigationAdministrador from './Navigation/NavigationAdministrador';
import { ActivityIndicator } from 'react-native-paper';

import { AuthContext } from './components/context';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//importante AsyncStorage no esta intalado para IOS
import {AsyncStorage} from 'react-native';
import {getUsers} from './components/api'
//export default function App() { <Navigation/>
const App = () => {
  //const [isLoading, setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const [users, setUsers] = useState([])
  
 /* const loadTasks = async () => {
    const data = await getUsers(userName, password)
    setUsers(data)
    console.log(data)
    }*/
/*
     useEffect(()=>{
        loadTasks();
      },[])*/
  
  const authContext = React.useMemo(() => ({
    signIn: async (userName, password) => {
      //setUserToken('E1q6weDqda196A');
      //setIsLoading(false);
      let userToken;
      userToken = null;

      const res = await getUsers(userName, password)
     // await AsyncStorage.setItem('users', JSON.stringify(users));

      if (userName == res.usuario_sucursal && password == res.contrasena_sucursal) {
        userToken = 'asdf'
        setUsers(res)
        console.log(users)
        try{
          await AsyncStorage.setItem('userToken', userToken)
          await AsyncStorage.setItem('users', JSON.stringify(users));
          
        }catch(e){
          console.log(e);
        }
      }else{
        alert(res.message)
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      //setUserToken(null);
      //setIsLoading(false);
      try{
        await AsyncStorage.removeItem('userToken')
      }catch(e){
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('E1q6weDqda196A');
      setIsLoading(false);
    },
    currentSign: () => {
      return users.usuario_sucursal;
    },
    currentId: () => {
      return users.id_sucursal;
    },
  }));

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken')
      }catch(e){
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>


      {loginState.userToken != null && users.descripcion == 'Administrador' ? (
        <NavigationAdministrador/>
      )
        : loginState.userToken != null && users.descripcion == 'Sucursal' ? (
          <Navigation/>
        )
         : loginState.userToken != null && users.descripcion == 'Almacen' ? (
          <NavigationAlmacen/>
        )
          : loginState.userToken != null && users.descripcion == 'Repartidor' ? (
            <NavigationRepartidor/>
          )
            : loginState.userToken != null && users.descripcion == 'Contabilidad' ? (
              <Navigation/>
            )
              :
        <NavigationContainer>
          <HomeStackScreen/>
        </NavigationContainer>
      }
      {console.log(loginState.userToken)}

    </AuthContext.Provider>
  );
}

export default App;

