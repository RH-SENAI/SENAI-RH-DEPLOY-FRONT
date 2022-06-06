import React, { useEffect, useCallback, useState } from 'react';
import { parseJwt } from "../../services/auth";
import Modal from 'react-modal';
import "../../assets/css/modalListaCursos.css"
import api from '../../services/api';
import coin from "../../assets/img/coin 1.png"
import calendar from '../../assets/img/calendar.svg'
import map from '../../assets/img/map.svg'
import local from '../../assets/img/local.png'
import relogio from '../../assets/img/relogio.png'
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';

export const ModallCursoFavorito = ({ showModal, setShowModal, cursos, comentarios, listarComentarioCurso, inscricao, setInscricao, btnInscricao, setBtnInscricao, listarUsuario }) => {
    const notify_Logar_Failed = () => toast.error("Algo deu errado, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Parabens! Em breve você recebera mais informações em seu e-mail.")


    //Estrelas
    const avaliacao2 = () => {
        setValorAvalicao(2)
    }
    const avaliacao3 = () => {
        setValorAvalicao(3)
    }
    const avaliacao4 = () => {
        setValorAvalicao(4)
    }
    const avaliacao5 = () => {
        setValorAvalicao(5)
    }

    //Cadastrar comentario
    const [comentarioCurso1, setComentarioCurso1] = useState('')
    const [valorAvalicao, setValorAvalicao] = useState(0)

    function cadastrarComentario(event) {
        event.preventDefault();
        let comentarios = {
            idUsuario: parseJwt().jti,
            avaliacaoComentario: valorAvalicao,
            comentarioCurso1: comentarioCurso1,
            idCurso: cursos.idCurso
        }
        api.post('/ComentarioCursos', comentarios, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(function (response) {
                listarComentarioCurso()
                limparInput()
            })
            .catch(erro => console.log(erro))
    }

    //Requisicao curso
    function requisicaoCurso(event) {
        event.preventDefault();
        let requisicao = {
            idUsuario: parseJwt().jti,
            idCurso: cursos.idCurso,
        }
        api.post('/Registroscursos/Cadastrar', requisicao, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(function (response) {
                setInscricao(true)
                notify_cadastro_sucess();
                listarUsuario()
            })
            .catch(resposta => notify_Logar_Failed())
    }

    //Fechar modal
    const closeModal = e => {
        setBtnInscricao(false);
        setInscricao(false);
        setShowModal(false);
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    //Limpar os states/input

    function limparInput() {
        setComentarioCurso1('')
        setValorAvalicao(0)
    }


    return (
        <>
            {showModal ? (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                >

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

                    {/* Parte 1 */}
                    <div className='container_modal_beneficio_g2'>
                        <div className='box_img_modal_beneficio_g2'>
                            <img src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + cursos.idCursoNavigation.caminhoImagemCurso} alt="Foto do Desconto" />
                        </div>

                        <div className='box_cima_modal_beneficio_g2'>
                            <div className='title_modal_beneficio_g2'>
                                <h1>{cursos.idCursoNavigation.nomeCurso}</h1>
                            </div>

                            <div>
                                <ReactStars
                                    count={5}
                                    size={30}
                                    edit={false}
                                    value={cursos.idCursoNavigation.mediaAvaliacaoCurso}
                                    activeColor="#C20004"
                                />
                            </div>

                            <div className='dados_modal_beneficio_g2'>

                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={relogio} alt="calendário" />
                                    <p>
                                        {cursos.idCursoNavigation.cargaHoraria} Horas
                                    </p>
                                </div>

                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={map} alt="mapa" /> <p> 
                                        {cursos.idCursoNavigation.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} 
                                        {/* {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                        }).format(new Date(cursos.idCursoNavigation.dataFinalizacao))} */}
                                        </p>
                                </div>

                            </div>

                            <dv className='dados_modal_beneficio_g2'>

                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={local} alt="mapa" />
                                    {
                                        cursos.idCursoNavigation.modalidadeCurso == true ? (
                                            <div>
                                                <p>Presencial</p>
                                            </div>
                                        )
                                            :
                                            (
                                                <div>
                                                    <p>EAD</p>
                                                </div>
                                            )
                                    }
                                </div>


                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={calendar} alt="calendário" />
                                    <p>
                                        {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                        }).format(new Date(cursos.idCursoNavigation.dataFinalizacao))}
                                    </p>
                                </div>

                            </dv>

                            <div className='container_registro_beneficio_g2'>
                                <div className='box_dados_registro_beneficio_g2'>
                                    <span> Empresa: </span> <p>{cursos.idCursoNavigation.idEmpresaNavigation.nomeEmpresa}</p>
                                </div>
                                <div className='box_dados_registro_beneficio_g2'>
                                    <span>Email:</span> <p>{cursos.idCursoNavigation.idEmpresaNavigation.emailEmpresa}</p>
                                </div>
                                <div className='box_dados_registro_beneficio_g2'>
                                    <span>Telefone:</span> <p>{cursos.idCursoNavigation.idEmpresaNavigation.telefoneEmpresa}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='circulo_icone_coin_beneficio_g2'>
                                <img className='icone_modal_coin_g2' src={coin} alt="preço da vantagem" /> <p> {cursos.idCursoNavigation.valorCurso} </p>
                            </div>
                        </div>
                    </div>


                    {/* parte 2 */}
                    <div className='modal_baixo_beneficio_g2'>
                        <div className='container_lista_comentario_beneficio_g2'>
                            <h2>Comentários:</h2>
                            <div className='wrap_modal_comentario_beneficio_g2'>
                                {
                                    comentarios.map((c) => {
                                        return (
                                            <div className='container_lista_comentario_g2'>
                                                <div className='box_lista_comentario_g2'>
                                                    <span>{c.idUsuarioNavigation.nome}:</span>
                                                    <p>{c.comentarioCurso1}</p>
                                                    <p>
                                                        <ReactStars
                                                            count={5}
                                                            size={15}
                                                            edit={false}
                                                            value={c.avaliacaoComentario}
                                                            activeColor="#C20004"
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div>
                                <form onSubmit={cadastrarComentario} className='input_modal_comentario_beneficio_g2'>


                                    <div class="rating_g2">
                                        <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao5(e.target.value)} name="rating" id="rating-5_cadastro_beneficio_Favoritos" />
                                        <label for="rating-5_cadastro_beneficio_Favoritos"></label>

                                        <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao4(e.target.value)} name="rating" id="rating-4_cadastro_beneficio_Favoritos" />
                                        <label for="rating-4_cadastro_beneficio_Favoritos"></label>

                                        <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao3(e.target.value)} name="rating" id="rating-3_cadastro_beneficio_Favoritos" />
                                        <label for="rating-3_cadastro_beneficio_Favoritos"></label>

                                        <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao2(e.target.value)} name="rating" id="rating-2_cadastro_beneficio_Favoritos" />
                                        <label for="rating-2_cadastro_beneficio_Favoritos"></label>

                                        <input type="radio" value={valorAvalicao} onChange={(e) => setValorAvalicao(e.target.value)} name="rating" id="rating-1_cadastro_beneficio_Favoritos" />
                                        <label for="rating-1_cadastro_beneficio_Favoritos"></label>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder='Comente'
                                        value={comentarioCurso1}
                                        onChange={(e) => setComentarioCurso1(e.target.value)}
                                    />
                                    <button type="submit" className="botaoCadastroComentarioBeneficio_g2">Enviar</button>

                                </form>
                            </div>
                        </div>
                        <hr className='hr_modal_beneficio_g2' />
                        <div className='container_descricao_beneficio_g2'>
                            <h2>Descrição</h2>
                            <div className='lista_descricao_beneficio_g2'>
                                {cursos.idCursoNavigation.descricaoCurso}
                            </div>

                            <div className='btn_cadastrarComentario_beneficio_g2'>
                                {
                                    inscricao == true && (
                                        <div>

                                            <button className='botaoCadastroComentarioBeneficio_g2'> <p>Inscrito</p></button>
                                        </div>
                                    )
                                }
                                {
                                    inscricao == false && (
                                        <div>
                                            {
                                                btnInscricao == true && (
                                                    <div>
                                                        <form onSubmit={requisicaoCurso} >
                                                            <button type="submit" className="botaoCadastroComentarioBeneficio_g2">Inscrever-se</button>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                            {
                                                btnInscricao == false && (
                                                    <div>
                                                        <form onSubmit={requisicaoCurso} >
                                                            <button
                                                                disabled
                                                                type="submit"
                                                                className="botaoCadastroComentarioBeneficio_desable_g2"
                                                            >Inscrever-se</button>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </Modal>
            ) : null
            }
        </>
    );
}