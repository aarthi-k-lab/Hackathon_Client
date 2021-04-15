import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
class ShowTime extends Component {
  state = {
    editFlag: false,
    startAt: "",
    startDate: "",
    endDate: "",
    movieId: "",
    cinemaId: "",
    movie: {},
    theatre: {},
  };

  componentDidMount = async () => {
    this.setState({
      startAt: this.props.showtime.startAt,
      startDate: this.props.showtime.startDate,
      endDate: this.props.showtime.endDate,
      movieId: this.props.showtime.movieId,
      cinemaId: this.props.showtime.cinemaId,
    });

    let mockapitheatreurl =
      "https://immense-sands-26614.herokuapp.com/api/theatres/" +
      this.props.showtime.cinemaId;
    try {
      const theatresResponse = await fetch(mockapitheatreurl);
      let theatre = await theatresResponse.json();
      this.setState({ theatre });
    } catch (error) {
      console.log(error);
    }

    let mockapimovieurl =
      "https://immense-sands-26614.herokuapp.com/api/movies/" +
      this.state.movieId;
    try {
      const moviesResponse = await fetch(mockapimovieurl);
      let movie = await moviesResponse.json();
      this.setState({ movie });
    } catch (error) {
      console.log(error);
    }
  };

  onTrigger = (event) => {
    this.setState({ editFlag: false });
    this.props.onSave(
      this.props.showtime._id,
      this.state.startAt,
      this.state.startDate,
      this.state.endDate,
      this.state.movieId,
      this.state.cinemaId
    );
    event.preventDefault();
  };

  render() {
    const { showtime, onDeleting } = this.props;
    return (
      <>
        {this.state.editFlag == false ? (
          <Card className="m-3">
            <img
              src={this.state.movie.image}
              alt={this.state.movie.title}
              height="300px"
            />
            <Card.Body>
              <Card.Title style={{ color: "blue" }}>
                Movie Name: {this.state.movie.title}
              </Card.Title>
              <Card.Title style={{ color: "blue" }}>
                Theatre Name: {this.state.theatre.name}
              </Card.Title>
              <Card.Text>Slot: {showtime.startAt}</Card.Text>
              <div>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => this.setState({ editFlag: true })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => onDeleting(showtime)}
                >
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <form className="editShowTimeForm" onSubmit={this.onTrigger}>
                <table>
                  <tbody>
                    <tr>
                      <td>movieId</td>
                      <td>
                        <input
                          type="text"
                          name="movieId"
                          defaultValue={showtime.movieId}
                          required
                          onChange={(event) =>
                            this.setState({ movieId: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>cinemaId</td>
                      <td>
                        <input
                          type="text"
                          name="cinemaId"
                          required
                          defaultValue={showtime.cinemaId}
                          onChange={(event) =>
                            this.setState({ cinemaId: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>startDate</td>
                      <td>
                        <input
                          type="date"
                          name="startDate"
                          defaultValue={showtime.startDate}
                          onChange={(event) =>
                            this.setState({ startDate: event.target.value })
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>endDate</td>
                      <td>
                        <input
                          type="date"
                          name="endDate"
                          required
                          defaultValue={showtime.endDate}
                          onChange={(event) =>
                            this.setState({
                              endDate: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>startAt</td>
                      <td>
                        <input
                          type="text"
                          name="startAt"
                          required
                          defaultValue={showtime.startAt}
                          onChange={(event) =>
                            this.setState({
                              startAt: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <button type="save">save</button>
                      </td>
                      <td style={{ textAlign: "center" }}></td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <button
                type="save"
                onClick={() => this.setState({ editFlag: false })}
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

export default ShowTime;
