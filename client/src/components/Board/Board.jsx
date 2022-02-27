import React from "react";
import './Board.scss'

import Tile from "../Tile/Tile";

function Board(props) {

  const tilePerRow = {
    'grid-template-columns': `repeat(${props.data.board[0].length}, 1fr)`
  };

  return (
    <div className="board" style={tilePerRow}>
      {props.data.board.map((row, rowIndex) => {
        return row.map((cellData, colIndex) => {
          return <Tile data={ cellData } key={(rowIndex + 1) * colIndex} position={[rowIndex, colIndex]}/>;
        })
      })}
    </div>
  );
};

export default Board;