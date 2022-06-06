import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { parseJwt } from "../../services/auth";
import relogio from '../../assets/img/relogio.svg'
import local from '../../assets/img/local.png'
import data from '../../assets/img/data.svg'
import estrelaSozinha from '../../assets/img/estrelaSozinha.svg'
import modelo from '../../assets/img/modelo.svg'
import "../../assets/css/modalListaCursos.css"
import api from '../../services/api';
import coin from "../../assets/img/coin 1.png"
import calendar from '../../assets/img/calendar.svg'
import map from '../../assets/img/map.svg'
import coracao from '../../assets/img/coracao.svg'
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';


export const ModallCurso = ({ showModal, setShowModal, curso, comentarios, listarComentarioCurso, inscricao, setInscricao, btnInscricao, setBtnInscricao, listarUsuario }) => {

    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Parabens! Em breve você recebera mais informações em seu e-mail.")
    const [comentarioCurso1, setComentarioCurso1] = useState('')
    const [valorAvalicao, setValorAvalicao] = useState(0)

    //Estrela

    const avaliacao1 = () => {
        setValorAvalicao(1)
    }
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
                // console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );

    //Requisicao curso

    function requisicaoCurso(event) {
        event.preventDefault();

        let requisicao = {
            idUsuario: parseJwt().jti,
            idCurso: curso.idCurso,
        }


        api.post('/Registroscursos/Cadastrar', requisicao, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }

        )
            .then(function (response) {
                notify_cadastro_sucess();
                setInscricao(true)
                listarUsuario()
            })
            .catch(resposta => notify_Logar_Failed())
        // .catch(erro => console.log(erro))
    }


    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    //Cadastrar comentario
    function cadastrarComentario(event) {
        event.preventDefault();
        let comentarios = {
            idUsuario: parseJwt().jti,
            avaliacaoComentario: valorAvalicao,
            comentarioCurso1: comentarioCurso1,
            idCurso: curso.idCurso
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
                            <img src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + curso.caminhoImagemCurso} alt="Foto do Desconto" />
                        </div>

                        <div className='box_cima_modal_beneficio_g2'>
                            <div className='title_modal_beneficio_g2'>
                                <h1>{curso.nomeCurso}</h1>
                            </div>

                            <div>

                                <div>
                                    <ReactStars
                                        count={5}
                                        // onChange={ratingChanged}
                                        size={30}
                                        edit={false}
                                        value={curso.mediaAvaliacaoCurso}
                                        activeColor="#C20004"
                                    />
                                </div>
                                {/* {curso.mediaAvaliacaoCurso} */}
                            </div>

                            <div className='dados_modal_beneficio_g2'>

                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={calendar} alt="calendário" /> <p>

                                        {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                        }).format(new Date(curso.dataFinalizacao))}
                                    </p>


                                </div>

                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={map} alt="mapa" /> <p> {curso.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>
                                </div>

                            </div>

                            <dv className='dados_modal_beneficio_g2'>

                                <div className='icone_center_modal_beneficio_g2'>
                                    <img src={local} alt="mapa" />
                                    {
                                        curso.modalidadeCurso == true ? (
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
                                        }).format(new Date(curso.dataFinalizacao))}
                                    </p>
                                </div>

                            </dv>

                            <div className='container_registro_beneficio_g2'>
                                <div className='box_dados_registro_beneficio_g2'>
                                    <span> Empresa: </span> <p>{curso.idEmpresaNavigation.nomeEmpresa}</p>
                                </div>
                                <div className='box_dados_registro_beneficio_g2'>
                                    <span>Email:</span> <p>{curso.idEmpresaNavigation.emailEmpresa}</p>
                                </div>
                                <div className='box_dados_registro_beneficio_g2'>
                                    <span>Telefone:</span> <p>{curso.idEmpresaNavigation.telefoneEmpresa}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='circulo_icone_coin_beneficio_g2'>
                                <img className='icone_modal_coin_g2' src={coin} alt="preço da vantagem" /> <p> {curso.valorCurso} </p>
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
                                                    <ul>
                                                        <ReactStars
                                                            count={5}
                                                            size={15}
                                                            edit={false}
                                                            value={c.avaliacaoComentario}
                                                            activeColor="#C20004"
                                                        />
                                                    </ul>
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

                                        <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao1(e.target.value)} name="rating" id="rating-1_cadastro_beneficio_Favoritos" />
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
                                {curso.descricaoCurso}
                            </div>

                            <div className='btn_cadastrarComentario_beneficio_g2'>
                                {
                                    inscricao == true && (
                                        <div> <p>Inscrito</p> </div>
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