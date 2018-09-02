import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

import Home from "../Images/blue_home.png";

// https://api.themoviedb.org/3/movie/<<<Movie Id>>>/credits?api_key=<<your key here>>>
// const IMG_BASE="https://image.tmdb.org/t/p/w500"
// Poster path ex https://image.tmdb.org/t/p/w500 + poster_path
// https://api.themoviedb.org/3/movie/<<<Movie Id>>>/credits?api_key=<<your key here>>>
// const CREDITS_URL ="/credits?api_key="
// const API_KEY = "e99344bac0d2a5336621a8492eeb2e74";

// const BASE_URL = "https://api.themoviedb.org/3/movie";

class MovieDetail extends Component {
  key = "?api_key=e99344bac0d2a5336621a8492eeb2e74";
  baseURL = "https://api.themoviedb.org/3/movie/";
  langUS = "&language=en-US";
  tmp =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1";
  imageURL = "https://image.tmdb.org/t/p/";
  imageSize = "w500";
  // movieID = this.props.match.params.movieID;

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      movie: [{}]
    };
  }

  componentDidMount() {
    console.log("Component mounted!");
    console.log("The movie id is:", this.state.id);
    console.log("The movie id is:", this.props.match.params.id);
    console.log("The image path is at:", this.props.poster_path);
    // fetch json.results.results.id?
    fetch(
      this.baseURL + `${this.state.id}` + this.key + this.langUS + "&page=1"
    )
      .then(resp => {
        if (resp.status === 200) {
          console.log("Successful fetch!");
          return resp.json();
        } else {
          return <section>console.log("404")</section>;
        }
      })
      .then(json => {
        console.log(json);
        // console.log(json.results);
        const movieObj = {
          title: json.title,
          id: json.id,
          poster: json.poster_path,
          overview: json.overview
        };
        console.log(movieObj);
        this.setState({
          movie: movieObj
        });
      });
    console.log("The title is at:", this.state.movie.title);
    console.log("The poster is at:", this.state.poster);
    //TODO after
    // fetch using a variable to replace movie id in url
    // promise a response
    // promise a json.results
    // set state w key value "cast"
  }

  render() {
    // props from ListOfMovies component
    // gets mapped json.results movie from line 71
    // const _listOfMovies = this.props.match.params.ListOfMovies
    // const _getMovie = this.props.movie;
    // const _movieDetail = this.props.match.params._moviedetail;
    // const _index = this.props.match.params.movieID;
    //
    // const _json.results = _listOfMovies[_movieDetail].id[_index];

    return (
      <div>
        <span className="breadcrumb">
          <Link to="/">
            <img id="home_icon" src={Home} alt="Home Icon" />
          </Link>
        </span>

        <h1>{this.state.movie.title}</h1>
        <img
          id="movie"
          src={`${this.imageURL}${this.imageSize}${
            this.state.movie.poster
          }`}
          alt={this.state.movie.title}
        />
        <section>{this.state.movie.overview}</section>
        {/* Section for cast */}
        <section>
          {/* {this.props.movies.{movieId}.map((movie, i)=>{
                    return(
                        <section id="movies" key={i}>
                        <header>The Cast & Crew</header>
                        // after componentdidmount, map over this.state.cast
                        // return actor this.state.cast.name as this.state.cast.character
                        // return image as this.state.cast.profile_path
              </section>
             )
        })} */}
        </section>
      </div>
    );
  }
}

export default MovieDetail;
