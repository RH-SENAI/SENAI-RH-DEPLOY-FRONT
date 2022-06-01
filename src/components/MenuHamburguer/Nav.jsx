
import React from 'react';
import styled from 'styled-components';
import Burger from './Burguer';
import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
  .logo_header_g2 {
    margin-right: 30vw;
    display: flex;
    align-items: center;
}
@media (max-width: 480px) {
    .logoHeader{
        margin: 1rem 0 0 1rem;
        height: 10vw
    }
}
`

const Navbar = () => {
    return (
        <Nav>
            <div className='logo_header_g2'>
                <Link to="/redirecionamento"> <img className='logoHeader' src={logo} alt="Logo do Senai" /></Link>
            </div>
            <Burger />
        </Nav>
    )
}

export default Navbar