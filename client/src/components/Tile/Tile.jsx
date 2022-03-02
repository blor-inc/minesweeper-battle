import React from "react";
import './Tile.scss';
import socket from '../../socket/socket';



function Tile(props) {

  function tileDisplay(tileData) {
    if (tileData.containsMine) {
      return '💣';
    } else if (tileData.surroundingMineCount) {
      return tileData.surroundingMineCount;
    }
  }

  function handleOnClick() {
    let emitGameData = {
      gameId: props.gameId,
      position: props.position
    };

    socket.emit('games', emitGameData, (data) => {
      props.changeBoardData(data);
    });
  }

  return (
    <div
      className={`cell ${props.data.isCovered ? "covered" : "uncovered"}`}
      onClick={handleOnClick}
    >
      <div>
        {tileDisplay(props.data)}
      </div>
    </div>
  )
}

export default Tile;