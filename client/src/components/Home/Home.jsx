import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <p className='Title'>{'Minesweeper'}</p>
      <Link to='/Placeholder'>
        <button className='singlePlayerButton'>
          Single player
        </button>
      </Link>
      <Link to="/CoOpGame">
        <button className='Co-OpButton' onClick={createNewGame}>
          Co-Op Mode
        </button>
      </Link>
      <Link to='/Placeholder'>
        <button className='MultiplayerButton'>
          Multiplayer
        </button>
      </Link>

    </div>
  )

  function createNewGame() {
    fetch('/create-game', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = `/CoOpGame/${data.gameId}`
      })
      .catch(err => (
        console.log(err)
      ));
  };
};

export default Home;