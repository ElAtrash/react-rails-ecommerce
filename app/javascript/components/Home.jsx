import React from "react";
import Products from "./product/Products";
import Categories from "./category/Categories";

export default () => (
  <section>
    <div className="row mt-3">
      <Categories />
      <div className="col">
        <Products />
      </div>
    </div>
  </section>
);
