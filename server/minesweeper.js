/** 
 * This is the Minesweeper class
 * 
 * Properties:
 * - height: the number of rows of the board
 * - width: the number of columns of the board
 * - remainingTileCount: numbers of tiles left uncovered. When 0, game ends and player wins
 * - gameOver: false while game is not over, true when over
 * - gameWin: win condition; true only when game is won
 * - board: 2D array of Tiles
 * - mineLocations: array of mine locations, sequentially (not row/col coordinates, but single integer locations)
 * 
*/

class Minesweeper {
  constructor(height, width, mineCount) {
    this.height = height
    this.width = width
    this.remainingTileCount = height * width - mineCount
    this.gameOver = false
    this.gameWin = false

    this.board = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => new Tile(false)),
    )

    this.#randomlyPopulateMines(mineCount)
  }

  // Returns an object with booleans of gameOver and gameWin (True, True == win; True, False == lose)
  getGameState(){
    return {
      gameOver: this.gameOver,
      gameWin: this.gameWin
    }
  }

  // Checks whether there are remaining tiles to be uncovered, change game state if all tiles are uncovered
  #setGameState() {
    if (this.remainingTileCount == 0){
      this.gameOver = true
      this.gameWin = true
    }
  }

  // Randomly assign locations of mines into mineLocations 
  #randomlyPopulateMines(n) {
    if (n < 0 || n > this.height * this.width) {
      throw `Impossible to populate ${n} mines in a ${this.height} by ${this.width} board.`
    }

    this.mineLocations = []
    while (this.mineLocations.length < n) {
      const candidate = Math.floor(Math.random() * this.height * this.width)
      if (!this.mineLocations.includes(candidate)) {
        this.mineLocations.push(candidate)
      }
    }

    this.mineLocations.forEach((ml) => {
      const [r, c] = this.#convertCoordinate(ml)

      this.board[r][c].setContainsMine(true)

      for (let rr = r - 1; rr <= r + 1; rr++) {
        for (let cc = c - 1; cc <= c + 1; cc++) {
          if (rr === r && cc === c) {
            continue
          }

          if (rr < 0 || cc < 0 || rr >= this.height || cc >= this.width) {
            continue
          }

          this.board[rr][cc].incrementSurroundingMineCount()
        }
      }
    })
  }

  // Convert the mineLocations numbers into board coordinates
  #convertCoordinate(location) {
    const r = Math.floor(location / this.width)
    const c = location % this.width
    return [r, c]
  }

  // Check Tile identity (mine or number from 0-8), then change Tile to "reveal"
  revealTile(row, col) {
    const tile = this.board[row][col]

    if (tile.containsMine) {

      // If Tile is a mine, reveal all mines and set gameOver = true
      this.mineLocations.forEach((ml) => {
        const [r, c] = this.#convertCoordinate(ml)
        this.board[r][c].isRevealed = true
      })

      this.gameOver = true
      return
    }

    // If Tile is a non-zero number, reveal only that Tile
    else if (tile.surroundingMineCount > 0) {
      tile.isRevealed = true
      this.remainingTileCount--
    }
    
    // If Tile is 0, reveal the entire area of 0's along with the bordering non-zero numbers
    else if (tile.surroundingMineCount == 0) {
      tile.isRevealed = true
      this.remainingTileCount--
      this.#revealSurroundingTiles(row, col)
    }

    this.#setGameState()
  }

  // Recursively reveal Tiles as long as they are zero, or bordering non-zero values
  #revealSurroundingTiles(row, col) {

    for (let rr = row - 1; rr <= row + 1; rr++) {
      for (let cc = col - 1; cc <= col + 1; cc++) {
        
        if (rr === row && cc === col) {
          continue
        }

        if (rr < 0 || cc < 0 || rr >= this.height || cc >= this.width) {
          continue
        }

        if (this.board[rr][cc].isRevealed) {
          continue
        }

        if (this.board[rr][cc].surroundingMineCount > 0) {
          this.board[rr][cc].isRevealed = true
          this.remainingTileCount--
        }

        else if (this.board[rr][cc].surroundingMineCount == 0) {
          this.board[rr][cc].isRevealed = true
          this.remainingTileCount--
          this.#revealSurroundingTiles(rr, cc)
          
        }
      }
    }
  }

  // convert this board object into a "detailed" string, including all fields
  toDetailedString() {
    const stringLines = [
      'Board',
      `height:${this.height}`,
      `width:${this.width}`,
      `mineLocations:${this.mineLocations}`,
      `tiles:`,
    ]

    this.board.forEach((row) => {
      stringLines.push(
        `[${row.map((t) => t.toDetailedString()).join(',\n')}]\n`,
      )
    })

    return stringLines.join('\n')
  }

  // convert this board object into a pretty grid which shows bombs and surroundingMineCounts
  toString() {
    const horizontalBorder = '-'.repeat(this.width * 2 + 1)
    const stringLines = [horizontalBorder]

    this.board.forEach((row) => {
      const currentRow = []

      row.forEach((tile) => {
        if (tile.containsMine) {
          currentRow.push('x')
        } else {
          currentRow.push(tile.surroundingMineCount)
        }
      })

      stringLines.push('|' + currentRow.join('|') + '|')
    })

    stringLines.push(horizontalBorder)
    return stringLines.join('\n')
  }

  // for testing purposes; board displays according to each Tile's reveal status
  toRealisticString() {
    const horizontalBorder = '-'.repeat(this.width * 2 + 1)
    const stringLines = [horizontalBorder]

    this.board.forEach((row) => {
      const currentRow = []

      row.forEach((tile) => {
        if (tile.containsMine && tile.isRevealed) {
          currentRow.push('x')
        } else if (!tile.isRevealed) {
          currentRow.push(' ')
        } else {
          currentRow.push(tile.surroundingMineCount)
        }
      })

      stringLines.push('|' + currentRow.join('|') + '|')
    })

    stringLines.push(horizontalBorder)
    return stringLines.join('\n')
  }
}

// Tile class used by Board to represent each tile on a minesweeper board (see Board.board)
class Tile {
  constructor(containsMine) {
    this.containsMine = containsMine
    this.isRevealed = false
    this.surroundingMineCount = 0
  }

  incrementSurroundingMineCount() {
    this.surroundingMineCount++
  }

  setContainsMine(containsMine) {
    this.containsMine = containsMine
  }

  // print tile with all its properties
  toDetailedString() {
    return `[Tile containsMine:${this.containsMine} isRevealed:${this.isRevealed} surroundingMineCount:${this.surroundingMineCount}]`
  }
}

module.exports = { Minesweeper, Tile }

if (require.main === module) {
  const board = new Minesweeper(5, 5, 25)
  
  console.log(board.toRealisticString())
  console.log(board.remainingTileCount)

  const readline = require('readline')
  const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  var gameStart = function () {
    inquirer.question("Enter coordinates: ", (input) => {
      if (input == 'exit'){
        return readline.close()
      }

      const coordinates = input.trim().split(" ").map(numStr => parseInt(numStr))

      console.log(coordinates)

      board.revealTile(coordinates[0], coordinates[1])

      console.log(board.toRealisticString())
      console.log(board.getGameState())
      console.log(board.remainingTileCount)


      gameStart()
    })
  }
  
  gameStart()
}
