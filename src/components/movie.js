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
  render() {
    const { movie, onDeleting } = this.props;
    const formattedReleaseDate = moment(movie.releaseDate).format("yyyy-MM-DD");
    return (
      <>
        {this.state.editFlag == false ? (
          <Card className="m-3">
            <img src={movie.image} alt={movie.title} height="300px" />
            <Card.Body>
              <Card.Title style={{ color: "blue" }}>{movie.title}</Card.Title>
              <Card.Title>{movie.genre}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <div>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => this.setState({ editFlag: true })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => onDeleting(movie)}
                >
                  Delete
                </button>
                <button className="btn btn-primary m-2">View</button>
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
                      <td>cast</td>
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
                      <td>Title</td>
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
                      <td>Image</td>
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
                      <td>Language</td>
                      <td>
                        <input
                          type="text"
                          name="language"
                          required
                          defaultValue={movie.language}
                          onChange={(event) =>
                            this.setState({ language: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Genre</td>
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
                      <td>Director</td>
                      <td>
                        <input
                          type="text"
                          name="director"
                          required
                          defaultValue={movie.director}
                          onChange={(event) =>
                            this.setState({ director: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          required
                          defaultValue={movie.description}
                          onChange={(event) =>
                            this.setState({ description: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td>
                        <input
                          type="number"
                          name="duration"
                          required
                          defaultValue={movie.duration}
                          onChange={(event) =>
                            this.setState({ duration: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ReleaseDate</td>
                      <td>
                        <input
                          type="date"
                          name="releaseDate"
                          required
                          defaultValue={formattedReleaseDate}
                          onChange={(event) =>
                            this.setState({ releaseDate: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>EndDate</td>
                      <td>
                        <input
                          type="date"
                          name="endDate"
                          onChange={(event) =>
                            this.setState({ endDate: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <button type="save">save</button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button type="save">cancel</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}

export default Movie;
