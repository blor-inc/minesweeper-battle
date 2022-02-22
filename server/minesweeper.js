class Board {
  constructor(height, width) {
    this.height = height
    this.width = width
    this.board = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => new Tile(false)),
    )
  }

  randomlyPopulateMines(n) {
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

    // console.log(this.mineLocations)

    this.mineLocations.forEach((ml) => {
      const r = Math.floor(ml / this.height)
      const c = ml % this.width

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
}

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

  toDetailedString() {
    return `[Tile containsMine:${this.containsMine} isRevealed:${this.isRevealed} surroundingMineCount:${this.surroundingMineCount}]`
  }
}

if (require.main === module) {
  const board = new Board(20, 20)
  board.randomlyPopulateMines(250)
  // console.log(board.toDetailedString())
  console.log(board.toString())
}
