import React, {useState} from "react";
import './Board.scss'
import { useParams } from "react-router-dom";
import Tile from "../Tile/Tile";

function Board(props) {
  let { id } = useParams();
  console.log('ID: ', id);
  console.log('ALL BOARD PROPS: ', props);

  const [data, setData] = useState(null);

  React.useEffect(() => {
    console.log('its happending')
    fetch(`/multi/${ id }`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [id])

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