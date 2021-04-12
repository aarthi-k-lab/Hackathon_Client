import React, { Component } from "react";

class AddTheatre extends Component {
  state = {
    startAt: "",
    startDate: "",
    endDate: "",
    movieId: "",
    cinemaId: "",
  };

  onTrigger = (event) => {
    this.props.onAdding(
      this.state.startAt,
      this.state.startDate,
      this.state.endDate,
      this.state.movieId,
      this.state.cinemaId
    );
    event.preventDefault();
  };

  render() {
    return (
      <div className="addShowTimes">
        <h1 className="addShowTime">Add ShowTime</h1>
        <form className="addShowTimeForm" onSubmit={this.onTrigger}>
          <table>
            <tbody>
              <tr>
                <td>movieId</td>
                <td>
                  <input
                    type="text"
                    name="movieId"
                    onChange={(event) =>
                      this.setState({ movieId: event.target.value })
                    }
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>cinemaId</td>
                <td>
                  <input
                    type="cinemaId"
                    name="ticketPrice"
                    required
                    onChange={(event) =>
                      this.setState({ cinemaId: event.target.value })
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
                    onChange={(event) =>
                      this.setState({ startAt: event.target.value })
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
                    required
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

export default AddTheatre;
