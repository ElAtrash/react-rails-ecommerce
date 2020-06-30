import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Product from "../components/product/Product";
import Category from "../components/category/Category";

const exclusionArray = ["/accounts/sign_in", "/accounts/sign_up"];

export default (
  <Router>
    <div className="App">
      {exclusionArray.indexOf(location.pathname) < 0 && <Navbar />}

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" exact component={Product} />
        <Route path="/category/:id" exact component={Category} />
      </Switch>
    </div>
  </Router>
);
