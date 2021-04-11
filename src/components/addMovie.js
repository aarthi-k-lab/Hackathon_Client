import React, { Component } from "react";

class AddMovie extends Component {
  state = {
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
    this.props.onAdding(
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
    return (
      <div className="addMovie">
        <h1 className="addMovie">Add Movie</h1>
        <form className="addMovieForm" onSubmit={this.onTrigger}>
          <table>
            <tbody>
              <tr>
                <td>cast</td>
                <td>
                  <input
                    type="text"
                    name="cast"
                    onChange={(event) =>
                      this.setState({ cast: event.target.value })
                    }
                    placeholder="actor,actor,actor..."
                    required
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
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <button type="submit">save</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default AddMovie;
