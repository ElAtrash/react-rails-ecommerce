import React from "react";
import { Link } from "react-router-dom";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/products";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Oops, something went wrong!");
      })
      .then((response) => this.setState({ searchResults: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { searchResults } = this.state;
    const allSearchResults = searchResults.map((searchResult, index) => (
      <div key={index} className="card-deck">
        <div className="col-sm-2">
          <div className="card m-2" style={{ width: "180px", height: "400px" }}>
            <div>
              <img
                src={searchResult.image_url}
                className="card-img-top"
                alt={`${searchResult.title} image`}
              />
            </div>
            <div className="card-body">
              <Link
                to={`/searchResult/${searchResult.id}`}
                className="text-body font-weight-bold"
              >
                {searchResult.title}
              </Link>
              <div className="mt-2">
                <span>${searchResult.price}</span>

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
    ));

    return <div className="row m-3">{allSearchResults}</div>;
  }
}
export default Search;
