import React from "react";
import './Tile.scss';



function Tile(props) {

  function tileDisplay(tileData) {
    if (tileData.containsMine) {
      return '💣';
    } else if (tileData.surroundingMineCount) {
      return tileData.surroundingMineCount;
    }
  }

  function handleOnClick() {
    let postGameData = {
      gameId: props.gameId,
      position: props.position
    };
    fetch('/make-move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postGameData)
    })
    .then(response => response.json())
    .then(data => {
      props.changeBoardData(data);
    })
    .catch((error) => {
      console.error('Error: ', error);
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