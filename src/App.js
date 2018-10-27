import React, { Component } from "react";
import MovieDetail from "./Components/MovieDetail";
import RandomSelection from "./Components/RandomSelection";
import ActorDetail from "./Components/ActorDetail";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/********************************** Styles ****************************************************************/
import "./Styling/App.css";
import logo from "./Images/movie-reel.png";

/********************************** Components **********************************************************/
import ListOfMovies from "./Components/ListOfMovies";

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
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <RandomSelection />
            <section className="logo">
              <img id="movie_reel" src={logo} alt="logo" />
            </section>

            <section className="masthead">
              <h1 id="banner">Now showing at the Movies</h1>
            </section>
          </header>

          <section className="movie-list">
            <Switch>
              <Route path="/" exact component={ListOfMovies} />
              {/* Must stay as id to pass on props */}
              <Route path="/:title/:id" exact component={MovieDetail} />
              <Route path="/Cast/:person_id" exact component={ActorDetail} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
