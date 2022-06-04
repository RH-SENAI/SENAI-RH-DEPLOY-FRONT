import cadastroEmpresa from '../../assets/img/cadastroEmpresa.svg'
import '../../assets/css/cadastroEmpresa.css'
import iconeEnviarArquivo from '../../assets/img/iconeEnviarArquivo.png'
import Footer from "../../components/footer";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import HeaderFuncionario from '../../components/header/headerFuncionario';
import Navbar from '../../components/MenuHamburguer/Nav';


export default function CadastrarEmpresa() {

    const notify_Logar_Failed = () => toast.error("Algo deu errado, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Empresa cadastrada com sucesso!")

    const { setValue, setFocus, register } = useForm();

    const checkCEP = (campo) => {
        const cep1 = campo.target.value.replace(/\D/g, '');
        console.log(cep1);
        fetch(`https://viacep.com.br/ws/${cep1}/json/`)
            .then(res => res.json()).then(data => {
                console.log(data);
                setValue('logradouro', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setFocus('addressNumber')
            });
    }


    const [nomeEmpresa, setNomeEmpresa] = useState('')
    const [emailEmpresa, setEmailEmpresa] = useState('')
    const [caminhoImagemEmpresa, setCaminhoImagemEmpresa] = useState('');
    const [telefoneEmpresa, setTelefoneEmpresa] = useState("")
    const [nomeBairro, setNomeBairro] = useState('')
    const [nomeLogradouro, setNomeLogradouro] = useState('')
    const [nomeCidade, setNomeCidade] = useState('')
    const [nomeEstado, setNomeEstado] = useState('')
    const [cep1, setCep1] = useState('')
    const [numero, setNumero] = useState(0)

    const efetuarCadastro = (event) => {
        event.preventDefault();
        var formData = new FormData();
        const element = document.getElementById('fotoEmpresa')
        const file = element.files[0]
        formData.append('fotoEmpresa', file, file.name)
        formData.append('nomeEmpresa', nomeEmpresa);
        formData.append('emailEmpresa', emailEmpresa);
        formData.append('telefoneEmpresa', telefoneEmpresa);
        formData.append('caminhoImagemEmpresa', caminhoImagemEmpresa);
        formData.append('cep', cep1);
        formData.append('numero', document.getElementById('numero').value);
        formData.append('cidade', document.getElementById('nomeCidade').value);
        formData.append('logradouro', document.getElementById('logradouro').value);
        formData.append('estado', document.getElementById('nomeEstado').value);
        formData.append('bairro', document.getElementById('bairro').value);

        api({
            method: "post",
            url: "/Empresas/Cadastrar",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                notify_cadastro_sucess();
                limparInput();
            })
            .catch(resposta => notify_Logar_Failed())
    }

    //Limpar os states/inputs
    function limparInput() {
        setNomeEmpresa('')
        setEmailEmpresa('')
        setTelefoneEmpresa('')
        setCaminhoImagemEmpresa('')
        setCep1('')
        setNumero(0)
        setNomeBairro('')
        setNomeCidade('')
        setNomeEstado('')
        setNomeLogradouro('')        
    }
    return (
        <div className="geral_g2">
            {/* <HeaderAdm />*/}
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


            <div className="container_empresa_g2 container_forms_cadastroEmpresa_g2">
                <div className="box_img_cadastroEmpresa_g2">
                    <img className="img_cadastroEmpresa_g2" src={cadastroEmpresa} alt="imagemCadastroEmpresa" />
                </div>

                <form className="container_empresa_g2_form" onSubmit={efetuarCadastro}>
                    <div className="box_forms_cadastroEmpresa_g2">
                        <div className="title_cadastroEmpresa_g2">
                            <h1>Cadastrar Empresa</h1>
                        </div>


                        <div className="box_inputs_cadastroEmpresa_g2">
                            <div>
                                <div className="container_cadastroEmpresa_inputs_g2">
                                    <div className="input_g2_cadastro">
                                        <input
                                            id="nomeEmpresa"
                                            onChange={(campo) => setNomeEmpresa(campo.target.value)}
                                            value={nomeEmpresa}
                                            type="text"
                                            name="nomeEmpresa"
                                            placeholder="Nome da Empresa"
                                        />
                                        <label htmlFor="nomeEmpresa">Nome</label>
                                    </div>

                                    <div className="input_g2_cadastro">
                                        <input
                                            id="telefoneEmpresa"
                                            onChange={(campo) => setTelefoneEmpresa(campo.target.value)}
                                            value={telefoneEmpresa}
                                            type="text"
                                            name="telefoneEmpresa"
                                            // pattern="\([0-9]{2}\)[9]{1}[0-9]{3}-[0-9]{4}"
                                            placeholder="(xx)9xxx-xxxx"
                                        />
                                        <label htmlFor="telefoneEmpresa" >Telefone</label>
                                    </div>

                                    {/* <PhoneInput
                                        country="BR"
                                    /> */}

                                    <div className="input_g2_cadastro">
                                        <input
                                            id="cep"
                                            onChange={(campo) => setCep1(campo.target.value)}
                                            value={cep1}
                                            // {...register('cep')}
                                            type="text"
                                            name="nomeDesconto"
                                            placeholder="cep"
                                            onBlur={(campo) => checkCEP(campo)}
                                        />
                                        <label htmlFor="nomeDesconto" >Cep</label>
                                    </div>

                                    <div className="input_g2_cadastro">
                                        <input
                                            id="numero"
                                            onChange={(campo) => setNumero(campo.target.value)}
                                            value={numero}
                                            {...register('addressNumber')}
                                            type="text"
                                            name="numero"
                                            placeholder="Numero"
                                        />
                                        <label htmlFor="numero">Número</label>
                                    </div>


                                    <div className="input_g2_cadastro">
                                        <input
                                            id="nomeCidade"
                                            onChange={(campo) => setNomeCidade(campo.target.value)}
                                            value={nomeCidade}
                                            type="text"
                                            name="nomeCidade"
                                            placeholder="CEP"
                                            {...register('cidade')}
                                        />
                                        <label htmlFor="nomeCidade">Cidade</label>
                                    </div>





                                </div>
                            </div>

                            <div>

                                <div className="input_g2_cadastro">
                                    <input
                                        id="emailEmpresa"
                                        onChange={(campo) => setEmailEmpresa(campo.target.value)}
                                        value={emailEmpresa}
                                        type="text"
                                        name="emailEmpresa"
                                        placeholder="E-mail"
                                    />
                                    <label htmlFor="emailEmpresa">E-mail</label>
                                </div>

                                <div>
                                    <label></label>
                                    <label className="label_arquivo_cadastroEmpresa_g2" htmlFor="fotoEmpresa">  <img className="img_file_cadastro_empresa_g2" src={iconeEnviarArquivo} alt="iconeEnviarArquivo" />Enviar arquivo</label>
                                    <input
                                        accept="image/png, image/jpeg"
                                        id="fotoEmpresa"
                                        name="fotoEmpresa"
                                        className="input_file_cadastroEmpresa_g2"
                                        type="file"
                                    />
                                </div>


                                <div className="input_g2_cadastro input_g2_cadastro_rua">
                                    <input
                                        id="logradouro"
                                        onChange={(campo) => setNomeLogradouro(campo.target.value)}
                                        value={nomeLogradouro}
                                        type="text"
                                        {...register('logradouro')}
                                        name="logradouro"
                                        placeholder="Rua"
                                    />
                                    <label htmlFor="logradouro" >Rua</label>
                                </div>


                                <div className="input_g2_cadastro">
                                    <input
                                        id="bairro"
                                        onChange={(campo) => setNomeBairro(campo.target.value)}
                                        value={nomeBairro}
                                        type="text"
                                        name="bairro"
                                        {...register('bairro')}
                                        placeholder="Bairro"
                                    />
                                    <label htmlFor="bairro" >Bairro</label>
                                </div>



                                <div className="input_g2_cadastro">
                                    <input
                                        id="nomeEstado"
                                        onChange={(campo) => setNomeEstado(campo.target.value)}
                                        value={nomeEstado}
                                        type="text"
                                        {...register('estado')}
                                        name="nomeEstado"
                                        placeholder="Estado"
                                    />
                                    <label htmlFor="nomeEstado" >Estado</label>
                                </div>
                            </div>
                        </div>
                        <div className="btn_cadastroEmpresa_g2">
                            <button type="submit" className="botaoCadastroEmpresa_g2">Cadastrar</button>
                        </div>
                    </div>
                </form>

            </div>

            <Footer />
        </div>

    )
}