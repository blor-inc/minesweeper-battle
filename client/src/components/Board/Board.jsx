import React from "react";
import './Board.css'

import Tile from "../Tile/Tile";

function Board(props) {

  return (
    <div className="board">
      {props.data.board.map((row) => {
        return row.map((cellData) => {
          return <Tile data={ cellData }/>;
        })
      })}
    </div>
  );
};

export default Board;