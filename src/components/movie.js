import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import moment from "moment";

class Movie extends Component {
  state = {
    editFlag: false,
    cast: "",
    title: "",
    image: "",
    language: "",
    genre: "",
    director: "",
    description: "",
    duration: "",
    releaseDate: "",
    endDate: "",
  };

  onTrigger = (event) => {
    this.setState({ editFlag: false });
    this.props.onSave(
      this.props.movie._id,
      this.state.cast,
      this.state.title,
      this.state.image,
      this.state.language,
      this.state.genre,
      this.state.director,
      this.state.description,
      this.state.duration,
      this.state.releaseDate,
      this.state.endDate
    );
    event.preventDefault();
  };

  componentDidMount = async () => {
    this.setState({
      cast: this.props.movie.cast,
      title: this.props.movie.title,
      image: this.props.movie.image,
      language: this.props.movie.language,
      genre: this.props.movie.genre,
      director: this.props.movie.director,
      description: this.props.movie.description,
      duration: this.props.movie.duration,
      releaseDate: this.props.movie.releaseDate,
      endDate: this.props.movie.endDate,
    });
  };

  render() {
    const { movie, onDeleting } = this.props;
    const formattedReleaseDate = moment(movie.releaseDate).format("yyyy-MM-DD");
    return (
      <>
        {this.state.editFlag == false ? (
          <Card className="m-3">
            <img src={movie.image} alt={movie.title} height="300px" />
            <Card.Body>
              <Card.Title style={{ color: "blue" }}>
                <b>{movie.title}</b>
              </Card.Title>
              <Card.Title style={{ color: "black" }}>
                <b>{movie.genre}</b>
              </Card.Title>
              <Card.Text style={{ color: "black" }}>
                {movie.description}
              </Card.Text>
              <div>
                <button
                  className="btn btn-warning btn-lg"
                  aria-pressed="false"
                  autoComplete="off"
                  onClick={() => this.setState({ editFlag: true })}
                  style={{ margin: "5px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-lg"
                  aria-pressed="false"
                  autoComplete="off"
                  onClick={() => onDeleting(movie)}
                >
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card className="m-3">
            <img src={movie.image} alt={movie.title} height="300px" />
            <Card.Body>
              <form className="editMovieForm" onSubmit={this.onTrigger}>
                <table>
                  <tbody>
                    <tr>
                      <th style={{ color: "black" }}>cast: </th>
                      <td>
                        <input
                          type="text"
                          name="cast"
                          defaultValue={movie.cast}
                          required
                          onChange={(event) =>
                            this.setState({ cast: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Title: </th>
                      <td>
                        <input
                          type="text"
                          name="Title"
                          required
                          defaultValue={movie.title}
                          onChange={(event) =>
                            this.setState({ title: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Image: </th>
                      <td>
                        <input
                          type="text"
                          name="image"
                          defaultValue={movie.image}
                          onChange={(event) =>
                            this.setState({ image: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Language: </th>
                      <td>
                        <input
                          type="text"
                          name="language"
                          required
                          defaultValue={movie.language}
                          onChange={(event) =>
                            this.setState({
                              language: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Genre: </th>
                      <td>
                        <input
                          type="text"
                          name="genre"
                          required
                          defaultValue={movie.genre}
                          onChange={(event) =>
                            this.setState({ genre: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Director</th>
                      <td>
                        <input
                          type="text"
                          name="director"
                          required
                          defaultValue={movie.director}
                          onChange={(event) =>
                            this.setState({
                              director: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Description: </th>
                      <td>
                        <input
                          type="text"
                          name="description"
                          required
                          defaultValue={movie.description}
                          onChange={(event) =>
                            this.setState({
                              description: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Duration: </th>
                      <td>
                        <input
                          type="number"
                          name="duration"
                          required
                          defaultValue={movie.duration}
                          onChange={(event) =>
                            this.setState({
                              duration: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>ReleaseDate</th>
                      <td>
                        <input
                          type="date"
                          name="releaseDate"
                          required
                          defaultValue={formattedReleaseDate}
                          onChange={(event) =>
                            this.setState({
                              releaseDate: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>EndDate</th>
                      <td>
                        <input
                          type="date"
                          name="endDate"
                          onChange={(event) =>
                            this.setState({
                              endDate: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <br></br>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-success btn-block btn-lg"
                          aria-pressed="false"
                          autocomplete="off"
                          type="save"
                        >
                          save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <button
                type="save"
                className="btn btn-danger  btn-lg"
                aria-pressed="false"
                autoComplete="off"
                onClick={() => this.setState({ editFlag: false })}
                // style={{ textAlign: "center", margin: "auto" }}
              >
                cancel
              </button>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}

export default Movie;
