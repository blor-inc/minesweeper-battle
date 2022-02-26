import React from "react";
import './Cell.css';



function Cell(props) {
  // testing
  function handleOnClick() {
    fetch('/make-move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ username: 'example' })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success: ', data);
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
  }

  return (
    <div className={`cell ${props.data.isCovered ? "covered" : "uncovered"}`} onClick={handleOnClick}>

    </div>
  )
}

export default Cell;