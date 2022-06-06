import React, { useState, useEffect } from "react"
import Logo from "../../assets/img/logo1.svg"
import bannerLogin from "../../assets/img/bannerLogin.svg"
import axios from 'axios';
import '../../pages/alterarSenha/alterarSenha.css'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseJwt } from "../../services/auth";



export default function AlterarSenha(props) {
    const [senhaAtual, setSenhaAtualUsuario] = useState('');
    const [senhaNova, setSenhaNovaUsuario] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacaoUsuario] = useState('');
    const [isRec, setIsRec] = useState(false);
    const [email, setEmail] = useState('');
    const notify_Logar_Failed_unmatched = () => toast.error("As senhas não coincidem!")
    const history = useHistory();
      
   
    


    const VerificaSenha = (event) => {
        event.preventDefault();

        

            let idUsuario = parseJwt().jti
            axios.post('http://apirhsenaigp1.azurewebsites.net/api/Usuarios/VerificaSenha/' + idUsuario,{
               
            },{
                headers:{
                    'Content-Type': 'application/json',
                    'senhaUser' : senhaAtual
                }
            })      
            .then(response => {
                if(response.status === 200){
                    AlteraSenha();
                }
            })
            .catch(response => {
                console.log(response)
            })
        
        
        
    }

    const AlteraSenha = () =>{
        if (senhaNova !== senhaConfirmacao) {
            notify_Logar_Failed_unmatched()
        }

        

            let idUsuario = parseJwt().jti
    
    
    
            axios.patch('http://apirhsenaigp1.azurewebsites.net/api/Usuarios/AlteraSenha/' + idUsuario,{},{
                headers:{
                    'Content-Type': 'application/json',
                    'senhaUser' : senhaAtual,
                    'senhaNova' : senhaNova,
                    'senhaConfirmacao' : senhaConfirmacao 
                }
            })
            .then(response => {
                localStorage.removeItem('usuario-login')
                history.push('/login')
                console.log(response)
                console.log('senha alterada')
            })
            .catch(response=>{
                console.log(response)
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
                            <p>Altere aqui sua senha de acesso!</p> 
                        </div>  
                        <form className="G1_form_Alterar G1_form_Login" onSubmit={(event) => VerificaSenha(event)}>
                            <div className="G1_inputLabel">
                                 
                                    <input type="password" name="SenhaAtual" placeholder="Digite sua senha atual" value={senhaAtual} onChange={(evt) => setSenhaAtualUsuario(evt.target.value)} />
                              
                                
                                    <label className="G1_inputLabel label" for="SenhaAtual">Senha Atual</label>
                                
                            </div>

                            <div className="G1_inputLabel">
                                <input type="password" name="senhaNova" placeholder="Digite sua senha nova" value={senhaNova} onChange={(evt) => setSenhaNovaUsuario(evt.target.value)} />
                                <label for="senhaNova">Nova Senha</label>
                            </div>
                            <div className="G1_inputLabel">
                                <input type="password" name="senhaConfirmacao" placeholder="Digite sua senha novamente" value={senhaConfirmacao} onChange={(evt) => setSenhaConfirmacaoUsuario(evt.target.value)} />
                                <label for="senhaConfirmacao">Confirme a nova senha</label>
                            </div>
                            <div  className="G1_buttonsLogin">
                                <button type="submit">Alterar senha</button>
                            </div>
                            
                        </form>
                    </div>
                    
                </div>   
            </main>
            
        </div>
    )
}
