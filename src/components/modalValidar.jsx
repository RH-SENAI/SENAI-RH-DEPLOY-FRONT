import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../assets/css/gp1style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listarAtividadesValidar } from '../pages/cadastrarAtividades/cadastrarAtividades'
import moment from 'moment';

export const ModallValidar = ({ showModalValidar, setShowModalValidar, atividade, macete }) => {

    const [listaAtividadesValidar, setListaAtividadesValidar] = useState([]);

    const modalRef = useRef();
    const notify_validar = () => toast.success("Atividade Validada!");
    const notify_recusar = () => toast.success("Atividade Recusada!");

    console.log(atividade)



    let history = useHistory();

    const closeModal = e => {
        setShowModalValidar(false);
        console.log('showModal antes:' + showModalValidar)

        console.log('showModal depois:' + showModalValidar)
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModalValidar) {
                setShowModalValidar(false);
            }
        },
        [setShowModalValidar, showModalValidar]
    );

    function listarAtividadesValidar() {
        axios("http://apirhsenaigp1.azurewebsites.net/api/Atividades/ListaValidar"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta.data)
                    macete(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };

    async function validarAtividades(atividade) {
        let idAtividade = atividade.idAtividade;
        let idUsuario = atividade.idUsuario;
        await axios.patch("http://apirhsenaigp1.azurewebsites.net/api/Atividades/ValidarAtividade/" + atividade.idAtividade + "/" + atividade.idUsuario, {
            idAtividade: idAtividade,
            idUsuario: idUsuario
        }
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .catch(erro => console.log(erro))

        notify_validar()

        listarAtividadesValidar()
    };

    async function recusarAtividades(atividade) {
        let idMyAtividade = atividade.idMinhasAtividades;
        await axios.patch("http://apirhsenaigp1.azurewebsites.net/api/Atividades/RecusarAtividade/" + idMyAtividade, {
        }
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .catch(erro => console.log(erro))

        notify_recusar()

        listarAtividadesValidar()
    };


    // useEffect(notify_validar, []);


    return (
        <>
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
            {showModalValidar ? (
                <div className="background_modal">
                    <div className="modal-body">
                        <div className='G1_organizar_modal_titulo'>
                            <div className="G1_header_atividade"></div>
                            <h2 className="titulo_atividade_modal">{atividade.nomeAtividade}</h2>
                        </div>
                        <div className='organizar_sessao_modal_validar'>
                            <div className="text_modal_validar">
                                <label className='label_modal'>Descrição</label>
                                <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                            </div>
                            <div className="text_modal_validar">
                                <label className='label_modal'>Nome Funcionário</label>
                                <p className="descricao_atividade_modal">{atividade.nomeFuncionario}</p>
                            </div>
                            <div className="text_modal_validar">
                                <label className='label_modal'>Data de Conclusão</label>
                                <p className="descricao_atividade_modal">{moment(atividade.dataConclusao, "YYYYDDMM").format('L')}</p>
                            </div>
                            {/* <img className="anexo_validar" src={"https://armazenamentogrupo3.blob.core.windows.net/amazenamento-simples-grp1/" + atividade.anotacoes} alt="" /> */}
                            <a className="anexo_validar" href={"https://armazenamentogrupo3.blob.core.windows.net/amazenamento-simples-grp1/" + atividade.anotacoes}>Clique aqui para baixar o arquivo &#8681;</a>
                        </div>
                        {/* <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p> */}
                        <div className="organizar_btn">
                            <button className="btn_fechar_modal" onClick={closeModal}>Fechar</button>
                            <button className="btn_validar_atividades" onClick={() => { validarAtividades(atividade); closeModal() }}>Aprovar</button>
                            <button className="btn_recusar_atividades" onClick={() => { recusarAtividades(atividade); closeModal() }}>Recusar</button>
                            {/* {atividade.necessarioValidar && (
                            <button className="btn_validar_modal" onClick={validarAtividades(atividade)}>Validar</button>
                        )} */}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );

}
