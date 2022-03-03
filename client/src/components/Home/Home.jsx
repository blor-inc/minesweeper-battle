import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {

  function newGame() {
    fetch('/create-game', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        window.location.href=`/coop/${data.gameId}`; 
      })
      .catch(err => (
        console.log(err)
      ))
  };

  return (
    <div className="Home">
      <p className='Title'>{'Minesweeper'}</p>
      <Link to='/Placeholder'>
        <button className='singlePlayerButton'onClick={newGame}>
          Single player
        </button>
      </Link>
      <button className='Co-OpButton' onClick={newGame}>
        Co-Op Mode
      </button>
      <Link to='/Placeholder'>
        <button className='MultiplayerButton'>
          Multiplayer
        </button>
      </Link>

    </div>
  )
};

export default Home;