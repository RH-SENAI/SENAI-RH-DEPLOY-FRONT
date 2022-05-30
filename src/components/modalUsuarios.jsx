import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../assets/css/gp1style.css'

export const Modall = ({ showModal, setShowModal, usuarios, setProps, value }) => {

    const [listaUsuarioSelecionados, setListaUsuarioSelecionados] = useState([]);
    const [lastAtividade, setLastAtividade] = useState();
    const modalRef = useRef();

    let history = useHistory();

    const closeModal = e => {
        setShowModal(false);
        console.log('showModal antes:' + showModal)

        console.log('showModal depois:' + showModal)
    };

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

    // function AssociarArray() {
    //     axios("http://localhost:5000/api/Atividades/ListarUltima"
    //         , {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //             }
    //         })
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 setLastAtividade(resposta.data)
    //                 console.log(resposta.data)
    //             }
    //         })
    //         .catch(erro => console.log(erro))

    //     listaUsuarioSelecionados.map((usuario) => {
    //         axios("http://apirhsenaigp1.azurewebsites.net/api/Atividades/Associar/" +
    //             usuario.idUsuario + '/' + lastAtividade.idAtividade
    //             , {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //                 }
    //             })
    //             .catch(erro => console.log(erro))
    //     })
    // }

    function AlimentarArray(id) {
        listaUsuarioSelecionados.push(id)
        console.log(id)
        console.log(listaUsuarioSelecionados)
        setProps(listaUsuarioSelecionados)
    }


    return (
        <>
            {showModal ? (
                // <div className="background_modal">
                    <div class="modal_body_usuarios">
                        <h2 className="titulo_atividade_modal">Selecionar Usuário</h2>
                        <div className='organizar_sessao_modalUser style-gp1'>
                            <div className='organiza_select_todos'>
                                <label className="titulo_atividade" htmlFor="">Todos Usuarios</label>
                                <input className="checkbox_usuario"
                                    type="checkbox"
                                    onClick={() => setProps(usuarios)}
                                />
                            </div>
                            <hr className='linha_atividade' />
                            {usuarios.map((usuario) => {
                                return (
                                    <div key={usuario.idUsuario} className="div_map">
                                        <div className='box_atividade'>
                                            <div className='organizar_atividade'>
                                                <h2 className='titulo_atividade'>{usuario.nome}</h2>
                                                <input className="checkbox_usuario"
                                                    type="checkbox"
                                                    value={usuario.idUsuario}
                                                    onClick={() => AlimentarArray(usuario.idUsuario)}
                                                />
                                            </div>
                                        </div>
                                        <hr className='linha_atividade' />
                                    </div>

                                )
                            })}
                        </div>
                        <div className="organizar_btn">
                            <button className="btn_fechar_modal" onClick={() => {closeModal(); console.log(listaUsuarioSelecionados)}}>Fechar</button>
                        </div>
                    </div>
                // </div>
            ) : null}
        </>
    );

}
