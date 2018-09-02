import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

class RandomSelection extends Component {
  key = "e99344bac0d2a5336621a8492eeb2e74";
  baseURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
  langUS = "&language=en-US";
  tmp =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1";
  imageURL = "https://image.tmdb.org/t/p/";
  imageSize = "w200";
  constructor(props) {
    super(props);
    this.state = {
      selection: []
    };
  }

  componentDidMount() {
    fetch(this.baseURL + this.key + this.langUS + "&page=1")
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          return <section>404</section>;
        }
      })
      .then(json => {
        console.log(json.results);
        console.log(json.results.length);
        let randChoice = Math.floor(Math.random() * json.results.length);
        this.setState({
          selection: Object.values(json.results[randChoice])
        });
        console.log(this.state.selection[4]);
        console.log(this.state.selection);
      });
  }
  render() {
    return (
      <div className="selection-section">
        <Link to={`/${this.state.selection[7]}/${this.state.selection[1]}`}>
          <img id="featured-img"
            src={`${this.imageURL}${this.imageSize}${this.state.selection[6]}`}
            height="25%"
            width="25%"
            alt={this.state.selection[4]}
          />
        </Link>
        <header>{this.state.selection[4]}</header>
      </div>
    );
  }
}

export default RandomSelection;
