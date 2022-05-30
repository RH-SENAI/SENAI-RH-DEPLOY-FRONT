// import { useState, useEffect } from 'react';
// import axios from 'axios';
import '../../assets/css/gp1style.css'
import Rodape from '../../components/Footer';
import Header from '../../components/header/headerFuncionario';
// import { Link } from 'react-router-dom'

export default function ValidarAtividades() {

    return (
        <div className="div_container">
            <Header />
            <div className="container_">
                <div className="container_cards">
                    <div>
                        <div className="container_card_atividades">
                            <h1>Validar Atividades</h1>
                            <div className='container_atividades'>
                                <div className='box_atividade'>
                                    <div className='organizar_atividade'>
                                        <h2 className='titulo_atividade'>Titulo da Atividade</h2>
                                        <p className='descricao_atividade'>Descrição da Atividade ....</p>
                                    </div>
                                    <img className='img_olho' src={img_olho} alt="Icone de um olho" />
                                </div>
                                <hr className='linha_atividade' />
                                <div className='box_atividade'>
                                    <div className='organizar_atividade'>
                                        <h2 className='titulo_atividade'>Titulo da Atividade</h2>
                                        <p className='descricao_atividade'>Descrição da Atividade ....</p>
                                    </div>
                                    <img className='img_olho' src={img_olho} alt="Icone de um olho" />
                                </div>
                                <hr className='linha_atividade' />
                            </div>
                        </div>
                    </div>
                </div>
                <Rodape />
            </div>
        </div>
    );
}