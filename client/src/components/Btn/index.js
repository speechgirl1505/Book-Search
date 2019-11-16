import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Btn(props) {
  return (
    <div>
    <span className="save-btn btn btn-secondary" {...props} role="button" tabIndex="0">
      Save Me
    </span>
   </div>
  );
}

export default Btn;
