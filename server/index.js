const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const minesweeper = require('./minesweeper');

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

io.on("connection", (socket) => {
  console.log('Server socket id: ', socket.id);
  socket.on('sheesh', (data, cb) => {
    console.log(data);
    let gameId = data.gameId;
    let row = data.position[0];
    let col = data.position[1];
    let game = gamesById[gameId];

    game.revealTile(row, col);
    let newBoardState = {
      gameId,
      boardHeight: game.height,
      boardWidth: game.width,
      board: getBoardById(gameId)
    }
    cb(newBoardState);
  })
});




const games = {};

const gamesById = {};
app.get('/coop/:id', (req, res) => {
  console.log('ID: ', req.params.id);
  
  let gameId = req.params.id;
  let game = gamesById[gameId];
  res.json({
    gameId,
    boardHeight: game.height,
    boardWidth: game.width,
    board: getBoardById(gameId)
  })
})

app.post('/create-game', (req, res) => {
  let gameUUID = uuidv4();
  gamesById[gameUUID] = new minesweeper.Minesweeper(12, 15, 20);
  let gameId = gameUUID;
  res.json({gameId});
});

function getBoardById(gameId) {
  return gamesById[gameId].board.map((row) =>
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