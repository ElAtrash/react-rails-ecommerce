import React from "react";
import { Link } from "react-router-dom";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Cart extends React.Component {
  render() {
    let cart =
      localStorage.getItem("cart") == null
        ? []
        : JSON.parse(localStorage.getItem("cart"));

    let totalPrice = cart
      .map((o) => +o.price)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    function removeItemFromCart(cart_item_id) {
      let new_cart = cart.filter((cart_item) => cart_item.id != cart_item_id);
      localStorage.setItem("cart", JSON.stringify(new_cart));
    }

    return (
      <div className="container mt-4">
        <div className="card shopping-cart">
          <div className="card-header bg-dark text-light">
            <i></i>
            <FontAwesomeIcon icon={faCartPlus} />
            <span> </span>
            Shopping cart
            <a href="/" className="btn btn-outline-info btn-sm float-right">
              Continue shopping
            </a>
          </div>
          <div className="card-body">
            {cart.map((cartItem) => {
              return (
                <div key={cartItem.id} id={cartItem.id}>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 text-center">
                      <img
                        src={cartItem.image_url}
                        alt="prewiew"
                        width="120"
                        height="80"
                      />
                    </div>
                    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                      <h4 className="product-name">
                        <strong>
                          <Link
                            to={`/product/${cartItem.id}`}
                            className="text-body font-weight-bold"
                          >
                            {cartItem.title}
                          </Link>
                        </strong>
                      </h4>
                    </div>
                    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                      <div
                        className="col-3 col-sm-3 col-md-6 text-md-right"
                        style={{ paddingTop: "5px" }}
                      >
                        <h6>
                          <strong>
                            $ {cartItem.price}
                            <span className="text-muted"> x</span>
                          </strong>
                        </h6>
                      </div>
                      <div className="col-4 col-sm-4 col-md-2">
                        <div className="quantity">
                          <input
                            // type="number"
                            className="form-control"
                            max="30"
                            min="1"
                            defaultValue={cartItem.quantity}
                            onChange={this.handleChange}
                            style={{ width: "80px" }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-xs"
                          onClick={() => {
                            removeItemFromCart(cartItem.id);
                          }}
                        >
                          <i>
                            <FontAwesomeIcon icon={faTrash} />
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="card-footer">
            <div className="float-right" style={{ margin: "10px" }}>
              <a href="" className="btn btn-success">
                Checkout
              </a>
              <div className="pull-right" style={{ margin: "5px" }}>
                Total price: <b>$ {totalPrice}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cart;
