import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import HeaderAdm from "../../components/header/headerAdm";
import carimbo from "../../assets/img/carimbo.svg";
import api from "../../services/api";
import '../../assets/css/requisicaoFuncionario.css'
import { ToastContainer, toast } from 'react-toastify';


export default function RequisicaoFuncionario() {
    const notify_Logar_Failed = () => toast.error("Alguma coisa deu errado, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Alteração realizada com sucesso!")

    const [listaFuncionariosPendentes, setListaFuncionariosPendentes] = useState([])

    function listarFuncionariosPendentes() {
        api('/Registroscursos/RegistroCursos/2', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }
        )
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('lista de funcionarios pendentes')
                    console.log(resposta)
                    setListaFuncionariosPendentes(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(listarFuncionariosPendentes, [])


    function requisicao(usuario, idRegistroCurso) {
        enviarEmail(usuario)
        alterarSituacao(idRegistroCurso)
    }


    function enviarEmail(usuario) {
        // usuario.preventDefault();        
        console.log('curso.idCurso!')
        // console.log(cursos.idCurso)
        api.post('/Registroscursos/EnviaEmailDescricao/' + usuario, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )
            .then(function (response) {
                console.log(response);
                console.log('Enviado!')
                listarFuncionariosPendentes()
                // notify_cadastro_sucess();

                // setListaComentarioCurso(response.data)
            })
            // .catch(resposta => notify_Logar_Failed())
            .catch(erro => console.log(erro))
    }

    function alterarSituacao(idRegistroCursos) {
        // event.preventDefault();


        // console.log('curso.idCurso!')
        // console.log(cursos.idCurso)

        api.put('/Registroscursos/' + idRegistroCursos, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }

        )
            .then(function (response) {
                console.log(response);
                console.log('Concluido!')
                notify_cadastro_sucess();
                listarFuncionariosPendentes()
                // setListaComentarioCurso(response.data)
            })
            .catch(resposta => notify_Logar_Failed())
        // .catch(erro => console.log(erro))
    }



    return (
        <div className="geral_g2">

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

            <HeaderAdm />

            <div className='container'>
                <div className='title_caixa_requisicaoFuncionario_g2'>
                    <h1 className='h1_requisicaoFuncionario_g2'>Funcionários Pendentes</h1>
                </div>
            </div>

            <div className="container">
                <section className="container_table_g2" >
                    <table className="table_funcionariosPendentes_g2">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Cargo</th>
                                <th>E-mail</th>
                                <th>Curso</th>
                                <th>Site do curso</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                listaFuncionariosPendentes.map((fp) => {
                                    return (
                                        <tr key={fp.idRegistroCurso} >
                                            <td>{fp.idUsuarioNavigation.nome}</td>
                                            <td>{fp.idUsuarioNavigation.cpf}</td>
                                            <td>{fp.idUsuarioNavigation.idCargoNavigation.nomeCargo}</td>
                                            <td>{fp.idUsuarioNavigation.email}</td>
                                            <td>{fp.idCursoNavigation.nomeCurso}</td>
                                            <td>{fp.idCursoNavigation.siteCurso}</td>
                                            <td className="img_carimbo_g2">
                                                <img onClick={() => { requisicao(fp.idUsuarioNavigation.email, fp.idRegistroCurso) }} src={carimbo} alt="validar" />
                                            </td>

                                        </tr>


                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </div>


            <Footer />
        </div>
    )
}