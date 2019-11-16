import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <span className="save-btn btn btn-secondary" {...props} role="button" tabIndex="0">
      Save Me
    </span>
  );
}

export default DeleteBtn;
