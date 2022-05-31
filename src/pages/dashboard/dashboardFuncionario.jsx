import { useState, useEffect } from "react";
import "../../assets/css/dashboard.css"
import Header from "../../components/header/headerFuncionario"
import Footer from "../../components/footer"
import grafico from "../../assets/img/grafico.png"
import estrela from "../../assets/img/star.png"
import iconPerfil from "../../assets/img/telaPerfil.png"
import axios from "axios";
import {
    VictoryBar, VictoryPie, VictoryChart, VictoryLabel,
    VictoryTheme
} from 'victory';
import ImgDashboard from '../../assets/img/telaDeAcessoLight.svg'
import {
    parseJwt
    // usuarioAutenticado
} from '../../services/auth';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [idUsuario, setIdUsuario] = useState(0);
    const [medSatisfacaoGeral, setMedSatisfacaoGeral] = useState(0);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaAtividades, setListaAtividades] = useState([]);
    const [usuario, setUsuario] = useState([])
    const [notaProdutividade, setNotaProdutividade] = useState(0);
    const [sampleData, setSampleData] = useState([])

    const data = {
        labels: ['Positivo'],
        datasets: [
          {
            label: '# of Votes',
            data: [listaUsuarios[0].medSatisfacaoGeral * 100],
            backgroundColor: [
              '#07bc0c'
            ],
            borderColor: [
                '#07bc0c'
            ],
            borderWidth: 2,
          },
        ],
      };

    function ListarUsuario() {

        axios.get(`https://apigrupo3.azurewebsites.net/api/Usuarios/Listar/${parseJwt().jti}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    setListaUsuarios([resposta.data])

                    console.log(resposta)

                }

            })

            .catch(erro => console.log(erro))

    }
    // function ListarMinhasAtividades() {

    //     axios.get(`http://apirhsenaigp1.azurewebsites.net/api/Atividades/MinhasAtividade/${parseJwt().jti}`, {

    //         headers: {

    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
    //         }

    //     })

    //         .then((resposta) => {

    //             if (resposta.status === 200) {
    //                 setListaAtividades(resposta.data)

    //                 console.log(resposta)

    //                 const dataFinalizacao = resposta.data.filter(atividades => atividades.idSituacaoAtividade === 3)
    //                     .map((p) => {

    //                         return parseInt(p.dataConclusao.split('-')[2]);
    //                     });

    //                 const d1_5 = dataFinalizacao.filter(d => d <= 5).length
    //                 // const d6_10 = dataFinalizacao.filter(d => d > 5 && d <= 10).length
    //                 // const d11_15 = dataFinalizacao.filter(d => d > 10 && d <= 15).length
    //                 // const d16_20 = dataFinalizacao.filter(d => d > 15 && d <= 20).length
    //                 // const d21_25 = dataFinalizacao.filter(d => d > 20 && d <= 25).length
    //                 // const d26_31 = dataFinalizacao.filter(d => d > 25 && d <= 31).length
    //                 setSampleData(
    //                     [
    //                         { x: 1, y: d1_5 },
    //                         { x: 2, y: 2 },
    //                         { x: 3, y: 4 },
    //                         { x: 4, y: 5 },
    //                         { x: 5, y: 10 },
    //                         { x: 6, y: 11 }
    //                     ])


    //             }
    //         })

    //         .catch(erro => console.log(erro))

    // }
    // function ListarMinhasAtividadesExtra() {

    //     axios.get(`http://apirhsenaigp1.azurewebsites.net/api/Atividades/MinhasAtividadeExtra/${idUsuario}`, {

    //         headers: {

    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
    //         }

    //     })

    //         .then((resposta) => {

    //             if (resposta.status === 200) {
    //                 setListaAtividades([resposta.data])

    //                 console.log(resposta)

    //             }

    //         })

    //         .catch(erro => console.log(erro))

    // }

    useEffect(ListarUsuario, [])
    // useEffect(ListarMinhasAtividades, [])
    // useEffect(ListarMinhasAtividadesExtra, [])

    // const sampleData = [
    //     { x: 'satisfacao', y: nivelSatisfacao },
    //     { x: 'satisfacao', y: nivelSatisfacao },



    // ];



    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className="g3_boxTituloDashboard">
                        <span className="g3_tituloDashboard">DASHBOARD</span>
                    </div>
                    <div className="g3_containerGraficos">
                        {
                            listaUsuarios.map((usuario) => {
                                return (
                                    <div className='g3_organizadorDashboard'>
                                        <div className="g3_boxGraficosLeft">
                                            <div className='g3_containerProdutividade'>
                                                {/* <div className="g3_graficoProdutividade"> */}
                                                    {/* {
                                                    listaAtividades.map((atividade) => {
                                                        return (
                                                            <VictoryChart
                                                            >
                                                                <VictoryLine
                                                                    style={{
                                                                        data: { stroke: "#c20004" },
                                                                        parent: { border: "1px solid #c20004" }
                                                                    }}

                                                                    data=
                                                                    {
                                                                        listaAtividades.filter(a => a.idSituacaoAtividade === 3).map((atividade) => {
                                                                            return (

                                                                                { x: 1, y: atividade.dataConclusao.split('-')[1] }

                                                                            )
                                                                        })}


                                                                />
                                                            </VictoryChart>
                                                        )
                                                    })} */}
                                                    {/* <VictoryChart
                                                        domainPadding={{ x: 30 }}

                                                    >
                                                        <VictoryBar
                                                            data={sampleData}
                                                            labels={({ datum }) => datum.y}

                                                            style={{
                                                                data: { fill: "#c20004", width: 50 }, labels: { fill: 'white' }
                                                            }}
                                                            labelComponent={<VictoryLabel dy={20} />}
                                                        />
                                                    </VictoryChart> */}
                                                    {/* <span className='g3_spanGraficoP'>Tarefas Pessoais</span> */}
                                                </div>
                                                {/* Grafico produtividade unidade */}
                                                {/* <div className='g3_graficoProdutividadeUni'>
                                                    <VictoryChart
                                                        domainPadding={{ x: 30 }}
                                                    >
                                                        <VictoryBar
                                                            data={sampleData}
                                                            labels={({ datum }) => datum.y}

                                                            style={{
                                                                data: { fill: "#c20004", width: 50 }, labels: { fill: 'white' }
                                                            }}
                                                            labelComponent={<VictoryLabel dy={20} />}
                                                        />
                                                    </VictoryChart>
                                                    <span className='g3_spanGraficoP'>Tarefas Pessoais</span>
                                                </div> */}

                                            {/* </div> */}
                                            <div className="g3_boxGraficosBaixo">
                                                <div className="g3_containerGraficoLeft">
                                                    <div className="g3_graficoSatisfacaoPessoal">
                                                        {/* <VictoryPie
                                                            events={[{
                                                                target: "data",
                                                                eventHandlers: {
                                                                    onClick: () => {
                                                                        return [
                                                                            {
                                                                                target: "data",
                                                                                mutation: ({ style }) => {
                                                                                    return style.fill === "#000000" ? null : { style: { fill: "#000000" } };
                                                                                }
                                                                            }, {
                                                                                target: "labels",
                                                                            }
                                                                        ];
                                                                    }
                                                                }
                                                            }]}
                                                            innerRadius={100}
                                                            colorScale={["#c20004", "#b3b3b3"]}
                                                            

                                                        /> */}
                                                        <Doughnut data={data} />
                                                    </div>
                                                    <span>Satisfação Pessoal</span>
                                                </div>
                                                <div className="g3_containerGraficoRight">
                                                    {/* <div className="g3_graficoSatisfacaoPessoal">
                                                        <VictoryPie
                                                            events={[{
                                                                target: "data",
                                                                eventHandlers: {
                                                                    onClick: () => {
                                                                        return [
                                                                            {
                                                                                target: "data",
                                                                                mutation: ({ style }) => {
                                                                                    return style.fill === "#000000" ? null : { style: { fill: "#000000" } };
                                                                                }
                                                                            }, {
                                                                                target: "labels",
                                                                            }
                                                                        ];
                                                                    }
                                                                }
                                                            }]}
                                                            innerRadius={100}
                                                            colorScale={["#c20004", "#b3b3b3"]}
                                                            data={[
                                                                { },


                                                            ]}


                                                        />
                                                    </div>
                                                    <span>Avaliação Pessoal</span> */}
                                                </div>
                                                {/* Grafico quantidade Funcionarios unidade */}
                                                {/* <div className='containerGraficoPizza'>
                                                    <div className="g3_graficoSatisfacaoPessoal">
                                                        <VictoryPie
                                                            events={[{
                                                                target: "data",
                                                                eventHandlers: {
                                                                    onClick: () => {
                                                                        return [
                                                                            {
                                                                                target: "data",
                                                                                mutation: ({ style }) => {
                                                                                    return style.fill === "#000000" ? null : { style: { fill: "#000000" } };
                                                                                }
                                                                            }, {
                                                                                target: "labels",
                                                                            }
                                                                        ];
                                                                    }
                                                                }
                                                            }]}
                                                            innerRadius={100}
                                                            colorScale={["#c20004", "#b3b3b3"]}
                                                            data={[
                                                                { x: usuario.mediaAvaliacao, y: usuario.mediaAvaliacao * 10 },
                                                                { x: 10 - usuario.mediaAvaliacao, y: 100 - usuario.mediaAvaliacao * 10 },


                                                            ]}


                                                        />
                                                    </div>
                                                    <span>Funcionarios</span>
                                                </div> */}

                                            </div>
                                        </div>
                                        {/* <div className='g3_graficoDireita'>
                                            <div className='g3_graficoFuncionarios'>
                                                <VictoryChart horizontal
                                                    domainPadding={{ x: 30 }}
                                                    height={850}
                                                >
                                                    <VictoryBar
                                                        data={sampleData}

                                                        style={{
                                                            data: { fill: "#c20004", width: 50 }, labels: { fill: 'white' }
                                                        }}
                                                    />
                                                </VictoryChart>
                                                <span className='g3_spanGraficoF'>Funcionarios Por Unidade</span>
                                            </div>

                                        </div> */}
                                        {/* <div className="g3_boxImg">
                                            <img src={ImgDashboard} className='g3_imgDashboard' />
                                        </div> */}
                                    </div>
                                )
                            }

                            )
                        }


                    </div>
                </div>
            </main>

            <Footer />
        </div >
    )

}