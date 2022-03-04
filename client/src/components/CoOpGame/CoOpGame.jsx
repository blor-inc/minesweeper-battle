import React, { useState } from 'react';
import Board from '../Board/Board';
import './CoOpGame.scss'
import socket from '../../socket/socket';
import { useParams } from 'react-router-dom';

function CoOpGame() {
  const roomId = useParams().gameId
  console.log(roomId)
  
  socket.on('connect', () => {
    socket.emit('joinRoom', roomId);
  });

  return (
    <div>
      <h5>ID: {roomId}</h5>
      <Board id={roomId} />
    </div>
  );
}


export default CoOpGame;