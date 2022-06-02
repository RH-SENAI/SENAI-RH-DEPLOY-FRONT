import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/gp1style.css'
import { Link, useHistory } from 'react-router-dom'
import { ModallValidar } from '../../components/modalValidar'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/header/headerAdm'
import moedas from '../../assets/img/moedinha.svg'
import Footer from "../../components/footer"
import Navbar from '../../components/MenuHamburguer/Nav';
import HeaderFuncionario from '../../components/header/headerFuncionario';


export default function TodasAtividades() {
    const [listaAtividades, setListaAtividades] = useState([]);
    const [idAtividade, setIdAtividade] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalValidar, setShowModalValidar] = useState(false);
    const [idAtividadeModal, setIdAtividadeModal] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [listaAtividadesValidar, setListaAtividadesValidar] = useState([]);


    const OpenModalValidar = () => {
        setShowModalValidar(prev => !prev);
    }


    function listarAtividadesValidar() {
        axios("http://apirhsenaigp1.azurewebsites.net/api/Atividades/ListaValidar"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaAtividadesValidar(resposta.data)
                    console.log(listaAtividadesValidar)
                }
            })

            .catch(erro => console.log(erro))
        console.log(listaAtividadesValidar)
    };

    useEffect(listarAtividadesValidar, []);

    return (
        <div className="div_container G1_tela_atividades_container">
            <ModallValidar macete={setListaAtividadesValidar} atividade={listaAtividadesValidar.find(atividade => atividade.idAtividade == idAtividadeModal)} showModalValidar={showModalValidar} setShowModalValidar={setShowModalValidar} />
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>
            <main className="container_validatividades">
                <div className="G1_organizar_main">
                    <h1 className="G1_titulo_atividades">Validar Atividades</h1>
                    <div className="G1_container_atividades">
                        {listaAtividadesValidar.map((atividade) => {
                            return (
                                <div key={atividade.idAtividade}>
                                    <div className="G1_atividade_box">
                                        <div className="G1_header_atividade"></div>
                                        <div className="G1_box_container">
                                            <div className="G1_organizar_spams">
                                                <span className="G1_titulo_atividade_box">{atividade.nomeAtividade}</span>
                                                <div className="organiza_coins_text">
                                                    <span className="G1_recompensa_box">{atividade.recompensaMoeda} CashS</span>
                                                    <img className="img_coins" src={moedas} alt="moedas" />
                                                </div>
                                            </div>

                                            <p className="G1_descricao_atividade">{atividade.descricaoAtividade}</p>
                                            <div className="G1_organizar_btn">
                                                <button type="button" onClick={() => {
                                                    OpenModalValidar();
                                                    setIdAtividadeModal(atividade.idAtividade);
                                                }} className="G1_btn_vizualizar">Visualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

}