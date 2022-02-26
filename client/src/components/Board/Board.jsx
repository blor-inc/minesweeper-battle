import React from "react";
import './Board.css'

import Cell from "../Cell/Cell";

function Board(props) {

  return (
    <div className="board">
      {props.data.board.map((row) => {
        return row.map((cellData) => {
          return <Cell data={ cellData }/>;
        })
      })}
    </div>
  );
};

export default Board;