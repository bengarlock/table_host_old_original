import React from "react"
import Reservation from "../cards/Reservation";

const url = "http://localhost:3000/reservations/"

class ReservationsContainer extends React.Component {

    state = {
        reservations: []
    }

    componentDidMount() {
        fetch(url)
            .then(res => res.json())
            .then(reservations => reservations.map(reservation => {
                if (reservation.booked) {
                    let array = [...this.state.reservations, reservation]
                    this.setState({
                        reservations: array
                    })
                }
            }))
    }



    renderReservations = () => {
        return this.state.reservations.map(reservation => <Reservation key={reservation.id} reservation={reservation} />)
    }


    render() {
        return(
            <div className="reservation-container">
                <div id="reservations-container-header">Reservations</div>
                <div>{this.renderReservations()}</div>
            </div>
        )
    }


}

export default ReservationsContainer