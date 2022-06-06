import React, { useState} from "react"
import Logo from "../../assets/img/logo1.svg"
import bannerLogin from "../../assets/img/bannerLogin.svg"
import axios from 'axios';
import '../../pages/login/login.css'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseJwt } from "../../services/auth";
import HeaderLogin from "../../components/header/headerLogin";

export default function Login() {
    const [cpfUsuario, setCPFUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const notify_Logar_Failed = () => toast.error("Email ou Senha inválidos!")
//   nathalia novais guedes silva
    const history = useHistory();
    
    


    const FazerLogin = (event) => {
        event.preventDefault();


        axios.post('http://apirhsenaigp1.azurewebsites.net/api/Login', {
            CPF: cpfUsuario,
            senha: senhaUsuario
        }
        )
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token)
                    if(parseJwt().isActive === "False"){
                        history.push('/AlterarSenha')
                    }
                    else                      
                    history.push('/Redirecionamento')
                }

            })
            .catch(resposta => {
            
            notify_Logar_Failed()
            })

    }

    return (
        <div className="page">
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
            <main className="container_main">
                <div className="G1_Left_Login">
                    <div className="G1_banner">
                        <img src={Logo} alt="Logo do senai" className="G1_logo" />
                        <img src={bannerLogin} className="G1_bannerLogin" alt="" />
                        <p className="G1_p_senai">© 2022 Sesi Senai RH</p>
                    </div>
                </div>
                <div className="G1_Right_Login">
                    <div className="G1_formText"> 
                    <div className="G1_textLoginL"> 

                            <h1>Login</h1>
                            <p>Acesse sua conta e veja todo seu Dashboard e o da sua equipe!</p> 
                        </div>  
                        <form className="G1_form_Login" onSubmit={(event) => FazerLogin(event)}>
                            <div className="G1_inputLabel">
                                <input type="text" name="CPF" placeholder="Digite seu CPF" value={cpfUsuario} onChange={(evt) => setCPFUsuario(evt.target.value)} />
                                <label for="CPF">CPF</label>
                            </div>

                            <div className="G1_inputLabel">
                                <input type="password" name="senha" placeholder="Digite sua senha" value={senhaUsuario} onChange={(evt) => setSenhaUsuario(evt.target.value)} />
                                <label for="senha">Senha</label>
                            </div>
                            <div  className="G1_buttonsLogin">
                                <a href="/EsqueciMinhaSenha">Esqueci a senha</a>
                                <button type="submit">Entrar</button>
                            </div>
                            
                        </form>
                    </div>
                    
                </div>   
            </main>
            
        </div>
    )
}