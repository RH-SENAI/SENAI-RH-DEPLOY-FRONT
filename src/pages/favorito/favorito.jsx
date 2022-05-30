import HeaderFuncionario from '../../components/header/headerFuncionario'
import "../../assets/css/favorito.css"
import api from "../../services/api"
import { parseJwt } from "../../services/auth";
import Footer from '../../components/footer'
import { ModallCursoFavorito } from '../../components/modalListaCursoFavoritos/modalListaCursoFavoritos'
import coracao from '../../assets/img/coracao.svg'
import relogio from '../../assets/img/relogio.svg'
import local from '../../assets/img/local.svg'
import coin from '../../assets/img/coin 1.png'
import { useEffect, useState } from 'react';
import { ModallBeneficioFavoritos } from "../../components/modalListaBeneficiosFavoritos/modalListaBeneficiosFavoritos";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart"
import { set } from 'react-hook-form';

export default function MeusFavoritos() {

    const [idDescontoModal, setIdDescontoModal] = useState()
    const [listaComentarioBeneficio, setListaComentarioBeneficio] = useState([])


    // const [searchInput, setSearchInput] = useState([]);
    // const [filteredResults, setFilteredResults] = useState([]);

    // const searchItems = (searchValue) => {
    //     console.log(searchValue)
    //     setSearchInput(searchValue)
    //     if (searchInput !== '') {
    //         const filteredData = listaBeneficios.filter((item) => {
    //             return Object.values(item.nomeDesconto).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })
    //         setFilteredResults(filteredData)
    //     } else {
    //         setFilteredResults(listaBeneficios)
    //     }
    // }



    function listarComentarioCurso() {
        console.log(idCursoModal)
        api('/ComentarioCursos/Comentario/' + idCursoModal)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Lista comentario')
                    console.log(resposta)
                    setListaComentarioCurso(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarComentarioCurso, []);

    const OpenModal = () => {
        setShowModal(prev => !prev);
    }
    const OpenModalDesconto = () => {
        setShowModalDesconto(prev => !prev);
    }

    const [listaCursos, setListaCursos] = useState([]);

    const [listaComentarioCurso, setListaComentarioCurso] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalDesconto, setShowModalDesconto] = useState(false);
    const [idCursoModal, setIdCursoModal] = useState()
    const [listaFavoritosCurso, setListaFavoritosCurso] = useState([]);

    function listarFavoritosCurso() {
        api('/FavoritosCursos/Favorito/' + parseJwt().jti)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Lista de favoritos Curso')
                    console.log(resposta)
                    setListaFavoritosCurso(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarFavoritosCurso, []);

    const [listaFavoritosDesconto, setListaFavoritosDesconto] = useState([]);

    function listarFavoritosDescontos() {
        api('/FavoritosDescontos/Favorito/' + parseJwt().jti)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Lista de favoritos descontos')
                    console.log(resposta)
                    setListaFavoritosDesconto(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarFavoritosDescontos, []);

    function listarComentarioBeneficio() {
        console.log(idDescontoModal)
        api('/ComentarioDescontos/Comentario/' + idDescontoModal)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Lista comentario')
                    console.log(resposta)
                    setListaComentarioBeneficio(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarComentarioBeneficio, []);

    
    //Desfavoritar Desconto
    const [favoritoDesconto, setFavoritoDesconto] = useState([])
    const [active, setActive] = useState(true)


    function desfavoritarDesconto(idDesconto) {
        api.delete('/FavoritosDescontos/deletar/' + idDesconto)

            .then(resposta => {
                if (resposta.status === 204) {
                    console.log('Desfavoritado!')
                    listarFavoritosDescontos()
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    //Desfavoritar curso
    const [favoritoCurso, setFavoritoCurso] = useState([])
    // const [active, setActive] = useState(true)


    function desfavoritarCurso(idCurso) {
        api.delete('/FavoritosCursos/deletar/' + idCurso)

            .then(resposta => {
                if (resposta.status === 204) {
                    console.log('Desfavoritado!')
                    listarFavoritosCurso()
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    return (

        <div className="geral_g2">
            <ModallCursoFavorito comentarios={listaComentarioCurso} cursos={listaFavoritosCurso.find(curso => curso.idCurso == idCursoModal)} showModal={showModal} setShowModal={setShowModal} />
            <ModallBeneficioFavoritos comentario={listaComentarioBeneficio} beneficios={listaFavoritosDesconto.find(beneficio => beneficio.idDesconto == idDescontoModal)} showModal={showModalDesconto} setShowModal={setShowModalDesconto} />

            <HeaderFuncionario />

            <div className="container">
                <div className='title_caixa_meusFavoritos_g2'>
                    <h1 className='h1_meusFavoritos_g2'>Meus Favoritos</h1>
                    <div className='caixa_meusFavoritos_g2'>
                        <label ></label>
                        <input
                            type="search"
                            placeholder='Pesquisar'
                            // autoComplete='off'
                            list='curso'
                        // onChange={(e) => searchItems(e.target.value)}
                        />
                    </div>
                </div>


                <div className='wrap_curso_g2'>
                    {/* Curso */}
                    <div className='container_wrap_curso_g2' >


                        {
                            listaFavoritosCurso.map((curso) => {
                                return (

                                    <div className='espacamento_curso_g2'>
                                        <section alt={curso.idCurso} key={curso.idCurso} id='imagem' className='box_curso_g2'>
                                            <div className='banner_img_curso_g2'>
                                                {<img onClick={() => { OpenModal(); listarComentarioCurso() }} onClickCapture={() => setIdCursoModal(curso.idCurso)} className='curso_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + curso.idCursoNavigation.caminhoImagemCurso} alt="imagem do curso" />}
                                            </div>

                                            <div className='dados_curso_gp2'>

                                                {<span onClick={() => { OpenModal(); listarComentarioCurso() }} onClickCapture={() => setIdCursoModal(curso.idCurso)}  > {curso.idCursoNavigation.nomeCurso}</span>}



                                                {/* <ReactStars
                                                    count={5}
                                                    // onChange={ratingChanged}
                                                    size={20}
                                                    edit={false}
                                                    value={curso.idCursoNavigation.mediaAvaliacaoCurso}
                                                    activeColor="#C20004"
                                                /> */}


                                                {<p><img className='box_dados_curso_g2' src={relogio} alt="duracao" /> {curso.idCursoNavigation.cargaHoraria} Horas </p>}
                                                {<p><img className='box_dados_curso_g2' src={local} alt="duracao" /> {curso.idCursoNavigation.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro}   </p>}
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
                                    </div>
                                )
                            })
                        }



                        {/* Desconto */}

                        {
                            listaFavoritosDesconto.map((beneficio) => {
                                return (
                                    <div className='espacamento_beneficio_g2'>
                                        <section alt={beneficio.idDescontoFavorito} key={beneficio.idDescontoFavorito} id='imagem' className='box_beneficio_g2'>
                                            <div className='banner_img_beneficio_g2'>
                                                {<img onClick={() => { OpenModalDesconto(); listarComentarioBeneficio() }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)} className='beneficio_banner_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + beneficio.idDescontoNavigation.caminhoImagemDesconto} alt="imagem do desconto" />}
                                            </div>

                                            <div className="dados_beneficio_gp2">

                                                <div className='title_estrelas_g2'>
                                                    {<span onClick={() => { OpenModalDesconto(); listarComentarioBeneficio() }} onClickCapture={() => setIdDescontoModal(beneficio.idDesconto)} className="title_beneficios_g2" > {beneficio.idDescontoNavigation.nomeDesconto}</span>}

                                                    <ReactStars
                                                        count={5}
                                                        size={30}
                                                        edit={false}
                                                        value={beneficio.idDescontoNavigation.mediaAvaliacaoDesconto}
                                                        activeColor="#C20004"
                                                    />
                                                </div>


                                                <div className="box_baixo_section_beneficio_g2">
                                                    {<div className='circulo_moeda_beneficio_g2'>
                                                        <img className='coin_beneficio_g2' src={coin} alt="coin" />  {beneficio.idDescontoNavigation.valorDesconto}
                                                    </div>}
                                                    <div>
                                                        {/* <img src={coracao} alt="favorito" /> */}
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