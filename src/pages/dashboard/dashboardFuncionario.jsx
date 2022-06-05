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

import Chart from "react-apexcharts";


export default function Dashboard() {

    // States
    const [medSatisfacaoGeral, setMedSatisfacaoGeral] = useState(0);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaAtividades, setListaAtividades] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [notaProdutividade, setNotaProdutividade] = useState(0);
    const [sampleData, setSampleData] = useState([]);
    const [listaHistorico, setListaHistorico] = useState([]);
    const [listaUsuarioLot, setListaUsuariosLot] = useState([]);
    const [idUsuarioLot, setIdUsuarioLot] = useState(0);

    // Variaveis
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const dataAtual = new Date().getMonth();




    function ListarUsuario() {

        axios.get(`https://apigrupo3.azurewebsites.net/api/Usuarios/Listar/${parseJwt().jti}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    setListaUsuarios([resposta.data])


                }

            })

            .catch(erro => console.log(erro))

    }

    function BuscarHistorico() {

        axios.get(`https://apigrupo3.azurewebsites.net/api/HistoricoA/Listar/${parseJwt().jti}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    setListaHistorico(resposta.data)

                    console.log(resposta.data)

                }

            })

            .catch(erro => console.log(erro))

    }

    const Cores = (nota) => {
        console.log()
        if (nota >= 0 && nota <= 0.33)
            return '#ff4500';

        else if (nota > 0.33 && nota <= 0.66)
            //return "#162fba";
            return '#1e90ff';

        else return 'limegreen'
    }

    function generateData(mes) {

        let historicos = []

        for (let x = 0; x < 30; x++) {

            historicos.push({
                x: `${x + 1}`,
                y: 0
            })
        }

        listaHistorico.map((historico) => {

            let dia = historico.atualizadoEm.substring(8, 10)
            let index = historicos.findIndex(h => h.x == parseInt(`${dia}`))

            if (historicos[index] !== undefined && historico.atualizadoEm.substring(6, 7) == mes) {
                historicos[index].y = historico.qtdDeTotalAtividade
            }
        })

        return historicos;
    }

    function ListarMesesAnteriores(mes) {
        let mesAtual = mes
        let listaMeses = []
        let contador = 5

        while (contador != 0) {

            listaMeses.push({
                name: meses[mesAtual],
                data: generateData(mesAtual + 1)
            })

            if (mesAtual == 0) {
                mesAtual = 12
            }

            contador--;
            mesAtual--;
        }

        console.log(listaMeses)
        return listaMeses
    }


    function BuscarListaDeUsuariosLot() {
        axios.get(`https://apigrupo3.azurewebsites.net/api/Usuarios/Listar/Lotacao/${parseJwt().jti}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {

                    setListaUsuariosLot(resposta.data)

                }

            })

            .catch(erro => console.log(erro))
    }

    function BuscarHistoricoUsuarioLot(idUsuarioLot) {

        axios.get(`https://apigrupo3.azurewebsites.net/api/HistoricoA/Listar/${idUsuarioLot}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    setListaHistorico(resposta.data)

                    console.log(resposta.data)

                }

            })

            .catch(erro => console.log(erro))

    }


    function MudarDashBoard(idUsuarioLot)
    {

        setListaUsuarios([listaUsuarioLot.find((usuario) =>  { if(usuario.idUsuario == idUsuarioLot) return usuario})])
        
        BuscarHistoricoUsuarioLot(idUsuarioLot)
    }


    useEffect(ListarUsuario, []);
    useEffect(BuscarHistorico, []);
    useEffect(BuscarListaDeUsuariosLot, []);


    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className="g3_boxTituloDashboard">
                        <span className="g3_tituloDashboard">DASHBOARD</span>


                        <select
                            name="idUsuarioLot"
                            value={idUsuarioLot}
                            onChange={(event) => { setIdUsuarioLot(event.target.value); MudarDashBoard(event.target.value)}}
                        >
                            {listaUsuarioLot.map((usuario) => {
                                return (<option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nome}</option>)
                            })}
                        </select>

                        <select>
                            
                        </select>
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

                                                        <Chart
                                                            type="radialBar"

                                                            series={[usuario.medSatisfacaoGeral * 100]}
                                                            options={{
                                                                chart: {
                                                                    height: 350,
                                                                    type: 'radialBar'
                                                                },
                                                                plotOptions: {
                                                                    radialBar: {

                                                                        startAngle: -135,
                                                                        endAngle: 225,
                                                                        hollow: {
                                                                            margin: 0,
                                                                            size: '70%',
                                                                            background: '#fff',
                                                                            image: undefined,
                                                                            imageOffsetX: 0,
                                                                            imageOffsetY: 0,
                                                                            position: 'front',
                                                                            dropShadow: {
                                                                                enabled: true,
                                                                                top: 3,
                                                                                left: 0,
                                                                                blur: 4,
                                                                                opacity: 0.24
                                                                            }
                                                                        },


                                                                        track: {
                                                                            background: '#fff',
                                                                            strokeWidth: '67%',
                                                                            margin: 0, // margin is in pixels
                                                                            dropShadow: {
                                                                                enabled: true,
                                                                                top: -3,
                                                                                left: 0,
                                                                                blur: 4,
                                                                                opacity: 0.35
                                                                            }
                                                                        },

                                                                        dataLabels: {
                                                                            show: true,
                                                                            name: {
                                                                                offsetY: -10,
                                                                                show: true,
                                                                                color: '#888',
                                                                                fontSize: '17px'
                                                                            },
                                                                            value: {
                                                                                fontFamily: 'Montserrat',
                                                                                formatter: function (val) {
                                                                                    return parseInt(val);
                                                                                },
                                                                                color: '#111',
                                                                                fontSize: '36px',
                                                                                show: true,
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                fill: {
                                                                    type: 'gradient',
                                                                    gradient: {
                                                                        shade: 'dark',
                                                                        type: 'horizontal',
                                                                        shadeIntensity: 0.5,
                                                                        colorStops: [{
                                                                            offset: 10,
                                                                            color: Cores(usuario.medSatisfacaoGeral),
                                                                            opacity: 1
                                                                        },

                                                                        ],

                                                                        opacityFrom: 1,
                                                                        opacityTo: 1,
                                                                        stops: [0, 100]
                                                                    }
                                                                },

                                                                stroke: {
                                                                    lineCap: 'round'
                                                                },

                                                                labels: ['Satisfação Geral']

                                                            }
                                                            }

                                                            width={370}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="g3_containerGraficoRight">

                                                    < Chart
                                                        type="heatmap"
                                                        series={
                                                            ListarMesesAnteriores(dataAtual)
                                                        }
                                                        options={{
                                                            chart: {
                                                                height: 350,
                                                                type: 'heatmap',
                                                            },
                                                            dataLabels: {
                                                                enabled: false
                                                            },
                                                            colors: ["#008FFB"],
                                                            title: {
                                                                text: 'HeatMap Chart (Single color)'
                                                            },
                                                            title: {
                                                                text: 'HeatMap Chart with Color Range'
                                                            },
                                                        }}

                                                        height={350}
                                                        width={500}

                                                    />
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
