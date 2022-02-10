import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import jwtDecode from 'jwt-decode';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
        };
    }

    realizarLogin = async () => {
        try {
            const resposta = await api.post('/Login', {
                emailUsuario: this.state.email,
                senhaUsuario: this.state.senha,
            });
            const token = resposta.data.token;
            console.warn(token);
            await AsyncStorage.setItem('userToken', token);
            const Role = jwtDecode(token).role;
            console.warn(Role);
            this.setState({email: ''})
            this.setState({senha: ''})            

            if (resposta.status == 200) {

                if (Role == 1) {
                    this.props.navigation.navigate('Medicos');
                }
                
                if (Role == 2) {
                    this.props.navigation.navigate('Pacientes');
                }

            }


        } catch (error) {
            console.warn(error);
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../../Assets/Login_fundo.png')}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.container_tela}>
                    <View style={styles.form}>
                        <Image style={styles.logo}
                            source={require('../../Assets/logo.png')}></Image>
                        <TextInput style={styles.input}
                            placeholder={'Email'}
                            placeholderTextColor={'#fff'}
                            keyboardType="email-address"
                            onChangeText={email => this.setState({ email })}></TextInput>
                        <TextInput style={styles.input}
                            placeholder={'Senha'}
                            placeholderTextColor={'#fff'}
                            keyboardType="default"
                            onChangeText={senha => this.setState({ senha })}
                            secureTextEntry={true}></TextInput>
                        <TouchableOpacity style={styles.btn_logar}
                            onPress={this.realizarLogin}>
                            <Text style={styles.btn_logar_text}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({

    overlay: {
        ...StyleSheet.absoluteFillObject,
    },

    //organiza a tela
    container_tela: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //formulário de login
    form: {
        backgroundColor: 'rgba(80, 73, 169, 0.86)',
        width: '90%',
        height: '40%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    //Logo
    logo: {
        width: 31,
        height: 31,
    },

    //input de email e senha
    input: {
        width: '60%',
        height: 35,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
    },

    //botão de logar
    btn_logar: {
        width: '25%',
        height: 35,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },

    //texto do botão de logar
    btn_logar_text: {
        color: '#fff',
        fontSize: 12,
    },
})