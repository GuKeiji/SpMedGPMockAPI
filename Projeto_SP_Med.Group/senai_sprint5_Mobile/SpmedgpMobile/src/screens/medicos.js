import React, { Component } from 'react';
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    FlatList,
    TextInput,
    ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Medicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
        };
    }

    buscarConsultas = async () => {
        try {
            // console.warn('Buscando...')

            const token = await AsyncStorage.getItem('userToken');

            const resposta = await api.get('/Consultas/Lista/Minhas', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (resposta.status == 200) {
                const listaDeConsultas = resposta.data.listaConsulta
                this.setState({ listaConsultas: listaDeConsultas });
            }
        }

        catch (error) {
            console.warn(error)
        }

    }

    
    logout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        this.buscarConsultas();
    }



    render() {
        return (
            <View style={styles.body}>
                <View style={styles.header}>
                    <View style={styles.container_header}>
                        <Image style={styles.logo}
                            source={require('../../Assets/logo.png')}>
                        </Image>
                        <TouchableOpacity onPress={this.logout}>
                            <Text style={styles.logout_text}>Logout</Text>
                            {/* <Image style={styles.menu_hamburguer}
                                source={require('../../Assets/menu_hamburger.png')}></Image> */}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main}>
                    <TouchableOpacity style={styles.btn_atualizar} onPress={this.buscarConsultas}>
                        <Text style={styles.btn_atualizar_text}>Atualizar</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.idConsulta}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.container_consultas}>
            <View style={styles.container_consulta}>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Paciente</Text>
                    <Text style={styles.dados}>{item.idPacienteNavigation.idUsuarioNavigation.nome}</Text>
                </View>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Situação</Text>
                    <Text style={styles.dados}>{item.idSituacaoNavigation.descricao}</Text>
                </View>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Data da Consulta</Text>
                    <Text style={styles.dados}>{moment(item.dataConsulta).format('L')}</Text>
                </View>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Descrição</Text>
                </View>
                <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    //body
    body: {
        flex: 1,
    },

    //header
    header: {
        // flexDirection: 'row',
        backgroundColor: '#5049A9',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: '50%',
    },

    logo: {
        width: 24,
        height: 25,
    },

    logout_text: {
        color: '#fff',
        textTransform: 'uppercase',
    },

    menu_hamburguer: {
        width: 25,
        height: 25,
    },

    //main
    main: {
        // backgroundColor: '#ff0000',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        // height: 629
    },

    btn_atualizar: {
        backgroundColor: '#5049A9',
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 5,
        borderRadius: 6,
    },

    btn_atualizar_text: {
        color: '#fff',
        fontWeight: 'bold',
    },

    container_consultas: {
        width: 300,
        height: 144,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    container_consulta: {
        backgroundColor: '#5049A9',
        width: '100%',
        height: 144,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container_dados: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 20,
    },

    titulos: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },

    dados: {
        fontSize: 12,
        fontWeight: 'light',
        color: '#fff',
    },

    descricao: {
        // backgroundColor: '#ff0000',
        alignItems: 'flex-start',
        width: '90%',
        height: 50,
        fontSize: 12,
        fontWeight: 'light',
        color: '#fff',
    },

})

