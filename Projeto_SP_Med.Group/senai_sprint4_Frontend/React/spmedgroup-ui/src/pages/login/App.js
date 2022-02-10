import { Component } from 'react';
import axios from 'axios';
import { 
  parseJwt
  // usuarioAutenticado
} from '../../services/auth';
// import { Link } from 'react-router-dom';

import logo from '../../Assets/logo.png';
import foto from '../../Assets/img_login_gradient.png';
import '../../CSS/estilo.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false,
    };
  }

  efetuarLogin = (evento) => {
    evento.preventDefault();
    this.setState({ erroMensagem: '', isLoading: true })
    axios.post('http://localhost:5000/api/Login', {
      emailUsuario: this.state.email,
      senhaUsuario: this.state.senha,
    })
      .then((resposta) => {
        debugger;
        if (resposta.status === 200) {
          localStorage.setItem('usuario-login', resposta.data.token);
          this.setState({ isLoading: false });
          let base64 = localStorage.getItem('usuario-login').split('.')[1];
          console.log(base64);
          console.log(this.props);
          console.log(parseJwt().role)
          console.log(parseJwt())
          if (parseJwt().role === '1') {
            this.props.history.push('/medico')
          } else if (parseJwt().role === '2') {
            this.props.history.push('/paciente')
          } else if (parseJwt().role === '3') {
            this.props.history.push('/adm')
          }
        }
      })

      .catch(() => {
        this.setState({
          erroMensagem: 'E-mail e/ou senha estão inválidos',
          isLoading: false,
        })
      })
  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value });
  }

  render() {
    return (
      <div>
        <main className="tela_login_fundo">
          <section className="fundo_login">
            <div className="form_login">
              <img src={logo} className="logo_login" alt="Logo do Sp Medical Group"></img>
              <form onSubmit={this.efetuarLogin} className="organizar_inputs">
                <input type="email" className="input_login" placeholder="Usuario" name="email"value={this.state.email} onChange={this.atualizaStateCampo}></input>
                <input type="password" className="input_login" placeholder="Senha" name="senha" value={this.state.senha} onChange={this.atualizaStateCampo}></input>
                <div className="organizar_btn">
                  {
                    this.state.isLoading === true && (
                      <button className="btn_login" type="submit" disabled >...Loading</button>
                    )
                  }
                  {
                    this.state.isLoading === false && (
                      <button 
                        className="btn_login"
                        type="submit"
                        disabled={this.state.email === '' || this.state.senha === '' ? 'none' : '' }>Entrar</button>
                    )
                  }
                </div>
              </form>
            </div>
            <img src={foto} className="img_login" alt=""></img>
          </section>
        </main>
      </div>
    );
  }
}