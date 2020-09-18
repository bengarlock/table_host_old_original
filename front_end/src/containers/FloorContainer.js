import React from "react"
import Reservation from "../cards/Reservation";



class FloorContainer extends React.Component {

    state = {
        reservations: []
    }





    renderReservations = () => {
        return this.state.reservations.map(reservation => <Reservation key={reservation.id} reservation={reservation} />)
    }


    render() {
        return(
            <div className="reservation-container">
                <div id="reservations-container-header">Reservations</div>
                {/*<div>{this.renderReservations()}</div>*/}
            </div>
        )
    }


}

export default FloorContainer