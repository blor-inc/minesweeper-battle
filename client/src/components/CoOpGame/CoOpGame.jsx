import React from 'react';
import Board from '../Board/Board';
import { useParams } from "react-router-dom";
import './CoOpGame.scss'
import socket from '../../socket/socket';


function CoOpGame() {
  let { id } = useParams();

  const roomId = id;
  socket.on('connect', () => {
    socket.emit('joinRoom', roomId);
  });

  return (
    <div>
      <h5>http://localhost:3000/coop/{id}</h5>
      <Board id={id}/>
    </div>
  );
}

export default CoOpGame;