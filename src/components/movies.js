import React, { Component } from "react";
import Movie from "./movie.js";
import AddMovie from "./addMovie.js";
import axios from "axios";
class Movies extends Component {
  state = { movies: [{}], addFlag: false };

  async componentDidMount() {
    let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/movies/";
    try {
      const moviesResponse = await fetch(mockapiurl);
      let movies = await moviesResponse.json();
      this.setState({ movies });
    } catch (error) {
      console.log(error);
    }
  }

  handleAdding = async (
    cast,
    title,
    image,
    language,
    genre,
    director,
    description,
    duration,
    releaseDate,
    endDate
  ) => {
    const newmovie = {
      title: title,
      cast: cast,
      image: image,
      language: language,
      genre: genre,
      director: director,
      description: description,
      duration: duration,
      releaseDate: releaseDate,
      endDate: endDate,
    };
    let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/movies/";
    try {
      const movieResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(newmovie),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let movie = await movieResponse.json();
      if (movie.name == "MongoError") {
        alert("some format error while storing");
      }
      this.setState({ addFlag: false });
      try {
        const moviesResponse = await fetch(mockapiurl);
        let movies = await moviesResponse.json();
        this.setState({ movies });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async (deletemovie) => {
    var result = confirm("Want to delete?");
    if (result) {
      let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/movies/";
      let mockapideleteurl = mockapiurl + deletemovie._id;
      try {
        const movieResponse = await fetch(mockapideleteurl, {
          method: "DELETE",
          body: JSON.stringify(deletemovie),
          headers: { "Content-type": "application/json;characterset=UTF-8" },
        });
        let movie = await movieResponse.json();
        alert(movie.title + " successfully deleted");
        const moviesResponse = await fetch(mockapiurl);
        let movies = await moviesResponse.json();
        this.setState({ movies });

        //Deleting the showtimes also for that particular movie
        this.deleteShowTime(deletemovie._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteShowTime = async (id) => {
    let showtimemockapiurl =
      "https://immense-sands-26614.herokuapp.com/api/showtimes/";
    try {
      const showTimeResponse = await fetch(showtimemockapiurl);
      let showtimes = await showTimeResponse.json();
      showtimes.map(async (showtime) => {
        if (showtime.movieId == id) {
          let mockapideleteurl = showtimemockapiurl + showtime._id;
          try {
            const showtimeResponse = await fetch(mockapideleteurl, {
              method: "DELETE",
              body: JSON.stringify(showtime),
              headers: {
                "Content-type": "application/json;characterset=UTF-8",
              },
            });
            await showtimeResponse.json();
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleSave = async (
    id,
    cast,
    title,
    image,
    language,
    genre,
    director,
    description,
    duration,
    releaseDate,
    endDate
  ) => {
    const newmovie = {
      title: title,
      cast: cast,
      image: image,
      language: language,
      genre: genre,
      director: director,
      description: description,
      duration: duration,
      releaseDate: releaseDate,
      endDate: endDate,
    };
    let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/movies/";
    let mockapiputrurl = mockapiurl + id;
    try {
      const movieResponse = await fetch(mockapiputrurl, {
        method: "PUT",
        body: JSON.stringify(newmovie),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let movie = await movieResponse.json();
      if (movie.name == "MongoError") {
        alert("some format error while storing");
      }
      const moviesResponse = await fetch(mockapiurl);
      let movies = await moviesResponse.json();
      this.setState({ movies });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="row">
        <button
          onClick={() =>
            this.setState({
              addFlag: this.state.addFlag == true ? false : true,
            })
          }
        >
          <img
            src="https://www.sanadig.com/img/add.png"
            alt="addMovie"
            length="100"
            width="100"
          ></img>
        </button>
        {this.state.addFlag == true ? (
          <AddMovie onAdding={this.handleAdding} />
        ) : (
          <></>
        )}
        {this.state.movies.length > 0 ? (
          this.state.movies.map((movie) => (
            <div key={movie._id} className="col-sm-4">
              <Movie
                movie={movie}
                onDeleting={this.handleDelete}
                onSave={this.handleSave}
              />
            </div>
          ))
        ) : (
          <div>Sorry there is no movies at present</div>
        )}
      </div>
    );
  }
}

export default Movies;
