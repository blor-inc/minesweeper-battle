import React, {useState} from "react";
import './Board.scss'
import Tile from "../Tile/Tile";

function Board(props) {


  // maybe have a default state
  const [data, setData] = useState(null);

  React.useEffect(() => {
    console.log('its happending')
    fetch(`/coop/${ props.id }`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [props.id])

  let tilePerRow;
  if (data !== null) {
    tilePerRow = {
      'gridTemplateColumns': `repeat(${data.board[0].length}, 1fr)`
    };
  }

  return (
    !data ? 'Loading...' : 
    <div className="board" style={tilePerRow}>
      {data.board.map((row, rowIndex) => {
        return row.map((cellData, colIndex) => {
          return (
            <Tile 
              data={ cellData } 
              key={ (rowIndex + 1) * colIndex } 
              position={ [rowIndex, colIndex] } 
              gameId={ data.gameId }
              changeBoardData={ setData }
            />
          );
        });
      })}
    </div>
  );
};

export default Board;