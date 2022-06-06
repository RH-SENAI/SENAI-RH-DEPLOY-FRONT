import HeaderFuncionario from '../../components/header/headerFuncionario'
import "../../assets/css/favorito.css"
import api from "../../services/api"
import { parseJwt } from "../../services/auth";
import Footer from '../../components/footer'
import { ModallCursoFavorito } from '../../components/modalListaCursoFavoritos/modalListaCursoFavoritos'
import relogio from '../../assets/img/relogio.svg'
import local from '../../assets/img/local.svg'
import coin from '../../assets/img/coin 1.png'
import { useEffect, useState } from 'react';
import { ModallBeneficioFavoritos } from "../../components/modalListaBeneficiosFavoritos/modalListaBeneficiosFavoritos";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart"
import axios from 'axios';
import Navbar from '../../components/MenuHamburguer/Nav';


export default function MeusFavoritos() {

    //Listar Usuario logado
    const [listaUsuario, setListaUsuario] = useState([]);

    function listarUsuario() {
        axios('http://apirhsenaigp1.azurewebsites.net/api/Usuarios/BuscarUsuario/' + parseJwt().jti, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuario(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(listarUsuario, [])



    //Pesquisar curso ou desconto

    // const [searchInput, setSearchInput] = useState([]);
    // const [filteredResults, setFilteredResults] = useState([]);

    // const searchItems = (searchValue) => {
    //     console.log(searchValue)
    //     setSearchInput(searchValue)
    //     if (searchInput !== '') {
    //         const filteredDataBeneficio = listaFavoritosDesconto.filter((item) => {
    //             return Object.values(item.idDescontoNavigation.nomeDesconto).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })

    //         const filteredDataCurso = listaFavoritosCurso.filter((item) => {
    //             return Object.values(item.idCursoNavigation.nomeCurso).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })
    //         setFilteredResults(filteredDataBeneficio, filteredDataCurso)
    //     } else {
    //         setFilteredResults(listaFavoritosCurso, listaFavoritosDesconto)
    //     }
    // }


    //DESCONTOS/VANTAGENS/BENEFICIOS
    const [idDescontoModal, setIdDescontoModal] = useState()
    const [listaComentarioBeneficio, setListaComentarioBeneficio] = useState([])
    const [listaFavoritosDesconto, setListaFavoritosDesconto] = useState([]);

    function listarFavoritosDescontos() {
        api('/FavoritosDescontos/Favorito/' + parseJwt().jti)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('desconto')
                    console.log(resposta.data)
                    setListaFavoritosDesconto(resposta.data)

                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarFavoritosDescontos, []);

    function listarComentarioBeneficio() {
        api('/ComentarioDescontos/Comentario/' + idDescontoModal)
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaComentarioBeneficio(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    //VefificarSaldoDesconto
    const [btnCompra, setBtnCompra] = useState(false)

    function verifySaldoDesconto(saldoUser, saldoMoeda) {
        if (saldoUser > saldoMoeda) {
            setBtnCompra(true)
        }
    }


    //Verificar beneficio
    const [cupom, setCupom] = useState(false);

    function setarCupom() {
        setCupom(true)
    }

    async function verifySituacaoDesconto(cupom, id) {
        try {
            const respostaBuscar = await api(`/Registrodescontos/RegistroDescontos/IdUsuario/${parseJwt().jti}`);
            var tamanhoJsonRegistro = Object.keys(respostaBuscar.data).length;
            let stringRegistros = JSON.stringify(respostaBuscar.data);
            var objRegistros = JSON.parse(stringRegistros);
            var k = 0;
            do {
                if (objRegistros != 0) {
                    var registroId = objRegistros[k]['idDesconto'];
                    if (registroId == id) {
                        setarCupom()
                    }
                }
                else {
                    console.log("Está vazio!")
                }
                k++
            } while (k < tamanhoJsonRegistro);
        } catch (error) {
            console.log(error)
        }
    }

    //Desfavoritar Desconto
    const [active, setActive] = useState(true)

    function desfavoritarDesconto(idDesconto) {
        api.delete('/FavoritosDescontos/deletar/' + idDesconto)
            .then(resposta => {
                if (resposta.status === 204) {
                    listarFavoritosDescontos()
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    //Modal desconto
    const OpenModalDesconto = () => {
        setShowModalDesconto(prev => !prev);
        verifySaldoDesconto(idDescontoModal)
        verifySituacaoDesconto(idDescontoModal)
    }

    //DESCONTOS/VANTAGENS/BENEFICIOS
    //----------------------------------------------------------


    //----------------------------------------------------------
    //CURSOS

    //VefificarSaldoCurso
    const [btnInscricao, setBtnInscricao] = useState(false)

    function verifySaldoCurso(saldoUser, saldoMoeda) {
        if (saldoUser > saldoMoeda) {
            setBtnInscricao(true)
        }
    }

    //Verificar curso inscrito
    const [inscricao, setInscricao] = useState(false);

    function setarInscricao() {
        setInscricao(true)
    }

    async function verifySituacao(id) {
        try {
            const respostaBuscar = await api(`/Registroscursos/RegistroCursos/IdUsuario/${parseJwt().jti}`);
            var tamanhoJsonRegistro = Object.keys(respostaBuscar.data).length;
            let stringRegistros = JSON.stringify(respostaBuscar.data);
            var objRegistros = JSON.parse(stringRegistros);

            var k = 0;
            do {

                if (objRegistros != 0) {
                    var registroId = objRegistros[k]['idCurso'];
                    if (registroId == id) {
                        setarInscricao()
                    }
                }
                else {
                    console.log("Está vazio!")
                }
                k++
            } while (k < tamanhoJsonRegistro);


        } catch (error) {
            console.log(error)
        }
    }



    //comentrio de cursos
    function listarComentarioCurso() {
        api('/ComentarioCursos/Comentario/' + idCursoModal)
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaComentarioCurso(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    //Modal curso
    const OpenModal = () => {
        setShowModal(prev => !prev);
    }

    const [listaComentarioCurso, setListaComentarioCurso] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalDesconto, setShowModalDesconto] = useState(false);
    const [idCursoModal, setIdCursoModal] = useState()
    const [listaFavoritosCurso, setListaFavoritosCurso] = useState([]);

    function listarFavoritosCurso() {
        api('/FavoritosCursos/Favorito/' + parseJwt().jti)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('resposta')
                    console.log(resposta.data)
                    setListaFavoritosCurso(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarFavoritosCurso, []);

    //Desfavoritar curso
    function desfavoritarCurso(idCurso) {
        api.delete('/FavoritosCursos/deletar/' + idCurso)

            .then(resposta => {
                if (resposta.status === 204) {
                    listarFavoritosCurso()
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    //CURSOS
    //----------------------------------------------------------

    return (

        <div className="geral_g2">
            {/* curso */}
            <ModallCursoFavorito listarUsuario={listarUsuario} setBtnInscricao={setBtnInscricao} btnInscricao={btnInscricao} inscricao={inscricao} setInscricao={setInscricao} listarComentarioCurso={listarComentarioCurso} comentarios={listaComentarioCurso} cursos={listaFavoritosCurso.find(curso => curso.idCurso == idCursoModal)} showModal={showModal} setShowModal={setShowModal} />
            {/* desconto */}
            <ModallBeneficioFavoritos listarUsuario={listarUsuario} setBtnCompra={setBtnCompra} btnCompra={btnCompra} listarComentarioBeneficio={listarComentarioBeneficio} setCupom={setCupom} cupom={cupom} comentario={listaComentarioBeneficio} beneficios={listaFavoritosDesconto.find(beneficio => beneficio.idDesconto == idDescontoModal)} showModal={showModalDesconto} setShowModal={setShowModalDesconto} />

            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>

            <div className="container">
                <div className='title_caixa_curso_g2'>
                    <h1 className='h1_curso_g2'>Meus Favoritos</h1>
                    <div className='caixa_curso_g2'>
                        <label ></label>
                        <input
                            type="search"
                            placeholder='Pesquisar'
                            // autoComplete='off'
                            list='curso'
                        // onChange={(e) => searchItems(e.target.value)}
                        />
                    </div>

                    <div className=' moeda_cima_g2'>
                        <p>Minhas moedas:</p> <img className='coin_beneficio_cima_g2' src={coin} alt="coin" /> <p>{listaUsuario.saldoMoeda}</p>
                    </div>
                </div>


                <div className='wrap_curso_g2'>
                    {/* Curso */}
                    <div className='container_wrap_curso_g2' >


                        {
                            listaFavoritosCurso.map((curso) => {
                                return (

                                    <dv  key={curso.idCurso} className='espacamento_curso_g2'>
                                        <section alt={curso.idCurso} id='imagem' className='box_curso_g2'>
                                            <div className='banner_img_curso_g2'>
                                                {<img onClick={() => { verifySituacao(idCursoModal); OpenModal(); listarComentarioCurso(); verifySaldoCurso(listaUsuario.saldoMoeda, curso.idCursoNavigation.valorCurso) }} onClickCapture={() => setIdCursoModal(curso.idCurso)} className='curso_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + curso.idCursoNavigation.caminhoImagemCurso} alt="imagem do curso" />}
                                            </div>

                                            <div className='dados_curso_gp2'>

                                                <div className='title_estrelas_g2'>

                                                    {<span className='title_cursos_g2' onClick={() => { verifySituacao(idCursoModal); OpenModal(); listarComentarioCurso() }} onClickCapture={() => setIdCursoModal(curso.idCurso)}  > {curso.idCursoNavigation.nomeCurso}</span>}


                                                    <div className='estrelas_cursos_g2'>
                                                        <div>
                                                            <ReactStars
                                                                count={5}
                                                                // onChange={ratingChanged}
                                                                size={20}
                                                                edit={false}
                                                                value={curso.idCursoNavigation.mediaAvaliacaoCurso}
                                                                activeColor="#C20004"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='dados_local_carga_curso_g2'>

                                                        <div className='cargaHoraria_curso_g2'>
                                                            <p>  <img className='box_dados_curso_g2' src={relogio} alt="duracao" />  {curso.idCursoNavigation.cargaHoraria}  Horas </p>
                                                        </div>

                                                        <div className='local_curso_g2'>
                                                            <p> <img className='box_dados_curso_g2' src={local} alt="duracao" />   {curso.idCursoNavigation.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>
                                                        </div>

                                                    </div>

                                                </div>


                                                <div className="box_baixo_section_curso_g2">

                                                    {<div className='circulo_moeda_curso_g2'>
                                                        <img className='coin_curso_g2' src={coin} alt="favorito" /> {curso.idCursoNavigation.valorCurso}
                                                    </div>}
                                                    <div className="media_beneficio_g2">
                                                        <div className="favoritar_beneficio_g2">
                                                            <Heart isActive={active} onClick={() => desfavoritarCurso(curso.idCursoFavorito)} />
                                                        </div>
                                                    </div>
                                                    {/* <div> <button onClick={ () => Excluir(curso.idCurso)} >Excluir</button></div> */}
                                                </div>
                                            </div>
                                        </section>
                                    </dv>
                                )
                            })
                        }



                        {/* Desconto */}

                        {
                            listaFavoritosDesconto.map((beneficio) => {
                                return (
                                    <div key={beneficio.idDesconto} className='espacamento_beneficio_g2'>
                                        <section alt={beneficio.idDescontoFavorito} key={beneficio.idDescontoFavorito} id='imagem' className='box_beneficio_g2'>
                                            <div className='banner_img_beneficio_g2'>
                                                {<img onClick={() => { verifySituacaoDesconto(cupom, beneficio.idDesconto); OpenModalDesconto(); listarComentarioBeneficio(); verifySaldoDesconto(listaUsuario.saldoMoeda, beneficio.idDescontoNavigation.valorDesconto) }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)} className='beneficio_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + beneficio.idDescontoNavigation.caminhoImagemDesconto} alt="imagem do desconto" />}
                                            </div>

                                            <div className="dados_beneficio_gp2">
                                                <div className='title_estrelas_g2'>
                                                    {<span onClick={() => { verifySituacaoDesconto(cupom, beneficio.idDesconto); OpenModalDesconto(); listarComentarioBeneficio(); verifySaldoDesconto(listaUsuario.saldoMoeda, beneficio.idDescontoNavigation.valorDesconto) }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)} className="title_beneficios_g2" > {beneficio.idDescontoNavigation.nomeDesconto}</span>}

                                                    <div className="estrelas_beneficio_g2">
                                                        <ReactStars
                                                            count={5}
                                                            size={30}
                                                            edit={false}
                                                            value={beneficio.idDescontoNavigation.mediaAvaliacaoDesconto}
                                                            activeColor="#C20004"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="box_baixo_section_beneficio_g2">
                                                    {<div className='circulo_moeda_beneficio_g2'>
                                                        <img className='coin_beneficio_g2' src={coin} alt="coin" />  {beneficio.idDescontoNavigation.valorDesconto}
                                                    </div>}
                                                    <div>
                                                        <div className="favoritar_beneficio_g2">
                                                            <Heart isActive={active} onClick={() => desfavoritarDesconto(beneficio.idDescontoFavorito)} />
                                                        </div>
                                                    </div>
                                                    {/* <div> <button onClick={(b) => Excluir(beneficio.idDesconto)} >Excluir</button></div> */}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            })
                        }

                    </div>


                </div>




            </div>


            <Footer />
        </div>
    )
}