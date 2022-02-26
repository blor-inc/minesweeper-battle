import React from 'react';
import './App.css';
import Board from './components/Board/Board';

function App() {
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

        console.log(data)
      })
  }

  function populateGameBoard(gameState) {
    console.log(gameState)
    // TODO
    return (
      <Board data={gameState}/>
    );
    // return <div>Display Board Here</div>
  }

  return (
    <div className="App">
      <p>{!data ? 'Loading...' : data}</p>
      <button hidden={gameState != null} onClick={newGame}>
        New Game
      </button>
      {gameState != null && populateGameBoard(gameState)}
    </div>
  )
}

export default App
