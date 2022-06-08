import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import moment from 'moment';
import "../../assets/css/democratizacao.css";
import "../../assets/css/democratizacaoAdm.css";
import Footer from '../../components/footer';
import FotoPerfil from '../../assets/img/perfilVazio.svg'
import HeaderFuncionario from '../../components/header/headerFuncionario'
import imgPadrao from '../../assets/img/imgPadrao.png'
import ImgDemocratizacaoAdm from '../../assets/img/ImgDemocratizacao.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/MenuHamburguer/Nav'
import { parseJwt } from '../../services/auth';

export default function Democratizacao() {

    //States 
    const [idDecisao, setIdDecisao] = useState(0);
    const [idUsuario, setIdUsuario] = useState(parseJwt().jti);
    const [resultadoDecisao, setResultadodecisao] = useState(0);
    const [descricaoDecisao, setDescricaoDecisao] = useState('');
    const [listaDecisao, setListaDecisao] = useState([]);
    const [dataValidade, setDataValidade] = useState(new Date())
    const [dataCadastroDecisao] = useState(moment().format("YYYY-MM-DD"));

    console.log(idDecisao)

    const notify_decisao = () => toast.success("Decisão Cadastrada!");

    const notify_erroDecisao = () => toast.error("Preencha todos os campos!");

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

    function cadastrarDecisao(event) {
        event.preventDefault();


        let cadastro = {
            idUsuario: idUsuario,
            descricaoDecisao: descricaoDecisao,
            dataDecisao: dataCadastroDecisao,
            prazoDeAvaliacao: dataValidade,
        }
        console.log(idUsuario)
        console.log(dataCadastroDecisao)
        console.log(dataValidade)
        console.log(resultadoDecisao)

        axios.post("https://apigrupo3.azurewebsites.net/api/Decisoes/Cadastrar", cadastro, {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }



        })
            .then(response => {
                if (response.status === 201) {

                    ListarDecisao();
                    console.log('decisao cadastrada')
                    notify_decisao();
                }
            })
            .catch(erro => {notify_erroDecisao(); console.log(erro) })

    }
    useEffect(ListarDecisao, [])


    return (
        <body>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>
            <main>
                <div className='container g3_containerOrganizador'>
                    <div className='g3_containerDecisao'>
                        <div className='g3_organizadorDecisao'>
                            <span className='g3_boldDecisao'>Compartilhe suas decisões </span>
                            <span className='g3_nonBoldDecisao'>com sua equipe!</span>
                            <div className='g3_containerDecisoes'>
                            </div>
                            <form className='g3_formCadastroDecisao' onSubmit={cadastrarDecisao}>
                                <input className='g3_inputCadastroFeedback' value={descricaoDecisao} onChange={(event) => setDescricaoDecisao(event.target.value)} type='text' placeholder='Compartilhe aqui a sua ideia:'></input>
                                <input className="g3_inputCadastroFeedback" value={dataValidade} onChange={(event) => setDataValidade(event.target.value)} type="date" />
                                <button className='g3_btnCadastroFeedback' type="submit">Cadastrar</button>
                            </form>
                        </div>
                        <div className='g3_bannerDemocratizacao'>
                            <img className='g3_imgDemocratizacao' src={ImgDemocratizacaoAdm} />
                        </div>

                    </div>

                    <span className='g3_boldFeedback'>ÚLTIMAS IDEIAS</span>
                    <div className='g3_containerFeedback'>
                        {
                            listaDecisao.map((decisao) => {
                                return (
                                    <div className='g3_feedback'>
                                        {/* <div className='g3_fotoPerfilFeedback'>
                                            <img className='g3_imgFotoFeedback' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + decisao.caminhoFotoPerfil} />
                                        </div> */}
                                        <div className='g3_boxFeedback'>
                                            <span className='g3_tituloDecisao'>Você tomou a seguinte decisão:</span>
                                            <p className='g3_paragrafoDecisao'>{decisao.descricaoDecisao}</p>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </main>
            <Footer />
        </body>
    )

}