import HeaderFuncionario from "../../components/header/headerFuncionario";
import '../../assets/css/cursosRapidos.css'
import '../../assets/css/listaBeneficios.css'
import coin from '../../assets/img/coin 1.png'
import React, { useEffect, useState } from 'react';
import { ModallBeneficio } from "../../components/modalListaBeneficios/modalListaBeneficios";
import api from "../../services/api";
import Footer from "../../components/footer";
import axios from "axios";
import { parseJwt } from "../../services/auth";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart"
import Navbar from '../../components/MenuHamburguer/Nav';
import apiMaps from "../../services/apiMaps";

export default function ListaBeneficios() {

    //VefificarSaldo
    const [btnCompra, setBtnCompra] = useState(false)

    function verifySaldo(saldoUser, saldoMoeda) {
        if (saldoUser > saldoMoeda) {
            setBtnCompra(true)
        } else {
            setBtnCompra(false)
        }
    }

    //Favoritar
    const [active, setActive] = useState(false)
    const [favorito, setFavorito] = useState(false)
    const [listaFavoritosDescontos, setListaFavoritosDescontos] = useState([])
    async function favoritar(favorite, id) {
        try {
            if (favorite == true) {

                //Requisição favoritos pelo id do usuário
                const respostaFavoritos = await api('/FavoritosDescontos/Favorito/' + parseJwt().jti)
                var dadosFavoritos = respostaFavoritos.data

                //Tamanho do json do respostaFavoritos
                var tamanhoJson = Object.keys(dadosFavoritos).length;
                var p = 0;
                do {
                    let stringFavoritos = JSON.stringify(dadosFavoritos);
                    var objFavoritos = JSON.parse(stringFavoritos);
                    if (objFavoritos != '') {
                        var descontoId = objFavoritos[p]['idDesconto'];
                        let favoritoId = objFavoritos[p]['idDescontoFavorito'];
                        if (descontoId == id) {
                            const respostaExcluir = await api.delete(`/FavoritosDescontos/deletar/${favoritoId}`);
                            var verifyDelete = respostaExcluir.status;
                            if (respostaExcluir.status == 204) {
                                setActive(!active);;
                                listarFavoritosDescontos();
                                // listarBeneficios();
                            }
                        }
                        p++
                    }
                    else {
                        console.log("Está vazio!")
                    }
                } while (p < tamanhoJson);
                if (verifyDelete != 204) {
                    if (descontoId != id) {
                        favoritarDesconto(id)
                        listarFavoritosDescontos();
                        // listarBeneficios();
                    }
                }
            }
            listarFavoritosDescontos();
            // listarBeneficios();
        } catch (error) {
            console.log(error);
        }
    }

    function favoritarDesconto(idDesconto) {
        let favo = {
            idDesconto: idDesconto,
            idUsuario: parseJwt().jti,
        }

        api.post('/FavoritosDescontos', favo)
            .then(function (response) {
                console.log(response);
                // listarBeneficios()
            })
            .catch(erro => console.log(erro))
    }

    function listarFavoritosDescontos() {
        api('/FavoritosDescontos/Favorito/' + parseJwt().jti)
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaFavoritosDescontos(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(listarFavoritosDescontos, []);


    //Verificar cupom
    const [cupom, setCupom] = useState(false);

    function setarCupom() {
        setCupom(true)
    }

    async function verifySituacao(id) {
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

    //Abrir modal
    const [idDescontoModal, setIdDescontoModal] = useState()
    const [showModal, setShowModal] = useState(false);


    const OpenModal = () => {
        setShowModal(prev => !prev);
        verifySituacao(idDescontoModal)
    }

    //Listar todos os comentarios do beneficio conforme o id do beneficiob
    const [listaComentarioBeneficio, setListaComentarioBeneficio] = useState([])

    function listarComentarioBeneficio() {
        api('/ComentarioDescontos/Comentario/' + idDescontoModal)
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaComentarioBeneficio(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }



    //Listar todos os beneficios
    const [listaBeneficios, setListaBeneficios] = useState([]);
    const [userDistance, setUserDistance] = useState('');
    const [distanceBase, setDistanceBase] = useState(150000)
    const [switchAtive, setSwitchAtive] = useState(false);
    const [distancias, setDistancias] = useState([])





    async function listarBeneficios() {
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
        // var distanceBase = 150000;
        if (userDistance != 0) {
            setDistanceBase(userDistance * 1000)
        }
        const resposta = await api('/Descontos')

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
                    id: objLocalCurso[i].idDesconto,
                    distancia: distance
                })


                if (distance <= distanceBase) {
                    let stringCurso = JSON.stringify(dadosCurso);
                    var objCurso = JSON.parse(stringCurso);
                    var curso = objCurso[i]
                    console.log('i')
                    console.log(distance)
                    listaBeneficios.push(curso);

                    //  var listaDeCursosEncontrados = curso

                }
                else if (distance > distanceBase) {
                }
            }
            // console.log('Curso encontrado');
            i++
        } while (i < tamanhoJson | objCurso)
        if (listaBeneficios == '') {
            setSwitchAtive(true)
        }
        else {
            setSwitchAtive(false)
        }
        setCount(i)

        // this.setState({ contadorCurso: i })
        // console.warn(this.state.contadorCurso)
        console.log('Lista')
        console.log(listaBeneficios)


        // .then(resposta => {
        //     if (resposta.status === 200) {
        //         setListaBeneficios(resposta.data)
        //     }
        // })
        // .catch(erro => console.log(erro))
    }

    const [count, setCount] = useState(0)

    useEffect(() => {
        listarBeneficios()
    }, [])



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


    //Excluir Vantagem
    function Excluir(idDesconto) {
        api.delete('/Descontos/Deletar/' + idDesconto)
            .then(resposta => {
                if (resposta.status === 204) {
                    listarBeneficios()
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    //Pesquisar

    const [searchInput, setSearchInput] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = listaBeneficios.filter((item) => {
                return Object.values(item.nomeDesconto).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(listaBeneficios)
        }
    }


    return (
        <div className="geral_g2">
            <ModallBeneficio listarUsuario={listarUsuario} setBtnCompra={setBtnCompra} btnCompra={btnCompra} listarComentarioBeneficio={listarComentarioBeneficio} setCupom={setCupom} cupom={cupom} idDescontoModal={idDescontoModal} comentario={listaComentarioBeneficio} beneficio={listaBeneficios.find(beneficio => beneficio.idDesconto == idDescontoModal)} showModal={showModal} setShowModal={setShowModal} />
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>

            <div className="container">
                <div className='title_caixa_beneficio_g2'>
                    <h1 className='h1_beneficio_g2'>Descontos</h1>
                    <div className='caixa_beneficio_g2'>
                        <label ></label>
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
                </div>


                <section className="container_beneficio_g2">


                    <div className='wrap_beneficio_g2'>
                        <div className='container_wrap_beneficio_g2'>
                            {
                                searchInput.length > 0 ?

                                    filteredResults.map((beneficio) => {
                                        return (
                                            <div className='espacamento_beneficio_g2'>
                                                <section alt={beneficio.idDesconto} key={beneficio.idDesconto} id='imagem' className='box_beneficio_g2'>
                                                    <div className='banner_img_beneficio_g2'>
                                                        {<img onClick={() => { verifySituacao(cupom, idDescontoModal); OpenModal(); listarComentarioBeneficio(); verifySaldo(listaUsuario.saldoMoeda, beneficio.valorDesconto) }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)} className='beneficio_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + beneficio.caminhoImagemDesconto} alt="imagem do desconto" />}
                                                    </div>
                                                    <div className="dados_beneficio_gp2">

                                                        <div className="title_estrelas_g2">
                                                            <span className="title_beneficios_g2" onClick={() => { verifySituacao(cupom, idDescontoModal); OpenModal(); listarComentarioBeneficio(); verifySaldo(listaUsuario.saldoMoeda, beneficio.valorDesconto) }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)}> {beneficio.nomeDesconto}</span>

                                                            <div className="estrelas_beneficio_g2">
                                                                <ReactStars
                                                                    count={5}
                                                                    size={30}
                                                                    edit={false}
                                                                    value={beneficio.mediaAvaliacaoDesconto}
                                                                    activeColor="#C20004"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="box_distancia_g2">
                                                            {
                                                                distancias.map((dis) => {
                                                                    if (dis.id == beneficio.idDesconto) {
                                                                        return (
                                                                            <div className='container_distancia_g2'>
                                                                                {dis.distancia} km
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                        <div className="box_baixo_section_beneficio_g2">
                                                            <div className='circulo_moeda_beneficio_g2'>
                                                                <img className='coin_beneficio_g2' src={coin} alt="coin" />  {beneficio.valorDesconto}
                                                            </div>
                                                            <div>
                                                                <div className="favoritar_beneficio_g2">
                                                                    <Heart isActive={listaFavoritosDescontos.some(l => { if (l.idDesconto == beneficio.idDesconto) { return true } return false })} onClick={() => { favoritar(!favorito, beneficio.idDesconto) }} />
                                                                </div>
                                                            </div>
                                                            {/* <div> <button onClick={(b) => Excluir(beneficio.idDesconto)} >Excluir</button></div> */}
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        )
                                    })

                                    :

                                    listaBeneficios.map((beneficio) => {
                                        return (
                                            <div className='espacamento_beneficio_g2'>
                                                <section alt={beneficio.idDesconto} key={beneficio.idDesconto} id='imagem' className='box_beneficio_g2'>
                                                    <div className='banner_img_beneficio_g2'>
                                                        {<img onClick={() => { verifySituacao(cupom, idDescontoModal); OpenModal(); listarComentarioBeneficio(); verifySaldo(listaUsuario.saldoMoeda, beneficio.valorDesconto) }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)} className='beneficio_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + beneficio.caminhoImagemDesconto} alt="imagem do desconto" />}
                                                    </div>
                                                    <div className="dados_beneficio_gp2">

                                                        <div className="title_estrelas_g2">
                                                            <span className="title_beneficios_g2" onClick={() => { verifySituacao(cupom, idDescontoModal); OpenModal(); listarComentarioBeneficio(); verifySaldo(listaUsuario.saldoMoeda, beneficio.valorDesconto) }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)}> {beneficio.nomeDesconto}</span>

                                                            <div className="estrelas_beneficio_g2">
                                                                <ReactStars
                                                                    count={5}
                                                                    size={30}
                                                                    edit={false}
                                                                    value={beneficio.mediaAvaliacaoDesconto}
                                                                    activeColor="#C20004"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="box_distancia_g2">
                                                            {
                                                                distancias.map((dis) => {
                                                                    if (dis.id == beneficio.idDesconto) {
                                                                        return (
                                                                            <div className='container_distancia_g2'>
                                                                                {dis.distancia} km
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                        <div className="box_baixo_section_beneficio_g2">
                                                            <div className='circulo_moeda_beneficio_g2'>
                                                                <img className='coin_beneficio_g2' src={coin} alt="coin" />  {beneficio.valorDesconto}
                                                            </div>
                                                            <div>
                                                                <div className="favoritar_beneficio_g2">
                                                                    <Heart isActive={listaFavoritosDescontos.some(l => { if (l.idDesconto == beneficio.idDesconto) { return true } return false })} onClick={() => { favoritar(!favorito, beneficio.idDesconto) }} />
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

                </section>
            </div>

            <Footer />
        </div>
    )
}