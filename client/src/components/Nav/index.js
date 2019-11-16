import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar" href="/">
        Home
      </a>
      <a className="navbar" href="/saved">
        Saved Books
      </a>
    </nav>
  );
}

export default Nav;
