import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/css/modalAcompanhar.css'
import imgPadrao from '../../assets/img/imgPadrao.png';
import styled from 'styled-components';
import Slider from '../slider/slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApexCharts from "react-apexcharts";
import {
  parseJwt
  // usuarioAutenticado
} from '../../services/auth';



export const ModalAcompanhar = ({ showModal, setShowModal, usuario, idUsuarioAvaliador }) => {
  const modalRef = useRef();
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [listaHistorico, setListaHistorico] = useState([]);
  const [avaliacao, setAvaliacao] = useState(0);
  const [listaDatasHist, setListaDatasHist] = useState([]);
  const [idUsuarioAvaliado, setIdUsuarioAvaliado] = useState(0);
  // const [listaAtividades, setListaAtividades] = useState([]);
  // const [sampleData, setSampleData] = useState([])
  const notify_avaliacao = () => toast.success("Avaliação Cadastrada!");

  const notify_erroAvaliacao = () => toast.error("Preencha todos os campos!");
  let history = useHistory();


  function cadastrarAvaliacao(event) {

    let idUsuarioAvaliados = usuario.idUsuario;
    console.log(idUsuarioAvaliados)
    event.preventDefault();
    axios.post("https://apigrupo3.azurewebsites.net/api/AvaliacaoUsuarios/Cadastrar", {
      idUsuarioAvaliado: idUsuarioAvaliados,
      idUsuarioAvaliador: idUsuarioAvaliador,
      avaliacaoUsuario1: avaliacao,
      valorMoedass: 20
    }, {

      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
      }



    })
      .then(response => {
        if (response.status === 201) {
          console.log(response)
          console.log("foiiiiii")
          notify_avaliacao();

        }
      })
      .catch(erro => { notify_erroAvaliacao(); console.log(erro) })
  }

  const closeModal = e => {
    setShowModal(false);
    console.log('showModal antes:' + showModal)

    console.log('showModal depois:' + showModal)
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  // function ListarUsuario() {

  //     let idUsuario = usuario.idUsuario
  //     console.log('Olha')
  //     console.log(idUsuario)
  //     axios.get(`http://localhost:5000/api/Usuarios/Listar/${idUsuario}`, {

  //       headers: {

  //         Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
  //       }

  //     })

  //       .then((resposta) => {

  //         if (resposta.status === 200) {
  //           setListaFuncionarios(resposta.data)
  //           console.log(resposta.data)


  //         }

  //       })

  //       .catch(erro => console.log(erro))

  //   }

  // useEffect(() => ListarUsuario(), [])


  // function Teste(){
  //   // debugger;
  //   console.log(usuario)
  // }
  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      console.log(usuario)
      // console.log(usuario.medSatisfacaoGeral) 
      // console.log(usuario.mediaAvaliacao) 
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
  // useEffect(Teste(), [] )



  return (
    <>
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
      {showModal ? (
        <div className="background_modal"
        >
          <div className="g3_modal-body">
            <div className='g3_containerOrganizacaoModal'>
              <div className='g3_infoModal'>
                <img className='g3_fotoPerfilModal' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/' + usuario.caminhoFotoPerfil} />
                {/* <img className='g3_fotoPerfilModal' src={"https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" + usuario.caminhoFotoPerfil} /> */}
                <div className='g3_perfilModal'>
                  <span className='g3_spanInfoModal'>{usuario.nome}</span>
                  {/* <span className='g3_spanInfoModal'>{usuario.idCargoNavigation.nomeCargo}</span> */}
                </div>
              </div>
              <div className='g3_graficosModal'>
                {/* {
                  listaFuncionarios.map((usuario) => {
                    return ( */}
                <div className='g3_organizadorGraficosModal'>
                  <div className='g3_graficoSatisfacaoModal'>
                    <span className='g3_spanGraficos'>Satisfação</span>
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
                    
                  </div>
                  <div className='g3_graficoProdutividadeModal'>
                    <span className='g3_spanGraficos'>Avaliação</span>
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
                      labels: ['Avaliação'],
                    }} series={[usuario.mediaAvaliacao * 100]} type="radialBar" height={200} width={200} 
                    />
                  </div>
                </div>
                {/* )
                  }
                  )
                }  */}
              </div>
              <div className='g3_organizarBtn'>
                {/* <label className='g3_labelModal'>Nota:</label> */}
                <form className='g3_formModal' onSubmit={cadastrarAvaliacao}>
                  {/* <input
                    type="range"
                    className="g3_inputRange"
                    min="0"
                    name="avaliacao"
                    id="avaliacao"
                    label={true}
                    max={MAX}
                    onChange={(e) => setAvaliacao(e.target.value)}
                    style={getBackgroundSize()}
                    value={avaliacao}
                  /> */}
                  <Slider macete={nota => setAvaliacao(nota)} color="#c20004" />
                  {/* <input type="text" className="g3_inputCadastroModal" placeholder='Insira uma nota' name="avaliacao" value={avaliacao} onChange={(event) => setAvaliacao(event.target.value)} /> */}
                  <button type="submit" className="btn_avaliar_modal">Avaliar</button>
                </form>
                <button className="btn_atualizar_modal" onClick={() => history.push(`/atualizar/${usuario.idUsuario}`)}>Atualizar Perfil</button>
                <button className="g3_btn_fechar_modal" onClick={closeModal}>Fechar</button>
              </div>

            </div>

          </div>
        </div>
      ) : null}
    </>
  );

}