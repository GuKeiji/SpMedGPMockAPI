import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { Component } from "react";
import axios from "axios";
import '../../CSS/estilo.css';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../Assets/logo.png';

class mapas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaLocalizacoes: [],
            showingInfoWindow: false,
            marcadorAtivo: {},
            lugar: {},
        }
    };

    BuscarLocalizacoes = () => {
        axios("http://localhost:5000/api/Localizacoes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaLocalizacoes: resposta.data });
                }
            }).catch(erro => console.log(erro))
    }

    cliqueMarcador = (props, marker, e) =>
        this.setState({
            lugar: props,
            marcadorAtivo: marker,
            showingInfoWindow: true
        });


    componentDidMount() {
        this.BuscarLocalizacoes()
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <header class="header_tela_paciente">
                    <div class="container_header">
                        <img class="logo_header" src={logo} alt="logo"></img>
                        <div class="container_links">
                            <Link className='container_links_link' to='/'>Home</Link>
                            <Link className='container_links_link' to='/mapas'>Localizações</Link>
                            <Link className='container_links_link' to='/'>Sign-up</Link>
                            <button className='container_links_button' onClick={this.logout} >Sair</button>
                        </div>
                    </div>
                </header>
                <main>
                    <Map google={this.props.google} zoom={12}
                        initialCenter={{
                            lat: -23.53620139908343,
                            lng: -46.64622506172682
                        }}>

                        {

                            this.state.listaLocalizacoes.map((item) => {
                                // console.log(item);

                                return (
                                    <Marker onClick={this.cliqueMarcador}
                                        id={item.id}
                                        title={item.endereco}
                                        name={item.endereco}
                                        position={{ lat: item.latitude, lng: item.longitude }} />
                                )
                            })
                        }

                        <InfoWindow
                            marker={this.state.marcadorAtivo}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1 style={{ fontSize: 14, color: "#82C0D9" }}>{this.state.lugar.name}</h1>
                            </div>
                        </InfoWindow>

                    </Map>
                </main>
            </div>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDBAKlR7YNlROT-q03Ra_Qpl_n_NiQRmdQ")
})(mapas)