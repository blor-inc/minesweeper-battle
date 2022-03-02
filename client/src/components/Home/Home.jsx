import React from 'react';
import './Home.scss';
// import { Link } from 'react-router-dom';

import socket from '../../socket/socket';

function Home() {
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  function newGame() {
    fetch('/create-game', { method: 'POST' })
      .catch(err => (
        console.log(err)
      ))
  }



  return (
    <div className="Home">
      <p className='Title'>{'Minesweeper'}</p>
      {/* <button className='singlePlayerButton' hidden={gameState != null} onClick={newGame}>
        Single player
      </button> */}
      <button className='MultiplayerButton' onClick={newGame}>
        Multiplayer
      </button>
      {/* <Link to='/Placeholder'>
        <button className='MultiplayerButton' hidden={gameState != null}>
          Multiplayer
        </button>
      </Link> */}

    </div>
  )
};


export default Home;