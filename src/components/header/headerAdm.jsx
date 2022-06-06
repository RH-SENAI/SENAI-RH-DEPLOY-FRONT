import { Link } from 'react-router-dom'
import '../../assets/css/header.css'
import logo from '../../assets/img/logo.svg'
import Perfil from '../../assets/img/perfil.png'
import logout from '../../assets/img/logout.png'
import setaBaixo from '../../assets/img/seta-para-baixo.png'
import seta from '../../assets/img/seta.svg'
import { useHistory } from "react-router-dom";
import sino from '../../assets/img/sino.svg'
import { useState } from 'react';
import { parseJwt } from '../../services/auth';


export default function HeaderAdm() {
    let history = useHistory();
    function logOut() {
        localStorage.removeItem("usuario-login");

        history.push("/");
    }
    return (
        <header className='header_g2'>
            <div className='container container_header_g2' >
                <div className='logo_header_g2'>
                    <Link to="/"> <img src={logo} alt="" /></Link>
                </div>

                <div class='select_header_g2'>
                    <p class='input_header_g2'>Vantagens <img src={setaBaixo} /></p>
                    <input type='hidden' name='some_name_tosetaBaixosetaBaixo_form' />
                    <div class='hidden_header_g2'>
                        <Link className="text_link_header_g2" to='/Beneficios'> <span>Descontos</span></Link>
                        <Link className="text_link_header_g2" to='/CursosRapidos'> <span> Cursos</span></Link>
                        <Link className="text_link_header_g2" to='/meusFavoritos'> <span> Meus Favoritos</span></Link>
                        <Link className="text_link_header_g2" to='/BeneficiosCadastrar' >  <span> Cadastrar Desconto </span> </Link>
                        <Link className="text_link_header_g2" to='/CadastrarCursos' > <span> Cadastrar Cursos </span>  </Link>
                        <Link className="text_link_header_g2" to='/cadastrarEmpresa' > <span> Cadastrar Empresa </span>  </Link>
                        <Link className="text_link_header_g2" to='/requisicaoFuncionario' > <span> Requisições de Funcionarios  </span>  </Link>
                    </div>
                </div>

                <div class='select_header_g2'>
                    <p class='input_header_g2'>Acompanhar<img src={setaBaixo} /></p>
                    <input type='hidden' name='some_name_to_form' />
                    <div class='hidden_header_g2'>
                        <Link className="text_link_header_g2" to='/carometro' ><span>Carômetro</span></Link>
                        <Link className="text_link_header_g2" to='/dashboard'> <span>Dashboard</span></Link>
                        <Link className="text_link_header_g2" to='/democratizacaoAdm'> <span>Democratização</span></Link>
                        <Link className="text_link_header_g2" to='/decisao'> <span>Decisões</span></Link>
                        <Link className="text_link_header_g2" to='/cadastro'> <span>Cadastro de Usuario</span></Link>
                    </div>
                </div>

                <div class='select_header_g2'>
                    <p class='input_header_g2'>Motivações<img src={setaBaixo} /> </p>
                    <input type='hidden' name='some_name_to_form' />
                    <div class='hidden_header_g2'>
                        <Link to='/TodasAtividades' className="text_link_header_g2" ><span>Todas Atividades</span> </Link>
                        <Link to='/ValidarAtividades' className="text_link_header_g2" ><span>Validar Atividades</span> </Link>
                        <Link to='/RankingUsuarios' className="text_link_header_g2" ><span>Ranking</span> </Link>
                        <Link to='/CadastrarAtividades' className="text_link_header_g2" ><span>Cadastrar Atividades</span> </Link>
                        <div class='select'>
                        </div>
                    </div>
                </div>

                <div className="img_perfil_g2" >
                {parseJwt().foto == 'imagem-padrao.png' ? 
                    <Link to="/perfil"> <img src={Perfil}  alt="Meu Perfil" /> </Link> 
                    : 
                    <Link to="/perfil"> <img className='foto_header' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + parseJwt().foto} alt="Meu Perfil" /> </Link>}
                </div>

                <img className='img_logout_header_g2' onClick={logOut} src={logout} alt="logout" />

            </div>

        </header >
    )
}