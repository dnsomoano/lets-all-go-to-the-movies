import React, { Component } from "react";
import {BrowserRouter as Link} from "react-router-dom";

import Home from '../Images/blue_home.png'

// https://api.themoviedb.org/3/movie/<<<Movie Id>>>/credits?api_key=<<your key here>>>
// const IMG_BASE="https://image.tmdb.org/t/p/w500"
// Poster path ex https://image.tmdb.org/t/p/w500 + poster_path
// https://api.themoviedb.org/3/movie/<<<Movie Id>>>/credits?api_key=<<your key here>>>
// const CREDITS_URL ="/credits?api_key="
// const API_KEY = "e99344bac0d2a5336621a8492eeb2e74";

// const BASE_URL = "https://api.themoviedb.org/3/movie";

class MovieDetail extends Component {
  // movieID = this.props.match.params.movieID;

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.movieID,
      movie: {}
    };
  }

  componentDidMount() {
    // fetch json.results.id?
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
      .then(movieData => {
        console.log(movieData);
        const movieObj = {
          title: movieData.title,
          id: movieData.id,
          poster: this.props.poster_path,
          overview: movieData.overview
        }
        console.log(this.state.id);
        console.log(typeof this.state.id);
        this.setState({
          movie: movieObj
        });
      });
    //TODO after
    // fetch using a variable to replace movie id in url
    // promise a response
    // promise a json
    // set state w key value "cast"
  }

  render() {
    // props from ListOfMovies component
    // gets mapped json movie from line 71
    // const _listOfMovies = this.props.match.params.ListOfMovies
    const _getMovie = this.props.movie;
    // const _movieDetail = this.props.match.params._moviedetail;
    // const _index = this.props.match.params.movieID;
    // 
    // const _movieData = _listOfMovies[_movieDetail].id[_index];

    return (
      <div>
        <span className="breadcrumb">
          <Link to="/"><img id="home_icon" src={Home} alt="Home Icon"></img></Link>

        </span>


        <h1>{this.state.movie.original_title}</h1>
        <img id="movie" src={`${this.props.imageURL}${this.props.imageSize}${this.state.movie.poster_path}`} alt={_getMovie.title}></img>
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
