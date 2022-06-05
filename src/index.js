import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './Pages/Home/App';
import {
  Route,

  BrowserRouter as Router, Redirect,
  Switch
} from 'react-router-dom';
import './index.css';
import cadastro from './pages/cadastrarUsuario/cadastrarUsuario';
import TelaAcesso from './pages/acesso/telaAcesso'
import atualizarPerfil from './pages/atualizarUsuario/atualizarUsuario';
import democratizacao from './pages/democratizacao/democratizacao';
import democratizacaoAdm from './pages/democratizacao/democratizacaoAdm';
import redirecionar from './pages/redirecionar/redirecionar';
import redirecionarADM from './pages/redirecionar/redirecionarADM';
import decisao from './pages/democratizacao/decisoes';
import rankingAcompanhar from './pages/ranking/rankingAcompanhar';
import Carometro from './pages/carometro/carometro';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboardFuncionario';
import './assets/css/gp1style.css';
import CursosRapidos from './pages/cursos/cursosRapidos';
import CadastrarCursos from './pages/cursos/cadastrarCursos';
import ListaBeneficios from './pages/vantagens/listaBeneficios';
import CadastroBeneficios from './pages/vantagens/cadastroBeneficio';
import CadastrarEmpresa from './pages/empresas/cadastrarEmpresas';
import Perfil from './pages/perfil/perfil';
import MeusFavoritos from './pages/favorito/favorito';
import RequisicaoFuncionario from './pages/requisicaoFuncionarios/requisicaoFuncionario';
import reportWebVitals from './reportWebVitals';
import CadastrarAtividades from './pages/cadastrarAtividades/cadastrarAtividades';
import ValidarAtividades from './pages/validarAtividades/validarAtividades';
import AlterarSenha from './pages/alterarSenha/alterarSenha';
import AlterarSenhaRec from './pages/alterarSenha/alterarSenhaRec';
import esqueciMinhaSenha from './pages/esqueciMinhaSenha/esqueciMinhaSenha'
import Ranking from './pages/ranking/rankingUsuarios'
import Atividades from './pages/todasAtividades/todasAtividades.jsx';
import { parseJwt, usuarioAutenticado } from './services/auth';


const Logado = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() ?  (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);
const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === "1" ? (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);


const PermissaoGestor = ({ component: Component }) => (
  <Route
  render={(props) =>
    usuarioAutenticado() && parseJwt().role === "2"  ? (
      <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);
const PermissaoFuncionario = ({ component: Component }) => (
 <Route
   render={(props) =>
     usuarioAutenticado() && parseJwt().role === "3" ? (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
     )
   }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <PermissaoGestor path="/carometro" component={Carometro} />
        <Route exact path="/" component={TelaAcesso} />
        <Route path="/login" component={Login} />
        <PermissaoAdm path="/cadastro" component={cadastro} />
        <PermissaoAdm path="/atualizar" component={atualizarPerfil} />
        <Logado path="/democratizacao/:id" component={democratizacao} />
        <PermissaoGestor exact path="/democratizacaoAdm" component={democratizacaoAdm} />
        <Logado path="/dashboard" component={Dashboard} />
        <Logado path="/redirecionarADM" component={redirecionarADM} />
        <Logado path="/decisao" component={decisao} />
        <Logado path="/rankingAcompanhar" component={rankingAcompanhar} />

        <PermissaoGestor path="/CadastrarAtividades" component={CadastrarAtividades} />
        <PermissaoGestor path="/ValidarAtividades" component={ValidarAtividades} />
        <PermissaoGestor path="/TodasAtividades" component={Atividades} />
        <PermissaoGestor path="/RankingUsuarios" component={Ranking} />
        <Route path="/AlterarSenhaRec" component={AlterarSenhaRec} />
        <Route path="/EsqueciMinhaSenha" component={esqueciMinhaSenha} />
        <Logado path="/Redirecionamento" component={redirecionar} />
        <Logado path="/AlterarSenha" component={AlterarSenha} />
        <Route  path="/cursosRapidos" component={CursosRapidos} />
        <Route  path="/cadastrarCursos" component={CadastrarCursos} />
        <Route  path="/beneficios" component={ListaBeneficios} />
        <Route  path="/cadastrarEmpresa" component={CadastrarEmpresa} />
        <Route  path="/perfil" component={Perfil} />
        <Route  path="/meusFavoritos" component={MeusFavoritos} />
        <Route  path="/requisicaoFuncionario" component={RequisicaoFuncionario} />
        <Route  path="/beneficiosCadastrar" component={CadastroBeneficios} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);


ReactDOM.render(
  routing, document.getElementById('root')
);
reportWebVitals();
