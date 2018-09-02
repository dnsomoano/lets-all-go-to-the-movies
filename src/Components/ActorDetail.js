import React, { Component } from "react";

// url for actors
// https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US

class ActorDetail extends Component {
  key = "?api_key=e99344bac0d2a5336621a8492eeb2e74";
  baseURL = "https://api.themoviedb.org/3/person";
  langUS = "&language=en-US";
  tmp =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=e99344bac0d2a5336621a8492eeb2e74&language=en-US&page=1";
  constructor(props) {
    super(props);
    this.state = {
        person_id: this.props.match.params.id
    };
  }

  componentDidMount() {
    fetch(this.baseURL + 500 + this.key + this.langUS)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Fetched cast");
          return resp.json();
        } else {
          return console.log("404");
        }
      })
      .then(json => {
        console.log(json);
        console.log(json);
        // this.setState({
        //   cast:[]
        // });
        // // console.log("The cast object is", castObj);
        // console.log("The cast displays:", this.state.cast);
        // console.log("The character is at:", this.state.cast.character);
      });
  }

  render() {
    return <div />;
  }
}

export default ActorDetail;
