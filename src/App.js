import React, { Component } from "react";
import MovieDetail from './Components/MovieDetail'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/********************************** Styles ****************************************************************/
import "./Styling/App.css";
import logo from "./Images/movie-reel.png";


/********************************** Components **********************************************************/
import ListOfMovies from './Components/ListOfMovies'

// const BASE_URL = "https://api.themoviedb.org/3/movie";
// const NOW_PLAYING = "/now_playing?api_key=";
// const API_KEY = "e99344bac0d2a5336621a8492eeb2e74";
// const FORMAT = "&language=en-US&page=1";

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     movies: this.props.match.params.m,

  //   };
  // }//END constructor


  // componentDidMount() {

  // }

  render() {
    return (<Router>
      <div className="App">
        <header className="App-header">

          <section className="logo">
            <img id="movie_reel" src={logo} alt="logo" />
          </section>

          <section className="masthead">
            <h1 id="banner">Now showing at the Movies</h1>
          </section>

          <button className="temp-button">
            <a href="/Components/MovieDetail">Button to view my page, until we Link</a>
          </button>
        </header>

        <section className="movie-list">
          <Switch>
            <Route path="/" exact component={ListOfMovies}/>
            <Route path="/Movie/:index" exact component={MovieDetail} />

          </Switch>

        </section>
      </div>
    </Router>
    );
  }
}

export default App;
