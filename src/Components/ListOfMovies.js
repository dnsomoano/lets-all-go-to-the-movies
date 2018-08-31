import React, { Component } from 'react';

import '../Styling/ListOfMovies.css'

class ListOfMovies extends Component {
    key = "e99344bac0d2a5336621a8492eeb2e74"
    baseURL = "https://api.themoviedb.org/3/movie/now_playing?api_key="
    langUS = "&language=en-US"
    tmp = "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1"
    imageURL = "https://image.tmdb.org/t/p/"
    imageSize = "w200"

    constructor(props) {
        super(props);
        this.state = {
          movies: [],
          moviePoster: {}
        };
      }

    componentDidMount() {
        this.getJSON()
        
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


    render() {
        return (
            <section className="movie_list_container">

                {this.state.movies.map((movie, i) => {
                    // this.getMoviePoster(movie.poster_path)
                    return (
                        <section id="movies_list_display" key={i}>
                            <h3>{movie.original_title}</h3>
                            <img id="movie"src={`${this.imageURL}${this.imageSize}${movie.poster_path}`} alt={movie.title}></img>
                        </section>

                    )//END return

                }//END {this.state.movies.map((movie, i) => 
                )//END ((movies,i))
                }
                 </section>  
        )}}


                export default ListOfMovies;
