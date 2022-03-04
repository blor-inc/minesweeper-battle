const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { nanoid } = require('nanoid')
const path = require('path');

const minesweeper = require('./minesweeper');

const PORT = process.env.PORT || 3000;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

// for posting encoded params
app.use(express.urlencoded({ extended: true }));
// for posting json
app.use(express.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/debug', (req, res) => {
  res.json({ message: 'Minesweeper' })
})

const games = {};


io.on("connection", (socket) => {

  socket.on('joinRoom', (room) => {
    socket.join(room)
  });

  socket.on('modifyGameState', (data) => {

    // separate this into its own function later....maybe in a diff file
    let gameId = data.gameId;
    let row = data.position[0];
    let col = data.position[1];
    let game = games[gameId];

    game.revealTile(row, col);
    let newBoardState = {
      gameId,
      boardHeight: game.height,
      boardWidth: game.width,
      board: getBoard(gameId),
      endGame: game.getGameState(),
    }
    console.log(newBoardState)
    io.sockets.in(gameId).emit('returnUpdatedGameState', newBoardState)
  })
});

app.get('/get-coop/:id', (req, res) => {
  console.log('ID: ', req.params.id);

  let gameId = req.params.id;
  let game = games[gameId];
  let gameState = {
    gameId,
    boardHeight: game.height,
    boardWidth: game.width,
    board: getBoard(gameId),
    endGame: game.getGameState(),
  }
  console.log(gameState)
  res.json(gameState)
})

app.post('/create-game', (req, res) => {
  let randomId = nanoid(10);

  // No way this happens but....
  if (randomId in games) {
    randomId = nanoid(10);
  }

  games[randomId] = new minesweeper.Minesweeper(12, 15, 20);
  let gameId = randomId;
  res.json({ gameId });
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

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

httpServer.listen(PORT);