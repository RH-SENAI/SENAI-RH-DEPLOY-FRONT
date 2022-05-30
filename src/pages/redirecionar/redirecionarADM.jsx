import React from "react";
import img1 from "../../assets/img/1.png"
import img2 from "../../assets/img/2.png"
import img3 from "../../assets/img/3.png"
import img4 from "../../assets/img/4.png"
import Footer from "../../components/footer";
import HeaderAdm from "../../components/header/headerAdm";

export const RedirecionarADM = () => {

    return (
        <main>
            <HeaderAdm />
            <section className="container_total">
                <div>
                    <h1 class="tituloADM">qual seu</h1>
                    <h2 class="titulo_2">interesse</h2>
                </div>
                <div>
                    <div class="container_minhasVantagens">
                        <div class="box_numero">
                            <img className="img_numero" src={img1} alt="1°" />
                        </div>
                        <div class="box_texto">
                            <a href="#" class="textoRedirecionar">minhas vantagens</a>
                        </div>
                    </div>
                    <div class="container_motivacoes">
                        <div class="box_numero">
                            <img className="img_numero" src={img2} alt="2°" />
                        </div>
                        <div class="box_texto">
                            <a href="#" class="textoRedirecionar">motivações</a>
                        </div>
                    </div>
                    <div class="container_acompanhamento">
                        <div class="box_numero">
                            <img className="img_numero" src={img3} alt="3°" />
                        </div>
                        <div class="box_texto">
                            <a href="#" class="textoRedirecionar">acompanhamento</a>
                        </div>
                    </div>
                    <div class="container_cadastroUsuario">
                        <div class="box_numero">
                            <img className="img_numero" src={img4} alt="3°" />
                        </div>
                        <div class="box_texto">
                            <a href="#" class="textoRedirecionar">cadastro de usuário</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default RedirecionarADM;