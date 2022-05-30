import React, { Component } from "react"
import Logo from "../../assets/img/Logo.png"
import '../../assets/css/headerLogin.css'

export default class HeaderLogin extends Component {
    render() {
        return (
            <header className="containerHeader container_header_Login">
            <img src={Logo} alt="Logo do senai" className="logo"/>
        </header>
        )
    }
}