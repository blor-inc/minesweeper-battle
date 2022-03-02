const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const minesweeper = require('./minesweeper');

const { nanoid } = require('nanoid')

const PORT = process.env.PORT || 3001;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

// for posting encoded params
app.use(express.urlencoded({ extended: true }));
// for posting json
app.use(express.json());

app.get('/debug', (req, res) => {
  res.json({ message: 'Minesweeper' })
})

const games = {};


io.on("connection", (socket) => {
  socket.on('modifyGameState', (data) => {
    let gameId = data.gameId;
    let row = data.position[0];
    let col = data.position[1];
    let game = games[gameId];

    game.revealTile(row, col);
    let newBoardState = {
      gameId,
      boardHeight: game.height,
      boardWidth: game.width,
      board: getBoard(gameId)
    }

    io.emit('returnUpdatedGameState', newBoardState);
  })
});

app.get('/coop/:id', (req, res) => {
  console.log('ID: ', req.params.id);
  
  let gameId = req.params.id;
  let game = games[gameId];
  res.json({
    gameId,
    boardHeight: game.height,
    boardWidth: game.width,
    board: getBoard(gameId)
  })
})

app.post('/create-game', (req, res) => {
  let gameUUID = nanoid(10);
  games[gameUUID] = new minesweeper.Minesweeper(12, 15, 20);
  let gameId = gameUUID;
  res.json({gameId});
});

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

app.get('/debug-games', (req, res) => {
  console.log('/debug-games')
  Object.keys(games).map((k) => {
    console.log(k)
    console.log(games[k].toString())
  })
  res.json({ games: games })
})

httpServer.listen(PORT);