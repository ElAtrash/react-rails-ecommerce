import React from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: "",
        description: "",
        image_url: "",
        price: "",
        quantity: 1,
      },
    };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `/api/v1/products/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Oops, something went wrong!");
      })
      .then((response) => this.setState({ product: response }))
      .catch(() => this.props.history.push("/products"));
  }

  addHtmlEntities(str) {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  handleChange = (e) => {
    this.setState({ quantity: e.target.value });
  };

  addToCart = (id, image_url, title, price) => () => {
    let cart =
      localStorage.getItem("cart") == null
        ? []
        : JSON.parse(localStorage.getItem("cart"));
    const item = cart.find((i) => i.id == id);

    let user_defined_quantity_node = document.getElementById("quantity");

    if (user_defined_quantity_node != null) {
      let user_defined_quantity = parseInt(user_defined_quantity_node.value);
      if (item == undefined) {
        cart.push({
          id: id,
          image_url: image_url,
          title: title,
          quantity: user_defined_quantity,
          price: user_defined_quantity * price,
        });
      } else {
        (item.quantity += user_defined_quantity),
          (item.price += user_defined_quantity * price);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  render() {
    const { product } = this.state;
    console.log(this.state.quantity);

    return (
      <div className="container">
        <div className="col-md-10 m-4">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <img
              className="card-img-left flex-auto d-none d-md-block"
              src={product.image_url}
              alt={`${product.title} image`}
            />
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">
                <div className="text-dark">{product.title}</div>
              </h3>
              <strong
                className="d-inline-block mb-2"
                style={{ color: "#4D7C8A" }}
              >
                $ {product.price}
              </strong>
              <p className="card-text mb-auto">{product.description}</p>
              <form onSubmit={this.handleSubmit}>
                <div className="mb-auto">
                  Quantity:
                  <input
                    type="number"
                    className="form-control col-5"
                    id="quantity"
                    max="30"
                    min="1"
                    value={this.state.quantity}
                    defaultValue="1"
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="btn-group cart ">
                  <button
                    type="button"
                    onClick={this.addToCart(
                      product.id,
                      product.image_url,
                      product.title,
                      product.price
                    )}
                    className="btn btn-dark"
                    style={{ backgroundColor: "#4D7C8A" }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span> </span>
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
