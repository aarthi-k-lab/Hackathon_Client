import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class BookTickets extends Component {
  state = { theatreMap: {} };

  componentDidMount = async () => {
    let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/theatres/";
    try {
      const theatresResponse = await fetch(mockapiurl);
      let theatres = await theatresResponse.json();
      let theatreMap = {};
      theatres.map((theatre) => {
        theatreMap[theatre._id] = theatre.name;
      });
      this.setState({ theatreMap });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { movie, showTimes, onBack, onBooking } = this.props;
    return (
      <>
        <div className="bookTickets ">
          <button
            className="btn btn-danger btn-lg movieListBtn btn-outline-warning"
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
            onClick={() => onBack()}
          >
            Back
          </button>
          <br></br>
          <br></br>
          <h1 className="movieName">Movie: {movie.title}</h1>
          <br></br>
          <table border="1" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{ padding: "15px", backgroundColor: "#17a2b8" }}
                >
                  TheatreName
                </th>
                <th
                  scope="col"
                  style={{ padding: "15px", backgroundColor: "#17a2b8" }}
                >
                  slot
                </th>
                <th
                  scope="col"
                  style={{ padding: "15px", backgroundColor: "#17a2b8" }}
                >
                  Book
                </th>
              </tr>
            </thead>
            <tbody>
              {showTimes.map((showtime) => {
                return (
                  <tr>
                    <td scope="row" style={{ padding: "15px" }}>
                      {this.state.theatreMap[showtime.cinemaId]}
                    </td>
                    <td scope="row" style={{ padding: "15px" }}>
                      {showtime.startAt}
                    </td>
                    <td scope="row" style={{ padding: "15px" }}>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => onBooking(showtime)}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default BookTickets;
