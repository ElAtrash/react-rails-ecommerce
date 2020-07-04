import React from "react";
import { Link } from "react-router-dom";
import {
  faSearch,
  faBookOpen,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAccount: null,
    };
  }
  componentDidMount() {
    const url = "/accounts/check_for_account";
    (async () => {
      let response = await fetch(url);
      if (response.ok) {
        // console.log(response);
        let accountInfo = await response.json();
        if (accountInfo.status == "true") {
          // console.log(accountInfo.status);
          this.setState({
            currentAccount: accountInfo.email,
          });
          // console.log(this.state.currentAccount);
        }
      } else {
        this.setState({
          currentAccount: null,
        });
      }
    })();
  }
  render() {
    let cart =
      localStorage.getItem("cart") == null
        ? []
        : JSON.parse(localStorage.getItem("cart"));
    let quantityLabel = cart.length;
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#4D7C8A" }}
      >
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faBookOpen} style={{ color: "white" }} /> Book
          Shop
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
                <a className="nav-link" href="/cart">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ color: "white" }}
                  />
                  {quantityLabel}
                </a>
              </li>
              {this.state.currentAccount ? (
                <React.Fragment>
                  <li className="nav-item active">
                    <a className="nav-item nav-link disabled">
                      Hello, {this.state.currentAccount}
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a
                      className="nav-link"
                      href="/accounts/sign_out"
                      method="POST"
                    >
                      Sign Out <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item active">
                    <a className="nav-link" href="/accounts/sign_in">
                      Log In <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="/accounts/sign_up">
                      Sign Up
                    </a>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
