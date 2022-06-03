import HeaderAdm from "../../components/header/headerAdm";
import cadastroCurso from '../../assets/img/cadastroCurso.svg'
import iconeEnviarArquivo from '../../assets/img/iconeEnviarArquivo.png'
import '../../assets/css/cadastroCursos.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import HeaderFuncionario from '../../components/header/headerFuncionario';
import Navbar from '../../components/MenuHamburguer/Nav';

export default function CadastrarCursos() {
    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Cadastro realizado com sucesso!")
    const [idEmpresa, setIdEmpresa] = useState(0)
    const [nomeCurso, setNomeCurso] = useState('')
    const [descricaoCurso, setDescricaoCurso] = useState('')
    const [siteCurso, setSiteCurso] = useState('')
    const [cargaHoraria, setCargaHoraria] = useState(0)
    const [modalidadeCurso, setModalidadeCurso] = useState(false)
    const [dataFinalizacao, setDataFinalizacao] = useState(new Date())
    const [fotoCurso, setFotoCurso] = useState([])
    const [caminhoImagemCurso, setCaminhoImagemCurso] = useState('');
    const [valorCurso, setValorCurso] = useState('');
    const [listaEmpresa, setListaEmpresa] = useState([])



    function presencial() {
        setModalidadeCurso(true)
    }

    function ead() {
        setModalidadeCurso(false)
    }

    function buscarEmpresas() {
        api('/Empresas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaEmpresa(resposta.data)
                    console.log(resposta)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(buscarEmpresas, [])

    const efetuarCadastro = (event) => {
        event.preventDefault();
        var formData = new FormData();
        const element = document.getElementById('arquivo')
        const file = element.files[0]
        formData.append('fotoCurso', file, file.name)
        formData.append('idEmpresa', idEmpresa);
        formData.append('nomeCurso', nomeCurso);
        formData.append('descricaoCurso', descricaoCurso);
        formData.append('siteCurso', siteCurso);
        formData.append('modalidadeCurso', modalidadeCurso);
        formData.append('cargaHoraria', cargaHoraria);
        formData.append('dataFinalizacao', dataFinalizacao);
        formData.append('caminhoImagemCurso', caminhoImagemCurso);
        formData.append('valorCurso', valorCurso);

        api({
            method: "post",
            url: "/Cursos/Cadastrar",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                setFotoCurso();
                notify_cadastro_sucess();
                limparInput();
            })
            .catch(resposta => notify_Logar_Failed())
    }

    //Limpar os states/inputs
    function limparInput() {
        setIdEmpresa(0)
        setNomeCurso('')
        setDescricaoCurso('')
        setSiteCurso('')
        setModalidadeCurso(false)
        setCargaHoraria(0)
        setDataFinalizacao(new Date())
        setCaminhoImagemCurso('')
        setValorCurso(0)
    }

    return (
        <div className="geral_g2">

            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>

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

            <div className="container_lista_curso container_forms_cadastroCursos_g2">

                <div className="box_img_cadastroCurso_g2">
                    <img className="img_cadastroCurso_g2" src={cadastroCurso} alt="imagemCadastroCurso" />
                </div>


                <form onSubmit={efetuarCadastro}>

                    <div className="box_forms_cadastroCurso_g2">

                        <div className="title_cadastroCurso_g2">
                            <h1>Cadastro de Cursos</h1  >
                        </div>

                        <div className="box_inputs_cadastroCurso_g2">

                            <div className="container_cadastroCurso_inputs_g2">

                                <div className="div_input_1_g2">
                                    <div className="input_g2_cadastro">
                                        <input
                                            id="nomeCurso"
                                            onChange={(campo) => setNomeCurso(campo.target.value)}
                                            value={nomeCurso}
                                            type="text"
                                            name="nomeCurso"
                                            placeholder="Curso"
                                        />
                                        <label for="nomeCurso">Curso</label>
                                    </div>



                                    <div className="input_g2_cadastro">
                                        <input
                                            onChange={(campo) => setDataFinalizacao(campo.target.value)}
                                            name="data"
                                            value={dataFinalizacao}
                                            type="date"
                                            placeholder="Data de Finalização"
                                        />
                                        <label for="data">Data de Finalização</label>
                                    </div>

                                </div>




                                <div>
                                    <div className="input_g2_cadastro">
                                        <input
                                            className="descricao_g2"
                                            onChange={(campo) => setDescricaoCurso(campo.target.value)}
                                            value={descricaoCurso}
                                            type="text"
                                            name='descricao'
                                            placeholder="Descrição"
                                        />
                                        <label for='descricao'>Descrição</label>
                                    </div>
                                </div>




                                <div className="div_input_1_g2">
                                    {/* 1 parte */}

                                    <div>


                                        <div className="input_g2_cadastro">
                                            <input
                                                onChange={(campo) => setCargaHoraria(campo.target.value)}
                                                className="flex_co"
                                                value={cargaHoraria}
                                                name="cargaHoraria"
                                                placeholder="Carga horária"
                                                type="number"
                                            />
                                            <label for="cargaHoraria">Carga Horária</label>
                                        </div>

                                        <div className="input_g2_cadastro">
                                            <input
                                                value={siteCurso}
                                                name="siteCurso"
                                                onChange={(campo) => setSiteCurso(campo.target.value)}
                                                type="text"
                                                placeholder="Site do Curso"
                                            />
                                            <label for="siteCurso">Site do Curso</label>
                                        </div>


                                        <div>
                                            <label className="label_arquivo_cadastroCurso_g2" htmlFor="arquivo"> <img className="img_file_cadastro_curso_g2" src={iconeEnviarArquivo} alt="" /> Enviar arquivo</label>
                                            <input
                                                accept="image/png, image/jpeg"
                                                id="arquivo"
                                                name="arquivo"
                                                className="input_file_cadastroCurso_g2 "
                                                type="file"
                                            />
                                        </div>
                                    </div>

                                    {/* 2 parte */}
                                    <div>

                                        <div>
                                            <label for="idEmpresa" ></label>
                                            <select
                                                className="inputCadastroCursoSelect_g2"
                                                id="idEmpresa"
                                                onChange={(campo) => setIdEmpresa(campo.target.value)}
                                                value={idEmpresa}
                                            >

                                                <option value="0">Empresa</option>

                                                {
                                                    listaEmpresa.map((empresa) => {
                                                        return (
                                                            <option key={empresa.idEmpresa} value={empresa.idEmpresa}>
                                                                {empresa.nomeEmpresa}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div >
                                            <label for="modalidade"></label>
                                            <select
                                                className="inputCadastroCursoSelect_g2"
                                                name="modalidade"
                                                onChange={(campo) => setModalidadeCurso(campo.target.value)}
                                            >

                                                <option value={presencial}>Presencial</option>
                                                <option value={modalidadeCurso}>EAD</option>
                                            </select>
                                        </div>


                                        <div className="input_g2_cadastro">
                                            <input
                                                onChange={(campo) => setValorCurso(campo.target.value)}
                                                value={valorCurso}
                                                id='cashes'
                                                name="cashes"
                                                type="number"
                                                placeholder="$ Cashes"
                                            />
                                            <label htmlFor="cashes" >Cashes</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_cadastroCurso_g2">
                            <button type="submit" className="botaoCadastroCurso_g2">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div >
            <Footer />
        </div >
    )
}