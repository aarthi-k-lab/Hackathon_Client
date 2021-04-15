import React, { Component } from "react";

class AddTheatre extends Component {
  state = {
    seats: [
      [
        {
          A1: true,
          A2: true,
          A3: true,
          A4: true,
          A5: true,
          A6: true,
          A7: true,
          A8: true,
          A9: true,
          A10: true,
        },
      ],
      [
        {
          B1: true,
          B2: true,
          B3: true,
          B4: true,
          B5: true,
          B6: true,
          B7: true,
          B8: true,
          B9: true,
          B10: true,
        },
      ],
      [
        {
          C1: true,
          C2: true,
          C3: true,
          C4: true,
          C5: true,
          C6: true,
          C7: true,
          C8: true,
          C9: true,
          C10: true,
        },
      ],
      [
        {
          D1: true,
          D2: true,
          D3: true,
          D4: true,
          D5: true,
          D6: true,
          D7: true,
          D8: true,
          D9: true,
          D10: true,
        },
      ],
      [
        {
          E1: true,
          E2: true,
          E3: true,
          E4: true,
          E5: true,
          E6: true,
          E7: true,
          E8: true,
          E9: true,
          E10: true,
        },
      ],
      [
        {
          F1: true,
          F2: true,
          F3: true,
          F4: true,
          F5: true,
          F6: true,
          F7: true,
          F8: true,
          F9: true,
          F10: true,
        },
      ],
      [
        {
          G1: true,
          G2: true,
          G3: true,
          G4: true,
          G5: true,
          G6: true,
          G7: true,
          G8: true,
          G9: true,
          G10: true,
        },
      ],
      [
        {
          H1: true,
          H2: true,
          H3: true,
          H4: true,
          H5: true,
          H6: true,
          H7: true,
          H8: true,
          H9: true,
          H10: true,
        },
      ],
      [
        {
          I1: true,
          I2: true,
          I3: true,
          I4: true,
          I5: true,
          I6: true,
          I7: true,
          I8: true,
          I9: true,
          I10: true,
        },
      ],
      [
        {
          J1: true,
          J2: true,
          J3: true,
          J4: true,
          J5: true,
          J6: true,
          J7: true,
          J8: true,
          J9: true,
          J10: true,
        },
      ],
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
      <div className="addTheatre" style={{ padding: "5px" }}>
        <h1 className="addTheatre">Add Theatre</h1>
        <form className="addTheatreForm" onSubmit={this.onTrigger}>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              <br></br>
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
              <br></br>
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
              <br></br>
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
              <br></br>
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
              <br></br>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="btn btn-info btn-lg btn-outline-light"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                  >
                    save
                  </button>
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
