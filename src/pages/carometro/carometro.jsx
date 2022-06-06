import React, { useEffect } from 'react'

import axios from 'axios'
import { useState } from 'react';
import "../../assets/css/carometro.css";
import HeaderFuncionario from '../../components/header/headerFuncionario';
import Footer from '../../components/footer';
import imgPadrao from '../../assets/img/imgPadrao.png'
import topCarometro from '../../assets/img/topCarometro.png'
import { ModalAcompanhar } from '../../components/modal/modalAcompanhar';
import {
    parseJwt
    // usuarioAutenticado
} from '../../services/auth';
import Navbar from '../../components/MenuHamburguer/Nav';

//import Modal from 'react-modal';

// import 'bootstrap/dist/css/bootstrap.min.css';



export default function Carometro() {

    //States

    // const idUnidade = useParams();
    // const [idUsuarioAvaliador, setIdUsuarioAvaliador] = useState();
    const [id, setId] = useState();
    const [idCargo] = useState(0);
    const [idGrupo] = useState(0);
    // const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    // const [listaCargo, setListaCargo] = useState([]);
    // const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [idUsuarioModal, setIdUsuarioModal] = useState([]);
    // const [idUsuarioAvaliado, setIdUsuarioAvaliado] = useState([]);
    const [listaAtividades, setListaAtividades] = useState([]);
    const [sampleData, setSampleData] = useState([])
    // const [active, setMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // console.log(parseJwt.jti)
    const OpenModal = () => {

        setShowModal(prev => !prev);
        console.log('abriuuu')
        console.log('abriuuu')

        console.log(idUsuarioModal)

        // console.log(idUsuario)


    }
    // const ToggleMode = () => {
    //     setMode(!active)
    // }
    // const openModal = () => {
    //     setShowModal(prev => !prev);
    // }

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    //const [funcSelecionado, setFuncionarioSelecionado] = useState({});




    function BuscarFuncionario() {
        console.log(parseJwt().jti)
        let idRonaldo = parseJwt().jti
        console.log(idRonaldo)
        setId(idRonaldo)
        console.log(id)

        let idGestor = parseJwt().jti;
        axios("https://apigrupo3.azurewebsites.net/api/Usuarios/Listar/Lotacao/" + idGestor, {
            // axios.get('https://apigrupo3.azurewebsites.net/api/Usuarios/Listar', {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {

                    setListaFuncionarios(resposta.data)
                    console.log(resposta)
                    console.log(idCargo)
                    // console.log(mediaAvaliacao)
                    // console.log(medSatisfacaoGeral)



                }

            })

            .catch(erro => console.log(erro))

    }
    // function BuscarCargos() {
    //     axios.get('http://localhost:5000/api/Cargos/Listar', {
    //         headers: {

    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     }
    //     )

    //         .then((resposta) => {
    //             if (resposta.status === 200) {
    //                 setListaCargo(resposta.data)
    //                 console.log(resposta)
    //             }
    //         })

    //         .catch(erro => console.log(erro))
    // }




    //     axios.delete('http://localhost:5000/api/Excluir/' + idUsuario, {
    //         headers: {

    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     }
    //     )

    //         .then((resposta) => {
    //             if (resposta.status === 200) {
    //                 console.log('usuario deletado')
    //                 alert("usuario excluido!");
    //             }
    //         })

    //         .catch(erro => console.log(erro))
    // }

    const [procurarUsuarios, setProcurarUsuarios] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);


    const searchItems = (searchValue) => {
        setProcurarUsuarios(searchValue)
        if (procurarUsuarios !== '') {
            const filteredData = listaFuncionarios.filter((item) => {
                return Object.values(item.nome).join('').toLowerCase().includes(procurarUsuarios.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(listaFuncionarios)
        }
    }

    // const [procurarCargo, setProcurarCargo] = useState([]);

    // const searchCargo = (searchValue) => {
    //     setProcurarCargo(searchValue)
    //     if (procurarCargo !== 0) {
    //         const filteredData = listaCargo.filter((item) => {
    //             return Object.values(item.idCargoNavigation.idCargo).join().includes(procurarCargo)
    //         })
    //         setFilteredResults(filteredData)
    //     } else {
    //         setFilteredResults(listaCargo)
    //     }
    // }

    // function ListarMinhasAtividades() {
    //     console.log(idUsuarioModal)
    //     let idUsuarioAvaliado = idUsuarioModal
    //     axios.get(`http://apirhsenaigp1.azurewebsites.net/api/Atividades/MinhasAtividade/${idUsuarioAvaliado}`, {

    //         headers: {

    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
    //         }

    //     })

    //         .then((resposta) => {

    //             if (resposta.status === 200) {
    //                 setListaAtividades(resposta.data)

    //                 console.log(resposta)

    //                 const dataFinalizacao = resposta.data.filter(atividades => atividades.idSituacaoAtividade === 3)
    //                     .map((p) => {

    //                         return parseInt(p.dataConclusao.split('-')[2]);
    //                     });

    //                 const d1_5 = dataFinalizacao.filter(d => d <= 5).length
    //                 // const d6_10 = dataFinalizacao.filter(d => d > 5 && d <= 10).length
    //                 // const d11_15 = dataFinalizacao.filter(d => d > 10 && d <= 15).length
    //                 // const d16_20 = dataFinalizacao.filter(d => d > 15 && d <= 20).length
    //                 // const d21_25 = dataFinalizacao.filter(d => d > 20 && d <= 25).length
    //                 // const d26_31 = dataFinalizacao.filter(d => d > 25 && d <= 31).length
    //                 setSampleData(
    //                     [
    //                         { x: 1, y: d1_5 },
    //                         { x: 2, y: 2 },
    //                         { x: 3, y: 4 },
    //                         { x: 4, y: 5 },
    //                         { x: 5, y: 10 },
    //                         { x: 6, y: 11 }
    //                     ])


    //             }
    //         })

    //         .catch(erro => console.log(erro))

    // }
    // useEffect(ListarMinhasAtividades, [])



// function teste(){
//     console.log(listaFuncionarios)
// }
// function teste2(){
//     var usuariossss= listaFuncionarios.find(usuario => usuario.idUsuario == idUsuarioModal)

//     console.log(usuariossss)
// }

    // useEffect(teste2(), [])
    useEffect(BuscarFuncionario, [])
    // useEffect(console.log(parseJwt.jti), [])
    // useEffect(BuscarCargos, [])

    return (
        <body>
            {/* <Modall atividade={listaAtividades.find(atividade => atividade.idAtividade == idAtividadeModal)} showModal={showModal} setShowModal={setShowModal} /> */}
            {/* <ModalAcompanhar usuario={listaFuncionarios.find(usuario => usuario.idUsuario == idFuncionarioModal)} showModal={showModal} setShowModal={setShowModal} />  */}
            <ModalAcompanhar idUsuarioAvaliador={id} usuario={listaFuncionarios.find(usuario => usuario.idUsuario == idUsuarioModal)} showModal={showModal} setShowModal={setShowModal} />
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}

            <div className='g3_whiteBackgroundCarometro'>
                {/* <HeaderFuncionario /> */}
                <div className='navbarF'>
                    <Navbar />
                </div>
                <div className='headerF'>
                    <HeaderFuncionario />
                </div>
                <main>

                    <div className="container">

                        <div className='g3_conteudoCarometro'>
                            <div className='g3_topCarometro'>
                                <div className='g3_headerCarometro'>
                                    <h1 className="g3_tituloCarometro  ">CARÔMETRO</h1>
                                    <img className="g3_topImgCarometro  " src={topCarometro} alt='imagemCarometro' />
                                </div>
                                <div className='g3_navBarCarometro'>
                                    <label ></label>
                                    <input
                                        className='g3_inputPesquisaCarometro'
                                        type="search"
                                        placeholder='Pesquisar'
                                        // autoComplete='off'
                                        list='usuario'
                                        onChange={(e) => searchItems(e.target.value)}
                                    />

                                    {/* <select
                                            name="Cargo"
                                            value={idCargo}
                                            onChange={(e) => searchCargo(e.target.value)}
                                            list='cargo'
                                            className="g3_inputCadastroSelect"

                                        >
                                            <option value="#">Cargo</option>
                                            {
                                                listaCargo.map((event) => {
                                                    return (

                                                        <option key={event.idCargo} value={event.idCargo}>{event.nomeCargo}
                                                        </option>
                                                    );
                                                })}

                                        </select> */}
                                </div>
                            </div>
                            <div className='g3_cardsCarometro'>
                                {

                                    procurarUsuarios.length > 0 ?



                                        filteredResults.map((usuario) => {
                                            // if(usuario.idGrupo == idGrupo.idGrupo) {
                                            return (
                                                <button className='g3_abrirModal' onClick={() => { OpenModal();}} onClickCapture={() => setIdUsuarioModal(usuario.idUsuario)} type="button">
                                                    <div className='g3_cardUsuario'>
                                                        <img className='g3_fotoCarometro' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + usuario.caminhoFotoPerfil} alt="fotoPerfilCarometro" />
                                                        <span className="g3_spanCarometro">{usuario.nome}</span>
                                                        <span className="g3_spanCarometro">{usuario.idCargoNavigation.nomeCargo}</span>
                                                    </div>
                                                </button>
                                            )
                                            // }
                                        })

                                        :
                                        listaFuncionarios.map((usuario) => {
                                            // if(usuario.idGrupo == idGrupo.idGrupo) {
                                            return (
                                                <button className='g3_abrirModal' onClick={() => { OpenModal(); }} onClickCapture={() => setIdUsuarioModal(usuario.idUsuario)} type="button">
                                                    <div className='g3_cardUsuario'>
                                                        <img className='g3_fotoCarometro' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + usuario.caminhoFotoPerfil} alt="fotoPerfilCarometro" />
                                                        <span className="g3_spanCarometro">{usuario.nome}</span>
                                                        <span className="g3_spanCarometro">{usuario.idCargoNavigation.nomeCargo}</span>
                                                    </div>
                                                </button>

                                            )
                                            // }
                                        }

                                        )

                                }
                            </div>



                        </div>
                    </div>

                </main>
                <Footer />
            </div>
        </body>
    )
}