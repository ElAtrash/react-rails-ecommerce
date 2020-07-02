import React from "react";
import { Link } from "react-router-dom";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryProducts: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `/api/v1/categories/${id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Oops, something went wrong!");
      })
      .then((response) => this.setState({ categoryProducts: response }))
      .catch(() => this.props.history.push("/categories"));
  }

  render() {
    const { categoryProducts } = this.state;
    const allCategoryProducts = categoryProducts.map(
      (categoryProduct, index) => (
        <div key={index} className="card-deck">
          <div className="col-sm-2">
            <div
              className="card m-2"
              style={{ width: "180px", height: "400px" }}
            >
              <div>
                <img
                  src={categoryProduct.image_url}
                  className="card-img-top"
                  alt={`${categoryProduct.title} image`}
                />
              </div>
              <div className="card-body">
                <Link
                  to={`/product/${categoryProduct.id}`}
                  className="text-body font-weight-bold"
                >
                  {categoryProduct.title}
                </Link>
                <div className="mt-2">
                  <span>${categoryProduct.price}</span>

                  <Link to="#" className="btn float-right">
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
      )
    );

    return (
      <div className="container">
        <div className="row m-3">{allCategoryProducts}</div>
      </div>
    );
  }
}

export default Category;
