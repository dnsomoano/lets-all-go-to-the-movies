import React, { Component } from "react";
// import { BrowserRouter as Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styling/MovieDetail.css";
import Home from "../Images/blue_home.png";
import Axios from "axios";

class MovieDetail extends Component {
  key = "?api_key=e99344bac0d2a5336621a8492eeb2e74";
  baseURL = "https://api.themoviedb.org/3/movie/";
  langUS = "&language=en-US";
  // tmp =
  //   "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1";
  imageURL = "https://image.tmdb.org/t/p/";
  imageSize = "w500/";
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
    // Fetches movie details based on id
    Axios.get(
      this.baseURL + `${this.state.id}` + this.key + this.langUS + "&page=1"
    )
      .then(json => {
        console.log(json.data);
        const movieObj = {
          title: json.data.title,
          backdrop_path: json.data.backdrop_path,
          id: json.data.id,
          poster: json.data.poster_path,
          overview: json.data.overview
        };
        // console.log("The movie object is", movieObj);
        this.setState({
          movie: movieObj
        });
      })
      .catch(error => {
        console.log(error);
      });
    // console.log("The title is at:", this.state.movie.title);
    // console.log("The poster is at:", this.state.poster);
    // Fetches for CAST
    Axios.get(this.baseURL + `${this.state.id}` + this.credits + this.key)
      .then(json => {
        console.log(json.data.cast);
        this.setState({ cast: json.data.cast });
      })
      .catch(error => {
        console.log(error);
      });
  }

  image = "";

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
          <h5> > Movie Details </h5>
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
            // Determine if cast profile is null; display poster if it is
            if (castMember.profile_path === null) {
              this.image =
                this.imageURL + this.imageSize + this.state.movie.poster;
              // console.log(this.image)
              // {()=>this.setCastProfileState}
            } else {
              this.image =
                this.imageURL + this.imageSize + castMember.profile_path;
              //  console.log("line 128 this image",this.image)
              //  this.setCastProfileState
            }
            return (
              <section className="Movie-details cast-preview" key={i}>
                <h1>
                  <span className="bold-text">{castMember.name}</span> as{" "}
                  {castMember.character}
                </h1>
                <Link to={`/Cast/${castMember.id}`}>
                  {/* if (!{CastMember.profile_path} === "null") {
                  return */}
                  <span>
                    {/* {console.log("line 144",this.state.castProfile)} */}
                    <img
                      // src={`${this.imageURL}${this.imageSize}${
                      //   castMember.profile_path
                      // }`}
                      src={this.image}
                      alt={castMember.name}
                    />
                  </span>
                  {/* // } else {
                  //   return <span><img
                  //   src={`${this.imageURL}${this.imageSize}${this.state.movie.backdrop_path}`}
                  //   alt={castMember.name}
                  // /></span>
                // } */}
                </Link>
              </section>
            );
          })}
        </section>
      </div>
    );
  }
}

export default MovieDetail;
