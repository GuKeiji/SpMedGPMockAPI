import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './CSS/estilo.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/App'
import Paciente from './pages/paciente/paciente'
import Medico from './pages/medico/medico'
import Adm from './pages/adm/administradort'
import Mapas from './pages/mapas/mapas'

// const PermissaoAdm = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '3' ? ( 
//         // operador spread
//         <Component {...props} />
//       ) : (
//         <Redirect to="login" />
//       )
//     }
//   />
// );

// const PermissaoMedico = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '1' ? (
//         // operador spread
//         <Component {...props} />
//       ) : (
//         <Redirect to="login" />
//       )
//     }
//   />
// )

// const PermissaoPaciente = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '2' ? (
//         // operador spread
//         <Component {...props} />
//       ) : (
//         <Redirect to="login" />
//       )
//     }
//   />
// )

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component = {Adm} /> {/* Login */}
        <Route path = "/paciente" component = {Paciente}/>
        <Route path = "/medico" component = {Medico}/>
        <Route path = "/adm" component = {Adm}/>
        <Route path = "/mapas" component = {Mapas}/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
