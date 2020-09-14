import React from "react";

class Reservation extends React.Component{

    render() {
        return(
            <div>
                <div className="reservation-card">
                    <h3>{this.props.reservation.first_name} {this.props.reservation.last_name}</h3>
                    <div>
                        <span className="time-party-size">{this.props.reservation.time} </span>
                        <span className="time-party-size"> {this.props.reservation.party_size}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reservation