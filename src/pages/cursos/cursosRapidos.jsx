import HeaderFuncionario from '../../components/header/headerFuncionario'
import curso from '../../assets/img/cursosRapidos.svg'
import Footer from '../../components/footer'
import '../../assets/css/cursosRapidos.css'
import coracao from '../../assets/img/coracao.svg'
import relogio from '../../assets/img/relogio.svg'
import local from '../../assets/img/local.svg'
import coin from '../../assets/img/coin 1.png'
import estrelaSozinha from '../../assets/img/estrelaSozinha.svg'
import React, { useEffect, useMemo, useState } from 'react';
import { ModallCurso } from '../../components/modalListaCursos/modalListaCursos'
import api from '../../services/api'
import apiMaps from '../../services/apiMaps'
import axios from 'axios'
import { parseJwt } from "../../services/auth";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart"
import Navbar from '../../components/MenuHamburguer/Nav';


export default function CursosRapidos() {
    const [listaUsuario, setListaUsuario] = useState([]);
    const [listaComentarioCurso, setListaComentarioCurso] = useState([])
    const [listaCursos, setListaCursos] = useState([]);
    const [initialRepos, seInitialRepos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [switchAtive, setSwitchAtive] = useState(false);
    const [idCursoModal, setIdCursoModal] = useState()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [UserLongitude, setLongitude] = useState(null)
    const [UserLatitude, setLatitude] = useState(null)
    const [userDistance, setUserDistance] = useState('');
    let subtitle;
    const delay = require('delay');

    //Verificar curso inscrito
    const [inscricao, setInscricao] = useState(false);

    function setarInscricao() {
        setInscricao(true)
    }

    //VefificarSaldoCurso
    const [btnInscricao, setBtnInscricao] = useState(false)

    function verifySaldoCurso(saldoUser, saldoMoeda) {
        if (saldoUser > saldoMoeda) {
            setBtnInscricao(true)
        }
    }


    //VerificarSituaçãoCurso
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


        }
        catch (error) {
            console.log(error)
        }
    }


    //Favoritar
    const [active, setActive] = useState(false)
    const [favorito, setFavorito] = useState(false);

    function favoritarCurso(idCurso) {

        let favo = {
            idCurso: idCurso,
            idUsuario: parseJwt().jti,
        }

        console.log(parseJwt().jti)
        console.log(idCurso)
        api.post('/FavoritosCursos', favo)
            .then(function (response) {
                console.log(response);
                console.log("Favoritou o curso" + idCurso)
                // listarCursos();
            })
            .catch(erro => console.log(erro))
    }

    const [listaFavoritosCursos, setListaFavoritosCursos] = useState([]);

    function listarFavoritosCursos() {
        api('/FavoritosCursos/Favorito/' + parseJwt().jti)
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaFavoritosCursos(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarFavoritosCursos, []);

    async function favoritar(favorite, id) {
        try {
            if (favorite == true) {

                //Requisição favoritos pelo id do usuário
                const respostaFavoritos = await api('/FavoritosCursos/Favorito/' + parseJwt().jti)
                var dadosFavoritos = respostaFavoritos.data

                //Tamanho do json do respostaFavoritos
                var tamanhoJson = Object.keys(dadosFavoritos).length;
                var p = 0;

                do {
                    let stringFavoritos = JSON.stringify(dadosFavoritos);
                    var objFavoritos = JSON.parse(stringFavoritos);

                    if (objFavoritos != '') {
                        var cursoId = objFavoritos[p]['idCurso'];
                        let favoritoId = objFavoritos[p]['idCursoFavorito'];

                        if (cursoId == id) {
                            const respostaExcluir = await api.delete(`/FavoritosCursos/deletar/${favoritoId}`);
                            var verifyDelete = respostaExcluir.status;

                            if (respostaExcluir.status == 204) {
                                setActive(!active);
                                listarFavoritosCursos();
                                // listarCursos();
                            }
                        }
                        p++
                    }
                    else {
                        console.log("Está vazio!")
                    }
                } while (p < tamanhoJson);
                if (verifyDelete != 204) {
                    if (cursoId != id) {
                        favoritarCurso(id)
                        listarFavoritosCursos();
                        // listarCursos();
                    }
                }
            }
            listarFavoritosCursos();
            // listarCursos();
        } catch (error) {
            console.log(error);
        }
    }

    // function geolocation() {

    // }

    // useEffect(geolocation, []);

    function listarComentarioCurso() {
        api('/ComentarioCursos/Comentario/' + idCursoModal)
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaComentarioCurso(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    const time = async () => {
        await delay(3000);
    }
    const OpenModal = () => {
        setShowModal(prev => !prev);
    }

    // function distanciaDoInput(){
    //     userDistance + value
    // }

    // const [distanceBase, setDistanceBase] = useState(150000)

    const [distancias, setDistancias] = useState([])



    async function listarCursos() {
        // debugger;
        var longitude;
        var latitude
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude é :", position.coords.latitude);
            console.log("Longitude é :", position.coords.longitude);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
        });
        // time();
        var distanceBase = 150000;
        console.log('userDistance')
        if (userDistance != 0) {
            distanceBase = userDistance * 1000
            console.log(distanceBase)
        }
        const resposta = await api('/Cursos')
        const dadosCurso = resposta.data;
        var tamanhoJson = Object.keys(dadosCurso).length;
        var i = 0

        do {
            let stringLocalCurso = JSON.stringify(dadosCurso);
            let objLocalCurso = JSON.parse(stringLocalCurso);
            var localCurso = objLocalCurso[i]['idEmpresaNavigation']['idLocalizacaoNavigation']['idCepNavigation'].cep1
            console.log('objLocalCurso')
            console.log(objLocalCurso)

            // ----> Localização 

            var stringProblematica = `/json?origins=${latitude},${longitude}&destinations=${localCurso}&units=km&key=AIzaSyB7gPGvYozarJEWUaqmqLiV5rRYU37_TT0`
            var respostaLocal = await apiMaps(stringProblematica)
            if (respostaLocal.status === 200) {
                let string = JSON.stringify(respostaLocal.data);
                let obj = JSON.parse(string);
                let distance = obj['rows'][0]['elements'][0]['distance'].value

                distancias.push({
                    id: objLocalCurso[i].idCurso,
                    distancia: distance
                })

                if (distance <= distanceBase) {
                    let stringCurso = JSON.stringify(dadosCurso);
                    var objCurso = JSON.parse(stringCurso);
                    var curso = objCurso[i]
                    console.log('i')
                    console.log(distance)
                    listaCursos.push(curso);

                    //  var listaDeCursosEncontrados = curso

                }
                else if (distance > distanceBase) {
                }
            }
            // console.log('Curso encontrado');
            i++
        } while (i < tamanhoJson | objCurso)
        if (listaCursos == '') {
            setSwitchAtive(true)
        }
        else {
            setSwitchAtive(false)
        }
        setCount(i)

        // this.setState({ contadorCurso: i })
        // console.warn(this.state.contadorCurso)
        console.log('Lista')
        console.log(listaCursos)
        console.log('distancias')
        console.log(distancias)
    }

    const [count, setCount] = useState(0)

    useEffect(() => {
        listarCursos()
    }, [])

    function Excluir(idCurso) {
        api.delete('/Cursos/Deletar/' + idCurso)
            .then(resposta => {
                if (resposta.status === 204) {
                    listarCursos()
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    const [searchInput, setSearchInput] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = listaCursos.filter((item) => {
                return Object.values(item.nomeCurso).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(listaCursos)
        }
    }

    function listarUsuario() {
        axios('https://apigrupo3.azurewebsites.net/api/Usuarios/Listar/' + parseJwt().jti, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }
        )
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuario(resposta.data)

                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(listarUsuario, [])

    function limitaTotal(evt) {
        var input = evt.target;
        var value = input.value;

        if (value.length <= 3) {
            return;
        }
        input.value = input.value.substr(0, 3);
    }

    function esvaziarLista() {
        setDistancias([])
        setListaCursos([])
        listarCursos()
    }

    return (
        <div className="geral_g2">

            <ModallCurso listarUsuario={listarUsuario} setBtnInscricao={setBtnInscricao} btnInscricao={btnInscricao} inscricao={inscricao} setInscricao={setInscricao} listarComentarioCurso={listarComentarioCurso} comentarios={listaComentarioCurso} curso={listaCursos.find(curso => curso.idCurso == idCursoModal)} showModal={showModal} setShowModal={setShowModal} />
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>

            <div className='container'>
                <div className='title_caixa_curso_g2'>
                    <h1 className='h1_curso_g2'>Cursos</h1>
                    <div className='caixa_curso_g2'>
                        <label></label>
                        <input
                            type="search"
                            placeholder='Pesquisar'
                            // autoComplete='off'
                            list='curso'
                            onChange={(e) => searchItems(e.target.value)}
                        />
                    </div>

                    <div className=' moeda_cima_g2'>
                        <p>Minhas moedas:</p> <img className='coin_beneficio_cima_g2' src={coin} alt="coin" /> <p>{listaUsuario.saldoMoeda}</p>
                    </div>


                    <input
                        id='5'
                        type="number"
                        placeholder='150 km'
                        name="distancia"
                        onChange={(ev) => setUserDistance(ev.target.value)}
                    />
                    <button onClick={() => {esvaziarLista()}}>Filtrar</button>
                </div>

                <section className='container_curso_g2'>

                    <div className='wrap_curso_g2'>
                        <div className='container_wrap_curso_g2'>
                            {
                                searchInput.length > 0 ?
                                    filteredResults.map((curso) => {
                                        return (
                                            <div key={curso.idCurso} className='espacamento_curso_g2'>
                                                <section alt={curso.idCurso} id='imagem' className='box_curso_g2'>
                                                    <div className='banner_img_curso_g2'>
                                                        {<img onClick={() => { verifySituacao(idCursoModal); OpenModal(); listarComentarioCurso(); verifySaldoCurso(listaUsuario.saldoMoeda, curso.valorCurso) }} onClickCapture={() => setIdCursoModal(curso.idCurso)} className='curso_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + curso.caminhoImagemCurso} alt="imagem do curso" />}
                                                    </div>
                                                    <div className='dados_curso_gp2'>
                                                        <div className='title_estrelas_g2'>
                                                            <span className='title_cursos_g2' onClick={() => { verifySituacao(idCursoModal); OpenModal(); listarComentarioCurso() }} onClickCapture={() => setIdCursoModal(curso.idCurso)}  > {curso.nomeCurso}</span>
                                                            <div className='estrelas_cursos_g2'>
                                                                <div>
                                                                    <ReactStars
                                                                        count={5}
                                                                        // onChange={ratingChanged}
                                                                        size={20}
                                                                        edit={false}
                                                                        value={curso.mediaAvaliacaoCurso}
                                                                        activeColor="#C20004"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='dados_local_carga_curso_g2'>
                                                                <div className='cargaHoraria_curso_g2'>
                                                                    <p>  <img className='box_dados_curso_g2' src={relogio} alt="duracao" />  {curso.cargaHoraria}  Horas </p>
                                                                </div>
                                                                <div className='local_curso_g2'>
                                                                    <p> <img className='box_dados_curso_g2' src={local} alt="duracao" />   {curso.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>
                                                                </div>
                                                                <div className='box_distancia_g2' >
                                                                    {
                                                                        distancias.map((dis) => {
                                                                            if (dis.id == curso.idCurso) {
                                                                                return (
                                                                                    <div className='container_distancia_g2'>
                                                                                        {dis.distancia} km
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="box_baixo_section_curso_g2">
                                                            <div className='circulo_moeda_curso_g2'>
                                                                <img className='coin_curso_g2' src={coin} alt="favorito" /> {curso.valorCurso}
                                                            </div>
                                                            <div className="media_beneficio_g2">
                                                                <div className="favoritar_beneficio_g2">
                                                                    <Heart
                                                                        isActive={listaFavoritosCursos.some(l => { if (l.idCurso == curso.idCurso) { return true } return false })}
                                                                        onClick={() => { favoritar(!favorito, curso.idCurso) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div> <button onClick={ () => Excluir(curso.idCurso)} >Excluir</button></div> */}
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        )
                                    })
                                    :
                                    listaCursos.map((curso) => {
                                        return (
                                            <div key={curso.idCurso} className='espacamento_curso_g2'>
                                                <section alt={curso.idCurso} id='imagem' className='box_curso_g2'>
                                                    <div className='banner_img_curso_g2'>
                                                        {<img onClick={() => { verifySituacao(idCursoModal); OpenModal(); listarComentarioCurso(); verifySaldoCurso(listaUsuario.saldoMoeda, curso.valorCurso) }} onClickCapture={() => setIdCursoModal(curso.idCurso)} className='curso_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + curso.caminhoImagemCurso} alt="imagem do curso" />}
                                                    </div>
                                                    <div className='dados_curso_gp2'>
                                                        <div className='title_estrelas_g2'>
                                                            <span className='title_cursos_g2' onClick={() => { verifySituacao(idCursoModal); OpenModal(); listarComentarioCurso() }} onClickCapture={() => setIdCursoModal(curso.idCurso)}  > {curso.nomeCurso}</span>
                                                            <div className='estrelas_cursos_g2'>
                                                                <div>
                                                                    <ReactStars
                                                                        count={5}
                                                                        // onChange={ratingChanged}
                                                                        size={20}
                                                                        edit={false}
                                                                        value={curso.mediaAvaliacaoCurso}
                                                                        activeColor="#C20004"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='dados_local_carga_curso_g2'>
                                                                <div className='cargaHoraria_curso_g2'>
                                                                    <p>  <img className='box_dados_curso_g2' src={relogio} alt="duracao" />  {curso.cargaHoraria}  Horas </p>
                                                                </div>
                                                                <div className='local_curso_g2'>
                                                                    <p> <img className='box_dados_curso_g2' src={local} alt="duracao" />   {curso.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>
                                                                </div>
                                                                <div className='box_distancia_g2' >
                                                                    {
                                                                        distancias.map((dis) => {
                                                                            if (dis.id == curso.idCurso) {
                                                                                return (
                                                                                    <div className='container_distancia_g2'>
                                                                                        {dis.distancia} km
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="box_baixo_section_curso_g2">
                                                            <div className='circulo_moeda_curso_g2'>
                                                                <img className='coin_curso_g2' src={coin} alt="favorito" /> {curso.valorCurso}
                                                            </div>
                                                            <div className="media_beneficio_g2">
                                                                <div className="favoritar_beneficio_g2">
                                                                    <Heart
                                                                        isActive={listaFavoritosCursos.some(l => { if (l.idCurso == curso.idCurso) { return true } return false })}
                                                                        onClick={() => { favoritar(!favorito, curso.idCurso) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div> <button onClick={ () => Excluir(curso.idCurso)} >Excluir</button></div> */}
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </section >
            </div>
            <Footer />
        </div >
    )
} 