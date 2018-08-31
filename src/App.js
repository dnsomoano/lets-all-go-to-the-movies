import React, { Component } from "react";
// import {BrowserRouter as Router, Link, Switch} from "react-router-dom";
import "./Styling/App.css";
import logo from './Images/movie-reel.png'
import ListOfMovies from './Components/ListOfMovies'

// const BASE_URL = "https://api.themoviedb.org/3/movie";
// const NOW_PLAYING = "/now_playing?api_key=";
// const API_KEY = "e99344bac0d2a5336621a8492eeb2e74";
// const FORMAT = "&language=en-US&page=1";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviePoster: {}
    };
  }
  key = "e99344bac0d2a5336621a8492eeb2e74"
  baseURL = "https://api.themoviedb.org/3/movie/now_playing?api_key="
  langUS = "&language=en-US"
  tmp = "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1"
  imageURL = "https://image.tmdb.org/t/p/"
  imageSize = "w200"

  componentDidMount() {
    this.getJSON()
    this.getMoviePoster("/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg")
  }

  getJSON = () => {
    fetch(this.baseURL + this.key + this.langUS + "&page=1"

    )
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          return <section>404</section>;
        }
      })
      .then(json => {
        // console.log(json);
        this.setState({
          movies: json.results
        });
      });
  }

  getMoviePoster = (imagePath) => {
    // console.log(this.imageURL + this.imageSize + imagePath)

    fetch(this.imageURL + this.imageSize + imagePath

    )
      .then(resp => {
        if (resp.status === 200) {
          return resp.blob();
        } else {
          return <section>404</section>;
        }
      })
      .then(poster => {

        this.setState({
          moviePoster: poster
        });
      });
  }//END getMoviePoster = (imagePath)



  render() {
    return (
      <div className="App">
        <header className="App-header">

          <section className="logo">
            <img id="movie_reel" src={logo} alt="logo"></img>
          </section>

          <section className="masthead">
            <h1 id="banner">Now showing at the Movies</h1>
          </section>

        </header>  

        <section className="movie-list">

          <ListOfMovies movies={this.state.movies} />

        </section>
      </div>
    );
  }
}

export default App;
