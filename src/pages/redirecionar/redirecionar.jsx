import logout from '../../assets/img/logout.png'
import logo from "../../assets/img/logo.svg"
import Footer from "../../components/footer.jsx";
import laptop from '../../assets/img/Laptop.png'
import pig from '../../assets/img/Pig.png'
import tag from '../../assets/img/tag.png'
import '../../assets/css/redirecionar.css'
import { Link } from 'react-router-dom';
import HeaderFuncionario from '../../components/header/headerFuncionario';
import Navbar from '../../components/MenuHamburguer/Nav';

export default function Redirect() {


    return (
        <div className="G1_Redirect_Body">
            {/* <HeaderFuncionario/> */}
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>

            <main>
                <div className="G1_box_titulo">
                    <h1 className="G1_titulo_redirecionamento">Qual seu </h1>
                    <h2 className="G1_titulo2_redirecionamento">Interesse </h2>
                </div>

                <div className='G1_containerContentMain'>

                    <div className='G1_containerRedirects'>
                        <article className="G1_box_Article">
                            <img src={laptop} alt="Icone de laptop" />
                            <div className='G1_ArticleText'>
                                <h3> Acompanhamento </h3>
                                <p>Acesse aqui para acompanhar seus funcionários, vizualizando seus respectivos níveis de satifação e muito mais!</p>
                                <Link to='/dashboard'><button className='G1_btn_Cadastrar' type="button"> Entrar </button></Link>
                            </div>
                        </article>
                        <article className="G1_box_Article">
                            <img src={pig} alt="Icone de cofre em formato de porco" />
                            <div className='G1_ArticleText'>
                                <h3> Motivações </h3>
                                <p> Acesse aqui para vizualizar as atividades do sistema e gerenciar seus pontos!</p>
                                <Link to='/TodasAtividades'><button className='G1_btn_Cadastrar' type="button"> Entrar </button></Link>
                            </div>
                        </article>
                        <article className="G1_box_Article">
                            <img src={tag} alt="Icone de etiqueta de desconto" />
                            <div className='G1_ArticleText'>
                                <h3> Minhas Vantagens </h3>
                                <p> Acesse aqui para vizualizar suas vantagens disponíveis e garantir seus descotnos e vantagens!</p>
                                <Link to='/meusFavoritos'><button className='G1_btn_Cadastrar' type="button"> Entrar </button></Link>
                            </div>
                        </article>
                    </div>
                </div>

            </main>

            <Footer></Footer>
        </div>
    )
}