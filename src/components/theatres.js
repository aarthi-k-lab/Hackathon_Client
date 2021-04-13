import React, { Component } from "react";
import Theatre from "./theatre.js";
import AddTheatre from "./addTheatre.js";
class Theatres extends Component {
  state = { theatres: [{}], addFlag: false };

  async componentDidMount() {
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/theatres/";
    try {
      const theatresResponse = await fetch(mockapiurl);
      let theatres = await theatresResponse.json();
      this.setState({ theatres });
    } catch (error) {
      console.log(error);
    }
  }

  handleAdding = async (
    seats,
    name,
    ticketPrice,
    city,
    seatsAvailable,
    image
  ) => {
    const newTheatre = {
      seats: seats,
      name: name,
      ticketPrice: ticketPrice,
      city: city,
      seatsAvailable: seatsAvailable,
      image: image,
    };
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/theatres/";
    try {
      const theatreResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(newTheatre),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let theatre = await theatreResponse.json();
      if (theatre.name == "MongoError") {
        alert("some format error while storing");
      }
      const newTheatres = await (await fetch(mockapiurl)).json();
      this.setState({ theatres: newTheatres });
      this.setState({ addFlag: false });
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async (deleteTheatre) => {
    var result = confirm("Want to delete?");
    if (result) {
      let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/theatres/";
      let mockapideleteurl = mockapiurl + deleteTheatre._id;
      try {
        const theatreResponse = await fetch(mockapideleteurl, {
          method: "DELETE",
          body: JSON.stringify(deleteTheatre),
          headers: { "Content-type": "application/json;characterset=UTF-8" },
        });
        let theatre = await theatreResponse.json();
        alert(theatre.name + " successfully deleted");
        const newTheatres = await (await fetch(mockapiurl)).json();
        // let theatres = await theatreResponse.json();
        this.setState({ theatres: newTheatres });

        //Deleting showtime
        this.deleteShowTime(deleteTheatre._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteShowTime = async (id) => {
    let showtimemockapiurl =
      "http://immense-sands-26614.herokuapp.com/api/showtimes/";
    try {
      const showTimeResponse = await fetch(showtimemockapiurl);
      let showtimes = await showTimeResponse.json();
      showtimes.map(async (showtime) => {
        if (showtime.cinemaId == id) {
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
    seats,
    name,
    ticketPrice,
    city,
    seatsAvailable,
    image
  ) => {
    const newTheatre = {
      seats: seats,
      name: name,
      ticketPrice: ticketPrice,
      city: city,
      seatsAvailable: seatsAvailable,
      image: image,
    };
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/theatres/";
    let mockapiputrurl = mockapiurl + id;
    try {
      const theatreResponse = await fetch(mockapiputrurl, {
        method: "PUT",
        body: JSON.stringify(newTheatre),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let theatre = await theatreResponse.json();
      if (theatre.name == "MongoError") {
        alert("some format error while storing");
      }
      const newTheatres = await (await fetch(mockapiurl)).json();
      // let theatres = await theatreResponse.json();
      this.setState({ theatres: newTheatres });
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
            alt="addTheatre"
            length="100"
            width="100"
          ></img>
        </button>
        {this.state.addFlag == true ? (
          <AddTheatre onAdding={this.handleAdding} />
        ) : (
          <></>
        )}
        {this.state.theatres.length > 0 ? (
          this.state.theatres.map((theatre) => (
            <div key={theatre._id} className="col-sm-4">
              <Theatre
                theatre={theatre}
                onDeleting={this.handleDelete}
                onSave={this.handleSave}
              />
            </div>
          ))
        ) : (
          <div>Sorry there is no Theatre at present</div>
        )}
      </div>
    );
  }
}

export default Theatres;
