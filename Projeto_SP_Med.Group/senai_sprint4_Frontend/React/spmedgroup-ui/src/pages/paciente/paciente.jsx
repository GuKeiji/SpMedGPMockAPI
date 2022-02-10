import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../CSS/estilo.css';
import logo from '../../Assets/logo.png';
import seringa from '../../Assets/seringa.png';
import { Link } from 'react-router-dom';

export default function Paciente() {
    const [listaMinhasConsultas, setListaMinhasConsultas] = useState([]);

    function buscarMinhasConsultas() {
        axios('http://localhost:5000/api/Consultas/Lista/Minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMinhasConsultas(resposta.data.listaConsulta)
                }
            })
            .catch(erro => console.log(erro))
    };

    useEffect(buscarMinhasConsultas, [])

    return (
        <div>
            <div class="tela_paciente">
                <header class="header_tela_paciente">
                    <div class="container_header">
                        <img class="logo_header" src={logo} alt="logo"></img>
                        <div class="container_links">
                        <Link to='/'>Home</Link>
                        <Link to='/adm'>Consultas</Link>
                        <Link to='/'>Sign-up</Link>
                        <button>Sair</button>
                        </div>
                    </div>
                </header>
                <main class="container_main_paciente">
                    <div class="titulo_pagina_box container">
                        <h1>Minhas Consultas</h1>
                        <img class="icone_injecao" src={seringa} alt="Icone de uma seringa de injeção"></img>
                    </div>
                    <table class="tabela_consultas">
                        <thead class="tabela_consultas_thead">
                            <tr>
                                <th>Médico</th>
                                <th>Situação</th>
                                <th>Data a Consulta</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                listaMinhasConsultas.map((consulta) => {
                                    return (

                                        <tr key={consulta.idConsulta}>
                                            <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</td>
                                            <td>{consulta.idSituacaoNavigation.descricao}</td>
                                            <td>{ Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta)) }</td>
                                            <td>{consulta.descricao}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </main>
                <footer class="footer_tela_paciente">

                    <div class="container_footer">
                        <ul class="lista_footer">
                            <li>Serviços</li>
                            <li>Consultas</li>
                            <li>Exames</li>
                            <li>Check-ups</li>
                            <li>Vacinas</li>
                            <li>Cirurgias</li>
                        </ul>
                        <img class="logo_header" src={logo} alt="logo"></img>
                        <p>Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}