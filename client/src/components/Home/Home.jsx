import React from 'react';
import './Home.scss';
import Board from '../Board/Board';
import { Link } from 'react-router-dom';
function Home() {
  const [data, setData] = React.useState(null)
  const [gameState, setGameState] = React.useState(null)

  React.useEffect(() => {
    fetch('/debug')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  function newGame() {
    fetch('/new-game', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setGameState(data)
      })
  }

  function populateGameBoard(gameState) {
    return (
      <Board data={gameState}/>
    );
  }

  return (
    <div className="Home">
      <p className='Title'>{!data ? 'Loading...' : data}</p>
      <button className='singlePlayerButton' hidden={gameState != null} onClick={newGame}>
        Single player
      </button>
      <Link to={''}>
      
      </Link>
      <button className='MultiplayerButton' hidden={gameState != null} onClick={newGame}>
        Multiplayer
      </button>
      {gameState != null && populateGameBoard(gameState)}
    </div>
  )
};


export default Home;