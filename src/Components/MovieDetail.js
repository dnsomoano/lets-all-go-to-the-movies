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
  constructor(props) {
    super(props);
    this.state = {
      id: []
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
        const movieObj = Object.values(movieData);
        console.log(movieObj);
        // must loop over movieArr[i].id === DOES NOT WORK
        const movieArr = Object.values(movieObj[0]);
        console.log(movieArr);
        const movieIds = Object.values(movieArr[0]);
        console.log(movieIds);
        // movieObj[0].id.map(movieId => {
        //   return this.state.id.push(movieId);
        // });
        // console.log(this.state.id);
        // console.log(typeof this.state.id);
        // this.setState({
        //   id: json.results[0].id
        // });
      });
    //TODO after
    // fetch using a variable to replace movie id in url
    // promise a response
    // promise a json
    // set state w key value "cast"
  }

  render() {
    return (
      <div>
        <span className="breadcrumb">
          <Link to="/"><img id="home_icon" src={Home} alt="Home Icon"></img></Link>

        </span>


        {/* <h1>{this.props.movie.original_title}</h1> */}
        {/* <img src={this.props.movie.poster_path} alt="MoviePoster"/> */}
        {/* <section>{this.props.movie.overview}</section> */}
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
