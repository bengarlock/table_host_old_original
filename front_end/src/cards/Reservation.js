import React from "react";
import "../stylesheets/ReservationFloorView.css"

class Reservation extends React.Component{

    state = {
        reservation: this.props.reservation
    }

    onDragHandler = () => {
        this.setState({
            reservation: this.props.reservation
        }, () => this.props.updateReservation(this.state.reservation))
    }

    /*onMouseLeave = () => {
        this.setState({
            reservation: ''
        }, () => this.props.updateReservation(this.state.reservation))
    }*/

    render() {
        return(
            <div>
                <div className="reservation-card"  draggable="true" onMouseOver={this.onDragHandler} onMouseLeave={this.onMouseLeave}>
                    <h3>{this.props.reservation.first_name} {this.props.reservation.last_name}</h3>
                    <div>
                        <span className="reservation-time">{this.props.reservation.time} </span>
                        <span className="reservation-party-size">{this.props.reservation.party_size} </span>
                        <span className="reservation-guest-name"> {this.props.reservation.guest.first_name} {this.props.reservation.guest.last_name}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reservation