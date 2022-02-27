const express = require('express')

const minesweeper = require('./minesweeper')

const PORT = process.env.PORT || 3001

const app = express()


// for posting encoded params
app.use(express.urlencoded({ extended: true }));
// for posting json
app.use(express.json());

app.get('/debug', (req, res) => {
  res.json({ message: 'Minesweeper' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

const games = {}

app.get('/debug-games', (req, res) => {
  console.log('/debug-games')
  Object.keys(games).map((k) => {
    console.log(k)
    console.log(games[k].toString())
  })
  res.json({ games: games })
})

app.post('/new-game', (req, res) => {
  console.log('/new-game')
  let gameId = Object.keys(games).length

  games[gameId] = new minesweeper.Minesweeper(12, 15, 20)

  console.log(games[gameId].toString());
  res.json({
    gameId,
    boardHeight: games[gameId].height,
    boardWidth: games[gameId].width,
    board: getBoard(gameId)
  })
})

function getBoard(gameId) {
  return games[gameId].board.map((row) =>
    row.map((tile) => {
      return {
        isCovered: !tile.isRevealed,
        containsMine: tile.isRevealed ? tile.containsMine : null,
        surroundingMineCount: tile.isRevealed
          ? tile.surroundingMineCount
          : null,
      }
    }),
  )
}

app.post('/make-move', (req, res) => {
  let gameId = req.body.gameId;
  let row = req.body.position[0];
  let col = req.body.position[1];
  let game = games[gameId];

  game.revealTile(row, col);
  res.json({
    gameId,
    boardHeight: game.height,
    boardWidth: game.width,
    board: getBoard(gameId)
  })
})
