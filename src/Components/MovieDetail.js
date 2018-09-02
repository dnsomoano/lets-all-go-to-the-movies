import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../Styling/MovieDetail.css";
import Home from "../Images/blue_home.png";


class MovieDetail extends Component {
  key = "?api_key=e99344bac0d2a5336621a8492eeb2e74";
  baseURL = "https://api.themoviedb.org/3/movie/";
  langUS = "&language=en-US";
  // tmp =
  //   "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1";
  imageURL = "https://image.tmdb.org/t/p/";
  imageSize = "w500";
  credits = "/credits";

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      movie: [{}],
      cast: [{}]
    };
  }

  componentDidMount() {
    console.log("Component mounted!");
    console.log("The movie id is:", this.state.id);
    console.log("The movie id is:", this.props.match.params.id);
    console.log("The image path is at:", this.props.poster_path);
    // Fetches movie details based on id
    fetch(
      this.baseURL + `${this.state.id}` + this.key + this.langUS + "&page=1"
    )
      .then(resp => {
        if (resp.status === 200) {
          console.log("Successful fetch!");
          return resp.json();
        } else {
          return console.log("404");
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
        console.log("The movie object is", movieObj);
        this.setState({
          movie: movieObj
        });
      });
    // console.log("The title is at:", this.state.movie.title);
    // console.log("The poster is at:", this.state.poster);
    // Fetches for CAST
    fetch(this.baseURL + `${this.state.id}` + this.credits + this.key)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Fetched cast");
          return resp.json();
        } else {
          return console.log("404");
        }
      })
      .then(json => {
        console.log(json.cast);
        console.log(json.cast[0]);
        this.setState({
          cast: json.cast
        });
        // console.log("The cast object is", castObj);
        console.log("The cast displays:", this.state.cast);
        console.log("The character is at:", this.state.cast.character);
      });
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
        {/* FIX to link back home */}
        <span className="breadcrumb">
          <Link to="/">
            <img id="home_icon" src={Home} alt="Home Icon" />
          </Link>
        </span>
        <section className="movie-details">
          <h2>{this.props.match.params.title}</h2>
          <img
            id="large_poster"
            src={`${this.imageURL}${this.imageSize}${this.state.movie.poster}`}
            alt={this.props.match.params.title}
          />
          <section className="movie-overview">
            <p>{this.state.movie.overview}</p>
          </section>
        </section>
        {/* Section for cast */}
        <h1 className="section-header">The Cast & Crew</h1>
        <section className="cast-body">
          {this.state.cast.map((castMember, i) => {
            return (
              <section className="Movie-details cast-preview" key={i}>
                <h1>
                  {castMember.name} as {castMember.character}
                </h1>
                <img
                  src={`${this.imageURL}${this.imageSize}${
                    castMember.profile_path
                  }`}
                  alt={castMember.name}
                />
              </section>
            );
          })}
        </section>
      </div>
    );
  }
}

export default MovieDetail;
