import React, { Component } from "react";

class AddTheatre extends Component {
  state = {
    seats: [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9",
      "C10",
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6",
      "D7",
      "D8",
      "D9",
      "D10",
      "E1",
      "E2",
      "E3",
      "E4",
      "E5",
      "E6",
      "E7",
      "E8",
      "E9",
      "E10",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "G1",
      "G2",
      "G3",
      "G4",
      "G5",
      "G6",
      "G7",
      "G8",
      "G9",
      "G10",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "H7",
      "H8",
      "H9",
      "H10",
      "I1",
      "I2",
      "I3",
      "I4",
      "I5",
      "I6",
      "I7",
      "I8",
      "I9",
      "I10",
      "J1",
      "J2",
      "J3",
      "J4",
      "J5",
      "J6",
      "J7",
      "J8",
      "J9",
      "J10",
    ],
    name: "",
    ticketPrice: "",
    city: "",
    seatsAvailable: 100,
    image: "",
  };

  onTrigger = (event) => {
    this.props.onAdding(
      this.state.seats,
      this.state.name,
      this.state.ticketPrice,
      this.state.city,
      this.state.seatsAvailable,
      this.state.image
    );
    event.preventDefault();
  };

  render() {
    return (
      <div className="addTheatre">
        <h1 className="addTheatre">Add Theatre</h1>
        <form className="addTheatreForm" onSubmit={this.onTrigger}>
          <table>
            <tbody>
              <tr>
                <td>name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={(event) =>
                      this.setState({ name: event.target.value })
                    }
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>ticketPrice</td>
                <td>
                  <input
                    type="number"
                    name="ticketPrice"
                    required
                    onChange={(event) =>
                      this.setState({ ticketPrice: event.target.value })
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
                <td>city</td>
                <td>
                  <input
                    type="text"
                    name="city"
                    required
                    onChange={(event) =>
                      this.setState({ city: event.target.value })
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
