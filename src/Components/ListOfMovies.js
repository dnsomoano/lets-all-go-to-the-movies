import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**************************************************** Styles  ***************************************************/
import '../Styling/ListOfMovies.css'

/**************************************************** NAV  ***************************************************/
import Home from '../Images/blue_home.png'


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

        };
    }//END constructor

    componentDidMount() {
        this.getJSON()

    }


    /**************************************************** Functions  ***************************************************/
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

    /**************************************************** Functions  ***************************************************/

    render() {
        const _listOfMovies = this.props.match.params.ListOfMovies
        return (
            
            <section className="movie_list_container">

                <span className="breadcrumb">
                    <img id="home_icon"src={Home} alt="Home Icon"></img>

                </span>

                {this.state.movies.map((movie, i) => {
                    // this.getMoviePoster(movie.poster_path)
                    return (
                        <section id="movies_list_display" key={i}>
                            <h3>{movie.original_title}</h3>
                            <Link to={`/${_listOfMovies}/${i}`}>
                            <img id="movie" src={`${this.imageURL}${this.imageSize}${movie.poster_path}`} alt={movie.title}></img>
                            </Link>
                        </section>

                    )//END return

                }//END {this.state.movies.map((movie, i) => 
                )//END ((movies,i))
                }
            </section>
        )
    }
}


export default ListOfMovies;
