import React from "react";
import { Link } from "react-router-dom";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
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

  render() {
    const { product } = this.state;

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
              <div className="mb-auto">
                Quantity:
                <input
                  type="number"
                  className="form-control"
                  value={this.state.quantity}
                  defaultValue="1"
                  onChange={this.handleChange}
                />
              </div>
              <div className="btn-group cart ">
                <Link to="#" className="btn">
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    style={{ color: "#4D7C8A" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
