import { useState, useEffect } from 'react';
import axios from "axios";
import logo from '../../Assets/logo.png';
import seringa from '../../Assets/seringa.png';
import img_med from '../../Assets/img_form.png'

import '../../CSS/estilo.css';
import { Link, useHistory } from 'react-router-dom';

export default function ConsultaAdm() {
    const [listaConsulta, setListaConsulta] = useState([]);
    const [listaMedico, setListaMedico] = useState([]);
    const [listaPaciente, setListaPaciente] = useState([]);
    const [idPaciente, setIdPaciente] = useState('');
    const [idMedico, setIdMedico] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    function listarConsultas() {
        axios('https://620549d4161670001741b77b.mockapi.io/Consulta', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta)
                    setListaConsulta(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    };

    useEffect(listarConsultas, []);

    function listarMedicos() {
        axios('http://localhost:5000/api/Medicos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMedico(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    }

    useEffect(listarMedicos, []);

    function listarPacientes() {
        axios('http://localhost:5000/api/Pacientes', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaPaciente(resposta.data.lista)
                    console.log(listaPaciente)
                }
            })

            .catch(erro => console.log(erro))
    }

    useEffect(listarPacientes, []);

    function cadastrarConsulta(evento) {
        setIsLoading(true);

        evento.preventDefault()

        axios
            .post('https://620549d4161670001741b77b.mockapi.io/Consulta', {
                idPaciente: idPaciente,
                idMedico: idMedico,
                dataConsulta: dataConsulta
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Consulta cadastrada');
                    setIdMedico('');
                    setIdPaciente('');
                    setDataConsulta('');
                    listarConsultas();
                    setIsLoading(false);
                }
            })
            .catch(erro => console.log(erro), setIdMedico(''), setIdPaciente(''), setDataConsulta(''), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    }

    return (
        <div class="tela_paciente">
            <header class="header_tela_paciente">
                <div class="container_header">
                    <img class="logo_header" src={logo} alt="logo"></img>
                    <div class="container_links">
                        <Link className='container_links_link' to='/'>Home</Link>
                        <Link className='container_links_link' to='/mapas'>Localizações</Link>
                        <Link className='container_links_link' to='/'>Sign-up</Link>
                        <button className='container_links_button' onClick={logout} >Sair</button>
                    </div>
                </div>
            </header>
            <main class="container_main">
                <div class="titulo_pagina_box container">
                    <h1>Minhas Consultas</h1>
                    <img class="icone_injecao" src={seringa} alt="Icone de uma seringa de injeção"></img>
                </div>
                <table class="tabela_consultas">
                    <thead class="tabela_consultas_thead">
                        <tr>
                            <th>Médico</th>
                            <th>Paciente</th>
                            <th>Data a Consulta</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaConsulta.map((consulta) => {
                            console.log(consulta)
                            return (
                                <tr key={consulta.id}>
                                    <td>{consulta.Medico[0].nomeMedico}</td>
                                    <td>{consulta.Paciente[0].nomePaciente}</td>
                                    <td>{Intl.DateTimeFormat("pt-BR", {
                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                        hour: 'numeric', minute: 'numeric', hour12: false
                                    }).format(new Date(consulta.dataConsulta))}</td>
                                    <td>{consulta.descricao}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div class="cadastrar_consulta_box">
                    <h2>Nova Consulta</h2>
                    <div class="organizar_form">
                        <form onSubmit={cadastrarConsulta} class="form_cadastrar">
                            <select
                                className="input_select"
                                name="medico"
                                id="medico"
                                value={idMedico}
                                onChange={(campo) => setIdMedico(campo.target.value)}
                            >
                                <option value="0">Nome Médico</option>

                                {listaMedico.map((medico) => {
                                    return (
                                        <option key={medico.idMedico} value={medico.idMedico}>
                                            {medico.idUsuarioNavigation.nome}
                                        </option>
                                    )
                                })}
                            </select>
                            <select
                                className="input_select"
                                name="paciente"
                                id="paciente"
                                value={idPaciente}
                                onChange={(campo) => setIdPaciente(campo.target.value)}
                            >
                                <option value="0">Nome Paciente</option>

                                {listaPaciente.map((paciente) => {
                                    return (
                                        <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                            {paciente.idUsuarioNavigation.nome}
                                        </option>
                                    )
                                })}

                            </select>
                            {/* <input class="input_cadastrar" placeholder="Descrição" type="text"/> */}
                            <input
                                className="input_cadastrar_data"
                                type="datetime-local"
                                name="data"
                                value={dataConsulta}
                                onChange={(campo) => setDataConsulta(campo.target.value)}
                            />
                            <div class="organizar_btn_cadastrar">
                                {isLoading && (
                                    <button disabled className='btn_enviar' type='submit'>
                                        Carregando...
                                    </button>
                                )}
                                {!isLoading && (
                                    <button className='btn_enviar' type='submit'>
                                        Cadastrar
                                    </button>
                                )}
                            </div>
                        </form>
                        <img class="img_form" src={img_med} alt="Imagem de um Médico"></img>
                    </div>
                </div>
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
                    <img class="logo_header" src={logo} alt="logo" />
                    <p>Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde</p>
                </div>
            </footer>
        </div>
    )
}


// LISTAGEM DE CONSULTA
{/* {listaConsulta.map((consulta) => {
    return(
        <tr key={consulta.idConsulta}>
        <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</td>
        <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nome}</td>
        <td>{consulta.descricao}</td>
        <td>{consulta.idSituacaoNavigation.descricao}</td>
        <td>{consulta.dataConsulta}</td>
        </tr>
        )
    })} */}

// BOTÃO CADASTRAR
{/* {isLoading && (
        <button disabled className='btn' type = 'submit'>
        Carregando...
        </button>
        )}
        {!isLoading &&(
            <button className='btn' type='submit'>
            Cadastrar
            </button>
        )} */}

//SELECT DE MÉDICO
{/* <select
            name="medico"
            id="medico"
            value={idMedico}
            onChange={(campo) => setIdMedico(campo.target.value)}
            >
            <option value="0">Selecione o Médico</option>
            
            {listaMedico.map((medico) => {
                return (
                    <option key={medico.idMedico} value={medico.idMedico}>
                    {medico.idUsuarioNavigation.nome}
                    </option>
                    )
                })}
            </select> */}

// SELECT DE PACIENTE
{/* <select
                name="paciente"
                id="paciente"
                value={idPaciente}
                onChange={(campo) => setIdPaciente(campo.target.value)}
                >
                <option value="0">Selecione o Paciente</option>
                
                {listaPaciente.map((paciente) => {
                    return (
                        <option key={paciente.idPaciente} value={paciente.idPaciente}>
                        {paciente.idUsuarioNavigation.nome}
                        </option>
                        )
                    })}
                    
                </select> */}

// INPUT DE DATA
{/* <input
                    type="datetime-local"
                    name="data"
                    value={dataConsulta}
                    onChange = {(campo) => setDataConsulta(campo.target.value)}
                    /> */}