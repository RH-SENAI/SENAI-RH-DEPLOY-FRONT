import { useState, useEffect } from "react";
import axios from 'axios';
import '../../assets/css/atualizarUsuario.css'
import Footer from '../../components/footer';
import Header from '../../components/header/headerAdm'
import { Navigate, useNavigate } from 'react-router-dom';
import fotoAtualizar from "../../assets/img/atualizarLight.svg"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeaderFuncionario from "../../components/header/headerFuncionario";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Vai precisar da auth para puxar as informações do usuário pertencente do perfil
// img perfil

export default function AtualizarPerfil() {

    const idUsuario = useParams();
    const history = useHistory();
    const [listaCargo, setListaCargo] = useState([])
    const [listaUnidade, setListaUnidade] = useState([])
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [listaTipoUsuario, setListaTipoUsuario] = useState([])
    const [usuario, setUsuario] = useState([])
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [endereco, setEndereco] = useState('')
    const [email, setEmail] = useState('')
    const [salario, setSalario] = useState(0)
    const [trofeu, setTrofeu] = useState(0)
    const [saldoMoeda, setSaldoMoeda] = useState(0)
    const [nivelSatisfacao, setNivelSatisfacao] = useState(0)
    const [vantagens, setVantagens] = useState(0)
    const [cpf, setCPF] = useState('')
    const [idCargo, setIdCargo] = useState(0)
    const [idUnidade, setIdUnidade] = useState(0)
    const [dataNascimento, setDataNascimento] = useState(new Date())
    const [fotoPerfil, setFotoPerfil] = useState('')

    const notify_atualizar = () => toast.success("Usuario Atualizado!");

    const notify_erroAtualizar = () => toast.error("Preencha todos os campos!");


    //Função de Buscar funcionário por ID
    function BuscarFuncionarios() {
        axios.get(`http://localhost:5000/api/Usuarios/Listar/`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {
                console.log(resposta.data)

                if (resposta.status === 200) {
                    setUsuario([resposta.data])
                }



            })

            .catch(erro => console.log(erro))


    }


    function BuscarTipoUsuario() {
        axios.get('http://localhost:5000/api/idTipoUsuarios/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaTipoUsuario(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }
    function BuscarCargos() {
        axios.get('http://localhost:5000/api/Cargos/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaCargo(resposta.data)
                    console.log(resposta)
                    notify_atualizar();
                }
            })

            .catch(erro => console.log(erro), notify_erroAtualizar())
    }

    function BuscarUnidade() {
        axios.get('http://localhost:5000/api/Unidadesenais/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaUnidade(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }

    function AtualizarUsuario(event) {

        event.preventDefault();

        var formData = new FormData();


        const element = document.getElementById('fotoPerfil')
        const file = element.files[0]


        if (element.value == "") {
            formData.append('novaFotoPerfil', null)

        } else {
            formData.append('novaFotoPerfil', file, file.name)

        }
        formData.append('idUsuario', idUsuario);
        formData.append('nome', nomeUsuario);
        formData.append('email', email);
        formData.append('dataNascimento', dataNascimento);
        formData.append('cpf', cpf);
        formData.append('idCargo', idCargo);
        formData.append('idTipoUsuario', idTipoUsuario);
        formData.append('idUnidadeSenai', idUnidade);
        formData.append('localizacaoUsuario', endereco);




        axios({
            method: "put",
            url: `http://localhost:5000/api/Usuarios/Atualizar/Funcionario/${idUsuario}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                console.log('usuario atualizado')
                alert("Usuario atualizado com sucesso!")
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }



    useEffect(BuscarFuncionarios, [])
    useEffect(BuscarTipoUsuario, [])
    useEffect(BuscarCargos, [])
    useEffect(BuscarUnidade, [])

    return (
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
            <HeaderFuncionario />

            <div className="main">
                <div className="container containerResponsivo g3_boxOrganizar">

                    <div className="g3_textoEFoto">
                        <span className="g3_boldCadastrar">
                            ATUALIZAR
                        </span>
                        <span className="g3_nonBoldCadastrar">
                            USUÁRIO
                        </span>
                        <span className="g3_spanAtualizar" >Foto De Perfil</span>
                        <div className="g3_fotoPerfilVazia">
                            {usuario.map((usuario) => {
                                return (
                                    <img className='g3_tamanhoFoto' src={"https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" + usuario.caminhoFotoPerfil} alt="Imagem de perfil vazia" />
                                )
                            }

                            )}

                        </div>
                        <input className="g3_inputCadastroFile" value={fotoPerfil} name='fotoPerfil' id='fotoPerfil' onChange={(event) => setFotoPerfil(event.target.value)} type="file" />
                        <label htmlFor="fotoPerfil" className="labelCadastroFoto">Inserir Foto</label>
                    </div>


                    <form className="g3_formOrganizar" onSubmit={AtualizarUsuario}>
                        <span className="g3_spanAtualizar" >Informações Gerais</span>
                        <div className='g3_bodyAtualizar'>

                            <div className="g3_formAtualizarLeft">
                                {/* <label className="labelAtualizar">Nome</label> */}
                                <input type="text" className="g3_inputAtualizar" name="nomeUsuario" placeholder="Nome Do Funcionário" value={nomeUsuario} onChange={(event) => setNomeUsuario(event.target.value)} />
                                {/* 
                            <label className="labelAtualizar">CPF</label> */}
                                <input type="text" className="g3_inputAtualizar" name="cpf" placeholder="CPF" value={cpf} onChange={(event) => setCPF(event.target.value)} />


                                {/* <label className="labelAtualizar">Endereço</label> */}
                                <input type="text" className="g3_inputAtualizar" name="endereco" placeholder="Endereço" value={endereco} onChange={(event) => setEndereco(event.target.value)} />

                                {/* <label className="labelAtualizar">Email</label> */}
                                <input type="text" className="g3_inputAtualizar" name="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />

                            </div>
                            <div className='g3_formAtualizarRight'>
                                {/* <label className="labelAtualizar">Data de nascimento</label> */}
                                <input type="date" className="g3_inputAtualizar" name="dataNascimento" value={dataNascimento} onChange={(event) => setDataNascimento(event.target.value)} />
                                <select
                                    name="idTipoUsuario"
                                    value={idTipoUsuario}
                                    className="g3_inputAtualizarSelect"
                                    onChange={(event) => setIdTipoUsuario(event.target.value)}

                                >

                                    <option value="#">Tipo de Usuario</option>
                                    {listaTipoUsuario.map((event) => {
                                        return (

                                            <option key={event.idTipoUsuario} value={event.idTipoUsuario}>{event.nomeTipoUsuario}
                                            </option>
                                        );
                                    })}

                                </select>
                                {/* <label className="labelAtualizar">Unidade</label> */}
                                <select name="Unidade"
                                    value={idUnidade}
                                    onChange={event => setIdUnidade(event.target.value)}
                                    className="g3_inputAtualizarSelect"

                                >
                                    <option value="#">Unidade</option>
                                    {listaUnidade.map((event) => {
                                        return (

                                            <option key={event.idUnidade} value={event.idUnidadeSenai}>{event.nomeUnidadeSenai}
                                            </option>
                                        );
                                    })}

                                </select>
                                {/* <label className="labelAtualizar">Cargo</label> */}
                                <select name="Cargo"
                                    value={idCargo}
                                    onChange={event => setIdCargo(event.target.value)}
                                    className="g3_inputAtualizarSelect"

                                >
                                    <option value="#">Cargo</option>
                                    {listaCargo.map((event) => {
                                        return (

                                            <option key={event.idCargo} value={event.idCargo}>{event.nomeCargo}
                                            </option>
                                        );
                                    })}

                                </select>
                            </div>
                        </div>
                        <button type="submit" className="g3_botaoAtualizar">Atualizar</button>
                    </form>
                </div>
            </div>
            <Footer />



        </div>

    )
}
