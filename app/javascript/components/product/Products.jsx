import React from "react";
import { Link } from "react-router-dom";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/products/";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Oops, something went wrong!");
      })
      .then((response) => this.setState({ products: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { products } = this.state;
    const allProducts = products.map((product, index) => (
      <div key={index} className="card-deck">
        <div className="col-sm-2">
          <div className="card m-2" style={{ width: "180px", height: "400px" }}>
            <div>
              <img
                src={product.image_url}
                className="card-img-top"
                alt={`${product.title} image`}
              />
            </div>
            <div className="card-body">
              <Link
                to={`/product/${product.id}`}
                className="text-body font-weight-bold"
              >
                {product.title}
              </Link>
              <div className="mt-2">
                <span>${product.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    return <div className="row m-3">{allProducts}</div>;
  }
}
export default Products;
