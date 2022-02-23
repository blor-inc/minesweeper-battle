import React from "react";
import './Cell.scss';


function Cell(props) {
  // testing
  function sheesh() {
    fetch('/make-move', { 
      method: 'POST', 
      body: JSON.stringify({ username: 'example' }) 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className={`cell ${props.data.isCovered ? "covered" : "uncovered"}`} onClick={sheesh}>
      
    </div>
  )
}

export default Cell;