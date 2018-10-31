import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styling/ActorDetail.css";
import Home from "../Images/blue_home.png";
import Axios from "axios";

// url for actors
// https://api.themoviedb.org/3/person/{personId}?api_key=<<api_key>>&language=en-US

class ActorDetail extends Component {
  key = "?api_key=e99344bac0d2a5336621a8492eeb2e74";
  baseURL = "https://api.themoviedb.org/3/person/";
  langUS = "&language=en-US";
  // tmp =
  //   "https://api.themoviedb.org/3/person/8944?api_key=api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US";
  imageURL = "https://image.tmdb.org/t/p/";
  imageSize = "w500/";
  constructor(props) {
    super(props);
    this.state = {
      movieCredits: [],
      tvCredits: [],
      personDetails: [],
      personId: this.props.match.params.personid
    };
  }

  componentDidMount() {
    // Fetches person details and cast credits for tv and movies by id
    Axios.all([
      Axios.get(
        this.baseURL + `${this.state.personId}` + this.key + this.langUS
      ),
      // Axios.get(
      //   this.baseURL +
      //     `${this.state.personId}` +
      //     "/movie_credits" +
      //     this.key +
      //     this.langUS
      // ),
      // Axios.get(
      //   this.baseURL +
      //     `${this.state.personId}` +
      //     "/tv_credits" +
      //     this.key +
      //     this.langUS
      // ),
      Axios.get(
        this.baseURL +
          `${this.state.personId}` +
          "/combined_credits" +
          this.key +
          this.langUS
      )
    ])
      .then(
        Axios.spread((castData, combinedCreditsData) => {
          console.log(castData.data);
          // console.log(movieCreditsData.data);
          // console.log(tvCreditsData.data);
          console.log(combinedCreditsData.data.cast);
          let tvBucket = [];
          let movieBucket = [];
          combinedCreditsData.data.cast.forEach(character => {
            if (character.media_type === "tv") {
              tvBucket.push(character);
            } else {
              movieBucket.push(character);
            }
          });
          this.setState({
            movieCredits: movieBucket,
            tvCredits: tvBucket,
            personDetails: castData.data
          });
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {/* FIX to link back to movie */}
        <span className="breadcrumb">
          <Link to="/">
            <img id="home_icon" src={Home} alt="Home Icon" />
          </Link>
          <h5>
            <Link
              to={`/movie/${this.state.movieCredits.title}/${
                this.state.movieCredits.id
              }`}
            >
              Movie Details
            </Link>
          </h5>
        </span>
        <section className="movie-details">
          <header>{this.state.personDetails.name}</header>
          <img
            id="profile-poster"
            src={`${this.imageURL}${this.imageSize}${
              this.state.personDetails.profile_path
            }`}
            alt={`${this.state.personDetails.name}`}
          />
          <section className="movie-overview">
            {this.state.personDetails.biography}
          </section>
        </section>
        <h1 className="section-header">Movie Credits</h1>
        <section className="cast-body">
          {this.state.movieCredits.map((movie, i) => {
            return (
              <section className="Movie-details cast-preview" key={i}>
                <header>
                  {movie.title || movie.original_title} as {movie.character}
                </header>
                <Link to={`/movie/${movie.title}/${movie.id}`}>
                  <img
                    src={`${this.imageURL}${
                      this.imageSize
                    }${movie.poster_path || movie.backdrop_path}`}
                    alt={`${movie.character}`}
                  />
                </Link>
                <header>Release Date: {movie.release_date}</header>
              </section>
            );
          })}
        </section>
        <h1 className="section-header">TV Credits</h1>
        <section className="cast-body">
          {this.state.tvCredits.map((show, i) => {
            return (
              <section className="Movie-details cast-preview" key={i}>
                <header>
                  {show.name} as {show.character}
                </header>
                <img
                  src={`${this.imageURL}${this.imageSize}${show.poster_path ||
                    show.backdrop_path}`}
                  alt={`${show.character}`}
                />
                <header>First Air Date: {show.first_air_date}</header>
              </section>
            );
          })}
        </section>
      </div>
    );
  }
}

export default ActorDetail;
