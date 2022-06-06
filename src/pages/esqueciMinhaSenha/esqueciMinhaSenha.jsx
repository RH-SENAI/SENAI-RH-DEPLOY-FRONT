import React, { useState } from "react"
import Logo from "../../assets/img/logo1.svg"
import bannerLogin from "../../assets/img/bannerLogin.svg"
import axios from 'axios';
import '../../pages/esqueciMinhaSenha/esqueciMinhaSenha.css'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function EsqueciSenha() {
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');  
    const [isActiveCodigo, setIsActiveCodigo] = useState(false);
    const isRec = true;  
    const notify_Logar_Failed = () => toast.error("Código Incorreto!")
    const history = useHistory();
    
    


    const EnviarEmail = (event) => {
        event.preventDefault();
        
        
        axios.post('http://apirhsenaigp1.azurewebsites.net/api/Usuarios/RecuperarSenhaEnviar/' + email,{
        },{
            headers:{
                'Content-Type': 'application/json',

            }
        })      
        .then(response => {
            if(response.status === 200){
                localStorage.setItem('email', email)
                setIsActiveCodigo(true)
                console.log(isActiveCodigo)
            }
        })
        .catch(response =>{
            console.log(response)
            notify_Logar_Failed()
        })
        
    }

    const AlteraSenha = (event) =>{
        event.preventDefault();
        
        axios.post('http://apirhsenaigp1.azurewebsites.net/api/Usuarios/RecuperarSenhaVerifica/' + codigo,{},{
            headers:{
                'Content-Type': 'application/json',
                
            }
        })
        .then(response => {
            if(response.status === 200){
                history.push({
                    pathname: '/AlterarSenhaRec/'                    
                })
            }
        })
        .catch(response=>{
            console.log(response)
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
                <div className="G1_Left">
                    <div className="G1_banner">
                        <img src={Logo} alt="Logo do senai" className="G1_logo" />
                        <img src={bannerLogin} className="G1_bannerLogin" alt="" />
                        <p className="G1_p_senai">© 2022 Sesi Senai RH</p>
                    </div>
                </div>
                <div className="G1_Right">
                    <div className="G1_formText"> 
                        <div className="G1_textLogin">  
                            <h1>Alterar Senha</h1>
                             <p>Insira o email da conta que será recuperada, e depois, insira o código que foi enviado por email!</p>
                        </div>  
                        <form className="G1_form_Esqueci G1_form_Login" onSubmit={(event) => EnviarEmail(event)}>
                            <div className="G1_inputLabel">
                                <input type="email" name="email" placeholder="Digite seu email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                <label for="email">Email</label>
                            </div>                      
                            <div  className="G1_buttonsLogin">
                                
                                <button type="submit">Enviar Email</button>
                            </div>                          
                        </form>
                        <form className="G1_form_Esqueci G1_form_Login" onSubmit={(event) => AlteraSenha(event)}>
                            <div className="G1_inputLabel">
                                <input type="text" name="código" placeholder="Digite seu email" value={codigo} onChange={(evt) => setCodigo(evt.target.value)} />
                                <label for="código">Código</label>
                            </div>                      
                            <div  className="G1_buttonsLogin">
                            {
                                    isActiveCodigo === false ?
                                    <button disabled type="submit">Enviar Código</button>
                                    :
                                    <button type="submit">Enviar Código</button>

                                }
                            </div>
                            
                        </form>
                    </div>
                    
                </div>   
            </main>
            
        </div>
    )
}
