import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
class Theatre extends Component {
  state = {
    editFlag: false,
    seats: "",
    name: "",
    ticketPrice: "",
    city: "",
    seatsAvailable: "",
    image: "",
  };

  componentDidMount = async () => {
    this.setState({
      seats: this.props.theatre.seats,
      name: this.props.theatre.name,
      ticketPrice: this.props.theatre.ticketPrice,
      city: this.props.theatre.city,
      seatsAvailable: this.props.theatre.seatsAvailable,
      image: this.props.theatre.image,
    });
  };

  onTrigger = (event) => {
    this.setState({ editFlag: false });
    this.props.onSave(
      this.props.theatre._id,
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
    const { theatre, onDeleting } = this.props;
    return (
      <>
        {this.state.editFlag == false ? (
          <Card className="m-3">
            <img src={theatre.image} alt={theatre.title} height="300px" />
            <Card.Body>
              <Card.Title style={{ color: "blue" }}>
                <b>Name: {theatre.name}</b>
              </Card.Title>
              <Card.Title style={{ color: "black" }}>
                <b> City: {theatre.city}</b>
              </Card.Title>
              <Card.Text style={{ color: "black" }}>
                Price: Rs {theatre.ticketPrice}
              </Card.Text>
              <div>
                <button
                  className="btn btn-warning btn-lg"
                  aria-pressed="false"
                  autoComplete="off"
                  onClick={() => this.setState({ editFlag: true })}
                  style={{ margin: "5px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-lg"
                  aria-pressed="false"
                  autoComplete="off"
                  onClick={() => onDeleting(theatre)}
                >
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <img src={theatre.image} alt={theatre.name} height="300px" />
            <Card.Body>
              <form className="editTheatreForm" onSubmit={this.onTrigger}>
                <table>
                  <tbody>
                    <tr>
                      <th style={{ color: "black" }}>Name: </th>
                      <td>
                        <input
                          type="text"
                          name="name"
                          defaultValue={theatre.name}
                          required
                          onChange={(event) =>
                            this.setState({ name: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>City: </th>
                      <td>
                        <input
                          type="text"
                          name="city"
                          required
                          defaultValue={theatre.city}
                          onChange={(event) =>
                            this.setState({ city: event.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "black" }}>Image: </th>
                      <td>
                        <input
                          type="text"
                          name="image"
                          defaultValue={theatre.image}
                          onChange={(event) =>
                            this.setState({ image: event.target.value })
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ color: "black" }}>TicketPrice: </th>
                      <td>
                        <input
                          type="number"
                          name="ticketPrice"
                          required
                          defaultValue={theatre.ticketPrice}
                          onChange={(event) =>
                            this.setState({
                              ticketPrice: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-success btn-block btn-lg"
                          aria-pressed="false"
                          autocomplete="off"
                          type="save"
                        >
                          save
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}></td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <button
                type="save"
                className="btn btn-danger  btn-lg"
                aria-pressed="false"
                autoComplete="off"
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

export default Theatre;
