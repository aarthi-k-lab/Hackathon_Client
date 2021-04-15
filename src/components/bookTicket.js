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
        <div className="bookTickets">
          <button className="btn btn-primary" onClick={() => onBack()}>
            Back
          </button>
          <h1 className="movieName">Movie: {movie.title}</h1>
          <table border="1" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th scope="col">TheatreName</th>
                <th scope="col">slot</th>
                <th scope="col">Book</th>
              </tr>
            </thead>
            <tbody>
              {showTimes.map((showtime) => {
                return (
                  <tr>
                    <td scope="row">
                      {this.state.theatreMap[showtime.cinemaId]}
                    </td>
                    <td scope="row">{showtime.startAt}</td>
                    <td scope="row">
                      <button
                        className="btn btn-primary"
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
