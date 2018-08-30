import React, { Component } from "react";
// import {BrowserRouter as Router, Link, Switch} from "react-router-dom";
import "./Styling/App.css";

// const BASE_URL = "https://api.themoviedb.org/3/movie";
// const NOW_PLAYING = "/now_playing?api_key=";
// const API_KEY = "e99344bac0d2a5336621a8492eeb2e74";
// const FORMAT = "&language=en-US&page=1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1"
    )
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          return <section>404</section>;
        }
      })
      .then(json => {
        console.log(json);
        this.setState({
          movies: json
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Now showing</header>
        <section className="movie-list" />
      </div>
    );
  }
}

export default App;
