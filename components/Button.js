import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradiente() {
    return (
        <TouchableOpacity style={styles.containerbutton}>
            <LinearGradient
                colors={['#0099ff', '#0099ff', '#192f6a']}
                style={styles.button}>
                <Text style={styles.textbutton}>Iniciar Sesión</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerbutton: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingRight: 30,
        paddingLeft: 30,
        padding: 20,
        alignItems: 'center',
        borderRadius: 28,
    },
    textbutton: {
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
    },
});