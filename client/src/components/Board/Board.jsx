import React, {useState} from "react";
import './Board.scss'

import Tile from "../Tile/Tile";

function Board(props) {

  const [data, setdata] = useState(props.data);
  const tilePerRow = {
    'gridTemplateColumns': `repeat(${data.board[0].length}, 1fr)`
  };

  return (
    <div className="board" style={tilePerRow}>
      {data.board.map((row, rowIndex) => {
        return row.map((cellData, colIndex) => {
          return (
            <Tile 
              data={ cellData } 
              key={ (rowIndex + 1) * colIndex } 
              position={ [rowIndex, colIndex] } 
              gameId={ data.gameId }
              changeBoardData={ setdata }
            />
          );
        });
      })}
    </div>
  );
};

export default Board;