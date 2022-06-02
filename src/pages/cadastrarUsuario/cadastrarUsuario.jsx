import { useEffect, useState } from "react"
import axios from "axios";
import CadastroLight from "../../assets/img/ImgCadastroLight.svg";
import "../../assets/css/cadastro.css"
import "../../assets/css/footer.css"
import "../../assets/css/styleG3.css"
import Footer from "../../components/footer";
import HeaderFuncionario from "../../components/header/headerFuncionario";
import Navbar from "../../components/MenuHamburguer/Nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Cadastro() {

    const [idUsuario] = useState(0)
    const [listaCargo, setListaCargo] = useState([])
    const [listaUnidade, setListaUnidade] = useState([])
    const [listaTipoUsuario, setListaTipoUsuario] = useState([])
    const [listaGrupos, setListaGrupos] = useState([])
    const [idTipoUsuario, setIdTipoUsuario] = useState(0)
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [endereco, setEndereco] = useState('')
    const [email, setEmail] = useState('')
    const [CPF, setCPF] = useState('')
    const [idGrupo, setIdGrupo] = useState(0)
    const [idCargo, setIdCargo] = useState(0)
    const [idUnidade, setIdUnidade] = useState(0)
    const [dataNascimento, setDataNascimento] = useState(new Date())
    const [fotoPerfil, setFotoPerfil] = useState('')
    const [senha] = useState('SesiSenai@2022')

    const notify_cadastrar = () => toast.success("Usuario Cadastrado!");

    const notify_erroCadastrar = () => toast.error("Preencha todos os campos!");




    function CadastrarLotacao() {
        let lotacao = {

            idGrupo: idGrupo,
            cpf: CPF
        }

        axios.post('https://apigrupo3.azurewebsites.net/api/Lotacoes/Cadastrar', lotacao, {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )
            .then(console.log("Deu certo"))

            .catch(erro => console.log(erro))
    }

    function BuscarCargos() {
        axios.get('https://apigrupo3.azurewebsites.net/api/Cargos/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaCargo(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }

    function BuscarUnidade() {
        axios.get('https://apigrupo3.azurewebsites.net/api/Unidadesenais/Listar', {
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

    function BuscarGrupos() {
        axios.get('https://apigrupo3.azurewebsites.net/api/Grupos/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaGrupos(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }

    function BuscarTipoUsuario() {
        axios.get('https://apigrupo3.azurewebsites.net/api/idTipoUsuarios/Listar', {
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


    const CadastrarUsuario = (event) => {

        event.preventDefault();

        var formData = new FormData();

        const element = document.getElementById('fotoCadastro')
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
        formData.append('cpf', CPF);
        formData.append('idCargo', idCargo);
        formData.append('idTipoUsuario', idTipoUsuario);
        formData.append('idUnidadeSenai', idUnidade);
        formData.append('localizacaoUsuario', endereco);
        formData.append('senha', senha);

        axios({
            method: "post",
            url: "https://apigrupo3.azurewebsites.net/api/Usuarios/Cadastrar",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(async function (response) {

                if (response.status == 201) {
                    notify_cadastrar();
                    CadastrarLotacao();
                }
            })
            .catch(erro => { notify_erroCadastrar(); console.log(erro) })

    }
    // function CadastrarUsuario(usuario) {
    //     usuario.preventDefault()

    //     var formData = new FormData();

    //     formData.append('idUsuario', idUsuario);
    //     formData.append('nome', nomeUsuario);
    //     formData.append('email', email);
    //     formData.append('senha', senha);
    //     formData.append('dataNascimento', dataNascimento);
    //     formData.append('cpf', CPF);
    //     formData.append('salario', salario);
    //     formData.append('idCargo', idCargo);
    //     formData.append('idUnidadeSenai', idUnidade);
    //     formData.append('idTipoUsuario', idTipoUsuario);
    //     formData.append('localizacaoUsuario', endereco);
    //     formData.append('caminhoFotoPerfil', "");
    //     formData.append('fotoPerfil', null);
    //     formData.append('trofeu', trofeu)
    //     formData.append('saldoMoeda', saldoMoeda)
    //     formData.append('nivelSatisfacao', nivelSatisfacao)
    //     formData.append('vantagens', vantagens)

    //     fetch(
    //         "http://localhost:5000/api/Usuarios/"+"Cadastrar",
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({ formData }),
    //             headers: { "Content-Type": "multipart/form-data" },
    //         }
    //     )
    //         .then(function (response) {
    //             console.log(response);
    //             console.log('usuario cadastrado')
    //         })
    //         .catch(function (response) {
    //             //handle error
    //             console.log(response);
    //         });
    // }

    useEffect(BuscarTipoUsuario, [])
    useEffect(BuscarCargos, [])
    useEffect(BuscarUnidade, [])
    useEffect(BuscarGrupos, [])


    return (
        <div className='g3_backgroundCadastro'>
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
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>
            <main>
                <div className="container ">
                    <div className="g3_boxCadastro">

                        <div className="g3_boxImg">
                            <img className="g3_imgCadastro" src={CadastroLight} alt="ImgCadastro" />
                        </div>
                        <div className='g3_containerCadastro'>
                            <form className="g3_formCadastro" onSubmit={CadastrarUsuario}>
                                <span className="g3_boldCadastrar animate__animated animate__fadeInUp">
                                    CADASTRO
                                </span>
                                <span className="g3_nonBoldCadastrar  animate__animated animate__fadeInUp">
                                    DE USUÁRIO
                                </span>
                                <div className='g3_containerFotoCadastro'>
                                    <div className='g3_boxFotoCadastro'>
                                        {/* <img src={"https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/Imagens/" + usuario.caminhoFotoPerfil}></img> */}
                                    </div>
                                    <label htmlFor="fotoCadastro" className="g3_labelCadastroFoto">Inserir Foto</label>
                                    <input
                                        type='file'
                                        className="g3_inputCadastroFile"
                                        name='fotoCadastro'
                                        id="fotoCadastro"
                                        value={fotoPerfil}

                                        onChange={(event) => setFotoPerfil(event.target.value)}
                                    />
                                </div>
                                <div className="g3_bodyCadastro">

                                    <div className='g3_bodyCadastroLeft'>
                                        {/* <label className="labelCadastro">Nome Do Usuario</label> */}
                                        <input type="text" className="g3_inputCadastro" name="nomeUsuario" placeholder="Nome Do Usuario" value={nomeUsuario} onChange={(event) => setNomeUsuario(event.target.value)} />

                                        {/* <label className="labelCadastro">Endereço</label> */}
                                        {/* <input type="text" className="g3_inputCadastro" name="endereco" placeholder="Endereço" value={endereco} onChange={(event) => setEndereco(event.target.value)} /> */}

                                        {/* <label className="labelCadastro">Email</label> */}
                                        <input type="text" className="g3_inputCadastro" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

                                        {/* <label className="labelCadastro">CPF</label> */}
                                        <input type="text" className="g3_inputCadastro" name="CPF" placeholder="CPF" value={CPF} onChange={(event) => setCPF(event.target.value)} />
                                        <input className="g3_inputCadastroData" value={dataNascimento} onChange={(event) => setDataNascimento(event.target.value)} type="date" />
                                    </div>
                                    <div className='g3_bodyCadastroRight'>
                                        {/* <label className="labelCadastro">Setor</label> */}
                                        <select
                                            name="idTipoUsuario"
                                            value={idTipoUsuario}
                                            className="g3_inputCadastroSelect"
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

                                        {/* <label className="labelCadastro">Cargo</label> */}
                                        <select
                                            name="Cargo"
                                            value={idCargo}
                                            onChange={(event) => setIdCargo(event.target.value)}
                                            className="g3_inputCadastroSelect"

                                        >
                                            <option value="#">Cargo</option>
                                            {
                                                listaCargo.map((event) => {
                                                    return (

                                                        <option key={event.idCargo} value={event.idCargo}>{event.nomeCargo}
                                                        </option>
                                                    );
                                                })}

                                        </select>
                                        {/* <label className="labelCadastro">Unidade</label> */}
                                        <select name="Unidade"
                                            value={idUnidade}
                                            onChange={(event) => setIdUnidade(event.target.value)}
                                            className="g3_inputCadastroSelect"

                                        >
                                            <option value="#">Unidade</option>
                                            {
                                                listaUnidade.map((event) => {
                                                    return (

                                                        <option key={event.idUnidade} value={event.idUnidadeSenai}>{event.nomeUnidadeSenai}
                                                        </option>
                                                    );
                                                })}

                                        </select>

                                        <select name="Lotacao"
                                            value={idGrupo}
                                            onChange={(event) => setIdGrupo(event.target.value)}
                                            className="g3_inputCadastroSelect"

                                        >
                                            <option value="#">Grupos</option>
                                            {
                                                listaGrupos.map((grupo) => {
                                                    return (

                                                        <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nomeGrupo}
                                                        </option>
                                                    );
                                                })}

                                        </select>
                                        {/* <label className="labelCadastro">Data de nascimento</label> */}

                                    </div>

                                </div>
                                <button type="submit" className="g3_botaoCadastro">Cadastrar</button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>

    );
}