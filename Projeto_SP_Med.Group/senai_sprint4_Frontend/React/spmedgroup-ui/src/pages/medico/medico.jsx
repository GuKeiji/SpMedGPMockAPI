import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../CSS/estilo.css';
import logo from '../../Assets/logo.png';
import seringa from '../../Assets/seringa.png';
import icon_edit from '../../Assets/icon_edit.png'
import { Link } from 'react-router-dom';

export default function Medico() {
    const [listaConsul, setListaConsul] = useState([]);
    const [listaMinhasConsultas, setListaMinhasConsultas] = useState([]);
    const [idConsulta, setIdConsulta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function listarConsultas() {
        axios('http://localhost:5000/api/Consultas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsul(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };

    useEffect(listarConsultas, []);

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

    function alterarDescricao(event) {

        setIsLoading(true);

        event.preventDefault();

        axios.patch("http://localhost:5000/api/Consultas/AlterarDescricao/" + idConsulta, {
            descricao: descricao
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Descrição alterada');

                    buscarMinhasConsultas();
                    setIsLoading(false);
                }
            })
            .catch(erro => console.log(erro), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    }

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
                <main class="container_main_medico">
                    <div class="titulo_pagina_box container">
                        <h1>Minhas Consultas</h1>
                        <img class="icone_injecao" src={seringa} alt="Icone de uma seringa de injeção"></img>
                    </div>
                    <table class="tabela_consultas">
                        <thead class="tabela_consultas_thead">
                            <tr>
                                <th>Paciente</th>
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
                                            <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nome}</td>
                                            <td>{consulta.idSituacaoNavigation.descricao}</td>
                                            <td>{Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                                hour: 'numeric', minute: 'numeric', hour12: false
                                            }).format(new Date(consulta.dataConsulta))}</td>
                                            <td>{consulta.descricao}</td>
                                            {/* <td><button className="btn_edit" ><img src={icon_edit} alt="Icone de editar" /></button></td> */}
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <form onSubmit={alterarDescricao} className="box_alterar_descricao">
                        <h2>Alterar Descrição</h2>
                        <select
                            className="input_select"
                            name="consulta"
                            id="consulta"
                            value={idConsulta}
                            onChange={(campo) => setIdConsulta(campo.target.value)}
                        >
                            <option value='0'>Selecione a Consulta</option>

                            {listaMinhasConsultas.map((consulta) => {
                                return (
                                    <option key={consulta.idConsulta} value={consulta.idConsulta}>
                                        {consulta.idPacienteNavigation.idUsuarioNavigation.nome}/Cpf:{consulta.idPacienteNavigation.cpf}/Data:{Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                                hour: 'numeric', minute: 'numeric', hour12: false
                                            }).format(new Date(consulta.dataConsulta))}
                                    </option>
                                )
                            })}
                        </select>
                        <input className="input_cadastrar" type="text" value={descricao} onChange={(campo) => setDescricao(campo.target.value)} placeholder="Nova Descrição" />
                        {isLoading && (
                            <button disabled className='btn_enviar' type='submit'>
                                Carregando...
                            </button>
                        )}
                        {!isLoading && (
                            <button className='btn_enviar' type='submit'>
                                Alterar
                            </button>
                        )}
                    </form>
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