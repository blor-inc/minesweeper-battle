import React from "react";
import './Board.scss'

import Tile from "../Tile/Tile";

function Board(props) {

  const tilePerRow = {
    'grid-template-columns': `repeat(${props.data.board[0].length}, 1fr)`
  };

  return (
    <div className="board" style={tilePerRow}>
      {props.data.board.map((row) => {
        return row.map((cellData) => {
          return <Tile data={ cellData }/>;
        })
      })}
    </div>
  );
};

export default Board;