import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../layouts/LoginScreen';
import SignInScreen from '../layouts/SignInScreen';


const RootStack = createStackNavigator();
//headerMode='none' 
const HomeStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
    </RootStack.Navigator>
);

export default HomeStackScreen;