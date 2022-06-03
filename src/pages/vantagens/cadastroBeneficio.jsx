import telaCadastroVantagens from '../../assets/img/telaCadastroVantagens.svg'
import iconeEnviarArquivo from '../../assets/img/iconeEnviarArquivo.png'
import '../../assets/css/cadastroCursos.css'
import '../../assets/css/cadastroBeneficio.css'
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../services/api";
import HeaderFuncionario from '../../components/header/headerFuncionario';
import Navbar from '../../components/MenuHamburguer/Nav';

export default function CadastrarBeneficio() {
    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Cadastro realizado com sucesso!")


    //buscar empresas
    const [listaEmpresa, setListaEmpresa] = useState([])



    function buscarEmpresas() {
        api('/Empresas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    setListaEmpresa(resposta.data)
                    console.log('Aqui resposta')
                    console.log(resposta)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(buscarEmpresas, [])


    //Efetuar o cadastro
    const [idEmpresa, setIdEmpresa] = useState(0)
    const [nomeDesconto, setNomeDesconto] = useState('')
    const [descricaoDesconto, setDescricaoDesconto] = useState('')
    const [numeroCupom, setNumeroCupom] = useState('')
    const [valorDesconto, setValorDesconto] = useState(0)
    const [validadeDesconto, setValidadeDesconto] = useState(new Date())
    const [fotoDesconto, setFotoDesconto] = useState([])
    const [caminhoImagemDesconto, setCaminhoImagemDesconto] = useState('');


    const efetuarCadastroBeneficio = (event) => {
        event.preventDefault();
        debugger;
        var formData = new FormData();
        const element = document.getElementById('fotoDesconto')
        const file = element.files[0]
        formData.append('fotoDesconto', file, file.name)
        formData.append('idEmpresa', idEmpresa);
        formData.append('nomeDesconto', nomeDesconto);
        formData.append('descricaoDesconto', descricaoDesconto);
        formData.append('caminhoImagemDesconto', caminhoImagemDesconto);
        formData.append('validadeDesconto', validadeDesconto);
        formData.append('valorDesconto', valorDesconto);
        formData.append('numeroCupom', numeroCupom);
        api({
            method: "post",
            url: "/Descontos/Cadastrar",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                setFotoDesconto();
                notify_cadastro_sucess();
                limparInput()
            })
            .catch(resposta => notify_Logar_Failed())
    }

    function limparInput() {
        setIdEmpresa(0)
        setNomeDesconto('')
        setDescricaoDesconto('')
        setNumeroCupom('')
        setValorDesconto(0)
        setValidadeDesconto(new Date())
        setFotoDesconto([])
        setCaminhoImagemDesconto('')
    }

    return (
        <div className="geral_g2">
            {/* <HeaderAdm /> */}
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

            <div className=" container_cadastrarBeneficio container_forms_cadastroBeneficio_g2">
                <div className="box_img_cadastroBeneficio_g2">
                    <img className="img_cadastroBeneficio_g2" src={telaCadastroVantagens} alt="imagemCadastroBeneficio" />
                </div>
                <form onSubmit={efetuarCadastroBeneficio} action="">
                    <div className="box_forms_cadastroBeneficio_g2">
                        <div className="title_cadastroBeneficio_g2">
                            <h1>Cadastro de  Vantagens</h1>
                        </div>
                        <div className="box_inputs_cadastroBeneficio_g2">


                            <div className="container_cadastroBeneficio_inputs_g2 ">

                                <div className="div_input_1_g2">
                                    <div className="input_g2_cadastro">
                                        <input
                                            id="nomeDesconto"
                                            onChange={(campo) => setNomeDesconto(campo.target.value)}
                                            value={nomeDesconto}
                                            type="text"
                                            name="nomeDesconto"
                                            placeholder="Vantagem"
                                        />
                                        <label htmlFor="nomeDesconto" >Vantagem</label>
                                    </div>



                                    <div className="input_g2_cadastro">

                                        <input
                                            id="validadeDesconto"
                                            onChange={(campo) => setValidadeDesconto(campo.target.value)}
                                            name="validadeDesconto"
                                            value={validadeDesconto}
                                            type="date"
                                        />
                                        <label htmlFor="validadeDesconto">Validade</label>

                                    </div>

                                </div>

                                <div>
                                    <div className="input_g2_cadastro">
                                        <input
                                            className="descricao_g2"
                                            onChange={(campo) => setDescricaoDesconto(campo.target.value)}
                                            value={descricaoDesconto}
                                            id='descricaoDesconto'
                                            name="descricaoDesconto"
                                            type="text"
                                            placeholder="Descrição"
                                        />
                                        <label htmlFor="descricaoDesconto" >Descrição</label>
                                    </div>

                                </div>



                                <div className="div_input_1_g2">
                                    <div>

                                        <div className="input_g2_cadastro">
                                            <input
                                                onChange={(campo) => setNumeroCupom(campo.target.value)}
                                                value={numeroCupom}
                                                id='numeroCupom'
                                                name="numeroCupom"
                                                type="text"
                                                placeholder="Cupom"
                                            />
                                            <label htmlFor="numeroCupom" >Cupom</label>
                                        </div>



                                        <div>
                                            <label for="arquivo"></label>
                                            <label className="label_arquivo_cadastroBeneficio_g2" htmlFor="fotoDesconto">  <img className="img_file_cadastro_empresa_g2" src={iconeEnviarArquivo} alt="" />Enviar arquivo</label>
                                            <input
                                                accept="image/png, image/jpeg"
                                                id="fotoDesconto"
                                                name="arquivo"
                                                className="input_file_cadastroBeneficio_g2"
                                                type="file"
                                            />
                                        </div>

                                    </div>


                                    <div>

                                        <div>
                                            <label htmlFor="idEmpresaB"></label>
                                            <select
                                                className="inputCadastroBeneficioSelect_g2"
                                                id="idEmpresaB"
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



                                        <div className="input_g2_cadastro">
                                            <input
                                                onChange={(campo) => setValorDesconto(campo.target.value)}
                                                value={valorDesconto}
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
                        <div className="btn_cadastroBeneficio_g2">
                            <button type="submit" className="botaoCadastroBeneficio_g2">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}