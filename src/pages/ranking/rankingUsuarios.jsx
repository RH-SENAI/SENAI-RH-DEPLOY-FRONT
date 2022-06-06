import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/gp1style.css'
import { Link, useHistory } from 'react-router-dom'
import { Modall } from '../../components/Modal'
import React from 'react';
import { ToastContainer, toast, Icons } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/header/headerAdm'
import FotoRank from '../../assets/img/fotoRank.svg'
import Trofeu from '../../assets/img/Trofeus.svg'
import moedas from '../../assets/img/moedinha.svg'
import Footer from "../../components/footer"
import Navbar from '../../components/MenuHamburguer/Nav';
import HeaderFuncionario from '../../components/header/headerFuncionario';
import { parseJwt } from '../../services/auth';


export default function TodasAtividades() {

    const [listaUsuariosRank, setListaUsuariosRank] = useState([]);
    const [idAtividade, setIdAtividade] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalValidar, setShowModalValidar] = useState(false);
    const [idAtividadeModal, setIdAtividadeModal] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const OpenModal = () => {
        setShowModal(prev => !prev);
    }

    function listarUsuariosRank() {
        let idGestor = parseJwt().jti
        axios.get("http://apirhsenaigp1.azurewebsites.net/api/Usuarios/Ranking/" + idGestor
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuariosRank(resposta.data)
                    console.log(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };


    useEffect(listarUsuariosRank, []);

    return (
        <div className="G1_tela_atividades_container">
            {/* <Modall atividade={listaAtividades.find(atividade => atividade.idAtividade == idAtividadeModal)} showModal={showModal} setShowModal={setShowModal} /> */}
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>            <main className="container_ranking">
                <div className="G1_organizar_main">
                    <h1 className="G1_titulo_atividades">Ranking</h1>
                    <div className="G1_container_ranking">
                        {listaUsuariosRank.map((usuario, index) => {
                            index++
                            return (
                                <div key={usuario.idUsuario}>
                                    <div className="G1_usuario_card">
                                        <p className="G1_posicao G1_container_card">{index++}</p>
                                        <img className="G1_container_card G1_foto_ranking" src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + usuario.caminhoFotoPerfil} alt="Foto do Usuario" />
                                        <p className="G1_nome_usuario G1_container_card">{usuario.nome}</p>
                                        <div className="G1_organizar_trofeus">
                                            {/* <Icons></Icons> */}
                                            <img src={Trofeu} alt="Trofeu" />
                                            <p className="G1_num_trofeu" >{usuario.trofeus}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );

}