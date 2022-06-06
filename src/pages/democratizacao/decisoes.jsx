import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "../../assets/css/democratizacao.css";
import "../../assets/css/democratizacaoAdm.css";
import "../../assets/css/decisao.css";
import Footer from '../../components/footer';
import FotoPerfil from '../../assets/img/perfilVazio.svg'
import imgPadrao from '../../assets/img/imgPadrao.png'
import HeaderFuncionario from '../../components/header/headerFuncionario'
import ImgDemocratizacaoAdm from '../../assets/img/imgDecisao.svg'
import Navbar from '../../components/MenuHamburguer/Nav'

export default function Decisao() {

    //States 
    const [idDecisao, setIdDecisao] = useState(0);
    const [idUsuario, setIdUsuario] = useState(0);
    const [resultadoDecisao, setResultadodecisao] = useState(0);
    const [descricaoDecisao, setDescricaoDecisao] = useState('');
    const [listaDecisao, setListaDecisao] = useState([]);
    const [dataValidade, setDataValidade] = useState(new Date())
    const [dataCadastroDecisao] = useState(moment().format("YYYY-MM-DD"));

    function ListarDecisao() {
        axios.get('https://apigrupo3.azurewebsites.net/api/Decisoes/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaDecisao(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }

    useEffect(ListarDecisao, [])

    return (
        <body>
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>
            <main>
                <div className='container g3_containerOrganizadorDecisao'>
                    <div className='g3_containerDecisao'>
                        <div className='g3_organizadorDecisao'>
                            <span className='g3_boldDecisao'>ÚLTIMAS</span>
                            <span className='g3_nonBoldDecisao'>DECISÕES</span>
                            <div className='g3_containerDecisoes'>
                                <div className='g3_boxCardsDecisao'>
                                    {
                                        listaDecisao.map((decisao) => {
                                            return (
                                                <div className='g3_feedback'>
                                                    {/* <div className='g3_fotoPerfilFeedback'>
                                                        <img className='g3_imgFotoFeedback' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + decisao.caminhoFotoPerfil} />
                                                    </div> */}
                                                    <Link to={`democratizacao/${decisao.idDecisao}`} className='g3_btnRedirectDecisao'>
                                                        <div className='g3_boxDecisaoLista'>
                                                            <span className='g3_tituloDecisao'>O gerente tomou a seguinte decisão:</span>
                                                            <p className='g3_paragrafoDecisao'>{decisao.descricaoDecisao}</p>
                                                        </div>
                                                    </Link>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='g3_bannerDemocratizacao'>
                            <img className='g3_imgDecisao' src={ImgDemocratizacaoAdm} />
                        </div>

                    </div>

                </div>

            </main>
            <Footer />
        </body>
    )

}