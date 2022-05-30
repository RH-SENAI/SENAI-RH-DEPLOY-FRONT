import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/gp1style.css'
import Rodape from '../../components/Footer';
import Header from '../../components/header/headerFuncionario';
import { Link, useHistory } from 'react-router-dom'
import { Modall } from '../../components/modal'
import { ModallValidar } from '../../components/modalValidar'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastrarAtividades() {
    const [listaAtividades, setListaAtividades] = useState([]);
    const [listaAtividadesValidar, setListaAtividadesValidar] = useState([]);
    const [idAtividade, setIdAtividade] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalValidar, setShowModalValidar] = useState(false);
    const [idAtividadeModal, setIdAtividadeModal] = useState()
    const [idSetor, setIdSetor] = useState('');
    const [nomeAtividade, setNomeAtividade] = useState('');
    const [recompensaMoeda, setRecompensaMoeda] = useState('');
    const [recompensaTrofeu, setRecompensaTrofeu] = useState('');
    const [descricaoAtividade, setDescricaoAtividade] = useState('');
    const [necessarioValidar, setNecessarioValidar] = useState(false);
    const notify_cadastrar = () => toast.success("Atividade Cadastrada!");
    // const notify_validar = () => toast.success("Atividade Validada!");
    const notify_Logar = () => toast.success("Usuario logado!");
    
    const [isLoading, setIsLoading] = useState(false);

    const OpenModal = () => {
        setShowModal(prev => !prev);
    }

    const OpenModalValidar = () => {
        setShowModalValidar(prev => !prev);
    }


    function listarAtividades() {
        axios.get("http://localhost:5000/api/Atividades"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaAtividades(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };

    useEffect(listarAtividades, []);

    function listarAtividadesValidar() {
        axios("http://localhost:5000/api/Atividades/ListaValidar"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaAtividadesValidar(resposta.data)
                    console.log(listaAtividades)
                }
            })

            .catch(erro => console.log(erro))
        console.log(listaAtividadesValidar)
    };

    useEffect(listarAtividadesValidar, []);

    async function CadastrarAtividade(evento) {
        setIsLoading(true);
        evento.preventDefault()

        await axios
            .post('http://localhost:5000/api/Atividades', {
                idAtividade: idAtividade,
                idSetor: idSetor,
                nomeAtividade: nomeAtividade,
                recompensaMoeda: recompensaMoeda,
                recompensaTrofeu: recompensaTrofeu,
                descricaoAtividade: descricaoAtividade,
                necessarioValidar: necessarioValidar
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Atividade cadastrada');
                    setIdAtividade('');
                    setIdSetor('');
                    setNomeAtividade('');
                    setRecompensaMoeda('');
                    setRecompensaTrofeu('');
                    setRecompensaTrofeu('');
                    setDescricaoAtividade('');
                    setNecessarioValidar(false);
                    setIsLoading(false);
                    // setListaSetores([]);
                }
            })
            .catch(erro => console.log(erro), setIdAtividade(''), setIdSetor(''), setNomeAtividade(''), setInterval(() => {
                setIsLoading(false)
            }, 5000));
            notify_cadastrar();
            listarAtividades();
            
            
        }

    function checkValidar() {
        console.log(necessarioValidar + " - Anterior")
        setNecessarioValidar(!necessarioValidar)
        console.log(necessarioValidar + " - Atual")
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);
    let subtitle;


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const custonModal = {
        content: {
            display: 'none',
            position: 'fixed',
            left: '0',
            top: '0',
            height: '100%',
            width: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflowy: 'hidden',
            overflowx: 'hidden',
            zindex: '1'
        }
    }

    // useEffect(notify_Logar, []);
    // useEffect(listarAtividades, cadastrarAtividade);

    return (
        <div className="div_container">
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
            <Modall atividade={listaAtividades.find(atividade => atividade.idAtividade == idAtividadeModal)} showModal={showModal} setShowModal={setShowModal} />
            <ModallValidar atividade={listaAtividadesValidar.find(atividade => atividade.idAtividade == idAtividadeModal)} showModalValidar={showModalValidar} setShowModalValidar={setShowModalValidar} />

            <Header />
            <div className="container_">
                <div className="container_cards">

                    {/* CADASTRO DE ATIVIDADES */}
                    <div className="container_cadastro">
                        <div className="container_navs">
                            <nav className="nav_links">
                                <Link to="/" className="links">Cadastrar Atividades</Link>
                                <Link to="/" className="links">Validar Atividades</Link>
                                <Link to="/" className="links">Marketplace</Link>
                                <Link to="/" className="links">Usuários</Link>
                                <Link to="/" className="links">Ranking</Link>
                            </nav>
                        </div>
                        <h1>Cadastrar Atividade</h1>

                        <form onSubmit={CadastrarAtividade} className="form_cadastro">
                            <label className="label_form">Título da Atividade</label>
                            <input placeholder="Digite o título da atividade"
                                className="input_text"
                                type="text"
                                name="nome"
                                value={nomeAtividade}
                                onChange={(campo) => setNomeAtividade(campo.target.value)}
                            />

                            <label className="label_form">Descrição da Atividade</label>
                            <input placeholder="Digite a descição da atividade"
                                className="input_text"
                                type="text"
                                name="descricao"
                                value={descricaoAtividade}
                                onChange={(campo) => setDescricaoAtividade(campo.target.value)}
                            />

                            <label className="label_form">Premiação em moedas</label>
                            <input placeholder="Insira a premiação pela atividade"
                                className="input_text"
                                type="text"
                                name="moedas"
                                value={recompensaMoeda}
                                onChange={(campo) => setRecompensaMoeda(campo.target.value)}
                            />

                            <label className="label_form">Premiação em troféus</label>
                            <input placeholder="Insira a premiação pela atividade"
                                className="input_text"
                                type="text"
                                name="trofeu"
                                value={recompensaTrofeu}
                                onChange={(campo) => setRecompensaTrofeu(campo.target.value)}
                            />
                            <label className="label_form">Precisa Validar</label>
                            <div className="container_btn">
                                <input type="checkbox"
                                    id="switch"
                                    name="validar"
                                    value={necessarioValidar}
                                    onClick={checkValidar}
                                /><label className='label_switch' htmlFor="switch">Toggle</label>
                                {necessarioValidar && (
                                    <p className='text_switch'>
                                        SIM
                                    </p>
                                )}
                                {!necessarioValidar && (
                                    <p className='text_switch'>
                                        NÃO
                                    </p>
                                )}


                            </div>
                            {isLoading && (
                                <button disabled className='btn_cadastrar' type='submit'>
                                    Carregando...
                                </button>
                            )}
                            {!isLoading && (
                                <button className='btn_cadastrar' type='submit'>
                                    Cadastrar
                                </button>
                            )}
                        </form>
                    </div>

                    {/* LISTAGEM DE ATIVIDADES */}
                    <div>
                        <div className="container_card_atividades">
                            <h1>Todas Atividades</h1>
                            <div className='container_atividades'>

                                {listaAtividades.map((atividade) => {
                                    return (
                                        <div key={atividade.idAtividade}>
                                            <div className='box_atividade'>
                                                <div className='organizar_atividade'>
                                                    <h2 className='titulo_atividade'>{atividade.nomeAtividade}</h2>
                                                    <p className='descricao_atividade'>{atividade.descricaoAtividade}</p>
                                                </div>
                                                <button onClick={OpenModal} onClickCapture={() => setIdAtividadeModal(atividade.idAtividade)} className="button">
                                                    <img className='img_olho' src={img_olho} alt="Icone de um olho" />
                                                </button>
                                            </div>
                                            <hr className='linha_atividade' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* LISTAGEM DE ATIVIDADES VALIDAR */}
                    <div>
                        <div className="container_card_atividades">
                            <h1>Validar Atividades</h1>
                            <div className='container_atividades'>

                                {listaAtividadesValidar.map((atividade) => {

                                    return (
                                        <div key={atividade.idAtividade}>
                                            <div className='box_atividade'>
                                                <div className='organizar_atividade'>
                                                    <h2 className='titulo_atividade'>{atividade.nomeAtividade}</h2>
                                                    <p className='descricao_atividade'>{atividade.descricaoAtividade}</p>
                                                </div>
                                                <button type="button" onClick={() => {
                                                    OpenModalValidar();
                                                    setIdAtividadeModal(atividade.idAtividade);
                                                }} className="button">
                                                    <img className='img_olho' src={img_olho} alt="Icone de um olho" />
                                                </button>
                                            </div>
                                            <hr className='linha_atividade' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Rodape />
        </div>
    );
}

