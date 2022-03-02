import React from 'react';
import Board from '../Board/Board';
import { useParams } from "react-router-dom";
import './CoOpGame.scss'
function CoOpGame() {
  let { id } = useParams();
  return (
    <Board id={id}/>
  );
}

export default CoOpGame;