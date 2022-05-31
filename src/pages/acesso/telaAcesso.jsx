import { Redirect, useHistory } from "react-router-dom";
import HeaderLogin from "../../components/header/headerLogin";
import Footer from "../../components/footer"
import "../../assets/css/acesso.css"
import imagemAcesso from "../../assets/img/telaDeAcessoLight.svg"
import 'animate.css';

export default function Acesso() {

    let history = useHistory()
    function redirecionarLogin() {

        history.push('/Login')
    }

    return (
        <div>
            <HeaderLogin />
            <div className="container">
                <div className='g3_containerOrganizacao'>
                    <div className='g3_conteudoAcesso'>
                        <div className="g3_textoEBotao">
                            <div className="g3_todosOsTextos">
                                <div className="g3_spans">
                                    <span className="g3_bold">
                                        RECURSOS HUMANOS
                                    </span>
                                    <span className="g3_nonBold">
                                        SENAI-SP
                                    </span>
                                </div>
                                <div className='g3_imgAcessoResponsiva'>
                                    <img className="g3_imagemAcessoResponsiva" src={imagemAcesso} alt="Imagem de acesso" />
                                </div>
                                <div>
                                    <p className="g3_primeiroTexto ">Desenvolvido para facilitar o trabalho de todos na rede, o <br />SENAI RH tem o objetivo de deixar o ambiente de trabalho<br /> mais confortável de trabalhar!</p>
                                    <p className="g3_primeiroTextoResponsivo ">Pensando sempre no conforto dos funcionários!</p>
                                    {/* <p className="g3_segundoTextoResponsivo ">Faça seu login para começar</p> */}
                                    {/* <p className="g3_segundoTexto">Acesse sua conta e veja todo seu Dashboard e o da sua equipe!</p> */}
                                    
                                </div>
                            </div>
                            <div className="g3_botao">
                                <button type="submit" className='g3_btnRedLogin' onClick={redirecionarLogin}>Fazer Login</button>
                            </div>
                        </div>
                    </div>
                    <div className='g3_imgAcesso'>
                        <img className="g3_imagemAcesso" src={imagemAcesso} alt="Imagem de acesso" />
                    </div>


                </div>
            </div>
 
            <Footer/>
        </div>
    )
}