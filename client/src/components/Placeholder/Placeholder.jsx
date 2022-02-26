import React from "react";
import './Placeholder.scss';
import { Link } from "react-router-dom";

function Placeholder() {
  return(
    <div className="Placeholder">
      <p>
        This page/feature has not been implemented yet
      </p>
      <Link to="/">
        <button>
          Take me home
        </button> 
      </Link>

    </div>
  );
};

export default Placeholder;