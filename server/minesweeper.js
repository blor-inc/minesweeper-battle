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

    this.mineCount = n

    const mineLocations = []
    while (mineLocations.length < n) {
      const candidate = Math.floor(Math.random() * this.height * this.width)
      if (!mineLocations.includes(candidate)) {
        mineLocations.push(candidate)
      }
    }

    console.log(mineLocations)

    mineLocations.forEach((ml) => {
      const r = Math.floor(ml / this.height)
      const c = ml % this.width

      this.board[r][c] = new Tile(true)
    })
  }

  toString() {
    const stringLines = [
      'Board',
      `height:${this.height}`,
      `width:${this.width}`,
      `mineCount:${this.mineCount}`,
      `tiles:`,
    ]

    this.board.forEach((row) => {
      stringLines.push(`[${row.map((t) => t.toString()).join(',\n')}]\n`)
    })

    return stringLines.join('\n')
  }
}

class Tile {
  constructor(containsMine) {
    this.containsMine = containsMine
    this.isRevealed = false
  }
}

Tile.prototype.toString = function () {
  return `[Tile containsMine:${this.containsMine} isRevealed:${this.isRevealed}]`
}

if (require.main === module) {
  const board = new Board(4, 4)
  board.randomlyPopulateMines(5)
  console.log(board.toString())
}
