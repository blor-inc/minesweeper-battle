import React from "react";
import './Tile.scss';



function Tile(props) {
  // testing
  function handleOnClick() {
    console.log(props.position)
    // fetch('/make-move', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify({ username: 'example' })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success: ', data);
    // })
    // .catch((error) => {
    //   console.error('Error: ', error);
    // });
  }

  return (
    <div className={`cell ${props.data.isCovered ? "covered" : "uncovered"}`} onClick={handleOnClick}>

    </div>
  )
}

export default Tile;