import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './NavRight';

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 480px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    position: fixed;
    z-index: 100;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#333' : '#333'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
      z-index: 100;
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      z-index: 100;
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
      z-index: 100;
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open}/>
    </>
  )
}

export default Burger