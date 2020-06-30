import React from "react";
import { Link } from "react-router-dom";
import {
  faSearch,
  faBookOpen,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <nav
    className="navbar navbar-expand-lg navbar-dark"
    style={{ backgroundColor: "#4D7C8A" }}
  >
    <Link to="/" className="navbar-brand">
      <FontAwesomeIcon icon={faBookOpen} style={{ color: "white" }} /> Book Shop
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div
      className="collapse navbar-collapse justify-content-between"
      id="navbarSupportedContent"
    >
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <div className="input-group-btn">
          <button className="btn btn-default" type="submit">
            <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
          </button>
        </div>
      </form>
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ color: "white" }}
              />
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/accounts/sign_in">
              Sign In <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/accounts/sign_up">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
