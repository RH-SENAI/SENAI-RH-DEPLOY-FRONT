import React, { useRef, useEffect, useCallback, useState } from 'react';
import Modal from 'react-modal';
import calendar from '../../assets/img/calendar.svg'
import map from '../../assets/img/map.svg'
import "../../assets/css/modalListaCursos.css"
import "../../assets/css/modalListaBeneficios.css"
import api from '../../services/api';
import { parseJwt } from '../../services/auth';
import coin from "../../assets/img/coin 1.png"
import { ToastContainer, toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";

export const ModallBeneficioFavoritos = ({ showModal, setShowModal, beneficios, comentario, listarComentarioBeneficio, cupom, setCupom, btnCompra, setBtnCompra, listarUsuario }) => {
    const notify_Logar_Failed = () => toast.error("Algo deu errado, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Cadastro realizado com sucesso!")
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

    //Fechar modal
    const closeModal = e => {
        setBtnCompra(false);
        setCupom(false);
        setShowModal(false);
    }

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
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

    //Cadastrar comentarios
    const [comentarioDesconto1, setComentarioDesconto1] = useState('')
    const [valorAvalicao, setValorAvalicao] = useState(0)
    function cadastrarComentario(event) {
        event.preventDefault();
        let comentarios = {
            idUsuario: parseJwt().jti,
            avaliacaoDesconto: valorAvalicao,
            comentarioDesconto1: comentarioDesconto1,
            idDesconto: beneficios.idDesconto
        }
        api.post('/ComentarioDescontos', comentarios, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(function (response) {
                console.log(response);
                listarComentarioBeneficio()
                limparInput()
            })
            .catch(erro => console.log(erro))
    }

    //Solicitar o descontoCupom
    function requisicaoDesconto() {
        let requisitos = {
            idUsuario: parseJwt().jti,
            idDesconto: beneficios.idDesconto,
        }

        api.post('/Registrodescontos/Cadastrar', requisitos)
            .then(function (response) {
                // console.log(response);
                // console.log("Você adquiriu o beneficio" + beneficios.idDesconto)
                setCupom(true)
                notify_cadastro_sucess('Cupom resgatado com sucesso!');
                listarUsuario()
            })
            .catch(resposta => notify_Logar_Failed())
    }
    //Limpar os states/input

    function limparInput() {
        setComentarioDesconto1('')
        setValorAvalicao(0)
    }

    return (
        <>
            {showModal ? (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                >
                    <div>
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
                                <img src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + beneficios.idDescontoNavigation.caminhoImagemDesconto} alt="Foto do Desconto" />
                            </div>

                            <div className='box_cima_modal_beneficio_g2'>
                                <div className='title_modal_beneficio_g2'>
                                    <h1>{beneficios.idDescontoNavigation.nomeDesconto}</h1>
                                </div>

                                <div>
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        edit={false}
                                        value={beneficios.idDescontoNavigation.mediaAvaliacaoDesconto}
                                        activeColor="#C20004"
                                    />
                                </div>

                                <div className='dados_modal_beneficio_g2'>

                                    <div className='icone_center_modal_beneficio_g2'>
                                        <img src={calendar} alt="calendário" /> <p>

                                            {Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                            }).format(new Date(beneficios.idDescontoNavigation.validadeDesconto))}
                                        </p>


                                    </div>

                                    <div className='icone_center_modal_beneficio_g2'>
                                        <img src={map} alt="mapa" /> <p> {beneficios.idDescontoNavigation.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>
                                    </div>

                                </div>


                                <div className='container_registro_beneficio_g2'>
                                    <div className='box_dados_registro_beneficio_g2'>
                                        <span> Empresa: </span> <p>{beneficios.idDescontoNavigation.idEmpresaNavigation.nomeEmpresa}</p>
                                    </div>
                                    <div className='box_dados_registro_beneficio_g2'>
                                        <span>E-mail:</span> <p>{beneficios.idDescontoNavigation.idEmpresaNavigation.emailEmpresa}</p>
                                    </div>
                                    <div className='box_dados_registro_beneficio_g2'>
                                        <span>Telefone:</span> <p>{beneficios.idDescontoNavigation.idEmpresaNavigation.telefoneEmpresa}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='circulo_icone_coin_beneficio_g2'>
                                    <img className='icone_modal_coin_g2' src={coin} alt="preço da vantagem" /> <p> {beneficios.idDescontoNavigation.valorDesconto} </p>
                                </div>
                            </div>
                        </div>


                        {/* parte 2 */}
                        <div className='modal_baixo_beneficio_g2'>
                            <div className='container_lista_comentario_beneficio_g2'>
                                <h2>Comentários:</h2>
                                <div className='wrap_modal_comentario_beneficio_g2'>
                                    {
                                        comentario.map((c) => {
                                            return (
                                                <div className='container_lista_comentario_g2'>
                                                    <div className='box_lista_comentario_g2'>
                                                        <span>{c.idUsuarioNavigation.nome}:</span>
                                                        <p>{c.comentarioDesconto1}</p>
                                                        <ul>
                                                            <ReactStars
                                                                count={5}
                                                                size={15}
                                                                edit={false}
                                                                value={c.avaliacaoDesconto}
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

                                            <input type="radio" value={valorAvalicao} onChange={(e) => setValorAvalicao(e.target.value)} name="rating" id="rating-1_cadastro_beneficio_Favoritos" />
                                            <label for="rating-1_cadastro_beneficio_Favoritos"></label>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder='Comente'
                                            value={comentarioDesconto1}
                                            onChange={(e) => setComentarioDesconto1(e.target.value)}
                                        />
                                        <button type="submit" className="botaoCadastroComentarioBeneficio_g2">Enviar</button>

                                    </form>
                                </div>
                            </div>
                            <hr className='hr_modal_beneficio_g2' />
                            <div className='container_descricao_beneficio_g2'>
                                <h2>Descrição</h2>

                                <div className='lista_descricao_beneficio_g2'>
                                    {beneficios.idDescontoNavigation.descricaoDesconto}
                                </div>

                                <div className='btn_cadastrarComentario_beneficio_g2'>
                                    {
                                        cupom == true && (
                                            <div>

                                                <button className='botaoCadastroComentarioBeneficio_g2'> <p>{beneficios.idDescontoNavigation.numeroCupom}</p></button>
                                            </div>
                                        )
                                    }
                                    {
                                        cupom == false && (
                                            <div>
                                                {
                                                    btnCompra == true && (
                                                        <div>
                                                            <button button
                                                                id='show-or-hide'
                                                                type="submit"
                                                                className="botaoCadastroComentarioBeneficio_g2"
                                                                onClick={() => { requisicaoDesconto() }}
                                                            >Pegue </button>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    btnCompra == false && (
                                                        <div>
                                                            <button
                                                                disabled
                                                                id='show-or-hide'
                                                                type="submit"
                                                                className="botaoCadastroComentarioBeneficio_desable_g2"
                                                            // onClick={() => { requisicaoDesconto() }}
                                                            >Pegue</button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal>
            ) : null
            }
        </>
    );

}