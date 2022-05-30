import React from 'react';
import styled from 'styled-components';
import { useState } from 'react'





const sliderThumbStyles = (props) => (`
  width: 15px;
  height: 15px;
  background: ${props.color};
  cursor: pointer;
  outline: 3px solid #333;
  opacity: ${props.opacity};
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #c20004;
  margin-top: 2rem;
  .value {
    flex: 1;
    font-size: 1.5rem;
    margin-left: 1rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: #b3b3b3;
    outline: none;
    border: none
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default function Slider({ macete }) {
    const [color] = useState();
    const [avaliacao, setAvaliacao] = useState(0)
     

    return (
      <Styles color={color}>
          
        <input type="range" min={0} max={10} value={avaliacao} className="slider" onChange={ (e) =>  { macete(e.target.value); setAvaliacao(e.target.value)}} />
        <div className="value">{avaliacao}</div>
      </Styles>
    )
}