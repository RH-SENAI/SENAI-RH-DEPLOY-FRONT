import React from 'react';
import styled from 'styled-components';
import Perfil from '../../assets/img/perfil.png';
import setaBaixo from '../../assets/img/seta-para-baixo.png';
import logo from '../../assets/img/logo.svg';
import logout from '../../assets/img/logout.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 480px) {
    flex-flow: column nowrap;
    background-color: #e3e3e3;
    border-left: 1px solid #000000;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100%;
    width: 300px;
    padding-top: 3.5rem;
    z-index: 99;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;
// function logOut() {
//     localStorage.removeItem("usuario-login");

//     history.push("/");
// }

const RightNav = ({ open }) => {
    return (
        <Ul open={open}>
            <header className="header_g2">
            <div className='container container_header_g2' >



                <div class='select_header_g2'>
                    <p class='input_header_g2'>Vantagens <img src={setaBaixo} /></p>
                    <input type='hidden' name='some_name_tosetaBaixosetaBaixo_form' />
                    <div class='hidden_header_g2 hidden_header_g2_responsivo'>
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
                        <Link to='/TodasAtividades' className="text_link_header_g1" ><span>Todas Atividades</span> </Link>
                        <Link to='/ValidarAtividades' className="text_link_header_g1" ><span>Validar Atividades</span> </Link>
                        <Link to='/RankingUsuarios' className="text_link_header_g1" ><span>Ranking</span> </Link>
                        <Link to='/CadastrarAtividades' className="text_link_header_g1" ><span>Cadastrar Atividades</span> </Link>
                        <div class='select'>
                        </div>
                    </div>
                </div>

                <div className="img_perfil_g2" >
                    <Link to="/perfil"> <img src={Perfil} alt="Meu Perfil" /> </Link>
                </div>


                {/* <img className='img_logout_header_g2' onClick={logOut} src={logout} alt="logout" /> */}
            </div>
        </header>


        </Ul>
    )
}

export default RightNav