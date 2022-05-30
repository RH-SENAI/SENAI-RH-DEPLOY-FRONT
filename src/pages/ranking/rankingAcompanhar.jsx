
import Footer from "../../components/footer"
import "../../assets/css/rankingAcompanhar.css"
import FotoRank from '../../assets/img/fotoRank.svg'
import Trofeu from '../../assets/img/Trofeus.svg'
import 'animate.css';
import HeaderFuncionario from "../../components/header/headerFuncionario";
import React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { ToastContainer, toast, Icons } from 'react-toastify';
import estrela from '../../assets/img/star.png'
import 'react-toastify/dist/ReactToastify.css';



export default function RankingAcompanhar() {

    const [listaUsuariosRanking, setListaUsuariosRanking] = useState([]);
    const [mediaAvaliacao, setMediaAvaliacao] = useState('');
    const [medSatisfacaoGeral, setMedSatisfacaoGeral] = useState('');


    function RankingUsuarios() {
        axios.get("http://localhost:5000/api/Usuarios/RankingUsuarios"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(mediaAvaliacao)
                    setListaUsuariosRanking(resposta.data)
                    console.log(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };


    useEffect(RankingUsuarios, []);



    return (
        <body>
            <HeaderFuncionario />
            <main className="container">
                <div className="G3_organizar_main">
                    <h1 className="G3_titulo_atividades">Ranking</h1>
                    <div className="G1_container_ranking">
                        {listaUsuariosRanking.map((usuario, index) => {
                            index++
                            return (
                                <div key={usuario.idUsuario}>
                                    <div className="G1_usuario_card">
                                        <p className="G1_posicao G1_container_card">{index++}</p>
                                        <img className="G1_container_card g3_fotoRanking" src={"https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" + usuario.caminhoFotoPerfil} alt="Foto do Usuario" />
                                        <p className="G1_nome_usuario G1_container_card">{usuario.nome}</p>
                                        <div className="G1_organizar_trofeus">
                                            {/* <Icons></Icons> */}
                                            <img src={estrela} alt="Trofeu" />
                                            <p className="G1_num_trofeu" >{usuario.medSatisfacaoGeral}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            {/* <main>
                <div className='container '>
                    <div className="g3_boxOrganizadoraRanking">
                        <span className='g3_boldRanking'>Ranking</span>
                        <div className='g3_navRanking'>
                            <span className='g3_spanNavRanking'>Posição</span>
                            <span className='g3_spanNavRanking'>Foto</span>
                            <span className='g3_spanNavRanking'>Nome</span>
                            <span className='g3_spanNavRanking'>Satisfação</span>
                            <span className='g3_spanNavRanking'>Nota</span>
                        </div>
                        
                    </div>
                </div>
            </main> */}
            <Footer />
        </body>
    );

}