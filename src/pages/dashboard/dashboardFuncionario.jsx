import { useState, useEffect } from "react";
import "../../assets/css/dashboard.css"
import HeaderFuncionario from "../../components/header/headerFuncionario";
import Navbar from '../../components/MenuHamburguer/Nav';
import Footer from "../../components/footer"
import grafico from "../../assets/img/grafico.png";
import estrela from "../../assets/img/star.png";
import iconPerfil from "../../assets/img/telaPerfil.png";
import SetaProx from '../../assets/img/proximo1.png';

import axios from "axios";
import {
    VictoryBar, VictoryPie, VictoryChart, VictoryLabel,
    VictoryTheme
} from 'victory';
import ImgDashboard from '../../assets/img/telaDeAcessoLight.svg';
import {
    parseJwt
    // usuarioAutenticado
} from '../../services/auth';

import ApexCharts from "react-apexcharts";


export default function Dashboard() {

    // States
    const [medSatisfacaoGeral, setMedSatisfacaoGeral] = useState(0);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaAtividades, setListaAtividades] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [listaDatasHist, setListaDatasHist] = useState([]);
    const [satisfacao, setSatisfacao] = useState([]);
    const [avaliacao, setAvaliacao] = useState([]);
    const [produtividade, setProdutividade] = useState([]);
    const [notaProdutividade, setNotaProdutividade] = useState(0);
    const [sampleData, setSampleData] = useState([]);
    const [listaHistorico, setListaHistorico] = useState([]);
    const [listaHistoricoUni, setListaHistoricoUni] = useState([]);
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

    function ListarHistorico() {

        axios.get(`https://apigrupo3.azurewebsites.net/api/HistoricoA/Listar/${parseJwt().jti}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    const dados = resposta.data
                    setListaHistorico(resposta.data)
                    setListaDatasHist(dados.map(p => p.atualizadoEm));
                    setSatisfacao(dados.map(p => (p.nivelSatisfacao * 100).toPrecision(2)));
                    setAvaliacao(dados.map(p => (p.mediaAvaliacao * 100).toPrecision(2)));
                    setProdutividade(dados.map(p => (p.notaProdutividade * 100).toPrecision(2)));


                    //console.log(satisfacao)

                }

            })
            .then(

            )

            .catch(erro => console.log(erro))

    }
    function ListarHistoricoUni() {

        axios.get(`https://apigrupo3.azurewebsites.net/api/HistoricoUnidades/Listar/${parseJwt().jti}`, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    const dados = resposta.data
                    setListaHistoricoUni(resposta.data)



                    //console.log(satisfacao)

                }

            })
            .then(

            )

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


    function MudarDashBoard(idUsuarioLot) {

        setListaUsuarios([listaUsuarioLot.find((usuario) => { if (usuario.idUsuario == idUsuarioLot) return usuario })])

        BuscarHistoricoUsuarioLot(idUsuarioLot)
    }
    function LimparStates() {

        setListaHistorico([]);
        setListaHistoricoUni([]);
        setListaDatasHist([]);
        setSatisfacao([]);
        setAvaliacao([]);
        setProdutividade([]);

    }



    

    useEffect(() => {
        ListarUsuario()
        return (
            setListaUsuarios([])
        )
    }, []);

    useEffect(() => {
        ListarHistorico()
        return (
            LimparStates()
        )
    }, []);
    useEffect(() => {
        ListarHistoricoUni()
        return (
            LimparStates()
        )
    }, []);
    useEffect(BuscarListaDeUsuariosLot, []);


    return (
        <div>
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>
            <main>
                <div className="container">
                    <div className="g3_boxTituloDashboard">
                        <span className="g3_tituloDashboard">DASHBOARD</span>
                        <select
                        className="g3_inputDashSelect"
                            name="idUsuarioLot"
                            value={idUsuarioLot}
                            onChange={(event) => { setIdUsuarioLot(event.target.value); MudarDashBoard(event.target.value)}}
                        >
                            {listaUsuarioLot.map((usuario) => {
                                return (<option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nome}</option>)
                            })}
                        </select>

                    </div>
                    
                    <div className="g3_containerGraficos">
                        {
                            listaUsuarios.map((usuario) => {
                                return (
                                    <div className='g3_organizadorDashboard'>
                                        <div className="g3_boxGraficosLeft">
                                            <div className='g3_containerProdutividade'>
                                                <div className="g3_graficoProgress">
                                                    <ApexCharts options={{
                                                        chart: {
                                                            height: 350,
                                                            type: 'radialBar',
                                                        },
                                                        plotOptions: {
                                                            radialBar: {
                                                                hollow: {
                                                                    size: '50%',
                                                                }
                                                            },
                                                        },
                                                        colors: ['#c20004'],
                                                        labels: ['Satisfação'],
                                                    }} series={[Math.round(usuario.medSatisfacaoGeral * 100)]} type="radialBar" height={200} width={200}
                                                    />
                                                    <img src={SetaProx} className='g3_imgSetaProx'/>
                                                    <ApexCharts options={{
                                                        chart: {
                                                            height: 350,
                                                            type: 'radialBar',
                                                        },
                                                        plotOptions: {
                                                            radialBar: {
                                                                dataLabels: {
                                                                    name: {
                                                                        fontSize: '22px',
                                                                    },
                                                                    value: {
                                                                        fontSize: '16px',
                                                                    },


                                                                    total: {
                                                                        show: true,
                                                                        label: 'Feedbacks',
                                                                        formatter: function (w) {

                                                                            return (usuario.medFeedbackPos * 100).toPrecision(2) + '%'
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        colors: ['#1380C2', '#888', '#c20004'],
                                                        labels: ['Positivos', 'Neutros', 'Negativos'],
                                                    }}
                                                        series={[
                                                            (usuario.medFeedbackPos * 100).toPrecision(2), (usuario.medFeedbackNeu * 100).toPrecision(2), (usuario.medFeedbackNeg * 100).toPrecision(2)
                                                        ]}
                                                        type="radialBar" height={200} width={200}
                                                    />
                                                    <ApexCharts options={{
                                                        chart: {
                                                            height: 350,
                                                            type: 'radialBar',
                                                        },
                                                        plotOptions: {
                                                            radialBar: {
                                                                dataLabels: {
                                                                    hollow: {
                                                                        size: '50%',
                                                                    },
                                                                    name: {
                                                                        fontSize: '22px',
                                                                    },
                                                                    value: {
                                                                        fontSize: '16px',
                                                                    },
                                                                    total: {
                                                                        show: true,
                                                                        label: 'Cursos',
                                                                        formatter: function (w) {

                                                                            return (usuario.medCursosPos * 100).toPrecision(2) + '%'
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        colors: ['#1380C2', '#888', '#c20004'],
                                                        labels: ['Positivos', 'Neutros', 'Negativos'],
                                                    }}
                                                        series={[
                                                            (usuario.medCursosPos * 100).toPrecision(2), (usuario.medCursosNeu * 100).toPrecision(2), (usuario.medCursosNeg * 100).toPrecision(2)
                                                        ]}
                                                        type="radialBar" height={200} width={200}
                                                    />
                                                    <ApexCharts options={{
                                                        chart: {
                                                            height: 350,
                                                            type: 'radialBar',
                                                        },
                                                        plotOptions: {
                                                            radialBar: {
                                                                dataLabels: {
                                                                    hollow: {
                                                                        size: '50%',
                                                                    },
                                                                    name: {
                                                                        fontSize: '22px',
                                                                    },
                                                                    value: {
                                                                        fontSize: '16px',
                                                                    },
                                                                    total: {
                                                                        show: true,
                                                                        label: 'Descontos',
                                                                        formatter: function (w) {

                                                                            return (usuario.medDescontosPos * 100).toPrecision(2) + '%'
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        colors: ['#1380C2', '#888', '#c20004'],
                                                        labels: ['Positivos', 'Neutros', 'Negativos'],
                                                    }}
                                                        series={[
                                                            (usuario.medDescontosPos * 100).toPrecision(2), (usuario.medDescontosNeu * 100).toPrecision(2), (usuario.medDescontosNeg * 100).toPrecision(2)
                                                        ]}
                                                        type="radialBar" height={200} width={200}
                                                    />

                                                </div>
                                                <div className="g3_graficoAvProgress">
                                                    < ApexCharts
                                                        type="heatmap"
                                                        series={
                                                            ListarMesesAnteriores(dataAtual)
                                                        }
                                                        options={{
                                                            chart: {

                                                                height: 550,
                                                                type: 'heatmap',
                                                            },
                                                            dataLabels: {
                                                                enabled: false,
                                                            },
                                                            colors: ["#c20004"],
                                                        }}
                                                        height={200}
                                                        width={445}

                                                    />
                                                    {/* <ApexCharts options={{
                                                        chart: {
                                                            height: 350,
                                                            type: 'radialBar',
                                                        },
                                                        plotOptions: {
                                                            radialBar: {
                                                                hollow: {
                                                                    size: '70%',
                                                                }
                                                            },
                                                        },
                                                        colors: ['#c20004'],
                                                        labels: ['Avaliação'],
                                                    }} series={[usuario.mediaAvaliacao * 100]} type="radialBar" height={200} width={200}
                                                    />
                                                </div>
                                                <div className="g3_graficoAvProgress">
                                                    <ApexCharts options={{
                                                        chart: {
                                                            height: 350,
                                                            type: 'radialBar',
                                                        },
                                                        plotOptions: {
                                                            radialBar: {
                                                                hollow: {
                                                                    size: '70%',
                                                                }
                                                            },
                                                        },
                                                        labels: ['Satisfação Geral'],
                                                    }} series={[usuario.qtdDeFuncionariosAtivos]} type="radialBar" height={200} width={200}
                                                    /> */}
                                                </div>
                                            </div>



                                            <div className='g3_containerProdutividade'>
                                                <div className="g3_graficoProdutividade">
                                                    <ApexCharts
                                                        options={{
                                                            chart: {
                                                                height: 350,
                                                                type: 'area'
                                                            },
                                                            colors: ['#c20004'],
                                                            dataLabels: { enabled: false },
                                                            stroke: { curve: 'smooth' },
                                                            xaxis: {
                                                                type: 'datetime',
                                                                categories: listaDatasHist
                                                            },
                                                            tooltip: { x: { format: 'dd/MM/yy HH:mm' }, },
                                                        }}
                                                        series={[{
                                                            name: 'Satisfação',
                                                            data: satisfacao
                                                        },
                                                            // {
                                                            //     name: 'Produtividade',
                                                            //     data: produtividade
                                                            // }, 
                                                            // {
                                                            //     name: 'Avaliação',
                                                            //     data: avaliacao
                                                            // }
                                                        ]}
                                                        type="area"
                                                        height={'100%'}
                                                        width={'100%'}
                                                    />
                                                    <span className='g3_spanGraficoP'>Satisfação</span>
                                                </div>
                                                <div className="g3_graficoProdutividade">
                                                    <ApexCharts
                                                        options={{
                                                            chart: {
                                                                height: 350,
                                                                type: 'area'
                                                            },
                                                            colors: ['#c20004'],
                                                            dataLabels: { enabled: false },
                                                            stroke: { curve: 'smooth' },
                                                            xaxis: {
                                                                type: 'datetime',
                                                                categories: listaDatasHist
                                                            },
                                                            tooltip: { x: { format: 'dd/MM/yy HH:mm' }, },
                                                        }}
                                                        series={[
                                                            // {
                                                            //     name: 'Satisfação',
                                                            //     data: satisfacao
                                                            // },
                                                            {
                                                                name: 'Produtividade',
                                                                data: produtividade
                                                            },
                                                            // {
                                                            //     name: 'Avaliação',
                                                            //     data: avaliacao
                                                            // }
                                                        ]}
                                                        type="area"
                                                        height={'100%'}
                                                        width={'100%'}
                                                    />
                                                    <span className='g3_spanGraficoP'>Produtividade</span>
                                                </div>
                                                <div className="g3_graficoProdutividade">
                                                    <ApexCharts
                                                        options={{
                                                            chart: {
                                                                height: 350,
                                                                type: 'area'
                                                            },
                                                            colors: ['#c20004'],
                                                            dataLabels: { enabled: false },
                                                            stroke: { curve: 'smooth' },
                                                            xaxis: {
                                                                type: 'datetime',
                                                                categories: listaDatasHist
                                                            },
                                                            tooltip: { x: { format: 'dd/MM/yy HH:mm' }, },
                                                        }}
                                                        series={[
                                                            // {
                                                            //     name: 'Satisfação',
                                                            //     data: satisfacao
                                                            // },
                                                            // {
                                                            //     name: 'Produtividade',
                                                            //     data: produtividade
                                                            // },
                                                            {
                                                                name: 'Avaliação',
                                                                data: avaliacao
                                                            }
                                                        ]}

                                                        type="area"
                                                        height={'100%'}
                                                        width={'100%'}
                                                    />
                                                    <span className='g3_spanGraficoP'>Avaliação</span>
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