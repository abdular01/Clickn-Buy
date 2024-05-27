import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  let { cartItems} = useContext(cartContext);

  return (
    <nav className="navbar navbar-expand-sm bg-primary">
      <h2 className="ms-5 text-white">Clickn Buy</h2>

      <button
        className="navbar-toggler ms-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon bg-white"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav me-5">
          <li className="ms-5 nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>

          <li className="ms-5  nav-item">
            <Link className="nav-link text-white" to="/orders">
              Orders
            </Link>
          </li>

          <li className="ms-5 nav-item">
            <Link className="nav-link text-white" to="/Cart">
              <span> {cartItems.length}</span> Cart <i class="bi bi-cart4"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
