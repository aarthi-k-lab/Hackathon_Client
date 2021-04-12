import React, { Component } from "react";
import AddShowTime from "./addShowTime.js";
import ShowTime from "./showtime.js";
class ShowTimes extends Component {
  state = { showtimes: [{}], addFlag: false };

  async componentDidMount() {
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/showtimes/";
    try {
      const showTimeResponse = await fetch(mockapiurl);
      let showtimes = await showTimeResponse.json();
      this.setState({ showtimes });
    } catch (error) {
      console.log(error);
    }
  }

  handleAdding = async (startAt, startDate, endDate, movieId, cinemaId) => {
    const newShowTime = {
      startAt: startAt,
      startDate: startDate,
      endDate: endDate,
      movieId: movieId,
      cinemaId: cinemaId,
    };
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/showtimes/";
    try {
      const showTimeResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(newShowTime),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let showtime = await showTimeResponse.json();
      if (showtime.name == "MongoError") {
        alert("some format error while storing");
      }
      const newShowTimes = await (await fetch(mockapiurl)).json();
      this.setState({ showtimes: newShowTimes });
      this.setState({ addFlag: false });
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async (deleteShowtime) => {
    var result = confirm("Want to delete?");
    if (result) {
      let mockapiurl =
        "http://immense-sands-26614.herokuapp.com/api/showtimes/";
      let mockapideleteurl = mockapiurl + deleteShowtime._id;
      try {
        const showtimeResponse = await fetch(mockapideleteurl, {
          method: "DELETE",
          body: JSON.stringify(deleteShowtime),
          headers: { "Content-type": "application/json;characterset=UTF-8" },
        });
        await showtimeResponse.json();
        alert("Show time of successfully deleted");
        const newShowTimes = await (await fetch(mockapiurl)).json();
        // let theatres = await theatreResponse.json();
        this.setState({ showtimes: newShowTimes });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleSave = async (id, startAt, startDate, endDate, movieId, cinemaId) => {
    const newShowTime = {
      startAt: startAt,
      startDate: startDate,
      endDate: endDate,
      movieId: movieId,
      cinemaId: cinemaId,
    };
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/showtimes/";
    let mockapiputrurl = mockapiurl + id;
    try {
      const showtimeResponse = await fetch(mockapiputrurl, {
        method: "PUT",
        body: JSON.stringify(newShowTime),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let showtime = await showtimeResponse.json();
      if (showtime.name == "MongoError") {
        alert("some format error while storing");
      }
      const newShowtimes = await (await fetch(mockapiurl)).json();
      // let theatres = await theatreResponse.json();
      this.setState({ showtimes: newShowtimes });
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
          <AddShowTime onAdding={this.handleAdding} />
        ) : (
          <></>
        )}
        {this.state.showtimes.length > 0 ? (
          this.state.showtimes.map((showtime) => (
            <div key={showtime._id} className="col-sm-4">
              <ShowTime
                showtime={showtime}
                onDeleting={this.handleDelete}
                onSave={this.handleSave}
              />
            </div>
          ))
        ) : (
          <div>Sorry there is no Shows at present</div>
        )}
      </div>
    );
  }
}

export default ShowTimes;
