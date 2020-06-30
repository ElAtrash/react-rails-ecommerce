import React from "react";
import { Link } from "react-router-dom";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/categories/";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Oops, something went wrong!");
      })
      .then((response) => this.setState({ categories: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { categories } = this.state;
    const allCategories = categories.map((category, index) => (
      <Link
        to={`/category/${category.id}`}
        key={index}
        className="list-group-item text-body"
      >
        {category.name}
      </Link>
    ));

    return (
      <div className="col-sm-2 m-4">
        <div className="card-header font-weight-bold">Categories</div>
        <div className="card">
          <ul className="list-group list-group-flush">{allCategories}</ul>
        </div>
      </div>
    );
  }
}
export default Categories;
